import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-4">404</p>
        <h1 className="text-3xl font-bold mb-3">Page not found</h1>
        <p className="text-gray-400 mb-8">
          This URL is not part of the portfolio. Head back to the homepage for projects, services, and contact options.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 btn-base btn-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
