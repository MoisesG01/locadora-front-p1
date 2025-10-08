import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Vehicle, CreateVehicleDto, UpdateVehicleDto } from "../../types";
import "../Customer/Modal.css";

interface VehicleModalProps {
  vehicle?: Vehicle | null;
  onClose: () => void;
  onSave: (data: CreateVehicleDto | UpdateVehicleDto) => void;
}

const VehicleModal: React.FC<VehicleModalProps> = ({
  vehicle,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<CreateVehicleDto | UpdateVehicleDto>(
    {
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      plate: "",
      dailyRate: 0,
      description: "",
      color: "",
      mileage: undefined,
      fuelType: "",
      transmission: "",
    }
  );

  useEffect(() => {
    if (vehicle) {
      setFormData({
        brand: vehicle.brand || "",
        model: vehicle.model || "",
        year: vehicle.year || new Date().getFullYear(),
        plate: vehicle.plate || "",
        dailyRate: vehicle.dailyRate || 0,
        description: vehicle.description || "",
        color: vehicle.color || "",
        mileage: vehicle.mileage || undefined,
        fuelType: vehicle.fuelType || "",
        transmission: vehicle.transmission || "",
      });
    } else {
      setFormData({
        brand: "",
        model: "",
        year: new Date().getFullYear(),
        plate: "",
        dailyRate: 0,
        description: "",
        color: "",
        mileage: undefined,
        fuelType: "",
        transmission: "",
      });
    }
  }, [vehicle]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "year" || name === "dailyRate" || name === "mileage"
          ? value === ""
            ? name === "dailyRate"
              ? 0
              : undefined
            : parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (
      !formData.brand ||
      !formData.model ||
      !formData.plate ||
      !formData.dailyRate
    ) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    // Garantir que os tipos numéricos estão corretos
    const dataToSave = {
      ...formData,
      year:
        typeof formData.year === "string"
          ? parseInt(formData.year)
          : formData.year,
      dailyRate:
        typeof formData.dailyRate === "string"
          ? parseFloat(formData.dailyRate)
          : formData.dailyRate,
      mileage: formData.mileage
        ? typeof formData.mileage === "string"
          ? parseFloat(formData.mileage)
          : formData.mileage
        : undefined,
    };

    console.log("Data types before save:", {
      year: typeof dataToSave.year,
      dailyRate: typeof dataToSave.dailyRate,
      mileage: typeof dataToSave.mileage,
    });

    onSave(dataToSave);
  };

  const formatPlate = (value: string) => {
    return value
      .replace(/[^A-Za-z0-9]/g, "")
      .replace(/([A-Za-z0-9]{3})([A-Za-z0-9])/, "$1-$2")
      .slice(0, 8)
      .toUpperCase();
  };

  const handlePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPlate(e.target.value);
    setFormData((prev) => ({ ...prev, plate: formattedValue }));
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{vehicle ? "Editar Veículo" : "Novo Veículo"}</h2>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Marca *</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Modelo *</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Ano *</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="form-select"
                required
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Placa *</label>
              <input
                type="text"
                name="plate"
                value={formData.plate}
                onChange={handlePlateChange}
                className="form-input"
                placeholder="ABC-1234"
                maxLength={8}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Valor da Diária *</label>
              <input
                type="number"
                name="dailyRate"
                value={formData.dailyRate}
                onChange={handleChange}
                className="form-input"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Cor</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Quilometragem</label>
              <input
                type="number"
                name="mileage"
                value={formData.mileage || ""}
                onChange={handleChange}
                className="form-input"
                min="0"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tipo de Combustível</label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Selecione</option>
                <option value="Gasolina">Gasolina</option>
                <option value="Etanol">Etanol</option>
                <option value="Flex">Flex</option>
                <option value="Diesel">Diesel</option>
                <option value="GNV">GNV</option>
                <option value="Elétrico">Elétrico</option>
                <option value="Híbrido">Híbrido</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Transmissão</label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Selecione</option>
                <option value="Manual">Manual</option>
                <option value="Automático">Automático</option>
                <option value="CVT">CVT</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Descrição</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input"
              rows={3}
              placeholder="Descrição adicional do veículo..."
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
              {vehicle ? "Atualizar" : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleModal;
