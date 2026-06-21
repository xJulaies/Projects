export type TFormErrors = {
  name?: string[];
  genre?: string[];
  members?: string[];
  stage?: string[];
  day?: string[];
  startTime?: string[];
  endTime?: string[];
  description?: string[];
  status?: string[];
};

export type TFormErrorProps = {
  id: string;
  message?: string;
};
