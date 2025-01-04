import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const addUser = async (data) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await prisma.user.create({
      data: {
        username: data.username,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

const addFolder = async (folder) => {
  try {
    return await prisma.folder.create({
      data: {
        name: folder.name,
        path: folder.path,
        parentFolder: folder.parentFolder,
        userId: folder.userId,
      },
    });
  } catch (error) {
    console.error('Error adding folder:', error);
    throw error;
  }
};

const addFile = async (file) => {
  try {
    return await prisma.file.create({
      data: {
        name: file.name,
        path: file.path,
        userId: file.userId,
        folderId: file.folderId,
      },
    });
  } catch (error) {
    console.error('Error adding folder:', error);
    throw error;
  }
};

const db = { addFolder, addUser, addFile };

export default db;
