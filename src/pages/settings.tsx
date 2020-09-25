import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
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
  FormSection,
  FormButton as Button,
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
        <FormSection>
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
        </FormSection>
        <FormSection>
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
        </FormSection>
        <FormSection>
          <Button>Confirm</Button>
        </FormSection>
      </Form>
    </>
  )
}

export default SettingsPage
