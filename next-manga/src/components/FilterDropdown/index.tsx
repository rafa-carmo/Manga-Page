import * as S from './styles'
import { useState } from 'react'

import Dropdown from 'components/Dropdown'

import { Checkbox, CheckboxChecked } from '@styled-icons/boxicons-regular/'
import { CloseCircleOutline } from '@styled-icons/evaicons-outline/CloseCircleOutline'
import { ChevronDown } from '@styled-icons/boxicons-solid/ChevronDown'

export type FilterDropdownProps = {
  name: string
  items: string[]
}

const FilterDropdown = ({ name, items }: FilterDropdownProps) => {
  const [values, setValues] = useState(['null'])
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (value: string) => {
    if (values.indexOf(value) === -1) {
      setValues([...values, value])
    } else {
      handleRemove(value)
    }
  }
  const handleRemove = (value: string) => {
    const index = values.indexOf(value)
    if (index !== -1) {
      const valuesTemp = values
      valuesTemp.splice(index, 1)
      setValues([...valuesTemp])
    }
  }
  return (
    <S.Wrapper>
      <Dropdown
        padding="none"
        right={false}
        margin="xxsmall"
        isOpenExternal={isOpen}
        title={
          <>
            <S.ValuesContainer>
              <div>
                <S.Label onClick={() => setIsOpen(!isOpen)}>{name}</S.Label>
                <S.BoxValue>
                  {values.map((value, index) => {
                    if (value !== 'null')
                      return (
                        <S.Value key={`${value}-${index}`}>
                          {value}{' '}
                          <CloseCircleOutline
                            size={20}
                            onClick={() => handleRemove(value)}
                          />
                        </S.Value>
                      )
                  })}
                </S.BoxValue>
              </div>
              <S.BoxIcon onClick={() => setIsOpen(!isOpen)}>
                <ChevronDown size={24} />
              </S.BoxIcon>
            </S.ValuesContainer>
          </>
        }
      >
        <S.Nav>
          {items.map((item, index) => (
            <S.Item
              key={item + index}
              isChecked={values.indexOf(item) !== -1}
              onClick={() => handleClick(item)}
            >
              {values.indexOf(item) !== -1 ? (
                <CheckboxChecked size={24} />
              ) : (
                <Checkbox size={24} />
              )}
              <span>{item}</span>

              <S.Checkbox
                value={item}
                name={name}
                checked={values.indexOf(item) !== -1}
              />
            </S.Item>
          ))}
        </S.Nav>
      </Dropdown>
    </S.Wrapper>
  )
}

export default FilterDropdown
