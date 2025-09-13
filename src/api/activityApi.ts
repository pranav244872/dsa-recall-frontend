import { type Activity } from '../types/activity';

async function handleApiError(response: Response): Promise<Error> {
  const errorText = await response.text();

  try {
    // 2. Try to parse the text as JSON.
    const errorData = JSON.parse(errorText);
    // 3. If it's JSON, use the "error" property from our Go API.
    return new Error(errorData.error || 'An unexpected error occurred.');
  } catch (e) {
    // 4. If it's not JSON, the text itself is the error message.
    return new Error(errorText || 'An unknown error occurred.');
  }
}

export async function getActivityHeatmap(
  months: number = 6,
): Promise<Activity[]> {
  const response = await fetch(`/api/activity/heatmap?months=${months}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw await handleApiError(response);
  }

  // The backend returns date and count, we need to add the 'level' for the calendar
  const data = await response.json();
  return data.map((item: { date: string; count: number }) => ({
    ...item,
    level: Math.min(4, Math.ceil(item.count / 2)), // Simple logic to assign a level
  }));
}
