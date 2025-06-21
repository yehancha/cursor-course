import { PencilIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export default function PlanSection() {
    return (
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
    );
} 