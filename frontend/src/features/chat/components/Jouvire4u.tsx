// commenting out this code because we are voiding the Jouvire4U service for MVP

// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import type { UseFormReturn } from "react-hook-form";
// import { BeatLoader } from "react-spinners";
// import { v4 } from "uuid";

// import {
//   useLazyGetInterviewFollowUpQuery,
//   useLazyGetInterviewResultQuery,
// } from "@/services/chatAPI";

// import { ChatBubble } from "./chatComponents/ChatBubble";
// import { ChatError } from "./chatComponents/ChatError";
// import Jouvire4uForm from "./Jouvire4uComponents/Jouvire4uForm";
// import {
//   quizKeys,
//   quizzes,
// } from "./Jouvire4uComponents/Jouvire4uFormQuestions";
// import { Input } from "./SharedComponents/Input";
// import type { ChatBubbleProps } from "./types/chat.schema";
// import type { OnboardingFormSchema } from "./types/jouvire4u.schema";
// import type { RequestBody } from "./types/shared.schema";

// interface Jouvire4uProps {
//   currentQuiz: number;
//   setCurrentQuiz: React.Dispatch<React.SetStateAction<number>>;
//   onboardingForm: UseFormReturn<OnboardingFormSchema>;
//   jouvire4uArray: ChatBubbleProps[];
//   setJouvire4uArray: React.Dispatch<React.SetStateAction<ChatBubbleProps[]>>;
// }

// const Jouvire4u = ({
//   currentQuiz,
//   setCurrentQuiz,
//   onboardingForm,
//   jouvire4uArray,
//   setJouvire4uArray,
// }: Jouvire4uProps) => {
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const [isNextChatLoading, setIsNextChatLoading] = useState(false);
//   const [
//     triggerGetInterviewResult,
//     { data: jouvire4uData, isError: isGetInterviewResultError },
//   ] = useLazyGetInterviewResultQuery();
//   const [
//     triggerGetInterviewFollowUp,
//     { data: jouvire4uDataFollowUp, isError: isGetInterviewFollowUpError },
//   ] = useLazyGetInterviewFollowUpQuery();

//   useEffect(() => {
//     setTimeout(() => {
//       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 100); // Adjust delay as needed
//   }, [jouvire4uArray]);

//   useEffect(() => {
//     if (!jouvire4uData?.content) return;
//     setIsNextChatLoading(false);

//     setJouvire4uArray((prevArray) => [
//       ...prevArray,
//       {
//         isMe: jouvire4uData.isMe,
//         content: jouvire4uData.content,
//         vendors: jouvire4uData.vendors,
//         carousell: jouvire4uData.carousell || undefined,
//         id: v4(),
//       } as ChatBubbleProps,
//     ]);
//   }, [jouvire4uData, setJouvire4uArray]);

//   useEffect(() => {
//     if (!jouvire4uDataFollowUp?.content) return;
//     setIsNextChatLoading(false);

//     setJouvire4uArray((prevArray) => [
//       ...prevArray,
//       {
//         isMe: jouvire4uDataFollowUp.isMe,
//         content: jouvire4uDataFollowUp.content,
//         vendors: jouvire4uDataFollowUp.vendors || undefined,
//         carousell: jouvire4uDataFollowUp.carousell || undefined,
//         id: v4(),
//       } as ChatBubbleProps,
//     ]);
//   }, [jouvire4uDataFollowUp, setJouvire4uArray]);

//   // We use useMemo to memoize the rendered chat bubbles. This prevents them from re-rendering unless jouvire4uArray changes.
//   const renderedChatBubbles = useMemo(
//     () =>
//       jouvire4uArray.map((chat: ChatBubbleProps) => (
//         // Unique Key for Each Chat Bubble: Ensure each ChatBubble has a unique key based on the chat.id to avoid re-rendering.
//         <div
//           className={!chat.isMe ? "transition animate-fade-in-down" : ""}
//           key={chat.id}
//         >
//           <ChatBubble
//             isMe={chat.isMe}
//             content={chat.content}
//             vendors={chat?.vendors}
//             carousell={chat?.carousell}
//           />
//         </div>
//       )),
//     [jouvire4uArray],
//   );

//   // We use useCallback to memoize the form submission handler to avoid unnecessary re-renders.
//   const handleFormSubmit = useCallback(
//     async (data: OnboardingFormSchema) => {
//       setIsNextChatLoading(true);
//       await triggerGetInterviewResult(data);
//       setCurrentQuiz((prev) => prev + 1);
//     },
//     [triggerGetInterviewResult, setCurrentQuiz],
//   );

//   if (isGetInterviewResultError || isGetInterviewFollowUpError) {
//     return <ChatError />;
//   }

//   // temp function to trigger backend from frontend without doing quiz
//   async function clickButton() {
//     await triggerGetInterviewResult({
//       expectedGuestNumber: 100,
//       estimatedBudget: 100000,
//       weddingStyle: "Modern",
//       weddingTradition: "Traditional",
//       weddingTimeline: "6 months",
//       venueType: "Outdoor",
//       venueStyle: "Garden",
//       additionalNotes: "Make sure the venue can accomodate pet dogs and cats",
//     });
//   }

//   const sendButtonPressed = (text: string) => {
//     if (!text) return;

//     setJouvire4uArray([
//       ...jouvire4uArray,
//       {
//         isMe: true,
//         content: text,
//         vendors: undefined,
//         carousell: undefined,
//       } as ChatBubbleProps,
//     ]);

//     triggerGetInterviewFollowUp({
//       userResponse: text,
//     } as RequestBody);

//     setIsNextChatLoading(true);
//   };

//   return (
//     <div className="flex flex-col h-full">
//       <div className={`flex flex-col ${jouvire4uData ? "h-full" : ""}`}>
//         <div className="grow overflow-y-auto">
//           <div className="flex flex-col overflow-x-hidden">
//             {renderedChatBubbles}

//             {isNextChatLoading && (
//               <BeatLoader size={10} color="#FF477E" speedMultiplier={0.5} />
//             )}

//             {/* Ref pulls the viewport to the bottom */}
//             <div ref={messagesEndRef} />
//           </div>
//         </div>
//       </div>

//       {jouvire4uArray.length === 1 && (
//         <div key={quizKeys[currentQuiz]} className="grow overflow-y-auto m-4">
//           <Jouvire4uForm
//             form={onboardingForm}
//             questions={quizzes[currentQuiz]}
//             currentQuiz={currentQuiz}
//             setCurrentQuiz={setCurrentQuiz}
//             handleFormSubmit={handleFormSubmit}
//           />
//         </div>
//       )}
//       <button type="button" onClick={() => clickButton()}>
//         Test
//       </button>
//       <div className="flex-none">
//         <Input
//           sendButtonPressed={sendButtonPressed}
//           isDisabled={isNextChatLoading}
//         />
//       </div>
//     </div>
//   );
// };

// export default Jouvire4u;
