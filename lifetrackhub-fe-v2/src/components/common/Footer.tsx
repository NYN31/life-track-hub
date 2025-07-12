import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bottom-0 left-0 right-0 z-50 h-14 border-t border-gray-300 bg-white text-gray-500 py-6 mt-auto bg-gradient-to-r from-white to-purple-50 shadow-sm border-b">
      <div className="mx-auto px-4 flex flex-col sm:flex-row justify-center items-center text-sm">
        {/* Left Side: Copyright */}
        <p className="mb-2 sm:mb-0">
          &copy; {new Date().getFullYear()} LifeTrackHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
