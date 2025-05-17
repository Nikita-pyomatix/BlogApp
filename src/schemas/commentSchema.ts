import { z } from "zod";

export const createCommentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty").max(1000, "Comment is too long"),
  blogId: z.number().int().positive("Invalid blog ID")
});

export const createReplySchema = z.object({
  content: z.string().min(1, "Reply cannot be empty").max(500, "Reply is too long"),
  commentId: z.number().int().positive("Invalid comment ID")
});

export const updateCommentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty").max(1000, "Comment is too long")
});

export const updateReplySchema = z.object({
  content: z.string().min(1, "Reply cannot be empty").max(500, "Reply is too long")
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type CreateReplyInput = z.infer<typeof createReplySchema>;
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>;
export type UpdateReplyInput = z.infer<typeof updateReplySchema>; 