'use client';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <p className="mb-4 font-semibold text-indigo-500 md:mb-6 md:text-lg xl:text-xl">
            Proud to introduce
          </p>
          <h1 className="mb-8 text-3xl font-bold text-black sm:text-4xl md:mb-12 md:text-5xl">
            Revolutionary way to build the web
          </h1>
          <p className="mb-8 text-lg text-gray-700 md:mb-12 md:text-xl">
            Welcome to DocDoc, the ultimate knowledge sharing platform. Create
            and share articles effortlessly, collaborate with peers, and enjoy
            automatic text linting for flawless writing. With our AI-powered
            local LLM, you can review and refine your content like never before.
            Join us and experience the future of content creation.
          </p>
          <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard"
              className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
            >
              Start now
            </Link>
            <Link
              href="/tour"
              className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
            >
              Take a tour
            </Link>
            <Link
              href="/api-docs"
              className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
            >
              API Docs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
