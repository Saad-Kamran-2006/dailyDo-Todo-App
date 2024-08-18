import { NextRequest, NextResponse } from "next/server";

export const Token = (_request?: NextRequest, response?: NextResponse) => {
  const token = response!.cookies.get("AccessToken");
  console.log("Token: ", token);
  return token;
};
