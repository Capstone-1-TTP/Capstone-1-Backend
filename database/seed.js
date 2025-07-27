const db = require("./db");
const { User, Poll, Ballot, Option } = require("./index");

const seed = async () => {
  try {
    db.logging = false;
    await db.sync({ force: true }); // Drop and recreate tables

    // User table dummy data
    const users = await User.bulkCreate([
      { 
        firstName: "Alice",
        lastName: "Admin",
        email: "admin@example.com",
        passwordHash: User.hashPassword("admin1"),
        auth0Id: "",
        profilePic: "https://i.pravatar.cc/150?img=1",
      },
      { 
        firstName: "Bob",
        lastName: "Ross",
        email: "bobRossTheBoss@example.com",
        passwordHash: User.hashPassword("user1"),
        auth0Id: "",
        profilePic: "https://i.pravatar.cc/150?img=1",
      },
      { 
        firstName: "Carol",
        lastName: "Coder",
        email: "carol@example.com",
        passwordHash: User.hashPassword("user2"),
        auth0Id: "",
        profilePic: "https://i.pravatar.cc/150?img=1",
      },
      { 
        firstName: "Elliot",
        lastName: "Alderson",
        email: "elliot123@example.com",
        passwordHash: User.hashPassword("user3"),
        auth0Id: "",
        profilePic: "https://i.pravatar.cc/150?img=1",
      },
      { 
        firstName: "Olivia",
        lastName: "Cortez",
        email: "ocortez111@example.com",
        passwordHash: User.hashPassword("user4"),
        auth0Id: "",
        profilePic: "https://i.pravatar.cc/150?img=1",
      },
    ]);

    // Poll table dummy data
    const polls = await Poll.bulkCreate([
      {
        // polls[0]: 5 options, Spider-Man Characters
        title: "Best Spiderverse Character",
        description: "Vote on who you think is the best character in Spiderverse.",
        status: "published",
        closingDate: new Date("2026-10-26T14:30:00"),
        authRequired: true,
        link: "",
        userId: users[0].id,
      },
      { 
        // polls[1]: 4 options, Asian Cuisines
        title: "Favorite Asian Cuisine",
        description: "Please rank your favorite Asian cuisines.",
        status: "draft",
        closingDate: new Date("2025-9-15T18:30:00"),
        authRequired: false,
        link: "",
        userId: users[0].id,
      },
      { 
        // polls[2]: 8 options, MTA Subway Lines
        title: "Worst MTA Subway Line",
        description: "The delays, the smells, the chaos!! Vote on which NYC Subway line is the worst!",
        status: "published",
        closingDate: new Date("2025-11-1T23:59:59"),
        authRequired: false,
        link: "",
        userId: users[1].id,
      },
      {
        // polls[3]: 2 options, Avatar Movies
        title: "Avatar 1 vs Avatar 2",
        description: "Which movie was better, Avatar 1 or Avatar 2?",
        status: "closed",
        closingDate: new Date("2025-7-20T17:00:00"),
        authRequired: true,
        link: "",
        userId: users[1].id,
      },
      { 
        // polls[4]: 5 options, Computer Brands
        title: "Best Computer Brands",
        description: "Rank your favorite computer brands from best to worst.",
        status: "published",
        closingDate: new Date("2025-12-31T23:59:59"),
        authRequired: false,
        link: "",
        userId: users[2].id,
      },
      { 
        // polls[5]: 4 options, Movies
        title: "Movie Night",
        description: "Let's have a movie night! Rank the choices!",
        status: "draft",
        closingDate: new Date("2025-9-15T18:30:00"),
        authRequired: true,
        link: "",
        userId: users[2].id,
      },
      {
        // polls[6]: 5 options, Philosophy Books
        title: "Best Philosophy Book",
        description: "What does it mean to vote? Rank these philosophy books to find out!",
        status: "closed",
        closingDate: new Date("2025-5-15T17:00:00"),
        authRequired: false,
        link: "",
        userId: users[3].id,
      },
      { 
        // polls[7]: 5 options, Punk Bands
        title: "Pre-2K Punk Bands",
        description: "Rank these bands to see who we'll listen to at Hard Rock event!",
        status: "published",
        closingDate: new Date("2026-10-26T14:30:00"),
        authRequired: false,
        link: "",
        userId: users[3].id,
      },
      { 
        // polls[8]: 6 options, F1 Drivers
        title: "Best F1 Driver of All Time",
        description: "Rank these legendary F1 drivers to see who is considered the best of all time!",
        status: "Closed",
        closingDate: new Date("2025-6-25T21:00:00"),
        authRequired: false,
        link: "",
        userId: users[4].id,
      },
      { 
        // polls[9]: 5 options, Video Games
        title: "Video Game Debate", 
        description: "Which game is the best? Help figure this out! GG",
        status: "published",
        closingDate: new Date("2025-10-5T12:30:00"),
        authRequired: false,
        link: "",
        userId: users[4].id,
      },
    ]);

    // Option table dummy data
    const options = await Option.bulkCreate([
      // polls[0]: 5 options, Spider-Man Characters
      { details: "Miles Morales" },
      { details: "Spider Gwen" },
      { details: "Miguel O'Hara" },
      { details: "Spider Noir" },
      { details: "Peter Parker" },

      // polls[1]: 4 options, Asian Cuisines
      { details: "Japanese" },
      { details: "Chinese" },
      { details: "Korean" },
      { details: "Thai" },

      // polls[2]: 8 options, MTA Subway Lines
      { details: "2" },
      { details: "4" },
      { details: "5" },
      { details: "D" },
      { details: "B" },
      { details: "C" },
      { details: "F" },
      { details: "N" },

      // polls[3]: 2 options, Avatar Movies
      { details: "Avatar 1" },
      { details: "Avatar 2" },

      // polls[4]: 5 options, Computer Brands
      { details: "Apple" },
      { details: "HP" },
      { details: "Dell" },
      { details: "Lenovo" },
      { details: "Acer" },

      // polls[5]: 4 options, Movies
      { details: "Oppenheimer" },
      { details: "Barbie" },
      { details: "The Departed" },
      { details: "Madagascar" },

      // polls[6]: 5 options, Philosophy Books
      { details: "Thus Spoke Zarathustra" },
      { details: "Meditations" },
      { details: "Tractatus Logico-Philosophicus" },
      { details: "Critique of Pure Reason" },
      { details: "The Myth of Sisyphus" },

      // polls[7]: 5 options, Punk Bands
      { details: "Fugazi" },
      { details: "Bad Brains" },
      { details: "Dead Kennedys" },
      { details: "Joy Division" },
      { details: "Black Flag" },

      // polls[8]: 6 options, F1 Drivers
      { details: "Max Verstappen" },
      { details: "Ayrton Senna" },
      { details: "Niki Lauda" },
      { details: "Michael Schumacher" },
      { details: "Juan Manuel Fangio" },
      { details: "Lewis Hamilton" },

      // polls[9]: 5 options, Video Games
      { details: "Mario Kart 8 Deluxe" },
      { details: "Halo" },
      { details: "The Last of Us" },
      { details: "Doom" },
      { details: "Fortnight" },
    ]);

    // Ballot table dummy data
    const ballots = await Ballot.bulkCreate([
      // polls[0]: 3 ballots
      {
        optionsRanking: [5, 1, 2, 3, 4],
        isSubmitted: true,
        userId: users[0].id,
        pollId: polls[0].id,
      },
      {
        optionsRanking: [1, 5, 2, 3, 4],
        isSubmitted: false,
        userId: users[0].id,
        pollId: polls[0].id,
      },
      {
        optionsRanking: [5, 2, 1, 3, 4],
        isSubmitted: true,
        userId: users[1].id,
        pollId: polls[0].id,
      },

      // polls[2]: 5 ballots
      {
        optionsRanking: [4, 5, 2, 7, 1, 3, 6, 8],
        isSubmitted: true,
        userId: users[0].id,
        pollId: polls[2].id,
      },
      {
        optionsRanking: [5, 4, 7, 1, 2, 3, 8, 6],
        isSubmitted: true,
        userId: users[1].id,
        pollId: polls[2].id,
      },
      {
        optionsRanking: [2, 3, 8, 6, 4, 5, 7, 1],
        isSubmitted: false,
        userId: users[1].id,
        pollId: polls[2].id,
      },
      {
        optionsRanking: [4, 5, 7, 1, 2, 3, 8, 6],
        isSubmitted: true,
        userId: users[3].id,
        pollId: polls[2].id,
      },
      {
        optionsRanking: [7, 1, 2, 4, 5, 3, 8, 6],
        isSubmitted: true,
        userId: users[4].id,
        pollId: polls[2].id,
      },

      // polls[3]: 1 ballot
      {
        optionsRanking: [1, 2],
        isSubmitted: true,
        userId: users[2].id,
        pollId: polls[3].id,
      },

      // polls[4]: 4 ballots
      {
        optionsRanking: [1, 2, 5, 4, 3],
        isSubmitted: true,
        userId: users[1].id,
        pollId: polls[4].id,
      },
      {
        optionsRanking: [4, 3, 1, 5, 2],
        isSubmitted: true,
        userId: users[2].id,
        pollId: polls[4].id,
      },
      {
        optionsRanking: [1, 3, 2, 4, 5],
        isSubmitted: true,
        userId: users[3].id,
        pollId: polls[4].id,
      },
      {
        optionsRanking: [2, 4, 5, 3, 1],
        isSubmitted: true,
        userId: users[4].id,
        pollId: polls[4].id,
      },

      // polls[6]: 5 ballots
      {
        optionsRanking: [2, 5, 1, 4, 3],
        isSubmitted: true,
        userId: users[0].id,
        pollId: polls[6].id,
      },
      {
        optionsRanking: [3, 1, 5, 4, 2],
        isSubmitted: true,
        userId: users[1].id,
        pollId: polls[6].id,
      },
      {
        optionsRanking: [5, 1, 4, 3, 2],
        isSubmitted: false,
        userId: users[2].id,
        pollId: polls[6].id,
      },
      {
        optionsRanking: [1, 3, 2, 5, 4],
        isSubmitted: true,
        userId: users[3].id,
        pollId: polls[6].id,
      },
      {
        optionsRanking: [3, 4, 1, 2, 5],
        isSubmitted: true,
        userId: users[4].id,
        pollId: polls[6].id,
      },

      // polls[7]: 3 ballots
      {
        optionsRanking: [4, 1, 5, 3, 2],
        isSubmitted: true,
        userId: users[1].id,
        pollId: polls[7].id,
      },
      {
        optionsRanking: [5, 3, 2, 4, 1],
        isSubmitted: true,
        userId: users[3].id,
        pollId: polls[7].id,
      },
      {
        optionsRanking: [3, 5, 2, 4, 1],
        isSubmitted: true,
        userId: users[4].id,
        pollId: polls[7].id,
      },

      // polls[8]: 5 ballots
      {
        optionsRanking: [6, 2, 1, 4, 3, 5],
        isSubmitted: true,
        userId: users[0].id,
        pollId: polls[8].id,
      },
      {
        optionsRanking: [1, 6, 4, 2, 3, 5],
        isSubmitted: true,
        userId: users[0].id,
        pollId: polls[8].id,
      },
      {
        optionsRanking: [2, 6, 5, 3, 4, 1],
        isSubmitted: true,
        userId: users[1].id,
        pollId: polls[8].id,
      },
      {
        optionsRanking: [2, 4, 6, 3, 5, 1],
        isSubmitted: true,
        userId: users[3].id,
        pollId: polls[8].id,
      },
      {
        optionsRanking: [4, 2, 5, 3, 1, 6],
        isSubmitted: true,
        userId: users[4].id,
        pollId: polls[8].id,
      },

      // polls[9]: 3 ballots
      {
        optionsRanking: [3, 2, 1, 4, 5],
        isSubmitted: true,
        userId: users[0].id,
        pollId: polls[9].id,
      },
      {
        optionsRanking: [4, 5, 2, 3, 1],
        isSubmitted: true,
        userId: users[2].id,
        pollId: polls[9].id,
      },
      {
        optionsRanking: [1, 3, 5, 4, 2],
        isSubmitted: true,
        userId: users[4].id,
        pollId: polls[9].id,
      }
    ]);

    console.log(`Created ${users.length} users.`);
    console.log(`Created ${polls.length} polls.`);
    console.log(`Created ${options.length} options.`);
    console.log(`Created ${ballots.length} ballots.`);
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
