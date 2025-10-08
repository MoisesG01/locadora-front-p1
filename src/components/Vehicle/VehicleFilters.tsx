import React, { useState } from "react";
import { Search, Filter, X, RotateCcw } from "lucide-react";
import { VehicleFilters } from "../../types";
import "./VehicleFilters.css";

interface VehicleFiltersProps {
  filters: VehicleFilters;
  onFiltersChange: (filters: VehicleFilters) => void;
  onClearFilters: () => void;
  searchTerm: string;
  onSearchChange: (search: string) => void;
}

const VehicleFiltersComponent: React.FC<VehicleFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  searchTerm,
  onSearchChange,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (
    key: keyof VehicleFilters,
    value: string | number | boolean | undefined
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value === "" ? undefined : value,
    });
  };

  const handleNumberFilterChange = (
    key: keyof VehicleFilters,
    value: string
  ) => {
    const numValue = value === "" ? undefined : parseFloat(value);
    onFiltersChange({
      ...filters,
      [key]: numValue,
    });
  };

  const hasActiveFilters =
    Object.values(filters).some(
      (value) => value !== undefined && value !== "" && value !== null
    ) || searchTerm !== "";

  return (
    <div className="filters-container">
      {/* Filtros Básicos */}
      <div className="filters-row">
        <div className="search-input-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Buscar por marca, modelo ou placa..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>

        <select
          value={
            filters.isAvailable === undefined
              ? "all"
              : filters.isAvailable
              ? "true"
              : "false"
          }
          onChange={(e) => {
            const value =
              e.target.value === "all" ? undefined : e.target.value === "true";
            handleFilterChange("isAvailable", value);
          }}
          className="filter-select"
        >
          <option value="all">Todos os veículos</option>
          <option value="true">Disponíveis</option>
          <option value="false">Indisponíveis</option>
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
              <label>Ano</label>
              <input
                type="number"
                placeholder="Ex: 2020"
                value={filters.year || ""}
                onChange={(e) =>
                  handleNumberFilterChange("year", e.target.value)
                }
                className="filter-input"
                min="1990"
                max={new Date().getFullYear() + 1}
              />
            </div>

            <div className="filter-group">
              <label>Cor</label>
              <input
                type="text"
                placeholder="Ex: Branco, Preto..."
                value={filters.color || ""}
                onChange={(e) => handleFilterChange("color", e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label>Tipo de Combustível</label>
              <select
                value={filters.fuelType || ""}
                onChange={(e) => handleFilterChange("fuelType", e.target.value)}
                className="filter-select"
              >
                <option value="">Todos</option>
                <option value="Gasolina">Gasolina</option>
                <option value="Etanol">Etanol</option>
                <option value="Flex">Flex</option>
                <option value="Diesel">Diesel</option>
                <option value="Elétrico">Elétrico</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Transmissão</label>
              <select
                value={filters.transmission || ""}
                onChange={(e) =>
                  handleFilterChange("transmission", e.target.value)
                }
                className="filter-select"
              >
                <option value="">Todas</option>
                <option value="Manual">Manual</option>
                <option value="Automática">Automática</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Preço Mínimo (R$)</label>
              <input
                type="number"
                placeholder="0"
                value={filters.minPrice || ""}
                onChange={(e) =>
                  handleNumberFilterChange("minPrice", e.target.value)
                }
                className="filter-input"
                min="0"
                step="0.01"
              />
            </div>

            <div className="filter-group">
              <label>Preço Máximo (R$)</label>
              <input
                type="number"
                placeholder="1000"
                value={filters.maxPrice || ""}
                onChange={(e) =>
                  handleNumberFilterChange("maxPrice", e.target.value)
                }
                className="filter-input"
                min="0"
                step="0.01"
              />
            </div>

            <div className="filter-group">
              <label>Quilometragem Mínima</label>
              <input
                type="number"
                placeholder="0"
                value={filters.minMileage || ""}
                onChange={(e) =>
                  handleNumberFilterChange("minMileage", e.target.value)
                }
                className="filter-input"
                min="0"
              />
            </div>

            <div className="filter-group">
              <label>Quilometragem Máxima</label>
              <input
                type="number"
                placeholder="100000"
                value={filters.maxMileage || ""}
                onChange={(e) =>
                  handleNumberFilterChange("maxMileage", e.target.value)
                }
                className="filter-input"
                min="0"
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
          {searchTerm && (
            <span className="active-filter-tag">
              Busca: "{searchTerm}"
              <button
                onClick={() => onSearchChange("")}
                className="remove-filter-btn"
              >
                <X size={12} />
              </button>
            </span>
          )}
          {Object.entries(filters).map(([key, value]) => {
            if (value === undefined || value === "" || value === null)
              return null;

            let displayValue = String(value);
            if (key === "isAvailable") {
              displayValue = value ? "Disponíveis" : "Indisponíveis";
            } else if (key === "minPrice" || key === "maxPrice") {
              displayValue = `R$ ${value}`;
            } else if (key === "minMileage" || key === "maxMileage") {
              displayValue = `${value} km`;
            } else if (key === "year") {
              displayValue = `Ano: ${value}`;
            } else if (key === "color") {
              displayValue = `Cor: ${value}`;
            } else if (key === "fuelType") {
              displayValue = `Combustível: ${value}`;
            } else if (key === "transmission") {
              displayValue = `Transmissão: ${value}`;
            }

            return (
              <span key={key} className="active-filter-tag">
                {displayValue}
                <button
                  onClick={() =>
                    handleFilterChange(key as keyof VehicleFilters, undefined)
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

export default VehicleFiltersComponent;
