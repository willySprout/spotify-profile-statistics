export function generateCodeVerifier(length: number) {
 let text = "";
 const possible =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

 for (let i = 0; i < length; i++) {
  text += possible.charAt(Math.floor(Math.random() * possible.length));
 }
 return text;
}

export async function generateCodeChallenge(
 codeVerifier: string
): Promise<string> {
 //  if (typeof window === "undefined" || !window.crypto) {
 //   throw new Error(
 //    "generateCodeChallenge can only be run in a browser environment."
 //   );
 //  }

 const data = new TextEncoder().encode(codeVerifier);
 const digest = await window.crypto.subtle.digest("SHA-256", data);
 const hashArray = Array.from(new Uint8Array(digest)); // Convert buffer to byte array
 const hashString = hashArray.map((byte) => String.fromCharCode(byte)).join(""); // Convert bytes to string
 return btoa(hashString)
  .replace(/\+/g, "-")
  .replace(/\//g, "_")
  .replace(/=+$/, "");
}
