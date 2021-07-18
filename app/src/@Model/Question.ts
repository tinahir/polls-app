import { Choice } from "./Choice";

export type Question = {
  question: string;
  published_at: string;
  url: string;
  choices: Choice[];
};
