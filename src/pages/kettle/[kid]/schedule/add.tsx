import type { NextPage } from 'next'
import useSWR from 'swr'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiX } from 'react-icons/fi'
import { fetchKettle } from '../../../../services/kettle'
import {
  Heading,
  H1,
  H2,
  H6,
  Text,
  ListItem,
  Attribute,
  Anchor,
  IconButton,
} from '../../../../components'

const ScheduleAddPage: NextPage = () => {
  const router = useRouter()
  //const { data } = useSWR(['/kettle', router.query.sid], fetchKettle)

  const handleBack = () => {
    router.back()
  }

  return (
    <>
      <Heading>
        <div>
          <Link href="/">
            <Anchor>
              <H1>EKG+</H1>
            </Anchor>
          </Link>
          <H2>New Schedule</H2>
        </div>
        <IconButton onMouseDown={handleBack}>
          <FiX />
        </IconButton>
      </Heading>
    </>
  )
}

export default ScheduleAddPage
