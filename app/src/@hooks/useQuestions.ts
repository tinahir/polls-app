import { getQuestion, getQuestions } from "@services/PollsApi";
import { useInfiniteQuery, useQuery } from "react-query";

export function useQuestions() {
  return useInfiniteQuery(
    "questions",
    ({ pageParam = 1 }) => {
      return getQuestions(pageParam);
    },
    {
      getNextPageParam: () => false,
    }
  );
}

export function useQuestion(id: string) {
  return useQuery(["questions", id], () => getQuestion(id));
}
