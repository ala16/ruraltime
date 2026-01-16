import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  MapPin, 
  Palette,
  ChevronRight,
  Bot,
  User,
  Loader2,
  RotateCcw
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Recommendation {
  id: string;
  name: string;
  reason: string;
  type: "property" | "artesanato";
  image?: string;
}

interface ParsedResponse {
  type: "question" | "recommendations";
  message: string;
  attractions?: Recommendation[];
  artesanatos?: Recommendation[];
}

interface PropertyData {
  id: string;
  nome: string;
  imagens: string[] | null;
}

interface ArtesanatoData {
  id: string;
  nome: string;
  imagens: string[] | null;
}

export function AIRecommendationChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<{
    attractions: Recommendation[];
    artesanatos: Recommendation[];
  } | null>(null);
  const [propertiesData, setPropertiesData] = useState<PropertyData[]>([]);
  const [artesanatosData, setArtesanatosData] = useState<ArtesanatoData[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load properties and artesanatos data for images
  useEffect(() => {
    const fetchData = async () => {
      const [propsRes, artesRes] = await Promise.all([
        supabase.from('propriedades').select('id, nome, imagens').eq('ativo', true),
        supabase.from('artesanatos').select('id, nome, imagens').eq('disponivel', true)
      ]);
      
      if (propsRes.data) setPropertiesData(propsRes.data);
      if (artesRes.data) setArtesanatosData(artesRes.data);
    };
    fetchData();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, recommendations]);

  // Focus input on mount and start conversation
  useEffect(() => {
    startConversation();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  const startConversation = () => {
    setMessages([{ 
      role: "assistant", 
      content: "Quais experiências você mais curte? (ex: natureza, gastronomia, aventura, relaxamento, animais)" 
    }]);
  };

  const getPropertyImage = (id: string): string | undefined => {
    const prop = propertiesData.find(p => p.id === id);
    return prop?.imagens?.[0];
  };

  const getArtesanatoImage = (id: string): string | undefined => {
    const art = artesanatosData.find(a => a.id === id);
    return art?.imagens?.[0];
  };

  const parseAIResponse = (response: string): ParsedResponse => {
    try {
      const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return parsed;
    } catch {
      return {
        type: "question",
        message: response
      };
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('recommend-attractions', {
        body: { 
          conversationHistory: newMessages.map(m => ({
            role: m.role,
            content: m.content
          })),
          userProfile: null
        }
      });

      if (error) {
        if (error.message?.includes('429')) {
          toast.error('Muitas requisições. Aguarde um momento.');
        } else if (error.message?.includes('402')) {
          toast.error('Serviço temporariamente indisponível.');
        }
        throw error;
      }

      const parsed = parseAIResponse(data.response);
      
      if (parsed.type === "recommendations") {
        // Add images to recommendations
        const attractionsWithImages = (parsed.attractions || []).map(item => ({
          ...item,
          image: getPropertyImage(item.id)
        }));
        const artesanatosWithImages = (parsed.artesanatos || []).map(item => ({
          ...item,
          image: getArtesanatoImage(item.id)
        }));
        
        setRecommendations({
          attractions: attractionsWithImages,
          artesanatos: artesanatosWithImages
        });
      }
      
      setMessages([...newMessages, { role: "assistant", content: parsed.message }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...newMessages, { 
        role: "assistant", 
        content: "Desculpe, ocorreu um erro. Pode tentar novamente?" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const navigateToProperty = (id: string) => {
    navigate(`/propriedade/${id}`);
    window.scrollTo(0, 0);
  };

  const navigateToArtesanato = (id: string) => {
    navigate(`/artesanato/${id}`);
    window.scrollTo(0, 0);
  };

  const resetChat = () => {
    setMessages([]);
    setRecommendations(null);
    startConversation();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <section id="ai-chat" className="py-8 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="border-2 border-primary/20 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-primary text-primary-foreground py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-base">🌾 Descubra sua Experiência Rural Ideal</CardTitle>
                  <p className="text-xs opacity-80">IA para recomendações personalizadas</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetChat}
                className="text-primary-foreground hover:bg-white/20 gap-1"
              >
                <RotateCcw className="w-4 h-4" />
                Recomeçar
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            {/* Messages Area */}
            <ScrollArea className="h-[350px] p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-secondary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-muted rounded-2xl px-4 py-3">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    </div>
                  </div>
                )}

                {/* Recommendations Cards */}
                {recommendations && (recommendations.attractions.length > 0 || recommendations.artesanatos.length > 0) && (
                  <div className="space-y-4 mt-4">
                    {recommendations.attractions.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-primary flex items-center gap-2 mb-3">
                          <MapPin className="w-4 h-4" />
                          Atrativos Recomendados
                        </h4>
                        <div className="grid gap-2">
                          {recommendations.attractions.map((item) => (
                            <Card 
                              key={item.id}
                              className="cursor-pointer hover:shadow-md transition-all hover:border-primary/40 overflow-hidden"
                              onClick={() => navigateToProperty(item.id)}
                            >
                              <CardContent className="p-0">
                                <div className="flex items-center gap-3">
                                  {item.image && (
                                    <div className="w-16 h-16 flex-shrink-0">
                                      <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  )}
                                  <div className="flex-1 py-2 pr-3">
                                    <p className="font-medium text-sm">{item.name}</p>
                                    <p className="text-xs text-muted-foreground line-clamp-1">{item.reason}</p>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-primary mr-3" />
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    {recommendations.artesanatos.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-accent flex items-center gap-2 mb-3">
                          <Palette className="w-4 h-4" />
                          Artesanatos Recomendados
                        </h4>
                        <div className="grid gap-2">
                          {recommendations.artesanatos.map((item) => (
                            <Card 
                              key={item.id}
                              className="cursor-pointer hover:shadow-md transition-all hover:border-accent/40 overflow-hidden"
                              onClick={() => navigateToArtesanato(item.id)}
                            >
                              <CardContent className="p-0">
                                <div className="flex items-center gap-3">
                                  {item.image && (
                                    <div className="w-16 h-16 flex-shrink-0">
                                      <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  )}
                                  <div className="flex-1 py-2 pr-3">
                                    <p className="font-medium text-sm">{item.name}</p>
                                    <p className="text-xs text-muted-foreground line-clamp-1">{item.reason}</p>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-accent mr-3" />
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4 bg-background">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua resposta..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button 
                  onClick={sendMessage} 
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
