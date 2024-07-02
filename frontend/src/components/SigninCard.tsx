import { useSetRecoilState } from "recoil";
import { SigninForm } from "./SigninForm";
import { showSiginCard } from "../recoil/state";

export const SiginCard = () => {
  const setShowSiginCard = useSetRecoilState<boolean>(showSiginCard);
  return (
    <>
      <div className=" top-0 backdrop-filter backdrop-blur-md z-10 fixed h-screen w-screen flex items-center justify-center">
        <div className="lg:w-4/12 md:w-6/12">
          <SigninForm />
          <div
            onClick={() => setShowSiginCard(false)}
            className="text-2xl text-center font-light cursor-pointer underline"
          >
            Not now?
          </div>
        </div>
      </div>
    </>
  );
};
