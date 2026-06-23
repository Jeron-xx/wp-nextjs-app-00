async function getPost(slug) {
    const res = await fetch(
        `http://localhost/wordpress/wp-json/wp/v2/posts?_embed&slug=${slug}`,
        {
            next: { revalidate: 60 },
        }
    );

    const posts = await res.json();
    console.log(posts);
  return posts[0];
}

export default async function PostPage({ params }) {
    const { slug } = await params;
    const post = await getPost(slug);
    const author = post._embedded?.author?.[0]?.name || "Unknown Author";
    const date = post.date ? post.date : "Post Not Created";

    // const post = await getPost((await params).slug);
    // console.log(post);
    console.log(author);
    console.log(post.date);

    if (!post) {
        return <h1>Post not found</h1>;
    }
    
    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-4">{post.title.rendered}</h1>
            <p className="text-sm text-gray-500 mt-2">By {author} • {date}</p>
            <div dangerouslySetInnerHTML={{__html: post.content.rendered,}}/>
        </main>
    );

}
