/** @jsx jsx */
import { FC } from 'react'
import styled from '@emotion/styled'
import { jsx } from '@emotion/react'

interface SelectPlaceholder {
  className?: string
  text: string
}

const SelectPlaceholder: FC<SelectPlaceholder> = ({ className, text }) => {
  return (
    <Option className={className} value="" disabled hidden>
      {text}
    </Option>
  )
}

export default SelectPlaceholder

const Option = styled.option``
