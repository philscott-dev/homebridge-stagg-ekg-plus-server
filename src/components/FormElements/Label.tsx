/** @jsx jsx */
import { FC } from 'react'
import { css, jsx } from '@emotion/react'

interface LabelProps {
  id?: string
  css?: any
  style?: any
  htmlFor?: string
}

const Label: FC<LabelProps> = ({ children, htmlFor, ...rest }) => (
  <label htmlFor={htmlFor} css={labelCss} {...rest}>
    {children}
  </label>
)

const labelCss = css`
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 21px;
  margin-bottom: 2px;
  font-family: 'Poppins Thin';
  color: #fcfcfc;
`

export default Label
