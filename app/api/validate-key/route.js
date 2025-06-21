import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request) {
  try {
    const { apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Query the database to check if the API key exists
    const { data, error } = await supabase
      .from('api_keys')
      .select('id, name, created_at')
      .eq('api_key', apiKey)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned - key not found
        return NextResponse.json(
          { 
            isValid: false, 
            message: 'Invalid API key' 
          },
          { status: 200 }
        );
      }
      
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }

    // Key found - return success response
    return NextResponse.json({
      isValid: true,
      key: {
        id: data.id,
        name: data.name,
        created_at: data.created_at
      },
      message: 'API key is valid'
    });

  } catch (error) {
    console.error('API validation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Also support GET requests for simple validation
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get('key');

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key parameter is required' },
      { status: 400 }
    );
  }

  // Reuse the same validation logic
  const requestBody = { apiKey };
  const mockRequest = {
    json: async () => requestBody
  };

  return POST(mockRequest);
} 