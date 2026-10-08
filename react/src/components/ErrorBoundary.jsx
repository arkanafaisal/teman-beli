import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-6 bg-bg-surface p-10 rounded-[32px] shadow-sm border border-border-base">
            <div className="w-24 h-24 bg-danger-soft text-danger-text rounded-3xl flex items-center justify-center mx-auto mb-6">
              <i className="ph ph-warning-circle text-5xl"></i>
            </div>
            
            <div>
              <h1 className="text-2xl font-extrabold text-text-heading mb-2 tracking-tight">Terjadi Kesalahan Sistem</h1>
              <p className="text-text-muted text-sm leading-relaxed mb-4">
                Maaf, antarmuka aplikasi mengalami gangguan teknis (Crash). Silakan muat ulang halaman.
              </p>
              
              <details className="text-left bg-bg-subtle p-3 rounded-xl border border-border-base mt-4 text-xs overflow-auto max-h-32">
                <summary className="font-bold text-text-heading cursor-pointer">Lihat Rincian Error</summary>
                <p className="text-danger-base mt-2 font-mono">{this.state.error && this.state.error.toString()}</p>
                <pre className="text-text-muted mt-1 whitespace-pre-wrap">{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
              </details>
            </div>

            <div className="pt-4">
              <button 
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-primary-base hover:bg-primary-hover text-white rounded-2xl font-bold transition shadow-lg shadow-primary-ring/30 cursor-pointer"
              >
                <i className="ph ph-arrows-clockwise text-lg"></i>
                Muat Ulang Halaman
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
