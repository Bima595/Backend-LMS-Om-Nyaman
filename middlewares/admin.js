import { Request, Response, NextFunction } from 'express';
import { prisma } from '@prisma/client'; // Ensure prisma client is properly imported

export const isAdmin = async (req, res, next) => {
  try {
    const userId = req.userId; // Assuming user ID is added to req object by authentication middleware

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Only admins can perform this action.' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
