export type ConfidenceLevel = 'High' | 'Medium' | 'Low' | 'Unavailable';

export interface ChannelBreakdown {
  organicSearch: number;
  paidSearch: number;
  direct: number;
  referral: number;
  social: number;
  display: number;
  email: number;
}

export interface TrafficMetrics {
  monthlyVisits: number;
  monthlyVisitsChange: number;
  avgVisitDurationSeconds: number;
  pagesPerVisit: number;
  bounceRate: number;
}

export interface TopPageItem {
  url: string;
  title: string;
  trafficShare: number;
  estimatedVisits: number;
  topKeyword: string;
}

export interface GeographyItem {
  countryCode: string;
  countryName: string;
  trafficShare: number;
  estimatedVisits: number;
  visitsChange: number;
}

export interface AudienceOverlapItem {
  domain: string;
  category: string;
  affinityScore: number;
  sharedVisitorsEstimate: number;
}

export interface ReferralSourceItem {
  referringDomain: string;
  category: string;
  trafficShare: number;
  estimatedReferrals: number;
}

export interface ExtendedTrafficData {
  domain: string;
  lastUpdated: string;
  sourceProvider: string;
  confidence: ConfidenceLevel;
  hasProviderCoverage: boolean;
  metrics?: TrafficMetrics;
  channelMix?: ChannelBreakdown;
  topPages?: TopPageItem[];
  geography?: GeographyItem[];
  audienceOverlap?: AudienceOverlapItem[];
  referralSources?: ReferralSourceItem[];
}