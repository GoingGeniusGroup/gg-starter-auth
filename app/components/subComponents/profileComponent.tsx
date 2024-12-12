"use client";

import GeniusID from "@/components/card/GeniusID";
import CustomToolTipLeftRight from "@/components/MyComponents/CustomToolTipLeftRight";
import { useUser } from "@/UserClientProvider";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import axios from "axios";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaMapPin } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";

export default function ProfileComponent() {
  const { user, updateUser } = useUser();
  const token = Cookies.get("token");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    username: user?.username || "",
    phone_number: user?.phone_number || "",
    dob: user?.dob || "",
    description: user?.description || "",
    region: user?.region || {
      ip: "",
      city: "",
      country: "",
      continent_code: "",
      latitude: "",
      longitude: "",
    },
    image_urls: user?.image_urls || [],
    cover_images: user?.cover_images || [],
  });

  const [regionStatus, setRegionStatus] = useState(false);

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
  useEffect(() => {
    if (user && user.region && user.region.ip) {
      setRegionStatus(true);
    }
  }, [user]);

  const handleRegionStatus = async (value) => {
    setRegionStatus(value);
    if (value) {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      if (window.confirm("Do you want to share the location via your IP?")) {
        setForm((prevForm) => ({
          ...prevForm,
          region: data,
        }));
      }
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        region: {
          ip: "",
          city: "",
          country: "",
          continent_code: "",
          latitude: "",
          longitude: "",
        },
      }));
    }
  };

  const handleImageChange = (type) => (items) => {
    const successfulFiles = items.allEntries.filter(
      (file) => file.status === "success"
    );
    const imageUrls = successfulFiles.map((file) => file.cdnUrl);
    if (type === "profile") {
      setForm((prevForm) => ({
        ...prevForm,
        image_urls: imageUrls,
      }));
      if (imageUrls && imageUrls.length > 0) {
        handleProfileImgUpdate(imageUrls[imageUrls.length - 1]);
      }
    } else if (type === "cover") {
      setForm((prevForm) => ({
        ...prevForm,
        cover_images: imageUrls,
      }));
      if (imageUrls && imageUrls.length > 0) {
        handleCoverImgUpdate(imageUrls[imageUrls.length - 1]);
      }
    }
  };

  const handleProfileImgUpdate = async (image_url) => {
    try {
      await axios.put(`/api/internal/users/${user.gg_id}`, {
        image_url: image_url,
      });
      setForm((prevForm) => ({
        ...prevForm,
        image_urls: [...user.image_urls, image_url],
      }));
      updateUser(token);
      toast.success("Profile pic updated successfully!");
    } catch (error) {
      toast.error("Error updating profile pic!");
    }
  };

  const handleCoverImgUpdate = async (image_url) => {
    try {
      await axios.put(`/api/internal/users/${user.gg_id}`, {
        cover_image: image_url,
      });
      setForm((prevForm) => ({
        ...prevForm,
        cover_images: [...user.cover_images, image_url],
      }));
      updateUser(token);
      toast.success("cover image updated successfully!");
    } catch (error) {
      toast.error("Error updating cover image!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = {
      username: form.username,
      phone_number: form.phone_number,
      dob: form.dob,
      description: form.description,
      region: form.region.ip
        ? form.region
        : {
            ip: "",
            city: "",
            country: "",
            continent_code: "",
            latitude: "",
            longitude: "",
          },
    };
    try {
      await axios.put(`/api/internal/users/${user.gg_id}`, submitData);
      // await RevalidateUser()
      updateUser(token);
      // revalidateUser()
      toast.success("Successfully updated!");
    } catch (error) {
      toast.error("Update failed!");
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden pb-8">
      {user && (
        <div className="h-full flex-1 items-center justify-center text-white">
          {/* CoverImage */}
          <div className="relative h-[170px] w-full overflow-hidden rounded-lg">
            <Image
              src={
                form.cover_images.length > 0
                  ? form.cover_images[form.cover_images.length - 1]
                  : "/card/defaultbuddha.svg"
              }
              alt="porfilepic"
              height={170}
              width={500}
              unoptimized
              className="rounded object-cover"
            />
            <FileUploaderRegular
              onChange={handleImageChange("cover")}
              pubkey={"aff2bf9d09cde0f92516"}
              maxLocalFileSizeBytes={10000000}
              imgOnly={true}
              sourceList="local, url, camera"
              className="absolute left-2 top-2 flex justify-center rounded-lg bg-black/30 dark:bg-white"
            />
            <p className="absolute bottom-2 flex justify-center overflow-hidden text-wrap pt-2">
              <span className="pl-2 text-sm font-semibold text-white drop-shadow">
                {form.description}
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
            <GeniusID username={form.username} contact={form.phone_number} />
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
                <div className="flex items-center gap-x-4">
                  <FaMapPin size={24} color={regionStatus ? "green" : "gray"} />
                  <p className="text-lg font-semibold">
                    {regionStatus ? "Location Enabled" : "Location Disabled"}
                  </p>
                  <label className="flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={regionStatus}
                      onChange={(e) => handleRegionStatus(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        regionStatus ? "bg-white" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute left-1 size-5 rounded-full bg-black transition-transform ${
                          regionStatus ? "translate-x-5" : ""
                        }`}
                      />
                    </div>
                  </label>
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
      )}
    </div>
  );
}
