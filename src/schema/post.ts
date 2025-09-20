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
      .nullable()
      .transform((s) => (typeof s === "string" ? s.trim() : s)),

    content: z.string().min(10, { message: messages.minLength(10) }),

    category: z
      .string()
      .optional()
      .nullable()
      .transform((s) => (typeof s === "string" ? s.trim() : s)),

    tags: z
      .preprocess((arg) => {
        if (!arg) return [] as string[];
        if (typeof arg === "string") {
          // allow comma separated string
          return (arg as string)
            .split(/,|;/)
            .map((t) => t.trim())
            .filter(Boolean);
        }
        return Array.isArray(arg) ? arg : [];
      }, z.array(z.string()).optional())
      .transform((arr) =>
        Array.isArray(arr)
          ? [...new Set(arr.map((t) => t.trim().toLowerCase()).filter(Boolean))]
          : []
      ),

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
