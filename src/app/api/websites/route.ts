import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cleanDomain } from "@/lib/scanner";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const websites = await prisma.website.findMany({
      take: limit,
      orderBy: { updatedAt: "desc" },
      include: {
        scans: {
          orderBy: { startedAt: "desc" },
          take: 1,
        },
        _count: {
          select: {
            technologies: true,
            opportunities: true,
            pages: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      count: websites.length,
      data: websites,
    });
  } catch (error: unknown) {
    console.error("GET /api/websites error:", error);
    return NextResponse.json(
      { error: "Failed to fetch websites" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const target = body.domain || body.url;

    if (!target) {
      return NextResponse.json(
        { error: "domain is required" },
        { status: 400 }
      );
    }

    const { domain, url } = cleanDomain(target);

    const website = await prisma.website.upsert({
      where: { domain },
      update: {
        canonicalUrl: url,
        industry: body.industry || undefined,
        countrySignal: body.countrySignal || undefined,
      },
      create: {
        domain,
        canonicalUrl: url,
        industry: body.industry,
        countrySignal: body.countrySignal,
      },
    });

    return NextResponse.json({
      success: true,
      data: website,
    });
  } catch (error: unknown) {
    console.error("POST /api/websites error:", error);
    return NextResponse.json(
      { error: "Failed to register website" },
      { status: 500 }
    );
  }
}
