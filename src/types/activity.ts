export interface Activity {
  date: string; // e.g., "2025-09-13T00:00:00Z"
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // react-activity-calendar uses levels
}
