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
        userId: file.userId,
        folderId: file.folderId,
        url: file.cloudinaryUrl,
      },
    });
  } catch (error) {
    console.error('Error adding folder:', error);
    throw error;
  }
};

const getFileName = async (fileId) => {
  const { name } = await prisma.file.findUnique({
    where: { id: fileId },
  });
  return name;
};

const getFoldersAndFiles = async (folderId, userId) => {
  let subFolders = [];
  let files = [];
  let currentFolder = null;

  try {
    if (folderId === 0) {
      subFolders = await prisma.folder.findMany({
        where: { AND: [{ parentFolder: 0 }, { userId: userId }] },
      });

      files = await prisma.file.findMany({
        where: { AND: [{ folderId: 0 }, { userId: userId }] },
      });
    } else {
      currentFolder = await prisma.folder.findUnique({
        where: { id: folderId },
      });

      if (currentFolder) {
        subFolders = await prisma.folder.findMany({
          where: { AND: [{ parentFolder: currentFolder.id, userId: userId }] },
        });

        files = await prisma.file.findMany({
          where: { AND: [{ folderId: currentFolder.id, userId: userId }] },
        });
      }
    }

    return {
      currentFolder: currentFolder || null,
      files: files,
      subfolders: subFolders,
    };
  } catch (error) {
    console.error('Error fetching folder:', error);
    res.status(500).send('Internal server error');
  }
};

const getUserIdByFileId = async (fileId) => {
  const { userId } = await prisma.file.findUnique({
    where: { id: fileId },
  });
  return userId;
};

const db = {
  addFolder,
  addUser,
  addFile,
  getFileName,
  getFoldersAndFiles,
  getUserIdByFileId,
};

export default db;
