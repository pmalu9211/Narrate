import { useEffect, useState } from "react";
import { BlogComp } from "../components/BlogComp";
import axios from "axios";
import { Blog, UserInterface } from "../types";
import { SiginCard } from "../components/SigninCard";
import { currentUser, showSiginCard } from "../recoil/state";
import { useRecoilState } from "recoil";
import { Loader } from "../components/Loader";
import { notifyError } from "../toast/toast";
import { FunctionalButton } from "../components/FunctionalButton";

export const Home = () => {
  const [blogs, setBlogs]: [Blog[], any] = useState([]);
  const [showSiginCardVal, setShowSiginCard] =
    useRecoilState<boolean>(showSiginCard);
  const [currentUserVal, setCurrentUserVal] = useRecoilState(currentUser);
  const [Loading, setLoading] = useState(false);

  const getBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios("/blog/bulk");
      setBlogs(response.data.doc);
      setLoading(false);
    } catch (e: any) {
      console.log(e);
      setLoading(false);
      notifyError(e.response.data.message);
    }
  };

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/user/auth");
      console.log(res);
      setCurrentUserVal(res.data.userDoc);
      setShowSiginCard(false);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setCurrentUserVal(undefined);
    }
  };

  useEffect(() => {
    getBlogs();
    getUser();
  }, []);

  return (
    <>
      {Loading && <Loader />}
      {showSiginCardVal && <SiginCard />}
      <div className="md:hidden">
        <FunctionalButton />
      </div>
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
              key={blog.id}
            >
              <BlogComp blog={blog} />
            </div>
          );
        })}
      </div>
    </>
  );
};
