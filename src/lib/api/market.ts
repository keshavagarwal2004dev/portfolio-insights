import { supabase } from '@/integrations/supabase/client';

export interface SearchResult {
  title: string;
  url: string;
  description: string;
  source: string;
  publishedDate?: string;
}

export interface MarketSearchResponse {
  success: boolean;
  news: SearchResult[];
  companyInfo?: {
    name: string;
    description: string;
    sector?: string;
  };
  error?: string;
}

export type SearchType = 'company' | 'bank' | 'bond';

export async function searchMarket(query: string, type: SearchType = 'company'): Promise<MarketSearchResponse> {
  const { data, error } = await supabase.functions.invoke('market-search', {
    body: { query, type },
  });

  if (error) {
    console.error('Market search error:', error);
    return { success: false, news: [], error: error.message };
  }

  return data as MarketSearchResponse;
}
