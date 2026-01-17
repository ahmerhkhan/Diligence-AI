'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 text-center space-y-6">
            <h2 className="text-2xl font-bold text-yc-black">Something went wrong!</h2>
            <p className="text-gray-600 max-w-md">
                {error.message || "We encountered an unexpected error analyzing that startup."}
            </p>
            <div className="flex space-x-4">
                <button
                    onClick={() => reset()}
                    className="px-4 py-2 bg-yc-orange text-white rounded-md hover:bg-red-600 transition-colors"
                >
                    Try again
                </button>
                <Link
                    href="/"
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                    Go Home
                </Link>
            </div>
        </main>
    );
}
