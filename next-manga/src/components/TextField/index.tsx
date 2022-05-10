import { useState, InputHTMLAttributes } from 'react'

import { EyeSlash, Eye } from '@styled-icons/bootstrap'

import * as S from './styles'

export type TextFieldProps = {
  onInputChange?: (value: string) => void
  label?: string
  initialValue?: string
  iconPosition?: 'left' | 'right'
  sizeInput?: 'small' | 'medium'
  icon?: React.ReactNode
  disabled?: boolean
  error?: string
  iconColor?: 'white' | 'black'
  labelColor?: 'white' | 'black'
} & InputHTMLAttributes<HTMLInputElement>

const TextField = ({
  icon,
  label,
  initialValue = '',
  iconPosition = 'left',
  sizeInput = 'small',
  disabled = false,
  onInputChange,
  error,
  name,
  iconColor = 'white',
  labelColor = 'white',
  ...props
}: TextFieldProps) => {
  const [value, setValue] = useState(initialValue)
  const [type, setType] = useState(props.type)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value
    setValue(newValue)

    !!onInputChange && onInputChange(newValue)
  }

  const handleChangeType = () => {
    if (type === 'password') {
      return setType('text')
    }
    return setType('password')
  }
  return (
    <S.Wrapper disabled={disabled} error={!!error}>
      {!!label && (
        <S.Label htmlFor={name} labelColor={labelColor}>
          {label}
        </S.Label>
      )}
      <S.InputWrapper>
        {!!icon && (
          <S.Icon iconPosition={iconPosition} iconColor={iconColor}>
            {icon}
          </S.Icon>
        )}
        <S.Input
          onChange={onChange}
          value={value}
          iconPosition={iconPosition}
          disabled={disabled}
          name={name}
          sizeInput={sizeInput}
          {...(label ? { id: name } : {})}
          {...props}
          type={type}
        />
        {props.type === 'password' && (
          <S.Icon
            onClick={handleChangeType}
            iconPosition="right"
            iconColor={iconColor}
            style={{ position: 'relative', zIndex: 1 }}
          >
            {type === 'password' ? <EyeSlash /> : <Eye />}
          </S.Icon>
        )}
      </S.InputWrapper>
      {!!error && <S.Error>{error}</S.Error>}
    </S.Wrapper>
  )
}

export default TextField
