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
  // Create the root folder
  await db.addFolder({
    name: 'root',
    parentFolder: 0, // Root folder has no parent
  });

  // Create main folders and subfolders
  const folders = [
    {
      name: 'dashboard',
      parentFolder: 1,
      userId: 1,
      subfolders: [
        {
          name: 'analytics',
          userId: 1,
        },
        {
          name: 'settings',
          userId: 1,
        },
      ],
    },
    {
      name: 'documents',
      parentFolder: 1,
      userId: 2,
      subfolders: [
        {
          name: 'reports',
          userId: 2,
        },
        {
          name: 'invoices',
          userId: 2,
        },
      ],
    },
    {
      name: 'projects',
      parentFolder: 1,
      userId: 3,
      subfolders: [
        {
          name: 'projectA',
          userId: 3,
        },
        {
          name: 'projectB',
          userId: 3,
        },
      ],
    },
  ];

  for (const folder of folders) {
    try {
      const parentFolder = await db.addFolder(folder);
      console.log(`Added folder: ${folder.name}`);
      for (const subfolder of folder.subfolders) {
        await db.addFolder({ ...subfolder, parentFolder: parentFolder.id });
        console.log(`Added subfolder: ${subfolder.name}`);
      }
    } catch (error) {
      console.error(`Error adding folder ${folder.name}:`, error);
    }
  }
};

const seedFiles = async () => {
  // prettier-ignore
  const files = [
    { name: 'file1.txt', folderId: 1, userId: 1, cloudinaryUrl: 'https://res.cloudinary.com/demo/file1.txt' },
    { name: 'file2.txt', folderId: 2, userId: 2, cloudinaryUrl: 'https://res.cloudinary.com/demo/file2.txt' },
    { name: 'file3.txt', folderId: 3, userId: 3, cloudinaryUrl: 'https://res.cloudinary.com/demo/file3.txt' },
  
    // Subfolder
    { name: 'file4.txt', folderId: 4, userId: 1, cloudinaryUrl: 'https://res.cloudinary.com/demo/file4.txt' },
    { name: 'file5.txt', folderId: 5, userId: 2, cloudinaryUrl: 'https://res.cloudinary.com/demo/file5.txt' },
    { name: 'file6.txt', folderId: 6, userId: 3, cloudinaryUrl: 'https://res.cloudinary.com/demo/file6.txt' }  
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
