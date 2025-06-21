"use client";

import { useState, useEffect } from "react";
import { PlusIcon, EyeIcon, DocumentDuplicateIcon, PencilIcon, TrashIcon, InformationCircleIcon, EyeSlashIcon, CheckIcon, ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { createClient } from '@/utils/supabase/client'

// A simple function to generate a random string for the API key.
// const generateApiKey = () => {
//   // This is a simple example. In a real application, use a more secure method.
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   let result = 'tvly-';
//   for (let i = 0; i < 32; i++) {
//     result += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return result;
// };

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [revealedKeys, setRevealedKeys] = useState({});
  const [copiedKey, setCopiedKey] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [editingKeyName, setEditingKeyName] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingKey, setDeletingKey] = useState(null);
  const [isCreatingKey, setIsCreatingKey] = useState(false);
  const [isUpdatingKey, setIsUpdatingKey] = useState(false);
  const [isDeletingKey, setIsDeletingKey] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const { data, error } = await supabase
          .from('api_keys')
          .select('*');
        if (error) {
          console.error('Error fetching API keys:', error);
        } else {
          setApiKeys(data);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchApiKeys();
  }, [supabase]);

  const handleCreateKey = async (e) => {
    e.preventDefault();
    if (newKeyName) {
      setIsCreatingKey(true);
      try {
        const { data, error } = await supabase
          .from('api_keys')
          .insert([{ name: newKeyName }])
          .select();

        if (error) {
          console.error('Error creating API key:', error);
        } else {
          setApiKeys([...apiKeys, ...data]);
          setRevealedKeys(prev => ({ ...prev, [data[0].api_key]: true }));
          closeModal();
        }
      } finally {
        setIsCreatingKey(false);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewKeyName("");
  };

  const toggleKeyVisibility = (key) => {
    setRevealedKeys(prev => ({
        ...prev,
        [key]: !prev[key]
    }));
  };

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => {
        setCopiedKey(null);
    }, 2000);
  };

  const openEditModal = (keyToEdit) => {
    setEditingKey(keyToEdit);
    setEditingKeyName(keyToEdit.name);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingKey(null);
    setEditingKeyName("");
  };

  const handleUpdateKeyName = async (e) => {
    e.preventDefault();
    if (editingKey && editingKeyName) {
      setIsUpdatingKey(true);
      try {
        const { data, error } = await supabase
            .from('api_keys')
            .update({ name: editingKeyName })
            .eq('id', editingKey.id)
            .select();

        if (error) {
            console.error('Error updating API key:', error);
        } else {
            setApiKeys(apiKeys.map(k => (k.id === editingKey.id ? data[0] : k)));
            closeEditModal();
        }
      } finally {
        setIsUpdatingKey(false);
      }
    }
  };

  const openDeleteModal = (key) => {
    setDeletingKey(key);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingKey(null);
  };

  const handleRevokeKey = async () => {
    if (deletingKey) {
      setIsDeletingKey(true);
      try {
        const { error } = await supabase
            .from('api_keys')
            .delete()
            .eq('id', deletingKey.id);

        if (error) {
            console.error('Error revoking API key:', error);
        } else {
            setApiKeys(apiKeys.filter((apiKey) => apiKey.id !== deletingKey.id));
            closeDeleteModal();
        }
      } finally {
        setIsDeletingKey(false);
      }
    }
  };

  return (
    <main className="min-h-screen bg-white p-4 sm:p-8">
        <div className="max-w-5xl mx-auto">
            {/* Plan Section */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-xs bg-white/20 rounded-full px-3 py-1 font-semibold">CURRENT PLAN</span>
                        <h2 className="text-5xl font-bold mt-2">Researcher</h2>
                    </div>
                    <button className="flex items-center gap-2 text-sm bg-white/25 hover:bg-white/40 rounded-full px-4 py-2 transition-colors font-medium">
                        <PencilIcon className="w-4 h-4" />
                        Manage Plan
                    </button>
                </div>
                <div className="mt-8">
                    <div className="flex justify-between items-center text-sm">
                        <span className="flex items-center gap-1">
                            API Limit
                            <InformationCircleIcon className="w-4 h-4" />
                        </span>
                        <span>8 / 1,000 Requests</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-2.5 mt-2">
                        <div className="bg-white rounded-full h-2.5" style={{width: '0.8%'}}></div>
                    </div>
                </div>
            </div>

            {/* API Keys Section */}
            <div className="mt-12">
                <div className="flex items-center gap-4">
                    <h3 className="text-xl font-bold text-gray-800">API Keys</h3>
                    <button onClick={() => setIsModalOpen(true)} className="bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors">
                        <PlusIcon className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                    The key is used to authenticate your requests to the Research API. To learn more, see the <a href="#" className="text-purple-600 hover:underline">documentation page</a>.
                </p>
                
                <div className="mt-6">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-10">
                            <ArrowPathIcon className="w-6 h-6 text-gray-500 animate-spin" />
                            <p className="ml-3 text-gray-500">Loading API keys...</p>
                        </div>
                    ) : apiKeys.length === 0 ? (
                        <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
                            <h4 className="text-lg font-semibold text-gray-700">No API keys yet</h4>
                            <p className="mt-2 text-sm text-gray-500">Get started by creating your first API key.</p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="mt-4 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                            >
                                Create API Key
                            </button>
                        </div>
                    ) : (
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
                    )}
                </div>
            </div>
        </div>

        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
                    <form onSubmit={handleCreateKey}>
                        <h2 className="text-2xl font-bold text-center text-gray-800">Create a new API key</h2>
                        <p className="text-gray-500 text-center mt-2 text-sm">Enter a name and limit for the new API key.</p>
                        
                        <div className="mt-8">
                            <label htmlFor="keyName" className="text-sm font-medium text-gray-700">Key Name — <span className="text-gray-500">A unique name to identify this key</span></label>
                            <input 
                                id="keyName"
                                type="text"
                                value={newKeyName}
                                onChange={(e) => setNewKeyName(e.target.value)}
                                placeholder="Key Name"
                                required
                                className="mt-2 w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                            />
                        </div>

                        <div className="mt-6">
                            <label className="flex items-center">
                                <input type="checkbox" className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                                <span className="ml-2 text-sm text-gray-700">Limit monthly usage*</span>
                            </label>
                            <input 
                                type="text"
                                value="1000"
                                disabled
                                className="mt-2 w-full px-4 py-2.5 border border-gray-200 bg-gray-100 rounded-lg text-gray-700"
                            />
                        </div>
                        
                        <p className="text-xs text-gray-500 mt-4">* If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.</p>

                        <div className="mt-8 flex justify-end gap-4">
                            <button type="button" onClick={closeModal} className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition">Cancel</button>
                            <button type="submit" disabled={isCreatingKey} className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition flex items-center disabled:opacity-50 disabled:cursor-not-allowed">
                                {isCreatingKey && <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />}
                                {isCreatingKey ? 'Creating...' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        {isEditModalOpen && editingKey && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
                    <form onSubmit={handleUpdateKeyName}>
                        <h2 className="text-2xl font-bold text-center text-gray-800">Edit API Key</h2>
                        <p className="text-gray-500 text-center mt-2 text-sm">Update the name for your API key.</p>
                        
                        <div className="mt-8">
                            <label htmlFor="editingKeyName" className="text-sm font-medium text-gray-700">Key Name</label>
                            <input 
                                id="editingKeyName"
                                type="text"
                                value={editingKeyName}
                                onChange={(e) => setEditingKeyName(e.target.value)}
                                required
                                className="mt-2 w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                            />
                        </div>

                        <div className="mt-8 flex justify-end gap-4">
                            <button type="button" onClick={closeEditModal} className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition">Cancel</button>
                            <button type="submit" disabled={isUpdatingKey} className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition flex items-center disabled:opacity-50 disabled:cursor-not-allowed">
                                {isUpdatingKey && <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />}
                                {isUpdatingKey ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        {isDeleteModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                        </div>
                        <h2 className="text-2xl font-bold mt-4 text-gray-800">Revoke API Key</h2>
                        <p className="text-gray-500 mt-2 text-sm">
                            Are you sure you want to revoke this API key? This action cannot be undone.
                        </p>
                    </div>
                    <div className="mt-8 flex justify-center gap-4">
                        <button type="button" onClick={closeDeleteModal} className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition">
                            Cancel
                        </button>
                        <button type="button" onClick={handleRevokeKey} disabled={isDeletingKey} className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition flex items-center disabled:opacity-50 disabled:cursor-not-allowed">
                            {isDeletingKey && <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />}
                            {isDeletingKey ? 'Revoking...' : 'Revoke'}
                        </button>
                    </div>
                </div>
            </div>
        )}
    </main>
  );
} 