"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ExternalLink, Camera } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface StatItemProps {
  value: string;
  label: string;
}

function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xl font-bold">{value}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

export default function ProfileComponent() {
  const [coverImage, setCoverImage] = useState("/assets/coverPicture.svg");
  const [profileImage, setProfileImage] = useState("/assets/userAvatar.svg");
  const [bio, setBio] = useState("Let's Get Started Genius");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = URL.createObjectURL(event.target.files[0]);
      setCoverImage(file);
    }
  };

  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = URL.createObjectURL(event.target.files[0]);
      setProfileImage(file);
    }
  };
  const { data: session } = useSession();
  const user = session?.user;
  console.log(user);
  const toggleEditBio = () => {
    setIsEditingBio(!isEditingBio);
  };

  const saveBio = () => {
    // Save the bio (e.g., send to backend or save in state)
    console.log("Saved bio:", bio);
    setIsEditingBio(false);
  };
  return (
    <div className="w-full max-w-md h-full overflow-auto  mx-auto">
      <div className="relative">
        <Image
          src={coverImage}
          alt="Cover Image"
          width={400}
          height={200}
          className="w-full h-[120px]  object-cover"
        />
        <div className="absolute right-4 top-4">
          <label className="cursor-pointer">
            <Camera className="w-6 h-6 text-white" />
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="px-4 pb-6 -mt-16">
        <div className="relative mb-2">
          <div className="w-24 h-24 mx-auto relative">
            <Image
              src={profileImage}
              alt="Profile picture"
              width={128}
              height={128}
              className="rounded-full border-2 border-background"
            />
            <div className="absolute right-0 bottom-0">
              <label className="cursor-pointer">
                <Camera className="w-6 h-6 text-gray-800 dark:text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-xl dark:text-muted-foreground font-bold dark:text-gray-500">
            {user.name}
          </h1>
          <p className="dark:text-muted-foreground text-sm">{user.email}</p>
          <span className="inline-block px-2 py-1 mt-2 text-xs font-semibold text-blue-400 bg-blue-400/20 rounded-full">
            {user.role}
          </span>
        </div>

        <div className="flex justify-center items-center text-black mt-2 dark:text-gray-500 mb-4 px-8 space-x-0 relative">
          <div className="flex items-center space-x-2  dark:text-muted-foreground">
            <StatItem value="10K" label="Appreciations" />
            <div className="w-px h-8 bg-gray-400" />
            <StatItem value="200" label="Followers" />
            <div className="w-px h-8 bg-gray-400" />
            <StatItem value="1k" label="ProductViews" />
          </div>
        </div>

        <Card className="p-2 max-w-full mb-4 bg-white bg-opacity-20 ">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold dark:text-black  ">BIO</h2>
            {!isEditingBio && (
              <button
                onClick={toggleEditBio}
                className="flex items-center space-x-1 text-blue-500 text-sm hover:underline"
              >
                <ExternalLink className="w-5 h-5" />
              </button>
            )}
          </div>
          {isEditingBio ? (
            <div>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2 mt-2 text-sm bg-slate-50 dark:text-black opacity-70 rounded-md"
              />
              <button
                onClick={saveBio}
                className="mt-2 px-4 py-1 text-sm text-white bg-blue-500 rounded-md"
              >
                Save
              </button>
            </div>
          ) : (
            <p className="mt-2 text-muted-foreground text-sm">{bio}</p>
          )}
        </Card>

        <Card className="p-4 bg-[#1a1a1a] border-none relative overflow-auto">
          <div className="relative z-10">
            <div className="text-purple-400 text-sm mb-3">GENIUS ID</div>
            <div className="text-white space-y-1">
              <div className="font-bold">GUEST</div>
              <div className="text-sm text-purple-400">
                jennie@goinggenius.com.np
              </div>
              <div className="text-sm">
                <div>Address : KTM</div>
                <div>Contact : 9803020493</div>
              </div>
            </div>
            <div className="absolute bottom-0 right-3 text-purple-400">GG</div>
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-red-900"
            style={{
              maskImage:
                "radial-gradient(circle at 70% 30%, black 0%, transparent 70%)",
            }}
          />
        </Card>
      </div>
    </div>
  );
}
