import type { NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { FiX } from 'react-icons/fi'
import { getKettle, KettleResponse } from '../../../services/kettle'
import fetcher, { Method } from '../../../services/api'
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
} from '../../../components'

const KettleEditPage: NextPage = () => {
  const router = useRouter()
  const { data, error, mutate } = useSWR<KettleResponse>(
    [`/kettle/${router.query.kid}`],
    getKettle,
  )

  const handleBack = () => {
    router.back()
  }

  const handleSubmit = () => {
    mutate()
  }

  const handleDelete = async () => {
    await fetcher(Method.DELETE, `/kettle/${router.query.kid}`)
    router.replace('/')
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
          <H2>Edit {data?.name}</H2>
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
          <Error name="macAddress" />
          <Input
            type="text"
            name="macAddress"
            placeholder={'Mac Address'}
            defaultValue={data?.macAddress}
          />
        </FormSection>
        <FormSection>
          <Submit>Confirm</Submit>
          <Anchor.Delete onMouseDown={handleDelete}>
            Delete Kettle
          </Anchor.Delete>
        </FormSection>
      </Form>
    </>
  )
}

export default KettleEditPage
