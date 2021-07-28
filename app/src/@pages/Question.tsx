/** @jsxImportSource @emotion/react */
import * as React from "react";
import tw from "twin.macro";
import { useParams } from "react-router";
import MessageBox from "@components/MessageBox";
import LeftArrowIcon from "@icons/LeftArraow";
import { Link } from "react-router-dom";
import { useQuestion } from "@hooks/useQuestions";
import { useSaveVote } from "@hooks/useSaveVote";
import { Choice } from "@Model/Choice";

function Question() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuestion(id);
  const saveVote = useSaveVote();
  const [choice, setChoice] = React.useState<Choice>();

  const totalVotes = (() => {
    return (
      data?.choices?.reduce(
        (votes, currentChoice) => (votes += currentChoice.votes),
        0
      ) ?? 0
    );
  })();

  const getPercentage = (votes: number) => {
    if (totalVotes === 0) {
      return 0;
    }
    return (votes * 100) / totalVotes;
  };

  if (isLoading) {
    return <MessageBox>Loading...</MessageBox>;
  }

  if (error) {
    return (
      <MessageBox>There is some problem while featching the data</MessageBox>
    );
  }

  if (data) {
    return (
      <div
        css={tw`mt-10 mx-auto max-w-screen-xl px-4`}
        data-test="question-name"
      >
        <Link
          to="/questions"
          css={tw` flex items-center text-sm text-gray-500`}
        >
          <LeftArrowIcon />
          <span data-test="back">Back</span>
        </Link>
        <article css={tw`shadow sm:mt-8`}>
          <div css={tw`mt-4 md:mt-0 md:ml-2`}>
            <h2
              css={tw` mb-16 text-4xl tracking-tight leading-10 font-extrabold text-indigo-100 sm:text-5xl sm:leading-none md:text-6xl`}
            >
              Question: <br css={tw`xl:hidden`} />
              <span css={tw`text-indigo-600`}>{data.question}</span>
            </h2>

            {data.choices.map((choice) => (
              <article
                key={choice.url}
                css={tw`hover:outline-white hover:border-blue-300 bg-gray-900 rounded-lg mb-8`}
              >
                <div css={tw`p-4`}>
                  <div
                    css={tw`tracking-wide text-sm text-gray-500 flex items-center justify-center`}
                  >
                    <span css={tw`flex-1 text-lg`} data-test="choice-name">
                      {choice.choice}
                    </span>
                    <span
                      css={tw`mr-8 w-10 h-10 flex items-center justify-center rounded-full bg-indigo-700 text-white`}
                      data-test="choice-votes"
                    >
                      {choice.votes}
                    </span>
                    <span
                      data-test="choice-percentage"
                      css={tw`rounded-lg w-16 mr-8 w-10 h-10 flex items-center justify-center rounded-full bg-indigo-700 text-white`}
                    >
                      {getPercentage(choice.votes).toFixed()}%
                    </span>
                    <span css={tw`flex items-center justify-center `}>
                      <input
                        data-test="choice-select"
                        name="choice"
                        css={tw`focus:ring-gray-500 w-6 h-6 text-gray-600 border-gray-300`}
                        type="radio"
                        value={choice.url}
                        onClick={() => setChoice(choice)}
                      ></input>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </article>
        <div css={tw`mt-5 sm:mt-8 sm:flex sm:justify-end`}>
          <div css={tw`mt-3 sm:mt-0 sm:ml-3 mt-5 sm:mt-8 sm:flex`}>
            <button
              data-test="save-vote"
              onClick={() => choice && saveVote.mutate(choice)}
              css={tw`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:border-indigo-300 transition duration-150 ease-in-out`}
            >
              Save Vote
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <MessageBox>Posting has been not found</MessageBox>;
}

export default Question;
