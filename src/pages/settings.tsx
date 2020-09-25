import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FiX } from 'react-icons/fi'
import { Entries, Rules } from '../components/FormElements/types'
import useSWR from 'swr'
import fetcher, { Method } from '../services/api'
import { getSettings, SettingsResponse } from '../services/settings'
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
import { Unit } from '../enums'

export const rules: Rules = {
  unit: [
    {
      error: 'UNIT IS REQUIRED',
      fn: (value, ...args) => {
        return !!value
      },
    },
  ],
}

const SettingsPage: NextPage = () => {
  const router = useRouter()
  const { data, error, mutate } = useSWR<SettingsResponse>(
    [`/settings`],
    getSettings,
  )

  console.log(data)

  const handleBack = () => {
    router.back()
  }

  const handleSubmit = async ({ unit }: Entries) => {
    try {
      await fetcher(Method.PATCH, '/settings', undefined, { unit })
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
          <Error name="unit" />
          <Select
            placeholder="Units"
            name="unit"
            tabIndex={1}
            defaultValue={data?.unit}
          >
            <SelectPlaceholder text="Units" />
            <option value={Unit.Fahrenheit}>Fahrenheit</option>
            <option value={Unit.Celsius}>Celsius</option>
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
