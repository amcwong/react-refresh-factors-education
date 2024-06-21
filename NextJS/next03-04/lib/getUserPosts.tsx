export default async function getUserPosts(userId: string) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );

  if (!res.ok) throw new Error("failed to fetch user posts");

  const data = await res.json();
  return data;
}
