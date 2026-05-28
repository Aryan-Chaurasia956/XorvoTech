import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mx-auto px-4 py-12">
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <h2 className="text-xl font-semibold text-red-700 mb-2">Something went wrong.</h2>
            <p className="text-red-600 mb-4">One of the sections failed to load. Please try again or refresh.</p>
            {this.props.fallback || null}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;