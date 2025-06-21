import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export const apiKeyService = {
  async fetchApiKeys() {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*');
    
    if (error) {
      console.error('Error fetching API keys:', error);
      throw error;
    }
    
    return data;
  },

  async createApiKey(name) {
    const { data, error } = await supabase
      .from('api_keys')
      .insert([{ name }])
      .select();

    if (error) {
      console.error('Error creating API key:', error);
      throw error;
    }

    return data[0];
  },

  async updateApiKey(id, name) {
    const { data, error } = await supabase
      .from('api_keys')
      .update({ name })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating API key:', error);
      throw error;
    }

    return data[0];
  },

  async deleteApiKey(id) {
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting API key:', error);
      throw error;
    }

    return true;
  },

  async validateApiKey(apiKey) {
    try {
      const response = await fetch('/api/validate-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }

      return {
        isValid: result.isValid,
        key: result.key,
        error: result.isValid ? null : result.message
      };
    } catch (error) {
      console.error('Error validating API key:', error);
      throw error;
    }
  }
}; 