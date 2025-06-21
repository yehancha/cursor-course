"use client";

import { useState } from 'react';
import { apiKeyService } from '@/app/services/apiKeyService';

export function usePlayground() {
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setIsValidating(true);
    setValidationResult(null);

    try {
      const result = await apiKeyService.validateApiKey(apiKey);
      setValidationResult(result);
    } catch (error) {
      console.error('Error validating API key:', error);
      setValidationResult({ isValid: false, error: 'An error occurred while validating the key.' });
    } finally {
      setIsValidating(false);
    }
  };

  const clearResult = () => {
    setValidationResult(null);
  };

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
    if (validationResult) clearResult();
  };

  return {
    apiKey,
    isValidating,
    validationResult,
    handleSubmit,
    handleApiKeyChange,
    clearResult
  };
} 