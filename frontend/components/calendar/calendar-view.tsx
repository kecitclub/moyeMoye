"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CalendarDay, CalendarViewProps } from "./types/calendar";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarView({
  year,
  month,
  posts,
  selectedDate,
  onSelectDate,
}: CalendarViewProps) {
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: CalendarDay[] = Array.from({ length: daysInMonth }, (_, i) => {
    const date = i + 1;
    return {
      date,
      posts: posts.filter((post) => {
        const postDate = new Date(post.scheduledFor);
        return (
          postDate.getDate() === date &&
          postDate.getMonth() === month &&
          postDate.getFullYear() === year
        );
      }),
      isToday: new Date().getDate() === date,
      isSelected: selectedDate === date,
    };
  });

  return (
    <div className="rounded-lg border bg-card">
      <div className="grid grid-cols-7 gap-px">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="p-3 text-center text-sm font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}

        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="p-3" />
        ))}

        {days.map((day) => (
          <button
            key={day.date}
            onClick={() => onSelectDate(day.date)}
            className={`min-h-[100px] p-3 text-left hover:bg-accent/50 relative
              ${day.isSelected ? "ring-2 ring-primary" : ""}
              ${day.isToday ? "bg-accent/20" : ""}`}
          >
            <span className="text-sm">{day.date}</span>
            {day.posts.map((post) => (
              <div
                key={post.id}
                className={`mt-1 text-xs rounded p-1 truncate
                  ${
                    post.type === "product"
                      ? "bg-purple-100 text-purple-700"
                      : ""
                  }
                  ${post.type === "holiday" ? "bg-blue-100 text-blue-700" : ""}
                  ${
                    post.type === "general" ? "bg-green-100 text-green-700" : ""
                  }`}
              >
                {post.title}
              </div>
            ))}
            {day.posts.length > 0 && (
              <div className="absolute bottom-1 right-1 text-xs text-green-600 font-medium">
                {day.posts.length} Posts Scheduled
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
