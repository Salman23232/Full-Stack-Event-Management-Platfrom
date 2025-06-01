import api from "./axios";

export const fetchEventById = async (id: string) => {
  const res = await api.get(`/event/${id}`);
  return res.data;
};
export const handleSave = async function (id:string) {
    const res = await api.put(`/event/save/${id}`)
  }

