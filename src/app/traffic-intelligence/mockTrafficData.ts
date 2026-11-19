import { ExtendedTrafficData } from "./traffic";

export const MOCK_TRAFFIC_DATA: ExtendedTrafficData = {
  domain: 'stripe.com',
  lastUpdated: 'Nov 2026',
  sourceProvider: 'Licensed Traffic Index',
  confidence: 'High',
  hasProviderCoverage: true,
  metrics: {
    monthlyVisits: 48200000,
    monthlyVisitsChange: 4.8,
    avgVisitDurationSeconds: 215,
    pagesPerVisit: 3.4,
    bounceRate: 38.2,
  },
  channelMix: {
    organicSearch: 46.5,
    direct: 34.2,
    referral: 9.8,
    paidSearch: 5.1,
    social: 2.6,
    email: 1.1,
    display: 0.7,
  },
  topPages: [
    {
      url: '/pricing',
      title: 'Stripe Pricing & Fees',
      trafficShare: 24.5,
      estimatedVisits: 11800000,
      topKeyword: 'stripe pricing',
    },
    {
      url: '/',
      title: 'Payment Processing Platform',
      trafficShare: 42.1,
      estimatedVisits: 20300000,
      topKeyword: 'stripe',
    },
    {
      url: '/docs',
      title: 'Developer Documentation',
      trafficShare: 18.3,
      estimatedVisits: 8800000,
      topKeyword: 'stripe API docs',
    },
  ],
  geography: [
    {
      countryCode: 'US',
      countryName: 'United States',
      trafficShare: 44.2,
      estimatedVisits: 21300000,
      visitsChange: 3.2,
    },
    {
      countryCode: 'GB',
      countryName: 'United Kingdom',
      trafficShare: 8.5,
      estimatedVisits: 4100000,
      visitsChange: 1.5,
    },
    {
      countryCode: 'DE',
      countryName: 'Germany',
      trafficShare: 6.1,
      estimatedVisits: 2900000,
      visitsChange: -0.4,
    },
  ],
  audienceOverlap: [
    {
      domain: 'paypal.com',
      category: 'Financial Services',
      affinityScore: 88,
      sharedVisitorsEstimate: 14200000,
    },
    {
      domain: 'shopify.com',
      category: 'E-commerce Infrastructure',
      affinityScore: 79,
      sharedVisitorsEstimate: 11500000,
    },
  ],
  referralSources: [
    {
      referringDomain: 'github.com',
      category: 'Developer Tools',
      trafficShare: 32.4,
      estimatedReferrals: 1530000,
    },
    {
      referringDomain: 'stackoverflow.com',
      category: 'Developer Community',
      trafficShare: 18.1,
      estimatedReferrals: 850000,
    },
  ],
};