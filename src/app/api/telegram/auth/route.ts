import { NextResponse } from "next/server";
import mtProtoClient from "@/lib/MTProto";
import { HandleGenericError } from "@/utils/error";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phoneNumber = searchParams.get("phoneNumber");
    if (!phoneNumber)
      return NextResponse.json("Missing Phone Number", { status: 400 });
    const phone_code_hash = await mtProtoClient.sendAuthCode(phoneNumber);
    return NextResponse.json({ phone_code_hash }, { status: 200 });
  } catch (error) {
    const _error = HandleGenericError(error);
    return NextResponse.json({ error: _error }, { status: 500 });
  }
}
