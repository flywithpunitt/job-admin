type JobRole = {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  };
  
export  type JobRoleResponse = {
    data: JobRole[];
    count: number;
  };