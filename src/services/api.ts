import axios from "axios";
import { Customer, CreateCustomerDto, UpdateCustomerDto } from "../types";
import {
  Vehicle,
  CreateVehicleDto,
  UpdateVehicleDto,
  VehicleFilters,
} from "../types";
import {
  Rental,
  CreateRentalDto,
  UpdateRentalDto,
  RentalStatus,
} from "../types";

const API_BASE_URL = "http://localhost:3001";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Customer API
export const customerApi = {
  getAll: (search?: string) =>
    api.get<Customer[]>("/customers", { params: { search } }),

  getById: (id: number) => api.get<Customer>(`/customers/${id}`),

  getByCpf: (cpf: string) => api.get<Customer>(`/customers/cpf/${cpf}`),

  getByEmail: (email: string) => api.get<Customer>(`/customers/email/${email}`),

  getRentalHistory: (id: number) =>
    api.get<Rental[]>(`/customers/${id}/rentals`),

  create: (data: CreateCustomerDto) => api.post<Customer>("/customers", data),

  update: (id: number, data: UpdateCustomerDto) =>
    api.patch<Customer>(`/customers/${id}`, data),

  delete: (id: number) => api.delete(`/customers/${id}`),
};

// Vehicle API
export const vehicleApi = {
  getAll: (filters?: VehicleFilters) =>
    api.get<Vehicle[]>("/vehicles", { params: filters }),

  getById: (id: number) => api.get<Vehicle>(`/vehicles/${id}`),

  getAvailable: () => api.get<Vehicle[]>("/vehicles/available"),

  create: (data: CreateVehicleDto) => api.post<Vehicle>("/vehicles", data),

  update: (id: number, data: UpdateVehicleDto) =>
    api.patch<Vehicle>(`/vehicles/${id}`, data),

  updateAvailability: (id: number, isAvailable: boolean) =>
    api.patch<Vehicle>(`/vehicles/${id}/availability`, { isAvailable }),

  delete: (id: number) => api.delete(`/vehicles/${id}`),
};

// Rental API
export const rentalApi = {
  getAll: (status?: RentalStatus) =>
    api.get<Rental[]>("/rentals", { params: { status } }),

  getById: (id: number) => api.get<Rental>(`/rentals/${id}`),

  getActive: () => api.get<Rental[]>("/rentals/active"),

  getPending: () => api.get<Rental[]>("/rentals/pending"),

  getByCustomer: (customerId: number) =>
    api.get<Rental[]>(`/rentals/customer/${customerId}`),

  getByVehicle: (vehicleId: number) =>
    api.get<Rental[]>(`/rentals/vehicle/${vehicleId}`),

  create: (data: CreateRentalDto) => api.post<Rental>("/rentals", data),

  update: (id: number, data: UpdateRentalDto) =>
    api.patch<Rental>(`/rentals/${id}`, data),

  cancel: (id: number) => api.patch<Rental>(`/rentals/${id}/cancel`),

  activate: (id: number) => api.patch<Rental>(`/rentals/${id}/activate`),

  complete: (id: number) => api.patch<Rental>(`/rentals/${id}/complete`),

  delete: (id: number) => api.delete(`/rentals/${id}`),
};

export default api;
