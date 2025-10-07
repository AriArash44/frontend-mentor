declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "amp-fit-text": {
          width?: string | number
          height?: string | number
          layout?: string
          className?: string
          children?: React.ReactNode
        }
      }
    }
  }
}

export {}

