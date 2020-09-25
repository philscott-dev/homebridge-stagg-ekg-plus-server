import styled from '@emotion/styled'

const FormSection = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: ${({ theme }) => theme.breakpoint.small};
  margin-bottom: 24px;
`

export default FormSection
