import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiX } from 'react-icons/fi'
import {
  Heading,
  H1,
  H2,
  Anchor,
  IconButton,
  Form,
  Input,
  Error,
  FormSection,
  FormButton as Button,
} from '../../../../components'

const ScheduleAddPage: NextPage = () => {
  const router = useRouter()
  //const { data } = useSWR(['/kettle', router.query.sid], fetchKettle)

  const handleBack = () => {
    router.back()
  }

  const handleSubmit = () => {}

  return (
    <>
      <Heading>
        <div>
          <Link href="/">
            <Anchor>
              <H1>EKG+</H1>
            </Anchor>
          </Link>
          <H2>New Schedule</H2>
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
          <Input type="time" name="on" placeholder={'Start Time'} />
        </FormSection>
        <FormSection>
          <Error name="off" />
          <Input type="time" name="off" placeholder={'End Time'} />
        </FormSection>
        <FormSection>
          <Button>Confirm</Button>
        </FormSection>
      </Form>
    </>
  )
}

export default ScheduleAddPage
