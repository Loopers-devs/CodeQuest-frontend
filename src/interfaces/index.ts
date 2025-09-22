export enum Roles {
  USER,
}

export interface User {
  id: number;
  email: string;
  fullName: string;
  image: string | null;
  nickname: string | null;
  provider: string;
  providerAccountId: string | null;
  roles: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  emailVerified: string | null;
  emailVerificationToken: string | null;
  emailVerificationExpiry: string | null;
  password: string | null;
  passwordResetToken: string | null;
  passwordResetTokenExpiry: string | null;
}

export enum PostStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export enum PostVisibility {
  PUBLIC = "PUBLIC",
  MEMBERS = "MEMBERS",
  PRIVATE = "PRIVATE",
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  summary?: string | null;
  content: string; // markdown o html

  // Clasificación y búsqueda
  category?: string | null;

  // Publicación
  status: PostStatus;
  visibility: PostVisibility;
  coverImageUrl?: string | null;
  publishedAt?: Date | null;

  // Métricas
  views: number;
  commentsCount: number;
  reactionsCount: number;

  // Auditoría
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;

  // Autor
  authorId: number;
  author?: Pick<User, "id" | "fullName" | "nickname" | "image">; // puede venir expandido o solo el id

  // Favoritos
  favoritedBy?: { userId: number }[]; // para saber si el usuario autenticado ha marcado como favorito
  isFavorited: boolean; // campo calculado para indicar si el usuario autenticado ha marcado como favorito
  tags?: { id: string; name: string }[]; // tags asociadas al post

  likedBy?: { userId: number }[]; // para saber si el usuario autenticado ha dado like
}

export type PostSortBy =
  | "publishedAt"
  | "createdAt"
  | "views"
  | "reactionsCount"
  | "commentsCount";

export type SortOrder = "asc" | "desc";

export type PostInclude = "author" | "comments" | "category" | "favorites";

export interface PostListQuery {
  search?: string;
  authorId?: number;
  category?: string | null;
  tags?: string[];
  status?: `${PostStatus}`;
  visibility?: `${PostVisibility}`;
  publishedOnly?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
  sortBy?: PostSortBy;
  order?: SortOrder;
  cursor?: string;
  take?: number;
  includes?: PostInclude[];
  userId?: number; // ID del usuario autenticado (para saber si es favorito)
}

export interface PagedResult<T> {
  items: T[];
  nextCursor: string | null;
  metadata: {
    totalPages: number;
    currentPage: number;
    nextPage: number | null;
    previousPage: number | null;
  };
}

export interface PostsOldData {
  pages: {
    items: Post[];
    nextCursor: string | null;
    metadata: {
      totalPages: number;
      currentPage: number;
      nextPage: number | null;
      previousPage: number | null;
    };
  }[];
  pageParams: (string | null)[];
}

export interface Category {
  id: string;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  posts?: Array<{ id: string }>;
}

export type CategoryListQuery = {
  cursor?: string;
  search?: string;
  // authorId se usa en getCategoriesByUserAction si necesitas filtrar por autor
  authorId?: string;
  // Opcional: permitir orden o inclusión de eliminados en futuras peticiones
  orderBy?: string;
  includeDeleted?: boolean;

  limit?: number; // para compatibilidad con algunos hooks
  after?: string; // cursor para paginación
  sortBy?: string; // campo para ordenar
  sortOrder?: 'asc' | 'desc'; // orden de clasificación

  page?: number; // para paginación basada en páginas
  pageSize?: number; // tamaño de página
};

export interface CommentListQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  parentId?: string;
  postId: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: number;
  author: Pick<User, "id" | "fullName" | "nickname" | "image">;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;

  children?: Comment[];
}

export interface PageResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}