"use client";
import { useState } from "react";
import { useResume } from "./resume-provider";
import LoginDialog from "./login-dialog";

export default function UserMenu() {
  const { resume, reset } = useResume();
  const [open, setOpen] = useState(false);

  const handleLogin = () => {
    setOpen(true);
  };

  return resume ? (
    <div className="flex flex-col gap-2">
      <div>Welcome {resume.name}!</div>
      <div>Your id is: {resume.uuid}.</div>
      <button
        onClick={reset}
        className="border border-white h-fit px-5 py-1 rounded-full hover:bg-gray-500 w-fit"
      >
        Logout
      </button>
    </div>
  ) : (
    <>
      {/* <button
        onClick={handleLogin}
        className="border border-white h-fit px-10 py-2 rounded-full hover:bg-gray-500"
      >
        Returning User?
      </button> */}
      <LoginDialog />
    </>
  );
}
