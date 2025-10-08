import React from "react";
import { X, Calendar, User, Car, DollarSign } from "lucide-react";
import { Rental } from "../../types";
import "../Customer/Modal.css";

interface RentalDetailsModalProps {
  rental: Rental;
  onClose: () => void;
}

const RentalDetailsModal: React.FC<RentalDetailsModalProps> = ({
  rental,
  onClose,
}) => {
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "active":
        return "text-green-600 bg-green-100";
      case "completed":
        return "text-blue-600 bg-blue-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal modal-lg">
        <div className="modal-header">
          <h2>Detalhes da Locação</h2>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="grid grid-2 mb-6">
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <User className="text-blue-600" size={24} />
                <h3 className="text-lg font-semibold">Cliente</h3>
              </div>
              <div className="space-y-2">
                <p>
                  <strong>Nome:</strong> {rental.customer.name}
                </p>
                <p>
                  <strong>CPF:</strong> {formatCPF(rental.customer.cpf)}
                </p>
                <p>
                  <strong>Email:</strong> {rental.customer.email}
                </p>
                <p>
                  <strong>Telefone:</strong> {rental.customer.phone}
                </p>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <Car className="text-green-600" size={24} />
                <h3 className="text-lg font-semibold">Veículo</h3>
              </div>
              <div className="space-y-2">
                <p>
                  <strong>Marca/Modelo:</strong> {rental.vehicle.brand}{" "}
                  {rental.vehicle.model}
                </p>
                <p>
                  <strong>Placa:</strong> {rental.vehicle.plate}
                </p>
                <p>
                  <strong>Ano:</strong> {rental.vehicle.year}
                </p>
                <p>
                  <strong>Valor da Diária:</strong>{" "}
                  {formatCurrency(rental.vehicle.dailyRate)}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-2 mb-6">
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="text-purple-600" size={24} />
                <h3 className="text-lg font-semibold">Período</h3>
              </div>
              <div className="space-y-2">
                <p>
                  <strong>Data de Início:</strong>{" "}
                  {formatDate(rental.startDate)}
                </p>
                <p>
                  <strong>Data de Fim:</strong> {formatDate(rental.endDate)}
                </p>
                <p>
                  <strong>Dias de Locação:</strong> {rental.daysRented}
                </p>
                <p>
                  <strong>Status:</strong>
                  <span
                    className={`ml-2 px-2 py-1 rounded text-sm font-medium ${getStatusColor(
                      rental.status
                    )}`}
                  >
                    {rental.status}
                  </span>
                </p>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="text-yellow-600" size={24} />
                <h3 className="text-lg font-semibold">Valores</h3>
              </div>
              <div className="space-y-2">
                <p>
                  <strong>Valor da Diária:</strong>{" "}
                  {formatCurrency(rental.vehicle.dailyRate)}
                </p>
                <p>
                  <strong>Total de Dias:</strong> {rental.daysRented}
                </p>
                <p>
                  <strong>Valor Total:</strong>
                  <span className="ml-2 text-xl font-bold text-green-600">
                    {formatCurrency(rental.totalAmount)}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {rental.notes && (
            <div className="card mb-6">
              <h3 className="text-lg font-semibold mb-4">Observações</h3>
              <p className="text-gray-700">{rental.notes}</p>
            </div>
          )}

          <div className="flex justify-between text-sm text-gray-600">
            <p>Locação criada em: {formatDate(rental.createdAt)}</p>
            <p>Última atualização: {formatDate(rental.updatedAt)}</p>
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

export default RentalDetailsModal;
