"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { get } from "@/app/_lib/api";
import { useResume } from "./resume-provider";
import * as Dialog from "@radix-ui/react-dialog";

type FormData = {
  id: string;
};

export default function LoginDialog() {
  const { handleSubmit, register } = useForm<FormData>();
  const { resume, setResume } = useResume();
  const [open, setOpen] = useState(false);
  if (resume) return null;

  const onSubmit = handleSubmit(async (data) => {
    const newResume = await get(`resume/${data.id}/`);
    setResume(newResume);
    setOpen(false);
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <div className="border border-white h-fit px-10 py-2 rounded-full hover:bg-gray-500">
          Returning User?
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/70 fixed inset-0" />
        <Dialog.Content className="top-[50%] left-[50%] fixed z-[100] w-full translate-x-[-50%] translate-y-[-50%] border max-w-lg bg-gray-300 text-black shadow-lg rounded-2xl">
          <form onSubmit={onSubmit}>
            <Dialog.Title />
            <Dialog.Description>
              <div className="flex flex-col gap-2 items-center px-5 py-2">
                <div>Enter your id:</div>
                <input className="w-full border p-1" {...register("id")} />
                <button className="border border-black h-fit px-5 py-1 rounded-full hover:bg-gray-500 w-fit">
                  Continue
                </button>
              </div>
            </Dialog.Description>
            <Dialog.Close />
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
