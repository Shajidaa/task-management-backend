import type { IUser } from "./user.interface";

export const registerUser = async (payload: IUser) => {
  console.log(payload);
};

export const userService = {
  registerUser,
};
