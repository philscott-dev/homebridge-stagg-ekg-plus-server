import type { NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { FiX } from 'react-icons/fi'
import fetcher, { Method } from '../../../../../services/api'
import { ScheduleResponse, getSchedule } from '../../../../../services/schedule'
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
  FormButton as Submit,
} from '../../../../../components'

const ScheduleEditPage: NextPage = () => {
  const router = useRouter()
  const { kid, sid } = router.query
  const { data, error } = useSWR<ScheduleResponse>(
    sid ? `/schedule/${sid}` : null,
    getSchedule,
  )

  const handleBack = () => {
    router.back()
  }

  const handleSubmit = () => {
    router.push(
      '/kettle/[kid]/schedule/[sid]',
      `/kettle/${kid}/schedule/${sid}`,
    )
  }

  const handleDelete = async () => {
    try {
      await fetcher(Method.DELETE, `/schedule/${sid}`)
    } catch (err) {
      console.log(err)
    }
    router.replace('/kettle/[kid]', `/kettle/${kid}`)
  }

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
          <Input
            type="text"
            name="name"
            placeholder={'Name'}
            defaultValue={data?.name}
          />
        </FormSection>
        <FormSection>
          <Error name="timeOn" />
          <Input
            type="time"
            name="timeOn"
            placeholder={'On'}
            defaultValue={data?.timeOn}
          />
        </FormSection>
        <FormSection>
          <Error name="timeOff" />
          <Input
            type="time"
            name="timeOff"
            placeholder={'Off'}
            defaultValue={data?.timeOff}
          />
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
            defaultValue={data?.temperature}
          />
        </FormSection>
        <FormSection>
          <Submit>Confirm</Submit>
          <Anchor.Delete onMouseDown={handleDelete}>
            Delete Schedule
          </Anchor.Delete>
        </FormSection>
      </Form>
    </>
  )
}

export default ScheduleEditPage
