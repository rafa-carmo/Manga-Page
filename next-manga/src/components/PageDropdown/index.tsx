import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Bookmarks, CaretDoubleDown } from 'phosphor-react'

import * as S from './styles'


export interface PageDropdownProps {
    selectedChapter: string
    chapters: string[]
    onChange: (chapter: string) => void
}

export function PageDropdown({chapters, selectedChapter, onChange}:PageDropdownProps) {
  const [selected, setSelected] = useState(selectedChapter)

  const handleChange = (value: string) => {
      if(value !== selected) {
          setSelected(value)
          onChange(value)
          return
      }
  }

  return (
    <S.Wrapper>
      <Listbox value={selected} onChange={handleChange}>
        <S.Container>
          <S.Button>
            <span className="flex items-center text-blue-700">
                <Bookmarks className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="font-bold text-2xl">Capítulo - {selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <CaretDoubleDown className="h-5 w-5 text-gray-400" size={32} />
            </span>
          </S.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <S.Options>
              {chapters.map((chapter, chapterIdx) => (
                <Listbox.Option
                  key={chapterIdx}
                  value={chapter}
                >
                  {({ active, selected }) => (
                    <S.SpanContainer active={active} >
                    {selected && (
                        <span className="flex items-center text-blue-700">
                        <Bookmarks className="h-5 w-5" aria-hidden="true" />
                        </span>
                    )}
                      <S.OptionSpan className={`${selected ? 'font-medium' : 'font-normal'}`}>
                        Capítulo - {chapter}
                      </S.OptionSpan>
                    </S.SpanContainer>
                  )}
                </Listbox.Option>
              ))}
            </S.Options>
          </Transition>
        </S.Container>
      </Listbox>
    </S.Wrapper>
  )
}
