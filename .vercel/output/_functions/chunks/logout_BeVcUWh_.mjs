import { c as createComponent } from './astro-component_DtgDE76K.mjs';
import 'piccolore';
import { L as renderTemplate } from './sequence_D8ekMvs6.mjs';
import 'clsx';

const $$Logout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Logout;
  if (Astro2.request.method === "GET") {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/admin",
        "Set-Cookie": "admin_auth=; Path=/admin; HttpOnly; SameSite=Strict; Max-Age=0"
      }
    });
  }
  return renderTemplate``;
}, "/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admin/logout.astro", void 0);

const $$file = "/Users/sam/.openclaw/workspace/waldorf-website/src/pages/admin/logout.astro";
const $$url = "/admin/logout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Logout,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
