import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { FetchSearchDataByID } from '@/API/Api'
import Image from 'next/image';
import place from "@/images/No-Image-Placeholder.png"
import s from "@/styles/Film.module.css"
interface ISearch{
    Actors:string;
    Awards:string;
    BoxOffice:string;
    Country:string;
    DVD:string;
    Director:string;
    Genre:string;
    Language:string;
    Metascore:string;
    Poster:string;
    Production:string;
    Rated:string;
    Ratings:any;
    Released:string;
    Response:string;
    Plot:string;
    Runtime:string;
    Title:string;
    Type:string;
    Website:string;
    Writer:string;
    Year:string;
    imdbID:string;
    imdbRating:string;
    imdbVotes:string;
   }

const Film: React.FunctionComponent = () => {
    const router = useRouter()
    let film: string | undefined
    if(router.query.film !== undefined){
         film =  router.query.film.toString()
    }
    const [allInfo, setAllInfo] = useState<boolean>(false)
    const [search, setSearch] = useState<ISearch>()

    useEffect(()=>{
        async function FetchSearch(){
            const movie = await FetchSearchDataByID(film)
            setSearch(movie)
        }
        FetchSearch()
    },[film])
  return (
    <div className={s.container}>
        {!search ? <div>Loading...</div> :
        <>
            <span className={s.title}>{search.Title}</span>
            <div className={s.box}>
                <div className={s.images}>
                <Image width={300} height = {300} alt = {search.Title} src = {search.Poster !== "N/A" ? search.Poster : place}/>

                </div>
                <div className={s.descrpition}>
                    <p>{search.Plot}</p>
                    <div>
                        <p>Actors:</p>
                        <p>{search.Actors}</p>
                    </div>
                    {!allInfo &&
                    <button onClick = {()=>setAllInfo(!allInfo)} className={s.button}>
                        Показати всю інформацію
                    </button>
                    }
                </div>
                
               
                {allInfo && 
                
                <ul>
                <li>
                    <p>Actors:</p>
                    <p>{search.Actors}</p>
                </ li>
                <li>
                    <p>Awards:</p>
                    <p>{search.Awards}</p>
                </li>
                <li>
                   <p> BoxOffice:</p>
                   <p>{search.BoxOffice}</p>
                </li>
                <li>
                    
                <p> Country:</p>
                   <p>{search.Country}</p>
                </li>
                <li>
                   <p> DVD:</p>
                   <p>{search.DVD}</p>
                </li>
                <li>
                   <p> Genre:</p>
                   <p>{search.Genre}</p>
                </li>
                <li>
                   <p> Language:</p>
                   <p>{search.Language}</p>
                </li>
                <li>
                   <p> Production:</p>
                   <p>{search.Production}</p>
                </li>
                <li>
                   <p> Metascore:</p>
                   <p>{search.Metascore}</p>
                </li>
                <li>
                   <p> Rated:</p>
                   <p>{search.Rated}</p>
                </li>
                <li>
                   <p> Released:</p>
                   <p>{search.Released}</p>
                </li>
                <li >
                   <p > Plot:</p>
                   <p>{search.Plot}</p>
                </li>
                <li>
                   <p> Runtime:</p>
                   <p>{search.Runtime}</p>
                </li>
                <li>
                   <p> Title:</p>
                   <p>{search.Title}</p>
                </li>
                <li>
                   <p> Type:</p>
                   <p>{search.Type}</p>
                </li>
                <li>
                   <p> Website:</p>
                   <p>{search.Website}</p>
                </li>
                <li>
                   <p> Year:</p>
                   <p>{search.Year}</p>
                </li>
                <li>
                   <p> Writer:</p>
                   <p>{search.Writer}</p>
                </li>
                <li>
                   <p> imdbRating:</p>
                   <p>{search.imdbRating}</p>
                </li>
                <li>
                   <p> imdbVotes:</p>
                   <p>{search.imdbVotes}</p>
                </li>
            </ul>
                }
           
            </div>

            </>
        }
      
    </div>
  )
}

export default Film
