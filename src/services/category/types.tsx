type JobCategory = {
  id: string;
  name: string;
  created_at: string;
};

 export type JobCategoryResponse = {
  messages: string;
  data: JobCategory[];
  count: number;
};