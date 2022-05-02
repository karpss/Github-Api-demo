
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';





export const getUserRepo = createAsyncThunk(
    'person/getUserAsync',
    async () => {
      const resp = await fetch('https://api.github.com/users/karpss/repos');
      if (resp.ok) {
        const person = await resp.json();
        return {person};
      }
      return {};
    }
  );
  


  export const repoSlice = createSlice({
    name: 'person',
    initialState:[],
    reducers: {
      
    },
    extraReducers: {

        [getUserRepo.pending]: (state,action)=>{
              //console.log('fetching data...')
             },
      
      [getUserRepo.fulfilled]: (state, action) => {
        //console.log('fetched data sucessfully!')
        return action.payload.person;
      },
  
      
    },
  });
  
  //export const {} = repoSlice.actions;
  
  export default repoSlice.reducer;