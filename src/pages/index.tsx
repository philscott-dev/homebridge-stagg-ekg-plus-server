import type { NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import { FiSettings } from 'react-icons/fi'
import { KettleResponse, listKettles } from '../services/kettle'
import {
  H1,
  H2,
  H6,
  ListItem,
  Heading,
  IconButton,
  Anchor,
} from '../components'

const IndexPage: NextPage = () => {
  const { data, error } = useSWR<KettleResponse[]>(['/kettle'], listKettles)
  return (
    <>
      <Heading>
        <div>
          <Link href="/" passHref>
            <Anchor>
              <H1>EKG+</H1>
            </Anchor>
          </Link>
          <H2>overview</H2>
        </div>
        <Link href="/settings" passHref>
          <IconButton>
            <FiSettings />
          </IconButton>
        </Link>
      </Heading>
      <H6>Kettle</H6>
      {!error && data
        ? data.map((kettle) => (
            <Link
              key={kettle.id}
              href={'/kettle/[kid]'}
              as={`/kettle/${kettle.id}`}
              passHref
            >
              <ListItem
                title={kettle.name}
                subtitle={kettle.isConnected ? 'connected' : 'disconnected'}
              />
            </Link>
          ))
        : null}

      <Link href="/kettle/add" passHref>
        <ListItem isEmpty={true} title="new kettle" subtitle="tap to add" />
      </Link>
    </>
  )
}

export default IndexPage
