import axios from "axios";
import { atom, selector } from "recoil";
import { UserInterface } from "../types";

export const user = atom({
  key: "user",
  default: selector({
    key: "userSelector",
    get: async () => {
      const res = await axios.get("/user/auth");
      console.log(res);
      return res.data.userDoc;
    },
  }),
});

export const currentUser = atom({
  key: "currentUser",
  default: undefined as UserInterface | undefined,
});

export const showSiginCard = atom({
  key: "showSiginCard",
  default: false,
});
