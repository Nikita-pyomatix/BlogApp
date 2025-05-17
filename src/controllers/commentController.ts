import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CreateCommentInput, CreateReplyInput, UpdateCommentInput, UpdateReplyInput } from "../schemas/commentSchema";

const prisma = new PrismaClient();

// Comment Controllers
export const createComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { content, blogId } = req.body as CreateCommentInput;
    const authorId = (req as any).user.id;

    const comment = await prisma.comment.create({
      data: {
        content,
        blogId,
        authorId
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            profilePicture: true
          }
        }
      }
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error creating comment" });
  }
};

export const getBlogComments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { blogId } = req.params;
    const comments = await prisma.comment.findMany({
      where: {
        blogId: parseInt(blogId)
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            profilePicture: true
          }
        },
        replies: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                profilePicture: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments" });
  }
};

export const updateComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { content } = req.body as UpdateCommentInput;
    const authorId = (req as any).user.id;

    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) }
    });

    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    if (comment.authorId !== authorId) {
      res.status(403).json({ message: "Not authorized to update this comment" });
      return;
    }

    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(id) },
      data: { content },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            profilePicture: true
          }
        }
      }
    });

    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: "Error updating comment" });
  }
};

export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const authorId = (req as any).user.id;

    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) }
    });

    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    if (comment.authorId !== authorId) {
      res.status(403).json({ message: "Not authorized to delete this comment" });
      return;
    }

    await prisma.comment.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment" });
  }
};

// Reply Controllers
export const createReply = async (req: Request, res: Response): Promise<void> => {
  try {
    const { content, commentId } = req.body as CreateReplyInput;
    const authorId = (req as any).user.id;

    const reply = await prisma.reply.create({
      data: {
        content,
        commentId,
        authorId
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            profilePicture: true
          }
        }
      }
    });

    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: "Error creating reply" });
  }
};

export const updateReply = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { content } = req.body as UpdateReplyInput;
    const authorId = (req as any).user.id;

    const reply = await prisma.reply.findUnique({
      where: { id: parseInt(id) }
    });

    if (!reply) {
      res.status(404).json({ message: "Reply not found" });
      return;
    }

    if (reply.authorId !== authorId) {
      res.status(403).json({ message: "Not authorized to update this reply" });
      return;
    }

    const updatedReply = await prisma.reply.update({
      where: { id: parseInt(id) },
      data: { content },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            profilePicture: true
          }
        }
      }
    });

    res.json(updatedReply);
  } catch (error) {
    res.status(500).json({ message: "Error updating reply" });
  }
};

export const deleteReply = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const authorId = (req as any).user.id;

    const reply = await prisma.reply.findUnique({
      where: { id: parseInt(id) }
    });

    if (!reply) {
      res.status(404).json({ message: "Reply not found" });
      return;
    }

    if (reply.authorId !== authorId) {
      res.status(403).json({ message: "Not authorized to delete this reply" });
      return;
    }

    await prisma.reply.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: "Reply deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting reply" });
  }
}; 