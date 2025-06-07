type Industry = {
  id: string;
  name: string;
  created_at: string;
};

 export type IndustryResponse = {
  messages: string;
  data: Industry[];
  count: number;
};