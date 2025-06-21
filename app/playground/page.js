"use client";

import { usePlayground } from './hooks/usePlayground';
import ApiKeyInput from './components/ApiKeyInput';
import ValidationResult from './components/ValidationResult';
import ResultsSection from './components/ResultsSection';

export default function Playground() {
  const {
    apiKey,
    isValidating,
    validationResult,
    handleSubmit,
    handleApiKeyChange
  } = usePlayground();

  return (
    <main className="min-h-screen bg-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">API Playground</h1>
          <p className="mt-2 text-lg text-gray-600">
            Test your API keys and explore the Research API functionality in real-time.
          </p>
        </div>

        {/* API Key Input Section */}
        <ApiKeyInput
          apiKey={apiKey}
          isValidating={isValidating}
          onSubmit={handleSubmit}
          onApiKeyChange={handleApiKeyChange}
        />

        {/* Validation Result */}
        <ValidationResult validationResult={validationResult} />

        {/* Results Section */}
        <ResultsSection validationResult={validationResult} />
      </div>
    </main>
  );
} 