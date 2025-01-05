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
  const rootFolder = await db.addFolder({
    name: 'root',
    path: '/dashboard',
    parentFolder: 0, // Root folder has no parent
  });

  // Create main folders and subfolders
  const folders = [
    {
      name: 'dashboard',
      path: '/dashboard/folders/dashboard',
      parentFolder: 1,
      userId: 1,
      subfolders: [
        {
          name: 'analytics',
          path: '/dashboard/folders/dashboard/analytics',
          userId: 1,
        },
        {
          name: 'settings',
          path: '/dashboard/folders/dashboard/settings',
          userId: 1,
        },
      ],
    },
    {
      name: 'documents',
      path: '/dashboard/folders/documents',
      parentFolder: 1,
      userId: 2,
      subfolders: [
        {
          name: 'reports',
          path: '/dashboard/folders/documents/reports',
          userId: 2,
        },
        {
          name: 'invoices',
          path: '/dashboard/folders/documents/invoices',
          userId: 2,
        },
      ],
    },
    {
      name: 'projects',
      path: '/dashboard/folders/projects',
      parentFolder: 1,
      userId: 3,
      subfolders: [
        {
          name: 'projectA',
          path: '/dashboard/folders/projects/projectA',
          userId: 3,
        },
        {
          name: 'projectB',
          path: '/dashboard/folders/projects/projectB',
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
    { name: 'file1.txt', path: '/dashboard/folders/dashboard/file1.txt', folderId: 1, userId: 1 },
    { name: 'file2.txt', path: '/dashboard/folders/documents/file2.txt', folderId: 2, userId: 2 },
    { name: 'file3.txt', path: '/dashboard/folders/projects/file3.txt', folderId: 3, userId: 3 },

    // Subfolder
    { name: 'file4.txt', path: '/dashboard/folders/dashboard/analytics/file4.txt', folderId: 4, userId: 1 },
    { name: 'file5.txt', path: '/dashboard/folders/documents/reports/file5.txt', folderId: 5, userId: 2 },
    { name: 'file6.txt', path: '/dashboard/folders/projects/projectA/file6.txt', folderId: 6, userId: 3 }  
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
