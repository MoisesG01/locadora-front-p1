import React, { useState } from "react";
import { Search, Filter, X, RotateCcw } from "lucide-react";
import "./CustomerFilters.css";

interface CustomerFilters {
  search?: string;
  state?: string;
  city?: string;
  hasRentals?: boolean;
}

interface CustomerFiltersProps {
  filters: CustomerFilters;
  onFiltersChange: (filters: CustomerFilters) => void;
  onClearFilters: () => void;
  searchTerm: string;
  onSearchChange: (search: string) => void;
}

const CustomerFiltersComponent: React.FC<CustomerFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  searchTerm,
  onSearchChange,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (
    key: keyof CustomerFilters,
    value: string | boolean | undefined
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value === "" ? undefined : value,
    });
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== "" && value !== null
  );

  const brazilianStates = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  return (
    <div className="filters-container">
      {/* Filtros Básicos */}
      <div className="filters-row">
        <div className="search-input-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Buscar por nome, CPF ou email..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>

        <select
          value={filters.state || ""}
          onChange={(e) => handleFilterChange("state", e.target.value)}
          className="filter-select"
        >
          <option value="">Todos os estados</option>
          {brazilianStates.map((state) => (
            <option key={state} value={state}>
              {state}
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
              <label>Nome</label>
              <input
                type="text"
                placeholder="Nome completo..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label>Estado</label>
              <select
                value={filters.state || ""}
                onChange={(e) => handleFilterChange("state", e.target.value)}
                className="filter-select"
              >
                <option value="">Todos os estados</option>
                {brazilianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Cidade</label>
              <input
                type="text"
                placeholder="Nome da cidade..."
                value={filters.city || ""}
                onChange={(e) => handleFilterChange("city", e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label>Status de Locação</label>
              <select
                value={
                  filters.hasRentals === undefined
                    ? ""
                    : filters.hasRentals
                    ? "true"
                    : "false"
                }
                onChange={(e) => {
                  const value =
                    e.target.value === ""
                      ? undefined
                      : e.target.value === "true";
                  handleFilterChange("hasRentals", value);
                }}
                className="filter-select"
              >
                <option value="">Todos os clientes</option>
                <option value="true">Com locações</option>
                <option value="false">Sem locações</option>
              </select>
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
            if (key === "hasRentals") {
              displayValue = value ? "Com locações" : "Sem locações";
            }

            return (
              <span key={key} className="active-filter-tag">
                {key}: {displayValue}
                <button
                  onClick={() =>
                    handleFilterChange(key as keyof CustomerFilters, undefined)
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

export default CustomerFiltersComponent;
