const db = require("./db");
const { User } = require("./index");
const { Poll } = require("./index");
const { Ballot } = require("./index");

const seed = async () => {
  try {
    db.logging = false;
    await db.sync({ force: true }); // Drop and recreate tables

    // Create more seed data here once you've created your models
    // Seed files are a great way to test your database schema!

    // User table dummy data - William
    const users = await User.bulkCreate([
      { username: "admin", passwordHash: User.hashPassword("admin123"), firstName: "Alice", lastName: "Admin", email: "admin@example.com", profilePic: "https://i.pravatar.cc/150?img=1"},
      { username: "user1", passwordHash: User.hashPassword("user111"), firstName: "Bob", lastName: "Builder", email: "bob@example.com", profilePic: "https://i.pravatar.cc/150?img=1"},
      { username: "user2", passwordHash: User.hashPassword("user222"), firstName: "Carol", lastName: "Coder", email: "carol@example.com", profilePic: "https://i.pravatar.cc/150?img=1"},
    ]);

    // Poll table dummy data - Bilal
    const specificDate = new Date("2026-10-26T14:30:00");
    const polls = await Poll.bulkCreate([
      { title: "Spiderverse", description: "A spider movie", status: "Published", closingDate: specificDate },
      { title: "Toy Story", description: "A toy movie", status: "Closed", closingDate: specificDate },
      { title: "Kingsman", description: "A king movie", status: "Drafted", closingDate: specificDate },
    ]);

    // Option table dummy data - Emmanuel
    // Emmanuel: coming soon...

    // Ballot table dummy data - Charly
    const ballots= await Ballot.bulkCreate([
      {userId: users[0].id, pollId: polls[0].id, optionRanking: [], isSubmitted: true},
      {userId: users[1].id, pollId: polls[1].id, optionRanking: [], isSubmitted: false},
      {userId: users[2].id, pollId: polls[2].id, optionRanking: [], isSubmitted: true}
    ]);

    console.log(`Created ${users.length} users`);
    console.log(`Created ${polls.length} polls`);
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
