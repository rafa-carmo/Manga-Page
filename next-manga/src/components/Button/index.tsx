import { forwardRef, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

import * as S from './styles'

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonProps = {
  size?: 'small' | 'medium' | 'large'
  icon?: React.ReactNode
  as?: React.ElementType
  fullWidth?: boolean
  border?: 'circle' | 'rectangle' | 'none'
  color?: 'primary' | 'secondary' | string
} & ButtonTypes

const Button: React.ForwardRefRenderFunction<S.WrapperProps, ButtonProps> = (
  {
    children,
    icon,
    size = 'medium',
    border = 'rectangle',
    fullWidth = false,
    color = 'primary',
    ...props
  },
  ref
) => (
  <S.Wrapper
    size={size}
    hasIcon={!!icon}
    border={border}
    color={color}
    {...props}
    ref={ref}
    fullWidth={fullWidth}
  >
    {!!icon && icon}
    {!!children && <span>{children}</span>}
  </S.Wrapper>
)

export default forwardRef(Button)
