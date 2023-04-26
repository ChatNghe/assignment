import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const randomUser: any = createAsyncThunk(
  "user/getRandomUser",
  async () => {
    const res: any = await axios.get("https://randomuser.me/api/?results=200");
    return res.data;
  }
);
