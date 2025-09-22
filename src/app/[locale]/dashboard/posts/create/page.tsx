import { Metadata } from "next";
import CreatePostForm from "@/components/posts/create-post-form";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Crear Post | CodeQuest",
    description: "Crea un nuevo post en CodeQuest",
  };
}

export default function CreatePostPage() {
  return <CreatePostForm />;
}