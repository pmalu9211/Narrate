import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { notifyError, notifySuccess } from "../toast/toast";

export const Post = () => {
  const { pathname } = useLocation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [readingTime, setReadingTime] = useState(4);
  const navigate = useNavigate();
  const blogId = useParams().id;
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (pathname.split("/")[1] === "profile") {
      setLoading(true);
      axios
        .get("/blog/" + blogId)
        .then((res) => {
          setTitle(res.data.doc.title);
          setContent(res.data.doc.content);
          setReadingTime(res.data.doc.readingTime);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          notifyError(e.response.data.message);

          console.log(e);
        });
    }
  }, [pathname]);
  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/blog/upload", {
        title,
        content,
        readingTime,
      });
      setLoading(false);
      navigate("/");
      notifySuccess(response.data.message);
      console.log(response);
    } catch (er: any) {
      setLoading(false);
      notifyError(er.response.data.message);
      console.log(e);
    }
  };

  const editHandler = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put("/blog/update", {
        id: blogId,
        title,
        content,
        readingTime,
      });
      setLoading(false);
      navigate("/profile");
      notifySuccess(response.data.message);
      console.log(response);
    } catch (e: any) {
      notifyError(e.response.data.message);
      setLoading(false);
      console.log(e);
    }
  };

  const deleteHandler = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.delete("/blog/" + blogId);
      console.log(response);
      navigate("/profile");
      setLoading(false);
      notifySuccess(response.data.message);
    } catch (e: any) {
      setLoading(false);
      console.log(e);
      notifyError(e.response.data.message);
    }
  };
  return (
    <>
      {" "}
      {Loading && <Loader />}
      <div>
        <div className="text-5xl font-extralight font-playwrite text-center mt-8">
          Narrate it
        </div>
        <form className="md:p-16 p-8">
          <div className="w-full border border-gray-300 rounded-2xl p-8 my-8">
            <div className="ml-4 text-3xl mt-4">Title</div>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <div className="ml-4 text-3xl mt-4">Content</div>
            <textarea
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="w-full border border-gray-300 rounded-2xl px-3 py-3 my-2 font-poppins text-xl"
              value={content}
            />
            <div className="md:flex">
              <div className="ml-4 text-3xl mt-4">Minutes required to read</div>
              <input
                onChange={(e) => setReadingTime(Number(e.target.value))}
                className="border border-gray-300 ml-3 rounded-lg px-3 py-3 my-2 font-poppins text-xl"
                type="number"
                value={readingTime}
              />
            </div>
            {pathname.split("/")[1] == "profile" ? (
              <div className="grid grid-cols-2 gap-8 px-12">
                <button className="mt-8" onClick={(e) => editHandler(e)}>
                  Edit
                </button>
                <button
                  className="mt-8 bg-red-500"
                  onClick={(e) => deleteHandler(e)}
                >
                  Delete
                </button>
              </div>
            ) : (
              <button
                className="mt-8"
                onClick={(e) => {
                  submitHandler(e);
                }}
              >
                Post
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
