/** @jsxImportSource @emotion/react */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import tw, { GlobalStyles } from "twin.macro";
import Layout from "@components/Layout";
import Home from "@pages/Home";
import Questions from "@pages/Questions";
import Question from "@pages/Question";
import { QueryErrorResetBoundary } from "react-query";
import MessageBox from "@components/MessageBox";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <BrowserRouter>
          <GlobalStyles />
          <Layout>
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary }) => (
                <MessageBox>
                  <div css={tw`mb-8`}>There was an error!</div>
                  <button
                    onClick={() => resetErrorBoundary()}
                    css={tw`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:border-indigo-300 transition duration-150 ease-in-out`}
                  >
                    Try again
                  </button>
                </MessageBox>
              )}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/questions" element={<Questions />} />
                <Route path="/questions/:id" element={<Question />} />
              </Routes>
            </ErrorBoundary>
          </Layout>
        </BrowserRouter>
      )}
    </QueryErrorResetBoundary>
  );
}

export default App;
