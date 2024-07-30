import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OktoContextType, useOkto } from "okto-sdk-react";
import axios from "axios";
import { clientId, clientSecret, redirectUri } from "@/lib/oauth";
import { redirect } from "next/navigation";

async function getIdTokenFromCode(code: string) {
  const tokenEndpoint = "https://oauth2.googleapis.com/token";
  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    code: code,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
  });

  const response = await axios.post(tokenEndpoint, params);

  return response.data.id_token;
}

export default async function Callback({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  if (!searchParams.code || searchParams.code.length === 0) {
    redirect("/signin");
    return;
  }
  let idToken = "";
  try {
    // idToken = await getIdTokenFromCode(searchParams.code);
    idToken =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6ImUyNmQ5MTdiMWZlOGRlMTMzODJhYTdjYzlhMWQ2ZTkzMjYyZjMzZTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyMDAzMzUxMDg3ODMtcTUwczc5bG1uaHBoYnNuajBwYzk1YWMxbzJlOHU1MTMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyMDAzMzUxMDg3ODMtcTUwczc5bG1uaHBoYnNuajBwYzk1YWMxbzJlOHU1MTMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDIzNjM2Mjk4NjA1MjM2NzY5MjciLCJlbWFpbCI6InVqandhbGRpbXJpMTIzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiWE5xV2lRR1liQzlLNTBHZlRGdlRhQSIsImlhdCI6MTcyMjMzNTM3MywiZXhwIjoxNzIyMzM4OTczfQ.W8wuEloZTCDzQrnIb9-U8E19AbGORqZrlnBWtJNSPFzaTrmTRd6njPV-zxv60LaXLavUJ7MfAGfAV5rp63-yOfximmFlQhd5Hq6bw5ey-Daq_gFJncrEfKXU-J8ki0IHdfDPvuewAcAdUyPWkGADKldeh3GmFzPOfeECY4-F2cOdawKHt0K1dwmc23P9LU4yucr93b9IKE6uBkfbu28Y9i2IkjdVSlh5YwrASUSJeNeU7_ON6W12NrFjJJBr0-kvD4fsp0yGtwTdUblm5qj5IHIUnHHVjXuXyuhCbanBKHmr1QsyY7eKzrRJiy8Q4YsoqAh2UFVPSKtUvKmu9_SmxA";
  } catch (e) {
    console.log(e);
    // redirect("/signin");
  }

  redirect(`/authenticate?id_token=${encodeURIComponent(idToken)}`);
  return null;
}
