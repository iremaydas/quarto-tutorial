export async function onRequest(context) {
  const { request } = context;
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (request.method === "GET") {
    return new Response(JSON.stringify({ ok: true, msg: "Hello from Cloudflare Pages Functions!" }), {
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }

  if (request.method === "POST") {
    const data = await request.json().catch(() => ({}));
    return new Response(JSON.stringify({ ok: true, echo: data }), {
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }

  return new Response("Not found", { status: 404, headers });
}
