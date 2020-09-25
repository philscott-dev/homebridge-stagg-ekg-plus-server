import styled from '@emotion/styled'
import { css, Theme } from '@emotion/react'
import { Sizes } from './types'

interface TextProps {
  size?: Sizes
  align?: 'center' | 'left' | 'right'
  ellipsis?: boolean
}

const Text = styled.p<TextProps>`
  ${sizes}
  text-transform: uppercase;
  text-align: ${({ align }) => align || 'initial'};
  margin: 0;
  font-weight: 500;
  color: ${({ theme }) => theme.color.white[100]};
  font-family: ${({ theme }) => theme.font.family};

  ${({ ellipsis }) =>
    ellipsis
      ? css`
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        `
      : null}
`

const Emphasized = styled(Text)`
  font-weight: 500;
  color: ${({ theme }) => theme.color.blue[400]};
`

const Deemphasized = styled(Text)`
  font-weight: 300;
  color: ${({ theme }) => theme.color.gray[300]};
`

const Light = styled(Text)`
  font-weight: 300;
  color: ${({ theme }) => theme.color.white[100]};
`

function sizes({ size, theme }: { size?: Sizes; theme: Theme }) {
  switch (size) {
    case 'small':
      return css`
        font-size: 12px;
        line-height: 18px;
        @media screen and (max-width: ${theme.breakpoint.small}) {
          font-size: 12px;
          line-height: 18px;
        }
      `
    case 'large':
      return css`
        font-size: 18px;
        line-height: 26px;
        @media screen and (max-width: ${theme.breakpoint.small}) {
          font-size: 16px;
          line-height: 21px;
        }
      `
    default:
      return css`
        font-size: 16px;
        line-height: 12px;
        /* @media screen and (max-width: ${theme.breakpoint.small}) {
          font-size: 14px;
          line-height: 20px;
        } */
      `
  }
}

export default Object.assign(Text, { Emphasized, Deemphasized, Light })
