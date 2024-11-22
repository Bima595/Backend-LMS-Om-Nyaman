import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//Membuat Kelas
export const createClass = async (req, res) => {
  try {
    const { nama, deskripsi, hari, jamKelas } = req.body;

    const newClass = await prisma.class.create({
      data: {
        nama,
        deskripsi,
        hari,
        jamKelas,
      },
    });

    res.status(201).json({
      message: 'Class created successfully',
      data: newClass,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating class',
      error: error.message,
    });
  }
};


//Masuk ke Kelas
export const joinClass = async (req, res) => {
    try {
      const { userId, classId } = req.body;
  
      // Check if class exists
      const classExists = await prisma.class.findUnique({
        where: { id: classId },
      });
  
      if (!classExists) {
        return res.status(404).json({ message: 'Class not found' });
      }
  
      // Check if user is already joined this class
      const alreadyJoined = await prisma.userClass.findUnique({
        where: { userId_classId: { userId, classId } },
      });
  
      if (alreadyJoined) {
        return res.status(400).json({ message: 'User already joined the class' });
      }
  
      // Create a new record in UserClass to represent the user joining the class
      const newUserClass = await prisma.userClass.create({
        data: {
          userId,
          classId,
          isJoined: true,  // Assume user is joining, set isJoined to true
        },
      });
  
      res.status(201).json({
        message: 'User successfully joined the class',
        data: newUserClass,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error joining class',
        error: error.message,
      });
    }
  };
  


//Keluar dari Kelas
export const leaveClass = async (req, res) => {
    try {
      const { userId, classId } = req.body;
  
      // Check if class exists
      const classExists = await prisma.class.findUnique({
        where: { id: classId },
      });
  
      if (!classExists) {
        return res.status(404).json({ message: 'Class not found' });
      }
  
      // Check if user is currently joined
      const userClass = await prisma.userClass.findUnique({
        where: { userId_classId: { userId, classId } },
      });
  
      if (!userClass) {
        return res.status(400).json({ message: 'User not joined in this class' });
      }
  
      // Update the 'isJoined' field to false and remove the association from UserClass
      await prisma.userClass.update({
        where: { userId_classId: { userId, classId } },
        data: {
          isJoined: false, // Set the user as not joined
        },
      });
  
      // Optionally, remove the userClass record if you want to delete it
      await prisma.userClass.delete({
        where: { userId_classId: { userId, classId } },
      });
  
      res.status(200).json({
        message: 'User successfully left the class',
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error leaving class',
        error: error.message,
      });
    }
  };
  


//Ngambil Semua List Siswa Siapa Saja Yang Masuk Ke Kelas
export const getClassUsers = async (req, res) => {
  try {
    const { classId } = req.params;

    const classWithUsers = await prisma.class.findUnique({
      where: { id: classId },
      include: {
        userClasses: {
          include: {
            user: true, 
          },
        },
      },
    });

    if (!classWithUsers) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Ekstrak daftar pengguna dari hasil query
    const users = classWithUsers.userClasses.map((userClass) => userClass.user);

    res.status(200).json({
      message: 'Class users retrieved successfully',
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving class users',
      error: error.message,
    });
  }
};
