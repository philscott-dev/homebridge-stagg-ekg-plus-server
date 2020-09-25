import type { NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { FiEdit } from 'react-icons/fi'
import { fetchKettle } from '../../../services/kettle'
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
  return (
    <>
      <Heading>
        <div>
          <Link href="/">
            <Anchor>
              <H1>EKG+</H1>
            </Anchor>
          </Link>
          <H2>phil's kettle</H2>
        </div>
        <Link href={'[kid]/edit'} as={'1/edit'} passHref>
          <IconButton>
            <FiEdit />
          </IconButton>
        </Link>
      </Heading>
      <Attribute>
        <H6>status</H6>
        <Text>Connected</Text>
      </Attribute>
      <Attribute>
        <H6>mac address</H6>
        <Text>00:1C:97:19:54:A2</Text>
      </Attribute>
      <H6>schedule</H6>
      <Link href={'[kid]/schedule/[sid]'} as={'1/schedule/1'} passHref>
        <ListItem title={'WAKE UP'} subtitle={'08:24 AM - 12:53 PM'} />
      </Link>
      <Link href={'[kid]/schedule/add'} as={'1/schedule/add'} passHref>
        <ListItem isEmpty title={'New Schedule'} subtitle={'Tap to add'} />
      </Link>
    </>
  )
}

export default IndexPage
