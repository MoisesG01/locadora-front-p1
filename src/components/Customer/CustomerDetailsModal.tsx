import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Customer } from "../../types";
import { customerApi } from "../../services/api";
import "./Modal.css";

interface CustomerDetailsModalProps {
  customer: Customer;
  onClose: () => void;
}

interface RentalHistory {
  id: number;
  vehicle: {
    brand: string;
    model: string;
    plate: string;
  };
  startDate: string | Date;
  endDate: string | Date;
  totalAmount: number;
  status: string;
}

const CustomerDetailsModal: React.FC<CustomerDetailsModalProps> = ({
  customer,
  onClose,
}) => {
  const [rentalHistory, setRentalHistory] = useState<RentalHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRentalHistory();
  }, [customer.id]);

  const loadRentalHistory = async () => {
    try {
      setLoading(true);
      const response = await customerApi.getRentalHistory(customer.id);
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

  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatPhone = (phone: string) => {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  return (
    <div className="modal-overlay">
      <div className="modal modal-lg">
        <div className="modal-header">
          <h2>Detalhes do Cliente</h2>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="grid grid-2 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Informações Pessoais
              </h3>
              <div className="space-y-2">
                <p>
                  <strong>Nome:</strong> {customer.name}
                </p>
                <p>
                  <strong>CPF:</strong> {formatCPF(customer.cpf)}
                </p>
                <p>
                  <strong>Email:</strong> {customer.email}
                </p>
                <p>
                  <strong>Telefone:</strong> {formatPhone(customer.phone)}
                </p>
                {customer.birthDate && (
                  <p>
                    <strong>Data de Nascimento:</strong>{" "}
                    {formatDate(customer.birthDate)}
                  </p>
                )}
                {customer.driverLicense && (
                  <p>
                    <strong>CNH:</strong> {customer.driverLicense}
                  </p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Endereço</h3>
              <div className="space-y-2">
                <p>
                  <strong>Endereço:</strong> {customer.address}
                </p>
                <p>
                  <strong>Cidade:</strong> {customer.city}
                </p>
                <p>
                  <strong>Estado:</strong> {customer.state}
                </p>
                <p>
                  <strong>CEP:</strong> {customer.zipCode}
                </p>
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
                      <th>Veículo</th>
                      <th>Placa</th>
                      <th>Período</th>
                      <th>Valor Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rentalHistory.map((rental) => (
                      <tr key={rental.id}>
                        <td>
                          {rental.vehicle.brand} {rental.vehicle.model}
                        </td>
                        <td>{rental.vehicle.plate}</td>
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
            <p>Cliente desde: {formatDate(customer.createdAt)}</p>
            <p>Última atualização: {formatDate(customer.updatedAt)}</p>
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

export default CustomerDetailsModal;
