import type { NextPage } from 'next'
import useSWR from 'swr'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiX } from 'react-icons/fi'
import { fetchKettle } from '../../../../../services/kettle'
import {
  Heading,
  H1,
  H2,
  H6,
  Text,
  ListItem,
  Attribute,
  IconButton,
  Anchor,
} from '../../../../../components'

const ScheduleEditPage: NextPage = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <>
      <Heading>
        <div>
          <Link href="/" passHref>
            <Anchor>
              <H1>EKG+</H1>
            </Anchor>
          </Link>
          <H2>Edit Wake Up</H2>
        </div>
        <IconButton onMouseDown={handleBack}>
          <FiX />
        </IconButton>
      </Heading>
    </>
  )
}

export default ScheduleEditPage
