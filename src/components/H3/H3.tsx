import styled from '@emotion/styled'

const H3 = styled.h3`
  text-align: inherit;
  font-size: 26px;
  line-height: 34px;
  margin-bottom: 16px;
  font-weight: 300;
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.white[100]};
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    font-size: 24px;
    line-height: 29px;
  }
`

export default H3
