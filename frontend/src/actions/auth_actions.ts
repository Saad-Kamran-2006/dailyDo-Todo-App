"use server";
import axios from "axios";

import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const register_user = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    console.log(name, email, password);
    const response = await fetch(
      `https://immensely-innocent-warthog.ngrok-free.app/user/register?username=${name}&email=${email}&password=${password}`,
      {
        method: "POST",
      }
    );
    revalidatePath("/user/register/");
    return {
      status: "success",
      message: `User with ${name} is registered successfully`,
    };
  } catch (error) {
    return { status: "error", message: "Something went wrong" };
  }
};
// export const login_user = async (name: string, password: string) => {
//   try {
//     // console.log(name, password);
//     const credentials = new FormData();
//     credentials.append("username", name);
//     credentials.append("password", password);
//     console.log("Credentials", credentials);
//     const response = await fetch(
//       `https://immensely-innocent-warthog.ngrok-free.app/token`,
//       {
//         method: "POST",
//         body: credentials,
//       }
//     );
//     const { access_token, token_type, refresh_token } = await response.json();
//     console.log(access_token);
//     const res = new NextResponse();
//     res.cookies.set("AccessToken", access_token, {
//       httpOnly: true,
//     });
//     revalidatePath("/token/");
//     return res
//   } catch (error) {
//     return { status: "error", message: "Something went wrong" };
//   }
// };
