
export interface ScannedDomain {
  id: string;
  domain: string;
  lastAnalyzed: string;
}

export interface CompetitorRecord {
  id: string;
  domain: string;
  competitionLevel: number;
  commonKeywords: number;
  organicKeywords: number;
  estimatedTraffic: number;
  visibility:number;
  // Additional competitor information
  referringDomains: number;
  topPages: TopPerformingPage[];
  contentThemes: string[];
  technologyStack: string[];
  keywordRankingDistribution: KeywordRankingDistribution;
  backlinkProfile: BacklinkProfile;
  sharedKeywords: SharedKeyword[];
  serpOverlap: SERPOverlapRecord[];
  category: string;
}

export interface CompetitorOverviewStats {
 //target domain stats
  organicVisibility: number;
  keywordGaps: number;
  contentGaps: number;
   organicKeywords: number;
  estimatedTraffic: number;
  visibility: number;

  referringDomains: number;
  topPages: TopPerformingPage[];
  contentThemes: string[];
  technologyStack: string[];
  keywordRankingDistribution: KeywordRankingDistribution;
  backlinkProfile: BacklinkProfile;

}


export interface PositioningMapPoint {
  domain: string;
  organicKeywords: number;
  organicTraffic: number;
  visibility: number;
}

export interface CompetitorOpportunity {
  id: string;
  title: string;
  count: number;
  description: string;
  priority: "High" | "Medium" | "Low";
  href: string;
}

export interface CompetitorActivity {
  id: number;
  website: string;
  title: string;
  description: string;
  type: string;
  severity: "High" | "Medium" | "Low";
  date: string;
}

export interface CompetitorOverviewData {
  stats: CompetitorOverviewStats;
  competitors: CompetitorRecord[];
 
  opportunities: CompetitorOpportunity[];
  activities: CompetitorActivity[];
}



export interface KeywordGap {
  keyword: string;
  searchVolume: number;
  keywordDifficulty: number;
  searchIntent: "Informational" | "Navigational" | "Commercial" | "Transactional";
  targetRanking: number | null;
  competitorDomain: string;
  competitorRanking: number;
  country: string;
  isMissing: boolean;
}

export interface ContentGap {
  id: string;
  topic: string;
  keyword: string;
  competitorDomain: string;
  competitorUrl: string;
  contentType: "Blog" | "Landing Page" | "Product Page" | "Guide";
  estimatedTraffic: number;
  targetHasContent: boolean;
  opportunity: "High" | "Medium" | "Low";
}


export interface BacklinkGap {
  id: string;
  referringDomain: string;
  domainAuthority: number;
  targetHasBacklink: boolean;
  competitorDomains: string[];
  backlinkCount: number;
  linkType: "Dofollow" | "Nofollow";
  firstSeen: string;
}

export interface CompetitorPage {
  id: string;
  competitorDomain: string;
  pageUrl: string;
  pageTitle: string;
  pageType: "Blog" | "Product" | "Category" | "Landing Page" | "Guide";
  organicTraffic: number;
  organicKeywords: number;
  topKeyword: string;
  keywordPosition: number;
}

export interface CompetitorIntelligenceData
  extends CompetitorOverviewData {
  
  keywordGaps: KeywordGap[];
 
  backlinkGaps: BacklinkGap[];
  competitorPages: CompetitorPage[];
  missingTopicClusters: MissingTopicCluster[];
  weakLandingPages: WeakLandingPage[];
  outdatedContent: OutdatedContent[];
  unansweredQuestions: UnansweredQuestion[];
  positioningComparison: PositioningComparison;
}

export interface KeywordRankingDistribution {
  top3: number;
  positions4to10: number;
  positions11to20: number;
  positions21to50: number;
  positions51to100: number;
}

export interface TopPerformingPage {
  url: string;
  estimatedTraffic: number;
  rankingKeywords: number;
  averagePosition: number;
}

export interface BacklinkProfile {
  totalBacklinks: number;
  dofollowBacklinks: number;
  nofollowBacklinks: number;
}

export interface SharedKeyword {
  keyword: string;
  searchVolume: number;
  keywordDifficulty: number;
  searchIntent: "Informational" | "Navigational" | "Commercial" | "Transactional";
  targetRanking: number | null;
  competitorRanking: number;
  country: string;
}
export interface SERPOverlapRecord {
  keyword: string;
  searchVolume: number;
  country: string;
  targetRanking: number;
  competitorRanking: number;
}

export interface MissingTopicCluster {
  topic: string;
  relatedKeywords: string[];
  competitorDomain: string;
  competitorCoverage: string;
  targetCoverage: "Missing" | "Weak";
}

export interface WeakLandingPage {
  pageUrl: string;
  pageTopic: string;
  weakness: string;
  competitorDomain: string;
  suggestedImprovement: string;
}

export interface OutdatedContent {
  pageUrl: string;
  pageTitle: string;
  lastUpdated: string;
  contentIssue: string;
  competitorDomain: string;
}

export interface UnansweredQuestion {
  question: string;
  searchIntent:
    | "Informational"
    | "Navigational"
    | "Commercial"
    | "Transactional";
  competitorDomain: string;
  targetCoverage: "Missing" | "Weak";
  suggestedContent: string;
}
export interface PositioningProfile {
  domain: string;
  homepageMessaging: string;
  services: string[];
  offers: string[];
  callsToAction: string[];
  pricingPresentation: string;
  pricingPageUrl: string | null;
  differentiators: string[];
}

export interface PositioningComparison {
  target: PositioningProfile;
  competitors: PositioningProfile[];
}