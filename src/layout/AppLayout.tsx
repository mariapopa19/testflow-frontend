import { Outlet, Link, useLocation } from 'react-router';
import AppHeader from './AppHeader';
import Backdrop from './Backdrop';

const LayoutContent: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out dark:bg-gray-900 dark:border-gray-800`}
      >
        <AppHeader />
        {/* Navigation Bar */}
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-3 px-4 sm:px-6 lg:px-8">
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/dashboard"
                className={`text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
                  location.pathname.startsWith('/dashboard')
                    ? 'bg-brand-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/endpoints"
                className={`text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
                  location.pathname.startsWith('/endpoints')
                    ? 'bg-brand-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                Endpoints
              </Link>
            </li>
            <li>
              <Link
                to="/reports"
                className={`text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
                  location.pathname.startsWith('/reports')
                    ? 'bg-brand-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                Reports
              </Link>
            </li>
            {/* New Link for Test History */}
            <li>
              <Link
                to="/test-runs"
                className={`text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
                  location.pathname.startsWith('/test-runs')
                    ? 'bg-brand-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                Test History
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return <LayoutContent />;
};

export default AppLayout;
