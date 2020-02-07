export interface IUser {
  firstName?: string;
  lastName?: string;
  id?: string;
  email?: string;
  password?: string;
  address?: IAddress
}

export interface IAddress {
  line1?: string;
  line2?: string;
  town?: string;
  postcode?: string;
  country?: string;
}
