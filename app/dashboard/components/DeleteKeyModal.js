import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Modal from '@/app/components/Modal';

export default function DeleteKeyModal({
    isDeleteModalOpen,
    closeDeleteModal,
    handleRevokeKey,
    isDeletingKey
}) {
    return (
        <Modal
            isOpen={isDeleteModalOpen}
            onClose={closeDeleteModal}
            title="Revoke API Key"
            description="Are you sure you want to revoke this API key? This action cannot be undone."
            primaryAction={handleRevokeKey}
            primaryButtonText="Revoke"
            primaryButtonVariant="red"
            isLoading={isDeletingKey}
            loadingText="Revoking..."
            icon={ExclamationTriangleIcon}
            iconBgColor="bg-red-100"
            iconColor="text-red-600"
        />
    );
} 