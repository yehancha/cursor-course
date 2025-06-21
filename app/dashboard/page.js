"use client";

import { PlusIcon } from '@heroicons/react/24/outline';
import { useApiKeys } from './hooks/useApiKeys';
import PlanSection from './components/PlanSection';
import ApiKeyList from './components/ApiKeyList';
import CreateKeyModal from './components/CreateKeyModal';
import EditKeyModal from './components/EditKeyModal';
import DeleteKeyModal from './components/DeleteKeyModal';

export default function Dashboard() {
  const {
    apiKeys,
    isModalOpen,
    newKeyName,
    setNewKeyName,
    revealedKeys,
    copiedKey,
    isEditModalOpen,
    editingKey,
    editingKeyName,
    setEditingKeyName,
    isDeleteModalOpen,
    deletingKey,
    isCreatingKey,
    isUpdatingKey,
    isDeletingKey,
    isLoading,
    handleCreateKey,
    openModal,
    closeModal,
    toggleKeyVisibility,
    handleCopyKey,
    openEditModal,
    closeEditModal,
    handleUpdateKeyName,
    openDeleteModal,
    closeDeleteModal,
    handleRevokeKey
  } = useApiKeys();

  return (
    <main className="min-h-screen bg-white p-4 sm:p-8">
        <div className="max-w-5xl mx-auto">
            <PlanSection />

            {/* API Keys Section */}
            <div className="mt-12">
                <div className="flex items-center gap-4">
                    <h3 className="text-xl font-bold text-gray-800">API Keys</h3>
                    <button onClick={openModal} className="bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors">
                        <PlusIcon className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                    The key is used to authenticate your requests to the Research API. To learn more, see the <a href="#" className="text-purple-600 hover:underline">documentation page</a>.
                </p>
                
                <div className="mt-6">
                    <ApiKeyList
                        isLoading={isLoading}
                        apiKeys={apiKeys}
                        openModal={openModal}
                        revealedKeys={revealedKeys}
                        toggleKeyVisibility={toggleKeyVisibility}
                        copiedKey={copiedKey}
                        handleCopyKey={handleCopyKey}
                        openEditModal={openEditModal}
                        openDeleteModal={openDeleteModal}
                    />
                </div>
            </div>
        </div>

        <CreateKeyModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            handleCreateKey={handleCreateKey}
            newKeyName={newKeyName}
            setNewKeyName={setNewKeyName}
            isCreatingKey={isCreatingKey}
        />

        <EditKeyModal
            isEditModalOpen={isEditModalOpen}
            closeEditModal={closeEditModal}
            handleUpdateKeyName={handleUpdateKeyName}
            editingKey={editingKey}
            editingKeyName={editingKeyName}
            setEditingKeyName={setEditingKeyName}
            isUpdatingKey={isUpdatingKey}
        />

        <DeleteKeyModal
            isDeleteModalOpen={isDeleteModalOpen}
            closeDeleteModal={closeDeleteModal}
            handleRevokeKey={handleRevokeKey}
            deletingKey={deletingKey}
            isDeletingKey={isDeletingKey}
        />
    </main>
  );
} 