// commenting out this code because we are voiding the Jouvire4U service for MVP

// import { useForm } from "react-hook-form";

// import { zodResolver } from "@hookform/resolvers/zod";

// import type { OnboardingFormSchema, Question } from "../types/jouvire4u.schema";
// import { OnboardingFormObject } from "../types/jouvire4u.schema";

// export const General: Question[] = [
//   {
//     name: "expectedGuestNumber",
//     label: "What's the expected number of guests you're expecting?",
//     placeholder: "Select number",
//     type: "number",
//     values: ["50", "100", "200", "500", "1000", "1000+"],
//   },
//   {
//     name: "estimatedBudget",
//     label: "What is your estimated budget?",
//     placeholder: "Select number",
//     type: "number",
//     values: [
//       "$10,000",
//       "$50,000",
//       "$100,000",
//       "$200,000",
//       "$500,000",
//       "$1,000,000",
//       "$1,000,000+",
//     ],
//   },
//   {
//     name: "weddingStyle",
//     label: "Is there a certain style you have in mind?",
//     placeholder: "rustic, modern, country side, beach, etc...",
//     type: "text",
//   },
//   {
//     name: "weddingTradition",
//     label: "Any ceremonial/cultural traditions you want to include?",
//     placeholder: "Chinese, Muslim, Hindu...",
//     type: "text",
//   },
//   {
//     name: "weddingTimeline",
//     label: "When are you looking to have your wedding?",
//     placeholder: "Within 12 months, 2 years, etc...",
//     type: "text",
//   },
// ];

// export const Venue: Question[] = [
//   {
//     name: "venueType",
//     label: "What is your preferred type of venue?",
//     placeholder: "Indoors, pet friendly, etc...",
//     type: "text",
//   },
//   {
//     name: "venueStyle",
//     label: "Are you planning a formal, semi-formal or casual wedding?",
//     placeholder: "formal, semi-formal, casual, etc...",
//     type: "text",
//   },
// ];

// // export const Catering: Question[] = [
// //   {
// //     name: "cuisine",
// //     label: "What kind of food would you like to be catered?",
// //     placeholder: "Enter cuisine preferences",
// //     type: "string",
// //   },
// // ];

// // export const Music: Question[] = [
// //   {
// //     name: "musicGenre",
// //     label: "What kind of music would you like?",
// //     placeholder: "Enter music preferences",
// //     type: "string",
// //   },
// // ];

// export const additionalNotes: Question[] = [
//   {
//     name: "additionalNotes",
//     label: "Do you have any additional notes you would like Jouvire to know?",
//     placeholder: "Enter notes here...",
//     type: "string",
//   },
// ];

// export const quizzes = [General, Venue, additionalNotes];
// export const quizKeys = [
//   "General",
//   "Venue",
//   // "Catering",
//   // "Music",
//   "Additional Notes",
// ];

// const form = () => {
//   const onboardingForm = useForm<OnboardingFormSchema>({
//     resolver: zodResolver(OnboardingFormObject),
//     mode: "all",
//     defaultValues: {
//       expectedGuestNumber: 0,
//       estimatedBudget: 0,
//       weddingStyle: "",
//       weddingTradition: "",
//       weddingTimeline: "",
//       venueType: "",
//       venueStyle: "",
//       // cuisine: "",
//       // musicGenre: "",
//       additionalNotes: "",
//     },
//   });

//   return onboardingForm;
// };

// export default form;
