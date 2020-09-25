import styled from '@emotion/styled'

const H5 = styled.h5`
  text-transform: uppercase;
  text-align: inherit;
  font-size: 14px;
  line-height: 9px;
  margin: 0;
  font-weight: 500;
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.gray[300]};
`

export default H5
