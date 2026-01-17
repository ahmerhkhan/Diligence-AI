import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 text-center space-y-6">
            <h2 className="text-4xl font-bold text-yc-black">404</h2>
            <p className="text-xl text-gray-600">Page not found</p>
            <Link
                href="/"
                className="px-6 py-3 bg-yc-orange text-white rounded-md hover:bg-red-600 transition-colors"
            >
                Return Home
            </Link>
        </main>
    );
}
