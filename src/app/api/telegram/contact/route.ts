import { NextResponse } from "next/server";
import mtProtoClient from "@/lib/MTProto";

export async function GET() {
  try {
    const response = await mtProtoClient.fetchContactIds();
    return NextResponse.json({ contact_ids: response }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
