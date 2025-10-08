import React from "react";
import { Car, Users, Calendar, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Car className="text-blue-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-900">Locadora</h1>
            </div>
            <div className="flex gap-4">
              <Link to="/customer-area" className="btn btn-primary">
                Área do Cliente
              </Link>
              <Link to="/" className="btn btn-secondary">
                Área Administrativa
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Sistema de Locação de Veículos
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Gerencie sua frota de veículos, clientes e locações de forma
            eficiente com nossa plataforma completa e intuitiva.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/" className="btn btn-primary btn-lg">
              Acessar Sistema
              <ArrowRight size={20} />
            </Link>
            <Link to="/customer-area" className="btn btn-secondary btn-lg">
              Área do Cliente
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Funcionalidades Principais
            </h2>
            <p className="text-xl text-gray-600">
              Tudo que você precisa para gerenciar sua locadora
            </p>
          </div>

          <div className="grid grid-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="text-blue-600" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Gerenciamento de Veículos
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  Cadastro completo de veículos
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  Controle de disponibilidade
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  Filtros avançados
                </li>
              </ul>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-green-600" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Gerenciamento de Clientes
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  Cadastro de clientes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  Histórico de locações
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  Área exclusiva do cliente
                </li>
              </ul>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="text-purple-600" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Gerenciamento de Locações
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  Criação de locações
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  Controle de status
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  Cálculo automático de valores
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Dashboard Completo
            </h2>
            <p className="text-xl text-gray-600">
              Visualize métricas importantes e mantenha controle total
            </p>
          </div>

          <div className="grid grid-4 gap-6 max-w-4xl mx-auto">
            <div className="card text-center">
              <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-3">
                <Users className="text-blue-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-blue-600">150+</h3>
              <p className="text-sm text-gray-600">Clientes Cadastrados</p>
            </div>

            <div className="card text-center">
              <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-3">
                <Car className="text-green-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-green-600">50+</h3>
              <p className="text-sm text-gray-600">Veículos Disponíveis</p>
            </div>

            <div className="card text-center">
              <div className="p-3 bg-yellow-100 rounded-lg w-fit mx-auto mb-3">
                <Calendar className="text-yellow-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-yellow-600">25</h3>
              <p className="text-sm text-gray-600">Locações Ativas</p>
            </div>

            <div className="card text-center">
              <div className="p-3 bg-purple-100 rounded-lg w-fit mx-auto mb-3">
                <Calendar className="text-purple-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-purple-600">R$ 50k</h3>
              <p className="text-sm text-gray-600">Receita Mensal</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Acesse o sistema e comece a gerenciar sua locadora de forma
            profissional
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/"
              className="btn bg-white text-blue-600 hover:bg-gray-100 btn-lg"
            >
              Acessar Sistema Administrativo
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/customer-area"
              className="btn border-2 border-white text-white hover:bg-white hover:text-blue-600 btn-lg"
            >
              Área do Cliente
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Car className="text-blue-400" size={24} />
              <span className="text-xl font-bold">Locadora</span>
            </div>
            <div className="text-gray-400">
              © 2024 Sistema de Locação de Veículos. Todos os direitos
              reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
