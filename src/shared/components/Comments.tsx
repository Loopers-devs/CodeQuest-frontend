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

interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  createdAt: Date;
  parentId?: string;
  replies?: Comment[];
}

const mockComments: Comment[] = [
  {
    id: "1",
    author: "Juan Pérez",
    avatar: "",
    content: "¡Excelente artículo! Me ha ayudado mucho a entender el tema.",
    createdAt: new Date("2024-09-20T10:30:00"),
    replies: [
      {
        id: "1-1",
        author: "María García",
        avatar: "",
        content: "Estoy de acuerdo, la explicación es muy clara.",
        createdAt: new Date("2024-09-20T11:15:00"),
        parentId: "1",
      },
      {
        id: "1-2",
        author: "Carlos López",
        avatar: "",
        content: "Gracias por el feedback, me alegra que te haya sido útil.",
        createdAt: new Date("2024-09-20T12:00:00"),
        parentId: "1",
      },
    ],
  },
  {
    id: "2",
    author: "Ana Rodríguez",
    avatar: "",
    content: "Tengo una duda sobre el punto 3. ¿Podrías aclararlo?",
    createdAt: new Date("2024-09-20T14:20:00"),
  },
  {
    id: "3",
    author: "Pedro Sánchez",
    avatar: "",
    content: "Muy buen contenido, lo compartiré con mis colegas.",
    createdAt: new Date("2024-09-20T16:45:00"),
    replies: [
      {
        id: "3-1",
        author: "Laura Martín",
        avatar: "",
        content: "¡Gracias por compartir! Me interesa mucho el tema.",
        createdAt: new Date("2024-09-20T17:30:00"),
        parentId: "3",
      },
    ],
  },
];

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: "Usuario Actual",
      content: newComment,
      createdAt: new Date(),
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  const handleReply = (parentId: string) => {
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: `${parentId}-${Date.now()}`,
      author: "Usuario Actual",
      content: replyContent,
      createdAt: new Date(),
      parentId,
    };

    setComments(comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply],
        };
      }
      return comment;
    }));

    setReplyingTo(null);
    setReplyContent("");
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

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className={`flex gap-3 ${isReply ? "ml-12" : ""}`}>
          <Avatar className="w-8 h-8">
            <AvatarImage src={comment.avatar} alt={comment.author} />
            <AvatarFallback>
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm">{comment.author}</span>
              {isReply && <Badge variant="secondary" className="text-xs">Respuesta</Badge>}
              <span className="text-xs text-muted-foreground">
                {formatDate(comment.createdAt)}
              </span>
            </div>
            <p className="text-sm text-foreground mb-2">{comment.content}</p>
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
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

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <h3 className="text-lg font-semibold">Comentarios</h3>
          <Badge variant="secondary">{comments.length}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Formulario para nuevo comentario */}
        <div className="space-y-3">
          <Textarea
            placeholder="Escribe un comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[80px]"
          />
          <div className="flex justify-end">
            <Button onClick={handleAddComment} disabled={!newComment.trim()}>
              Publicar comentario
            </Button>
          </div>
        </div>

        <Separator />

        {/* Lista de comentarios */}
        <div className="space-y-4">
          {comments.map((comment) => (
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
                      disabled={!replyContent.trim()}
                    >
                      Responder
                    </Button>
                  </div>
                </div>
              )}
              {comment.replies && comment.replies.length > 0 && (
                <div className="space-y-3">
                  {comment.replies.map((reply) => (
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