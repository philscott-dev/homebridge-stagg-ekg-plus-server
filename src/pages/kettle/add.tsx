import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiX } from 'react-icons/fi'
import { MAC_ADDRESS_REGEX } from '../../regex'
import { Entries, Rules } from '../../components/FormElements/types'
import fetcher, { Method } from '../../services/api'
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
} from '../../components'

export const rules: Rules = {
  name: [
    {
      error: 'NAME IS REQUIRED',
      fn: (value, ...args) => {
        return !!value
      },
    },
  ],
  macAddress: [
    {
      error: 'MAC ADDRESS IS REQUIRED',
      fn: (value) => {
        return !!value
      },
    },
    {
      error: 'MAC ADDRESS FORMAT - C4:AD:BE:B9:42:FB',
      fn: (value) => {
        return MAC_ADDRESS_REGEX.test(value)
      },
    },
  ],
}

const KettleAddPage: NextPage = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const handleSubmit = async ({ name, macAddress }: Entries) => {
    try {
      await fetcher(Method.POST, '/kettle', undefined, { name, macAddress })
    } catch (err) {}
    router.back()
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
          <H2>New Kettle</H2>
        </div>
        <IconButton onMouseDown={handleBack}>
          <FiX />
        </IconButton>
      </Heading>
      <Form
        loading={false}
        error={undefined}
        rules={rules}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <FormSection>
          <Error name="name" />
          <Input type="text" name="name" placeholder={'Name'} />
        </FormSection>
        <FormSection>
          <Error name="macAddress" />
          <Input type="text" name="macAddress" placeholder={'Mac Address'} />
        </FormSection>
        <FormSection>
          <Submit>Confirm</Submit>
        </FormSection>
      </Form>
    </>
  )
}

export default KettleAddPage
