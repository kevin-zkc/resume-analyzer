"use client";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useResume } from "./resume-provider";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { put } from "@/app/_lib/api";

type FormData = {
  name: string;
  email: string;
  mobile: string;
  skills: { skill: string }[];
  experiences: string;
};

export default function ResumePreview() {
  const { resume, setResume } = useResume();
  const { handleSubmit, control, setValue, watch } = useForm<FormData>();
  const [open, setOpen] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    if (!resume) return;
    setValue("name", resume.name ?? "");
    setValue("email", resume.email ?? "");
    setValue("mobile", resume.mobile ?? "");
    setValue(
      "skills",
      resume.skills.split(",").map((skill) => {
        return {
          skill,
        };
      }) ?? []
    );
    setValue("experiences", resume.experiences ?? "");
  }, [resume, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    const skillsString = data.skills
      .map((skill) => skill.skill.trim())
      .join(", ");
    const newResume = await put(
      `resume/${resume?.uuid}/`,
      JSON.stringify({
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        skills: skillsString,
        experiences: data.experiences,
      })
    );
    setResume(newResume);
  });
  const {
    fields: skills,
    append: appendSkills,
    remove: removeSkills,
  } = useFieldArray({ control, name: "skills" });

  const handleChangeNewSkill = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) setNewSkill(e.target.value);
  };

  if (!resume) return null;
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-2">
        {[
          { label: "Name: ", name: "name" },
          { label: "Email: ", name: "email" },
          { label: "Mobile: ", name: "mobile" },
        ].map((formField) => (
          <Controller
            key={formField.name}
            control={control}
            name={formField.name as "name" | "email" | "mobile"}
            render={({ field }) => (
              <div className="grid grid-cols-4">
                <label className="font-bold">{formField.label}</label>
                <input className="bg-black border p-1" {...field} />
              </div>
            )}
          />
        ))}
        <div className="space-y-2">
          <div className="font-bold">Skills: (Click to delete)</div>
          <div className="grid grid-cols-8">
            {skills.map((skill, index) => (
              <div key={index}>
                <div
                  onClick={() => removeSkills(index)}
                  className="hover:underline cursor-pointer hover:text-red-500 "
                >
                  {skill.skill}
                </div>
              </div>
            ))}
          </div>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>
              <button
                className="border border-white h-fit px-10 py-1 rounded-full hover:bg-gray-500"
                onClick={() => setOpen(true)}
              >
                Add skill
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="bg-black/70 fixed inset-0" />
              <Dialog.Content className="top-[50%] left-[50%] fixed z-[100] w-full translate-x-[-50%] translate-y-[-50%] border max-w-lg bg-gray-300 text-black shadow-lg rounded-2xl">
                <Dialog.Title />
                <Dialog.Description className="flex flex-col gap-2 items-center px-5 py-2">
                  <div>New skill:</div>
                  <input
                    className="w-full border p-1"
                    onChange={handleChangeNewSkill}
                  />
                  <button
                    className="border border-black h-fit px-5 py-1 rounded-full hover:bg-gray-500 w-fit"
                    onClick={() => {
                      if (!newSkill) return;
                      appendSkills({ skill: newSkill });
                      setNewSkill("");
                      setOpen(false);
                    }}
                    type="button"
                  >
                    Continue
                  </button>
                </Dialog.Description>
                <Dialog.Close />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
        <div>
          <div className="font-bold">Experiences: </div>
          <Controller
            control={control}
            name="experiences"
            render={({ field }) => (
              <textarea
                {...field}
                className="w-full h-80 bg-black p-2 border border-white"
              />
            )}
          />
        </div>
      </div>
      <div className="flex justify-center p-2">
        <button className="border mx-auto border-white h-fit px-10 py-2 rounded-full hover:bg-gray-500">
          Update
        </button>
      </div>
    </form>
  );
}
