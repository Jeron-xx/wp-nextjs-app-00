const WORDPRESS_API =  "http://localhost/wordpress/wp-json/wp/v2";

export async function getPosts() {
  const res = await fetch(`${WORDPRESS_API}/posts?_embed`);

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}
