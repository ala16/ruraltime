import React, { useState, useRef, useEffect } from 'react';
import { Search, X, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchResult {
  id: string;
  nome: string;
  cidade: string;
  estado: string;
  tipo_propriedade: string;
}

interface NavSearchProps {
  isScrolled: boolean;
}

export const NavSearch: React.FC<NavSearchProps> = ({ isScrolled }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        if (!query) setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [query]);

  const searchProperties = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .rpc('get_property_public_view')
        .limit(100);

      if (error) throw error;

      const q = searchQuery.toLowerCase().trim();
      const filtered = (data || [])
        .filter((p: any) =>
          p.nome?.toLowerCase().includes(q) ||
          p.cidade?.toLowerCase().includes(q) ||
          p.estado?.toLowerCase().includes(q)
        )
        .slice(0, 5)
        .map((p: any) => ({
          id: p.id,
          nome: p.nome,
          cidade: p.cidade,
          estado: p.estado,
          tipo_propriedade: p.tipo_propriedade,
        }));

      setResults(filtered);
      setIsOpen(true);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchProperties(query);
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
      setIsExpanded(false);
      setQuery('');
    }
  };

  const handleResultClick = (id: string) => {
    setIsOpen(false);
    setIsExpanded(false);
    setQuery('');
    navigate(`/propriedade/${id}`);
  };

  const handleExpandClick = () => {
    setIsExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div ref={containerRef} className="relative">
      {!isExpanded ? (
        <button
          onClick={handleExpandClick}
          className={`p-2 rounded-full transition-colors ${
            isScrolled
              ? 'text-rural-primary hover:bg-rural-accent/20'
              : 'text-white hover:bg-white/20'
          }`}
          aria-label={t('search.placeholder')}
        >
          <Search className="h-5 w-5" />
        </button>
      ) : (
        <div className="flex items-center gap-1">
          <div className={`flex items-center rounded-full px-3 py-1.5 transition-all ${
            isScrolled
              ? 'bg-rural-accent/30 border border-rural-primary/20'
              : 'bg-white/20 border border-white/30'
          }`}>
            <Search className={`h-4 w-4 mr-2 flex-shrink-0 ${
              isScrolled ? 'text-rural-primary' : 'text-white'
            }`} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (e.target.value.length >= 2) searchProperties(e.target.value);
                else { setResults([]); setIsOpen(false); }
              }}
              onKeyDown={handleKeyDown}
              placeholder={t('search.placeholder')}
              className={`bg-transparent outline-none text-sm w-36 lg:w-44 placeholder:opacity-60 ${
                isScrolled
                  ? 'text-rural-primary placeholder:text-rural-primary/50'
                  : 'text-white placeholder:text-white/60'
              }`}
            />
            {query && (
              <button onClick={() => { setQuery(''); setResults([]); setIsOpen(false); }}>
                <X className={`h-4 w-4 ${isScrolled ? 'text-rural-primary/60' : 'text-white/60'}`} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 left-0 w-72 bg-background/95 backdrop-blur-lg border border-border rounded-xl shadow-2xl z-[200] overflow-hidden">
          {loading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              {t('search.searching')}
            </div>
          ) : results.length > 0 ? (
            <div className="py-1">
              {results.map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleResultClick(r.id)}
                  className="w-full text-left px-4 py-3 hover:bg-accent/50 transition-colors flex items-start gap-3"
                >
                  <MapPin className="h-4 w-4 text-rural-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.nome}</p>
                    <p className="text-xs text-muted-foreground">
                      {r.cidade}, {r.estado} · {r.tipo_propriedade}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              {t('search.noResults')}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
