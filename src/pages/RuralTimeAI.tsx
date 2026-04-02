import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import {
  Send,
  Bot,
  User,
  Loader2,
  Plus,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { SEOHead } from "@/components/seo/SEOHead";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  { icon: "Home", text: "Como começar um negócio de turismo rural?" },
  { icon: "FileText", text: "Quais licenças preciso para receber turistas?" },
  { icon: "UtensilsCrossed", text: "Como montar um restaurante rural na fazenda?" },
  { icon: "Leaf", text: "Ideias de atividades sustentáveis para visitantes" },
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/rural-ai-chat`;

async function streamChat({
  messages,
  onDelta,
  onDone,
  signal,
}: {
  messages: Message[];
  onDelta: (text: string) => void;
  onDone: () => void;
  signal?: AbortSignal;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
    signal,
  });

  if (!resp.ok) {
    const errorData = await resp.json().catch(() => ({}));
    if (resp.status === 429) toast.error("Muitas requisições. Aguarde um momento.");
    else if (resp.status === 402) toast.error("Serviço temporariamente indisponível.");
    throw new Error(errorData.error || "Erro na requisição");
  }

  if (!resp.body) throw new Error("No response body");

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
      let line = buffer.slice(0, newlineIndex);
      buffer = buffer.slice(newlineIndex + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;
      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") break;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) onDelta(content);
      } catch {
        buffer = line + "\n" + buffer;
        break;
      }
    }
  }
  onDone();
}

export default function RuralTimeAI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const adjustTextareaHeight = () => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 150) + "px";
    }
  };

  const sendMessage = useCallback(async (text?: string) => {
    const content = (text || inputValue).trim();
    if (!content || isLoading) return;

    setInputValue("");
    if (inputRef.current) inputRef.current.style.height = "auto";

    const userMsg: Message = { role: "user", content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    let assistantSoFar = "";
    const controller = new AbortController();
    abortRef.current = controller;

    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: newMessages,
        onDelta: upsertAssistant,
        onDone: () => setIsLoading(false),
        signal: controller.signal,
      });
    } catch (e: any) {
      if (e.name !== "AbortError") {
        console.error(e);
        setMessages(prev => [...prev, { role: "assistant", content: "Desculpe, ocorreu um erro. Tente novamente." }]);
      }
      setIsLoading(false);
    }
  }, [inputValue, isLoading, messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const newChat = () => {
    abortRef.current?.abort();
    setMessages([]);
    setIsLoading(false);
    setInputValue("");
    inputRef.current?.focus();
  };

  const hasMessages = messages.length > 0;

  return (
    <>
      <SEOHead
        title="RuralTime AI - Assistente de Turismo Rural"
        description="Tire suas dúvidas sobre turismo rural com inteligência artificial. Dicas para implementar turismo em sua propriedade rural."
        canonicalUrl="/ia"
      />

      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a href="/" className="flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-semibold text-lg">RuralTime AI</span>
              </a>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={newChat}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <Plus className="w-4 h-4" />
              Nova conversa
            </Button>
          </div>
        </header>

        {/* Chat area */}
        <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
          {!hasMessages ? (
            /* Empty state */
            <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">
                Como posso ajudar?
              </h1>
              <p className="text-muted-foreground text-center mb-10 max-w-md">
                Tire dúvidas sobre turismo rural, legislação, infraestrutura e como transformar sua propriedade em um destino turístico.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(s.text)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border/60 bg-card hover:bg-accent/50 text-left transition-colors group"
                  >
                    <span className="text-xl">{s.icon}</span>
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors">{s.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Messages */
            <ScrollArea className="flex-1 px-4" ref={scrollRef}>
              <div className="py-6 space-y-6">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && (
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <div className={`max-w-[85%] ${msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-3"
                      : ""
                    }`}>
                      {msg.role === "assistant" ? (
                        <div className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      )}
                    </div>
                    {msg.role === "user" && (
                      <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-4 h-4 text-secondary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex items-center gap-1 py-3">
                      <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Pensando...</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="h-4" />
            </ScrollArea>
          )}

          {/* Input bar */}
          <div className="sticky bottom-0 bg-background px-4 pb-4 pt-2">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-end gap-2 border border-border/60 rounded-2xl bg-card px-4 py-3 shadow-sm focus-within:border-primary/40 transition-colors">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    adjustTextareaHeight();
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Pergunte sobre turismo rural..."
                  disabled={isLoading}
                  rows={1}
                  className="flex-1 bg-transparent border-none outline-none resize-none text-sm text-foreground placeholder:text-muted-foreground min-h-[24px] max-h-[150px]"
                />
                <Button
                  onClick={() => sendMessage()}
                  disabled={!inputValue.trim() || isLoading}
                  size="icon"
                  className="rounded-full w-8 h-8 bg-primary hover:bg-primary/90 flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                RuralTime AI pode cometer erros. Verifique informações importantes.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
