import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye, EyeOff, Star } from 'lucide-react';

interface Artesanato {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  artesao_nome: string;
  imagens: string[];
  disponivel: boolean;
  destaque: boolean;
  created_at: string;
}

interface ArtesanatoListProps {
  artesanatos: Artesanato[];
  onEdit: (artesanato: Artesanato) => void;
  onDelete: (id: string) => void;
}

const ArtesanatoList: React.FC<ArtesanatoListProps> = ({ artesanatos, onEdit, onDelete }) => {
  if (artesanatos.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-muted-foreground">
            <p className="text-lg">Nenhum artesanato cadastrado ainda.</p>
            <p className="text-sm mt-2">Clique em "Novo Artesanato" para começar.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6">
      {artesanatos.map((artesanato) => (
        <Card key={artesanato.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              <div className="lg:w-64 h-48 lg:h-auto">
                {artesanato.imagens && artesanato.imagens.length > 0 ? (
                  <img
                    src={artesanato.imagens[0]}
                    alt={artesanato.nome}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">Sem imagem</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold">{artesanato.nome}</h3>
                      {artesanato.destaque && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          <Star className="w-3 h-3 mr-1" />
                          Destaque
                        </Badge>
                      )}
                      <Badge variant={artesanato.disponivel ? "default" : "secondary"}>
                        {artesanato.disponivel ? (
                          <>
                            <Eye className="w-3 h-3 mr-1" />
                            Disponível
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 mr-1" />
                            Indisponível
                          </>
                        )}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3">
                      <Badge variant="outline">{artesanato.categoria}</Badge>
                      {artesanato.preco && (
                        <span className="text-lg font-bold text-primary">
                          R$ {artesanato.preco.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {artesanato.descricao || 'Sem descrição'}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Artesão:</span> {artesanato.artesao_nome}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Cadastrado em {new Date(artesanato.created_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(artesanato)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(artesanato.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ArtesanatoList;