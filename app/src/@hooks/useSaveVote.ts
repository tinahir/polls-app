import { useMutation, useQueryClient } from "react-query";
import { saveVote } from "@services/PollsApi";
import { Question } from "@Model/Question";
import { Choice } from "@Model/Choice";

export function useSaveVote() {
  const queryClient = useQueryClient();
  return useMutation(saveVote, {
    onMutate: async (prevChoice: Choice) => {
      const [, , questionId] = prevChoice.url.split("/");

      await queryClient.cancelQueries(["questions", questionId]);

      const question = queryClient.getQueryData<Question>([
        "questions",
        questionId,
      ]);

      const prevQuestion = JSON.parse(JSON.stringify(question));

      const newChoice = question?.choices.find(
        (choice) => choice.url === prevChoice.url
      );

      if (newChoice) {
        newChoice.votes = newChoice.votes + 1;
      }

      if (question) {
        queryClient.setQueryData<Question>(["questions", questionId], question);
      }

      return { prevQuestion, questionId };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        ["questions", context?.questionId],
        context?.prevQuestion
      );
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries(["questions", context?.questionId]);
    },
  });
}
