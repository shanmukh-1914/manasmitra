
// NextAuth API route removed. No authentication logic.
export async function GET() {
  return new Response("Auth API removed", { status: 200 });
}

export async function POST() {
  return new Response("Auth API removed", { status: 200 });
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };