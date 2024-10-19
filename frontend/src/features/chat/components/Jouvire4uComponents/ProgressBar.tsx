// commenting out this code because we are voiding the Jouvire4U service for MVP

// import React from "react";

// import { quizKeys } from "./Jouvire4uFormQuestions";

// interface StepProps {
//   label: string;
//   isActive: boolean;
//   isCompleted: boolean;
// }

// const Step: React.FC<StepProps> = ({ label, isActive, isCompleted }) => {
//   return (
//     <div className="flex flex-col items-center">
//       <div
//         className={`relative flex items-center justify-center w-10 h-10 rounded-full ${
//           isCompleted || isActive ? "bg-lunaPink" : "bg-gray-400"
//         }`}
//       >
//         {isCompleted && <span className="text-white">&#10003;</span>}{" "}
//         {isActive && !isCompleted && (
//           <div className="absolute w-4 h-4 bg-white rounded-full" />
//         )}
//       </div>
//       <span className="mt-2 text-xs font-bold">{label}</span>
//     </div>
//   );
// };

// interface ProgressBarProps {
//   currentQuiz: number;
// }

// const ProgressBar = ({ currentQuiz }: ProgressBarProps) => {
//   const steps = quizKeys.map((key, index) => ({
//     label: key,
//     isActive: index === currentQuiz,
//     isCompleted: index < currentQuiz,
//   }));

//   return (
//     <div className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md">
//       {steps.map((step, index) => (
//         <React.Fragment key={step.label}>
//           <Step
//             label={step.label}
//             isActive={step.isActive}
//             isCompleted={step.isCompleted}
//           />
//           {index < steps.length - 1 && (
//             <div
//               className={`flex-1 h-px ${
//                 steps[index].isCompleted || steps[index].isActive
//                   ? "bg-gray-500"
//                   : "bg-gray-300"
//               }`}
//             />
//           )}
//         </React.Fragment>
//       ))}
//     </div>
//   );
// };

// export default ProgressBar;
