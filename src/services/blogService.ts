import prisma from "../config/prisma";
import { Blog, CreateBlogData, UpdateBlogData } from "../types/blog";

export class BlogService {
  async createBlog(data: CreateBlogData): Promise<Blog> {
    return prisma.blog.create({
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
        authorId: data.authorId,
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
  }

  async getAllBlogs(): Promise<Blog[]> {
    return prisma.blog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            profilePicture: true
          }
        },
        comments: {
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
        }
      }
    });
  }

  async getBlogById(id: number): Promise<Blog | null> {
    return prisma.blog.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            profilePicture: true
          }
        },
        comments: {
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
        }
      }
    });
  }

  async updateBlog(id: number, data: UpdateBlogData): Promise<Blog> {
    return prisma.blog.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
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
  }

  async deleteBlog(id: number): Promise<Blog> {
    return prisma.blog.delete({
      where: { id },
    });
  }

  async getBlogsByAuthor(authorId: number): Promise<Blog[]> {
    return prisma.blog.findMany({
      where: { authorId },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            profilePicture: true
          }
        },
        comments: {
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
        }
      }
    });
  }
} 