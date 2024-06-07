import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-8">
          <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
          <p className="text-2xl text-gray-600 mt-2">Oops! Page not found</p>
        </div>
        <p className="text-gray-600 mb-8">
          Sorry, the page youre looking for doesnt exist or has been moved.
        </p>
        <Link href="/">
          <a className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition duration-200">
            Go Back Home
          </a>
        </Link>
      </div>
    </div>
  );
};
export default ErrorPage;
