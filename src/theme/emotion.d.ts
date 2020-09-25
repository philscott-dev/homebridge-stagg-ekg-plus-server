import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    color: {
      black: {
        700: string
      }
      gray: {
        200: string
        300: string
      }
      white: {
        100: string
      }
      aqua: {
        300: string
      }
      blue: {
        300: string
        400: string
        500: string
        600: string
        700: string
      }
      navy: {
        300: string
      }
      magenta: {
        300: string
      }
      green: {
        300: string
      }
      red: {
        200: string
        300: string
      }
      orange: {
        300: string
      }
      purple: {
        300: string
      }
      peach: {
        100: string,
        200: string,
        300: string,
        500: string,
      },
    }
    gradient: {
      blue: string
    }
    font: {
      family: string
      size: {
        h1: string
        h2: string
        h3: string
        h4: string
        h5: string
        h6: string
        large: string
        medium: string
        small: string
        xsmall: string
      }
    }
    breakpoint: {
      xsmall: string
      small: string
      medium: string
      large: string
      xlarge: string
    }
    transition: {
      color: string
      background: string
      all: string
    }
    index: {
      100: number
    }
    shadow: {
      up: {
        one: string
        two: string
      }
      down: {
        one: string
      }
    }
  }
}
