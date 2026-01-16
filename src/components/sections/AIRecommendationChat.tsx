import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  Send, 
  Sparkles, 
  MapPin, 
  Palette,
  ChevronRight,
  Bot,
  User,
  Loader2,
  X
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
}

interface ParsedResponse {
  type: "question" | "recommendations";
  message: string;
  attractions?: Recommendation[];
  artesanatos?: Recommendation[];
}

export function AIRecommendationChat() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<{
    attractions: Recommendation[];
    artesanatos: Recommendation[];
  } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Start conversation when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      startConversation();
    }
  }, [isOpen]);

  const startConversation = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('recommend-attractions', {
        body: { 
          conversationHistory: [],
          userProfile: null
        }
      });

      if (error) throw error;

      const parsed = parseAIResponse(data.response);
      setMessages([{ role: "assistant", content: parsed.message }]);
    } catch (error) {
      console.error('Error starting conversation:', error);
      setMessages([{ 
        role: "assistant", 
        content: "Olá! Sou seu assistente de turismo rural. Como posso ajudar você a encontrar as melhores experiências no campo? Me conte: você prefere viajar sozinho, em casal, com família ou em grupo?" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const parseAIResponse = (response: string): ParsedResponse => {
    try {
      // Try to parse as JSON
      const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return parsed;
    } catch {
      // If not JSON, treat as regular message
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
        setRecommendations({
          attractions: parsed.attractions || [],
          artesanatos: parsed.artesanatos || []
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
  };

  if (!isOpen) {
    return (
      <section className="py-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-4xl mx-auto px-4">
          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-primary/20 hover:border-primary/40 bg-gradient-to-br from-background to-secondary/10"
            onClick={() => setIsOpen(true)}
          >
            <CardContent className="p-8">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center animate-pulse">
                    <Sparkles className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    🌾 Descubra sua Experiência Rural Ideal
                  </h3>
                  <p className="text-muted-foreground">
                    Converse com nossa IA e receba recomendações personalizadas de atrativos turísticos e artesanatos baseados no seu perfil e preferências!
                  </p>
                </div>
                <ChevronRight className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="border-2 border-primary/20 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-primary text-primary-foreground py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">Assistente Rural Time</CardTitle>
                  <p className="text-sm opacity-80">IA para recomendações personalizadas</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetChat}
                  className="text-primary-foreground hover:bg-white/20"
                >
                  Recomeçar
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-primary-foreground hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            {/* Messages Area */}
            <ScrollArea className="h-[400px] p-4" ref={scrollRef}>
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
                  <div className="space-y-4 mt-6">
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
                              className="cursor-pointer hover:shadow-md transition-all hover:border-primary/40"
                              onClick={() => navigateToProperty(item.id)}
                            >
                              <CardContent className="p-3">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="font-medium text-sm">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">{item.reason}</p>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-primary" />
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
                              className="cursor-pointer hover:shadow-md transition-all hover:border-accent/40"
                              onClick={() => navigateToArtesanato(item.id)}
                            >
                              <CardContent className="p-3">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="font-medium text-sm">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">{item.reason}</p>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-accent" />
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
