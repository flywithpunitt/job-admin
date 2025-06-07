 interface User {
    id: string;
    name: string;
    avatar: string | null;
    bio: string | null;
    education: string;
    experience: string | null;
    skills: string;
    phone: string;
    email: string;
    status: string;
    created_at: string;
  }

  export interface UserResponse {
    data: User[];
    count: number;
  }

  export interface UserRequest {
   name:string;
   email:string;
   phone:string;
   role:string;
  }
  
  