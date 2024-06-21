import { Suspense } from "react";
// making type for params to receive
import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import UserPosts from "./components/UserPosts";
import type { Metadata } from "next";

type Params = {
  params: {
    userId: string;
  };
};

export async function generateMetadata({ params: { userId } }: Params): Promise<Metadata> {
    const userData: Promise<User> = getUser(userId)
    const user: User = await userData

    return {
        title: user.name,
        description: `This is the page of ${user.name}`
    }
}

export default async function UserPage({ params: { userId } }: Params) {
  // fetching in parallel: Not using await keyword
  const userData: Promise<User> = getUser(userId);
  //   Returns an array of posts
  const userPostsData: Promise<Post[]> = getUserPosts(userId);

  //   This is slower than implemented approach since user posts takes longer
  //   const [user, userPosts] = await Promise.all([userData, userPostsData]);

  const user = await userData;

  //   Improve this approach by progressively rendering a page and show a result to the user while the rest loads
  //   Can show user name while posts load
  return (
    <>
      <h2>{user.name}</h2>
      <br />
      <Suspense fallback={<h2>Loading...</h2>}>
        {/* @ts-expect-error Server Component */}
        <UserPosts promise={userPostsData} />
      </Suspense>
    </>
  );
}
