import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-800">
      <div className="text-center p-8 rounded-lg shadow-lg bg-gradient-to-r from-indigo-600 to-indigo-800 text-white w-full max-w-lg">
        <h1 className="text-6xl font-bold mb-4">Oops! 404</h1>
        <p className="text-xl mb-6">Sorry, the page you are looking for is missing.</p>
        <Link
          to="/"
          className="inline-block text-xl font-semibold bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
