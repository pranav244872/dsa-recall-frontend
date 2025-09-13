import {
  type Problem,
  type NewProblemForm,
  type PaginatedProblemsResponse,
} from '../types/problem';

// You can copy the handleApiError function from userApi.ts
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

export async function getProblems(
  searchTerm: string,
  page: number,
  limit: number = 5,
): Promise<PaginatedProblemsResponse> {
  const params = new URLSearchParams();
  if (searchTerm) {
    params.append('q', searchTerm);
  }
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  const response = await fetch(`/api/problems?${params.toString()}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw await handleApiError(response);
  }

  return response.json();
}

export async function createProblem(
  problemData: NewProblemForm,
): Promise<Problem> {
  const response = await fetch(`/api/problems`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(problemData),
  });

  if (!response.ok) {
    throw await handleApiError(response);
  }

  return response.json();
}

type UpdateProblemPayload = Partial<NewProblemForm>;

export async function getProblemById(id: number): Promise<Problem> {
  const response = await fetch(`/api/problems/${id}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw await handleApiError(response);
  }
  return response.json();
}

export async function updateProblem(
  id: number,
  problemData: UpdateProblemPayload,
): Promise<Problem> {
  const response = await fetch(`/api/problems/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(problemData),
  });

  if (!response.ok) {
    throw await handleApiError(response);
  }
  return response.json();
}

export async function getDueProblems(
  page: number,
  limit: number = 5,
): Promise<PaginatedProblemsResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const response = await fetch(`/api/problems/due?${params.toString()}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw await handleApiError(response);
  }

  return response.json();
}

export async function reviewProblem(
  id: number,
  isEasy: boolean,
): Promise<Problem> {
  const response = await fetch(`/api/problems/${id}/review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ is_easy: isEasy }),
  });

  if (!response.ok) {
    throw await handleApiError(response);
  }

  return response.json();
}
