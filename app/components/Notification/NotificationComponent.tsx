"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  type: "info" | "warning" | "error";
}

const mockNotifications: Notification[] = Array.from(
  { length: 50 },
  (_, i) => ({
    id: i + 1,
    title: `Notification ${i + 1}`,
    message: `This is the message for notification ${i + 1}`,
    date: new Date(
      Date.now() - Math.floor(Math.random() * 10000000000)
    ).toISOString(),
    type: ["info", "warning", "error"][Math.floor(Math.random() * 3)] as
      | "info"
      | "warning"
      | "error",
  })
);

export default function NotificationComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const itemsPerPage = 5;

  const filteredNotifications = mockNotifications
    .filter((notification) => filter === "all" || notification.type === filter)
    .sort((a, b) => {
      if (sort === "newest")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const currentNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="size-full max-w-3xl mx-auto overflow-auto">
      <CardHeader>
        <CardTitle className="dark:text-gray-300">Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-2 sm:space-y-0">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full dark:text-white sm:w-[100px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full dark:text-white sm:w-[100px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-4">
          {currentNotifications.map((notification) => (
            <div
              key={notification.id}
              className="p-4 border dark:text-gray-300 rounded-lg"
            >
              <h3 className="font-semibold">{notification.title}</h3>
              <p className="text-sm dark:text-gray-500">{notification.message}</p>
              <div className="flex justify-between items-center mt-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    notification.type === "info"
                      ? "bg-blue-100 text-blue-800"
                      : notification.type === "warning"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {notification.type}
                </span>
                <span className="text-xs dark:text-gray-400">
                  {new Date(notification.date).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </div>
  );
}
