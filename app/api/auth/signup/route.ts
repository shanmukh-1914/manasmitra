import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
// Signup API route removed. No authentication logic.
export async function POST() {
  return new Response("Signup API removed", { status: 200 });
}
