import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function ValidationResult({ validationResult }) {
  if (!validationResult) return null;

  return (
    <div className="mt-6">
      {validationResult.isValid ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center">
            <CheckCircleIcon className="w-6 h-6 text-green-600 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-green-800">API Key Valid</h3>
              <p className="text-sm text-green-700 mt-1">
                Your API key &quot;{validationResult.key?.name}&quot; is valid and ready to use.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center">
            <XCircleIcon className="w-6 h-6 text-red-600 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-800">API Key Invalid</h3>
              <p className="text-sm text-red-700 mt-1">
                {validationResult.error || "The provided API key is not valid. Please check your key and try again."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 