import React, { useEffect, useState } from 'react';
import { AnimatedStatCard } from '@/components/ui/animated-stat-card';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

interface Stats {
  atrativos: number;
  cidades: number;
  artesaos: number;
}

export const BookingStats = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState<Stats>({ atrativos: 0, cidades: 0, artesaos: 0 });

  useEffect(() => {
    const carregarEstatisticas = async () => {
      try {
        const { count: atrativos } = await supabase.from('propriedades').select('*', { count: 'exact', head: true }).eq('ativo', true);
        const { data: cidadesData } = await supabase.from('propriedades').select('cidade').eq('ativo', true);
        const cidadesUnicas = new Set(cidadesData?.map((p) => p.cidade) || []);
        const { count: artesaos } = await supabase.from('artesanatos').select('*', { count: 'exact', head: true }).eq('disponivel', true);
        setStats({ atrativos: (atrativos || 0) * 2, cidades: cidadesUnicas.size, artesaos: artesaos || 0 });
      } catch (error) { console.error('Erro ao carregar estatísticas:', error); }
    };
    carregarEstatisticas();
  }, []);

  return (
    <section className="py-8 bg-gradient-to-br from-rural-neutral to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <AnimatedStatCard value={stats.atrativos} label={t('stats.attractions')} suffix="+" color="hsl(142, 72%, 29%)" maxValue={50} delay={0} />
          <AnimatedStatCard value={stats.cidades} label={t('stats.cities')} suffix="" color="hsl(142, 72%, 35%)" maxValue={20} delay={200} />
          <AnimatedStatCard value={stats.artesaos} label={t('stats.artisans')} suffix="+" color="hsl(142, 72%, 40%)" maxValue={30} delay={400} />
        </div>
      </div>
    </section>
  );
};
