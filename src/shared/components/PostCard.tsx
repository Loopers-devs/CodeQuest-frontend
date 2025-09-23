"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Clock } from "lucide-react";
import { Post } from "@/interfaces";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FavoriteToggle } from "./FavoriteToggle";
import Link from "next/link";
import { useAddPostToLikes, useRemovePostFromLikes } from "@/hooks/use-post";
import { useAuth } from "@/providers/AuthProvider";
// import { Link } from "react-router-dom";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const name =
    post.author?.fullName || post.author?.nickname || "Autor Desconocido";

  const session = useAuth();  

  const { mutate: addPostToLikes } = useAddPostToLikes(post.id);
  const { mutate: removePostFromLikes } = useRemovePostFromLikes(post.id);

  const isLiked =  post?.likedBy?.find((like) => like.userId === session.user?.id) !== undefined;
  const isFavorited = post.favoritedBy?.find((fav) => fav.userId === session.user?.id) !== undefined;

  const toggleLiked = () => {

    if (!session.user?.id) return;

    if (!isLiked) {
      return addPostToLikes()
    }

    return removePostFromLikes()
  }

  return (
    <Card className="group overflow-hidden border-0 bg-card shadow-card hover:shadow-elevated transition-smooth hover:-translate-y-1 pt-0">
      {post?.coverImageUrl && (
        <div className="aspect-[16/9] overflow-hidden">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            width={400}
            height={225}
            className="h-full w-full object-cover transition-smooth group-hover:scale-105"
          />
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-3">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary hover:bg-primary/20"
          >
            {post.category}
          </Badge>
          <FavoriteToggle postId={post.id} isFavorite={isFavorited} />
        </div>

        <Link href={`/posts/${post.slug}`}>
          <div>
            <h3 className="text-xl font-semibold leading-tight text-card-foreground hover:text-primary transition-smooth line-clamp-2">
              {post.title}
            </h3>
          </div>
        </Link>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
          {post.summary}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post?.author?.image || undefined} alt={name} />
            <AvatarFallback className="text-xs bg-primary/10 text-primary">
              {name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-card-foreground">
              {name}
            </span>
            <div className="flex items-center text-xs text-muted-foreground space-x-2">
              {post.createdAt &&
                new Date(post.createdAt).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              <span>•</span>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {post.createdAt &&
                  new Date(post.createdAt).toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-muted-foreground">
          <Button
            variant="ghost"
            size="sm"
            className={cn("h-8 px-2 hover:text-red-500 transition-smooth", {
              "text-red-500": isLiked,
            })}
            onClick={() => toggleLiked()}
            disabled={!session.user?.id}
          >
            <Heart className="h-4 w-4 mr-1" />
            <span className="text-xs">{post.reactionsCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 hover:text-primary transition-smooth"
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            <span className="text-xs">{post.commentsCount}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
