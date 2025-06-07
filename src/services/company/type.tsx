type Company = {
    id: string;
    user_id: string;
    name: string;
    logo: string;
    website: string;
    description: string;
    size: string;
    location: string;
    industry: string;
    gst: string;
    pan: string;
    cin: string;
    contact_name: string;
    contact_email: string;
    created_at: string;
    updated_at: string;
    status: string;
  };
  
 export  type CompanyResponse = {
    data: Company[];
    count: number;
  };