type candidate = {
    id: string;
    name: string;
    phone: string;
    email: string;
    token: null;
    created_at: string;
    updated_at: string;
    status: string;
  };
  
export  type CandidateResponse = {
    data: candidate[];
    count: number;
  };