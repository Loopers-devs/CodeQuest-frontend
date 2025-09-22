import { getPostBySlugAction } from "@/actions/post.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Comments from "@/shared/components/Comments";
import { ArrowLeft, Calendar, Clock, Heart, MessageCircle, Share2 } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const slug = (await params).slug;

  const post = await getPostBySlugAction(slug);

  return {
    title: post.title,
    description: post.summary || "",
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlugAction(slug);

  const name =
    post.author?.fullName || post.author?.nickname || "Autor Desconocido";

  const date = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Fecha desconocida";
    
    const time = post.createdAt
    ? new Date(post.createdAt).toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Hora desconocida";

  return (
    <div className="mx-auto w-full">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/posts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a posts
          </Link>
        </Button>
      </div>
      <Card className="pt-0">
        <CardContent className="p-0">
          <div className="relative aspect-video overflow-hidden rounded-t-xl">
            <Image
              src={post.coverImageUrl || "/default-cover.jpg"}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

            <div className="flex items-center space-x-3 mb-6">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post?.author?.image || undefined} alt={name} />
                <AvatarFallback className="text-sm bg-primary/10 text-primary">
                  {name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <span className="text-sm font-medium text-card-foreground">
                  {name}
                </span>
                <div className="flex items-center text-xs text-muted-foreground space-x-2">
                  <div className="flex items-center gap-1">
                      <Calendar size="15" /> {date}
                  </div>
                  <div className="flex items-center gap-1">
                      <Clock size="15" /> {time}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="prose max-w-none mb-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <Separator className="my-6" />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {
                  post.tags && post.tags.length > 0 && (
                      post.tags.map((tag) => (
                          <Badge key={tag.id} className="text-sm">#{tag.name}</Badge>
                      ))
                  )
              }
            </div>

            {/* Share */}
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="outline"
                size="sm"
                // onClick={() => {
                //   if (navigator.share) {
                //     navigator.share({
                //       title: post.title,
                //       text: post.summary || post.title,
                //       url: window.location.href,
                //     });
                //   } else {
                //     navigator.clipboard.writeText(window.location.href);
                //     alert('Enlace copiado al portapapeles');
                //   }
                // }}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Compartir
              </Button>
            </div>

            <Separator className="my-6" />

            {/* Reactions and comments */}
            <div className="flex items-center space-x-4 mb-6">
              <Button variant="ghost" size="sm">
                <Heart className="mr-2 h-4 w-4" />
                {post.reactionsCount}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                // onClick={() => {
                //   document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' });
                // }}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {post.commentsCount}
              </Button>
            </div>

            <div id="comments">
              <Comments postId={post.id} totalComments={post.commentsCount} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
