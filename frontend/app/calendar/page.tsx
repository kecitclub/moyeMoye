"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Post } from "@/components/calendar/types/calendar";
import { CalendarView } from "@/components/calendar/calendar-view";
import { UpcomingPosts } from "@/components/calendar/upcoming-posts";
import SchedulePostDialog from "@/components/dialogs/schedule-post-dialog";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Enhanced sample data with more posts and times
const SAMPLE_POSTS: Post[] = [
  {
    id: "1",
    title: "Product Launch: New Winter Collection",
    scheduledFor: "2025-01-01T09:00:00.000Z",
    type: "product",
  },
  {
    id: "2",
    title: "Holiday Gift Guide",
    scheduledFor: "2025-01-02T10:30:00.000Z",
    type: "holiday",
  },
  {
    id: "3",
    title: "Holiday Special Collection",
    scheduledFor: "2025-01-25T12:00:00.000Z",
    type: "holiday",
  },
  {
    id: "4",
    title: "End of Year Sale",
    scheduledFor: "2025-01-15T15:00:00.000Z",
    type: "product",
  },
  {
    id: "5",
    title: "New Year Sneak Peek",
    scheduledFor: "2025-01-15T16:30:00.000Z",
    type: "general",
  },
  {
    id: "6",
    title: "Customer Spotlight",
    scheduledFor: "2025-01-15T14:00:00.000Z",
    type: "general",
  },
  {
    id: "7",
    title: "Holiday Tips & Tricks",
    scheduledFor: "2025-01-20T11:00:00.000Z",
    type: "holiday",
  },
];

export default function ContentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number>();
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Calendar</h1>
          <p className="text-muted-foreground">
            Plan and schedule your social media content
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {/* <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            Schedule Post
          </Button> */}
          <SchedulePostDialog />
          {/* <Select defaultValue="month">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month View</SelectItem>
              <SelectItem value="week">Week View</SelectItem>
              <SelectItem value="day">Day View</SelectItem>
            </SelectContent>
          </Select> */}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={handlePrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">
            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <Button variant="ghost" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button
          variant="ghost"
          className="text-purple-600"
          onClick={() => setCurrentDate(new Date())}
        >
          Today
        </Button>
      </div>

      <CalendarView
        year={currentDate.getFullYear()}
        month={currentDate.getMonth()}
        posts={posts}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      <UpcomingPosts
        posts={posts}
        onEdit={(post) => console.log("Edit post:", post)}
        onDelete={handleDeletePost}
      />
    </div>
  );
}
