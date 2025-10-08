export interface Customer {
  id: number;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  birthDate?: Date;
  driverLicense?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCustomerDto {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  birthDate?: Date;
  driverLicense?: string;
}

export interface UpdateCustomerDto {
  name?: string;
  cpf?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  birthDate?: Date;
  driverLicense?: string;
}

export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  plate: string;
  dailyRate: number;
  isAvailable: boolean;
  description?: string;
  color?: string;
  mileage?: number;
  fuelType?: string;
  transmission?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateVehicleDto {
  brand: string;
  model: string;
  year: number;
  plate: string;
  dailyRate: number;
  description?: string;
  color?: string;
  mileage?: number;
  fuelType?: string;
  transmission?: string;
}

export interface UpdateVehicleDto {
  brand?: string;
  model?: string;
  year?: number;
  plate?: string;
  dailyRate?: number;
  isAvailable?: boolean;
  description?: string;
  color?: string;
  mileage?: number;
  fuelType?: string;
  transmission?: string;
}

export enum RentalStatus {
  PENDING = "pending",
  ACTIVE = "active",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface Rental {
  id: number;
  vehicle: Vehicle;
  vehicleId: number;
  customer: Customer;
  customerId: number;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
  daysRented: number;
  status: RentalStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRentalDto {
  vehicleId: number;
  customerId: number;
  startDate: Date;
  endDate: Date;
  notes?: string;
}

export interface UpdateRentalDto {
  startDate?: Date;
  endDate?: Date;
  notes?: string;
}

export interface VehicleFilters {
  minPrice?: number;
  maxPrice?: number;
  isAvailable?: boolean;
  year?: number;
  fuelType?: string;
  transmission?: string;
  color?: string;
  minMileage?: number;
  maxMileage?: number;
}
