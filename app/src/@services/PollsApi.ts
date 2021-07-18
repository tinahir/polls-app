import axios from "axios";
import { appConfig } from "AppConfig";
import { Question } from "@Model/Question";
import { Choice } from "@Model/Choice";

export async function getQuestions(page = 1) {
  return await axios.get<Question[]>(
    `${appConfig.baseUrl}/questions?page=${page}`
  );
}

export async function getQuestion(id: string) {
  const res = await axios.get<Question>(`${appConfig.baseUrl}/questions/${id}`);
  return res.data;
}

export function saveVote(choice: Choice) {
  return axios.post(`${appConfig.baseUrl}${choice.url}`, { ...choice });
}
