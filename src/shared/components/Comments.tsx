"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { MessageCircle, Reply, Edit, Trash2, User } from "lucide-react";
import { useCreateComment, usePostComments } from "@/hooks/use-comment";
import { Skeleton } from "@/components/ui/skeleton";
import { Comment } from "@/interfaces";
import { useAuth } from "@/providers/AuthProvider";

interface Props {
  postId: string;
  totalComments?: number;
}

export default function Comments({ postId, totalComments }: Props) {
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const session = useAuth();

  const { data, isLoading } = usePostComments({ postId, pageSize: 20 });

  const { mutate: createComment, isPending: isCreating } = useCreateComment();

  const flatItems = data?.pages.flatMap((p) => p.items) ?? [];

  const handleAddComment = () => {
    if (!newComment.trim() || !session?.user) return;

    createComment(
      {
        postId,
        content: newComment,
      },
      {
        onSuccess: () => {
          setNewComment("");
        },
      }
    );
  };

  const handleReply = (parentId: string) => {
    if (!replyContent.trim() || !session?.user) return;

    createComment(
      {
        postId,
        content: replyContent,
        parentId,
      },
      {
        onSuccess: () => {
          setReplyingTo(null);
          setReplyContent("");
        },
      }
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const CommentItem = ({
    comment,
    isReply = false,
  }: {
    comment: Comment;
    isReply?: boolean;
  }) => (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className={`flex gap-3 ${isReply ? "ml-12" : ""}`}>
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={comment.author.image || undefined}
              alt={comment.author.fullName}
            />
            <AvatarFallback>
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm">
                {comment.author.fullName}
              </span>
              {isReply && (
                <Badge variant="secondary" className="text-xs">
                  Respuesta
                </Badge>
              )}
              <span className="text-xs text-muted-foreground">
                {formatDate(new Date(comment.createdAt))}
              </span>
            </div>
            <p className="text-sm text-foreground mb-2">{comment.content}</p>
            {(!isReply && session.user?.email) && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs my-4"
                onClick={() =>
                  setReplyingTo(replyingTo === comment.id ? null : comment.id)
                }
              >
                <Reply className="w-3 h-3 mr-1" />
                Responder
              </Button>
            )}
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <Edit className="w-4 h-4 mr-2" />
          Editar
        </ContextMenuItem>
        <ContextMenuItem className="text-destructive">
          <Trash2 className="w-4 h-4 mr-2" />
          Eliminar
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );

  if (isLoading) {
    return (
      <Card className="w-full mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Comentarios</h3>
            <Badge variant="secondary">0</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-10 w-full" />
          <Separator />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Separator />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <h3 className="text-lg font-semibold">Comentarios</h3>
          <Badge variant="secondary">{totalComments}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Formulario para nuevo comentario */}
        {session.user?.email && (
          <div className="space-y-3">
            <Textarea
              placeholder="Escribe un comentario..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[80px]"
            />
            <div className="flex justify-end">
              <Button
                onClick={handleAddComment}
                disabled={!newComment.trim() || isCreating}
              >
                Publicar comentario
              </Button>
            </div>
          </div>
        )}

        <Separator />

        {/* Lista de comentarios */}
        <div className="space-y-4">
          {flatItems.map((comment) => (
            <div key={comment.id} className="space-y-3">
              <CommentItem comment={comment} />
              {replyingTo === comment.id && (
                <div className="ml-11 space-y-2">
                  <Textarea
                    placeholder="Escribe tu respuesta..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="min-h-[60px]"
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyContent("");
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleReply(comment.id)}
                      disabled={!replyContent.trim() || isCreating}
                    >
                      Responder
                    </Button>
                  </div>
                </div>
              )}
              {comment.children && comment.children.length > 0 && (
                <div className="space-y-3 mt-2">
                  {comment.children.map((reply) => (
                    <CommentItem key={reply.id} comment={reply} isReply />
                  ))}
                </div>
              )}
              <Separator />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
