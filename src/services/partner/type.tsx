export interface partnerResponse {
  data?: (DataEntity)[] | null;
  count: number;
}
export interface DataEntity {
  id: string;
  name: string;
  image: string;
  status: string;
  created_at: string;
}


  export interface UserRequest {
   name:string;
   image:string;
  }
  
  