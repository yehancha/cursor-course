import { ArrowPathIcon, EyeIcon, EyeSlashIcon, DocumentDuplicateIcon, CheckIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function ApiKeyList({ 
    isLoading, 
    apiKeys, 
    openModal,
    revealedKeys,
    toggleKeyVisibility,
    copiedKey,
    handleCopyKey,
    openEditModal,
    openDeleteModal
}) {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-10">
                <ArrowPathIcon className="w-6 h-6 text-gray-500 animate-spin" />
                <p className="ml-3 text-gray-500">Loading API keys...</p>
            </div>
        );
    }

    if (apiKeys.length === 0) {
        return (
            <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-700">No API keys yet</h4>
                <p className="mt-2 text-sm text-gray-500">Get started by creating your first API key.</p>
                <button
                    onClick={openModal}
                    className="mt-4 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                    Create API Key
                </button>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase">
                    <tr>
                        <th className="p-3 font-medium">Name</th>
                        <th className="p-3 font-medium">Usage</th>
                        <th className="p-3 font-medium">Key</th>
                        <th className="p-3 font-medium">Options</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {apiKeys.map(apiKey => (
                        <tr key={apiKey.id} className="border-b border-gray-200 last:border-0">
                            <td className="p-3 font-medium">{apiKey.name}</td>
                            <td className="p-3">{apiKey.usage}</td>
                            <td className="p-3 font-mono">
                                {revealedKeys[apiKey.api_key] ? apiKey.api_key : `${apiKey.api_key.substring(0, 5)}********************************`}
                            </td>
                            <td className="p-3">
                                <div className="flex items-center gap-4">
                                    <button onClick={() => toggleKeyVisibility(apiKey.api_key)} className="text-gray-500 hover:text-gray-800">
                                        {revealedKeys[apiKey.api_key] ? <EyeSlashIcon className="w-5 h-5"/> : <EyeIcon className="w-5 h-5"/>}
                                    </button>
                                    <button onClick={() => handleCopyKey(apiKey.api_key)} className="text-gray-500 hover:text-gray-800">
                                        {copiedKey === apiKey.api_key ? <CheckIcon className="w-5 h-5 text-green-500"/> : <DocumentDuplicateIcon className="w-5 h-5"/>}
                                    </button>
                                    <button onClick={() => openEditModal(apiKey)} className="text-gray-500 hover:text-gray-800"><PencilIcon className="w-5 h-5"/></button>
                                    <button onClick={() => openDeleteModal(apiKey)} className="text-gray-500 hover:text-red-600"><TrashIcon className="w-5 h-5"/></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
} 