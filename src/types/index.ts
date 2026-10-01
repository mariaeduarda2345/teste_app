export type ShelfType = 'lendo' | 'lidos' | 'quero-ler' | 'favoritos' | 'abandonados';

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  publisher?: string;
  year?: number;
  totalPages: number;
  currentPage: number;
  synopsis: string;
  genres: string[];
  shelf: ShelfType;
  rating?: number;
  userRating?: number;
  userReview?: string;
  ratingCount?: number;
  ratingBreakdown?: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  startDate?: string;
  finishDate?: string;
  daysReading?: number;
  isFavorite?: boolean;
  willReread?: boolean;
  highlightQuote?: string;
  format?: 'Físico' | 'Kindle' | 'Áudio + Físico' | 'Áudio';
  estimatedTimeLeft?: string;
  diaryNote?: string;
}

export interface Review {
  id: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  bookCover: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  badge?: string;
  rating: number;
  timeAgo: string;
  quote?: string;
  content: string;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  hasSpoiler?: boolean;
  spoilerChapter?: string;
  tags?: string[];
  type: 'review' | 'progress' | 'quote';
  progressText?: string;
  reactions?: { emoji: string; count: number }[];
}

export interface ReadingChallenge {
  year: number;
  completed: number;
  total: number;
  aheadBy: number;
  percentage: number;
}

export interface MonthlyStat {
  month: string;
  shortMonth: string;
  booksCount: number;
  pagesCount: number;
  isRecord?: boolean;
  isProjected?: boolean;
}
