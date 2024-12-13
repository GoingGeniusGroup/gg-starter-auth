import { FC } from "react";
import Image from "next/image";
const ProfileCard: FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-80 bg-gray-800 text-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="relative">
          <Image
            src="https://via.placeholder.com/300"
            alt="Car Background"
            className="w-full h-32 object-cover"
          />
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
            <Image
              src="https://via.placeholder.com/80"
              alt="Profile Picture"
              className="w-20 h-20 rounded-full border-4 border-gray-800"
            />
          </div>
        </div>

        <div className="mt-10 text-center">
          <h2 className="text-xl font-semibold">Rohit Shrestha</h2>
          <p className="text-gray-400 text-sm">Rohit@gmail.com</p>
          <p className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded-full inline-block">
            User
          </p>
        </div>
        {/* Stats Section */}
        <div className="flex justify-around mt-4 px-4">
          <div className="text-center">
            <p className="text-lg font-bold">10.3K</p>
            <p className="text-gray-400 text-sm">Appreciations</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">2.9K</p>
            <p className="text-gray-400 text-sm">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">129K</p>
            <p className="text-gray-400 text-sm">Project Views</p>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mt-4 px-4">
          <p className="text-gray-400 text-sm">BIO</p>
          <div className="bg-gray-700 p-2 rounded-md mt-1">
            <p>Lets Get Started Genius</p>
          </div>
        </div>

        {/* Genius ID Section */}
        <div className="mt-4 px-4">
          <div className="bg-gray-700 p-4 rounded-md">
            <h3 className="text-purple-500 text-lg font-bold">GENIUS ID</h3>
            <p className="text-sm mt-2">GUEST</p>
            <p className="text-sm">AlbertEinstein@goinggenius.com.np</p>
            <p className="text-sm">Contact: 9803020493</p>
          </div>
        </div>

        <div className="text-center mt-4 mb-4">
          <button className="bg-purple-500 px-4 py-2 rounded-full text-white">
            GOING GENIUS
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
