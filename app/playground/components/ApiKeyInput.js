import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

export default function ApiKeyInput({ 
  apiKey, 
  isValidating, 
  onSubmit, 
  onApiKeyChange 
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">API Key</h2>
        <p className="text-sm text-gray-600">
          Enter your API key to start testing. You can find your API keys in the Dashboard.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
            API Key
          </label>
          <input
            type="password"
            id="apiKey"
            value={apiKey}
            onChange={onApiKeyChange}
            placeholder="Enter your API key here..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            required
            disabled={isValidating}
          />
        </div>

        <button
          type="submit"
          disabled={isValidating || !apiKey.trim()}
          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isValidating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Validating...
            </>
          ) : (
            <>
              <PaperAirplaneIcon className="w-4 h-4 mr-2" />
              Test API Key
            </>
          )}
        </button>
      </form>
    </div>
  );
} 