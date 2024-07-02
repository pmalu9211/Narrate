export interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  published: boolean;
  readingTime: number;
}

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  about?: string;
}
