export async function getPost(slug) {
    const res = await fetch(
        `http://localhost/wordpress/wp-json/wp/v2/posts?slug=${slug}`,
        {
            next: { revalidate: 60 },
        }
    );

    const posts = await res.json();
  return posts[0];
}

export default async function PostPage({ params }) {
    const { slug } = await params;
    const post = await getPost(slug);

    // const post = await getPost((await params).slug);

    if (!post) {
        return <h1>Post not found</h1>;
    }
    
    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-4">{post.title.rendered}</h1>
            <div dangerouslySetInnerHTML={{__html: post.content.rendered,}}/>
        </main>
    );

}
