import React, { useState, useEffect } from "react";
import { User, Car, Calendar, Edit3, LogOut } from "lucide-react";
import { customerApi, rentalApi } from "../services/api";
import { Customer, Rental } from "../types";
import CustomerModal from "../components/Customer/CustomerModal";

const CustomerArea: React.FC = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedCpf = localStorage.getItem("customerCpf");
    if (savedCpf) {
      setCpf(savedCpf);
      loadCustomerData(savedCpf);
    }
  }, []);

  const loadCustomerData = async (customerCpf: string) => {
    try {
      setLoading(true);
      const customerRes = await customerApi.getByCpf(customerCpf);
      setCustomer(customerRes.data);

      // Carregar locações do cliente
      const rentalsRes = await rentalApi.getByCustomer(customerRes.data.id);
      setRentals(rentalsRes.data);
    } catch (error) {
      console.error("Erro ao carregar dados do cliente:", error);
      setError("Cliente não encontrado. Verifique o CPF digitado.");
      setCustomer(null);
      setRentals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCpfSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cpf) {
      setError(null);
      localStorage.setItem("customerCpf", cpf);
      loadCustomerData(cpf);
    }
  };

  const handleUpdateCustomer = async (data: any) => {
    if (customer) {
      try {
        await customerApi.update(customer.id, data);
        loadCustomerData(customer.cpf);
        setShowEditModal(false);
      } catch (error) {
        console.error("Erro ao atualizar cliente:", error);
      }
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

  const handleLogout = () => {
    if (
      window.confirm("Deseja sair da área do cliente e tentar com outro CPF?")
    ) {
      setCustomer(null);
      setRentals([]);
      setCpf("");
      setError(null);
      localStorage.removeItem("customerCpf");
    }
  };

  if (!customer) {
    return (
      <div className="container">
        <div className="min-h-screen flex items-center justify-center">
          <div className="card max-w-md w-full">
            <div className="text-center mb-6">
              <User className="mx-auto mb-4 text-blue-600" size={48} />
              <h1 className="text-2xl font-bold">Área do Cliente</h1>
              <p className="text-gray-600 mt-2">
                Digite seu CPF para acessar suas informações
              </p>
            </div>

            <form onSubmit={handleCpfSubmit}>
              <div className="form-group">
                <label className="form-label">CPF</label>
                <input
                  type="text"
                  value={cpf}
                  onChange={(e) =>
                    setCpf(
                      e.target.value
                        .replace(/\D/g, "")
                        .replace(/(\d{3})(\d)/, "$1.$2")
                        .replace(/(\d{3})(\d)/, "$1.$2")
                        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
                    )
                  }
                  className="form-input"
                  placeholder="000.000.000-00"
                  maxLength={14}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Acessar Área do Cliente
              </button>
              {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="min-h-screen py-8">
        {/* Header */}
        <div className="card mb-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <User className="text-blue-600" size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{customer.name}</h1>
                <p className="text-gray-600">{formatCPF(customer.cpf)}</p>
                <p className="text-sm text-gray-500">
                  Cliente desde {formatDate(customer.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleLogout} className="btn btn-secondary">
                <LogOut size={20} />
                Sair
              </button>
              <button
                onClick={() => setShowEditModal(true)}
                className="btn btn-primary"
              >
                <Edit3 size={20} />
                Editar Dados
              </button>
            </div>
          </div>
        </div>

        {/* Informações Pessoais */}
        <div className="grid grid-2 gap-6 mb-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="text-blue-600" size={20} />
              Informações Pessoais
            </h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">Email:</span>
                <p className="font-medium">{customer.email}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Telefone:</span>
                <p className="font-medium">{formatPhone(customer.phone)}</p>
              </div>
              {customer.birthDate && (
                <div>
                  <span className="text-sm text-gray-600">
                    Data de Nascimento:
                  </span>
                  <p className="font-medium">
                    {formatDate(customer.birthDate)}
                  </p>
                </div>
              )}
              {customer.driverLicense && (
                <div>
                  <span className="text-sm text-gray-600">CNH:</span>
                  <p className="font-medium">{customer.driverLicense}</p>
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Car className="text-green-600" size={20} />
              Endereço
            </h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">Endereço:</span>
                <p className="font-medium">{customer.address}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Cidade/Estado:</span>
                <p className="font-medium">
                  {customer.city}/{customer.state}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600">CEP:</span>
                <p className="font-medium">{customer.zipCode}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Histórico de Locações */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Calendar className="text-purple-600" size={20} />
            Histórico de Locações
          </h2>

          {loading ? (
            <div className="text-center py-8">
              <p>Carregando locações...</p>
            </div>
          ) : rentals.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Veículo</th>
                    <th>Placa</th>
                    <th>Período</th>
                    <th>Dias</th>
                    <th>Valor Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rentals.map((rental) => (
                    <tr key={rental.id}>
                      <td>
                        <div>
                          <p className="font-medium">
                            {rental.vehicle.brand} {rental.vehicle.model}
                          </p>
                          <p className="text-sm text-gray-600">
                            {rental.vehicle.year}
                          </p>
                        </div>
                      </td>
                      <td className="font-mono">{rental.vehicle.plate}</td>
                      <td>
                        <div>
                          <p className="text-sm">
                            {formatDate(rental.startDate)}
                          </p>
                          <p className="text-sm">
                            {formatDate(rental.endDate)}
                          </p>
                        </div>
                      </td>
                      <td>{rental.daysRented}</td>
                      <td className="font-semibold">
                        {formatCurrency(rental.totalAmount)}
                      </td>
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
            <div className="text-center py-8 text-gray-600">
              <Calendar className="mx-auto mb-4 text-gray-400" size={48} />
              <p>Nenhuma locação encontrada.</p>
              <p className="text-sm mt-2">
                Suas locações aparecerão aqui quando você fizer uma reserva.
              </p>
            </div>
          )}
        </div>

        {/* Estatísticas */}
        {rentals.length > 0 && (
          <div className="grid grid-3 gap-6 mt-6">
            <div className="card text-center">
              <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-3">
                <Calendar className="text-blue-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-blue-600">
                {rentals.length}
              </h3>
              <p className="text-sm text-gray-600">Total de Locações</p>
            </div>

            <div className="card text-center">
              <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-3">
                <Car className="text-green-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-green-600">
                {rentals.filter((r) => r.status === "completed").length}
              </h3>
              <p className="text-sm text-gray-600">Locações Finalizadas</p>
            </div>

            <div className="card text-center">
              <div className="p-3 bg-purple-100 rounded-lg w-fit mx-auto mb-3">
                <Calendar className="text-purple-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-purple-600">
                {formatCurrency(
                  rentals
                    .filter((r) => r.status === "completed")
                    .reduce((sum, r) => sum + r.totalAmount, 0)
                )}
              </h3>
              <p className="text-sm text-gray-600">Valor Total Gasto</p>
            </div>
          </div>
        )}
      </div>

      {showEditModal && (
        <CustomerModal
          customer={customer}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdateCustomer}
        />
      )}
    </div>
  );
};

export default CustomerArea;
