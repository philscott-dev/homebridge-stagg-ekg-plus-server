import styled from '@emotion/styled'

interface StyledLabelProps {
  isVisible: boolean
  error: boolean
}

export default styled.label<StyledLabelProps>`
  transition: all 0.2s ease-in-out;
  margin-bottom: 8px;
  visibility: ${({ isVisible }) => (true ? 'visibility' : 'hidden')};
  opacity: ${({ isVisible }) => (true ? 1 : 0)};
  color: ${({ theme, error }) =>
    !error ? theme.color.white[100] : theme.color.red[300]};
  font-family: ${({ theme }) => theme.font.family};
  font-size: 16px;
  text-transform: uppercase;
`
