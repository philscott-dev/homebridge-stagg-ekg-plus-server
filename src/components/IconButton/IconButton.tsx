import styled from '@emotion/styled'

const IconButton = styled.a`
  margin: 0;
  padding: 0;
  line-height: 0;
  border: 0;
  font-size: 32px;
  display: block;
  background: transparent;
  text-decoration: none;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  color: ${({ theme }) => theme.color.white[100]};
  outline: none;
  &:hover {
    color: ${({ theme }) => theme.color.peach[100]};
  }
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  transition: ${({ theme }) => theme.transition.color};
`

export default IconButton
