import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const getDemoData:any = createAsyncThunk(
  "demo/getData",
  async (initData: string) => {
    const res = await axios.post("http://127.0.0.1:3001/api/getDemoData", {
      content: initData,
    });
    return res.data?.data?.content;
  }
);

// 注入新版redux
const demoReducer = createSlice({
  name: "demo",
  initialState:
    typeof window !== "undefined"
      ? (window as any)?.context?.state?.demo
      : {
          content: "默认数据",
        },
  reducers: {},
  extraReducers(build) {
    build
      .addCase(getDemoData.pending, (state, action) => {
        state.content = "pending";
      })
      .addCase(getDemoData.fulfilled, (state, action) => {
        state.content = action.payload;
      })
      .addCase(getDemoData.rejected, (state, action) => {
        state.content = "rejected";
      });
  },
});

export { demoReducer, getDemoData };
