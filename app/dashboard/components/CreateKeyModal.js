import Modal from '@/app/components/Modal';

export default function CreateKeyModal({
    isModalOpen,
    closeModal,
    handleCreateKey,
    newKeyName,
    setNewKeyName,
    isCreatingKey
}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreateKey(e);
    };

    return (
        <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            title="Create a new API key"
            description="Enter a name and limit for the new API key."
            primaryAction={handleSubmit}
            primaryButtonText="Create"
            isLoading={isCreatingKey}
            loadingText="Creating..."
        >
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="keyName" className="text-sm font-medium text-gray-700">
                        Key Name — <span className="text-gray-500">A unique name to identify this key</span>
                    </label>
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
                
                <p className="text-xs text-gray-500 mt-4">
                    * If the combined usage of all your keys exceeds your plan&apos;s limit, all requests will be rejected.
                </p>
            </form>
        </Modal>
    );
} 