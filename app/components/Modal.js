import { ArrowPathIcon } from '@heroicons/react/24/outline';

export default function Modal({
    isOpen,
    onClose,
    title,
    description,
    children,
    primaryAction,
    secondaryAction,
    primaryButtonText,
    secondaryButtonText = "Cancel",
    primaryButtonVariant = "blue", // blue, red, etc.
    isLoading = false,
    loadingText,
    icon: Icon,
    iconBgColor = "bg-blue-100",
    iconColor = "text-blue-600"
}) {
    if (!isOpen) return null;

    const getButtonClasses = (variant) => {
        const baseClasses = "px-6 py-2.5 rounded-lg text-sm font-medium transition flex items-center disabled:opacity-50 disabled:cursor-not-allowed";
        
        switch (variant) {
            case "red":
                return `${baseClasses} text-white bg-red-600 hover:bg-red-700`;
            case "blue":
            default:
                return `${baseClasses} text-white bg-blue-600 hover:bg-blue-700`;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
                <div className="text-center">
                    {Icon && (
                        <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${iconBgColor} mb-4`}>
                            <Icon className={`h-6 w-6 ${iconColor}`} aria-hidden="true" />
                        </div>
                    )}
                    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                    {description && (
                        <p className="text-gray-500 mt-2 text-sm">{description}</p>
                    )}
                </div>

                <div className="mt-8">
                    {children}
                </div>

                <div className="mt-8 flex justify-center gap-4">
                    <button 
                        type="button" 
                        onClick={onClose} 
                        className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
                    >
                        {secondaryButtonText}
                    </button>
                    <button 
                        type="button" 
                        onClick={primaryAction} 
                        disabled={isLoading}
                        className={getButtonClasses(primaryButtonVariant)}
                    >
                        {isLoading && <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />}
                        {isLoading ? loadingText : primaryButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
} 