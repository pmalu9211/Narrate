import { useEffect, useState } from "react";
import { BlogComp } from "../components/BlogComp";
import axios from "axios";
import { Blog, UserInterface } from "../types";
import { Loader } from "../components/Loader";
import { notifyError, notifySuccess } from "../toast/toast";
import { FunctionalButton } from "../components/FunctionalButton";

export const Profile = () => {
  const [blogs, setBlogs]: [Blog[], any] = useState([]);
  const [, setUser] = useState({} as UserInterface);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [Loading, setLoading] = useState(false);

  const getProfile = async () => {
    try {
      setLoading(true);
      const response = await axios("/user/profile");
      setBlogs(response.data.blogs);
      setUser(response.data.userDoc);
      setName(response.data.userDoc.name);
      setAbout(response.data.userDoc.about);
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      console.log(e);
      notifyError(e.response.data.message);
    }
  };

  const updateProfile = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      axios.put("/user/update", { name, about });
      setLoading(false);
      notifySuccess("Profile Updated");
    } catch (e: any) {
      setLoading(false);
      console.log(e);
      notifyError(e.response.data.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <div className="md:hidden">
        <FunctionalButton />
      </div>
      {Loading && <Loader />}
      <div className="grid lg:grid-cols-3 grid-cols-1 lg:w-full  md:w-8/12 mx-auto ">
        <form className="p-4">
          <div className="text-5xl font-extralight font-playwrite text-center mt-8">
            Profile
          </div>
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-28 mx-auto mt-16 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
          <input
            type="text"
            className=""
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
          <textarea
            placeholder="About"
            rows={8}
            value={about}
            onChange={(e) => {
              setAbout(e.target.value);
            }}
            className="w-full border border-gray-300 rounded-2xl px-3 py-3 my-2 font-poppins text-xl"
          />
          <button
            onClick={(e) => {
              updateProfile(e);
            }}
          >
            Edit
          </button>
        </form>
        <div className="min-h-screen font-poppins p-4 col-span-2 ">
          {blogs.length === 0 ? (
            <div className="text-4xl text-center mt-32 font-playwrite">
              Narrate your first story to see here
            </div>
          ) : (
            blogs.map((blog: Blog) => {
              return <BlogComp key={blog.id} blog={blog} />;
            })
          )}
        </div>
      </div>
    </>
  );
};
