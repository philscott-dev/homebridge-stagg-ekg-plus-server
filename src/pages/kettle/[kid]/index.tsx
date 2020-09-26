import type { NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { FiEdit } from 'react-icons/fi'
import { getKettle, KettleResponse } from '../../../services/kettle'
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
} from '../../../components'

const IndexPage: NextPage = () => {
  const router = useRouter()
  const { kid } = router.query
  const { data, error } = useSWR<KettleResponse>(
    kid ? `/kettle/${kid}` : null,
    getKettle,
  )

  return (
    <>
      <Heading>
        <div>
          <Link href="/">
            <Anchor>
              <H1>EKG+</H1>
            </Anchor>
          </Link>
          <H2>{data?.name}</H2>
        </div>
        <Link href={'/kettle/[kid]/edit'} as={`/kettle/${kid}/edit`} passHref>
          <IconButton>
            <FiEdit />
          </IconButton>
        </Link>
      </Heading>
      <Attribute>
        <H6>status</H6>
        <Text>{data?.isConnected ? 'connected' : 'disconnected'}</Text>
      </Attribute>
      <Attribute>
        <H6>mac address</H6>
        <Text>{data?.macAddress}</Text>
      </Attribute>
      <H6>schedule</H6>
      {!error && data
        ? data.schedule?.map((schedule) => (
            <Link
              key={schedule.id}
              href={'/kettle/[kid]/schedule/[sid]'}
              as={`/kettle/${kid}/schedule/${schedule.id}`}
              passHref
            >
              <ListItem
                title={schedule.name}
                subtitle={`${schedule.timeOn} - ${schedule.timeOff}`}
              />
            </Link>
          ))
        : null}
      <Link
        href={'/kettle/[kid]/schedule/add'}
        as={`/kettle/${kid}/schedule/add`}
        passHref
      >
        <ListItem isEmpty title={'New Schedule'} subtitle={'Tap to add'} />
      </Link>
    </>
  )
}

export default IndexPage
