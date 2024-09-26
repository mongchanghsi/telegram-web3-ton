import { NextResponse } from "next/server";
import mtProtoClient from "@/lib/MTProto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phone_number, phone_code_hash, phone_code } = body;

    if (!phone_code || !phone_code_hash)
      return NextResponse.json("Missing Phone Code or Phone Code Hash", {
        status: 400,
      });

    const response = await mtProtoClient.signIn(
      phone_number,
      phone_code_hash,
      phone_code
    );
    return NextResponse.json("", { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
