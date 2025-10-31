
import React from 'react';
import { User } from '../App';

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// Using the same icon as BantyAssistant for consistency
const BantyIcon = () => (
    <svg className="h-10 w-10 text-blue-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
        <path d="M19 10v2a7 7 0 01-14 0v-2H3v2a9 9 0 008 8.94V24h2v-3.06A9 9 0 0021 12v-2h-2z" />
    </svg>
);


interface ProactiveAssistantProps {
    user: User | null;
    onHelpClick: () => void;
    onClose: () => void;
}

const ProactiveAssistant: React.FC<ProactiveAssistantProps> = ({ user, onHelpClick, onClose }) => {
    const userName = user ? user.name.split(' ')[0] : 'there';

    return (
        <div className="fixed bottom-24 right-6 max-w-sm w-full bg-white rounded-lg shadow-2xl p-4 z-50 animate-fade-in-up">
            <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                aria-label="Close notification"
            >
                <CloseIcon />
            </button>
            <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                    <BantyIcon />
                </div>
                <div className="ml-3 w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                        Hi {userName}, I am banty,
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                        Can't find solutions, need help to find solutions,{' '}
                        <button
                            onClick={onHelpClick}
                            className="font-semibold text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                        >
                            click here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProactiveAssistant;
