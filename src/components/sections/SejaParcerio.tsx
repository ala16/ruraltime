import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Handshake, Building, Users, Heart, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export function SejaParceiro() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    organizacao: "",
    tipo: "",
    mensagem: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve para discutir a parceria.",
    });
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      organizacao: "",
      tipo: "",
      mensagem: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="parceiros" className="py-20 bg-gradient-primary text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Seja Parceiro</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-6">
            O sucesso do Rural Time depende da força da rede. Junte-se a nós e apoie o turismo rural digital.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.open('https://forms.gle/UFPLAfFNQmTmD2VdA', '_blank')}
              variant="hero"
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              <Plus className="mr-2 h-5 w-5" />
              Cadastre sua Propriedade
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Informações sobre Parcerias */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold mb-6">Por que ser nosso parceiro?</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Handshake className="w-8 h-8 text-rural-green-light flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Sindicatos Rurais</h4>
                  <p className="text-white/80">
                    Ampliem o alcance dos serviços aos associados e fortaleçam a economia local.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Building className="w-8 h-8 text-rural-green-light flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Cooperativas</h4>
                  <p className="text-white/80">
                    Oferecemos oportunidades de diversificação de negócios para cooperados.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 text-rural-green-light flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Instituições</h4>
                  <p className="text-white/80">
                    Apoiem projetos que promovem sustentabilidade e desenvolvimento rural.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Heart className="w-8 h-8 text-rural-green-light flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg mb-2">Apoiadores</h4>
                  <p className="text-white/80">
                    Contribuam para a transformação digital do agronegócio brasileiro.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-xl">Entre em Contato</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome" className="text-white">Nome completo</Label>
                    <Input 
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => handleInputChange("nome", e.target.value)}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">E-mail</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telefone" className="text-white">Telefone</Label>
                    <Input 
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange("telefone", e.target.value)}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <Label htmlFor="organizacao" className="text-white">Organização</Label>
                    <Input 
                      id="organizacao"
                      value={formData.organizacao}
                      onChange={(e) => handleInputChange("organizacao", e.target.value)}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      placeholder="Nome da organização"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="tipo" className="text-white">Tipo de parceria</Label>
                  <Select value={formData.tipo} onValueChange={(value) => handleInputChange("tipo", value)}>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sindicato">Sindicato Rural</SelectItem>
                      <SelectItem value="cooperativa">Cooperativa</SelectItem>
                      <SelectItem value="instituicao">Instituição</SelectItem>
                      <SelectItem value="empresa">Empresa</SelectItem>
                      <SelectItem value="apoiador">Apoiador</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="mensagem" className="text-white">Mensagem</Label>
                  <Textarea 
                    id="mensagem"
                    value={formData.mensagem}
                    onChange={(e) => handleInputChange("mensagem", e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 min-h-[100px]"
                    placeholder="Conte-nos mais sobre sua proposta de parceria..."
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="hero"
                  className="w-full bg-white text-primary hover:bg-white/90"
                >
                  Enviar Proposta
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}