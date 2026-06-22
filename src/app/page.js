import { getPosts } from "../lib/wordpress";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="p-8">
        <h1 className="text-3xl font-bold mb-6">
          WordPress Blog
        </h1>

        {posts.map((post) => {
          
          const author =
            post._embedded?.author?.[0]?.name || "Unknown Author";

          const date = new Date(post.date).toLocaleDateString(
            "en-IN",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          );
          

          
          console.log(post);

          return (
            <div key={post.id} className="mb-6 border-b pb-4">
              <h2 className="text-xl font-semibold" dangerouslySetInnerHTML={{__html: post.title.rendered,}}/>
              <p className="text-sm text-gray-500 mt-2">By {author} • {date}</p>
            </div>
          )
        })}
    </main>
  );
}
