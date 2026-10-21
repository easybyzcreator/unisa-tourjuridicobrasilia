import React, { useState, useRef, useEffect } from 'react';
import { SlideItem } from '../types';
import { UniversoLudicoLogo, PatiTourLogo, BrazilPinIcon } from './Logos';
import { 
  Bus, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Plane, 
  Hotel, 
  Users, 
  Sparkles,
  Play,
  Pause,
  Film,
  QrCode,
  Copy,
  Scale,
  ExternalLink,
  Maximize2,
  Minimize2,
  X,
  AlertTriangle,
  Flame,
  Volume2,
  MessageCircle,
  Smartphone,
  Luggage,
  Shirt,
  Upload
} from 'lucide-react';

interface SlideViewerProps {
  slide: SlideItem;
  onCopyCode?: (code: string) => void;
  isCopied?: boolean;
}

export const SlideViewer: React.FC<SlideViewerProps> = ({ slide, onCopyCode, isCopied }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string>('https://www.youtube-nocookie.com/embed/viJEoar_6hQ?rel=0');
  const [hasVideoError, setHasVideoError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Immediate reset of scroll positions to top on slide change
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
      const scrollables = containerRef.current.querySelectorAll('.overflow-y-auto');
      scrollables.forEach(el => {
        el.scrollTop = 0;
      });
    }
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.scrollTop = 0;
    }
    window.scrollTo({ top: 0, left: 0 });
  }, [slide.id]);

  const handleVideoFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setVideoSrc(objectUrl);
      setHasVideoError(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full md:aspect-video bg-white overflow-y-auto md:overflow-hidden shadow-2xl rounded-2xl sm:rounded-3xl border border-slate-200 select-none flex flex-col justify-between scrollbar-thin">
      {/* Hidden File Input for video loading */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleVideoFileSelect} 
        accept="video/mp4,video/webm,video/quicktime" 
        className="hidden" 
      />

      {/* Dynamic Slide Content by Type */}
      {renderSlideContent(slide, onCopyCode, isCopied, {
        isVideoModalOpen,
        setIsVideoModalOpen,
        isVideoPlaying,
        setIsVideoPlaying,
        videoSrc,
        setVideoSrc,
        hasVideoError,
        setHasVideoError,
        onSelectVideoFile: () => fileInputRef.current?.click()
      })}

      {/* FULLSCREEN VIDEO MODAL */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-emerald-700/60 shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 bg-slate-900/90 border-b border-slate-800 text-white">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="bg-[#f59532] text-slate-950 font-black text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider">
                  Tour Jurídico
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-200 truncate max-w-[200px] sm:max-w-none">
                  Brasília – DF | Registro Oficial em Vídeo
                </span>
              </div>
              <button 
                onClick={() => {
                  setIsVideoModalOpen(false);
                  setIsVideoPlaying(false);
                }}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Fechar Vídeo"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Video Stage / YouTube Player */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              <iframe
                src="https://www.youtube-nocookie.com/embed/viJEoar_6hQ?autoplay=1&rel=0"
                title="Tour Jurídico Brasília"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface VideoControlsState {
  isVideoModalOpen: boolean;
  setIsVideoModalOpen: (open: boolean) => void;
  isVideoPlaying: boolean;
  setIsVideoPlaying: (playing: boolean) => void;
  videoSrc: string;
  setVideoSrc: (src: string) => void;
  hasVideoError: boolean;
  setHasVideoError: (error: boolean) => void;
  onSelectVideoFile: () => void;
}

function renderSlideContent(
  slide: SlideItem, 
  onCopyCode?: (code: string) => void, 
  isCopied?: boolean,
  videoControls?: VideoControlsState
) {
  switch (slide.type) {
    // SLIDE 1: CAPA
    case 'cover':
      return (
        <div className="relative w-full h-full bg-[#120a02] text-white p-5 sm:p-8 md:p-12 flex flex-col justify-between overflow-hidden">
          {/* Background Brasília Monument with reduced orange overlay so the photo stands out crisply */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://i.ibb.co/96zqmSG/bsb.png" 
              alt="Brasília" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-85" 
            />
            {/* Lighter, softer warm tint to reveal the background photo */}
            <div className="absolute inset-0 bg-linear-to-r from-[#f59532]/45 via-[#f59532]/30 to-[#083904]/40 backdrop-brightness-95"></div>
            <div className="absolute inset-0 bg-black/15"></div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#083904]/30 rounded-full blur-3xl pointer-events-none z-0"></div>

          {/* Top Tag */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
            <div className="bg-[#083904] text-white font-bold px-3.5 sm:px-5 py-2 rounded-xl sm:rounded-2xl shadow-lg flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 border border-emerald-600/40">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider font-extrabold text-[#f59532]">DATA DA VIAGEM:</span>
                <span className="text-xs sm:text-base md:text-lg font-black text-white">a definir</span>
              </div>
              <span className="hidden sm:inline text-emerald-500 font-bold">•</span>
              <span className="text-[11px] sm:text-sm md:text-base font-black text-amber-300">opção de 3 dias/2 noites ou 4 dias/3 noites</span>
            </div>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#083904] bg-white/95 px-3 py-1 rounded-full shadow-xs">
              Brasília – DF
            </span>
          </div>

          {/* Center Titles */}
          <div className="relative z-10 max-w-3xl my-auto py-2 sm:py-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-lg">
              Tour Jurídico <br />
              <span className="text-amber-200">em Brasília.</span>
            </h1>

            <div className="mt-4 sm:mt-6 flex items-center gap-3 sm:gap-4 bg-[#083904]/90 backdrop-blur-xs p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-emerald-500/40 max-w-xl shadow-2xl">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white/10 border border-[#f59532]/60 flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-[#f59532]" />
              </div>
              <div>
                <span className="text-sm sm:text-lg font-bold text-white block">Imersão Acadêmica</span>
                <span className="text-xs sm:text-sm font-medium text-amber-100">{slide.subtitle}</span>
              </div>
            </div>
          </div>

          {/* Footer Logos: Both Universo Lúdico and Pati Tour on the bottom left side */}
          <div className="relative z-10 flex items-center justify-between pt-3 sm:pt-4 border-t border-white/20">
            <div className="flex items-center gap-4 sm:gap-6 h-12 sm:h-16 md:h-20">
              <div className="transition-transform hover:scale-105">
                <UniversoLudicoLogo className="h-10 sm:h-14 md:h-18 drop-shadow-xl" />
              </div>
              <div className="transition-transform hover:scale-105">
                <PatiTourLogo className="h-9 sm:h-12 md:h-16 drop-shadow-xl" />
              </div>
            </div>
          </div>
        </div>
      );

    // SLIDE 2: A PROPOSTA DA VIAGEM
    case 'proposal':
      return (
        <div className="relative w-full h-full bg-white p-5 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto md:overflow-hidden">
          {/* Top Title */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#f59532]/15 flex items-center justify-center text-[#f59532] shadow-xs shrink-0">
              <Bus className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#083904] block">Apresentação Institucional</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                A proposta da viagem
              </h2>
            </div>
          </div>

          {/* Content & Visuals */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 my-auto items-center py-2">
            <div className="col-span-1 md:col-span-7 space-y-3 sm:space-y-4 text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed">
              <p className="font-semibold text-slate-900">
                <strong className="text-[#f59532] font-bold">Brasília</strong> reúne alguns dos espaços mais importantes da vida política, jurídica e institucional do país.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-slate-600">
                Nesta viagem acadêmica, <strong>estudantes de Direito</strong> terão a oportunidade de observar de perto o funcionamento de órgãos centrais da República, ampliando o repertório construído em sala de aula e vivenciando, de forma concreta, temas que fazem parte da formação jurídica contemporânea.
              </p>
              <p className="text-xs sm:text-sm md:text-base font-medium text-[#083904] bg-[#083904]/5 p-3 sm:p-3.5 rounded-xl border border-[#083904]/20">
                Mais do que uma viagem, esta é uma experiência de aproximação entre estudo, cidade, instituições e realidade profissional.
              </p>
            </div>

            <div className="col-span-1 md:col-span-5 bg-[#f59532]/10 p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-[#f59532]/30 grid grid-cols-2 md:grid-cols-1 gap-2.5 sm:gap-3">
              {/* Photo 1: Congresso Nacional */}
              <div className="relative h-24 sm:h-28 md:h-32 rounded-xl sm:rounded-2xl overflow-hidden shadow-md group">
                <img 
                  src="https://i.ibb.co/96zqmSG/bsb.png" 
                  alt="Congresso Nacional e Esplanada" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent z-10 flex items-end p-2 sm:p-3">
                  <span className="text-[10px] sm:text-xs font-bold text-white tracking-wide">Congresso Nacional e Esplanada</span>
                </div>
              </div>

              {/* Photo 2: Supremo Tribunal Federal e TSE */}
              <div className="relative h-24 sm:h-28 md:h-32 rounded-xl sm:rounded-2xl overflow-hidden shadow-md group">
                <img 
                  src="https://i.ibb.co/W4Xttw8k/patitour-email-18.png" 
                  alt="Supremo Tribunal Federal e TSE" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent z-10 flex items-end p-2 sm:p-3">
                  <span className="text-[10px] sm:text-xs font-bold text-white tracking-wide">Supremo Tribunal Federal e TSE</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-[11px] sm:text-xs">
            <span className="text-slate-400 font-medium">Turma Acadêmica de Direito</span>
            <span className="text-[#083904] font-semibold">Tour Jurídico Brasília</span>
          </div>
        </div>
      );

    // SLIDE 3: FOTO REAL TURMA STJ / STF (Restaurado conforme Imagem 2)
    case 'stj_photo':
      return (
        <div className="relative w-full h-full bg-white flex flex-col justify-between p-3.5 sm:p-6 md:p-8 overflow-y-auto md:overflow-hidden">
          {/* Header */}
          <div className="z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 bg-slate-50 px-3.5 sm:px-5 py-2 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-slate-700">
                Foto/Reprodução — Viagem Acadêmica | Brasília – DF
              </span>
            </div>
            <span className="bg-[#f59532] text-slate-950 text-[10px] sm:text-xs px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full font-black shadow-xs self-start sm:self-auto shrink-0">
              Supremo Tribunal Federal
            </span>
          </div>

          {/* Group Real Photo - Full clear view of students */}
          <div className="relative flex-1 min-h-[190px] sm:min-h-[280px] md:min-h-0 my-2 sm:my-2.5 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-lg bg-slate-900 flex items-center justify-center">
            <img 
              src="/stj_turma_hd.jpg" 
              alt="Turma de Direito no Supremo Tribunal Federal" 
              className="w-full h-full object-cover object-[center_55%] transition-transform duration-300 hover:scale-101"
              style={{ imageRendering: 'auto' }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/stj_turma.jpg';
              }}
            />
          </div>

          {/* Clean Footer Bar with Information Below the Photo */}
          <div className="z-10 bg-[#083904] p-3 sm:p-3.5 rounded-xl border border-emerald-600/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-md text-white">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#f59532] flex items-center justify-center text-slate-950 font-black text-xs sm:text-sm shrink-0 shadow-xs">
                ✓
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-white">Vivência Real nos Tribunais Superiores</h4>
                <p className="text-[10px] sm:text-xs text-emerald-200">
                  Estudantes e professores em visita técnica e sessão no <strong>Supremo Tribunal Federal</strong>.
                </p>
              </div>
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold text-[#f59532] bg-emerald-950/80 px-2.5 sm:px-3 py-1 rounded-lg border border-emerald-700/50 shrink-0 self-start sm:self-auto">
              Cerimonial do STF
            </span>
          </div>
        </div>
      );

    // SLIDE 4: POR QUE BRASÍLIA FAZ SENTIDO (Restaurado conforme Imagem 2)
    case 'why_brasilia':
      return (
        <div className="relative w-full h-full bg-white p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto md:overflow-hidden">
          {/* Top Section: Title & Key Quote */}
          <div className="space-y-1 sm:space-y-1.5">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Por que Brasília faz sentido para estudantes de Direito
            </h2>
            <p className="text-xs sm:text-sm md:text-base font-semibold text-[#f59532] italic leading-snug">
              Brasília permite observar, em escala real, como se articulam instituições centrais da vida pública brasileira.
            </p>
          </div>

          {/* Middle Section: Text Explanations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4 my-auto text-xs sm:text-sm text-slate-700 leading-relaxed py-1">
            <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200/80">
              <p>
                Para estudantes de Direito, a cidade oferece uma oportunidade rara de acompanhar de perto espaços ligados à produção das leis, ao funcionamento do sistema de justiça, à organização do Estado e à dinâmica política do país.
              </p>
            </div>
            <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200/80">
              <p>
                Ao longo da viagem, será possível compreender melhor como esses órgãos se relacionam, como atuam na prática e como questões jurídicas, políticas e institucionais ganham forma no cotidiano da capital federal.
              </p>
            </div>
          </div>

          {/* Bottom Section: Full Horizontal Photo Container with Badge */}
          <div className="relative w-full h-44 sm:h-56 md:h-64 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border-2 border-slate-200 bg-slate-900 flex items-center justify-center group">
            <img 
              src="/stf_plenario_hd.jpg" 
              alt="STF e Tribunais Superiores - Supremo Tribunal Federal" 
              className="w-full h-full object-cover object-[center_35%] transition-transform duration-500 group-hover:scale-101"
              style={{ imageRendering: 'auto' }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent flex items-end justify-between p-3 sm:p-4 z-10">
              <div>
                <span className="inline-block bg-[#f59532] text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full mb-1 shadow-xs">
                  Imersão Prática
                </span>
                <h4 className="text-sm sm:text-base md:text-lg font-bold text-white">
                  STF e Tribunais Superiores
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-200">Supremo Tribunal Federal</p>
              </div>
              <span className="hidden sm:inline-block text-[10px] md:text-xs font-bold text-[#f59532] bg-black/60 px-3 py-1 rounded-lg border border-amber-500/40 backdrop-blur-xs">
                Registro Oficial no Plenário
              </span>
            </div>
          </div>
        </div>
      );

    // SLIDE 5: EXPERIÊNCIAS QUE VOCÊ VAI VIVER
    case 'experiences':
      return (
        <div className="relative w-full h-full bg-white p-4 sm:p-6 md:p-10 flex flex-col justify-between overflow-y-auto md:overflow-hidden">
          {/* Header */}
          <div className="border-b border-slate-100 pb-2">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#083904] text-center block">
              Experiência Completa
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight text-center">
              O que você vai viver nesta experiência
            </h2>
          </div>

          {/* 6 Experience Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 my-auto max-w-5xl mx-auto w-full py-2">
            {slide.bullets?.map((bullet, idx) => {
              const isGreen = idx % 2 === 0;
              return (
                <div 
                  key={idx}
                  className={`flex items-center px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                    isGreen 
                      ? 'bg-emerald-50/30 text-slate-800 border-2 border-[#083904]/70 hover:border-[#083904] hover:bg-emerald-50/60' 
                      : 'bg-orange-50/30 text-slate-800 border-2 border-[#f59532]/70 hover:border-[#f59532] hover:bg-orange-50/60'
                  }`}
                >
                  <span className="font-bold text-xs sm:text-sm md:text-base leading-snug text-slate-800">{bullet}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2 text-[11px] sm:text-xs text-slate-500 border-t border-slate-200">
            <span>Viagem Pedagógica e Acadêmica - Imersão Prática</span>
          </div>
        </div>
      );

    // SLIDE 6: VÍDEO & MEMÓRIA DA VIAGEM
    case 'video_memory':
      return (
        <div className="relative w-full h-full bg-white p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto md:overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center h-full my-auto">
            {/* Real Interactive YouTube Video Player */}
            <div className="col-span-1 md:col-span-8 flex flex-col justify-center">
              <div className="w-full bg-slate-950 p-2 sm:p-2.5 md:p-3 rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-3 border-[#083904] relative overflow-hidden transition-all duration-300 hover:shadow-emerald-950/20 hover:border-emerald-600">
                <div className="relative bg-black aspect-video rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-center text-white">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/viJEoar_6hQ?rel=0"
                    title="Tour Jurídico Brasília"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0 rounded-xl sm:rounded-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Right Instructions */}
            <div className="col-span-1 md:col-span-4 space-y-3 sm:space-y-4">
              <div className="bg-amber-50/80 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-amber-200/80 shadow-xs">
                <div className="flex items-center gap-2 text-[#083904] font-black text-xs sm:text-sm mb-1">
                  <Film className="w-4 h-4 text-[#f59532]" />
                  Registro com Vídeo-maker
                </div>
                <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed">
                  Em <strong>todas nossas viagens</strong>, embarcamos com o grupo um <strong>vídeo-maker</strong> que fará o registro completo das atividades e dos momentos acadêmicos.
                </p>
              </div>

              <button
                onClick={() => videoControls?.setIsVideoModalOpen(true)}
                className="w-full bg-[#083904] hover:bg-[#0b4d06] text-[#f59532] hover:text-white font-bold py-2.5 sm:py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs shadow-sm transition-all cursor-pointer min-h-[44px]"
              >
                <Maximize2 className="w-4 h-4" />
                <span>Expandir Vídeo em Tela Cheia</span>
              </button>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-600">
                <p className="text-[10px] sm:text-[11px] leading-snug">
                  🎬 <strong>Vídeo Oficial da Viagem:</strong> Reprodução integrada diretamente no slide, com controles de reprodução, som e tela cheia.
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    // SLIDE 7: VISÃO GERAL DA VIAGEM
    case 'overview_days':
      return (
        <div className="relative w-full h-full bg-slate-50 p-4 sm:p-6 md:p-10 flex flex-col justify-between overflow-y-auto md:overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <div>
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#083904] block">Cronograma Sintético</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Visão geral da viagem
              </h2>
            </div>
            <span className="text-xs font-bold text-[#083904] bg-[#083904]/10 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl">3 Dias / 2 Noites</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 my-auto py-2">
            {/* DIA 1 - Congresso Nacional */}
            <div className="bg-white p-3.5 sm:p-4 md:p-5 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#f59532] transition-colors group">
              <div>
                <span className="bg-[#083904] text-white font-extrabold text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full inline-block mb-2 sm:mb-3">
                  Dia 1
                </span>
                <div className="h-24 sm:h-28 md:h-32 rounded-xl sm:rounded-2xl overflow-hidden shadow-md relative mb-2 sm:mb-3">
                  <img 
                    src="https://i.ibb.co/96zqmSG/bsb.png" 
                    alt="Congresso Nacional" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent flex items-end p-2 sm:p-2.5">
                    <span className="text-[11px] sm:text-xs font-bold text-white">Congresso Nacional</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  Chegada, Praça dos Três Poderes, Panteão dos Heróis da Nação, almoço no restaurante Taioba, visita ao Congresso Nacional, gabinetes e comissões
                </p>
              </div>
            </div>

            {/* DIA 2 - Palácio Itamaraty / Catedral */}
            <div className="bg-white p-3.5 sm:p-4 md:p-5 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#f59532] transition-colors group">
              <div>
                <span className="bg-[#083904] text-white font-extrabold text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full inline-block mb-2 sm:mb-3">
                  Dia 2
                </span>
                <div className="h-24 sm:h-28 md:h-32 rounded-xl sm:rounded-2xl overflow-hidden shadow-md relative mb-2 sm:mb-3">
                  <img 
                    src="https://i.ibb.co/W4GwcP9F/Capa-para-facebook-frase-motivacional-minimalista-preto-e-branco-14.png" 
                    alt="Catedral Metropolitana" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent flex items-end p-2 sm:p-2.5">
                    <span className="text-[11px] sm:text-xs font-bold text-white">Catedral Metropolitana</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  Palácio Itamaraty, Instituto Rio Branco, almoço no Restaurante-Escola do SENAC, Memorial JK e TSE - Tribunal Superior Eleitoral
                </p>
              </div>
            </div>

            {/* DIA 3 - Conselho Federal da OAB */}
            <div className="bg-white p-3.5 sm:p-4 md:p-5 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#f59532] transition-colors group">
              <div>
                <span className="bg-[#083904] text-white font-extrabold text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full inline-block mb-2 sm:mb-3">
                  Dia 3
                </span>
                <div className="h-24 sm:h-28 md:h-32 rounded-xl sm:rounded-2xl overflow-hidden shadow-md relative mb-2 sm:mb-3">
                  <img 
                    src="https://i.ibb.co/39myYhkG/Capa-para-facebook-frase-motivacional-minimalista-preto-e-branco-15.png" 
                    alt="Conselho Federal da OAB" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent flex items-end p-2 sm:p-2.5">
                    <span className="text-[11px] sm:text-xs font-bold text-white">Conselho Federal da OAB</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  Catedral Metropolitana, visita guiada ao Conselho Federal da OAB - Ordem dos Advogados do Brasil, almoço no Tia Zélia, sessão do pleno do STF - Supremo Tribunal Federal e retorno
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-400 pt-2 border-t border-slate-200">
            <span>Roteiro Pedagógico Exclusivo de Direito</span>
            <span className="text-[#083904] font-semibold">Brasília – DF</span>
          </div>
        </div>
      );

    // SLIDES DETALHAMENTO DIAS 1, 2, 3
    case 'day_detail':
      return (
        <div className="relative w-full h-full bg-white p-4 sm:p-6 md:p-10 flex flex-col justify-between overflow-y-auto md:overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2.5 sm:gap-4">
              <span className="bg-[#083904] text-white font-black text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl shadow-xs">
                Dia {Number(slide.dayNumber)}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                {slide.title}
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-400">Jornada Jurídica</span>
          </div>

          {/* Body Columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 my-auto items-start py-2">
            {/* Left Main Itinerary */}
            <div className="col-span-1 md:col-span-7 space-y-2.5 sm:space-y-3">
              {slide.bullets?.map((b, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-slate-700 text-xs sm:text-sm leading-relaxed">
                  <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#f59532] shrink-0 mt-1.5"></div>
                  <span>{b}</span>
                </div>
              ))}
            </div>

            {/* Right Options Box */}
            <div className="col-span-1 md:col-span-5 bg-amber-50/80 border-2 border-[#f59532]/50 p-4 sm:p-5 rounded-2xl sm:rounded-3xl text-slate-950 shadow-xs">
              <h4 className="font-black text-sm sm:text-base text-[#083904] mb-2.5 flex items-center gap-2">
                {slide.dayNumber === '03' || slide.id === 10 ? 'Retorno' : 'Jantar livre, com opções à sua escolha'}
              </h4>
              <div className="space-y-2 text-xs sm:text-sm">
                {slide.options?.map((opt, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-white p-2 sm:p-2.5 rounded-xl font-semibold text-slate-800 border border-amber-200/60 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-[#083904] shrink-0 mt-0.5" />
                    <span>{opt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-400 pt-2 border-t border-slate-100">
            <span>Roteiro Pedagógico Exclusivo de Direito</span>
            <span className="text-[#083904] font-semibold">Brasília – DF</span>
          </div>
        </div>
      );

    // SLIDE: ALTERNATIVA DE EMBARQUE NO DOMINGO
    case 'sunday_alternative':
      return (
        <div className="relative w-full h-full bg-white p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto md:overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2.5 sm:gap-4">
              <span className="bg-[#083904] text-white font-black text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl shadow-xs">
                Logística & Conforto
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Alternativa de embarque no domingo
              </h2>
            </div>
            <span className="text-xs font-bold text-[#083904] bg-[#083904]/10 px-2.5 sm:px-3 py-1 rounded-xl">Opção Diferenciada</span>
          </div>

          {/* Body Columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-6 my-auto items-stretch py-1 sm:py-2">
            {/* Left 3 Informative Cards */}
            <div className="col-span-1 md:col-span-7 space-y-2.5 sm:space-y-3 flex flex-col justify-center">
              {/* Card 1: Voo & Acomodação */}
              <div className="bg-slate-50 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs hover:border-[#f59532]/60 transition-colors">
                <div className="flex items-center gap-2 text-[#083904] font-black text-xs sm:text-sm mb-1">
                  <Plane className="w-4 h-4 text-[#f59532] shrink-0" />
                  <span>Embarque no Domingo à Noite & Check-in na Véspera</span>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                  Além do embarque na segunda-feira pela manhã, o roteiro pode ser planejado com saída no domingo à noite, em voo previsto entre 19h e 20h. A chegada a Brasília ocorreria aproximadamente entre 21h30 e 22h30, permitindo o deslocamento e acomodação do grupo no Bay Park Flat Hotel ainda na noite anterior.
                </p>
              </div>

              {/* Card 2: Jantar & Flexibilidade */}
              <div className="bg-slate-50 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-200 shadow-2xs hover:border-[#f59532]/60 transition-colors">
                <div className="flex items-center gap-2 text-[#083904] font-black text-xs sm:text-sm mb-1">
                  <Hotel className="w-4 h-4 text-[#f59532] shrink-0" />
                  <span>Jantar no Aeroporto & Melhor Cotação</span>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                  O jantar poderia ser realizado no próprio aeroporto, seja antes do embarque, ainda em São Paulo, seja após a chegada a Brasília. Essa definição pode ser ajustada conforme o melhor horário e o melhor valor obtido na cotação da parte aérea.
                </p>
              </div>

              {/* Card 3: Vantagem Acadêmica / Descanso */}
              <div className="bg-emerald-50/70 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-emerald-300/80 shadow-2xs">
                <div className="flex items-center gap-2 text-[#083904] font-black text-xs sm:text-sm mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#083904] shrink-0" />
                  <span>Mais Energia e Rendimento Pedagógico</span>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-800 leading-relaxed font-medium">
                  Com essa alternativa, os estudantes já acordam em Brasília na segunda-feira, descansados e prontos para iniciar a programação pedagógica pela manhã, sem o desgaste de chegar ao aeroporto de madrugada e começar as atividades logo após o voo.
                </p>
              </div>
            </div>

            {/* Right Card: Impacto Financeiro / Investimento */}
            <div className="col-span-1 md:col-span-5 flex flex-col justify-between bg-amber-50/90 border-2 border-[#f59532]/60 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl shadow-md text-left">
              <div>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#083904] bg-[#083904]/10 px-2.5 py-1 rounded-md inline-block mb-2">
                  Condição Financeira da Opção
                </span>
                <h3 className="text-base sm:text-lg md:text-xl font-black text-slate-900 leading-tight">
                  Acréscimo no Valor Total
                </h3>
                
                <div className="my-2.5 sm:my-3 bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-amber-200/80 shadow-xs space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold text-slate-600">Total adicional:</span>
                    <span className="text-xl sm:text-2xl font-black text-[#083904]">+ R$ 300,00</span>
                  </div>
                  <div className="pt-1.5 border-t border-slate-100 flex items-baseline justify-between">
                    <span className="text-xs font-bold text-slate-600">Apenas por parcela:</span>
                    <span className="text-base sm:text-lg font-black text-[#f59532]">+ ~R$ 25,00/mês</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold block text-right">(em até 12x sem juros no cartão)</span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  Essa opção deve acrescentar cerca de <strong>R$ 300,00</strong> ao valor total da viagem, o que representa aproximadamente <strong>R$ 25,00</strong> a mais por parcela em um parcelamento de 12 vezes sem juros.
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-amber-200/70 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Diária extra + Noite no hotel</span>
                <span className="font-bold text-[#083904]">Bay Park Flat Hotel</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-400 pt-2 border-t border-slate-100">
            <span>Roteiro Pedagógico Exclusivo de Direito</span>
            <span className="text-[#083904] font-semibold">Brasília – DF</span>
          </div>
        </div>
      );

    // SLIDE: INCLUSO / NÃO INCLUSO
    case 'inclusions':
      return (
        <div className="relative w-full h-full bg-white p-4 sm:p-6 md:p-10 flex flex-col justify-between overflow-y-auto md:overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 my-auto py-2">
            {/* ESTÁ INCLUSO */}
            <div className="bg-[#083904] text-white p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl shadow-md flex flex-col justify-between border border-emerald-700/40">
              <div>
                <div className="flex items-center gap-2 mb-3 sm:mb-4 border-b border-emerald-700/60 pb-2 sm:pb-3">
                  <span className="bg-[#f59532] text-slate-950 font-black text-[10px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase">
                    está incluso
                  </span>
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#f59532]" />
                </div>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-emerald-100">
                  {slide.bullets?.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#f59532] font-bold">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* NÃO ESTÁ INCLUSO */}
            <div className="bg-orange-50/80 border-2 border-[#f59532]/60 text-slate-900 p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3 sm:mb-4 border-b border-orange-200 pb-2 sm:pb-3">
                  <span className="bg-[#f59532] text-slate-950 font-black text-[10px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase shadow-xs">
                    não está incluso
                  </span>
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#c76e14]" />
                </div>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm font-semibold text-slate-800">
                  {slide.options?.map((opt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#c76e14] font-bold">•</span>
                      <span>{opt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-orange-200/80 text-[10px] sm:text-xs text-slate-500">
                *Consulte franquias adicionais de bagagem conforme necessidade individual.
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-400 pt-2 border-t border-slate-100">
            <span>Relação Transparente de Serviços</span>
            <PatiTourLogo className="h-5 sm:h-6" />
          </div>
        </div>
      );

    // SLIDE: FOTO BAY PARK HOTEL (Original Layout & Fotos)
    case 'hotel_photo':
      return (
        <div className="relative w-full h-full bg-white flex flex-col justify-between p-4 sm:p-6 md:p-8 overflow-y-auto md:overflow-hidden">
          {/* Header */}
          <div className="z-10 flex flex-wrap items-center justify-between gap-2 bg-slate-50 px-3.5 sm:px-5 py-2 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 sm:gap-3">
              <Hotel className="w-4 h-4 sm:w-5 sm:h-5 text-[#f59532]" />
              <h3 className="text-xs sm:text-base md:text-lg font-bold text-slate-900 truncate">Bay Park Flat Hotel</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs bg-[#083904] text-white px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full font-bold shadow-xs">
                Acomodação em quarto quádruplo
              </span>
              <span className="text-[10px] sm:text-xs bg-[#f59532] text-slate-950 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full font-black shadow-xs shrink-0">
                Hospedagem Confortável
              </span>
            </div>
          </div>

          {/* Hotel 3 Photos Grid */}
          <div className="relative flex-1 min-h-[220px] sm:min-h-[240px] md:min-h-0 my-2.5 sm:my-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
            <div className="relative h-48 sm:h-full rounded-xl sm:rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md group">
              <img 
                src="https://i.ibb.co/WvWk9nSG/Whats-App-Image-2026-09-17-at-2-57-55-PM.jpg" 
                alt="Bay Park Flat Hotel - Quarto" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="relative h-48 sm:h-full rounded-xl sm:rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md group">
              <img 
                src="https://i.ibb.co/MD42xxvR/Whats-App-Image-2026-09-17-at-2-58-05-PM.jpg" 
                alt="Bay Park Flat Hotel - Flat e Sala" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="relative h-48 sm:h-full rounded-xl sm:rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md group">
              <img 
                src="https://i.ibb.co/SXvJxL5x/Whats-App-Image-2026-09-17-at-2-58-19-PM.jpg" 
                alt="Bay Park Flat Hotel - Lazer e Área Externa" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Information cleanly organized below the image */}
          <div className="z-10 bg-[#083904] text-white p-3 sm:p-3.5 rounded-xl border border-emerald-600/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-md">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#f59532] flex items-center justify-center text-slate-950 font-black text-xs sm:text-sm shrink-0 shadow-xs">
                🛏️
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-white">Apartamentos em estilo Flat</h4>
                <p className="text-[10px] sm:text-[11px] md:text-xs text-emerald-200">
                  Apartamentos em estilo Flat, com sala, cozinha, geladeira, banheiro privativo e ar-condicionado
                </p>
              </div>
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold text-[#f59532] bg-emerald-950/80 px-2.5 sm:px-3 py-1 rounded-lg border border-emerald-700/50 shrink-0 self-start sm:self-auto">
              Café da manhã incluso nos dias 2 e 3
            </span>
          </div>
        </div>
      );

    // SLIDE: APP EXCLUSIVO - GUIA DE BOLSO DA VIAGEM
    case 'travel_app_guide':
      return (
        <div className="relative w-full h-full bg-white p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto md:overflow-hidden">
          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#083904]/10 text-[#083904] px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3 text-[#f59532]" />
                BÔNUS EXCLUSIVO - TECNOLOGIA NA VIAGEM
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Seu Guia <span className="text-[#f59532]">Digital de Viagem</span>
              </h2>
            </div>
            <PatiTourLogo className="h-6 sm:h-8 shrink-0" />
          </div>

          {/* Main Grid: Left content, Right Mobile Mockup */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 my-auto items-center py-2">
            {/* Left Column: App Features & Links */}
            <div className="col-span-1 md:col-span-7 space-y-2.5 sm:space-y-3">
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                Você ganha um aplicativo exclusivo para instalar no celular que será o seu <strong>guia de bolso oficial</strong> durante toda a experiência em Brasília:
              </p>

              {/* 4 Feature Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                <div className="bg-slate-50 hover:bg-emerald-50/40 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-lg bg-[#083904] text-[#f59532] flex items-center justify-center shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                    </div>
                    <strong className="text-xs sm:text-sm font-bold text-slate-900">Roteiro Dia a Dia</strong>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-600 leading-snug">
                    Programação completa com horários, endereços e detalhes sobre as visitas.
                  </p>
                </div>

                <div className="bg-slate-50 hover:bg-emerald-50/40 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-lg bg-[#083904] text-[#f59532] flex items-center justify-center shrink-0">
                      <Shirt className="w-3.5 h-3.5" />
                    </div>
                    <strong className="text-xs sm:text-sm font-bold text-slate-900">Orientação sobre trajes</strong>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-600 leading-snug">
                    Orientação clara sobre as vestimentas adequadas para cada visita e dicas para garantir seu conforto.
                  </p>
                </div>

                <div className="bg-slate-50 hover:bg-emerald-50/40 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-lg bg-[#f59532] text-slate-950 flex items-center justify-center shrink-0">
                      <Luggage className="w-3.5 h-3.5" />
                    </div>
                    <strong className="text-xs sm:text-sm font-bold text-slate-900">O que Levar na Mala</strong>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-600 leading-snug">
                    Checklist interativo de bagagem (mala de até 10kg + mochila) para não esquecer nenhum item.
                  </p>
                </div>

                <div className="bg-slate-50 hover:bg-emerald-50/40 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-lg bg-[#f59532] text-slate-950 flex items-center justify-center shrink-0">
                      <Plane className="w-3.5 h-3.5" />
                    </div>
                    <strong className="text-xs sm:text-sm font-bold text-slate-900">Aeroportos e Voos</strong>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-600 leading-snug">
                    Informações das passagens aéreas, localizador, cartão de embarque e contatos da coordenação da viagem
                  </p>
                </div>
              </div>

              {/* Action Link Button */}
              <div className="pt-1">
                <a
                  href="https://guiadebolso-estaciodesa-bsb.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#083904] hover:bg-[#0b4d06] text-[#f59532] hover:text-white font-black py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer border border-emerald-600/40"
                >
                  <Smartphone className="w-4 h-4 text-[#f59532]" />
                  <span>Experimente o App - Clique para abrir</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </div>

            {/* Right Column: Smartphone Mockup */}
            <div className="col-span-1 md:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-44 sm:w-52 md:w-60 bg-slate-950 rounded-[32px] sm:rounded-[38px] p-2 sm:p-2.5 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-700/60 flex flex-col justify-between transform hover:scale-[1.02] transition-transform">
                {/* Dynamic Island */}
                <div className="absolute top-2.5 sm:top-3 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-3.5 sm:h-4 bg-black rounded-full z-20 flex items-center justify-end pr-1.5 shadow-xs">
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-slate-900 border border-slate-700"></div>
                </div>

                {/* Screenshot inside Phone */}
                <div className="relative w-full aspect-[9/18.5] rounded-[24px] sm:rounded-[30px] overflow-hidden bg-slate-900 border border-slate-800">
                  <img 
                    src="https://i.ibb.co/BHBZTzG8/Whats-App-Image-2026-09-02-at-11-01-24-AM.jpg" 
                    alt="Modelo do App Guia de Bolso" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              <span className="text-[10px] font-bold text-[#083904] mt-2 flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-[#083904]" />
                Instalação fácil e rápida, no seu celular - PWA
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 pt-2 border-t border-slate-100">
            <span>Tecnologia & Acompanhamento em Tempo Real</span>
            <span className="text-[#083904] font-semibold">Tour Jurídico Brasília • 2026</span>
          </div>
        </div>
      );

    // SLIDE: MAIS DO QUE UMA VIAGEM, UMA EXPERIÊNCIA ACADÊMICA
    case 'academic_quote':
      return (
        <div className="relative w-full h-full bg-white p-5 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto md:overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center h-full my-auto py-2">
            {/* Left Image */}
            <div className="col-span-1 md:col-span-5 h-44 sm:h-56 md:h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200 group">
              <img 
                src="https://i.ibb.co/d4g7knWp/IMG-20260820-WA0043.jpg" 
                alt="Formação Jurídica & Cidadania" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Right Content */}
            <div className="col-span-1 md:col-span-7 space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Mais do que uma viagem, <br />
                <span className="text-[#f59532]">uma experiência acadêmica</span>
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed">
                Ao longo de três dias, a proposta busca aproximar os estudantes de Direito de instituições, espaços e dinâmicas que fazem parte da vida pública brasileira.
              </p>

              <p className="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed">
                Mais do que visitar lugares emblemáticos, a viagem convida o grupo a observar como temas discutidos na graduação ganham forma concreta na capital federal.
              </p>

              <div className="text-xs sm:text-sm md:text-base font-semibold text-[#083904] bg-emerald-50/60 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-emerald-600/30">
                Trata-se de uma experiência que articula formação acadêmica, repertório institucional, convivência universitária e leitura crítica da cidade.
              </div>
            </div>
          </div>
        </div>
      );

    // SLIDE: INVESTIMENTO E CONDIÇÕES
    case 'investment':
      return (
        <div className="relative w-full h-full bg-white p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto md:overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              INVESTIMENTO <span className="text-sm sm:text-lg md:text-xl font-bold text-slate-500 font-normal">e condições de adesão</span>
            </h2>
            <PatiTourLogo className="h-6 sm:h-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-6 my-auto items-center py-1 sm:py-2">
            {/* Left Conditions */}
            <div className="col-span-1 md:col-span-7 space-y-2.5 sm:space-y-3">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="bg-[#f59532]/20 text-[#083904] p-2 rounded-xl sm:rounded-2xl shrink-0">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#f59532]" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs text-slate-500 font-semibold block">Período de Adesão</span>
                  <span className="text-base sm:text-xl font-black text-slate-900">a definir</span>
                </div>
              </div>

              <div className="bg-[#f59532]/10 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#f59532]/30">
                <span className="text-[10px] sm:text-xs font-bold text-[#083904] uppercase block mb-0.5">Parcelamento facilitado</span>
                <span className="text-xs sm:text-base font-black text-slate-900">à vista ou em até 12x sem juros no cartão de crédito</span>
              </div>

              {/* Campo de Observação solicitado */}
              <div className="bg-amber-50 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-amber-300 text-amber-950 text-[11px] sm:text-xs font-semibold leading-relaxed">
                <strong>Obs:</strong> valores prévios, somente para apresentação desse orçamento inicial e análise para aprovação do roteiro.
              </div>

              <div className="text-[11px] sm:text-xs text-slate-600 space-y-1.5 leading-relaxed bg-slate-50 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200">
                <p className="font-medium text-slate-800">
                  A viagem será realizada em parceria entre PatiTour e Universo Lúdico, com a UNISA - Universidade Santo Amaro. Orientações práticas, finais e dados de embarque serão compartilhados oportunamente com os participantes confirmados.
                </p>
                <div className="pt-1.5 border-t border-slate-200/80 text-[10px] sm:text-[11px] text-slate-500 space-y-0.5">
                  <p>• A programação poderá sofrer ajustes de horário, ordem de visitas ou logística, de acordo com confirmações institucionais e necessidades do grupo.</p>
                  <p>• Algumas atividades dependem de confirmação formal dos órgãos visitados e podem ser adaptadas sem prejuízo do sentido acadêmico da proposta.</p>
                </div>
              </div>
            </div>

            {/* Right Pricing Cards */}
            <div className="col-span-1 md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2 sm:gap-2.5">
              {/* Card 1: Taxa de Inscrição */}
              <div className="bg-[#083904] text-white p-3 sm:p-3.5 rounded-2xl shadow-md border border-emerald-700/40">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-emerald-200 block">Taxa de inscrição</span>
                  <span className="text-[10px] sm:text-xs bg-emerald-900/80 text-emerald-200 px-2 py-0.5 rounded-md font-semibold">à vista no Pix</span>
                </div>
                <span className="text-xl sm:text-2xl font-black text-[#f59532] block mt-0.5">R$ 150,00</span>
              </div>

              {/* Quadro 1: Saída segunda-feira pela manhã */}
              <div className="bg-[#f59532] text-slate-950 p-3 sm:p-3.5 rounded-2xl shadow-md border border-[#e28322]">
                <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-amber-950 block mb-0.5">VALOR INDIVIDUAL</span>
                <span className="text-xl sm:text-2xl font-black text-slate-950 block tracking-tight">12x R$ 261,74</span>
                <div className="mt-1.5 space-y-0.5 text-[10px] sm:text-[11px] font-semibold text-slate-950 border-t border-amber-600/30 pt-1.5 leading-snug">
                  <div className="font-bold flex items-center gap-1 text-slate-950">
                    <span>✈️ Saída segunda-feira pela manhã</span>
                  </div>
                  <div className="text-slate-900 font-medium">3 dias de atividades | 2 noites em Brasília</div>
                  <div className="text-amber-950 font-medium">Início das atividades após o desembarque</div>
                </div>
              </div>

              {/* Quadro 2: Saída domingo à noite */}
              <div className="bg-[#f59532] text-slate-950 p-3 sm:p-3.5 rounded-2xl shadow-md border border-[#e28322]">
                <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-amber-950 block mb-0.5">VALOR INDIVIDUAL</span>
                <span className="text-xl sm:text-2xl font-black text-slate-950 block tracking-tight">12x R$ 286,74</span>
                <div className="mt-1.5 space-y-0.5 text-[10px] sm:text-[11px] font-semibold text-slate-950 border-t border-amber-600/30 pt-1.5 leading-snug">
                  <div className="font-bold flex items-center gap-1 text-slate-950">
                    <span>✈️ Saída domingo à noite</span>
                  </div>
                  <div className="text-slate-900 font-medium">3 dias de atividades | 3 noites em Brasília</div>
                  <div className="text-amber-950 font-medium">Início das atividades com o grupo descansado</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-400 pt-1.5 border-t border-slate-100">
            <span>Adesão oficial da turma acadêmica UNISA</span>
            <span>Vagas restritas por ordem de confirmação</span>
          </div>
        </div>
      );

    // SLIDE: COMO INICIAR A SUA RESERVA
    case 'reservation_steps':
      return (
        <div className="relative w-full h-full bg-white p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto md:overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-2.5 gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Como fazer sua reserva
              </h2>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1">
                <span className="text-[10px] sm:text-xs font-bold text-[#083904] bg-emerald-100/90 border border-emerald-300/60 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                  📅 DATA DA VIAGEM: <strong>a definir</strong>
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 whitespace-nowrap">
                  opção de 3 dias/2 noites ou 4 dias/3 noites
                </span>
              </div>
            </div>
            <div className="bg-[#f59532] text-slate-950 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-black text-[10px] sm:text-xs shadow-xs self-start sm:self-auto">
              Vagas Limitadas
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-6 my-auto items-center py-1 sm:py-2">
            {/* Steps */}
            <div className="col-span-1 md:col-span-7 space-y-2 sm:space-y-2.5">
              <div className="bg-slate-50 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border border-slate-200">
                <strong className="text-[#083904] text-xs sm:text-sm block font-bold">ETAPA 1: Taxa de Reserva</strong>
                <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed mt-0.5">
                  Pagamento da Taxa de Reserva <strong>R$ 150,00</strong> que será liberado após a reunião Lembrando que precisamos de 30 interessados para que a viagem aconteça (valor não reembolsável).
                </p>
              </div>

              <div className="bg-slate-50 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border border-slate-200">
                <strong className="text-[#083904] text-xs sm:text-sm block font-bold">ETAPA 2: Confirmação das 30 Vagas</strong>
                <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed mt-0.5">
                  Encerraremos as 30 vagas assim que houverem confirmação dos 30 pagamentos.
                </p>
              </div>

              <div className="bg-slate-50 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border border-slate-200">
                <strong className="text-[#083904] text-xs sm:text-sm block font-bold">ETAPA 3: Contrato e Pagamento</strong>
                <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed mt-0.5">
                  Preenchimento do contrato e pagto via cartão.
                </p>
              </div>

              <div className="text-[10px] sm:text-[11px] text-[#083904] bg-emerald-50/80 p-2 sm:p-2.5 rounded-xl border border-emerald-600/30 leading-relaxed">
                <strong>Atenção:</strong> A reserva só é concluída com o pagamento da taxa inicial e só é realmente efetivada com o cumprimento do prazo de assinatura de contrato e pagamento via cartão de crédito.
              </div>

              <div className="text-[10px] sm:text-[11px] text-slate-800 bg-amber-50/90 p-2 sm:p-2.5 rounded-xl border border-amber-300/80 leading-relaxed">
                <strong className="text-[#c76e14] block mb-0.5">Observação:</strong>
                A viagem considera um grupo <strong>mínimo de 30 participantes</strong>, condição necessária para manter o valor apresentado, já que parte dos custos é coletiva e precisa ser dividida entre o grupo. O limite máximo é de <strong>40 participantes</strong>, pois, somados à equipe técnica, professores convidados e guia local, o grupo atinge a lotação total do ônibus.
              </div>
            </div>

            {/* Right Card - Sem link direcionando */}
            <div className="col-span-1 md:col-span-5 flex flex-col justify-between bg-amber-50/80 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border-2 border-[#f59532]/60 shadow-md text-center">
              {/* Warning SOMENTE 30 VAGAS */}
              <div className="space-y-1 sm:space-y-1.5">
                <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#f59532] text-slate-950 px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm md:text-base shadow-md uppercase tracking-wider w-full">
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 fill-slate-950" />
                  <span>SOMENTE 40 VAGAS!</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-700 font-medium pt-0.5">
                  Garanta a sua vaga na Viagem Acadêmica Oficial a Brasília antes do encerramento das inscrições.
                </p>
              </div>

              {/* Tag / Botão sem link de direcionamento */}
              <div className="my-2 sm:my-2.5">
                <div
                  className="w-full bg-[#083904] text-[#f59532] font-black py-3 sm:py-3.5 px-3 sm:px-4 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md border border-emerald-600/40 select-none cursor-default"
                >
                  <span className="text-center leading-snug">Link para pagamento e reserva da vaga</span>
                </div>
              </div>

              <div className="text-[10px] sm:text-[11px] font-semibold text-[#083904] bg-white/90 p-1.5 sm:p-2 rounded-lg sm:rounded-xl border border-amber-200/80">
                🔒 Pagamento Direto e Seguro via Asaas
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-400 pt-1.5 border-t border-slate-100">
            <span>Viagem Acadêmica Oficial de Direito</span>
            <PatiTourLogo className="h-5 sm:h-6" />
          </div>
        </div>
      );

    // SLIDE: COMO PAGAR O SALDO
    case 'payment_code':
      return (
        <div className="relative w-full h-full bg-white p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto md:overflow-hidden">
          <div className="border-b border-slate-100 pb-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              como pagar o saldo da viagem
            </h2>
            <p className="text-[11px] sm:text-xs md:text-sm font-bold text-[#f59532] mt-0.5">
              em até 12x no cartão de crédito
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 my-auto items-stretch py-2">
            {/* Steps & Code */}
            <div className="col-span-1 md:col-span-7 flex flex-col justify-between space-y-2.5 sm:space-y-3">
              {/* Código XXXXXX */}
              <div className="bg-[#083904] text-white px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl shadow-md flex items-center justify-between gap-3 border border-emerald-700/40">
                <span className="text-xs sm:text-sm md:text-base font-bold text-emerald-200 tracking-wide uppercase">
                  Código da Viagem
                </span>
                <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-widest text-[#f59532]">
                  XXXXXX
                </span>
              </div>

              {/* 4 Passos Solicitados */}
              <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-200">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#083904] shrink-0 mt-0.5" />
                  <span>você receberá um código referente ao número da viagem</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#083904] shrink-0 mt-0.5" />
                  <span>
                    acesse o site{' '}
                    <a 
                      href="https://www.universoludico.com.br" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-bold text-[#083904] underline hover:text-[#f59532] inline-flex items-center gap-0.5"
                    >
                      www.universoludico.com.br
                      <ExternalLink className="w-3 h-3 inline" />
                    </a>
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#083904] shrink-0 mt-0.5" />
                  <span>entre na <strong>área do aluno</strong> e insira o código.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#083904] shrink-0 mt-0.5" />
                  <span>siga as etapas até <strong>concluir a compra</strong> de forma fácil e segura!</span>
                </div>
              </div>

              {/* Obs 24h Box */}
              <div className="text-[10px] sm:text-[11px] md:text-xs text-amber-900 bg-amber-50 p-2.5 sm:p-3 rounded-xl border border-amber-300/70 font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#f59532] shrink-0" />
                <span>
                  <strong>Atenção!</strong> Todo o processo de inscrição precisa ser feito em <strong>até 24h</strong> após o pagamento da taxa de reserva.
                </span>
              </div>
            </div>

            {/* Right Visual Image - Maria Lúcia Rodrigues */}
            <div className="col-span-1 md:col-span-5 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border-2 border-slate-200 bg-slate-950 group relative flex flex-col justify-end min-h-[180px] sm:min-h-[240px] md:min-h-[280px]">
              <img 
                src="https://i.ibb.co/whXWtsWs/IMG-20260818-WA0552.jpg" 
                alt="Maria Lúcia Rodrigues na Câmara dos Deputados" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center absolute inset-0 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="relative z-10 bg-linear-to-t from-black/95 via-black/80 to-transparent p-2.5 sm:p-3.5 text-white">
                <p className="text-[10px] sm:text-[11px] leading-snug font-medium text-slate-100 drop-shadow-sm">
                  Visita à Comissão de Cultura da Câmara dos Deputados e conversa sobre os processos legislativos
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 pt-2 border-t border-slate-100">
            <span>[ LGPD ] Procedimentos em conformidade com a LGPD</span>
            <PatiTourLogo className="h-4 sm:h-5" />
          </div>
        </div>
      );

    // SLIDE: EQUIPE & CONTATOS
    case 'team_contact':
      return (
        <div className="relative w-full h-full bg-white p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto md:overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="max-w-2xl">
              <h2 className="text-base sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                Uma experiência para sair da sala de aula e ver o Direito em funcionamento
              </h2>
            </div>
            <PatiTourLogo className="h-5 sm:h-7 shrink-0 ml-2" />
          </div>

          {/* Body Paragraphs */}
          <div className="space-y-1.5 sm:space-y-2.5 my-auto max-w-4xl py-2">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Brasília é um dos poucos lugares do país em que estudantes de Direito podem, em poucos dias, observar de perto instituições centrais da vida pública brasileira e compreender melhor como temas debatidos na graduação ganham forma concreta na realidade institucional do país.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Mais do que visitar espaços emblemáticos, esta viagem propõe uma experiência acadêmica intensa, organizada e significativa, construída para aproximar formação universitária, vivência coletiva e contato direto com o funcionamento da República.
            </p>
          </div>

          {/* Team Cards - Apenas Paulo e Pati */}
          <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
              <MessageCircle className="w-4 h-4 text-[#083904]" />
              <h3 className="text-[11px] sm:text-xs md:text-sm font-black text-[#083904] text-center uppercase tracking-wider">
                CONVERSE COM NOSSO TIME - CLIQUE PARA ABRIR  WHATSAPP
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 max-w-2xl mx-auto">
              {/* PAULO (Laranja) */}
              <a
                href="https://wa.me/5535992196824?text=Ol%C3%A1%20Paulo!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20a%20Viagem%20Acad%C3%AAmica%20a%20Bras%C3%ADlia."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 bg-white hover:bg-amber-50/40 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border-2 border-slate-200 hover:border-[#f59532] shadow-2xs hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                title="Conversar com Paulo Kroeff no WhatsApp"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#f59532] shrink-0 shadow-xs bg-slate-100 group-hover:scale-105 transition-transform">
                    <img 
                      src="https://i.ibb.co/N28G3fQS/paulo.jpg" 
                      alt="Paulo Kroeff" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-black text-slate-900 block group-hover:text-[#c76e14] transition-colors">Paulo Kroeff</span>
                    <span className="text-[11px] sm:text-xs text-[#c76e14] font-bold block">+55 35 99219-6824</span>
                  </div>
                </div>
                <div className="bg-amber-100/80 group-hover:bg-[#f59532] text-[#c76e14] group-hover:text-slate-950 p-2 rounded-xl transition-colors shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
              </a>

              {/* PATI (Verde) */}
              <a
                href="https://wa.me/5519997474575?text=Ol%C3%A1%20Pati!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20a%20Viagem%20Acad%C3%AAmica%20a%20Bras%C3%ADlia."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 bg-white hover:bg-emerald-50/40 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border-2 border-slate-200 hover:border-emerald-600 shadow-2xs hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                title="Conversar com Pati Guimarães no WhatsApp"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#083904] shrink-0 shadow-xs bg-slate-100 group-hover:scale-105 transition-transform">
                    <img 
                      src="https://i.ibb.co/1GjgTw22/patiii.jpg" 
                      alt="Pati Guimarães" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-black text-slate-900 block group-hover:text-[#083904] transition-colors">Pati Guimarães</span>
                    <span className="text-[11px] sm:text-xs text-[#083904] font-bold block">+55 19 99747-4575</span>
                  </div>
                </div>
                <div className="bg-emerald-100/80 group-hover:bg-[#083904] text-[#083904] group-hover:text-white p-2 rounded-xl transition-colors shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
              </a>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 pt-2 border-t border-slate-100">
            <span>Apresentação Oficial para Reunião</span>
            <span className="text-[#083904] font-semibold">Jornada Jurídica - 2027</span>
          </div>
        </div>
      );

    default:
      return null;
  }
}
