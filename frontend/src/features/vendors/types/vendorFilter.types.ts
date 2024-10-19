// Define a more precise type for the filters

interface BaseFilter {
  title: string;
  type: "checkbox" | "range";
  value: string;
}

export type CheckboxFilter = BaseFilter & {
  type: "checkbox";
  options: string[];
};

export type RangeFilter = BaseFilter & {
  type: "range";
  min: number | null;
  max: number | null;
};

export type Filter = CheckboxFilter | RangeFilter;

export interface VendorFiltersProp {
  [key: string]: Filter;
}

export interface VendorFiltersArrayProp {
  [key: string]: {
    title: string;
    titleDescription: string;
    filters: Filter[];
  };
}

export const VendorTypes: VendorFiltersArrayProp = {
  venues: {
    title: "Venues",
    titleDescription: "Find the perfect venue for your wedding.",
    filters: [
      {
        title: "Venue Type",
        value: "venue_type",
        type: "checkbox",
        options: [
          "hotels, inns, resorts",
          "parks, gardens",
          "restaurants, breweries",
          "golf and country clubs",
          "beaches, waterfront settings",
          "ballrooms, banquet halls",
        ],
      },
      {
        title: "Price",
        type: "range",
        value: "price",
        min: 0,
        max: 1000,
      },
      {
        title: "Capacity",
        type: "range",
        value: "capacity",
        min: 0,
        max: 10000,
      },
      {
        title: "Indoors/Outdoor",
        value: "environment",
        type: "checkbox",
        options: ["indoor", "outdoor", "covered outdoor"],
      },
      {
        title: "Included",
        value: "included",
        type: "checkbox",
        options: ["all-inclusive", "limited service", "raw space"],
      },
      {
        title: "Amenities",
        value: "amenities",
        type: "checkbox",
        options: [
          "bar services",
          "catering services",
          "dance floor",
          "event coordinator",
          "liability insurance",
          "wheelchair accessible",
          "pet friendly",
        ],
      },
    ],
  },
  photographers: {
    title: "Photographers",
    titleDescription: "Capture every moment with professional photography.",
    filters: [
      {
        title: "Price",
        value: "price",
        type: "range",
        min: 0,
        max: 10000, // Assuming a different max for photographers
      },
      {
        title: "Photography Style",
        type: "checkbox",
        value: "style",
        options: [
          "contemporary",
          "vintage",
          "natural",
          "fine art",
          "traditional",
          "film",
          "photojournalistic",
        ],
      },
      {
        title: "Photography Services",
        type: "checkbox",
        value: "services",
        options: [
          "pre-wedding photoshoot",
          "actual day photoshoot",
          "destination photography",
          "solemnisation photography",
          "wedding portraits",
          "video",
          "family & maternity",
          "proposal",
          "livestream",
        ],
      },
    ],
  },
  videographers: {
    title: "Videographers",
    titleDescription: "Expert videography to relive your special day.",
    filters: [
      {
        title: "Price",
        value: "price",
        type: "range",
        min: 0,
        max: 10000, // Adjust according to typical videography pricing
      },
      {
        title: "Videography Styles",
        value: "style",
        type: "checkbox",
        options: [
          "traditional",
          "cinematic",
          "storytelling",
          "documentary",
          "vintage",
        ],
      },
      {
        title: "Videography Services",
        value: "services",
        type: "checkbox",
        options: [
          "pre-wedding videography",
          "actual wedding videography",
          "same day/full day edit",
          "next day edit",
        ],
      },
    ],
  },
  music: {
    title: "Bands & DJs",
    titleDescription: "Perfect music for an unforgettable celebration.",
    filters: [
      {
        title: "Price",
        value: "price",
        type: "range",
        min: 0,
        max: 5000,
      },
      {
        title: "Type",
        value: "music_type",
        type: "checkbox",
        options: ["live band or ensemble", "live solo performer", "dj"],
      },
      {
        title: "Music Genres",
        value: "genre",
        type: "checkbox",
        options: [
          "english pop",
          "mandarin pop",
          "jazz",
          "top 40s",
          "evergreens",
          "bossa nova",
          "acoustic",
          "rock",
          "classical",
        ],
      },
      {
        title: "Instruments",
        value: "instruments",
        type: "checkbox",
        options: [
          "violin",
          "viola",
          "cello",
          "vocals",
          "keyboard",
          "drums",
          "guitar",
          "bass",
          "saxophone",
          "piano",
          "harp",
        ],
      },
      {
        title: "Languages",
        value: "languages",
        type: "checkbox",
        options: [
          "english",
          "mandarin",
          "cantonese",
          "hokkien",
          "malay",
          "tamil",
          "others",
        ],
      },
    ],
  },
  emcees: {
    title: "Emcees",
    titleDescription: "Professional emcees for seamless events.",
    filters: [
      {
        title: "Price",
        value: "price",
        type: "range",
        min: 0,
        max: 5000, // Adjust according to typical emcee pricing
      },
      {
        title: "Languages",
        value: "languages",
        type: "checkbox",
        options: [
          "english",
          "mandarin",
          "cantonese",
          "hokkien",
          "malay",
          "tamil",
          "others",
        ],
      },
    ],
  },
  planners: {
    title: "Planners",
    titleDescription: "Expert planning for a perfect wedding.",
    filters: [
      {
        title: "Price",
        value: "price",
        type: "range",
        min: 0,
        max: 10000,
      },
      {
        title: "Services",
        value: "services",
        type: "checkbox",
        options: [
          "partial planning",
          "actual day coordination",
          "full wedding planning",
        ],
      },
    ],
  },
  cakes: {
    title: "Cakes",
    titleDescription: "Custom cakes for your special day.",
    filters: [
      {
        title: "Price",
        type: "range",
        value: "price",
        min: 0,
        max: 2000,
      },
      {
        title: "Dietary Requirements",
        type: "checkbox",
        value: "dietary_requirements",
        options: [
          "dairy-free",
          "gluten-free",
          "halal",
          "kosher",
          "nut-free",
          "sugar-free",
          "vegan",
          "vegetarian",
          "low-carb",
          "less sweet",
        ],
      },
      {
        title: "Number of Tiers",
        value: "number_of_tiers",
        type: "checkbox",
        options: ["one tier", "two tiers", "three tiers or more"],
      },
      {
        title: "Type",
        value: "type",
        type: "checkbox",
        options: [
          "customised cake",
          "guo da li cake",
          "baby full moon cake",
          "bethrothal/engagement cake",
          "solemnisation cake",
          "baby shower cake",
          "gender reveal cake",
          "wedding cake",
          "dessert table",
          "customised dessert box",
        ],
      },
    ],
  },
  catering: {
    title: "Catering",
    titleDescription: "Delicious catering for your scrumptious meals.",
    filters: [
      {
        title: "Price",
        type: "range",
        value: "price",
        min: 0,
        max: 10000,
      },
      {
        title: "Meal Services",
        type: "checkbox",
        value: "services",
        options: [
          "lunch",
          "dinner",
          "dessert",
          "buffet",
          "food cart/live food stations",
        ],
      },
      {
        title: "Cuisine Type",
        type: "checkbox",
        value: "cuisine",
        options: ["chinese", "western", "indian", "others", "malay"],
      },
      {
        title: "Dietary Requirements",
        type: "checkbox",
        value: "requirements",
        options: [
          "gluten free",
          "lactose free",
          "halal",
          "kosher",
          "nut free",
          "organic",
          "vegan",
          "vegetarian",
        ],
      },
    ],
  },
  cars: {
    title: "Cars",
    titleDescription: "Elegant wedding car rentals.",
    filters: [
      {
        title: "Price",
        type: "range",
        value: "price",
        min: 0,
        max: 5000,
      },
      {
        title: "Vehicle Type",
        value: "car_type",
        type: "checkbox",
        options: ["car", "limo", "sedan", "van", "bus"],
      },
      {
        title: "Services",
        value: "services",
        type: "checkbox",
        options: ["with chauffeur", "without chauffeur"],
      },
    ],
  },
  makeup: {
    title: "Makeup & Hair",
    titleDescription: "Gorgeous makeup and hair styling services.",
    filters: [
      {
        title: "Price",
        value: "price",
        type: "range",
        min: 0,
        max: 2000,
      },
      {
        title: "Type",
        value: "type",
        type: "checkbox",
        options: [
          "pre-wedding shoot",
          "overseas pre-wedding shoot",
          "actual day wedding",
          "personal styling",
          "solemnisation",
          "rom",
          "bridal party",
          "wedding trials",
        ],
      },
      {
        title: "Services",
        type: "checkbox",
        value: "services",
        options: [
          "bridal makeup",
          "groom makeup",
          "hairstyling",
          "hair extensions",
          "fashion",
          "bridal entourage",
          "lessons",
          "colour analysis",
        ],
      },
    ],
  },
  suits: {
    title: "Suits",
    titleDescription: "Tailored elegance for the groom and his entourage.",
    filters: [
      {
        title: "Who/Cliente",
        value: "clientele",
        type: "checkbox",
        options: ["groom", "groomsmen", "father of bride/groom"],
      },
      {
        title: "Occasion",
        value: "occasion",
        type: "checkbox",
        options: [
          "pre-wedding/photoshoot",
          "overseas wedding",
          "solemnisation",
          "actual wedding",
        ],
      },
      {
        title: "Services",
        value: "services",
        type: "checkbox",
        options: [
          "alterations",
          "rental",
          "cleaning",
          "preservation",
          "bespoke",
          "custom-made",
          "made to measure",
          "off the rack",
        ],
      },
    ],
  },
  gowns: {
    title: "Gowns",
    titleDescription: "Exquisite gowns for every bride and her party.",
    filters: [
      {
        title: "Price",
        value: "price",
        type: "range",
        min: 0,
        max: 5000,
      },
      {
        title: "Who/Cliente",
        value: "clientele",
        type: "checkbox",
        options: [
          "bride",
          "bridesmaids",
          "father of bride/groom",
          "groom",
          "groomsmen",
          "mother of bride/groom",
        ],
      },
      {
        title: "Occasion",
        value: "occasion",
        type: "checkbox",
        options: ["pre-wedding", "solemnisation", "actual wedding"],
      },
      {
        title: "Services",
        value: "services",
        type: "checkbox",
        options: [
          "rentals",
          "made to measure",
          "custom made",
          "bespoke",
          "off the rack",
        ],
      },
    ],
  },
  photobooth: {
    title: "Photobooth",
    titleDescription: "Capture memories with unique photobooth experiences.",
    filters: [
      {
        title: "Price",
        value: "price",
        type: "range",
        min: 0,
        max: 5000,
      },
      {
        title: "Hours",
        value: "hours",
        type: "checkbox",
        options: ["2 hours or less", "more than 2 hours"],
      },
      {
        title: "Special Requests",
        value: "special_requests",
        type: "checkbox",
        options: ["customisable", "instant print"],
      },
      {
        title: "Booth Types",
        value: "booth_types",
        type: "checkbox",
        options: [
          "mirror booth",
          "photo booth",
          "interactive booth",
          "video booth",
        ],
      },
    ],
  },
  solemniser: {
    title: "Solemniser",
    titleDescription: "Find the perfect solemniser for your ceremony.",
    filters: [
      {
        title: "Language spoken",
        value: "languages",
        type: "checkbox",
        options: [
          "english",
          "mandarin",
          "cantonese",
          "hokkien",
          "malay",
          "tamil",
          "sign language",
          "punjabi",
          "others",
        ],
      },
    ],
  },
  favours: {
    title: "Favours",
    titleDescription: "Memorable wedding favours for your guests.",
    filters: [
      {
        title: "Price",
        value: "price",
        type: "range",
        min: 0,
        max: 500,
      },
      {
        title: "Type of Gifts",
        value: "type",
        type: "checkbox",
        options: [
          "food",
          "drink",
          "souvenirs",
          "scent",
          "flowers",
          "soap",
          "bag",
          "customised gifts",
          "others",
        ],
      },
    ],
  },
};

type VendorKeysObject = {
  [key: string]: {
    value: string;
    label: string;
  };
};

export const VendorKeys = Object.keys(VendorTypes).reduce(
  (obj: VendorKeysObject, key) => {
    obj[key] = { value: key, label: VendorTypes[key].title };
    return obj;
  },
  {},
);
