import { Link } from "react-router-dom";
import { ThemeToggleButton } from "../components/common/ThemeToggleButton";
import UserDropdown from "../components/header/UserDropdown";

const AppHeader: React.FC = () => {
  return (
    <header className="sticky top-0 flex w-full bg-white border-b border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between w-full px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Logo Section */}
        <div>
          <Link to="/dashboard">
            {/* Logo standard pentru light mode */}
            <img
              className="dark:hidden"
              src="/images/logo/testflow-logo-light.svg"
              alt="TestFlow Logo"
              width="120"
            />
            {/* Logo-ul tău personalizat pentru dark mode */}
            <img
              className="hidden dark:block"
              src="/images/logo/testflow-logo.svg"
              alt="TestFlow Logo"
              width="120"
            />
          </Link>
        </div>

        {/* Spacer to push items to the right */}
        <div className="flex-grow"></div>

        {/* Right-aligned items */}
        <div className="flex items-center gap-4">
          <ThemeToggleButton />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;