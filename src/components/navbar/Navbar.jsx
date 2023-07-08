import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-white text-lg font-semibold">
            File Uploader
          </Link>
          <div>
            <Link
              to="/home"
              className="text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Upload Excel
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
