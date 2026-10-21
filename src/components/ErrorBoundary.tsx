import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <h2 className="text-xl font-black text-[#f59532]">
              Tour Jurídico Brasília
            </h2>
            <p className="text-sm text-slate-300">
              Ocorreu uma pequena instabilidade ao carregar a apresentação.
            </p>
            <button
              onClick={this.handleReload}
              className="w-full bg-[#f59532] hover:bg-[#e28322] text-slate-950 font-bold py-2.5 px-4 rounded-xl transition-all cursor-pointer"
            >
              Recarregar Apresentação
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
