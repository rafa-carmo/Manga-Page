import Link from 'next/link';

export interface ItemProps {
    id: string
    title?: string
    message: string
    slug: string
    chapter: string
}

function Item({message, title="Novo Capítulo", slug, chapter}:ItemProps) {
    return (
        <>
        <Link href={`/reader/${slug}/${chapter}`} className="bg-white">
            <a className="text-black p-5">
                <p className="font-semibold text-lg">{title}</p>
                {message}
            </a>
        </Link>
        </>
    )
}
export default Item