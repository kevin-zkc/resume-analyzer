import JobDescriptionInput from "../components/job-description-input";
import ResumePreview from "../components/resume-preview";
import { ResumeProvider } from "../components/resume-provider";
import ResumeUploader from "../components/resume-uploader";
import UserMenu from "../components/user-menu";

export default function Home() {
  return (
    <ResumeProvider>
      <header className="my-10 mx-auto w-full max-w-screen-xl px-6 flex justify-between">
        <div className="text-white text-7xl border-b-4 border-white py-5">
          Resume Analyzer
        </div>
        <UserMenu />
      </header>
      <div className="m-10 mx-auto w-full max-w-screen-xl px-6 space-y-2">
        <ResumeUploader />
        <ResumePreview />
        <JobDescriptionInput />
      </div>
    </ResumeProvider>
  );
}
