import { NextRequest, NextResponse } from "next/server";
import { analyzeWebsite, cleanDomain } from "@/lib/scanner";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const target = body.domain || body.url;

    if (!target || typeof target !== "string") {
      return NextResponse.json(
        { error: "Domain or URL string is required" },
        { status: 400 }
      );
    }

    const { domain } = cleanDomain(target);
    if (!domain || domain.length < 3 || !domain.includes(".")) {
      return NextResponse.json(
        { error: "Please enter a valid domain (e.g. example.com)" },
        { status: 400 }
      );
    }

    // Run the Ingestion & Analysis Engine
    const scanResult = await analyzeWebsite(domain);

    // Persist to Supabase PostgreSQL database
    let savedWebsite = null;
    try {
      savedWebsite = await prisma.website.upsert({
        where: { domain: scanResult.domain },
        update: {
          canonicalUrl: scanResult.canonicalUrl,
        },
        create: {
          domain: scanResult.domain,
          canonicalUrl: scanResult.canonicalUrl,
        },
      });

      // Create Scan record
      const scan = await prisma.scan.create({
        data: {
          websiteId: savedWebsite.id,
          overallScore: scanResult.scores.overall,
          seoScore: scanResult.scores.seo,
          technicalScore: scanResult.scores.technical,
          contentScore: scanResult.scores.content,
          performanceScore: scanResult.scores.performance,
          completedAt: new Date(),
          findings: {
            create: scanResult.findings.map((f) => ({
              category: f.category,
              severity: f.severity,
              issue: f.issue,
              evidence: f.evidence,
              recommendation: f.recommendation,
            })),
          },
        },
      });

      // Save page record
      await prisma.page.create({
        data: {
          websiteId: savedWebsite.id,
          url: scanResult.canonicalUrl,
          statusCode: scanResult.statusCode,
          title: scanResult.title,
          description: scanResult.description,
          h1: scanResult.h1,
          canonical: scanResult.canonical,
          wordCount: scanResult.wordCount,
        },
      });

      // Upsert detected technologies
      for (const tech of scanResult.technologies) {
        await prisma.technology.upsert({
          where: {
            websiteId_name: {
              websiteId: savedWebsite.id,
              name: tech.name,
            },
          },
          update: {
            lastSeen: new Date(),
            evidence: tech.evidence,
          },
          create: {
            websiteId: savedWebsite.id,
            name: tech.name,
            category: tech.category,
            confidence: tech.confidence,
            evidence: tech.evidence,
          },
        });
      }

      // Create opportunities
      for (const opp of scanResult.opportunities) {
        await prisma.opportunity.create({
          data: {
            websiteId: savedWebsite.id,
            type: opp.type,
            reason: opp.reason,
            impact: opp.impact,
          },
        });
      }

      return NextResponse.json({
        success: true,
        data: {
          ...scanResult,
          id: scan.id,
          websiteId: savedWebsite.id,
        },
      });
    } catch (dbError) {
      console.error("Database save warning:", dbError);
      // Even if DB has transient issue, return the live scan result
      return NextResponse.json({
        success: true,
        data: scanResult,
        dbStatus: "unpersisted",
      });
    }
  } catch (error: unknown) {
    console.error("Analysis engine error:", error);
    const message = error instanceof Error ? error.message : "Failed to analyze website";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get("domain");

    if (domain) {
      const website = await prisma.website.findUnique({
        where: { domain },
        include: {
          scans: {
            orderBy: { startedAt: "desc" },
            take: 1,
            include: { findings: true },
          },
          technologies: true,
          opportunities: true,
        },
      });

      if (!website) {
        return NextResponse.json({ error: "Website not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: website });
    }

    // Default: return recent scans
    const recentScans = await prisma.scan.findMany({
      orderBy: { startedAt: "desc" },
      take: 10,
      include: {
        website: true,
      },
    });

    return NextResponse.json({ success: true, data: recentScans });
  } catch (error: unknown) {
    console.error("GET /api/analyze error:", error);
    return NextResponse.json(
      { error: "Could not retrieve website scan data" },
      { status: 500 }
    );
  }
}
