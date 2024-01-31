"use client";

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export interface Resume {
  name: string;
  email: string;
  mobile: string;
  resume: string;
  skills: string;
  uuid: string;
  experiences: string;
}

interface ResumeContextType {
  resume: Resume | undefined;
  reset: () => void;
  setResume: Dispatch<SetStateAction<Resume | undefined>>;
}

export const ResumeContext = createContext<ResumeContextType>({
  resume: {} as Resume,
  reset: () => null,
  setResume: () => null,
});

export const useResume = () => useContext(ResumeContext);

export const ResumeProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [resume, setResume] = useState<Resume | undefined>();
  const reset = () => {
    setResume(undefined);
  };

  return (
    <ResumeContext.Provider value={{ resume, reset, setResume }}>
      {children}
    </ResumeContext.Provider>
  );
};
