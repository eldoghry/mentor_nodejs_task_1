import { Request, Response } from "express";
// import axios from "axios";
import config from "../config";
import cashService from "../services/cache.service";
import axiosRequestWithRetry from "../services/axios.service";
import asyncHandler from "../utils/asyncHandler";

const getAll = asyncHandler(async (req: Request, res: Response) => {
  const key = "posts";

  try {
    const cachedData = await cashService.get(key);

    if (cachedData) return res.status(200).json({ data: cachedData });

    console.log("⏳ Fetching posts from API...");

    // const { data } = await axios.get(`${config.api.baseUrl}/posts`);
    const data = await axiosRequestWithRetry({
      baseURL: config.api.baseUrl,
      url: "/posts",
      method: "get",
    });

    if (data) await cashService.set("posts", data, config.defaultCacheTTL);

    return res.status(200).json({ data });
  } catch (error) {
    console.error("❌ Error fetching posts:", error);
    return res.status(500).json({ message: "Failed to fetch posts" });
  }
});

export { getAll };
