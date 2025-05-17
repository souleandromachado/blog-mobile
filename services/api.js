const API_URL = 'http://SEU_IP_LOCAL:3000'; // troque pelo IP local

export async function fetchPosts() {
  const res = await fetch(`${API_URL}/posts`);
  return res.json();
}
