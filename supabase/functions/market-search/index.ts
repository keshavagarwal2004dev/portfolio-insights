const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SearchResult {
  title: string;
  url: string;
  description: string;
  source: string;
  publishedDate?: string;
}

interface MarketSearchResponse {
  success: boolean;
  news: SearchResult[];
  companyInfo?: {
    name: string;
    description: string;
    sector?: string;
  };
  error?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, type = 'company' } = await req.json();

    if (!query) {
      return new Response(
        JSON.stringify({ success: false, error: 'Query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      console.error('FIRECRAWL_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl connector not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Searching for:', query, 'Type:', type);

    // Build search query based on type
    let searchQuery = '';
    switch (type) {
      case 'company':
        searchQuery = `${query} stock news financial performance market analysis`;
        break;
      case 'bank':
        searchQuery = `${query} investment bank news deals acquisitions financial`;
        break;
      case 'bond':
        searchQuery = `${query} bond yield credit rating fixed income market`;
        break;
      default:
        searchQuery = `${query} financial news market analysis`;
    }

    // Search for recent news and market information
    const searchResponse = await fetch('https://api.firecrawl.dev/v1/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: searchQuery,
        limit: 10,
        tbs: 'qdr:w', // Last week
        scrapeOptions: {
          formats: ['markdown'],
        },
      }),
    });

    const searchData = await searchResponse.json();
    console.log('Search response status:', searchResponse.status);

    if (!searchResponse.ok) {
      console.error('Firecrawl search error:', searchData);
      return new Response(
        JSON.stringify({ success: false, error: searchData.error || 'Search failed' }),
        { status: searchResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse search results
    const news: SearchResult[] = (searchData.data || []).map((item: any, index: number) => {
      // Extract source from URL
      let source = 'Web';
      try {
        const url = new URL(item.url);
        source = url.hostname.replace('www.', '').split('.')[0];
        source = source.charAt(0).toUpperCase() + source.slice(1);
      } catch (e) {
        // Use default
      }

      return {
        title: item.title || `Result ${index + 1}`,
        url: item.url,
        description: item.description || item.markdown?.slice(0, 200) || '',
        source,
        publishedDate: item.publishedDate,
      };
    });

    // Try to get company info by scraping a relevant page
    let companyInfo = undefined;
    if (type === 'company' && news.length > 0) {
      // Extract basic info from the first result
      const firstResult = searchData.data?.[0];
      if (firstResult?.markdown) {
        companyInfo = {
          name: query,
          description: firstResult.markdown.slice(0, 500),
          sector: undefined,
        };
      }
    }

    const response: MarketSearchResponse = {
      success: true,
      news,
      companyInfo,
    };

    console.log('Returning', news.length, 'results');
    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in market-search:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to search';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
