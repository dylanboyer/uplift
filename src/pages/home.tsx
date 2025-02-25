import { Link } from "react-router-dom";
import {Widget} from "@/components/widget";

export default function Home() {
  return (
    <div className="bg-zinc-800 text-zinc-50 min-h-screen flex flex-col items-center py-12">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-indigo-400">
          Track Your Gym Progress and Achievements
        </h1>
        <p className="mt-4 text-lg text-zinc-300">
          Share your lifting journey, analyze your progress, and inspire your friends with your strength!
        </p>
      </header>

      {/* Features Section */}
      <section className="flex flex-col sm:flex-row justify-center gap-12 mb-16">
        <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-64">
          <h3 className="text-xl font-semibold text-indigo-400 mb-4">Track Your Lifts</h3>
          <p className="text-zinc-400">
            Log each of your lifts and see your progress over time with easy-to-read graphs and stats.
          </p>
        </div>
        <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-64">
          <h3 className="text-xl font-semibold text-indigo-400 mb-4">Analyze Your Progress</h3>
          <p className="text-zinc-400">
            Dive into the data of each lift type and see where you're improving or need more focus.
          </p>
        </div>
        <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-64">
          <h3 className="text-xl font-semibold text-indigo-400 mb-4">Connect with Friends</h3>
          <p className="text-zinc-400">
            Share your progress and cheer on your friends as they crush their fitness goals.
          </p>
        </div>
      </section>

      {/* Example Widget */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-indigo-400 mb-6">Your Progress Dashboard</h2>
        <Widget bucketId='1' />
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <Link
          to="/signup"
          className="bg-indigo-600 text-zinc-50 py-3 px-6 rounded-full text-xl hover:bg-indigo-500 transition duration-300"
        >
          Join Us and Start Tracking Today!
        </Link>
      </section>
    </div>
  );
}
