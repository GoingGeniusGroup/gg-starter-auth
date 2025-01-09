"use client";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
  CardFooter,
} from "../ui/card";
import Link from "next/link";

interface khaltiSuccessProps {
  topup: {
    amount: number;
    topupStatus: string;
    createdAt: Date;
    topupType: string;
  };
}

export function KhaltiSuccess({ topup }: khaltiSuccessProps) {
  return <Card className="w-full max-w-md"></Card>;
}
