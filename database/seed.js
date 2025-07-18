const db = require("./db");
const { User } = require("./index");
const {Poll} = require("./index");

const seed = async () => {
  try {
    db.logging = false;
    await db.sync({ force: true }); // Drop and recreate tables

    const users = await User.bulkCreate([
      { username: "admin", passwordHash: User.hashPassword("admin123"), firstName: "Alice", lastName: "Admin", email: "admin@example.com", profilePic: "https://i.pravatar.cc/150?img=1"},
      { username: "user1", passwordHash: User.hashPassword("user111"), firstName: "Bob", lastName: "Builder", email: "bob@example.com", profilePic: "https://i.pravatar.cc/150?img=1"},
      { username: "user2", passwordHash: User.hashPassword("user222"), firstName: "Carol", lastName: "Coder", email: "carol@example.com", profilePic: "https://i.pravatar.cc/150?img=1"},
    ]);
   const specificDate = new Date("2026-10-26T14:30:00"); 
    const polls = await Poll.bulkCreate([
      {title: "Spiderverse", description:"A spider movie", status: "Published",closingDate:specificDate},
      {title: "Toy Story", description:"A toy movie", status: "Closed",closingDate:specificDate},
      {title: "Kingsman", description:"A king movie", status: "Drafted",closingDate:specificDate},
    ]);
    console.log(`Created ${polls.length} polls`)

    console.log(`👤 Created ${users.length} users`);

    // Create more seed data here once you've created your models
    // Seed files are a great way to test your database schema!

    console.log("🌱 Seeded the database");
  } catch (error) {
    console.error("Error seeding database:", error);
    if (error.message.includes("does not exist")) {
      console.log("\n🤔🤔🤔 Have you created your database??? 🤔🤔🤔");
    }
  }
  db.close();
};

seed();
