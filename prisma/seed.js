import db from '../config/db/queries.js';

const seedUsers = async () => {
  const users = [
    { username: 'john_doe', password: 'password123' },
    { username: 'jane_smith', password: 'securepass456' },
    { username: 'alice_john', password: 'mypassword789' },
  ];

  for (const user of users) {
    try {
      await db.addUser(user);
      console.log(`Added user: ${user.username}`);
    } catch (error) {
      console.error(`Error adding user ${user.username}:`, error);
    }
  }
};

const seedFolders = async () => {
  // prettier-ignore
  const folders = [
    { name: 'dashboard', path: '/folders/dashboard', parentFolder: 0, userId: 1 },
    { name: 'documents', path: '/folders/documents', parentFolder: 0, userId: 2 },
    { name: 'projects', path: '/folders/projects', parentFolder: 0, userId: 3 },
  ];

  for (const folder of folders) {
    try {
      await db.addFolder(folder);
      console.log(`Added folder: ${folder.name}`);
    } catch (error) {
      console.error(`Error adding folder ${folder.name}:`, error);
    }
  }
};

const seedFiles = async () => {
  // prettier-ignore
  const files = [
    { name: 'file1.txt', path: '/folders/dashboard/file1.txt', folderId: 1, userId: 1 },
    { name: 'file2.txt', path: '/folders/documents/file2.txt', folderId: 2, userId: 2 },
    { name: 'file3.txt', path: '/folders/projects/file3.txt', folderId: 3, userId: 3 },
  ];

  for (const file of files) {
    try {
      await db.addFile(file);
      console.log(`Added file: ${file.name}`);
    } catch (error) {
      console.error(`Error adding file ${file.name}:`, error);
    }
  }
};

const main = async () => {
  try {
    await seedUsers();
    await seedFolders();
    await seedFiles();
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
};

main();
