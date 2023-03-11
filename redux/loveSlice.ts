import { createSlice } from '@reduxjs/toolkit'

interface ILove{
    imdbID:string;
    Title:string;
    Poster:string;
}

interface IStateLove{
    data: {
        items: ILove[],
    },
}
const initialState:IStateLove = {
    data:{
        items:[]
    }
}

const loveSlice = createSlice({
  name: "love",
  initialState,
  reducers: {
        setLove(state,action){
           state.data.items.push(action.payload)
        },
        removeLove(state,action){
            state.data.items = []
        }
  }
});

export const {setLove,removeLove} = loveSlice.actions

export default loveSlice.reducer