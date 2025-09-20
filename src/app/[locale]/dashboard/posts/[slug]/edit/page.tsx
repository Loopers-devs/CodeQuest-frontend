import PostForm from "@/components/dashboard/posts/post-form";
import { getPostBySlugAction } from "@/actions/post.action";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function EditPostPage({ params }: Props) {
  const { slug } = await params;

  const post = await getPostBySlugAction(slug);

  return <PostForm post={post} />;
}
