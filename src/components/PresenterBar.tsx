import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Printer
} from 'lucide-react';

interface PresenterBarProps {
  currentIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectSlide?: (idx: number) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  showGrid?: boolean;
  onToggleGrid?: () => void;
  showNotes?: boolean;
  onToggleNotes?: () => void;
  isAutoplay?: boolean;
  onToggleAutoplay?: () => void;
  laserMode?: boolean;
  onToggleLaser?: () => void;
  onPrint: () => void;
}

export const PresenterBar: React.FC<PresenterBarProps> = ({
  currentIndex,
  totalSlides,
  onPrev,
  onNext,
  isFullscreen,
  onToggleFullscreen,
  onPrint
}) => {
  return (
    <nav aria-label="Controles da apresentação" className="bg-slate-900/95 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-800 flex items-center justify-between gap-3 select-none">
      {/* Navigation Left */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="p-2 rounded-xl hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
          title="Slide anterior (Seta Esquerda)"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="text-xs font-mono font-bold bg-[#083904] text-[#f59532] px-3 py-1.5 rounded-lg border border-emerald-800/60 shadow-xs">
          {currentIndex + 1} / {totalSlides}
        </span>

        <button
          onClick={onNext}
          disabled={currentIndex === totalSlides - 1}
          className="p-2 rounded-xl hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
          title="Próximo slide (Seta Direita / Espaço)"
          aria-label="Próximo slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Right Tools */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onPrint}
          className="p-2 rounded-xl hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
          title="Imprimir / Exportar PDF da Reunião"
          aria-label="Imprimir ou exportar PDF da apresentação"
        >
          <Printer className="w-4 h-4" />
        </button>

        <button
          onClick={onToggleFullscreen}
          className="p-2 rounded-xl hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
          title="Tela Cheia (F)"
          aria-label={isFullscreen ? "Sair da tela cheia" : "Entrar em tela cheia"}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </nav>
  );
};
