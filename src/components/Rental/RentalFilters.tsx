import React, { useState } from "react";
import { Search, Filter, X, RotateCcw } from "lucide-react";
import { RentalStatus } from "../../types";
import "./RentalFilters.css";

interface RentalFilters {
  search?: string;
  status?: RentalStatus;
  startDate?: string;
  endDate?: string;
  minValue?: number;
  maxValue?: number;
  customerId?: number;
  vehicleId?: number;
}

interface RentalFiltersProps {
  filters: RentalFilters;
  onFiltersChange: (filters: RentalFilters) => void;
  onClearFilters: () => void;
  customers?: Array<{ id: number; name: string; cpf: string }>;
  vehicles?: Array<{ id: number; brand: string; model: string; plate: string }>;
}

const RentalFiltersComponent: React.FC<RentalFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  customers = [],
  vehicles = [],
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (
    key: keyof RentalFilters,
    value: string | number | RentalStatus | undefined
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value === "" ? undefined : value,
    });
  };

  const handleNumberFilterChange = (
    key: keyof RentalFilters,
    value: string
  ) => {
    const numValue = value === "" ? undefined : parseFloat(value);
    onFiltersChange({
      ...filters,
      [key]: numValue,
    });
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== "" && value !== null
  );

  const statusOptions = [
    { value: RentalStatus.PENDING, label: "Pendente" },
    { value: RentalStatus.ACTIVE, label: "Ativa" },
    { value: RentalStatus.COMPLETED, label: "Finalizada" },
    { value: RentalStatus.CANCELLED, label: "Cancelada" },
  ];

  return (
    <div className="filters-container">
      {/* Filtros Básicos */}
      <div className="filters-row">
        <div className="search-input-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Buscar por cliente ou veículo..."
            value={filters.search || ""}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="search-input"
          />
        </div>

        <select
          value={filters.status || ""}
          onChange={(e) =>
            handleFilterChange("status", e.target.value as RentalStatus)
          }
          className="filter-select"
        >
          <option value="">Todos os status</option>
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`filter-toggle-btn ${showAdvanced ? "active" : ""}`}
        >
          <Filter size={18} />
          Filtros Avançados
        </button>

        {hasActiveFilters && (
          <button onClick={onClearFilters} className="clear-filters-btn">
            <X size={18} />
            Limpar Filtros
          </button>
        )}
      </div>

      {/* Filtros Avançados */}
      {showAdvanced && (
        <div className="advanced-filters">
          <div className="filters-grid">
            <div className="filter-group">
              <label>Cliente</label>
              <select
                value={filters.customerId || ""}
                onChange={(e) =>
                  handleNumberFilterChange("customerId", e.target.value)
                }
                className="filter-select"
              >
                <option value="">Todos os clientes</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} ({customer.cpf})
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Veículo</label>
              <select
                value={filters.vehicleId || ""}
                onChange={(e) =>
                  handleNumberFilterChange("vehicleId", e.target.value)
                }
                className="filter-select"
              >
                <option value="">Todos os veículos</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.brand} {vehicle.model} ({vehicle.plate})
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Status</label>
              <select
                value={filters.status || ""}
                onChange={(e) =>
                  handleFilterChange("status", e.target.value as RentalStatus)
                }
                className="filter-select"
              >
                <option value="">Todos os status</option>
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Data de Início</label>
              <input
                type="date"
                value={filters.startDate || ""}
                onChange={(e) =>
                  handleFilterChange("startDate", e.target.value)
                }
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label>Data de Fim</label>
              <input
                type="date"
                value={filters.endDate || ""}
                onChange={(e) => handleFilterChange("endDate", e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label>Valor Mínimo (R$)</label>
              <input
                type="number"
                placeholder="0"
                value={filters.minValue || ""}
                onChange={(e) =>
                  handleNumberFilterChange("minValue", e.target.value)
                }
                className="filter-input"
                min="0"
                step="0.01"
              />
            </div>

            <div className="filter-group">
              <label>Valor Máximo (R$)</label>
              <input
                type="number"
                placeholder="10000"
                value={filters.maxValue || ""}
                onChange={(e) =>
                  handleNumberFilterChange("maxValue", e.target.value)
                }
                className="filter-input"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="filters-actions">
            <button onClick={onClearFilters} className="btn btn-secondary">
              <RotateCcw size={18} />
              Limpar Todos os Filtros
            </button>
          </div>
        </div>
      )}

      {/* Indicador de Filtros Ativos */}
      {hasActiveFilters && (
        <div className="active-filters">
          <span className="active-filters-label">Filtros ativos:</span>
          {Object.entries(filters).map(([key, value]) => {
            if (value === undefined || value === "" || value === null)
              return null;

            let displayValue = String(value);
            if (key === "status") {
              const statusOption = statusOptions.find(
                (opt) => opt.value === value
              );
              displayValue = statusOption?.label || String(value);
            } else if (key === "minValue" || key === "maxValue") {
              displayValue = `R$ ${value}`;
            } else if (key === "customerId") {
              const customer = customers.find((c) => c.id === value);
              displayValue = customer ? customer.name : `ID: ${value}`;
            } else if (key === "vehicleId") {
              const vehicle = vehicles.find((v) => v.id === value);
              displayValue = vehicle
                ? `${vehicle.brand} ${vehicle.model}`
                : `ID: ${value}`;
            }

            return (
              <span key={key} className="active-filter-tag">
                {key}: {displayValue}
                <button
                  onClick={() =>
                    handleFilterChange(key as keyof RentalFilters, undefined)
                  }
                  className="remove-filter-btn"
                >
                  <X size={12} />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RentalFiltersComponent;
