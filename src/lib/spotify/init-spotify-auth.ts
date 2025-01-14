import { generateCodeChallenge, generateCodeVerifier } from "./code-utils";
import { fetchProfile } from "./spotify-profile";

async function redirectToAuthCodeFlow(clientId: string) {
 console.log("<<<< masuk redirect harusnya");
 // TODO: Redirect to Spotify authorization page
 const verifier = generateCodeVerifier(128);
 const challenge = await generateCodeChallenge(verifier);

 localStorage.setItem("verifier", verifier);

 const params = new URLSearchParams();
 params.append("client_id", clientId);
 params.append("response_type", "code");
 params.append("redirect_uri", "http://localhost:3000/");
 params.append("scope", "user-read-private user-read-email");
 params.append("code_challenge_method", "S256");
 params.append("code_challenge", challenge);

 window.open(
  `https://accounts.spotify.com/authorize?${params.toString()}`,
  "_blank"
 );
}

export async function getAccessToken(
 clientId: string,
 code: string
): Promise<string> {
 const verifier = localStorage.getItem("verifier");

 const params = new URLSearchParams();
 params.append("client_id", clientId);
 params.append("grant_type", "authorization_code");
 params.append("code", code);
 params.append("redirect_uri", "http://localhost:3000");
 params.append("code_verifier", verifier!);

 const result = await fetch("https://accounts.spotify.com/api/token", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: params,
 });

 const { access_token } = await result.json();
 return access_token;
}

function populateUI(profile: unknown) {
 // TODO: Update UI with profile data
 console.log(profile);
}

export async function getInitProfileData(params: {
 [key: string]: string | string[];
}) {
 const clientId = process.env.SPOTIFY_CLIENT_ID;
 if (!params.code) {
  console.log("belum ada code");
  redirectToAuthCodeFlow(clientId!);
 } else {
  console.log("sudah ada code");
  const code = params.code;
  const accessToken = await getAccessToken(clientId!, code as string);
  const profile = await fetchProfile(accessToken);
  populateUI(profile);
 }
}
