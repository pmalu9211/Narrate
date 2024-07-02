import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <>
      <div className="m-8 text-center text-3xl inline">
        You are not suppose to be here
      </div>
      <Link to={"/"} className="inline text-center text-3xl underline ">
        Here you go
      </Link>
    </>
  );
};
