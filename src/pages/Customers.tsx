import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { customerApi } from "../services/api";
import { Customer, CreateCustomerDto } from "../types";
import CustomerModal from "../components/Customer/CustomerModal";
import CustomerDetailsModal from "../components/Customer/CustomerDetailsModal";
import CustomerFiltersComponent from "../components/Customer/CustomerFilters";

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<{
    state?: string;
    city?: string;
    hasRentals?: boolean;
  }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    loadCustomers();
  }, [filters, searchTerm]);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const response = await customerApi.getAll();
      let filteredCustomers = response.data;

      // Aplicar busca geral
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filteredCustomers = filteredCustomers.filter(
          (customer) =>
            customer.name.toLowerCase().includes(searchLower) ||
            customer.cpf.includes(searchTerm) ||
            customer.email.toLowerCase().includes(searchLower)
        );
      }
      if (filters.state) {
        filteredCustomers = filteredCustomers.filter(
          (customer) => customer.state === filters.state
        );
      }
      if (filters.city) {
        filteredCustomers = filteredCustomers.filter((customer) =>
          customer.city.toLowerCase().includes(filters.city!.toLowerCase())
        );
      }

      setCustomers(filteredCustomers);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCustomer = async (data: CreateCustomerDto) => {
    try {
      await customerApi.create(data);
      loadCustomers();
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
    }
  };

  const handleUpdateCustomer = async (id: number, data: CreateCustomerDto) => {
    try {
      await customerApi.update(id, data);
      loadCustomers();
      setShowModal(false);
      setEditingCustomer(null);
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
    }
  };

  const handleDeleteCustomer = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      try {
        await customerApi.delete(id);
        loadCustomers();
      } catch (error) {
        console.error("Erro ao excluir cliente:", error);
      }
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchTerm("");
  };

  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatPhone = (phone: string) => {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={20} />
          Novo Cliente
        </button>
      </div>

      <CustomerFiltersComponent
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {loading ? (
        <div className="text-center py-8">
          <p>Carregando clientes...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Cidade</th>
                <th>Data de Cadastro</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="font-medium">{customer.name}</td>
                  <td>{formatCPF(customer.cpf)}</td>
                  <td>{customer.email}</td>
                  <td>{formatPhone(customer.phone)}</td>
                  <td>
                    {customer.city}/{customer.state}
                  </td>
                  <td>{formatDate(customer.createdAt)}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setShowDetailsModal(true);
                        }}
                        className="btn btn-sm btn-secondary"
                        title="Ver detalhes"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setEditingCustomer(customer);
                          setShowModal(true);
                        }}
                        className="btn btn-sm btn-primary"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteCustomer(customer.id)}
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

          {customers.length === 0 && (
            <div className="text-center py-8 text-gray-600">
              <p>Nenhum cliente encontrado.</p>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <CustomerModal
          customer={editingCustomer}
          onClose={() => {
            setShowModal(false);
            setEditingCustomer(null);
          }}
          onSave={
            editingCustomer
              ? (data) => handleUpdateCustomer(editingCustomer.id, data)
              : handleCreateCustomer
          }
        />
      )}

      {showDetailsModal && selectedCustomer && (
        <CustomerDetailsModal
          customer={selectedCustomer}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedCustomer(null);
          }}
        />
      )}
    </div>
  );
};

export default Customers;
