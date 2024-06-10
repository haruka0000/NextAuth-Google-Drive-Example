// app/page.tsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import DriveFileList from "./components/DriveFileList";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <main>
      {!session && (
        <div>
          <button onClick={() => signIn()}>Googleでサインイン</button>
        </div>
      )}
      {session && (
        <div>
          <p>
            {session.user.name} ({session.user.email})
          </p>
          <button onClick={() => signOut()}>サインアウト</button>
          <h1>Drive</h1>
          <DriveFileList accessToken={session?.accessToken ?? ""} />
        </div>
      )}
    </main>
  );
}
