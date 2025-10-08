import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Rental, CreateRentalDto, Customer, Vehicle } from "../../types";
import "../Customer/Modal.css";

interface RentalModalProps {
  rental?: Rental | null;
  customers: Customer[];
  vehicles: Vehicle[];
  onClose: () => void;
  onSave: (data: CreateRentalDto) => void;
}

const RentalModal: React.FC<RentalModalProps> = ({
  rental,
  customers,
  vehicles,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    vehicleId: 0,
    customerId: 0,
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    notes: "",
  });

  const [calculatedAmount, setCalculatedAmount] = useState<number>(0);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    if (rental) {
      setFormData({
        vehicleId: rental.vehicleId,
        customerId: rental.customerId,
        startDate: new Date(rental.startDate).toISOString().split("T")[0],
        endDate: new Date(rental.endDate).toISOString().split("T")[0],
        notes: rental.notes || "",
      });
      const vehicle = vehicles.find((v) => v.id === rental.vehicleId);
      if (vehicle) {
        setSelectedVehicle(vehicle);
      }
    }
  }, [rental, vehicles]);

  useEffect(() => {
    calculateAmount();
  }, [formData.startDate, formData.endDate, selectedVehicle]);

  const calculateAmount = () => {
    if (!formData.startDate || !formData.endDate || !selectedVehicle) {
      setCalculatedAmount(0);
      return;
    }

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      setCalculatedAmount(diffDays * selectedVehicle.dailyRate);
    } else {
      setCalculatedAmount(0);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "vehicleId") {
      const vehicle = vehicles.find((v) => v.id === parseInt(value));
      setSelectedVehicle(vehicle || null);
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "vehicleId" || name === "customerId" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.vehicleId &&
      formData.customerId &&
      formData.startDate &&
      formData.endDate
    ) {
      onSave({
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
      });
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getMinEndDate = () => {
    if (formData.startDate) {
      const startDate = new Date(formData.startDate);
      startDate.setDate(startDate.getDate() + 1);
      return startDate.toISOString().split("T")[0];
    }
    return "";
  };

  const getMaxStartDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{rental ? "Editar Locação" : "Nova Locação"}</h2>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Cliente *</label>
              <select
                name="customerId"
                value={formData.customerId}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value={0}>Selecione um cliente</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} - {customer.cpf}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Veículo *</label>
              <select
                name="vehicleId"
                value={formData.vehicleId}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value={0}>Selecione um veículo</option>
                {vehicles
                  .filter((v) => v.isAvailable)
                  .map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.brand} {vehicle.model} - {vehicle.plate} -{" "}
                      {formatCurrency(vehicle.dailyRate)}/dia
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Data de Início *</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="form-input"
                min={getMaxStartDate()}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Data de Fim *</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="form-input"
                min={getMinEndDate()}
                required
              />
            </div>
          </div>

          {selectedVehicle && formData.startDate && formData.endDate && (
            <div
              className="card mb-4"
              style={{ backgroundColor: "#f8fafc", padding: "16px" }}
            >
              <h3 className="text-lg font-semibold mb-2">Resumo da Locação</h3>
              <div className="grid grid-2 gap-4">
                <div>
                  <p>
                    <strong>Veículo:</strong> {selectedVehicle.brand}{" "}
                    {selectedVehicle.model}
                  </p>
                  <p>
                    <strong>Placa:</strong> {selectedVehicle.plate}
                  </p>
                  <p>
                    <strong>Valor da Diária:</strong>{" "}
                    {formatCurrency(selectedVehicle.dailyRate)}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Período:</strong> {formData.startDate} a{" "}
                    {formData.endDate}
                  </p>
                  <p>
                    <strong>Dias:</strong>{" "}
                    {Math.ceil(
                      (new Date(formData.endDate).getTime() -
                        new Date(formData.startDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}
                  </p>
                  <p>
                    <strong>Valor Total:</strong>{" "}
                    <span className="text-green-600 font-bold">
                      {formatCurrency(calculatedAmount)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Observações</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="form-input"
              rows={3}
              placeholder="Observações adicionais..."
            />
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
              {rental ? "Atualizar" : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RentalModal;
