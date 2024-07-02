import { useEffect, useState } from "react";
import { Blog as BlogType, UserInterface } from "../types";
import axios from "axios";
import { useParams } from "react-router-dom";

export const Blog = () => {
  const id = useParams().id;
  const [blog, setBlog] = useState({} as BlogType);
  const [user, setUser] = useState({} as UserInterface);
  const date = new Date(blog.createdAt);

  useEffect(() => {
    axios.get(`/blog/${id}`).then((res) => {
      setBlog(res.data.doc);
      setUser(res.data.userDoc);
      console.log(res.data);
    });
  }, []);
  return (
    <>
      <div className="min-h-screen font-poppins ">
        <div className="ml-6 text-left my-8 text-4xl font-semibold ">
          {blog.title}
        </div>
        <div className="grid grid-cols-5">
          <div className="col-span-4 mx-12 text-xl">{blog.content}</div>
          <div className="mr-2 mt-4">
            <div className="ml-4 mb-2 text-3xl text-gray-600 font-bold">
              Narrator
            </div>
            <div className="grid grid-cols-4 items-center gap text-2xl mb-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-16 w-16 border border-gray-400 rounded-full p-1 m-1 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <div className="ml-4 flex-shrink-2 col-span-3">{user.name}</div>
            </div>
            <div className="text-lg text-gray-400 mb-2">
              {date.toLocaleDateString() + " " + date.toLocaleTimeString()}
            </div>
            <div className="text-xl text-gray-400 font-bold">About</div>
            <div>
              {user.about
                ? user.about
                : "Likes to write on days off, but still writes everyday"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
