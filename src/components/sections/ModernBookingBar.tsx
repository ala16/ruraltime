import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Users, Search, Clock } from 'lucide-react';

export const ModernBookingBar = () => {
  const [searchData, setSearchData] = useState({
    destination: '',
    date: '',
    guests: '',
    activity: ''
  });

  const activities = [
    'Todos os Atrativos',
    'Trilhas Ecológicas',
    'Fazendas Orgânicas', 
    'Artesanato Local',
    'Turismo Gastronômico',
    'Experiência Rural',
    'Observação de Fauna',
    'Agroturismo'
  ];

  const locations = [
    'Região Bragantina',
    'Atibaia',
    'Bragança Paulista',
    'Itatiba',
    'Jarinu',
    'Joanópolis',
    'Morungaba',
    'Nazaré Paulista',
    'Piracaia',
    'Tuiuti',
    'Vinhedo'
  ];

  const handleSearch = () => {
    console.log('Pesquisar:', searchData);
    // Aqui você pode implementar a lógica de busca/navegação
  };

  return (
    <section className="py-16 bg-gradient-to-br from-rural-neutral to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 bg-rural-secondary/10 rounded-full mb-4">
            <Calendar className="w-4 h-4 text-rural-secondary mr-2" />
            <span className="text-rural-secondary font-medium">Reserve sua Experiência</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-rural-primary mb-4">
            Agende seus Atrativos Turísticos
          </h2>
          <p className="text-rural-text-light text-lg max-w-2xl mx-auto">
            Encontre e reserve as melhores experiências rurais da Região Bragantina
          </p>
        </div>

        {/* Booking Form */}
        <Card className="glass-dark backdrop-blur-xl border-white/20 shadow-xl-soft hover-lift">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
              
              {/* Destino */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Destino
                </label>
                <Select onValueChange={(value) => setSearchData({...searchData, destination: value})}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 h-12">
                    <SelectValue placeholder="Escolha a cidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Data */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Data da Visita
                </label>
                <Input
                  type="date"
                  value={searchData.date}
                  onChange={(e) => setSearchData({...searchData, date: e.target.value})}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 h-12 [color-scheme:dark]"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Número de Pessoas */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Pessoas
                </label>
                <Select onValueChange={(value) => setSearchData({...searchData, guests: value})}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 h-12">
                    <SelectValue placeholder="Quantas pessoas?" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7,8,9,10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'pessoa' : 'pessoas'}
                      </SelectItem>
                    ))}
                    <SelectItem value="10+">Mais de 10 pessoas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tipo de Atividade */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Atividade
                </label>
                <Select onValueChange={(value) => setSearchData({...searchData, activity: value})}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 h-12">
                    <SelectValue placeholder="Tipo de experiência" />
                  </SelectTrigger>
                  <SelectContent>
                    {activities.map((activity) => (
                      <SelectItem key={activity} value={activity}>
                        {activity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Botão de Busca */}
              <div className="space-y-2">
                <div className="h-6"></div> {/* Spacer for alignment */}
                <Button 
                  onClick={handleSearch}
                  className="w-full btn-modern bg-gradient-secondary hover:bg-gradient-primary text-rural-secondary-foreground px-8 py-3 h-12 text-lg font-semibold shadow-glow"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Buscar
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="flex flex-wrap gap-3 justify-center">
                <span className="text-white/70 text-sm">Buscar por:</span>
                {['Trilhas', 'Fazendas', 'Artesanato', 'Gastronomia'].map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white/90 text-sm rounded-full transition-colors border border-white/20"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            { number: '50+', label: 'Atrativos Disponíveis' },
            { number: '15', label: 'Cidades Parceiras' },
            { number: '1000+', label: 'Experiências Realizadas' },
            { number: '4.8★', label: 'Avaliação Média' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-rural-primary mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-rural-text-light">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};