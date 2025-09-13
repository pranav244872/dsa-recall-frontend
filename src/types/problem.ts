export interface Problem {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null; // Can be null
  UserID: number;
  Title: string;
  Link: string;
  Approach: string;
  Code: string;
  Language: string;
  CurrentStreak: number;
  NextReviewDate: string; // Dates come as strings from JSON
}

export interface NewProblemForm {
  Title: string;
  Link: string;
  Approach: string;
  Code: string;
  Language: string;
}

export interface PaginationMeta {
  total_records: number;
  current_page: number;
  page_size: number;
  total_pages: number;
}

export interface PaginatedProblemsResponse {
  problems: Problem[];
  meta: PaginationMeta;
}
