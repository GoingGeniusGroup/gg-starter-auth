// import VideoHome from "@/components/HomePage/VideoHome";
import { currentUser } from "@/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const user = await currentUser();
  return (
    <>
      <div>Hello {user?.username}</div>
      {/* <VideoHome /> */}
    </>
  );
}
