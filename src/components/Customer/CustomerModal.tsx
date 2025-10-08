import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Customer, CreateCustomerDto } from "../../types";
import "./Modal.css";

interface CustomerModalProps {
  customer?: Customer | null;
  onClose: () => void;
  onSave: (data: CreateCustomerDto) => void;
}

const CustomerModal: React.FC<CustomerModalProps> = ({
  customer,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<CreateCustomerDto>({
    name: "",
    cpf: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    birthDate: undefined,
    driverLicense: "",
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name,
        cpf: customer.cpf,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        state: customer.state,
        zipCode: customer.zipCode,
        birthDate: customer.birthDate,
        driverLicense: customer.driverLicense || "",
      });
    }
  }, [customer]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .slice(0, 14);
  };

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  };

  const formatCEP = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCPF(e.target.value);
    setFormData((prev) => ({ ...prev, cpf: formattedValue }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhone(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formattedValue }));
  };

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCEP(e.target.value);
    setFormData((prev) => ({ ...prev, zipCode: formattedValue }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{customer ? "Editar Cliente" : "Novo Cliente"}</h2>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Nome Completo *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">CPF *</label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleCPFChange}
                className="form-input"
                placeholder="000.000.000-00"
                maxLength={14}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Telefone *</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                className="form-input"
                placeholder="(00) 00000-0000"
                maxLength={15}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Data de Nascimento</label>
              <input
                type="date"
                name="birthDate"
                value={
                  formData.birthDate
                    ? new Date(formData.birthDate).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    birthDate: e.target.value
                      ? new Date(e.target.value)
                      : undefined,
                  }))
                }
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">CNH</label>
              <input
                type="text"
                name="driverLicense"
                value={formData.driverLicense}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Endereço *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">CEP *</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleCEPChange}
                className="form-input"
                placeholder="00000-000"
                maxLength={9}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Cidade *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Estado *</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Selecione</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {customer ? "Atualizar" : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerModal;
