import React, { useEffect, useState } from "react";
import { Users, Car, Calendar, DollarSign } from "lucide-react";
import { customerApi, vehicleApi, rentalApi } from "../services/api";
import { RentalStatus } from "../types";

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalVehicles: 0,
    totalRentals: 0,
    activeRentals: 0,
    revenue: 0,
  });

  const [recentRentals, setRecentRentals] = useState<any[]>([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [customersRes, vehiclesRes, rentalsRes, activeRentalsRes] =
          await Promise.all([
            customerApi.getAll(),
            vehicleApi.getAll(),
            rentalApi.getAll(),
            rentalApi.getActive(),
          ]);

        const customers = customersRes.data;
        const vehicles = vehiclesRes.data;
        const rentals = rentalsRes.data;
        const activeRentals = activeRentalsRes.data;

        const revenue = rentals
          .filter((rental) => rental.status === RentalStatus.COMPLETED)
          .reduce((sum, rental) => sum + rental.totalAmount, 0);

        setStats({
          totalCustomers: customers.length,
          totalVehicles: vehicles.length,
          totalRentals: rentals.length,
          activeRentals: activeRentals.length,
          revenue,
        });

        setRecentRentals(rentals.slice(0, 5));
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
      }
    };

    loadDashboardData();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-4 mb-6">
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="text-sm text-gray-600">Total de Clientes</h3>
              <p className="text-2xl font-bold">{stats.totalCustomers}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Car className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="text-sm text-gray-600">Total de Veículos</h3>
              <p className="text-2xl font-bold">{stats.totalVehicles}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Calendar className="text-yellow-600" size={24} />
            </div>
            <div>
              <h3 className="text-sm text-gray-600">Locações Ativas</h3>
              <p className="text-2xl font-bold">{stats.activeRentals}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="text-purple-600" size={24} />
            </div>
            <div>
              <h3 className="text-sm text-gray-600">Receita Total</h3>
              <p className="text-2xl font-bold">
                {formatCurrency(stats.revenue)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Locações Recentes</h2>
          {recentRentals.length > 0 ? (
            <div className="space-y-3">
              {recentRentals.map((rental) => (
                <div
                  key={rental.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded"
                >
                  <div>
                    <p className="font-medium">
                      {rental.customer.name} - {rental.vehicle.brand}{" "}
                      {rental.vehicle.model}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatDate(rental.startDate)} -{" "}
                      {formatDate(rental.endDate)}
                    </p>
                  </div>
                  <span className={`status-badge status-${rental.status}`}>
                    {rental.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Nenhuma locação encontrada.</p>
          )}
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Resumo</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total de Locações:</span>
              <span className="font-semibold">{stats.totalRentals}</span>
            </div>
            <div className="flex justify-between">
              <span>Locações Ativas:</span>
              <span className="font-semibold text-green-600">
                {stats.activeRentals}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Receita Total:</span>
              <span className="font-semibold text-green-600">
                {formatCurrency(stats.revenue)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Taxa de Utilização:</span>
              <span className="font-semibold">
                {stats.totalVehicles > 0
                  ? Math.round(
                      (stats.activeRentals / stats.totalVehicles) * 100
                    )
                  : 0}
                %
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
