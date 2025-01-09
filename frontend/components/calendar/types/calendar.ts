export interface Post {
  id: string;
  title: string;
  scheduledFor: string;
  type?: "product" | "holiday" | "general";
}

export interface CalendarDay {
  date: number;
  posts: Post[];
  isToday?: boolean;
  isSelected?: boolean;
}

export interface CalendarViewProps {
  year: number;
  month: number;
  posts: Post[];
  selectedDate?: number;
  onSelectDate: (date: number) => void;
}
