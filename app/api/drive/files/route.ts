// app/api/drive/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/google/auth";
import { google } from "googleapis";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oauth2Client.setCredentials({ access_token: session.accessToken });
  const drive = google.drive({ version: "v3", auth: oauth2Client });

  try {
    const response = await drive.files.list();
    return NextResponse.json(response.data.files);
  } catch (error) {
    return new NextResponse("Failed to fetch files", { status: 500 });
  }
}
