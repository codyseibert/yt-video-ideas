import axios from "axios";

export const addLinkToIdea = async (
  ideaId: string,
  videoLink: string
): Promise<void> => {
  await axios.post("/api/ideas/add-link", {
    ideaId,
    videoLink,
  });
};
