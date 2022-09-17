import { useState } from 'react';
import { RadioGroup } from '@headlessui/react'
import { ArrowsOutLineHorizontal, ArrowsOutLineVertical } from 'phosphor-react'


export type Orientation = 'horizontal' | 'vertical'

type OrientationDataProps = {
    value: Orientation,
    icon: React.ReactNode
}

const orientations= {
        horizontal:{        
            value: 'vertical',
            icon:  <ArrowsOutLineVertical className='w-10 h-10' />
        },
        vertical: {
            value: 'horizontal',
            icon:  <ArrowsOutLineHorizontal className='w-10 h-10' />
            
        }
    }
    


export interface OrientationPageSwitcherProps {
    orientation: 'vertical' | 'horizontal'
    setOrientation: (orientation: 'horizontal' | 'vertical') => void
}

export default function OrientationPageSwitcher({orientation, setOrientation}: OrientationPageSwitcherProps) {

    const setOrientationStorage = (orientation: 'horizontal' | 'vertical') => {
        if (typeof window !== "undefined") {
            localStorage.setItem("orientation", orientation);
            }
    }

  const [selected, setSelected] = useState<OrientationDataProps>(orientations[orientation] as OrientationDataProps)

    const handleChange = (orientationData:OrientationDataProps) => {
        if(selected !== orientationData) {
        setSelected(orientationData)
        setOrientation(orientationData.value)
        setOrientationStorage(orientationData.value)
        }
    }


  return (

        <RadioGroup value={selected} onChange={handleChange}>
          <RadioGroup.Label className="sr-only">Orientation of page</RadioGroup.Label>

          <div className="flex items-center justify-center bg-slate-600 gap-3 rounded-sm">
            {Object.entries(orientations).map(([, orientation]) => (

              <RadioGroup.Option
                key={orientation.value}
                value={orientation}
                className={({ checked }) =>
                  `
                  ${
                    checked ? 'bg-brand-300 bg-opacity-75 text-white' : 'bg-white'
                  }
                    relative 
                    flex 
                    cursor-pointer 
                    rounded-lg 
                    shadow-md 
                    focus:outline-none
                    w-14 h-14
                    items-center justify-center
                    `
                }
              >
                {({ active, checked }) => (
           
                        <div className="text-sm w-10 h-10 ">
                          <RadioGroup.Label
                            as="p"
                            className={` ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {orientation.icon}
                          </RadioGroup.Label>
                 
                        </div>
   
              
               
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
  
  )
}

// function CheckIcon(props) {
//   return (
//     <svg viewBox="0 0 24 24" fill="none" {...props}>
//       <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
//       <path
//         d="M7 13l3 3 7-7"
//         stroke="#fff"
//         strokeWidth={1.5}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   )
// }
