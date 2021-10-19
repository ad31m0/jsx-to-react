import React from 'react'
import { transform } from '@babel/standalone'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      )
    }
    // Normally, just render children
    return this.props.children
  }
}

export const Tmpl = ({ jsx, propz, transformOptions }) => {
  if (!transformOptions) transformOptions = { presets: ['env', 'react'] }
  const result = transform(jsx, transformOptions)
  // eslint-disable-next-line no-eval
  const CompiledComponent = eval(result.code)
  return (
    <ErrorBoundary>
      <CompiledComponent {...propz} />
    </ErrorBoundary>
  )
}
