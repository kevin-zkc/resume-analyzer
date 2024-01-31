"use client";

import React, { useEffect, useState } from "react";
import pdf2base64 from "pdf-to-base64";
import { post } from "@/app/_lib/api";
import { Resume, useResume } from "./resume-provider";

export default function ResumeUploader() {
  const [file, setFile] = useState<File>();
  const { resume, setResume } = useResume();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleUploadFile = () => {
    if (!file) return;
    const fileURL = URL.createObjectURL(file);
    pdf2base64(fileURL)
      .then(async (response: string) => {
        const resume = (await post(
          "resume/",
          JSON.stringify({ resume: response })
        )) as Resume;
        setResume(resume);
      })
      .catch((error: string) => {
        console.error(error);
      });
  };

  if (resume) return null;

  return (
    <div className="flex flex-col items-center p-6 gap-4">
      <div className="text-xl">Submit your resume: </div>
      <input
        type="file"
        onChange={handleFileChange}
        className="border py-4 rounded-full px-8"
      />
      {file && (
        <button
          onClick={handleUploadFile}
          className="border border-white h-fit px-10 py-2 rounded-full hover:bg-gray-500"
        >
          Submit Resume
        </button>
      )}
    </div>
  );
}
