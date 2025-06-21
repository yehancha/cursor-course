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
    const { data, error } = await supabase
      .from('api_keys')
      .select('id, name')
      .eq('api_key', apiKey)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned - key not found
        return { isValid: false, key: null };
      }
      console.error('Error validating API key:', error);
      throw error;
    }

    return { isValid: true, key: data };
  }
}; 