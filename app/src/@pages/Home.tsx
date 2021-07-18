/** @jsxImportSource @emotion/react */
import React from "react";
import tw from "twin.macro";
import LinkButton from "@components/LinkButton";

const Home: React.FunctionComponent = () => {
  return (
    <main
      css={tw`mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8`}
    >
      <div css={tw`sm:text-center lg:text-left`}>
        <h2
          css={tw`text-4xl tracking-tight leading-10 font-extrabold text-indigo-100 sm:text-5xl sm:leading-none md:text-6xl`}
        >
          Polls <br css={tw`xl:hidden`} />
          <span css={tw`text-indigo-600`}>Questions App</span>
        </h2>
        <div css={tw`mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start`}>
          <LinkButton url="/questions">Browse Questions </LinkButton>
        </div>
      </div>
    </main>
  );
};

export default Home;
