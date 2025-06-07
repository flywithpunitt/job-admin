type Job = {
    id: string;
    title: string;
    description: string;
    requirements: string;
    location: string;
    salary_range_min: string;
    salary_range_max: string;
    status: string;
    remarks: null | string;
    created_at: string;
    company_name: string;
    company_logo: string;
    company_website: string;
    company_description: string;
    company_location: string;
    name: string;
    email: string;
    industry_name: string;
    job_category_name: string;
  };
  
export  type JobsResponse = {
    data: Job[];
    count: number;
  };