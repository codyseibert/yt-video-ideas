import axios from "axios";

export const heartIdea = async (ideaId: string): Promise<void> => {
  await axios.post("/api/ideas/heart-idea", {
    ideaId,
  });
}