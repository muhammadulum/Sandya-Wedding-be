import { RSVP, Guest } from "../models/index.js";

export const submitRSVP = async (req, res) => {
  try {
    let { name, attending, message } = req.body;

    // 🧩 Pastikan boolean
    if (attending === "true" || attending === true) {
      attending = true;
    } else if (attending === "false" || attending === false) {
      attending = false;
    } else {
      return res.status(400).json({ error: "attending harus true atau false" });
    }

    // ✅ Validasi yang benar
    if (!name?.trim() || typeof attending !== "boolean" || !message?.trim()) {
      return res.status(400).json({ error: "Semua field harus diisi." });
    }

    // 💾 Simpan ke database
    const rsvp = await RSVP.create({ name, attending, message });

    // 🟢 Kirim response sukses
    return res.status(201).json({
      message: "RSVP berhasil disimpan.",
      data: rsvp,
    });
  } catch (error) {
    console.error("Error submit RSVP:", error);
    res.status(500).json({
      error: "Terjadi kesalahan pada server.",
      details: error.message,
    });
  }
};

export const getAllRSVPs = async (req, res) => {
  try {
    const rsvps = await RSVP.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(rsvps);
  } catch (error) {
    console.error("Error get RSVP:", error);
    res.status(500).json({ error: "Gagal mengambil data RSVP." });
  }
};

export const getRSVPById = async (req, res) => {
  const { id } = req.params;
  const rsvp = await RSVP.findByPk(id, { include: [{ model: Guest }] });
  if (!rsvp) return res.status(404).json({ message: "RSVP not found" });
  res.json(rsvp);
};

export const updateRSVP = async (req, res) => {
  try {
    const { id } = req.params;
    const rsvp = await RSVP.findByPk(id);
    if (!rsvp) return res.status(404).json({ message: "RSVP not found" });
    const { guest_id, attending, message } = req.body;
    if (guest_id) rsvp.guest_id = guest_id;
    if (typeof attending !== "undefined") rsvp.attending = attending;
    if (typeof message !== "undefined") rsvp.message = message;
    await rsvp.save();

    // update guest attendance if needed
    if (typeof attending !== "undefined") {
      const guest = await Guest.findByPk(rsvp.guest_id);
      if (guest) {
        guest.is_attending = attending;
        await guest.save();
      }
    }

    res.json(rsvp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteRSVP = async (req, res) => {
  try {
    const { id } = req.params;
    const rsvp = await RSVP.findByPk(id);
    if (!rsvp) return res.status(404).json({ message: "RSVP not found" });
    await rsvp.destroy();
    res.json({ message: "RSVP deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
