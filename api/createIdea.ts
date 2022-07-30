import { Idea } from "@prisma/client";
import axios from "axios";

type IdeaWithoutId = Pick<Idea, "title" | "description" | "category">;
type Author = {
  image: string | null | undefined,
  name: string | null | undefined
}

export const createIdea = async (newIdea: IdeaWithoutId, author: Author) => {
  await axios.post("/api/ideas/create-idea", {
    title: newIdea.title,
    description: newIdea.description,
    category: newIdea.category,
    authorImage: author.image,
    authorName: author.name,
  });
}