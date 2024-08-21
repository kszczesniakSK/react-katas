import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import "./App.css"
import UserFormPage from "./pages/UserFormPage";
import ExamplePage from "./pages/ExamplePage";
import ReactQueryPage from "./pages/ReactQueryPage";
import PostDetailsPage from "./pages/PostDetailsPage";
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/users/:userId" element={<UserPage />} />
      <Route path="/user-form" element={<UserFormPage />} /> 
      <Route path="/tests-example" element={<ExamplePage />} /> 
      <Route path="/react-query-example" element={<ReactQueryPage />} /> 
      <Route path="/react-query-example/:postId" element={<PostDetailsPage />} />
    </Routes>
  );
};

export default App;
