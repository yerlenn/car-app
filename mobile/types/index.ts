export interface User {
  id: string;
  username: string;
  name: string;
  role: "buyer" | "seller";
}

export interface AuthResponse {
  token: string;
  user: User;
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
