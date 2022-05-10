import Joi from 'joi'
import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes'

const fieldsValidations = {
  username: Joi.string().min(5).required().messages({
    'string.min': `"username" deve ter no minimo {#limit} caracteres`
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.base': `Digite um "e-mail" Valido`,
      'string.empty': `Campo e-mail é obrigatorio`
    }),
  password: Joi.string().min(5).required().messages({
    'string.min': `A "senha" deve ter no minimo {#limit} caracteres`,
    'string.base': `Digite uma "Senha" Valida`,
    'string.empty': `Campo senha é obrigatoria`
  }),
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .min(5)
    .required()
    .messages({
      'string.min': `A "senha" deve ter no minimo {#limit} caracteres`,
      'string.empty': `Campo confirmação de senha é obrigatoria`,
      'any.only': 'As senhas devem ser iguais'
    })
}

export type FieldErrors = {
  [key: string]: string
}
function getFieldErrors(objError: Joi.ValidationResult) {
  const errors: FieldErrors = {}

  if (objError.error) {
    objError.error.details.forEach((err) => {
      errors[err.path.join('.')] = err.message
    })
  }
  return errors
}

export function signUpValidate(values: UsersPermissionsRegisterInput) {
  const schema = Joi.object(fieldsValidations)
  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}

type SignInValues = Omit<UsersPermissionsRegisterInput, 'username'>
export function signInValidate(values: SignInValues) {
  const { email, password } = fieldsValidations
  const schema = Joi.object({ email, password })

  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}
