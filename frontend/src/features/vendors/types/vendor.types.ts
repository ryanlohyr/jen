export interface BaseVendor {
  id: number;
  name: string;
  address: string;
  companyLogo: string;
  facebook: string;
  instagram: string;
  email: string;
  phone_number: string;
  website: string;
  photos: Photo[];
  min_price: number;
  price_type: string;
  max_capacity: number;
  min_capacity: number;
  max_price: number;
  rating: number | null;
  rating_count: number | null;
  google_maps_uri: string | null;
  google_id: string | null;
  description: string;
  card_descriptions: string[];
  vendor_type: string;
  extra_filters: string;
  aboutUs: VendorAboutUs;
  packages: VendorPackage[];
  services: VendorService[];
}

export interface Photo {
  src: string;
  width: number;
  height: number;
}

export interface VendorAboutUs {
  title: string;
  content: string;
}

export interface VendorDataProps {
  total_pages: number;
  total_vendors: number;
  vendors: BaseVendor[];
}

export interface VendorCategory {
  category_name: string; // TODO: Change to ENUM
  vendor: BaseVendor;
}

export interface VendorMarketPlaceProps {
  vendors: VendorCategory[];
}

export interface VendorPackage {
  package_name: string;
  package_link: string;
}

export interface VendorService {
  service_name: string;
  values: string[];
}
