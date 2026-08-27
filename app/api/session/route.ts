import { NextResponse } from "next/server";
import { currentSessionAction } from "@/app/actions/auth";

export async function GET() {
  const data = await currentSessionAction();
  return NextResponse.json(data);
}
