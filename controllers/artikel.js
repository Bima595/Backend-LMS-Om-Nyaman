import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Get all Artikel
export const getArtikel = async (req, res) => {
  try {
    const response = await prisma.artikel.findMany(); // Model name must be lowercase
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message }); // Use proper status codes
  }
};

// Get Artikel by ID
export const getArtikelById = async (req, res) => {
  try {
    const response = await prisma.artikel.findUnique({
      where: {
        id: req.params.id, // Ensure `id` is a string, as your schema defines `id` as `String`
      },
    });
    if (!response) {
      return res.status(404).json({ msg: "Artikel not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Create new Artikel
export const createArtikel = async (req, res) => {
  try {
    const artikel = await prisma.artikel.create({
      data: {
        judul: req.body.judul,
        tanggal: new Date(req.body.tanggal),
        body: req.body.body,
      },
    });
    res.status(201).json(artikel); // Use 201 for resource creation
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Update Artikel
export const updateArtikel = async (req, res) => {
  try {
    const artikel = await prisma.artikel.update({
      where: {
        id: req.params.id,
      },
      data: {
        judul: req.body.judul,
        tanggal: req.body.tanggal ? new Date(req.body.tanggal) : undefined,
        body: req.body.body,
        userId: req.body.userId,
      },
    });
    res.status(200).json(artikel);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete Artikel
export const deleteArtikel = async (req, res) => {
  try {
    const artikel = await prisma.artikel.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(artikel);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
