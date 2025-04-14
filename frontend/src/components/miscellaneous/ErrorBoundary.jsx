// Node module Imports
import { Component } from "react";

import ResultPage from "@/components/organisms/ResultPage";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }; // Update state to display fallback UI
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can log the error to an error reporting service here, e.g., Sentry
  }

  render() {
    const {
      productionError = (
        <p style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <h3>Oops! Something went wrong.</h3>
          <p>Please try again later or reload the page.</p>
        </p>
      ),
    } = this.props;

    if (this.state.hasError) {
      if (import.meta.env.VITE_ENV === "development") {
        // Show full error in dev
        return (
          <div
            style={{
              height: "80vh",
              margin: "1rem",
              padding: "1rem",
              border: "1px solid var(--error-color)",
              borderRadius: "10px",
              overflowY: "auto",
            }}
          >
            <h2>Uncaught error occurred (Dev Mode)</h2>
            <br />
            <details
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "0.9rem",
                lineHeight: 2,
              }}
            >
              {this.state.error?.toString()}
              <br />
              {this.state.errorInfo?.componentStack}
            </details>
          </div>
        );
      }

      // Clean minimal UI for prod
      return (
        <ResultPage
          type="error"
          message={productionError}
          redirectionButton={{
            name: "Reload",
            icon: "redo",
            redirect: () => window.location.reload(),
          }}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
