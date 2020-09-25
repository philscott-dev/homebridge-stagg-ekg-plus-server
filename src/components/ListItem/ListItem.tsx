/** @jsx jsx */
import styled from '@emotion/styled'
import { FC, forwardRef, MouseEvent } from 'react'
import { jsx } from '@emotion/react'
import { H4, H5 } from '../index'

interface ListItemProps {
  className?: string
  title: string
  subtitle: string
  isEmpty?: boolean
  href?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}
const ListItem = forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, subtitle, href, onClick, isEmpty = false }, ref) => {
    return (
      <Anchor
        ref={ref}
        href={href}
        onClick={onClick}
        isEmpty={isEmpty}
        className={className}
      >
        <H4>{title}</H4>
        <H5>{subtitle}</H5>
      </Anchor>
    )
  },
)

export default ListItem

const Anchor = styled.a<{ isEmpty: boolean }>`
  flex: 1;
  max-width: 350px;
  text-align: left;
  border-width: 2px;
  padding: 24px 16px;
  box-sizing: border-box;
  text-decoration: none;
  outline: none;
  margin-bottom: 24px;
  border-color: ${({ theme }) => theme.color.peach[100]};
  border-style: ${({ isEmpty }) => (isEmpty ? 'dashed' : 'solid')};
  background: ${({ theme }) => theme.color.black[700]};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.color.peach[500]};
  }
  transition: all 0.25s ease-in-out;
`
