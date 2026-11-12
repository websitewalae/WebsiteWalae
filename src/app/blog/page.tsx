import { permanentRedirect } from "next/navigation";

// /blog is an alias of /articles. A permanent (308) redirect tells Google
// to consolidate ranking signals on /articles.
export default function BlogRedirect() {
  permanentRedirect("/articles");
}
