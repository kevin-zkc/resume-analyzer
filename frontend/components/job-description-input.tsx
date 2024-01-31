"use client";

import { useForm } from "react-hook-form";
import { useResume } from "./resume-provider";
import { post } from "@/app/_lib/api";
import { useState } from "react";

type FormData = {
  jobDescription: string;
};

export default function JobDescriptionInput() {
  const { handleSubmit, register } = useForm<FormData>();
  const { resume } = useResume();
  const [rating, setRating] = useState<number>();
  if (!resume) return null;
  const onSubmit = handleSubmit(async (data) => {
    const result = await post(
      `/job_description/${resume.uuid}/`,
      JSON.stringify({
        job_description: data.jobDescription,
      })
    );
    setRating(result.rating);
  });

  return rating ? (
    <div className="flex flex-col items-center gap-4">
      <div className="text-3xl">Your match rating is {rating}/100.</div>
      <button
        className="border mx-auto border-white h-fit px-10 py-2 rounded-full hover:bg-gray-500"
        onClick={() => setRating(undefined)}
      >
        Try again
      </button>
    </div>
  ) : (
    <form onSubmit={onSubmit}>
      <div className="font-bold">Job description: </div>
      <textarea
        placeholder="Enter the job description..."
        {...register("jobDescription")}
        className="w-full h-80 bg-black p-2 border border-white"
      />
      <div className="flex justify-center">
        <button className="border mx-auto border-white h-fit px-10 py-2 rounded-full hover:bg-gray-500">
          Submit
        </button>
      </div>
    </form>
  );
}
