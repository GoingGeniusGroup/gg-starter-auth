"use client";

import React from "react";
import { FloatingDockInverted } from "@/components/ui/dock/floating-dock-inverted";
import {
  Icon3dRotate,
  IconBrandPushover,
  IconCoinEuroFilled,
  IconDeviceGamepad2,
  IconFocus,
  IconGridPattern,
  IconHome,
  IconPhotoStar,
  IconShoppingBag,
  IconShoppingBagHeart,
  IconSlash,
  IconUser,
  IconUserBitcoin,
  IconUserCode,
} from "@tabler/icons-react";
import { useUser } from "@/hooks/UserProvider";

export default function FloatingDockInvertedComponent() {
  const usernameContext = useUser();
  const username = usernameContext
    ? usernameContext.username
    : "defaultUsername";

  const links = [
    {
      title: "Home",
      icon: <IconHome className="size-full" />,
      href: "/",
    },

    // {
    //   title: "Shop",
    //   icon: <IconShoppingBag className="size-full" />,
    //   href: "/shop-test",
    // },
    {
      title: "Virtual Shop",
      icon: <IconShoppingBagHeart className="size-full" />,
      href: "/shop",
    },
    {
      title: "Steam",
      icon: <IconDeviceGamepad2 className="size-full" />,
      href: "/steam",
    },
    // {
    //   title: "Focus Cards",
    //   icon: <IconFocus className="size-full" />,
    //   href: "/focus-cards",
    // },

    // {
    //   title: "Card Hover Effect",
    //   icon: <IconBrandPushover className="size-full" />,
    //   href: "/card-hover-effect",
    // },
    // {
    //   title: "Bento Grid",
    //   icon: <IconGridPattern className="size-full" />,
    //   href: "/bento-grid",
    // },
    // {
    //   title: "Tabs",
    //   icon: <IconSlash className="size-full" />,
    //   href: "/tabs",
    // },
    // {
    //   title: "Console",
    //   icon: <IconCoinEuroFilled className="size-full" />,
    //   href: "/console",
    // },
    // {
    //   title: "avatar",
    //   icon: <IconUserCode className="size-full" />,
    //   // href: `/genius-profile/${username}`,
    //   href: `/avatar`,
    // },
    // {
    //   title: "Posts",
    //   icon: <IconPhotoStar className="size-full" />,
    //   href: "/posts",
    // },
    {
      title: "Profile",
      icon: <IconUser className="size-full" />,
      href: `/genius-profile/${username}`,
    },
    // {
    //   title: "Profile Parallel Routing",
    //   icon: <Icon3dRotate className="size-full" />,
    //   href: `/genius-profile-parallel/${username}`,
    // },
  ];
  return <FloatingDockInverted items={links} />;
}
