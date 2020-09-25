import type { NextPage } from 'next'
import Link from 'next/link'
import { FiSettings } from 'react-icons/fi'
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
      <Link href={'/kettle/[kid]'} as={'/kettle/1'} passHref>
        <ListItem title="Phil's Kettle" subtitle="connected" />
      </Link>
      <Link href="/kettle/add" passHref>
        <ListItem isEmpty={true} title="new kettle" subtitle="tap to add" />
      </Link>
    </>
  )
}

export default IndexPage
