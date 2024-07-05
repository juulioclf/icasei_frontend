const VIDEOS_URL = 'http://localhost:3000/api/videos';

export async function searchVideos(query: string, pageToken: string) {
    const userId = localStorage.getItem('userId');
    const response = await fetch(`${VIDEOS_URL}/search?q=${query}&pageToken=${pageToken}&userId=${userId}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch videos');
    }
    return response.json();
}
