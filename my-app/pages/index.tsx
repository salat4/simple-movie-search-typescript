import { useRouter } from 'next/router'
import place from "@/images/No-Image-Placeholder.png"
import styles from '@/styles/Home.module.css'
import { FetchSearchData } from '@/API/Api'
import { useEffect,useState,useRef } from "react";
import Notiflix from 'notiflix';
import Image from 'next/image';
// import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch,useAppSelector } from '@/redux/hooks';
import heart from "@/images/heart.png"
import { setLove } from '@/redux/loveSlice';

 interface IStateSearch{
  totalResults:string;
  Response:string;
  Search:ISearch[]
 }
 interface ISearch{
  Poster:string;
  Title:string;
  Type:string;
  Year:string;
  imdbID:string;
 }
  const App: React.FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const selector = useAppSelector(state=>state)
  const router = useRouter()
  const mounted = useRef<boolean>();
  const prevQuery = useRef<string>();
  const [query, setQuery] = useState<string | undefined>()
  const [search, setSearch] = useState<IStateSearch>()
  const [movie, setMovie] = useState<ISearch[]>([])
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState(1)
  useEffect(()=>{
    async function FetchSearch(){
      console.log(query)
        const fetch = await FetchSearchData(query,page)        
        if(fetch.Response === "True"){
          setSearch(fetch)
        }
        else{
          Notiflix.Notify.failure(fetch.Error)
        }
    }

    if(!mounted.current){
      mounted.current = true
        }
        else {
          if(query !== undefined){
            FetchSearch()
          }
          else{
            return
          }
  
}


},[page, query])

useEffect(()=>{
  if(search!== undefined){
    setTotal (Math.ceil(Number(search.totalResults) / 10))
   }
},[search])
useEffect(()=>{
  if(search!== undefined){
    if (movie.length < Number(search.totalResults)){
      setMovie(movie?.concat(search?.Search))
    }
    else{
      setMovie(search?.Search)
    }
  }
},[search])
useEffect(() => {
  if (query !== prevQuery.current) {
    setPage(1);
    setMovie([]);
    prevQuery.current = query;
  }
}, [query]);

const handleSubmit  = (event: React.FormEvent<HTMLFormElement> ) => {
  const { target } = event
  if (target) {
    event.preventDefault()
    if((event.currentTarget.elements[0] as HTMLInputElement).value ){
      setQuery((event.currentTarget.elements[0] as HTMLInputElement).value)
      
    }
    else {
      Notiflix.Notify.warning("Введіть будь-ласка назву фільм або серіал")
    }
  };
} 
const hanldePage = () =>{
  setPage(page + 1)
 
}
const handleClick = (id: string): React.MouseEventHandler<HTMLLIElement> => () => {
  router.push(id)
}
const handleLove = (imdbID:string,title:string,poster:string) : React.MouseEventHandler<HTMLButtonElement>  => () =>{

  if(selector.data.items.find((element:any)=>(element.imdbID === imdbID)) === undefined){
    dispatch(setLove({
      imdbID,
      title,
      poster
  }))
  }


}
const LoveRouter = () =>{
  router.push("/love")
}
return (
   <>
   <div className={styles.container}>
    {/* <div> */}
      <p>
        Будь ласка введіть назву фільма чи серала який ви хотіли би побачити
      </p>
      <form onSubmit={handleSubmit}>
        <input name="query" placeholder='Назва фільма'></input>
        <button type="submit">Пошук</button>
      </form>
    <button className = {styles.love__button} onClick = {LoveRouter}>
      Ви можете перейти до ваших улюблених фільмів
    </button>
    {/* </div> */}
     
      {movie.length !== 0 && <>
          <p>
            Ось фільми чи серіали які я зміг знайти за вашим бажаням
          </p>
         <ul className={styles.list}>
          {movie.map((item)=>(
            <>
            <li onClick={handleClick(item.imdbID)} key = {item.imdbID}>
              <div>
                <Image width={200} height = {200} alt = {item.Title} src = {item.Poster !== "N/A" ? item.Poster : place}/>
                <p>{item.Title}</p>
              </div>
              <button onClick ={handleLove(item.imdbID, item.Title,item.Poster)} className={styles.heart}> 
               <p>Like</p> <Image src = {heart} alt= "heart" width = {25} height = {25}/>
              </button>
             </li>
            
            </>
            
            

          ))}
        </ul>
        {total !== page && 
          <button onClick={hanldePage} className={styles.scroll}>Ви можете прогрузити ще фільми</button>
         }
        
      </>
      }
   </div>
   </>
  )
}
export default App