import styled from '@emotion/styled'

const H6 = styled.h6`
  text-transform: uppercase;
  text-align: inherit;
  font-size: 12px;
  line-height: 10px;
  margin-top: 0;
  margin-bottom: 16px;
  font-weight: 500;
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.gray[300]};
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    font-size: 16px;
    line-height: 21px;
  }
`

export default H6
