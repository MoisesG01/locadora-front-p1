import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Vehicle } from "../../types";
import { rentalApi } from "../../services/api";
import "../Customer/Modal.css";

interface VehicleDetailsModalProps {
  vehicle: Vehicle;
  onClose: () => void;
}

interface RentalHistory {
  id: number;
  customer: {
    name: string;
    cpf: string;
  };
  startDate: string | Date;
  endDate: string | Date;
  totalAmount: number;
  status: string;
}

const VehicleDetailsModal: React.FC<VehicleDetailsModalProps> = ({
  vehicle,
  onClose,
}) => {
  const [rentalHistory, setRentalHistory] = useState<RentalHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRentalHistory();
  }, [vehicle.id]);

  const loadRentalHistory = async () => {
    try {
      setLoading(true);
      const response = await rentalApi.getByVehicle(vehicle.id);
      setRentalHistory(response.data);
    } catch (error) {
      console.error("Erro ao carregar histórico de locações:", error);
    } finally {
      setLoading(false);
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

  return (
    <div className="modal-overlay">
      <div className="modal modal-lg">
        <div className="modal-header">
          <h2>Detalhes do Veículo</h2>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="grid grid-2 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Informações do Veículo
              </h3>
              <div className="space-y-2">
                <p>
                  <strong>Marca:</strong> {vehicle.brand}
                </p>
                <p>
                  <strong>Modelo:</strong> {vehicle.model}
                </p>
                <p>
                  <strong>Ano:</strong> {vehicle.year}
                </p>
                <p>
                  <strong>Placa:</strong> {vehicle.plate}
                </p>
                <p>
                  <strong>Valor da Diária:</strong>{" "}
                  {formatCurrency(vehicle.dailyRate)}
                </p>
                {vehicle.color && (
                  <p>
                    <strong>Cor:</strong> {vehicle.color}
                  </p>
                )}
                {vehicle.mileage && (
                  <p>
                    <strong>Quilometragem:</strong>{" "}
                    {vehicle.mileage.toLocaleString("pt-BR")} km
                  </p>
                )}
                {vehicle.fuelType && (
                  <p>
                    <strong>Combustível:</strong> {vehicle.fuelType}
                  </p>
                )}
                {vehicle.transmission && (
                  <p>
                    <strong>Transmissão:</strong> {vehicle.transmission}
                  </p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Status e Informações
              </h3>
              <div className="space-y-2">
                <p>
                  <strong>Status:</strong>
                  <span
                    className={`status-badge ${
                      vehicle.isAvailable ? "status-active" : "status-cancelled"
                    }`}
                  >
                    {vehicle.isAvailable ? "Disponível" : "Indisponível"}
                  </span>
                </p>
                {vehicle.description && (
                  <div>
                    <strong>Descrição:</strong>
                    <p className="mt-1 text-gray-700">{vehicle.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">
              Histórico de Locações
            </h3>
            {loading ? (
              <p>Carregando histórico...</p>
            ) : rentalHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>CPF</th>
                      <th>Período</th>
                      <th>Valor Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rentalHistory.map((rental) => (
                      <tr key={rental.id}>
                        <td>{rental.customer.name}</td>
                        <td className="font-mono">{rental.customer.cpf}</td>
                        <td>
                          {formatDate(rental.startDate)} -{" "}
                          {formatDate(rental.endDate)}
                        </td>
                        <td>{formatCurrency(rental.totalAmount)}</td>
                        <td>
                          <span
                            className={`status-badge status-${rental.status}`}
                          >
                            {rental.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">Nenhuma locação encontrada.</p>
            )}
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <p>Veículo cadastrado em: {formatDate(vehicle.createdAt)}</p>
            <p>Última atualização: {formatDate(vehicle.updatedAt)}</p>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-primary">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsModal;
