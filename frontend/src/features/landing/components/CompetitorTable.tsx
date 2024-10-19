/* eslint-disable jsx-a11y/control-has-associated-label */
import React from "react";

export const CompetitorTable = () => {
  return (
    <div className="relative mt-4">
      <div className="absolute inset-x-4 inset-y-0 z-50 flex">
        <div
          className="flex w-1/3 px-4 z-50"
          style={{ marginLeft: "33%" }}
          aria-hidden="true"
        >
          <div className="w-full rounded-t-xl border-x border-t border-lunaPink/30 bg-lunaLPink/20" />
        </div>
      </div>
      <table className="w-full table-fixed border-separate text-left">
        <thead>
          <tr>
            <td />
            <th scope="col" className="px-6 pt-6 xl:px-8 xl:pt-8">
              <div className="font-bold lg:text-lg text-md leading-7 text-gray-900 text-center">
                Jouvire
              </div>
            </th>
            <th scope="col" className="px-6 pt-6 xl:px-8 xl:pt-8">
              <div className="font-bold lg:text-lg text-md  leading-7 text-gray-900 text-center">
                Others
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th
              scope="row"
              className="py-4 font-normal lg:text-lg text-sm leading-6 text-gray-900 w-4"
            >
              AI-powered vendor recommendations
              <div className="absolute inset-x-0 mt-4 h-px bg-gray-900/5" />
            </th>
            <td className="px-6 py-4 xl:px-8">
              <svg
                className="mx-auto h-5 w-5 text-pink-600"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Included at Luna</span>
            </td>
            <td className="px-6 py-4 xl:px-8">
              <svg
                className="mx-auto h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Not included at Others</span>
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              className="py-4 font-normal lg:text-lg text-sm leading-6 text-gray-900"
            >
              Contact vendors directly
              <div className="absolute inset-x-0 mt-4 h-px bg-gray-900/5" />
            </th>
            <td className="px-6 py-4 xl:px-8">
              <svg
                className="mx-auto h-5 w-5 text-pink-600"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Included at Luna</span>
            </td>
            <td className="px-6 py-4 xl:px-8">
              <svg
                className="mx-auto h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Not included at Others</span>
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              className="py-4 font-normal lg:text-lg text-sm leading-6 text-gray-900"
            >
              Monitor status & payments
              <div className="absolute inset-x-0 mt-4 h-px bg-gray-900/5" />
            </th>
            <td className="px-6 py-4 xl:px-8">
              <svg
                className="mx-auto h-5 w-5 text-pink-600"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Included at Luna</span>
            </td>
            <td className="px-6 py-4 xl:px-8">
              <svg
                className="mx-auto h-5 w-5 text-pink-600"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Included at Others</span>
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              className="py-4 font-normal lg:text-lg text-sm leading-6 text-gray-900"
            >
              Up-to-date vendor information
              <div className="absolute inset-x-0 mt-4 h-px bg-gray-900/5" />
            </th>
            <td className="px-6 py-4 xl:px-8">
              <svg
                className="mx-auto h-5 w-5 text-pink-600"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Included at Luna</span>
            </td>
            <td className="px-6 py-4 xl:px-8">
              <svg
                className="mx-auto h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Not included at Others</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
