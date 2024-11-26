import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//mengambil semua tugas
export const getTugas = async (req, res) => {
  try {
    const response = await prisma.tugas.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(error).json({ msg: error.message });
  }
};


//mengambil tugas by id 
export const getNewsById = async (req, res) => {
  try {
    const response = await prisma.tugas.findUnique({
      where: {
        id: String(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(error).json({ msg: error.message });
  }
};

//membuat tugas
export const createTugas = async (req, res) => {
    try {
      // Extract variables from req.body
      const { judul, deskripsi, startDate, deadline, classId } = req.body;
  
      // Validate required fields
      if (!judul || !deskripsi || !startDate || !deadline || !classId) {
        return res.status(400).json({ msg: 'All fields are required' });
      }
  
      if (req.file) {
        const fileUrl = `${req.protocol}://${req.get('host')}/document/${req.file.filename}`;
        const response = await prisma.tugas.create({
          data: {
            judul,
            deskripsi,
            startDate: new Date(startDate), // Ensure dates are properly parsed
            deadline: new Date(deadline),
            classId,
            fileUrl,
          },
        });
        res.status(200).json(response);
      } else {
        res.status(400).json({ msg: 'No file uploaded' });
      }
    } catch (error) {
      console.error(error); // Log error
      res.status(400).json({ msg: error.message });
    }
  };
  

export const updateNews = async (req, res) => {
  try {
    // Fetch the existing news data to retain the current image if none is uploaded
    const existingNews = await prisma.tugas.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!existingNews) {
      return res.status(404).json({ msg: 'News not found' });
    }

    // If a new image is uploaded, update the `images` field, otherwise keep the old one
    let imageUrl = existingNews.images;
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`;
    }

    const updatedNews = await prisma.news.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        ...req.body,
        images: imageUrl,
      },
    });

    res.status(200).json(updatedNews); // Return the updated news item
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const response = await prisma.tugas.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
