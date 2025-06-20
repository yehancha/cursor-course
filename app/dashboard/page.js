"use client";

import { useState } from "react";

// A simple function to generate a random string for the API key.
const generateApiKey = () => {
  // This is a simple example. In a real application, use a more secure method.
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = 'sk_';
  for (let i = 0; i < 32; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState([
    { name: "My First Key", key: generateApiKey(), createdAt: new Date().toISOString() },
  ]);

  const createNewKey = () => {
    const name = prompt("Enter a name for your new API key:");
    if (name) {
      const newKey = { name, key: generateApiKey(), createdAt: new Date().toISOString() };
      setApiKeys([...apiKeys, newKey]);
    }
  };

  const revokeKey = (keyToRevoke) => {
    if (window.confirm("Are you sure you want to revoke this key? This action cannot be undone.")) {
        setApiKeys(apiKeys.filter((apiKey) => apiKey.key !== keyToRevoke));
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="z-10 w-full max-w-5xl">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">API Key Management</h1>
            <button
                onClick={createNewKey}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors"
            >
                Create new key
            </button>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">API Key</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {apiKeys.length > 0 ? apiKeys.map((apiKey) => (
                <tr key={apiKey.key} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">{apiKey.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">{apiKey.key.substring(0, 8)}...</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(apiKey.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => revokeKey(apiKey.key)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md text-xs transition-colors"
                    >
                      Revoke
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                    <td colSpan="4" className="text-center py-10">
                        No API keys found. Create one to get started!
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
} 