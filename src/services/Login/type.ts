export interface authLoginRequest {
    email: string,
}
export interface authLoginResponse {
    mid: number;
    firebaseUID: string;
    stripeID: string;
    connectAccountID: string;
    role: number;
    name: string;
    phone: string;
    email: string;
    drivingLicence: string;
    createdBy?: null;
    updatedBy?: null;
    status: string;
    comment?: null;
    createdAt: string;
    updatedAt: string;
    merchant_bussinesses?: (MerchantBussinessesEntity)[] | null;
    merchant_page: MerchantPage;
  }
  export interface MerchantBussinessesEntity {
    id: number;
    mid: number;
    bussinessName: string;
    taxID?: null;
    bussinessType?: null;
    line1: string;
    landmark?: null;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    lat: number;
    lng: number;
    location: Location;
    createdBy?: null;
    updatedBy?: null;
    status: string;
    comment?: null;
    createdAt: string;
    updatedAt: string;
  }
  export interface Location {
    type: string;
    coordinates?: (number)[] | null;
  }
  export interface MerchantPage {
    id: number;
    businessId: number;
    mid: number;
    pageSlug: string;
    logo: string;
    themeColor: string;
    facebook: string;
    instagram: string;
    twitter: string;
    tiktok: string;
    linkedin: string;
    whatsapp: string;
    youtube: string;
    aboutUs: string;
    createdBy?: null;
    updatedBy?: null;
    status: string;
    comment?: null;
    createdAt: string;
    updatedAt: string;
  }
  