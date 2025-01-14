import querystring from "querystring";
import { NextResponse } from "next/server";
import { fetchProfile, getAccessToken } from "./auth";

const generateRandomString = (length: number): string => {
 const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 let result = "";
 for (let i = 0; i < length; i++) {
  result += characters.charAt(Math.floor(Math.random() * characters.length));
 }
 return result;
};

export async function GET(req: Request) {
 const state = generateRandomString(16);
 const scope = "user-read-private user-read-email";
 const client_id = process.env.SPOTIFY_CLIENT_ID!;
 const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
 const { searchParams } = new URL(req.url);
 const code = searchParams.get("code");

 if (!code) {
  const spotifyAuthUrl =
   "https://accounts.spotify.com/authorize?" +
   querystring.stringify({
    response_type: "code",
    client_id,
    scope,
    redirect_uri,
    state,
   });

  console.log(code, "CODEEEEEEEEEEEE");
  console.log(redirect_uri, "REDIRECT URI");

  return NextResponse.redirect(spotifyAuthUrl);
 } else {
  const access_token = await getAccessToken(client_id, code);
  const profile = await fetchProfile(access_token);
  console.log(profile, "profilessss");
 }
}
