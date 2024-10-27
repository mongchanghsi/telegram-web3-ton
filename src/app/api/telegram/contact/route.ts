import { NextResponse } from "next/server";
import mtProtoClient from "@/lib/MTProto";
import { HandleGenericError } from "@/utils/error";

export async function GET() {
  try {
    const response = await mtProtoClient.fetchContactIds();
    return NextResponse.json({ users: response }, { status: 200 });
  } catch (error) {
    const _error = HandleGenericError(error);
    return NextResponse.json({ error: _error }, { status: 500 });
  }
}
