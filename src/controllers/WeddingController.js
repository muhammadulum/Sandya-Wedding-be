import { WeddingInfo } from "../models/index.js";

export const getWeddingInfo = async (req, res) => {
  const info = await WeddingInfo.findOne();
  res.json(info);
};

export const updateWeddingInfo = async (req, res) => {
  const [info] = await WeddingInfo.findOrCreate({ where: { id: 1 } });
  await info.update(req.body);
  res.json(info);
};
