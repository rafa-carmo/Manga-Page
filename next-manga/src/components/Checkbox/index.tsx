import { forwardRef, InputHTMLAttributes, useState } from 'react'
import * as S from './styles'

export type CheckboxProps = {
  onCheck?: (status: boolean) => void
  label?: string
  labelFor?: string
  labelColor?: 'white' | 'black'
  value?: string | ReadonlyArray<string> | number
  isChecked?: boolean
} & InputHTMLAttributes<HTMLInputElement>

const Checkbox: React.ForwardRefRenderFunction<
  HTMLInputElement | null,
  CheckboxProps
> = (
  {
    onCheck,
    label,
    labelFor = '',
    labelColor = 'white',
    value,
    isChecked = false,
    ...props
  },
  ref
) => {
  const [checked, setChecked] = useState(isChecked)

  const onChange = () => {
    const status = !checked
    setChecked(status)

    if (onCheck) {
      onCheck(status)
    }
  }
  return (
    <S.Wrapper>
      <S.Input
        ref={ref}
        id={labelFor}
        type="checkbox"
        onChange={onChange}
        checked={checked}
        value={value}
        {...props}
      />
      {!!label && (
        <S.Label labelColor={labelColor} htmlFor={labelFor}>
          {label}
        </S.Label>
      )}
    </S.Wrapper>
  )
}

export default forwardRef(Checkbox)
