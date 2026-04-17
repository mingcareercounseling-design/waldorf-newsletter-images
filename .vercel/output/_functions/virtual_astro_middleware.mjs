import { a6 as defineMiddleware, af as sequence } from './chunks/sequence_D8ekMvs6.mjs';
import 'piccolore';
import 'clsx';

const ADMIN_PASSWORD = "waldorf2026";
const onRequest$1 = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  if (!pathname.startsWith("/admin")) {
    return next();
  }
  const cookie = context.cookies.get("admin_auth");
  if (cookie?.value === ADMIN_PASSWORD) {
    return next();
  }
  if (context.request.method === "POST") {
    const body = await context.request.formData().catch(() => null);
    const password = body?.get("password")?.toString();
    if (password === ADMIN_PASSWORD) {
      const response = await next();
      response.headers.append(
        "Set-Cookie",
        `admin_auth=${ADMIN_PASSWORD}; Path=/admin; HttpOnly; SameSite=Strict; Max-Age=86400`
      );
      return response;
    }
  }
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>光禾後台登入</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Noto Sans TC', sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #8B4513 0%, #228B22 100%);
    }
    .card {
      background: white;
      border-radius: 16px;
      padding: 48px 40px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      text-align: center;
    }
    .logo { font-size: 3rem; margin-bottom: 16px; }
    h1 { color: #8B4513; font-size: 1.5rem; margin-bottom: 8px; }
    p { color: #666; margin-bottom: 32px; font-size: 0.9rem; }
    input[type="password"] {
      width: 100%;
      padding: 14px 16px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      margin-bottom: 16px;
      transition: border-color 0.2s;
      font-family: inherit;
    }
    input[type="password"]:focus { outline: none; border-color: #8B4513; }
    button {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #8B4513, #228B22);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
      transition: opacity 0.2s;
    }
    button:hover { opacity: 0.9; }
    .error { color: #e53e3e; font-size: 0.85rem; margin-top: 12px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">🌿</div>
    <h1>光禾華德福後台</h1>
    <p>請輸入管理員密碼</p>
    <form method="POST">
      <input type="password" name="password" placeholder="管理員密碼" autofocus required>
      <button type="submit">登入</button>
      ${context.request.method === "POST" ? '<p class="error">密碼錯誤，請重試</p>' : ""}
    </form>
  </div>
</body>
</html>`;
  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
