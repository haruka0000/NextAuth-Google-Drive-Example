// app/components/DriveFileList.tsx
"use client";

import { useState, useEffect } from "react";

interface File {
  id: string;
  name: string;
  // 必要に応じて他のファイル情報を追加
}

interface DriveFileListProps {
  accessToken: string;
}

export default function DriveFileList({ accessToken }: DriveFileListProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchDriveFiles() {
      setIsLoading(true);
      try {
        const response = await fetch("/api/drive/files", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.error("Error fetching drive files:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDriveFiles();
  }, [accessToken]);

  return (
    <div>
      {isLoading ? (
        <p>Loading files...</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file.id}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
