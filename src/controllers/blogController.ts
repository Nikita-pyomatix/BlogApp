import { Request, Response } from "express";
import { BlogService } from "../services/blogService";
import { CreateBlogInput, UpdateBlogInput } from "../schemas/blogSchema";
import { UploadedFile } from "express-fileupload";

const blogService = new BlogService();

export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body as CreateBlogInput;
    const image = req.files?.file as UploadedFile;
    const authorId = (req as any).user.id;
    const uploadPath = `./uploads/blog-images/${image.name}`;
    image.mv(uploadPath, (err) => {
      if (err) {
        console.error('Error while moving file:', err);
      }
    })
    const blog = await blogService.createBlog({
      title,
      description,
      image: uploadPath,
      authorId,
    });

    res.status(201).json(blog);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const getAllBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getBlogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const blog = await blogService.getBlogById(id);

    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { title, description } = req.body as UpdateBlogInput;
    const image = req.files?.file as UploadedFile;
    const uploadPath = `./uploads/blog-images/${image.name}`;
    image.mv(uploadPath, (err) => {
      if (err) {
        console.error('Error while moving file:', err);
      }
    })
    const blog = await blogService.updateBlog(id, {
      title,
      description,
      image: uploadPath,
    });

    res.json(blog);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    await blogService.deleteBlog(id);
    res.status(204).send({message: "Blog deleted successfully"});
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const getMyBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const authorId = (req as any).user.id;
    const blogs = await blogService.getBlogsByAuthor(authorId);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}; 