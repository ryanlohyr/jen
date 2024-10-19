// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from "@faker-js/faker";

import type { VendorType } from "../types/vendor.type";

// ### The Summerhouse

// - Description: The Summerhouse in Seletar offers unique garden domes for intimate, nature-inspired weddings with farm-to-table cuisine from local growers.
// - PDF Link to Summerhouse Wedding (2024): [Summerhouse Wedding 2024](https://www.thesummerhouse.sg/wp-content/uploads/2022/10/The-Summerhouse-Wedding-Kit-2022_Oct.pdf)
// - Google Reviews: 1551 Reviews, 4.3/5
// - Comments Related to Wedding Requirements
//   - Quality: We loved the wedding so much. The ambience was perfect - intimate and cosy, and the food was delicious. Our guests also enjoyed themselves tremendously. Big thanks to everyone for everything!
//   - Pets: The Summerhouse allows pets on the premises, however they have to be escorted at all times.
// - Address: 3 Park Lane, Singapore 798387
// - Image: ![Summer house wedding](https://www.blissfulbrides.sg/uploads/activity_banner/20230503/64522000015414.88718882.jpg)
// - Contact Number: +65 8809 5840
// - Email: wildseed@thesummerhouse.sg
// - Pricing:
//   - Venue Rental: Starting at $1500++
//   - Capacity: up to 380 Pax

// ### The Alkaff Mansion

//   - Description: Known for its outdoor gazebo and garden spaces, allows for pets as well.
//   - PDF Link to Wedding Packages (2024): [The Alkaff Mansion Wedding Packages 2024](https://singaporebrides.com/b/2020/1-Group/TAM%20Wedding%20&%20Solemn%20Kit_220620.pdf)
//   - Google Reviews: 180 reviews, 4.8/5
//   - Important Comments Related to Wedding Requirements:
//     - Alkaff Mansion does not allow external catering and the restaurant is non-halal.
//     - Rustic Outdoor Wedding: Celebrated for its lush garden and gazebo, ideal for those dreaming of an outdoor rustic wedding.
//   - Image: ![The Alkaff Mansion](https://media.timeout.com/images/105481147/image.jpg)
//   - Contact Number: +65 8765 4321
//   - Email: enquiry@thealkaffmansion.sg
//   - Pricing for 120 Guests:]
//     - Venue Rental: Starting at $1500++
//     - Lunch Package: $150 ++ per person
//     - Dinner Package: $180 ++ per person
//     `

export const generateFakeData = (limit: number): VendorType[] => {
  const fakeData: VendorType[] = [];
  fakeData.push({
    id: faker.string.uuid(),
    name: "The Summerhouse",
    location: "3 Park Lane, Singapore 798387",
    venuePhoto: [
      "https://www.blissfulbrides.sg/uploads/activity_banner/20230503/64522000015414.88718882.jpg",
      "https://static.thehoneycombers.com/wp-content/uploads/sites/2/2018/02/Summerhouse-hero-shot-wecompress.com_.jpg",
      "https://singaporebrides.com/virtual-tours/the-summerhouse/images/vt.jpg",
    ],
    category: "Venue",
    priceQuote:
      faker.number.int({
        min: 30,
        max: 120,
      }) * 1000,
    priceRange: ["100++", "150++"],
    status: "Finalised quote",
    rating: 4.3,
    rating_count: 1551,
    link: "https://www.thesummerhouse.sg/wp-content/uploads/2022/10/The-Summerhouse-Wedding-Kit-2022_Oct.pdf",
    contact: "wildseed@thesummerhouse.sg",
  });
  fakeData.push({
    id: faker.string.uuid(),
    name: "The Alkaff Mansion",
    location: "10 Telok Blangah Green, Singapore 109178",
    venuePhoto: [
      "https://media.timeout.com/images/105481147/image.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/1a/45/aa/e3/main-dining-hall.jpg",
      "https://images.squarespace-cdn.com/content/v1/56e03252ab48ded0e100ec12/6e32b2b1-b6fa-4679-811c-52d67cca594f/UNA+Alkaff+Mansion+6.jpg",
    ],
    category: "Venue",
    priceQuote:
      faker.number.int({
        min: 30,
        max: 120,
      }) * 1000,
    priceRange: ["150++", "180++"],
    status: "Contacting",
    rating: 4.8,
    rating_count: 180,
    link: "https://singaporebrides.com/b/2020/1-Group/TAM%20Wedding%20&%20Solemn%20Kit_220620.pdf",
    contact: "enquiry@thealkaffmansion.sg",
  });

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < limit; i++) {
    const vendor: VendorType = {
      id: faker.string.uuid(),
      name: faker.company.name(),
      location: faker.location.streetAddress(),
      venuePhoto: Array.from(
        { length: faker.number.int({ min: 1, max: 5 }) },
        () => faker.image.urlLoremFlickr({ category: "city" }),
      ),
      category: faker.helpers.arrayElement([
        "Decoration",
        "Catering",
        "Photography",
        "Venue",
        "Music",
        "Other",
      ]),
      priceQuote:
        faker.number.int({
          min: 30,
          max: 120,
        }) * 1000,
      priceRange: [
        faker.number.int({ min: 100, max: 500 }).toString(),
        faker.number.int({ min: 500, max: 1000 }).toString(),
      ],
      status: faker.helpers.arrayElement([
        "Finalised quote",
        "Out of budget",
        "Contacting",
        "Unavailable",
      ]),
      rating: faker.number.float({ min: 1, max: 5, fractionDigits: 2 }),
      rating_count: faker.number.int({ min: 0, max: 100 }),
      link: faker.internet.url(),
      contact: faker.internet.email(),
    };

    fakeData.push(vendor);
  }

  return fakeData;
};
