import { TypeAnimation } from "react-type-animation";

export const Typewriter = () => {
  return (
    <>
      <div
        className="bg-black text-white text-4xl p-5 flex items-center
        max-h-screen justify-center overflow-hidden"
      >
        <div className="max-w-3xl w-full">
          <div className="py-12 text-center min-h-96">
            <span className="font-poppins font-bold text-5xl block mb-2">
              Narrate
            </span>
            <TypeAnimation
              className="font-playwrite leading-relaxed"
              sequence={[
                " your story to the world, one post at a time.",
                2000,
                " the moments that matter - your voice, your platform.",
                2000,
                " and inspire - share your journey with a global audience.",
                2000,
                " the future - where every story finds its home.",
                2000,
                " your thoughts, ignite conversations.",
                2000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
            />
          </div>
        </div>
      </div>
    </>
  );
};
