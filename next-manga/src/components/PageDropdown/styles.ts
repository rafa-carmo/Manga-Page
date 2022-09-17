import tw from 'tailwind-styled-components'
import { Listbox } from '@headlessui/react';

export const Wrapper = tw.div`
    w-72
    
`

export const Container = tw.div`
    relative
    mt-1

`

export const Button = tw(Listbox.Button)`
    relative 
    w-full 
    flex
    items-center
    gap-3

    cursor-default 
    rounded-md
    bg-white 
    py-2 
    pl-3 
    pr-10 
    text-left 
    shadow-md

    focus-visible:border-indigo-500 
    focus-visible:ring-2 
    focus-visible:ring-white 
    focus-visible:ring-opacity-75 
    focus-visible:ring-offset-2 
    focus-visible:ring-offset-brand-500
    sm:text-sm

    focus:outline-none
    border-transparent
    hover:border-brand-500
    focus:border-brand-500
`

export const Options = tw(Listbox.Options)`
    absolute 
    mt-4 
    rounded-md
    max-h-72
    w-full 
    overflow-auto 
    bg-white 
    py-1 
    text-base 
    shadow-lg 
    ring-1 
    ring-black 
    ring-opacity-5 
    focus:outline-none 
    sm:text-sm

    scrollbar-thin
    scrollbar-thumb-rounded-full
    scrollbar-thumb-brand-500
    scrollbar-track-transparent
    
`

export const Option = tw(Listbox.Option)`
    relative 
    cursor-default 
    select-none 
    text-gray-900
    `
export type SpanContainer = {
    active: boolean
}
export const SpanContainer = tw.div<SpanContainer>`
    flex
    items-center
    px-2
    py-1

    ${({active}:{active: boolean}) => active && `
        bg-blue-300 
        text-gray-900
        font-bold
    `
}
`
export const OptionSpan = tw.span`
    block 
    truncate
    py-2 
    pl-4
    font-mono
    text-xl
    font-black
    cursor-default

`