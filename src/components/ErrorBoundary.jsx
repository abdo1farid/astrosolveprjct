import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
    // You could also log to an error reporting service here
    // console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 text-slate-100 p-6">
          <div className="max-w-3xl w-full bg-slate-900/80 border border-red-600/20 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-red-300 mb-4">Something went wrong</h2>
            <pre className="text-sm text-slate-200 whitespace-pre-wrap">{String(this.state.error)}</pre>
            <details className="mt-4 text-xs text-slate-400">
              <summary>Component stack</summary>
              <pre className="whitespace-pre-wrap">{this.state.info?.componentStack}</pre>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
