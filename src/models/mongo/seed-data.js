export const seedData = {
  users: {
    _model: "User",
    jonathan: {
      firstName: "Jonathan",
      lastName: "Scheffel",
      email: "jonathan@scheffel.com",
      password: "mySecretPasswordIsVeryLong",
      isAdmin: true,
    },
    johnny: {
      firstName: "Johnny",
      lastName: "Depp",
      email: "johnny@depp.com",
      password: "shortSecret",
    },
    arnold: {
      firstName: "Arnold",
      lastName: "Schwarzenegger",
      email: "arnold@schwarzenegger.de",
      password: "myMediumSecret",
    },
    admin: {
      firstName: "Admin",
      lastName: "Admin",
      email: "admin@admin.com",
      password: "meTheAdminHasAVeryLongPassword",
      isAdmin: true,
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
        "The Reichenbach Falls (German: Reichenbachfälle) are a waterfall cascade of seven steps on the stream called Rychenbach in the Bernese Oberland region of Switzerland. They drop over a total height of about 250 metres (820 ft). At 110 metres (360 ft), the upper falls, known as the Grand Reichenbach Fall (German: Grosser Reichenbachfall), is by far the tallest segment and one of the highest waterfalls in the Alps, and among the forty highest in Switzerland. The Reichenbach loses 290 metres (950 ft) of height from the top of the falls to the valley floor of the Haslital. Today, a hydroelectric power company harnesses the flow of the Reichenbach Falls during certain times of year, reducing its flow. (source: wikipedia)",
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
    johnstonCreek: {
      name: "Johnston Creek, Lower & Upper Falls",
      location: {
        lat: 51.245878,
        long: -115.840997,
      },
      userid: "->users.arnold",
      description:
        "Johnston Creek is a tributary of the Bow River in Canada's Rocky Mountains. The creek is located in Banff National Park. (wikipedia) You can wander along the creek up to the lower and upper falls",
      categories: {
        continent: "North America",
        size: "Small",
      },
    },
    iguazu: {
      name: "Iguazu Falls",
      location: {
        lat: -25.686667,
        long: -54.444722,
      },
      userid: "->users.arnold",
      description:
        'Iguazú Falls or Iguaçu Falls (Guarani: Chororõ Yguasu [ɕoɾo\'ɾõ ɨɣʷa\'su], Spanish: Cataratas del Iguazú [kataˈɾataz ðel iɣwaˈsu]; Portuguese: Cataratas do Iguaçu [kataˈɾatɐs du iɡwaˈsu]) are waterfalls of the Iguazu River on the border of the Argentine province of Misiones and the Brazilian state of Paraná. Together, they make up the largest waterfall system in the world. The falls divide the river into the upper and lower Iguazu. The Iguazu River rises near the heart of the city of Curitiba. For most of its course, the river flows through Brazil; however, most of the falls are on the Argentine side. Below its confluence with the San Antonio River, the Iguazu River forms the border between Argentina and Brazil. The name Iguazú comes from the Guarani or Tupi words "y" [ɨ], meaning "water", and "ûasú "[waˈsu], meaning "big". Legend has it that a deity planned to marry a beautiful woman named Naipí, who fled with her mortal lover Tarobá in a canoe. In a rage, the deity sliced the river, creating the waterfalls and condemning the lovers to an eternal fall. The first European to record the existence of the falls was the Spanish Conquistador Álvar Núñez Cabeza de Vaca in 1541. (wikipedia)',
      categories: {
        continent: "South America",
        size: "Large",
      },
    },
    victoria: {
      name: "Victoria Falls",
      location: {
        lat: -17.924444,
        long: 25.856667,
      },
      userid: "->users.johnny",
      description:
        'Victoria Falls (Lozi: Mosi-oa-Tunya, "The Smoke That Thunders"; Tonga: Shungu Namutitima, "Boiling Water") is a waterfall on the Zambezi River in southern Africa, which provides habitat for several unique species of plants and animals. It is located on the border between Zambia and Zimbabwe and is one of the world\'s largest waterfalls, with a width of 1708 m (5604 ft). Archeological sites and oral history describe a long record of African knowledge of the site. Though known to some European geographers before the 19th century, Scottish missionary David Livingstone identified the falls in 1855, providing the English colonial name of Victoria falls after Queen Victoria. Since the mid 20th century, the site has been an increasingly important source of tourism. Zambia and Zimbabwe both have national parks and tourism infrastructure at the site. Research in the late 2010s found that climate change caused precipitation variability is likely to change the character of the fall. (wikipedia)',
      categories: {
        continent: "Africa",
        size: "Large",
      },
    },
    havasu: {
      name: "Havasu Falls",
      location: {
        lat: 36.255278,
        long: -112.698056,
      },
      userid: "->users.jonathan",
      description:
        "Havasu Falls is located 1+1⁄2 miles (2.4 km) from Supai. It is the more famous and most visited of the various falls along Havasu Creek. It consists of one main chute that drops over a 90-to-100-foot (27 to 30 m) vertical cliff into a series of plunge pools. High calcium carbonate concentration in the water creates the vivid blue-green color and forms the natural travertine dams that occur in various places near the falls. Due to the effects of flash floods, the appearance of Havasu Falls and its plunge pools has changed many times. Prior to the flood of 1910, water flowed in a near continuous sheet, and was known as Bridal Veil Falls. The notch through which water flows first appeared in 1910, and has changed several times since. Water currently flows as one stream. In the past, there were sometimes multiple streams, or a continuous flow over the edge.(wikipedia)",
      categories: {
        continent: "North America",
        size: "Small",
      },
    },
    angel: {
      name: "Angel Falls",
      location: {
        lat: 5.9675,
        long: -62.535556,
      },
      userid: "->users.arnold",
      description:
        'Angel Falls (Spanish: Salto Ángel; Pemon language: Kerepakupai Merú meaning "waterfall of the deepest place", or Parakupá Vená, meaning "the fall from the highest point") is a waterfall in Venezuela. It is the world\'s tallest uninterrupted waterfall, with a height of 979 metres (3,212 ft) and a plunge of 807 m (2,648 ft). The waterfall drops over the edge of the Auyán-tepui mountain in the Canaima National Park (Spanish: Parque Nacional Canaima), a UNESCO World Heritage site in the Gran Sabana region of Bolívar State. The height figure, 979 m (3,212 ft), mostly consists of the main plunge but also includes about 400 metres (1,300 ft) of sloped cascade and rapids below the drop and a 30-metre-high (100 ft) plunge downstream of the talus rapids. The falls are along a fork of the Río Kerepacupai Merú which flows into the Churún River, a tributary of the Carrao River, itself a tributary of the Orinoco River. (wikipedia)',
      categories: {
        continent: "South America",
        size: "Medium",
      },
    },
    dudhsagar: {
      name: "Dudhsagar Falls",
      location: {
        lat: 15.31277,
        long: 74.31416,
      },
      userid: "->users.johnny",
      description:
        "Dudhsagar Falls (lit. 'Sea of Milk') is a four-tiered waterfall located on the Mandovi River in the Indian state of Goa. It is 60 km from Panaji by road and is located on the Belgavi–Vasco Da Gama rail route about 46 km east of Madgaon and 80 km south of Belgavi. Dudhsagar Falls is amongst India's tallest waterfalls with a height of 310 m (1017 feet) and an average width of 30 metres (100 feet). The falls is located in the Bhagwan Mahaveer Sanctuary and Mollem National Park among the Western Ghats. The falls is a punctuation mark in the journey of the Mandovi River from the Western Ghats to Panjim where it meets the Arabian sea. The area is surrounded by deciduous forests with rich biodiversity. This waterfall is also known as Tambdi Surla to some of the local people. The falls are not particularly spectacular during the dry season but during the monsoon season, however, the falls are fed by rains and form a huge force of water. (wikipedia)",
      categories: {
        continent: "Asia",
        size: "Small",
      },
    },
    kaieteur: {
      name: "Kaieteur Falls",
      location: {
        lat: 5.175,
        long: -59.4805,
      },
      userid: "->users.arnold",
      description:
        "Kaieteur Falls is the world's largest single drop waterfall by water volume. Located on the Potaro River in the Kaieteur National Park, it sits in a section of the Amazon rainforest included in the Potaro-Siparuni region of Guyana. It is 226 metres (741 ft) high when measured from its plunge over a sandstone and conglomerate cliff to the first break. It then flows over a series of steep cascades that, when included in the measurements, bring the total height to 251 metres (822 ft). While many falls have greater height, few have the combination of height and water volume, and Kaieteur is among the most powerful waterfalls in the world with an average flow rate of 663 cubic metres per second (23,400 cubic feet per second). Kaieteur Falls is about four and a half times the height of Niagara Falls, on the border between Canada and the United States, and about twice the height of Victoria Falls, on the border of Zambia and Zimbabwe in Africa. It is a single drop waterfall. Upriver from the falls, the Potaro Plateau stretches out to the distant escarpment of the Pakaraima Mountains. The Potaro River empties into the Essequibo River which is the 34th longest river in South America and the longest river in Guyana. (wikipedia)",
      categories: {
        continent: "South America",
        size: "Medium",
      },
    },
    yosemite: {
      name: "Yosemite Falls",
      location: {
        lat: 37.756845,
        long: -119.596785,
      },
      userid: "->users.johnny",
      description:
        "Yosemite Falls is the highest waterfall in Yosemite National Park, dropping a total of 2,425 feet (739 m) from the top of the upper fall to the base of the lower fall. Located in the Sierra Nevada of California, it is a major attraction in the park, especially in late spring when the water flow is at its peak. (wikipedia)",
      categories: {
        continent: "North America",
        size: "Medium",
      },
    },
    plitvice: {
      name: "Plitvice Waterfalls",
      location: {
        lat: 44.9032527,
        long: 15.6081347,
      },
      userid: "->users.jonathan",
      description:
        "The 16 cascading lakes that make up the Plitvice Waterfalls in Plitvice Lakes National Park in Croatia are an extraordinary sight. What makes these waterfalls really special though are the distinct shades of blues and greens - from aquamarine to emerald and turquoise - that can be seen in the water as it flows over limestone and chalk rocks. All of this is surrounded by a lush green landscape that just makes for a visually stunning tableau. Social media picture-perfect, this park attracts more than one million visitors a year. (planetware)",
      categories: {
        continent: "Europe",
        size: "Medium",
      },
    },
    fallCreek: {
      name: "Fall Creek Falls",
      location: {
        lat: 35.66642,
        long: -85.35655,
      },
      userid: "->users.arnold",
      description:
        "Fall Creek Falls is a 256-foot (78 m) tall sheer-drop waterfall located in Fall Creek Falls State Park near Spencer, Tennessee. It is the tallest waterfall of such kind east of the Mississippi River (within the United States). A short trail leads from the parking lot atop the plateau down to the base of the gorge, giving access to the waterfall's plungepool. When water flow is sufficient, Coon Creek Falls shares a plungepool. (wikipedia)",
      categories: {
        continent: "North America",
        size: "Small",
      },
    },
    Pagsanjan: {
      name: "Pagsanjan Falls",
      location: {
        lat: 14.262589,
        long: 121.499961,
      },
      userid: "->users.arnold",
      description:
        "Pagsanjan Falls, also known as Cavinti Falls (local name: Magdapio Falls) is one of the most famous waterfalls in the Philippines. Located in the province of Laguna, the falls is one of the major tourist attractions of the region. The three-drop waterfall is reached by a river trip on dugout canoe, known locally as Shooting the rapids, originating from the municipality of Pagsanjan. The falls can also be reached from the top by a short hike from Cavinti. The boat ride has been an attraction since the Spanish Colonial Era with the oldest written account in 1894. The town of Pagsanjan lies at the confluence of two rivers, the Balanac River and the Bumbungan River (also known as the Pagsanjan River). (wikipedia)",
      categories: {
        continent: "Asia",
        size: "Small",
      },
    },

    shoshone: {
      name: "Shoshone Falls",
      location: {
        lat: 42.595278,
        long: -114.400833,
      },
      userid: "->users.johnny",
      description:
        'Shoshone Falls (/ʃoʊˈʃoʊn/) is a waterfall in the western United States, on the Snake River in south-central Idaho, approximately three miles (5 km) northeast of the city of Twin Falls. Sometimes called the "Niagara of the West," Shoshone Falls is 212 feet (65 m) in height, 45 feet (14 m) higher than Niagara Falls, and flows over a rim nearly one thousand feet (300 m) in width. Formed by the cataclysmic outburst flooding of Lake Bonneville during the Pleistocene ice age about 14,000 years ago, Shoshone Falls marks the historical upper limit of fish migration (including salmon) in the Snake River, and was an important fishing and trading place for Native Americans. The falls were documented by Europeans as early as the 1840s; despite the isolated location, it became a tourist attraction starting in the 1860s. At the beginning of the 20th century, part of the Snake River was diverted for irrigation of the Magic Valley. Now, the flows over the falls can be viewed seasonally based on snowfall, irrigation needs and hydroelectric demands. Irrigation and hydroelectric power stations built on the falls were major contributors to the early economic development of southern Idaho. The City of Twin Falls owns and operates a park overlooking the waterfall. Shoshone Falls is best viewed in the spring, as diversion of the Snake River can significantly diminish water levels in the late summer and fall. The flow over the falls ranges from more than 20,000 cubic feet per second (570 m3/s) during late spring of wet years, to a minimum "scenic flow" (dam release) of 300 cu ft/s (8.5 m3/s) in dry years. (wikipedia)',
      categories: {
        continent: "North America",
        size: "Medium",
      },
    },
    ruby: {
      name: "Ruby Falls",
      location: {
        lat: 35.019167,
        long: -85.339444,
      },
      userid: "->users.arnold",
      description:
        "Ruby Falls is a series of underground cascading waterfalls totaling 145 feet (44 m) in Lookout Mountain, near Chattanooga, Tennessee, in the United States. (wikipedia)",
      categories: {
        continent: "North America",
        size: "Small",
      },
    },
    bridalveil: {
      name: "Bridalveil Fall",
      location: {
        lat: 37.716753,
        long: -119.646505,
      },
      userid: "->users.jonathan",
      description:
        "Bridalveil Fall is one of the most prominent waterfalls in the Yosemite Valley in California. The waterfall is 188 metres (617 ft) in height and flows year round.(wikipedia)",
      categories: {
        continent: "North America",
        size: "Medium",
      },
    },
    palouse: {
      name: "Palouse Falls",
      location: {
        lat: 46.663611,
        long: -118.223611,
      },
      userid: "->users.arnold",
      description:
        "Palouse Falls is a waterfall on the Palouse River, about 4 mi (6 km) upstream of the confluence with the Snake River in southeast Washington, United States. The falls are 200 ft (61 m) in height.[2] The falls consist of an upper fall with a drop around 20 ft (6.1 m), which lies 1,000 ft (305 m) north-northwest of the main drop, and a lower fall, with a drop of 200 ft (61 m). It is in the 94-acre (38 ha) Palouse Falls State Park. (wikipedia)",
      categories: {
        continent: "North America",
        size: "Medium",
      },
    },
    banGioc: {
      name: "Ban Gioc Waterfall",
      location: {
        lat: 22.8564,
        long: 106.722,
      },
      userid: "->users.jonathan",
      description:
        "Ban Gioc – Detian Falls or Ban Gioc Falls (Vietnamese: thác Bản Giốc Cặp thác Bản Giốc - Đức Thiên, Yue Chinese: 板約瀑布, 德天瀑布/dak1 tin1 baan2 joek3 daai6 buk6 bou6, Mandarin Chinese: Détiān pùbù, Bǎnyuē pùbù) is a collective name for two waterfalls on the Quây Sơn River (Chinese: 归春河, Guichun River,Quy Xuân Hà) that straddle the international border between China and Vietnam; more specifically located between the Karst hills of Daxin County, Guangxi, (Vietnamese: Đại Tân, Quảng Tây) and Trùng Khánh District, Cao Bằng Province. (重庆,高平) The waterfalls are located 272 km (169 mi) north of Hanoi. (wikipedia)",
      categories: {
        continent: "Asia",
        size: "Small",
      },
    },
    agrio: {
      name: "Agrio Falls",
      location: {
        lat: -37.8115029,
        long: -70.9407137,
      },
      userid: "->users.johnny",
      description:
        "The Agrio River tumbles off a rock ledge to create the 60-meter-high Agrio Falls (Salto del Agrio). The waterfall is located just one kilometer from the town of Caviahue in Argentina's Patagonia region. Agrio Falls is compelling for its colors. The river here is sulphuric, and the pool at the bottom is a vibrant green. The pool is surrounded by red and yellow volcanic rocks that add to the photogenic contrast of colors. The area topography is also beautiful with a mix of rocks and lush green trees. Arrive early in the morning for the best chance of seeing a rainbow in the falls as they cascade down in two drops split by a basalt rock resembling a head. There are three lookout points to view the falls. (wikipedia)",
      categories: {
        continent: "South America",
        size: "Small",
      },
    },
    mcWay: {
      name: "McWay Falls",
      location: {
        lat: 36.157806,
        long: -121.672139,
      },
      userid: "->users.arnold",
      description:
        "McWay Falls is an 80-foot-tall (24 m) waterfall on the coast of Big Sur in central California that flows year-round from McWay Creek in Julia Pfeiffer Burns State Park, about 37 miles (60 km) south of Carmel, into the Pacific Ocean. During high tide, it is a tidefall, a waterfall that empties directly into the ocean. The only other tidefall in California is Alamere Falls. (wikipedia)",
      categories: {
        continent: "North America",
        size: "Small",
      },
    },
  },
};
