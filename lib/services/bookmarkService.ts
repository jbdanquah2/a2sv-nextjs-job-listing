const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  console.error('NEXT_PUBLIC_API_URL is not defined in environment variables');
}

export const getBookmarks = async () => {
  try {
    const response = await fetch(`${API_URL}/bookmarks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch bookmarks');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    throw error;
  }
};

export const createBookmark = async (eventId: string) => {
  try {
    const response = await fetch(`${API_URL}/bookmarks/${eventId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to create bookmark');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error creating bookmark:', error);
    throw error;
  }
};

export const removeBookmark = async (eventId: string) => {
  try {
    const response = await fetch(`${API_URL}/bookmarks/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to remove bookmark');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error removing bookmark:', error);
    throw error;
  }
}; 