export async function getAccessToken(
 clientId: string,
 code: string
): Promise<string> {
 const verifier = localStorage.getItem("verifier");

 const params = new URLSearchParams();
 params.append("client_id", clientId);
 params.append("grant_type", "authorization_code");
 params.append("code", code);
 params.append("redirect_uri", "http://localhost:5173/callback");
 params.append("code_verifier", verifier!);

 const result = await fetch("https://accounts.spotify.com/api/token", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: params,
 });

 const { access_token } = await result.json();
 return access_token;
}

export async function fetchProfile(token: string): Promise<any> {
 const result = await fetch("https://api.spotify.com/v1/me", {
  method: "GET",
  headers: { Authorization: `Bearer ${token}` },
 });

 return await result.json();
}
