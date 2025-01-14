export async function fetchProfile(token: string): Promise<unknown> {
 const result = await fetch("https://api.spotify.com/v1/me", {
  method: "GET",
  headers: { Authorization: `Bearer ${token}` },
 });

 return await result.json();
}
