import React from "react";

const Footer = () => {
  return (
    <footer className="text-center py-4 bg-gray-100 text-gray-600 mt-4">
      © {new Date().getFullYear()} Linkspher. All rights reserved.
    </footer>
  );
};

export default Footer;
