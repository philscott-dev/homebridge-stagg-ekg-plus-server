import styled from '@emotion/styled'

const H4 = styled.h4`
  text-transform: uppercase;
  text-align: inherit;
  font-size: 16px;
  line-height: 12px;
  margin-top: 0;
  margin-bottom: 16px;
  font-weight: 500;
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.white[100]};
`

export default H4
