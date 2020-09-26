import type { NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { FiEdit } from 'react-icons/fi'
import { ScheduleResponse, getSchedule } from '../../../../../services/schedule'
import {
  Heading,
  H1,
  H2,
  H6,
  Text,
  Attribute,
  IconButton,
  Anchor,
} from '../../../../../components'

const IndexPage: NextPage = () => {
  const router = useRouter()
  const { kid, sid } = router.query
  const { data, error } = useSWR<ScheduleResponse>(
    sid ? `/schedule/${sid}` : null,
    getSchedule,
  )

  return (
    <>
      <Heading>
        <div>
          <Link href="/" passHref>
            <Anchor>
              <H1>EKG+</H1>
            </Anchor>
          </Link>
          <H2>{data?.name}</H2>
        </div>
        <Link
          href={'/kettle/[kid]/schedule/[sid]/edit'}
          as={`/kettle/${kid}/schedule/${sid}/edit`}
          passHref
        >
          <IconButton>
            <FiEdit />
          </IconButton>
        </Link>
      </Heading>
      <Attribute>
        <H6>status</H6>
        <Text>{data?.isEnabled ? 'enabled' : 'disabled'}</Text>
      </Attribute>
      <Attribute>
        <H6>time</H6>
        <Text>
          {data?.timeOn} - {data?.timeOff}
        </Text>
      </Attribute>
    </>
  )
}

export default IndexPage
