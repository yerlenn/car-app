export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  role: "buyer" | "seller";
  createdAt: string;
}

export interface Car {
  id: string;
  sellerId: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  color: string;
  description: string;
  images: string[];
  location: string;
  createdAt: string;
}

export interface AuthPayload {
  userId: string;
  username: string;
  role: "buyer" | "seller";
}
