export interface SignUp {
  name: string;
  email: string;
  password: string;
}
export interface SignIn {
  email: string;
  password: string;
}
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  quantity: undefined | number;
  productId: undefined | number;
}
export interface cart {
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  quantity: undefined | number;
  id: undefined | number;
  productId: number;
  userId: number;
}
export interface priceSummary {
  price: number;
  tax: number;
  delivery: number;
  discount: number;
  totalPrice: number;
}

export interface checkout {
  email: string;
  address: string;
  contact: string;
}
export interface order {
  email: string;
  address: string;
  contact: string;
  userId: number;
  totalPrice: number;
  id: number | undefined;
}
