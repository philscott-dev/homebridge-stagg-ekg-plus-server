import styled from '@emotion/styled'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 48px;
  box-sizing: border-box;
  margin-top: 48px;
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.small}) {
    padding: 0 32px;
  }
`

export default Page
