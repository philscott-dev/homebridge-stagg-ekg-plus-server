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
import { Status } from '../../../enums'

const IndexPage: NextPage = () => {
  const router = useRouter()
  const { data, error } = useSWR<KettleResponse>(
    [`/kettle/${router.query.kid}`],
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
        <Link href={'[kid]/edit'} as={`${data?.id}/edit`} passHref>
          <IconButton>
            <FiEdit />
          </IconButton>
        </Link>
      </Heading>
      <Attribute>
        <H6>status</H6>
        <Text>
          {data?.status === Status.Connected ? 'connected' : 'disconnected'}
        </Text>
      </Attribute>
      <Attribute>
        <H6>mac address</H6>
        <Text>{data?.macAddress}</Text>
      </Attribute>
      <H6>schedule</H6>
      <Link
        href={'[kid]/schedule/[sid]'}
        as={`${data?.id}/schedule/1`}
        passHref
      >
        <ListItem title={'WAKE UP'} subtitle={'08:24 AM - 12:53 PM'} />
      </Link>
      <Link
        href={'[kid]/schedule/add'}
        as={`${data?.id}/schedule/add`}
        passHref
      >
        <ListItem isEmpty title={'New Schedule'} subtitle={'Tap to add'} />
      </Link>
    </>
  )
}

export default IndexPage
