'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';

export default function SupabaseStatus() {
    const [isConfigured, setIsConfigured] = useState<boolean | null>(null);

    useEffect(() => {
        const checkConfig = () => {
            const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
            const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
            setIsConfigured(hasUrl && hasKey);
        };

        checkConfig();
    }, []);

    if (isConfigured === null) {
        return null; // Don't show anything while checking
    }

    if (isConfigured) {
        return (
            <div className="fixed bottom-4 right-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 shadow-lg z-50">
                <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm text-green-800 dark:text-green-200 font-medium">
                        Supabase Connected
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 shadow-lg z-50 max-w-sm">
            <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                    <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                        Supabase Not Configured
                    </h3>
                    <p className="text-yellow-700 dark:text-yellow-300 mb-3">
                        Authentication and database features are disabled. Please configure your Supabase credentials.
                    </p>
                    <div className="space-y-2">
                        <a
                            href="https://supabase.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-yellow-700 dark:text-yellow-300 hover:text-yellow-800 dark:hover:text-yellow-200 underline"
                        >
                            <span>Create Supabase Project</span>
                            <ExternalLink className="h-3 w-3" />
                        </a>
                        <div className="text-xs text-yellow-600 dark:text-yellow-400">
                            Copy env.example to .env.local and add your credentials
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
