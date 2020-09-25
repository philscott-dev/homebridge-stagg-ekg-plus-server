import styled from '@emotion/styled'
import { Weight, Size } from 'types'

type Sizes = Size.small | Size.medium | Size.large
type Weights = Weight.normal | Weight.light

interface SubtitleProps {
  size: Sizes
  weight: Weights
}

const Subtitle = styled.p<SubtitleProps>`
  text-transform: uppercase;
  text-align: inherit;
  font-family: ${({ theme }) => theme.font.family};
`

// const weightCss: Styles<Weights> = {
//   normal: css`
//     color: ${theme.color.black};
//   `,
//   light: css`
//     color: ${theme.color.white};
//   `,
// }

// const sizeCss: Styles<Sizes> = {
//   small: css`
//     font-size: 12px;
//     letter-spacing: 0.67px;
//     @media screen and (max-width: ${theme.breakpoint.small}) {
//       font-size: 12px;
//       letter-spacing: 0.67px;
//     }
//   `,
//   medium: css`
//     font-size: 14px;
//     letter-spacing: 0.78px;
//     @media screen and (max-width: ${theme.breakpoint.small}) {
//       font-size: 12px;
//       letter-spacing: 0.67px;
//     }
//   `,
//   large: css`
//     font-size: 16px;
//     letter-spacing: 0.89px;
//     @media screen and (max-width: ${theme.breakpoint.small}) {
//       font-size: 14px;
//       letter-spacing: 0.78px;
//     }
//   `,
// }

export default Subtitle
