/** @jsxImportSource @emotion/react */
import tw from "twin.macro";
import { useQuestions } from "@hooks/useQuestions";
import { Link } from "react-router-dom";
import * as React from "react";
import MessageBox from "./MessageBox";

const QuestionList: React.FC = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useQuestions();

  if (isLoading) {
    return <MessageBox>Loading...</MessageBox>;
  }
  if (error) {
    return (
      <MessageBox>There is some problem while featching the data.</MessageBox>
    );
  }

  if (!data || data?.pages[0].data.length === 0) {
    return <MessageBox>Questions did not find</MessageBox>;
  }

  return (
    <>
      <article
        css={tw`mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8`}
      >
        {data.pages.map((pages, i) => (
          <React.Fragment key={i}>
            {pages.data.map((q) => (
              <Link
                to={q.url}
                key={q.url}
                css={tw`hover:outline-white hover:border-blue-300 bg-gray-900 rounded-lg`}
              >
                <article css={tw`md:flex flex-col`} data-test="question">
                  <div css={tw`p-4`}>
                    <div
                      css={tw` tracking-wide text-sm text-white font-bold`}
                      data-test="posting-name"
                    >
                      {q.question}
                    </div>

                    <p
                      css={tw`mt-2 text-gray-500 mt-1`}
                      data-test="question-published-at"
                    >
                      Punlished on {new Date(q.published_at).toDateString()}
                    </p>
                    <p
                      css={tw`mt-2 text-gray-500 mt-1`}
                      data-test="question-choices"
                    >
                      You have {q.choices.length} choices
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </React.Fragment>
        ))}
      </article>

      {hasNextPage && (
        <div css={tw`mt-5 sm:mt-8 sm:flex sm:justify-center`}>
          <div
            css={tw`mt-3 sm:mt-0 sm:ml-3 mt-5 sm:mt-8 sm:flex sm:justify-center`}
          >
            <button
              disabled={isFetchingNextPage}
              onClick={() => fetchNextPage({ pageParam: 2 })}
              css={tw`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:border-indigo-300 transition duration-150 ease-in-out`}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load More"
                : "Nothing more to load"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionList;
