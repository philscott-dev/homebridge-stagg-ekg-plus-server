import styled from '@emotion/styled'

const Anchor = styled.a`
  text-decoration: none;
  cursor: pointer;
`

const Delete = styled(Anchor)`
  flex: 0;
  text-align: center;
  align-self: center;
  justify-self: center;
  text-transform: uppercase;
  text-decoration: underline;
  margin: 0;
  font-weight: 300;
  color: ${({ theme }) => theme.color.white[100]};
  font-family: ${({ theme }) => theme.font.family};
  font-size: 16px;
  line-height: 12px;
  margin-top: 40px;
  &:hover {
    color: ${({ theme }) => theme.color.red[200]};
  }
  transition: ${({ theme }) => theme.transition.all};
`

export default Object.assign(Anchor, {
  Delete,
})
