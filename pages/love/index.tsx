import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router'
import place from "@/images/No-Image-Placeholder.png"
import s from "@/styles/Love.module.css"
import { useAppSelector } from '@/redux/hooks';
const Love = () => {
    const router = useRouter()

    const selector = useAppSelector(state => state);
    const handleClick = (id: string): React.MouseEventHandler<HTMLLIElement> => () => {
        router.push(`/${id}`)
      }
  return (
    <div className={s.container}>
        <p>
            Ваші улюбленні фільми чи серіали
        </p>
        <ul className={s.list}>
        {selector.data.items.map((item:any)=>(
        <li onClick={handleClick(item.imdbID)} key = {item.imdbID}>
            <Image width={100} height = {100} alt = {item.title} src = {item.poster !== "N/A" ? item.poster : place}/>
            {item.title}
        </li>
    ))}
  </ul>
    </div>
    
  )
}

export default Love
