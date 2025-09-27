import { NextResponse } from "next/server";
import { fatsecretFetch } from "@/lib/fatsecret";
// To handle a GET request to /api
export async function GET(request) {
  var options = {
    method: "GET",
    auth: {
      user: process.env.FATSECRET_CLIENT_ID,
      password: process.env.FATSECRET_CLIENT_SECRET,
    },
    json: true
  };

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  console.log(query);
  const data = await fatsecretFetch(
    `https://platform.fatsecret.com/rest/food/autocomplete/v2`,
    {
      query: query,
      format: "json",
    }
  );

  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}
