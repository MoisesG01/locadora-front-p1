import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Eye, Car } from "lucide-react";
import { vehicleApi } from "../services/api";
import {
  Vehicle,
  CreateVehicleDto,
  UpdateVehicleDto,
  VehicleFilters,
} from "../types";
import VehicleModal from "../components/Vehicle/VehicleModal";
import VehicleDetailsModal from "../components/Vehicle/VehicleDetailsModal";
import VehicleFiltersComponent from "../components/Vehicle/VehicleFilters";

const Vehicles: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<VehicleFilters>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    loadVehicles();
  }, [filters, searchTerm]);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      const response = await vehicleApi.getAll(filters);
      let filteredVehicles = response.data;

      // Aplicar busca geral
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filteredVehicles = filteredVehicles.filter(
          (vehicle) =>
            vehicle.brand.toLowerCase().includes(searchLower) ||
            vehicle.model.toLowerCase().includes(searchLower) ||
            vehicle.plate.toLowerCase().includes(searchLower)
        );
      }

      // Aplicar filtros adicionais no frontend
      if (filters.year) {
        filteredVehicles = filteredVehicles.filter(
          (v) => v.year === filters.year
        );
      }
      if (filters.fuelType) {
        filteredVehicles = filteredVehicles.filter(
          (v) => v.fuelType === filters.fuelType
        );
      }
      if (filters.transmission) {
        filteredVehicles = filteredVehicles.filter(
          (v) => v.transmission === filters.transmission
        );
      }
      if (filters.color) {
        filteredVehicles = filteredVehicles.filter((v) =>
          v.color?.toLowerCase().includes(filters.color!.toLowerCase())
        );
      }
      if (filters.minMileage) {
        filteredVehicles = filteredVehicles.filter(
          (v) => (v.mileage || 0) >= filters.minMileage!
        );
      }
      if (filters.maxMileage) {
        filteredVehicles = filteredVehicles.filter(
          (v) => (v.mileage || 0) <= filters.maxMileage!
        );
      }

      setVehicles(filteredVehicles);
    } catch (error) {
      console.error("Erro ao carregar veículos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVehicle = async (data: CreateVehicleDto) => {
    try {
      await vehicleApi.create(data);
      loadVehicles();
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao criar veículo:", error);
    }
  };

  const handleUpdateVehicle = async (id: number, data: UpdateVehicleDto) => {
    try {
      await vehicleApi.update(id, data);
      loadVehicles();
      setShowModal(false);
      setEditingVehicle(null);
    } catch (error) {
      console.error("Erro ao atualizar veículo:", error);
      alert("Erro ao atualizar veículo. Tente novamente.");
    }
  };

  const handleDeleteVehicle = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este veículo?")) {
      try {
        await vehicleApi.delete(id);
        loadVehicles();
      } catch (error) {
        console.error("Erro ao excluir veículo:", error);
      }
    }
  };

  const handleToggleAvailability = async (id: number, isAvailable: boolean) => {
    try {
      await vehicleApi.updateAvailability(id, !isAvailable);
      loadVehicles();
    } catch (error) {
      console.error("Erro ao atualizar disponibilidade:", error);
    }
  };

  const handleFiltersChange = (newFilters: VehicleFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchTerm("");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Veículos</h1>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={20} />
          Novo Veículo
        </button>
      </div>

      <VehicleFiltersComponent
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {loading ? (
        <div className="text-center py-8">
          <p>Carregando veículos...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Veículo</th>
                <th>Placa</th>
                <th>Ano</th>
                <th>Valor Diária</th>
                <th>Status</th>
                <th>Data de Cadastro</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <Car size={20} className="text-gray-600" />
                      <div>
                        <p className="font-medium">
                          {vehicle.brand} {vehicle.model}
                        </p>
                        {vehicle.color && (
                          <p className="text-sm text-gray-600">
                            {vehicle.color}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="font-mono">{vehicle.plate}</td>
                  <td>{vehicle.year}</td>
                  <td className="font-semibold">
                    {formatCurrency(vehicle.dailyRate)}
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        handleToggleAvailability(
                          vehicle.id,
                          vehicle.isAvailable
                        )
                      }
                      className={`status-badge ${
                        vehicle.isAvailable
                          ? "status-active"
                          : "status-cancelled"
                      }`}
                    >
                      {vehicle.isAvailable ? "Disponível" : "Indisponível"}
                    </button>
                  </td>
                  <td>{formatDate(vehicle.createdAt)}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedVehicle(vehicle);
                          setShowDetailsModal(true);
                        }}
                        className="btn btn-sm btn-secondary"
                        title="Ver detalhes"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setEditingVehicle(vehicle);
                          setShowModal(true);
                        }}
                        className="btn btn-sm btn-primary"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteVehicle(vehicle.id)}
                        className="btn btn-sm btn-danger"
                        title="Excluir"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {vehicles.length === 0 && (
            <div className="text-center py-8 text-gray-600">
              <p>Nenhum veículo encontrado.</p>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <VehicleModal
          vehicle={editingVehicle}
          onClose={() => {
            setShowModal(false);
            setEditingVehicle(null);
          }}
          onSave={
            editingVehicle
              ? (data) =>
                  handleUpdateVehicle(
                    editingVehicle.id,
                    data as UpdateVehicleDto
                  )
              : (data) => handleCreateVehicle(data as CreateVehicleDto)
          }
        />
      )}

      {showDetailsModal && selectedVehicle && (
        <VehicleDetailsModal
          vehicle={selectedVehicle}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedVehicle(null);
          }}
        />
      )}
    </div>
  );
};

export default Vehicles;
