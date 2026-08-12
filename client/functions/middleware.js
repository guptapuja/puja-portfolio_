const COOKIE_NAME = "puja_visit_count";
const MAX_VISITS = 2;

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // Only count actual page navigation, not JS/CSS/images/API requests
  const isPageRequest =
    request.method === "GET" &&
    request.headers.get("Sec-Fetch-Dest") === "document";

  if (!isPageRequest) {
    return next();
  }

  const cookieHeader = request.headers.get("Cookie") || "";

  const match = cookieHeader.match(
    new RegExp(`${COOKIE_NAME}=([^;]+)`)
  );

  let visitCount = match ? Number(match[1]) : 0;

  // Already visited twice → BLOCK
  if (visitCount >= MAX_VISITS) {
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Access Restricted</title>
          <style>
            body {
              margin: 0;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #faf7fb;
              color: #333;
              font-family: Arial, sans-serif;
              text-align: center;
            }

            div {
              max-width: 500px;
              padding: 40px;
            }

            h1 {
              font-size: 32px;
            }

            p {
              color: #666;
            }
          </style>
        </head>

        <body>
          <div>
            <h1>Access Restricted</h1>
            <p>This portfolio is currently unavailable.</p>
          </div>
        </body>
      </html>
      `,
      {
        status: 403,
        headers: {
          "Content-Type": "text/html; charset=UTF-8",
          "Cache-Control": "no-store",
        },
      }
    );
  }

  // Count this page visit
  visitCount += 1;

  const response = await next();

  const headers = new Headers(response.headers);

  headers.append(
    "Set-Cookie",
    `${COOKIE_NAME}=${visitCount}; Path=/; Max-Age=31536000; Secure; HttpOnly; SameSite=Lax`
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}