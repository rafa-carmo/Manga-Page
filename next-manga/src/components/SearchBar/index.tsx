import Dropdown from 'components/Dropdown'
import { useEffect, useState } from 'react'
import * as S from './styles'
import mock from './mock'
import Heading from 'components/Heading'

//import { Checkbox, CheckboxChecked } from '@styled-icons/boxicons-regular/'

import { ChevronDown } from '@styled-icons/boxicons-solid/ChevronDown'

import TextField from 'components/TextField'
import { ParsedUrlQueryInput } from 'querystring'
import NavCheckbox from 'components/NavCheckbox'
import { xor } from 'lodash'

type Values = ParsedUrlQueryInput

export type ItemProps = {
  title: string
  name: string
  type: string
  fields?: Field[]
}

type Field = {
  label: string
  value: string
}

type ValuesProps = {
  [key: string]: string[]
}

export type SearchBarProps = {
  items?: ItemProps[]
  initialValues?: Values & ValuesProps
  onFilter: (values: Values) => void
}

const SearchBar = ({
  items = mock,
  initialValues = {},
  onFilter
}: SearchBarProps) => {
  const [checkboxShowState, setCheckboxShowState] = useState(
    new Array(items.length).fill(false)
  )

  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkboxShowState.map((item, index) =>
      index === position ? !item : item
    )
    setCheckboxShowState(updatedCheckedState)
  }
  const [values, setValues] = useState<ValuesProps>(initialValues)

  const handleChange = (text: string) => {
    setValues((s) => ({ ...s, title_contains: [text] }))
  }

  const onSelect = (value: string, name: string) => {
    const currentList = values[name] as []
    setValues((s) => ({ ...s, [name]: xor(currentList, [value]) }))
  }

  useEffect(() => {
    onFilter(values)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  return (
    <S.Wrapper>
      <S.SearchBars>
        <S.SearchItem>
          <Heading lineLeft size="medium">
            {'Busca'}
          </Heading>
          <TextField
            name="title"
            value={values.title_contains ? `${values.title_contains[0]}` : ''}
            onChange={(e) => handleChange(e.target.value)}
            color="black"
          />
        </S.SearchItem>
        {items.map((item, index) => (
          <S.SearchItem key={`${item.title}`}>
            {item.type === 'checkbox' && (
              <>
                <Heading lineLeft size="medium">
                  {item.title}
                </Heading>

                <Dropdown
                  key={`${item.title}${index}`}
                  padding="none"
                  right={false}
                  margin="xxsmall"
                  isOpenExternal={checkboxShowState[index]}
                  title={
                    <S.ValuesContainer>
                      <S.BoxValue>
                        {values[item.name]?.map((item) => (
                          <S.Value key={item}>{item}</S.Value>
                        ))}
                      </S.BoxValue>

                      <S.BoxIcon onClick={() => handleOnChange(index)}>
                        <ChevronDown size={24} />
                      </S.BoxIcon>
                    </S.ValuesContainer>
                  }
                >
                  <S.Nav>
                    {item.fields &&
                      item.fields.map((checkbox, index) => (
                        <NavCheckbox
                          key={`${checkbox.label}-${index}`}
                          {...checkbox}
                          value={checkbox.value}
                          name={item.name}
                          onSelect={(value) => onSelect(value!, item.name)}
                        />
                      ))}
                  </S.Nav>
                </Dropdown>
              </>
            )}
          </S.SearchItem>
        ))}
      </S.SearchBars>
    </S.Wrapper>
  )
}

export default SearchBar
