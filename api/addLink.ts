import axios from "axios";

export const AddLinkToIdea = async (
  ideaId: string,
  videoLink: string
): Promise<void> => {
  await axios.post("/api/ideas/add-link", {
    ideaId,
    videoLink,
  });
};
