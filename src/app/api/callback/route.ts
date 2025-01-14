import { NextResponse } from "next/server";

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI!;

export async function GET(req: Request) {
 const { searchParams } = new URL(req.url);
 const code = searchParams.get("code");

 if (!code) {
  return NextResponse.json(
   { error: "Authorization code not provided" },
   { status: 400 }
  );
 }

 const tokenUrl = "https://accounts.spotify.com/api/token";
 const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString(
  "base64"
 );

 const response = await fetch(tokenUrl, {
  method: "POST",
  headers: {
   Authorization: `Basic ${basicAuth}`,
   "Content-Type": "application/x-www-form-urlencoded",
  },
  body: new URLSearchParams({
   grant_type: "authorization_code",
   code,
   redirect_uri,
  }).toString(),
 });

 const tokenData = await response.json();

 if (!response.ok) {
  return NextResponse.json(tokenData, { status: response.status });
 }

 return NextResponse.json(tokenData);
}
