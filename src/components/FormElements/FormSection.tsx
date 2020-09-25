import styled from '@emotion/styled'

const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: ${({ theme }) => theme.breakpoint.small};
`

export default FormSection
