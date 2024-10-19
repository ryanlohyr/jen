interface VendorType {
  id: string;
  name: string;
  location: string;
  venuePhoto: string[];
  category:
    | "Decoration"
    | "Catering"
    | "Photography"
    | "Venue"
    | "Music"
    | "Other";
  priceQuote: number | undefined;
  priceRange: string[];
  status: "Finalised quote" | "Out of budget" | "Contacting" | "Unavailable";
  rating: number;
  rating_count: number;
  link: string;
  contact: string;
}

export type { VendorType };
