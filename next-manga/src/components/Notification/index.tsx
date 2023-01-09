import { Bell } from 'phosphor-react'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react';
import Item, { ItemProps } from './Item'

import * as S from './styles'
import { notificationsMapper } from 'utils/mappers';

export type NotificationProps = {
  hasNotification?: boolean
  notifications?: ItemProps[]
}


export interface notificationBody {
  id: string
  content: string
  mangaSlug: string
  chapter: string
  createdAt: string
  readAt: string | null
  recipientId: string
}

const Notification = () => {
  const [notifications, setNotifications] = useState([])
  useEffect(()=>{
    fetch('/api/notifications')
    .then((data) => data.json())
    .then((data) => setNotifications(data.data))
    .catch(err => console.log(err))
  },[])
console.log(notifications)
  return (
  <S.Wrapper>
  <Menu>
    <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative">
      <Bell size={25} />
      {/* {hasNotification && (
        <div className="rounded-full w-3 h-3 absolute bottom-2 right-5 bg-red-500"> </div>
      )} */}
    </Menu.Button>

    <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-96 h-56 origin-top-right opacity-100 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {notifications ?  notificationsMapper(notifications).map((notification)=>(
              <Menu.Item key={notification.id}>
                  <Item {...notification} />
              </Menu.Item>
            )): (<p className="text-black grid place-items-center h-full">Nenhuma notificação</p>)}
    
          </Menu.Items>
        </Transition>
  </Menu>
  </S.Wrapper>
)}

export default Notification
