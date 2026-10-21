import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SLIDES_DATA } from './data/slidesData';
import { SlideViewer } from './components/SlideViewer';
import { PresenterBar } from './components/PresenterBar';
import { EasyByzCreatorLogo, UniversoLudicoLogo, PatiTourLogo } from './components/Logos';
import { 
  X, 
  Clock, 
  MessageSquare, 
  Grid as GridIcon, 
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [laserMode, setLaserMode] = useState(false);
  const [laserPos, setLaserPos] = useState({ x: -100, y: -100 });
  const [isCopied, setIsCopied] = useState(false);
  const [meetingSeconds, setMeetingSeconds] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const currentSlide = SLIDES_DATA[currentSlideIndex];

  // Meeting timer
  useEffect(() => {
    const timer = setInterval(() => {
      setMeetingSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format timer mm:ss
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Next / Prev slide handlers
  const handleNext = useCallback(() => {
    setCurrentSlideIndex(prev => {
      if (prev < SLIDES_DATA.length - 1) {
        return prev + 1;
      }
      return prev;
    });
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentSlideIndex(prev => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  }, []);

  // Scroll to top on slide change (ensures mobile view always starts at top)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.scrollTop = 0;
    }
  }, [currentSlideIndex]);

  // Autoplay handler
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex(prev => {
        if (prev < SLIDES_DATA.length - 1) return prev + 1;
        setIsAutoplay(false);
        return prev;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
        case 'Backspace':
        case 'PageUp':
          e.preventDefault();
          handlePrev();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'g':
        case 'G':
          e.preventDefault();
          setShowGrid(prev => !prev);
          break;
        case 'n':
        case 'N':
          e.preventDefault();
          setShowNotes(prev => !prev);
          break;
        case 'l':
        case 'L':
          e.preventDefault();
          setLaserMode(prev => !prev);
          break;
        case 'Escape':
          setShowGrid(false);
          setShowNotes(false);
          setShowHelp(false);
          break;
        case 'Home':
          setCurrentSlideIndex(0);
          break;
        case 'End':
          setCurrentSlideIndex(SLIDES_DATA.length - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Laser Pointer tracker
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!laserMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setLaserPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Copy code handler
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 }
    });
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Print all slides
  const handlePrint = () => {
    window.print();
  };

  // Touch swipe support for mobile devices
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Only swipe if horizontal movement is significant and greater than vertical movement
    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-[#f59532] selection:text-slate-950 font-sans print:bg-white print:text-black"
    >
      {/* Top Meeting Header (Hidden in clean print) */}
      <header className="px-3 sm:px-4 py-2 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between z-20 print:hidden">
        <div className="flex items-center">
          <span className="text-xs sm:text-sm font-black tracking-wide text-white">
            UNISA - Tour Jurídico Brasília
          </span>
        </div>

        {/* Center: Slide Navigation Arrows (Especially prominent on mobile) */}
        <div className="flex items-center gap-1 bg-slate-800/95 border border-slate-700 px-1.5 py-1 rounded-xl shadow-xs">
          <button
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              currentSlideIndex === 0 
                ? 'text-slate-600 opacity-40 cursor-not-allowed' 
                : 'text-white hover:bg-slate-700 hover:text-[#f59532] active:scale-90 bg-slate-750'
            }`}
            title="Slide anterior (←)"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <span className="text-xs font-bold font-mono text-slate-200 px-1.5 select-none tracking-tight">
            <span className="text-[#f59532] font-black">{(currentSlideIndex + 1).toString().padStart(2, '0')}</span>
            <span className="text-slate-500 font-medium">/{SLIDES_DATA.length}</span>
          </span>

          <button
            onClick={handleNext}
            disabled={currentSlideIndex === SLIDES_DATA.length - 1}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              currentSlideIndex === SLIDES_DATA.length - 1 
                ? 'text-slate-600 opacity-40 cursor-not-allowed' 
                : 'text-white hover:bg-slate-700 hover:text-[#f59532] active:scale-90 bg-slate-750'
            }`}
            title="Próximo slide (→)"
            aria-label="Próximo slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-xs font-medium text-slate-400">
          <div className="hidden md:flex items-center gap-1.5 bg-[#083904]/60 px-3 py-1 rounded-full border border-emerald-800/50">
            <Clock className="w-3.5 h-3.5 text-[#f59532]" />
            <span>Tempo: <strong className="text-white font-mono">{formatTime(meetingSeconds)}</strong></span>
          </div>

          <button
            onClick={() => setShowHelp(true)}
            className="hover:text-[#f59532] transition-colors p-1 hidden sm:block"
            title="Atalhos do teclado"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Slide Presentation Stage */}
      <main 
        className="flex-1 flex items-center justify-center p-1 sm:p-3 md:p-4 relative overflow-y-auto"
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="w-full max-w-6xl h-[calc(100vh-170px)] sm:h-auto sm:max-h-[82vh] sm:aspect-video relative flex items-center justify-center rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
          {/* Laser Pointer Overlay */}
          {laserMode && (
            <div 
              className="absolute w-4 h-4 rounded-full bg-red-500 pointer-events-none z-50 shadow-[0_0_15px_5px_rgba(239,68,68,0.8)] transition-all duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${laserPos.x}px`, top: `${laserPos.y}px` }}
            />
          )}

          {/* Current Slide Display */}
          <SlideViewer 
            slide={currentSlide} 
            onCopyCode={handleCopyCode}
            isCopied={isCopied}
          />
        </div>
      </main>

      {/* Complete Footer Section with Navigation, Logos, and EasyByzCreator Credit */}
      <footer className="px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 z-30 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 sm:gap-3">
          {/* Organization Logos */}
          <div className="hidden sm:flex items-center gap-3 md:gap-4 bg-slate-800/80 px-3 md:px-4 py-1.5 md:py-2 rounded-2xl border border-slate-700/80 shadow-xs">
            <UniversoLudicoLogo className="h-7 md:h-9" />
            <div className="h-6 md:h-7 w-px bg-slate-700"></div>
            <PatiTourLogo className="h-7 md:h-9" />
          </div>

          {/* Center: Slide Controls */}
          <div className="w-full md:w-auto flex justify-center">
            <PresenterBar
              currentIndex={currentSlideIndex}
              totalSlides={SLIDES_DATA.length}
              onPrev={handlePrev}
              onNext={handleNext}
              onSelectSlide={(idx) => setCurrentSlideIndex(idx)}
              isFullscreen={isFullscreen}
              onToggleFullscreen={toggleFullscreen}
              showGrid={showGrid}
              onToggleGrid={() => setShowGrid(prev => !prev)}
              showNotes={showNotes}
              onToggleNotes={() => setShowNotes(prev => !prev)}
              isAutoplay={isAutoplay}
              onToggleAutoplay={() => setIsAutoplay(prev => !prev)}
              laserMode={laserMode}
              onToggleLaser={() => setLaserMode(prev => !prev)}
              onPrint={handlePrint}
            />
          </div>

          {/* Mobile Bottom Logos & EasyByzCreator Credit */}
          <div className="w-full md:w-auto flex items-center justify-between sm:justify-end gap-3 text-xs">
            <div className="flex sm:hidden items-center gap-2">
              <UniversoLudicoLogo className="h-5" />
              <div className="h-4 w-px bg-slate-700"></div>
              <PatiTourLogo className="h-5" />
            </div>
            <EasyByzCreatorLogo className="h-5 sm:h-7" />
          </div>
        </div>
      </footer>

      {/* MODAL: Slide Grid View (Thumbnails) */}
      {showGrid && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 p-6 overflow-y-auto print:hidden">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-3">
                <GridIcon className="w-6 h-6 text-[#f59532]" />
                <h3 className="text-xl font-bold text-white">Todos os {SLIDES_DATA.length} Slides da Apresentação</h3>
              </div>
              <button
                onClick={() => setShowGrid(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {SLIDES_DATA.map((slide, idx) => (
                <div
                  key={slide.id}
                  onClick={() => {
                    setCurrentSlideIndex(idx);
                    setShowGrid(false);
                  }}
                  className={`group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all hover:scale-105 ${
                    currentSlideIndex === idx 
                      ? 'border-[#f59532] ring-4 ring-[#f59532]/20' 
                      : 'border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="aspect-video bg-slate-900 p-2 flex flex-col justify-between text-left">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono bg-slate-800 px-1.5 py-0.5 rounded font-bold text-[#f59532]">
                        #{slide.id}
                      </span>
                      <span className="text-[9px] text-[#083904] bg-emerald-100/90 px-1.5 py-0.5 rounded font-bold truncate max-w-[120px]">
                        {slide.category}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-200 line-clamp-2 mt-1">
                      {slide.title}
                    </p>
                    <span className="text-[9px] text-slate-500 mt-1">Clique para abrir</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Speaker Notes / Meeting Script */}
      {showNotes && (
        <aside aria-label="Notas do orador e roteiro da reunião" className="fixed bottom-24 right-6 w-96 max-w-[90vw] bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl z-40 p-5 text-left text-slate-200 print:hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#f59532]" />
              <h4 className="text-sm font-bold text-white">Notas do Orador (Slide #{currentSlide.id})</h4>
            </div>
            <button
              onClick={() => setShowNotes(false)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 text-xs leading-relaxed max-h-60 overflow-y-auto pr-1">
            <div className="bg-[#f59532]/10 p-3 rounded-2xl border border-[#f59532]/30 text-amber-100 font-medium">
              💡 <strong>Roteiro para a Reunião:</strong> <br />
              {currentSlide.notes}
            </div>

            {currentSlideIndex < SLIDES_DATA.length - 1 && (
              <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 flex items-center justify-between">
                <span>Próximo: <strong>{SLIDES_DATA[currentSlideIndex + 1].title}</strong></span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        </aside>
      )}

      {/* MODAL: Keyboard Shortcuts Help */}
      {showHelp && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 print:hidden">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#f59532]" />
                Atalhos de Apresentação
              </h4>
              <button onClick={() => setShowHelp(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between items-center bg-slate-800/60 p-2 rounded-xl">
                <span>Avançar Slide</span>
                <kbd className="bg-slate-700 px-2 py-1 rounded font-mono text-white">Seta Direita / Espaço</kbd>
              </div>
              <div className="flex justify-between items-center bg-slate-800/60 p-2 rounded-xl">
                <span>Voltar Slide</span>
                <kbd className="bg-slate-700 px-2 py-1 rounded font-mono text-white">Seta Esquerda</kbd>
              </div>
              <div className="flex justify-between items-center bg-slate-800/60 p-2 rounded-xl">
                <span>Grade de Slides</span>
                <kbd className="bg-slate-700 px-2 py-1 rounded font-mono text-white">G</kbd>
              </div>
              <div className="flex justify-between items-center bg-slate-800/60 p-2 rounded-xl">
                <span>Notas / Roteiro da Reunião</span>
                <kbd className="bg-slate-700 px-2 py-1 rounded font-mono text-white">N</kbd>
              </div>
              <div className="flex justify-between items-center bg-slate-800/60 p-2 rounded-xl">
                <span>Apontador Laser Virtual</span>
                <kbd className="bg-slate-700 px-2 py-1 rounded font-mono text-white">L</kbd>
              </div>
              <div className="flex justify-between items-center bg-slate-800/60 p-2 rounded-xl">
                <span>Tela Cheia</span>
                <kbd className="bg-slate-700 px-2 py-1 rounded font-mono text-white">F</kbd>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Print Container: Formats all 17 slides sequentially when printing / exporting to PDF */}
      <div className="hidden print:block space-y-8 p-4">
        {SLIDES_DATA.map((s) => (
          <div key={s.id} className="page-break-after aspect-video w-full mb-8 border border-slate-300 rounded-xl overflow-hidden">
            <SlideViewer slide={s} />
          </div>
        ))}
      </div>
    </div>
  );
}

