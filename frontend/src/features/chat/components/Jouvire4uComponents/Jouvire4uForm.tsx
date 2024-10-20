// commenting out this code because we are voiding the Jouvire4U service for MVP

// import React from "react";
// import type { UseFormReturn } from "react-hook-form";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import {
//   type OnboardingFormSchema,
//   type Question,
// } from "../types/jouvire4u.schema";
// import { quizzes } from "./Jouvire4uFormQuestions";
// import ProgressBar from "./ProgressBar";

// interface Jouvire4uFormProps {
//   form: UseFormReturn<OnboardingFormSchema>;
//   questions: Question[];
//   currentQuiz: number;
//   setCurrentQuiz: React.Dispatch<React.SetStateAction<number>>;
//   handleFormSubmit: (data: OnboardingFormSchema) => Promise<void>;
// }

// const Jouvire4uForm = ({
//   form,
//   questions,
//   currentQuiz,
//   setCurrentQuiz,
//   handleFormSubmit,
// }: Jouvire4uFormProps) => {
//   if (form.formState.isSubmitted || form.formState.isSubmitting) {
//     return null;
//   }

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === "Enter") {
//       event.preventDefault();
//     }
//   };

//   return (
//     <div>
//       <ProgressBar currentQuiz={currentQuiz} />
//       <div className="w-full flex flex-col items-center justify-center">
//         <div className="bg-white w-full p-4 rounded-xl border-gray-300 border-[1px]">
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(() => {
//                 const data: OnboardingFormSchema = form.getValues();
//                 handleFormSubmit(data);
//               })}
//               className="space-y-4"
//             >
//               {questions.map((field) => (
//                 <FormField
//                   key={field.name}
//                   control={form.control}
//                   name={field.name}
//                   render={({ field: controllerField }) => (
//                     <FormItem>
//                       <FormLabel>{field.label}</FormLabel>
//                       <FormControl>
//                         {field.name === "expectedGuestNumber" ||
//                         field.name === "estimatedBudget" ? (
//                           <Select>
//                             <SelectTrigger className="w-[180px]">
//                               <SelectValue placeholder={field.placeholder} />
//                             </SelectTrigger>
//                             <SelectContent>
//                               <SelectGroup>
//                                 {field.values?.map((value) => (
//                                   <SelectItem key={value} value={value}>
//                                     {value}
//                                   </SelectItem>
//                                 ))}
//                               </SelectGroup>
//                             </SelectContent>
//                           </Select>
//                         ) : (
//                           <Input
//                             type={field.type}
//                             placeholder={field.placeholder}
//                             {...controllerField}
//                             onKeyDown={handleKeyDown}
//                           />
//                         )}
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               ))}

//               <div
//                 className={`flex ${
//                   currentQuiz === 0 ? "justify-end" : "justify-between"
//                 }`}
//               >
//                 {currentQuiz !== 0 && (
//                   <Button
//                     type="button"
//                     variant="primaryPink"
//                     onClick={() => setCurrentQuiz(currentQuiz - 1)}
//                   >
//                     Back
//                   </Button>
//                 )}

//                 {currentQuiz !== quizzes.length - 1 ? (
//                   <Button
//                     type="button"
//                     variant="primaryPink"
//                     onClick={() => setCurrentQuiz(currentQuiz + 1)}
//                   >
//                     Next
//                   </Button>
//                 ) : (
//                   <Button
//                     type="submit"
//                     variant="primaryPink"
//                     disabled={!form.formState.isValid}
//                   >
//                     Let&apos;s plan!
//                   </Button>
//                 )}
//               </div>
//             </form>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Jouvire4uForm;
