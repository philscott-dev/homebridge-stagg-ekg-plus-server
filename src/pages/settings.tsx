import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from '@emotion/styled'
import { FiX } from 'react-icons/fi'
import {
  H1,
  H2,
  Heading,
  IconButton,
  Form,
  Select,
  Error,
  SelectPlaceholder,
  Anchor,
} from '../components'

const SettingsPage: NextPage = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const handleSubmit = () => {}
  return (
    <>
      <Heading>
        <div>
          <Link href="/" passHref>
            <Anchor>
              <H1>EKG+</H1>
            </Anchor>
          </Link>
          <H2>Settings</H2>
        </div>
        <IconButton onMouseDown={handleBack}>
          <FiX />
        </IconButton>
      </Heading>
      <Form
        loading={false}
        error={undefined}
        rules={{}}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Wrap>
          <Error name="units" />
          <Select
            placeholder="Units"
            name="units"
            tabIndex={1}
            defaultValue={'fahrenheit'}
          >
            <SelectPlaceholder text="Units" />
            <option value={'fahrenheit'}>Fahrenheit</option>
            <option value={'celsius'}>Celsius</option>
          </Select>
        </Wrap>
        <Wrap>
          <Error name="time" />
          <Select
            placeholder="Time"
            name="time"
            tabIndex={2}
            defaultValue={'12'}
          >
            <SelectPlaceholder text="Time" />
            <option value={'12'}>12 Hour</option>
            <option value={'24'}>24 Hour</option>
          </Select>
        </Wrap>
      </Form>
    </>
  )
}

export default SettingsPage

const Wrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`
