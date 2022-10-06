import * as S from './styles'
import Link from 'next/link'
import TextField from 'components/TextField/index'
import { Email, Lock } from '@styled-icons/material-outlined'

import React from 'react'
import Button from 'components/Button'
import { FormWrapper, FormLink } from 'components/Form'
import { useState } from 'react'
import { signIn } from "next-auth/react"
import { useRouter } from 'next/router'
import { FormLoading } from '../Form/index'
import { FieldErrors, signInValidate } from 'utils/validations'

const FormSignIn = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const [fieldError, setFieldError] = useState<FieldErrors>({})
  const [formError, setFormError] = useState('')

  const [loading, setLoading] = useState(false)

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  const routes = useRouter()
  const { push, query } = routes
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)


    const errors = signInValidate(values)

    if (Object.keys(errors).length) {
      setFieldError(errors)
      setLoading(false)
      return
    }
    setFieldError({})
    
    const result = await signIn('credentials', {
      redirect: false,
      ...values,
      callbackUrl: `${window.location.origin}${query?.callbackUrl || '/'}`
    })
    if (result?.url) {
      return push(result.url)
    }
    setLoading(false)

    setFormError('Email ou senha invalidos')
  }

  return (
    <FormWrapper>
      {!!formError && <S.FormError>{formError}</S.FormError>}
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          placeholder="Email"
          type="email"
          error={fieldError?.email}
          onInputChange={(v) => handleInput('email', v)}
          icon={<Email />}
        />

        <TextField
          name="password"
          placeholder="Password"
          type="password"
          error={fieldError?.password}
          onInputChange={(v) => handleInput('password', v)}
          icon={<Lock />}
        />
        <S.ForgotPassword href="#">Esqueci a senha.</S.ForgotPassword>
        <Button size="large" fullWidth disabled={loading}>
          {loading ? <FormLoading /> : <span>Entrar</span>}
        </Button>
        <FormLink>
          Não tem conta?{' '}
          <Link href="/sign-up">
            <a>Cadastre-se</a>
          </Link>
        </FormLink>
      </form>
    </FormWrapper>
  )
}

export default FormSignIn
