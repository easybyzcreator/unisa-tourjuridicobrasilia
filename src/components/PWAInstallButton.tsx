import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Share, PlusSquare, X, CheckCircle } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [showGeneralGuide, setShowGeneralGuide] = useState(false);

  // If already running as an installed PWA, show a discreet badge or hide
  if (isInstalled) {
    return (
      <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full">
        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
        <span>App Instalado</span>
      </div>
    );
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-1.5 rounded-full bg-[#f59532] hover:bg-[#e28322] px-3 py-1 text-xs font-bold text-slate-950 shadow-md transition-all cursor-pointer transform hover:scale-105 active:scale-95"
        title="Instalar Tour juridico BSB como aplicativo"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Instalar App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 rounded-full bg-[#f59532]/20 hover:bg-[#f59532]/30 border border-[#f59532]/40 px-3 py-1 text-xs font-bold text-[#f59532] transition-colors cursor-pointer"
          title="Instalar no iPhone / iPad"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Instalar no iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-emerald-800/80 p-6 text-white shadow-2xl relative">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://i.ibb.co/35r0pnwm/PWA-BSB.png" 
                  alt="Tour juridico BSB" 
                  className="w-12 h-12 rounded-2xl border border-[#f59532]/40 shadow-sm"
                />
                <div>
                  <h3 className="text-base font-black text-white">Tour juridico BSB</h3>
                  <p className="text-xs text-slate-400">Instalação no iPhone / iPad</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#f59532] text-slate-950 font-black flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                  <span>Toque no botão <strong className="text-white inline-flex items-center gap-1"><Share className="w-3.5 h-3.5 inline text-[#f59532]" /> Compartilhar</strong> no menu inferior do Safari.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#f59532] text-slate-950 font-black flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                  <span>Role a lista e selecione <strong className="text-white inline-flex items-center gap-1"><PlusSquare className="w-3.5 h-3.5 inline text-[#f59532]" /> Adicionar à Tela de Início</strong>.</span>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-[#083904] hover:bg-[#0b4d06] text-[#f59532] hover:text-white py-2.5 text-xs font-black transition-colors"
              >
                Entendi
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowGeneralGuide(true)}
        className="hidden sm:flex items-center gap-1.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1 text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
        title="Instalar Tour juridico BSB"
      >
        <Download className="w-3.5 h-3.5 text-[#f59532]" />
        <span>Instalar App</span>
      </button>

      {showGeneralGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-emerald-800/80 p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setShowGeneralGuide(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <img 
                src="https://i.ibb.co/35r0pnwm/PWA-BSB.png" 
                alt="Tour juridico BSB" 
                className="w-12 h-12 rounded-2xl border border-[#f59532]/40 shadow-sm"
              />
              <div>
                <h3 className="text-base font-black text-white">Tour juridico BSB</h3>
                <p className="text-xs text-slate-400">Instalar Aplicativo</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-300 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <p>
                Para instalar o app <strong>Tour juridico BSB</strong>:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                <li>No Chrome ou Edge, clique no ícone de instalar na barra de endereços (ao lado da estrela de favoritos).</li>
                <li>No celular, use o menu do navegador (três pontos) e selecione <strong>Adicionar à tela inicial</strong> ou <strong>Instalar aplicativo</strong>.</li>
              </ul>
            </div>

            <button
              onClick={() => setShowGeneralGuide(false)}
              className="mt-5 w-full rounded-xl bg-[#083904] hover:bg-[#0b4d06] text-[#f59532] hover:text-white py-2.5 text-xs font-black transition-colors cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
