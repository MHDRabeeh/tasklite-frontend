"use client"
import Link from "next/link";
import { FaExclamationTriangle, FaSignInAlt } from "react-icons/fa";

export default function AuthPrompt() {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full text-center border border-gray-200 dark:border-gray-700">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
            <FaExclamationTriangle className="h-8 w-8 text-red-500 dark:text-red-400" />
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Session Expired
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your session has timed out. Please log in again to continue.
        </p>
        
        <div className="flex flex-col space-y-3">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <FaSignInAlt />
            Sign In
          </Link>
          
          <Link
            href="/"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Go back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}