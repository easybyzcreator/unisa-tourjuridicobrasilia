import React from 'react';

export const EasyByzCreatorLogo = ({ className = "h-8" }: { className?: string }) => (
  <a
    href="https://easybyzcreator.com"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex flex-col items-center group transition-transform hover:scale-105"
    title="Visitar EasyByzCreator (easybyzcreator.com)"
  >
    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-medium mb-1 group-hover:text-[#f59532] transition-colors">
      desenvolvido por
    </span>
    <img
      src="https://i.ibb.co/TqMvVmyt/logo-easybyzcreator.png"
      alt="EasyByzCreator"
      referrerPolicy="no-referrer"
      className={`${className} object-contain transition-opacity group-hover:opacity-90 drop-shadow-sm`}
    />
  </a>
);

export const UniversoLudicoLogo = ({ className = "h-10" }: { className?: string }) => (
  <div className="inline-flex items-center">
    <img
      src="https://i.ibb.co/pj6kYMNd/uni.png"
      alt="Universo Lúdico"
      referrerPolicy="no-referrer"
      className={`${className} object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)] transition-all`}
    />
  </div>
);

export const PatiTourLogo = ({ className = "h-10" }: { className?: string }) => (
  <div className="inline-flex items-center">
    <img
      src="https://i.ibb.co/zWWPZHKw/patipb.png"
      alt="Pati Tour"
      referrerPolicy="no-referrer"
      className={`${className} object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)] transition-all`}
    />
  </div>
);

export const EstacioLogo = ({ className = "h-8" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="w-6 h-6 rotate-45 border-2 border-[#f59532] bg-[#f59532]/20 flex items-center justify-center">
      <div className="w-2.5 h-2.5 bg-[#f59532]"></div>
    </div>
    <span className="text-xl font-black tracking-tight text-slate-800">Estácio</span>
  </div>
);

export const BrazilPinIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <div className={`relative rounded-full bg-[#083904] flex items-center justify-center shadow-xs border border-emerald-500/40 ${className}`}>
    <div className="w-3/5 h-3/5 rotate-45 bg-[#f59532] flex items-center justify-center">
      <div className="w-2 h-2 rounded-full bg-[#083904]"></div>
    </div>
  </div>
);

