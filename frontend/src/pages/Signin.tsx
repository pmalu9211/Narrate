import { SigninForm } from "../components/SigninForm";
import { Typewriter } from "../components/Typewriter";

export const Signin = () => {
  return (
    <>
      <div className="h-screen flex flex-col">
        <div className="font-poppins text-5xl text-center py-12 border-b-2 border-black">
          Narrate
        </div>
        <div className="flex-grow grid lg:grid-cols-2 md:grid-cols-2">
          <Typewriter />
          <SigninForm />
        </div>
      </div>
    </>
  );
};
