import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyles } from "twin.macro";
import Layout from "@components/Layout";
import Home from "@pages/Home";
import Questions from "@pages/Questions";
import Question from "@pages/Question";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/questions/:id" element={<Question />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
