'use client';
import Link from 'next/link';
import Navbar from '../components/Navbar';

const Tour = () => {
  const features = [
    {
      title: 'Create & Share Articles',
      description:
        'Write articles effortlessly with our intuitive editor. Share your knowledge with your team or the world.',
      icon: '📝',
    },
    {
      title: 'Collaborate with Peers',
      description:
        'Work together with your team members. Review, comment, and improve content collaboratively.',
      icon: '👥',
    },
    {
      title: 'Automatic Text Linting',
      description:
        'Ensure flawless writing with built-in text linting. Catch errors and improve readability automatically.',
      icon: '✨',
    },
    {
      title: 'API Documentation',
      description:
        'Explore our comprehensive API documentation with Swagger UI. Integrate DocDoc into your workflow.',
      icon: '🔌',
    },
  ];

  const steps = [
    {
      step: 1,
      title: 'Create a User',
      description:
        'Start by creating your user account to get access to all features.',
    },
    {
      step: 2,
      title: 'Write Your First Post',
      description:
        'Create your first post using our simple and intuitive interface.',
    },
    {
      step: 3,
      title: 'Add Tags',
      description:
        'Organize your content with tags to make it easier to find and categorize.',
    },
    {
      step: 4,
      title: 'Share & Collaborate',
      description:
        'Share your posts with others and collaborate on improving content.',
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          {/* Hero Section */}
          <div className="mx-auto flex max-w-xl flex-col items-center text-center mb-16">
            <h1 className="mb-8 text-3xl font-bold text-black sm:text-4xl md:mb-12 md:text-5xl">
              Welcome to DocDoc
            </h1>
            <p className="mb-4 text-gray-500 md:mb-6 md:text-lg xl:text-xl">
              Discover how DocDoc can transform the way you create, share, and
              manage your documentation.
            </p>
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">
              Key Features
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Getting Started Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">
              Getting Started
            </h2>
            <div className="max-w-3xl mx-auto">
              {steps.map((item, index) => (
                <div key={index} className="flex items-start mb-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-8">
              Join DocDoc today and experience the future of documentation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/users"
                className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
              >
                Create User
              </Link>
              <Link
                href="/api-docs"
                className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
              >
                View API Docs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tour;
