"use client";

import CustomToolTipLeftRight from "@/components/subComponents/customToolTipLeftRight";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaMapPin } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import BusinessCard from "../card/businessCard";

export default function ProfileComponent() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  // Check if user has region data and set region status accordingly

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-full flex-col overflow-hidden pb-8">
      <div className="h-full flex-1 items-center justify-center text-white">
        {/* CoverImage */}
        <div className="relative h-[170px] w-full overflow-hidden rounded-lg">
          <Image
            src={"/card/abstract1.webp"}
            alt="porfilepic"
            height={170}
            width={500}
            unoptimized
            className="rounded object-cover"
          />

          <p className="absolute bottom-2 flex justify-center overflow-hidden text-wrap pt-2">
            <span className="pl-2 text-sm font-semibold text-white drop-shadow">
              hello
            </span>
          </p>
        </div>

        <div className="mt-1 flex justify-center ">
          {!showForm && (
            <button
              className="fixed z-10 mt-6 flex pl-2"
              onClick={handleShowForm}
            >
              <div className="group">
                <FaEdit size={14} className="cursor-pointer" />
                <CustomToolTipLeftRight
                  content="Edit Here"
                  top="-4"
                  left="-20"
                  translateY="0"
                />
              </div>
            </button>
          )}
          <BusinessCard />
        </div>
        <motion.div
          className={`fixed left-0 top-0 flex size-full items-center justify-center ${
            showForm ? "block" : "hidden"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: showForm ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="absolute inset-0 z-10 size-full bg-black/50"
            onClick={handleShowForm}
          ></div>
          <motion.div
            className="z-20 mx-auto w-[90%] rounded-lg bg-black p-6 shadow-lg"
            initial={{ scale: 0.9 }}
            animate={{ scale: showForm ? 1 : 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <button className="text-white" onClick={handleShowForm}>
              <IoChevronBack size={24} />
            </button>
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
              <div className="flex flex-col">
                <label htmlFor="username" className="font-semibold">
                  USERNAME
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  value={form.username}
                  className="rounded-md bg-black/50 px-3 text-white dark:bg-white/20"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="description" className="font-semibold">
                  BIO
                </label>
                <input
                  type="text"
                  name="description"
                  id="bio"
                  placeholder="Bio"
                  value={form.description}
                  className="rounded-md bg-black/50 px-3 text-white dark:bg-white/20"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="dob" className="font-semibold">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  placeholder="Date of Birth"
                  value={form.dob}
                  className="rounded-md bg-black/50 px-3 text-white dark:bg-white/20"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone_number" className="font-semibold">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone_number"
                  id="phone_number"
                  placeholder="Phone Number"
                  value={form.phone_number}
                  className="rounded-md bg-black/50 px-3 text-white dark:bg-white/20"
                  onChange={handleInputChange}
                />
              </div>

              <button
                type="submit"
                className="mt-4 rounded-md bg-white px-4 py-2 text-black hover:bg-white"
              >
                Update
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
