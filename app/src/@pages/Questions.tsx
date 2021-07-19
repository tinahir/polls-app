/** @jsxImportSource @emotion/react */
import QuestionList from "@components/QuestionList";
import tw from "twin.macro";

function Questions() {
  return (
    <div css={tw`mt-10 mx-auto max-w-screen-xl px-4`}>
      <QuestionList></QuestionList>
    </div>
  );
}

export default Questions;
