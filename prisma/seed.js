import db from '../config/db/queries.js';

async function main() {
  let success = true;

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
      success = false;
      console.error(`Error adding user ${user.username}:`, error);
    }
  }

  success === true ? process.exit(0) : process.exit(1);
}

main();
