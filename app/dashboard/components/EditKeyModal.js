import Modal from '@/app/components/Modal';

export default function EditKeyModal({
    isEditModalOpen,
    closeEditModal,
    handleUpdateKeyName,
    editingKeyName,
    setEditingKeyName,
    isUpdatingKey
}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdateKeyName(e);
    };

    return (
        <Modal
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            title="Edit API Key"
            description="Update the name for your API key."
            primaryAction={handleSubmit}
            primaryButtonText="Save Changes"
            isLoading={isUpdatingKey}
            loadingText="Saving..."
        >
            <form onSubmit={handleSubmit}>
                <div>
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
            </form>
        </Modal>
    );
} 