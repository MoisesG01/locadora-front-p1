import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { rentalApi, customerApi, vehicleApi } from "../services/api";
import {
  Rental,
  CreateRentalDto,
  RentalStatus,
  Customer,
  Vehicle,
} from "../types";
import RentalModal from "../components/Rental/RentalModal";
import RentalDetailsModal from "../components/Rental/RentalDetailsModal";

const Rentals: React.FC = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<RentalStatus | "">("");
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);
  const [editingRental, setEditingRental] = useState<Rental | null>(null);

  useEffect(() => {
    loadData();
  }, [statusFilter]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [rentalsRes, customersRes, vehiclesRes] = await Promise.all([
        rentalApi.getAll(statusFilter || undefined),
        customerApi.getAll(),
        vehicleApi.getAvailable(),
      ]);

      setRentals(rentalsRes.data);
      setCustomers(customersRes.data);
      setVehicles(vehiclesRes.data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRental = async (data: CreateRentalDto) => {
    try {
      await rentalApi.create(data);
      loadData();
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao criar locação:", error);
    }
  };

  const handleUpdateRental = async (id: number, data: CreateRentalDto) => {
    try {
      await rentalApi.update(id, data);
      loadData();
      setShowModal(false);
      setEditingRental(null);
    } catch (error) {
      console.error("Erro ao atualizar locação:", error);
    }
  };

  const handleDeleteRental = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta locação?")) {
      try {
        await rentalApi.delete(id);
        loadData();
      } catch (error) {
        console.error("Erro ao excluir locação:", error);
      }
    }
  };

  const handleStatusChange = async (
    id: number,
    action: "cancel" | "activate" | "complete"
  ) => {
    try {
      switch (action) {
        case "cancel":
          await rentalApi.cancel(id);
          break;
        case "activate":
          await rentalApi.activate(id);
          break;
        case "complete":
          await rentalApi.complete(id);
          break;
      }
      loadData();
    } catch (error) {
      console.error("Erro ao alterar status da locação:", error);
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getStatusIcon = (status: RentalStatus) => {
    switch (status) {
      case RentalStatus.PENDING:
        return <Clock size={16} className="text-yellow-600" />;
      case RentalStatus.ACTIVE:
        return <CheckCircle size={16} className="text-green-600" />;
      case RentalStatus.COMPLETED:
        return <CheckCircle size={16} className="text-blue-600" />;
      case RentalStatus.CANCELLED:
        return <XCircle size={16} className="text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusActions = (rental: Rental) => {
    const actions = [];

    if (rental.status === RentalStatus.PENDING) {
      actions.push(
        <button
          key="activate"
          onClick={() => handleStatusChange(rental.id, "activate")}
          className="btn btn-sm btn-success"
          title="Ativar"
        >
          <CheckCircle size={16} />
        </button>
      );
    }

    if (rental.status === RentalStatus.ACTIVE) {
      actions.push(
        <button
          key="complete"
          onClick={() => handleStatusChange(rental.id, "complete")}
          className="btn btn-sm btn-primary"
          title="Finalizar"
        >
          <CheckCircle size={16} />
        </button>
      );
    }

    if (
      rental.status === RentalStatus.PENDING ||
      rental.status === RentalStatus.ACTIVE
    ) {
      actions.push(
        <button
          key="cancel"
          onClick={() => handleStatusChange(rental.id, "cancel")}
          className="btn btn-sm btn-danger"
          title="Cancelar"
        >
          <XCircle size={16} />
        </button>
      );
    }

    return actions;
  };

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Locações</h1>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={20} />
          Nova Locação
        </button>
      </div>

      <div className="card">
        <div className="flex gap-4 mb-4">
          <div className="form-group">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as RentalStatus | "")
              }
              className="form-select"
            >
              <option value="">Todos os status</option>
              <option value={RentalStatus.PENDING}>Pendente</option>
              <option value={RentalStatus.ACTIVE}>Ativa</option>
              <option value={RentalStatus.COMPLETED}>Finalizada</option>
              <option value={RentalStatus.CANCELLED}>Cancelada</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p>Carregando locações...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Veículo</th>
                  <th>Período</th>
                  <th>Dias</th>
                  <th>Valor Total</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {rentals.map((rental) => (
                  <tr key={rental.id}>
                    <td>
                      <div>
                        <p className="font-medium">{rental.customer.name}</p>
                        <p className="text-sm text-gray-600">
                          {rental.customer.cpf}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className="font-medium">
                          {rental.vehicle.brand} {rental.vehicle.model}
                        </p>
                        <p className="text-sm text-gray-600">
                          {rental.vehicle.plate}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className="text-sm">
                          {formatDate(rental.startDate)}
                        </p>
                        <p className="text-sm">{formatDate(rental.endDate)}</p>
                      </div>
                    </td>
                    <td>{rental.daysRented}</td>
                    <td className="font-semibold">
                      {formatCurrency(rental.totalAmount)}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(rental.status)}
                        <span
                          className={`status-badge status-${rental.status}`}
                        >
                          {rental.status}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedRental(rental);
                            setShowDetailsModal(true);
                          }}
                          className="btn btn-sm btn-secondary"
                          title="Ver detalhes"
                        >
                          <Eye size={16} />
                        </button>
                        {(rental.status === RentalStatus.PENDING ||
                          rental.status === RentalStatus.ACTIVE) && (
                          <button
                            onClick={() => {
                              setEditingRental(rental);
                              setShowModal(true);
                            }}
                            className="btn btn-sm btn-primary"
                            title="Editar"
                          >
                            <Edit size={16} />
                          </button>
                        )}
                        {getStatusActions(rental)}
                        <button
                          onClick={() => handleDeleteRental(rental.id)}
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

            {rentals.length === 0 && (
              <div className="text-center py-8 text-gray-600">
                <p>Nenhuma locação encontrada.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {showModal && (
        <RentalModal
          rental={editingRental}
          customers={customers}
          vehicles={vehicles}
          onClose={() => {
            setShowModal(false);
            setEditingRental(null);
          }}
          onSave={
            editingRental
              ? (data) => handleUpdateRental(editingRental.id, data)
              : handleCreateRental
          }
        />
      )}

      {showDetailsModal && selectedRental && (
        <RentalDetailsModal
          rental={selectedRental}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedRental(null);
          }}
        />
      )}
    </div>
  );
};

export default Rentals;
