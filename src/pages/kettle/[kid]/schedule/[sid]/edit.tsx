import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiX } from 'react-icons/fi'
import {
  Heading,
  H1,
  H2,
  IconButton,
  Anchor,
  Form,
  Input,
  Error,
  FormSection,
  Button,
  FormButton as Submit,
} from '../../../../../components'

const ScheduleEditPage: NextPage = () => {
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
          <H2>Edit Wake Up</H2>
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
          <Error name="name" />
          <Input type="text" name="name" placeholder={'Name'} />
        </FormSection>
        <FormSection>
          <Error name="on" />
          <Input type="time" name="on" placeholder={'On'} />
        </FormSection>
        <FormSection>
          <Error name="off" />
          <Input type="time" name="off" placeholder={'Off'} />
        </FormSection>
        <FormSection>
          <Error name="temperature" />
          <Input
            type="number"
            name="temperature"
            placeholder={'Temperature'}
            inputMode="numeric"
            min="104"
            max="212"
          />
        </FormSection>
        <FormSection>
          <Submit>Confirm</Submit>
          <Anchor.Delete>Delete Schedule</Anchor.Delete>
        </FormSection>
      </Form>
    </>
  )
}

export default ScheduleEditPage
