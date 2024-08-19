import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import "./App.css"
import UserFormPage from "./pages/UserFormPage";
import ExamplePage from "./pages/ExamplePage";
import ReactQueryPage from "./pages/ReactQueryPage";
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/users/:userId" element={<UserPage />} />
      <Route path="/user-form" element={<UserFormPage />} /> {/* New route for form */}
      <Route path="/tests-example" element={<ExamplePage />} /> {/* New route for form */}
      <Route path="/react-query-example" element={<ReactQueryPage />} /> {/* New route for form */}
    </Routes>
  );
};

export default App;
