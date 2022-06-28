export const seedData = {
  users: {
    _model: "User",
    jonathan: {
      firstName: "j",
      lastName: "s",
      email: "jonathan@scheffel.com",
      password: "secret",
      isAdmin: true,
    },
    johnny: {
      firstName: "Johnny",
      lastName: "Depp",
      email: "johnny@depp.com",
      password: "secret",
    },
    arnold: {
      firstName: "Arnold",
      lastName: "Schwarzenegger",
      email: "arnold@schwarzenegger.de",
      password: "secret",
    },
    admin: {
      firstName: "Admin",
      lastName: "Important",
      email: "admin@important.com",
      password: "secret",
    },
  },
  waterfalls: {
    _model: "Waterfall",
    gullfoss: {
      name: "Gullfoss",
      location: {
        lat: 64.326111,
        long: -20.121111,
      },
      userid: "->users.johnny",
      description:
        "Gullfoss (America Golden Falls; Icelandic pronunciation (help·info) [ˈkʏtl̥ˌfɔsː]) is a waterfall located in the canyon of the Hvítá river in southwest Iceland. (source: wikipedia)",
      categories: {
        continent: "Europe",
        size: "Large",
      },
    },
    krimmler: {
      name: "Krimmler Waterfalls",
      location: {
        lat: 47.198056,
        long: 12.171389,
      },
      userid: "->users.arnold",
      categories: {
        continent: "Europe",
        size: "Large",
      },
    },
    reichenbach: {
      name: "Reichenbach Falls",
      location: {
        lat: 46.713611,
        long: 8.183056,
      },
      userid: "->users.johnny",
      categories: {
        continent: "Europe",
        size: "Large",
      },
    },
    niagara: {
      name: "Niagara Falls",
      location: {
        lat: 43.0799,
        long: -79.0747,
      },
      userid: "->users.admin",
      categories: {
        continent: "North America",
        size: "Large",
      },
    },
  },
};
