'use client';
import Link from 'next/link';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to the Dashboard
      </h1>
      <div className="text-center">
        <Link href="/dashboard" className="btn btn-primary mr-4">
          Go to Dashboard
        </Link>
        <Link href="/api-docs" className="btn btn-secondary">
          API Documentation
        </Link>
      </div>
    </div>
  );
};

export default Home;
