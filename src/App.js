import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Input from './components/Input'
import Button from './components/Button'
import Container from './components/Container'
import Section from './components/Section'
import Balance from './components/Balance'

const compoundInterest = (deposit, contribution, years, rate) => {
let total = deposit

  for(let i = 0; i < years; i++){
    total = (total + contribution) * (rate + 1)
  }
  return Math.round(total)
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

function App() {
  const [balance, setBalance] = useState('')
  const handleSubmit = ({ deposit, contribution, years, rate }) => {
    const val = compoundInterest(Number(deposit), Number(contribution), Number(years), Number(rate))
    setBalance(formatter.format(val))
  }
  return (
    <Container>
      <Section>
        <Formik
          initialValues={{
            deposit: '',
            contribution: '',
            years: '',
            rate: ''
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            deposit: Yup.number().required('Obligatorio').typeError('Este campo debe ser un Número'),
            contribution: Yup.number().required('Obligatorio').typeError('Este campo debe ser un Número'),
            years: Yup.number().required('Obligatorio').typeError('Este campo debe ser un Número'),
            rate: Yup.number().required('Obligatorio').min(0, 'El valor mínimo es 0').max(1, 'El valor máximo es 1').typeError('Este campo debe ser un decimal ej: 0.08'),

          })}
        >
          <Form>
            <Input name="deposit" label="Depósito Inicial" />
            <Input name="contribution" label="Contribución anual" />
            <Input name="years" label="Años" />
            <Input name="rate" label="Interés estimado" />
            <Button type='submit'>Calcular</Button>
          </Form>

        </Formik>
        {balance !== '' ? <Balance>Balance Final: {balance}</Balance> : null}
      </Section>
    </Container>
  )
}

export default App
