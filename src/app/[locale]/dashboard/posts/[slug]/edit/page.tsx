import { getPostBySlugAction } from "@/actions/post.action";
import CreatePostForm from "@/components/posts/create-post-form";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function EditPostPage({ params }: Props) {
  const { slug } = await params;

  const post = await getPostBySlugAction(slug);

  return <CreatePostForm initialData={post} />;
}
