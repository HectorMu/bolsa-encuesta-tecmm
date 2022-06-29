import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  ReloadCurrentLocation = () => {
    window.location = window.location.pathname;
  };

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div className="vh-100 bg-dark position-fixed w-100">
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="container-fluid">
              <div className="card rounded-0 shadow-lg">
                <div className="card-body ">
                  <div className="d-flex flex-column">
                    <i className="fas fa-exclamation-circle fa-6x text-danger text-center"></i>
                    <h3 className="text-danger font-weight-bold text-center mt-3">
                      Algo fue mal
                    </h3>
                    <h5 className="text-center text-black">
                      Hubo un problema al cargar esta página, revisa tu conexión
                      a internet.
                    </h5>
                    <button
                      onClick={this.ReloadCurrentLocation}
                      className="btn btn-outline-primary align-self-center"
                    >
                      Reintentar <i className="fas fa-sync"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <h2></h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details> */}
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
