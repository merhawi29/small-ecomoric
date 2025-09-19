import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return handleProxy(req);
}

export async function POST(req: NextRequest) {
  return handleProxy(req);
}

async function handleProxy(req: NextRequest) {
  const targetUrl = req.nextUrl.searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  try {
    const fetchOptions: RequestInit = {
      method: req.method,
      headers: Object.fromEntries(req.headers),
    };

    // Only attach body for non-GET/HEAD requests
    if (req.method !== "GET" && req.method !== "HEAD") {
      fetchOptions.body = await req.text(); // keep body as raw text
    }

    const res = await fetch(targetUrl, fetchOptions);

    // Pass through response body
    const contentType = res.headers.get("content-type") || "";
    const responseBody = contentType.includes("application/json")
      ? await res.json()
      : await res.text();

    return new NextResponse(
      typeof responseBody === "string" ? responseBody : JSON.stringify(responseBody),
      {
        status: res.status,
        headers: { "content-type": contentType },
      }
    );
  } catch (err) {
    return NextResponse.json({ error: "Proxy request failed" }, { status: 500 });
  }
}