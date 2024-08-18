import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, response: NextResponse) => {
  try {
    const { username, password } = await request.json();
    console.log(username, password);
    const credentials = new FormData();
    credentials.append("username", username);
    credentials.append("password", password);
    console.log("Credentials", credentials);
    const response = await fetch(
      `https://immensely-innocent-warthog.ngrok-free.app/token`,
      {
        method: "POST",
        body: credentials,
      }
    );
    const { access_token, token_type, refresh_token } = await response.json();
    console.log(access_token);
    const res = new NextResponse();
    res.cookies.set("AccessToken", access_token, {
      httpOnly: true,
    });
    revalidatePath("/token/");
    return res;
  } catch (error) {
    return { status: "error", message: "Something went wrong" };
  }
};
