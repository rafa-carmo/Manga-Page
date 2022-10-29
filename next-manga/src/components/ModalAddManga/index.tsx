import Modal from 'react-modal';
import { useContext, useState } from 'react';
import { ModalContext } from 'hooks/add-manga';
import { XCircle } from 'phosphor-react';
import Button from 'components/Button';
import { useMutation, useQuery } from '@apollo/client';
import { MUTATION_CREATE_DOWNLOAD_LIST } from 'graphql/mutations/downloadList';
import { createDownloadListVariables } from 'graphql/generated/createDownloadList';
import { createDownloadList } from '../../graphql/generated/createDownloadList';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
};

type TypeProps = "Online" | "Normal"

export function ModalAddManga() {

    const { isOpen: modalIsOpen, setIsOpen } = useContext(ModalContext)
    const [page, setPage] = useState<string>('union')
    const [type, setType] = useState<TypeProps>('Online')
    const [url, setUrl] = useState<string>('')
        
    const [createDownloadList] = useMutation<createDownloadList,createDownloadListVariables>(MUTATION_CREATE_DOWNLOAD_LIST)

    function closeModal() {
        setIsOpen(false)
    }

    async function AdicionarManga() {
        // const [] = useQuery()
        await createDownloadList({
            variables: {
                input: {
                    data: {
                    downloadPages: [
                        {
                            name: page,
                            url: url,
                            Type: type
                        }
                ]
                    }
                }
            },
            onCompleted: () => {
                closeModal()
            }
        })
    }
  return (

    <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    style={customStyles}
    contentLabel="Modal para adicionar mangas"
   
    >
    <div  className="relative pr-5 pt-5">
    <button className='absolute right-0 top-0' onClick={closeModal}><XCircle size={22} weight="thin" /></button>
        <h3 className='text-center font-bold'>Adicionar manga</h3>
        <div className="relative p-5">


            <form className="w-full flex flex-col items-center justify-center mt-2 gap-5">
   
                <div className='flex gap-2 items-center justify-between'>
                    <label className='' htmlFor="page_type">Tipo</label>
                    <select className='flex-1 text-center border p-2' onChange={(e)=>setType(e.target.value as TypeProps)} id="page_type">
                        <option className='text-left' value="Online">Online</option>
                        <option className='text-left' value="Normal">Download</option>
                    </select>
                </div>
                <div className='flex gap-2 items-center justify-between'>
                    <label className='' htmlFor="page_type">Pagina</label>
                    <select className='flex-1 text-center border p-2' onChange={(e)=>setPage(e.target.value)} id="page_type">
                        <option className='text-left' value="union">Union Mangas</option>
                    </select>
                </div>
                <div className='flex gap-2 items-center justify-between'>
                    <label htmlFor="url_manga">Url</label>
                    <input className='bg-zinc-200 flex-1 p-2' type="text" onChange={(e)=>setUrl(e.target.value)} id="url_manga" />
                </div>

                <Button type="button" onClick={AdicionarManga}>
                    Adicionar
                </Button>
            </form>
        </div>
    </div>
    </Modal>

  );
}
