import { Guest } from "../models/index.js";
import { generateSlug } from "../utils/generateSlug.js";

export const getAllGuests = async (req, res) => {
  const guests = await Guest.findAll();
  res.json(guests);
};

export const getPublicGuests = async (req, res) => {
  // return minimal info for public listing
  const guests = await Guest.findAll({ attributes: ["id", "name", "slug"] });
  res.json(guests);
};

export const getGuestBySlug = async (req, res) => {
  const { slug } = req.params;
  const guest = await Guest.findOne({ where: { slug } });
  if (!guest) return res.status(404).json({ message: "Guest not found" });
  res.json(guest);
};

export const createGuest = async (req, res) => {
  const { name, phone, address } = req.body;
  const slug = generateSlug(name);
  const guest = await Guest.create({ name, slug, phone, address });
  res.status(201).json(guest);
};

export const updateGuest = async (req, res) => {
  try {
    const { slug } = req.params;
    const guest = await Guest.findOne({ where: { slug } });
    if (!guest) return res.status(404).json({ message: "Guest not found" });

    const { name, phone, address, invitation_sent, is_attending, note } =
      req.body;
    // If name changed, regenerate slug
    if (name && name !== guest.name) {
      guest.slug = generateSlug(name);
      guest.name = name;
    }
    if (typeof phone !== "undefined") guest.phone = phone;
    if (typeof address !== "undefined") guest.address = address;
    if (typeof invitation_sent !== "undefined")
      guest.invitation_sent = invitation_sent;
    if (typeof is_attending !== "undefined") guest.is_attending = is_attending;
    if (typeof note !== "undefined") guest.note = note;

    await guest.save();
    res.json(guest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteGuest = async (req, res) => {
  try {
    const { slug } = req.params;
    const guest = await Guest.findOne({ where: { slug } });
    if (!guest) return res.status(404).json({ message: "Guest not found" });
    await guest.destroy();
    res.json({ message: "Guest deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
