import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
export const randomUser = createAsyncThunk(
    'user/getRandomUser',
    async (data: any) => {
        const res: any = await axios.post('https://randomuser.me/api/', data)
        return res.data;
    }
)
