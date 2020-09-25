/** @jsx jsx */
import { useContext, FC } from 'react'
import { jsx, css, Theme } from '@emotion/react'
import { ValidationContext } from './Form'
import { Text } from 'components'

export interface ErrorProps {
  name: string
}

const Error: FC<ErrorProps> = ({ name }) => {
  const { errors } = useContext(ValidationContext)
  const error = errors[name]
  if (!error)
    return (
      <Text.Light className="errormessage" size="small" css={errorCss}>
        &nbsp;
      </Text.Light>
    )
  return (
    <Text.Light className="errormessage" size="small" css={errorCss}>
      {error}
    </Text.Light>
  )
}

const errorCss = (theme: Theme) => css`
  align-self: flex-end;
  color: ${theme.color.red};
  margin-left: 24px;
  margin-top: 0;
  margin-bottom: 8px;
`

export default Error
