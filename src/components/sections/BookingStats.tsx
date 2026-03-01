import React, { useEffect, useState } from 'react';
import { AnimatedStatCard } from '@/components/ui/animated-stat-card';
import { supabase } from '@/integrations/supabase/client';

interface Stats {
  atrativos: number;
  cidades: number;
  artesaos: number;
  acessos: number;
}

export const BookingStats = () => {
  const [stats, setStats] = useState<Stats>({
    atrativos: 0,
    cidades: 0,
    artesaos: 0,
    acessos: 0,
  });

  useEffect(() => {
    const carregarEstatisticas = async () => {
      try {
        const { count: atrativos } = await supabase
          .from('propriedades')
          .select('*', { count: 'exact', head: true })
          .eq('ativo', true);

        const { data: cidadesData } = await supabase
          .from('propriedades')
          .select('cidade')
          .eq('ativo', true);

        const cidadesUnicas = new Set(cidadesData?.map((p) => p.cidade) || []);

        const { count: artesaos } = await supabase
          .from('artesanatos')
          .select('*', { count: 'exact', head: true })
          .eq('disponivel', true);

        const dataInicial = new Date('2025-01-01');
        const hoje = new Date();
        const diasPassados = Math.floor(
          (hoje.getTime() - dataInicial.getTime()) / (1000 * 60 * 60 * 24)
        );
        const totalAcessos = 3391 + diasPassados * 19;

        setStats({
          atrativos: (atrativos || 0) * 2,
          cidades: cidadesUnicas.size,
          artesaos: artesaos || 0,
          acessos: totalAcessos,
        });
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      }
    };

    carregarEstatisticas();
  }, []);

  return (
    <section className="py-8 bg-gradient-to-br from-rural-neutral to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <AnimatedStatCard
            value={stats.atrativos}
            label="Atrativos Turísticos Rurais"
            suffix="+"
            color="hsl(142, 72%, 29%)"
            maxValue={50}
            delay={0}
          />

          <AnimatedStatCard
            value={stats.cidades}
            label="Cidades Parceiras"
            suffix=""
            color="hsl(142, 72%, 35%)"
            maxValue={20}
            delay={200}
          />

          <AnimatedStatCard
            value={stats.artesaos}
            label="Artesãos Cadastrados"
            suffix="+"
            color="hsl(142, 72%, 40%)"
            maxValue={30}
            delay={400}
          />
        </div>
      </div>
    </section>
  );
};
