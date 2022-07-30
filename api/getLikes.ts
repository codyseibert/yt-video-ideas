import { Like } from "@prisma/client";
import axios from "axios";

export const getLikes = async (): Promise<Like[]> => {
  const { data: likes } = await axios.get("/api/likes");
  return likes;
}