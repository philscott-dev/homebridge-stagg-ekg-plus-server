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
  FormButton as Submit,
} from '../../components'

const KettleAddPage: NextPage = () => {
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
          <H2>New Kettle</H2>
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
          <Error name="macAddress" />
          <Input type="text" name="macAddress" placeholder={'Mac Address'} />
        </FormSection>
        <FormSection>
          <Submit>Confirm</Submit>
          <Anchor.Delete>Delete</Anchor.Delete>
        </FormSection>
      </Form>
    </>
  )
}

export default KettleAddPage
