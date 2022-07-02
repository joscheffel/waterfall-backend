export const seedData = {
  users: {
    _model: "User",
    jonathan: {
      firstName: "Jonathan",
      lastName: "Scheffel",
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
    krimml: {
      name: "Krimml Waterfalls",
      location: {
        lat: 47.198056,
        long: 12.171389,
      },
      userid: "->users.arnold",
      description:
        "The Krimml Waterfalls (German: Krimmler Wasserfälle), with a total height of 380 metres (1,247 feet), are the highest waterfall in Austria. The falls are on the Krimmler Ache river and are located near the village of Krimml in the High Tauern National Park in Salzburg state.  (source: wikipedia)",
      categories: {
        continent: "Europe",
        size: "Small",
      },
    },
    reichenbach: {
      name: "Reichenbach Falls",
      location: {
        lat: 46.713611,
        long: 8.183056,
      },
      userid: "->users.johnny",
      description:
        "The Reichenbach Falls (German: Reichenbachfälle) are a waterfall cascade of seven steps on the stream called Rychenbach in the Bernese Oberland region of Switzerland.[1] They drop over a total height of about 250 metres (820 ft).[2] At 110 metres (360 ft), the upper falls, known as the Grand Reichenbach Fall (German: Grosser Reichenbachfall), is by far the tallest segment and one of the highest waterfalls in the Alps, and among the forty highest in Switzerland.[3] The Reichenbach loses 290 metres (950 ft) of height from the top of the falls to the valley floor of the Haslital. Today, a hydroelectric power company harnesses the flow of the Reichenbach Falls during certain times of year, reducing its flow. (source: wikipedia)",
      categories: {
        continent: "Europe",
        size: "Medium",
      },
    },
    niagara: {
      name: "Niagara Falls",
      location: {
        lat: 43.0799,
        long: -79.0747,
      },
      userid: "->users.admin",

      description:
        "Niagara Falls (/naɪˈæɡərə/) is a group of three waterfalls at the southern end of Niagara Gorge, spanning the border between the province of Ontario in Canada and the state of New York in the United States. The largest of the three is Horseshoe Falls, also known as the Canadian Falls, which straddles the international border of the two countries. The smaller American Falls and Bridal Veil Falls lie within the United States. Bridal Veil Falls is separated from Horseshoe Falls by Goat Island and from American Falls by Luna Island, with both islands situated in New York. (source: wikipedia)",
      categories: {
        continent: "North America",
        size: "Large",
      },
    },
  },
};
