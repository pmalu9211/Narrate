import { Link, useLocation } from "react-router-dom";
import { Blog } from "../types";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { currentUser } from "../recoil/state";

export const BlogComp = ({ blog }: { blog: Blog }) => {
  const { pathname } = useLocation();
  const date = new Date(blog.createdAt);
  const currentUserVal = useRecoilValue(currentUser);
  let redirect = useMemo(() => {
    if (currentUserVal) {
      if (pathname == "/profile") return "/profile/blog/" + blog.id;
      else return "/blog/" + blog.id;
    } else {
      return "";
    }
  }, [pathname, currentUserVal]);

  return (
    <Link
      to={String(redirect)}
      className="border border-neutral-300 rounded-xl p-8 mt-4 block"
    >
      <div className=" flex items-center gap-3 mb-2">
        <div className="border border-neutral-600 rounded-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>
        <div className="text-4xl lineHeight max-w-full text-ellipsis whitespace-nowrap overflow-hidden">
          {blog.title}
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="text-sm text-gray-500 ">
          {" "}
          {date.toLocaleDateString() + " " + date.toLocaleTimeString()}
        </div>
        <div className="text-m text-gray-700 ">
          <b>{blog.readingTime} </b>
          mins read
        </div>
      </div>
      <div className="mt-2 text-2xl max-w-full truncate-text">
        {blog.content}
      </div>
    </Link>
  );
};
