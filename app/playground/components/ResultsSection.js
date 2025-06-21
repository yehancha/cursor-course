export default function ResultsSection({ validationResult }) {
  return (
    <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Test Results</h2>
      <div className="bg-gray-50 rounded-md p-4">
        <p className="text-sm text-gray-600">
          {validationResult?.isValid 
            ? "Your API key is valid! You can now proceed with API testing."
            : "Test results will appear here once you submit a valid API key."
          }
        </p>
      </div>
    </div>
  );
} 