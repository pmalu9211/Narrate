import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup.tsx";
import { Signin } from "./pages/Signin.tsx";
import { Blog } from "./pages/Blog.tsx";
import "./App.css";
import { PageLayout } from "./pages/PageLayout.tsx";
import { Home } from "./pages/Home.tsx";
import { Error } from "./pages/Error.tsx";
import axios from "axios";
import { Post } from "./pages/Post.tsx";
import { Profile } from "./pages/Profile.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
  axios.defaults.withCredentials = true;
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<PageLayout />}>
            <Route path="/post" element={<Post />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/blog/:id" element={<Post />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
