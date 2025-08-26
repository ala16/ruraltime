import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, MapPin, Phone, Mail, Globe, Star } from 'lucide-react';

const PropertyList = ({ properties, onEdit, onDelete }) => {
  if (properties.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">Nenhuma propriedade cadastrada ainda.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6">
      {properties.map((property) => (
        <Card key={property.id} className="overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-xl">{property.nome}</CardTitle>
                  {property.destaque && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      <Star className="w-3 h-3 mr-1" />
                      Destaque
                    </Badge>
                  )}
                  <Badge variant="outline">
                    {property.tipo_propriedade?.charAt(0).toUpperCase() + property.tipo_propriedade?.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.cidade}, {property.estado}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(property)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(property.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Images */}
              <div className="lg:col-span-1">
                {property.imagens && property.imagens.length > 0 ? (
                  <div className="space-y-2">
                    <img
                      src={property.imagens[0]}
                      alt={property.nome}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    {property.imagens.length > 1 && (
                      <div className="grid grid-cols-3 gap-1">
                        {property.imagens.slice(1, 4).map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`${property.nome} ${index + 2}`}
                            className="w-full h-16 object-cover rounded"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Sem imagens</span>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="lg:col-span-2 space-y-4">
                {property.descricao && (
                  <p className="text-gray-700 text-sm">{property.descricao}</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Contact Info */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Contato</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {property.endereco}
                      </div>
                      {property.telefone && (
                        <div className="flex items-center text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          {property.telefone}
                        </div>
                      )}
                      {property.email && (
                        <div className="flex items-center text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          {property.email}
                        </div>
                      )}
                      {property.website && (
                        <div className="flex items-center text-gray-600">
                          <Globe className="w-4 h-4 mr-2" />
                          {property.website}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Detalhes</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      {property.preco_visita && (
                        <div>Preço: R$ {property.preco_visita}</div>
                      )}
                      {property.capacidade_visitantes && (
                        <div>Capacidade: {property.capacidade_visitantes} pessoas</div>
                      )}
                      {property.tamanho_hectares && (
                        <div>Tamanho: {property.tamanho_hectares} hectares</div>
                      )}
                      {property.horario_funcionamento && (
                        <div>Horário: {property.horario_funcionamento}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Activities and Infrastructure */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.atividades && property.atividades.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Atividades</h4>
                      <div className="flex flex-wrap gap-1">
                        {property.atividades.slice(0, 3).map((atividade, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {atividade}
                          </Badge>
                        ))}
                        {property.atividades.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{property.atividades.length - 3} mais
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {property.infraestrutura && property.infraestrutura.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Infraestrutura</h4>
                      <div className="flex flex-wrap gap-1">
                        {property.infraestrutura.slice(0, 3).map((item, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                        {property.infraestrutura.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{property.infraestrutura.length - 3} mais
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PropertyList;