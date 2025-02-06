import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

export const Footer: React.FC = () => {
  return (
    <>
    <footer className="  dark:text-white dark:border border py-6 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Left Section - Copyright */}
          <div className="text-center sm:text-left">
            <p className="text-sm">&copy; 2025 GG Shop. All Rights Reserved.</p>
          </div>

          {/* Center Section - Links (Optional) */}
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="/privacy" className="text-sm hover:text-gray-400">
              Privacy Policy
            </a>
            <a href="/terms" className="text-sm hover:text-gray-400">
              Terms & Conditions
            </a>
            <a href="/contact" className="text-sm hover:text-gray-400">
              Contact Us
            </a>
          </div>

          {/* Right Section - Social Media Icons */}
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="dark:text-white hover:text-gray-400 text-xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="dark:text-white hover:text-gray-400 text-xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="dark:text-white hover:text-gray-400 text-xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}
