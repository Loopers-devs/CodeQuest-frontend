export enum Roles {
    USER
}

export interface User {
    id: number;
    fullName: string;
    nickname: string | null;
    email: string;
    password: null;
    roles: Roles[];
    image: string | null;

    //TODO: Este campo debería ser boolean
    emailVerified: null;
    emailVerificationToken: null | string;
    emailVerificationTokenExpiry: null | Date;

    passwordResetToken: null | string;

    createdAt: Date;
    updatedAt: Date;
    deletedAt: null | Date;

}

export enum PostStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    ARCHIVED = 'ARCHIVED',
}

export enum PostVisibility {
    PUBLIC = 'PUBLIC',
    MEMBERS = 'MEMBERS',
    PRIVATE = 'PRIVATE',
}

export interface Post {
    id: string;
    slug: string;
    title: string;
    summary?: string | null;
    content: string; // markdown o html

    // Clasificación y búsqueda
    category?: string | null;
    tags: string[];

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
    author?: Pick<User, 'id' | 'fullName' | 'nickname' | 'image'>; // puede venir expandido o solo el id
}

export type PostSortBy =
    | 'publishedAt'
    | 'createdAt'
    | 'views'
    | 'reactionsCount'
    | 'commentsCount';

export type SortOrder = 'asc' | 'desc';

export type PostInclude = 'author' | 'comments' | 'category';

export interface PostListQuery {
    search?: string;
    authorId?: number;
    category?: string | null;
    tags?: string[];
    status?: PostStatus;
    visibility?: PostVisibility;
    publishedOnly?: boolean;
    dateFrom?: Date;
    dateTo?: Date;
    sortBy?: PostSortBy;
    order?: SortOrder;
    cursor?: string;
    take?: number;
    includes?: PostInclude[];
}

export interface PagedResult<T> {
    items: T[];
    nextCursor: string | null;
    metadata: {
        totalPages: number;
        currentPage: number;
        nextPage: number | null;
        previousPage: number | null;
    }
}