import { ChangeEvent } from 'react'
import * as S from './styles'

export type SelectorProps = {
  select: string
  options: string[]
  preText?: string
  afterText?: string
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const Selector = ({
  select,
  options,
  preText,
  afterText,
  onChange
}: SelectorProps) => {
  return (
    <S.Wrapper value={select} onChange={(e) => onChange(e)}>
      {options.map((option) => {
        return (
          <option value={option} key={`${option}`}>
            {preText && `${preText} -`} {option} {afterText && `- ${afterText}`}
          </option>
        )
      })}
    </S.Wrapper>
  )
}

export default Selector
