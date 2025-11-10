import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { X, MapPin, Eye, ExternalLink } from 'lucide-react';

interface Propriedade {
  id: string;
  nome: string;
  cidade: string;
  estado: string;
  latitude: number;
  longitude: number;
  tipo_propriedade: string;
  preco_visita: number;
  descricao?: string;
  imagens?: string[];
  atividades?: string[];
  infraestrutura?: string[];
}

// Estados brasileiros com suas coordenadas centrais
const ESTADOS_BRASILEIROS = {
  'AC': { nome: 'Acre', lat: -8.77, lng: -70.55 },
  'AL': { nome: 'Alagoas', lat: -9.71, lng: -35.73 },
  'AP': { nome: 'Amapá', lat: 1.41, lng: -51.77 },
  'AM': { nome: 'Amazonas', lat: -3.47, lng: -65.10 },
  'BA': { nome: 'Bahia', lat: -12.96, lng: -38.51 },
  'CE': { nome: 'Ceará', lat: -3.71, lng: -38.54 },
  'DF': { nome: 'Distrito Federal', lat: -15.83, lng: -47.86 },
  'ES': { nome: 'Espírito Santo', lat: -19.19, lng: -40.34 },
  'GO': { nome: 'Goiás', lat: -16.64, lng: -49.31 },
  'MA': { nome: 'Maranhão', lat: -2.55, lng: -44.30 },
  'MT': { nome: 'Mato Grosso', lat: -12.64, lng: -55.42 },
  'MS': { nome: 'Mato Grosso do Sul', lat: -20.51, lng: -54.54 },
  'MG': { nome: 'Minas Gerais', lat: -18.10, lng: -44.38 },
  'PA': { nome: 'Pará', lat: -5.53, lng: -52.29 },
  'PB': { nome: 'Paraíba', lat: -7.06, lng: -35.55 },
  'PR': { nome: 'Paraná', lat: -24.89, lng: -51.55 },
  'PE': { nome: 'Pernambuco', lat: -8.28, lng: -35.07 },
  'PI': { nome: 'Piauí', lat: -8.28, lng: -43.68 },
  'RJ': { nome: 'Rio de Janeiro', lat: -22.84, lng: -43.15 },
  'RN': { nome: 'Rio Grande do Norte', lat: -5.22, lng: -36.52 },
  'RS': { nome: 'Rio Grande do Sul', lat: -30.01, lng: -51.22 },
  'RO': { nome: 'Rondônia', lat: -11.22, lng: -62.80 },
  'RR': { nome: 'Roraima', lat: 1.99, lng: -61.33 },
  'SC': { nome: 'Santa Catarina', lat: -27.33, lng: -49.44 },
  'SP': { nome: 'São Paulo', lat: -23.55, lng: -46.64 },
  'SE': { nome: 'Sergipe', lat: -10.90, lng: -37.07 },
  'TO': { nome: 'Tocantins', lat: -10.25, lng: -48.25 },
};

export const BrazilMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showCities, setShowCities] = useState(false);
  const [propriedades, setPropriedades] = useState<Propriedade[]>([]);
  const [filteredPropriedades, setFilteredPropriedades] = useState<Propriedade[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Propriedade | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const mapboxToken = 'pk.eyJ1Ijoicmlja2s2IiwiYSI6ImNtaGp1czhzdTE1b2YyaXByMGdiODBjZjAifQ.rYfe5zFBekxRf5SoKGp86A';

  useEffect(() => {
    // Fetch propriedades from database
    const fetchPropriedades = async () => {
      try {
        const { data, error } = await supabase.rpc('get_property_public_view');
        
        if (error) {
          console.error('Erro ao buscar propriedades:', error);
          return;
        }

        // Filter properties with valid coordinates
        const propriedadesComCoordenadas = (data || []).filter(
          (prop: any) => prop.latitude && prop.longitude
        );

        setPropriedades(propriedadesComCoordenadas);
        // Mostrar todas as propriedades no mapa inicialmente
        setFilteredPropriedades(propriedadesComCoordenadas);
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchPropriedades();
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-54, -14], // Brazil center
      zoom: 3.5,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add fullscreen control
    map.current.addControl(new mapboxgl.FullscreenControl());

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  useEffect(() => {
    if (!map.current) return;

    // Remove existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add markers for filtered properties
    filteredPropriedades.forEach((propriedade) => {
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.width = '30px';
      el.style.height = '30px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = '#22c55e';
      el.style.border = '3px solid white';
      el.style.cursor = 'pointer';
      el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';

      const marker = new mapboxgl.Marker(el)
        .setLngLat([propriedade.longitude, propriedade.latitude])
        .addTo(map.current!);

      // Open preview dialog on marker click
      el.addEventListener('click', async () => {
        // Fetch full property details
        const { data, error } = await supabase
          .from('propriedades')
          .select('*')
          .eq('id', propriedade.id)
          .single();
        
        if (!error && data) {
          setSelectedProperty(data);
          setShowPreview(true);
        }
      });

      markersRef.current.push(marker);
    });

    // Fit map to show all markers if there are any
    if (filteredPropriedades.length > 0 && map.current) {
      const bounds = new mapboxgl.LngLatBounds();
      filteredPropriedades.forEach(prop => {
        bounds.extend([prop.longitude, prop.latitude]);
      });
      map.current.fitBounds(bounds, { padding: 100, maxZoom: 10 });
    }
  }, [filteredPropriedades, navigate]);

  const handleStateClick = (siglaEstado: string) => {
    if (selectedState === siglaEstado) {
      // Toggle cities view
      setShowCities(!showCities);
    } else {
      // Select new state and show cities
      setSelectedState(siglaEstado);
      setSelectedCity(null);
      setShowCities(true);
      const filtered = propriedades.filter(prop => prop.estado === siglaEstado);
      setFilteredPropriedades(filtered);

      // Zoom to state
      if (map.current && ESTADOS_BRASILEIROS[siglaEstado as keyof typeof ESTADOS_BRASILEIROS]) {
        const estado = ESTADOS_BRASILEIROS[siglaEstado as keyof typeof ESTADOS_BRASILEIROS];
        map.current.flyTo({
          center: [estado.lng, estado.lat],
          zoom: 7,
          essential: true
        });
      }
    }
  };

  const handleCityClick = (cidade: string) => {
    setSelectedCity(cidade);
    const filtered = propriedades.filter(
      prop => prop.estado === selectedState && prop.cidade === cidade
    );
    setFilteredPropriedades(filtered);

    // Zoom to first property in city
    if (filtered.length > 0 && map.current) {
      map.current.flyTo({
        center: [filtered[0].longitude, filtered[0].latitude],
        zoom: 10,
        essential: true
      });
    }
  };

  const handleClearFilter = () => {
    setSelectedState(null);
    setSelectedCity(null);
    setShowCities(false);
    setFilteredPropriedades([]);
    
    // Reset map view to Brazil
    if (map.current) {
      map.current.flyTo({
        center: [-54, -14],
        zoom: 3.5,
        essential: true
      });
    }
  };

  const handleShowAll = () => {
    setSelectedState(null);
    setSelectedCity(null);
    setShowCities(false);
    setFilteredPropriedades(propriedades);
    
    // Reset map view to Brazil
    if (map.current) {
      map.current.flyTo({
        center: [-54, -14],
        zoom: 3.5,
        essential: true
      });
    }
  };

  // Group properties by state
  const propriedadesPorEstado = propriedades.reduce((acc, prop) => {
    acc[prop.estado] = (acc[prop.estado] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Filtrar apenas estados com propriedades
  const estadosComPropriedades = Object.entries(ESTADOS_BRASILEIROS).filter(
    ([sigla]) => propriedadesPorEstado[sigla] > 0
  );

  // Group properties by city within selected state
  const propriedadesPorCidade = selectedState
    ? propriedades
        .filter(prop => prop.estado === selectedState)
        .reduce((acc, prop) => {
          acc[prop.cidade] = (acc[prop.cidade] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
    : {};

  return (
    <section id="mapa-brasil" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Explore o Brasil Rural
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubra propriedades rurais em todo o Brasil. Clique em um estado para ver as propriedades disponíveis.
          </p>
        </div>

        {/* Map Container */}
        <>
            <div className="grid lg:grid-cols-4 gap-6">
              {/* States List */}
              <div className="lg:col-span-1">
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Estados</h3>
                    {selectedState && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearFilter}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-2 max-h-[600px] overflow-y-auto">
                    <Button
                      variant={!selectedState ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-between"
                      onClick={handleShowAll}
                    >
                      <span>Todas</span>
                      <Badge variant="secondary">{propriedades.length}</Badge>
                    </Button>
                    
                    {estadosComPropriedades.map(([sigla, info]) => {
                      const count = propriedadesPorEstado[sigla];
                      const isSelected = selectedState === sigla;
                      return (
                        <div key={sigla}>
                          <Button
                            variant={isSelected && !selectedCity ? "default" : "outline"}
                            size="sm"
                            className="w-full justify-between"
                            onClick={() => handleStateClick(sigla)}
                          >
                            <span>{sigla} - {info.nome}</span>
                            <Badge variant="secondary">{count}</Badge>
                          </Button>
                          
                          {/* Cities list */}
                          {isSelected && showCities && (
                            <div className="ml-4 mt-2 space-y-1">
                              {Object.entries(propriedadesPorCidade)
                                .sort(([a], [b]) => a.localeCompare(b))
                                .map(([cidade, cidadeCount]) => (
                                  <Button
                                    key={cidade}
                                    variant={selectedCity === cidade ? "default" : "ghost"}
                                    size="sm"
                                    className="w-full justify-between text-sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCityClick(cidade);
                                    }}
                                  >
                                    <span>{cidade}</span>
                                    <Badge variant="secondary" className="text-xs">
                                      {cidadeCount}
                                    </Badge>
                                  </Button>
                                ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </div>

              {/* Map */}
              <div className="lg:col-span-3">
                <Card className="overflow-hidden">
                  <div ref={mapContainer} className="w-full h-[600px]" />
                </Card>
                
                {(selectedState || selectedCity) && (
                  <Card className="mt-4 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">
                        Propriedades em {selectedCity ? `${selectedCity} - ` : ''}{selectedState ? ESTADOS_BRASILEIROS[selectedState as keyof typeof ESTADOS_BRASILEIROS].nome : ''}
                      </h3>
                      <Badge>{filteredPropriedades.length}</Badge>
                    </div>
                    
                    <div className="grid gap-4 max-h-[400px] overflow-y-auto">
                      {filteredPropriedades.map((prop) => (
                        <div
                          key={prop.id}
                          className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 cursor-pointer transition-colors"
                          onClick={() => navigate(`/propriedade/${prop.id}`)}
                        >
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-primary mt-1" />
                            <div>
                              <p className="font-medium">{prop.nome}</p>
                              <p className="text-sm text-muted-foreground">
                                {prop.cidade} - {prop.estado}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {prop.tipo_propriedade}
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </>

        {/* Property Preview Dialog */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedProperty && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedProperty.nome}</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  {/* Property Image */}
                  {selectedProperty.imagens && selectedProperty.imagens.length > 0 && (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden">
                      <img
                        src={selectedProperty.imagens[0]}
                        alt={selectedProperty.nome}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Property Details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedProperty.cidade} - {selectedProperty.estado}</span>
                    </div>
                    
                    <Badge variant="secondary" className="w-fit">
                      {selectedProperty.tipo_propriedade}
                    </Badge>
                    
                    {selectedProperty.descricao && (
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {selectedProperty.descricao}
                      </p>
                    )}
                    
                    {selectedProperty.preco_visita && (
                      <div className="text-lg font-semibold text-primary">
                        R$ {selectedProperty.preco_visita.toFixed(2)} / pessoa
                      </div>
                    )}
                    
                    {/* Activities */}
                    {selectedProperty.atividades && selectedProperty.atividades.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Atividades:</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProperty.atividades.slice(0, 5).map((atividade, idx) => (
                            <Badge key={idx} variant="outline">
                              {atividade}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Action Button */}
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => {
                      setShowPreview(false);
                      navigate(`/propriedade/${selectedProperty.id}`);
                    }}
                  >
                    Ver Detalhes Completos
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
