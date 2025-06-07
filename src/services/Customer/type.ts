import useOffSetTop from "src/hooks/useOffSetTop";


export interface CustomersResponse {
  count: number;
  data?: (DataEntity)[] | null;
}
export interface DataEntity {
  uid: number;
  firebaseUID: string;
  stripeID: string;
  name: string;
  phone: string;
  email: string;
  line1?: string;
  city?: string;
  state?: string;
  postal_code?: number;
  country?: string;
  createdBy?: string;
  updatedBy?: string;
  status: string;
  comment?: string;
  createdAt: string;
  updatedAt: string; 
  planID:number;
  coupon:string;
}
export interface customerResponce {
    uid: number;
    firebaseUID: string;
    stripeID: string;
    name: string;
    phone: string;
    email: string;
    line1?: string;
    city?: string;
    state?: string;
    postal_code?: number;
    country?: string;
    createdBy?: string;
    updatedBy?: string;
    status: string;
    comment?: string;
    createdAt: string;
    updatedAt: string; 
    planID:number;
    coupon:string;
}

export interface customerRequest {
  
}



export interface getCustomerPlanResponce {
  count: number;
  data?: (DataEntity2)[] | null;
}
export interface DataEntity2 {
  count: number;
    id: number;
    uid: number;
    mid: number;
    planID: number;
    refferedBy?: null;
    stripePlanID?: null;
    subscriptionID?: null;
    scheduleID?: null;
    coupon?: null;
    signature: string;
    lastInvoice?: null;
    invoice?: null;
    createdBy?: null;
    updatedBy?: null;
    status: string;
    comment?: null;
    createdAt: string;
    updatedAt: string;
    customer: Customer;
    firebaseUID: string
    stripeID: string
    name: string
    phone: string
    email: string
    line1: string
    city: string
    state: string
    postal_code: string
    country: string
   
  }
  export interface Customer {
    uid: number;
    firebaseUID: string;
    stripeID: string;
    name: string;
    phone: string;
    email: string;
    line1: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    createdBy?: null;
    updatedBy?: null;
    status: string;
    comment?: null;
    createdAt: string;
    updatedAt: string;
  }
    export interface customerByIdResponce {
      id: number;
      uid: number;
      mid: number;
      planID: number;
      refferedBy?: null;
      stripePlanID?: null;
      subscriptionID?: null;
      scheduleID?: null;
      coupon?: null;
      signature: string;
      lastInvoice?: null;
      invoice?: null;
      createdBy?: null;
      updatedBy?: null;
      status: string;
      comment?: null;
      createdAt: string;
      updatedAt: string;
      customer: Customer;
    }
    export interface Customer {
      uid: number;
      firebaseUID: string;
      stripeID: string;
      name: string;
      phone: string;
      email: string;
      line1: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
      createdBy?: null;
      updatedBy?: null;
      status: string;
      comment?: null;
      createdAt: string;
      updatedAt: string;
    }
    
