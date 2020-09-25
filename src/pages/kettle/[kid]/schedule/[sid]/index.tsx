import type { NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { FiSettings } from 'react-icons/fi'
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

const IndexPage: NextPage = () => {
  const router = useRouter()
  return (
    <>
      <Heading>
        <div>
          <Link href="/" passHref>
            <Anchor>
              <H1>EKG+</H1>
            </Anchor>
          </Link>
          <H2>Wake Up</H2>
        </div>
        <Link
          href={'/kettle/[kid]/schedule/[sid]/edit'}
          as={'/kettle/1/schedule/1/edit'}
        >
          <IconButton>
            <FiSettings />
          </IconButton>
        </Link>
      </Heading>
      <Attribute>
        <H6>time</H6>
        <Text>08:24 AM - 12:53 PM</Text>
      </Attribute>
      <Attribute>
        <H6>status</H6>
        <Text>enabled</Text>
      </Attribute>
    </>
  )
}

export default IndexPage
