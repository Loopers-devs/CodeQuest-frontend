import * as z from "zod";
import { PostStatus, PostVisibility } from "@/interfaces";

export function getCreatePostSchema(messages: {
  minLength: (min: number) => string;
  maxLength: (max: number) => string;
  invalidUrl: string;
  invalidDate: string;
  invalidSlug: string;
}) {
  return z.object({
    title: z
      .string()
      .min(5, { message: messages.minLength(5) })
      .max(150, { message: messages.maxLength(150) })
      .transform((s) => (typeof s === "string" ? s.trim() : s)),

    slug: z
      .string()
      .min(5, { message: messages.minLength(5) })
      .max(200, { message: messages.maxLength(200) })
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i, { message: messages.invalidSlug })
      .transform((s) => (typeof s === "string" ? s.trim().toLowerCase() : s)),

    summary: z
      .string()
      .max(280, { message: messages.maxLength(280) })
      .optional()
      .nullable(),

    content: z.string().min(10, { message: messages.minLength(10) }),

    categoryId: z.string().optional().nullable(),

    tags: z.array(z.string().min(2).max(100)).optional(),

    // Use z.enum instead of deprecated z.nativeEnum
    status: z.enum(
      Object.values(PostStatus) as unknown as [string, ...string[]]
    ),

    visibility: z.enum(
      Object.values(PostVisibility) as unknown as [string, ...string[]]
    ),

    coverImageUrl: z
      .string()
      .optional()
      .nullable()
      .refine((val) => {
        if (val === null || val === undefined || val === "") return true;
        try {
          // URL constructor will throw on invalid URLs
          // allow protocol-relative or data URLs? keep it simple and require a valid absolute URL
          new URL(val as string);
          return true;
        } catch {
          return false;
        }
      }, { message: messages.invalidUrl }),
  });
}

export type CreatePostSchema = z.infer<ReturnType<typeof getCreatePostSchema>>;


export type UpdatePostSchema = z.infer<ReturnType<typeof getCreatePostSchema>>;
