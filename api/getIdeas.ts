import axios from "axios";

export const getIdeas = async (category: string) => {
  const { data: ideas } = await axios.get(`/api/ideas/${category}`);
  return ideas;
}