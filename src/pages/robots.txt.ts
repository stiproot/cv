import type { APIRoute } from "astro";
import { INDEXABLE } from "~/config/site";

const robotsTxt = `User-agent: *
${INDEXABLE ? "Allow: /" : "Disallow: /"}
`;

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
