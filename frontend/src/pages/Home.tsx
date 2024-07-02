import { useEffect, useState } from "react";
import { BlogComp } from "../components/BlogComp";
import axios from "axios";
import { Blog, UserInterface } from "../types";
import { SiginCard } from "../components/SigninCard";
import { currentUser, showSiginCard } from "../recoil/state";
import { useRecoilState } from "recoil";

export const Home = () => {
  const [blogs, setBlogs]: [Blog[], any] = useState([]);
  const [showSiginCardVal, setShowSiginCard] =
    useRecoilState<boolean>(showSiginCard);
  const [currentUserVal, setCurrentUserVal] = useRecoilState(currentUser);

  const getBlogs = async () => {
    try {
      const response = await axios("/blog/bulk");
      setBlogs(response.data.doc);
    } catch (e) {
      console.log(e);
    }
  };

  const getUser = async () => {
    try {
      const res = await axios.get("/user/auth");
      console.log(res);
      setCurrentUserVal(res.data.userDoc);
      setShowSiginCard(false);
    } catch (e) {
      setCurrentUserVal(undefined);
    }
  };

  useEffect(() => {
    getBlogs();
    getUser();
  }, []);

  return (
    <>
      {showSiginCardVal && <SiginCard />}
      <div className="min-h-screen font-poppins p-4">
        {blogs.map((blog: Blog) => {
          return (
            <div
              onClick={() => {
                if (!currentUserVal) {
                  console.log("Hello");
                  setShowSiginCard(true);
                }
              }}
            >
              <BlogComp key={blog.id} blog={blog} />
            </div>
          );
        })}
      </div>
    </>
  );
};
