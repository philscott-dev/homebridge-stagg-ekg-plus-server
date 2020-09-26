import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiX } from 'react-icons/fi'
import { Entries } from '../../../../components/FormElements/types'
import fetcher, { Method } from '../../../../services/api'
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
  const { kid } = router.query

  const handleBack = () => {
    router.back()
  }

  const handleSubmit = async ({
    name,
    timeOn,
    timeOff,
    days,
    temperature,
  }: Entries) => {
    try {
      await fetcher(Method.POST, `/kettle/${kid}/schedule`, null, {
        name,
        timeOff,
        timeOn,
        temperature,
        days,
      })
    } catch (err) {
      console.log(err)
    }
    router.push('/kettle/[kid]', `/kettle/${kid}`)
  }

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
          <Error name="timeOn" />
          <Input type="time" name="timeOn" placeholder={'Start Time'} />
        </FormSection>
        <FormSection>
          <Error name="timeOff" />
          <Input type="time" name="timeOff" placeholder={'End Time'} />
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
          <Button>Confirm</Button>
        </FormSection>
      </Form>
    </>
  )
}

export default ScheduleAddPage
