export const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
export const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
export const redirectUri = `${process.env.NEXT_PUBLIC_HOST}/callback`;
export const scope = ["https://www.googleapis.com/auth/userinfo.email"].join(
  " "
);

export const oauthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
