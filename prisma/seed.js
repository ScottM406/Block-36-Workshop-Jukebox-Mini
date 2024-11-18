const prisma = require("../prisma");
const { faker } = require("@faker-js/faker");

const seed = async ( numUsers = 20, numPlaylists = 5) => {
  for (let i = 0; i < numUsers; i++) {
   const playlists = Array.from({ length: numPlaylists}, (_,j) => {
    return {
      name: faker.company.buzzPhrase() + " Mix",
      description: faker.lorem.sentence(),
    };
   });

  await prisma.user.create({
    data: {
      username: faker.internet.username(),
      playlists: {
        create: playlists,
      },
    },
   });
  }
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });