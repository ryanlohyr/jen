import React from "react";

import { HelpForm } from "./HelpForm";

const CustomerSupport = () => {
  return (
    <div className="my-8">
      <div className="flex flex-col items-center gap-4 lg:px-4 mx-auto lg:w-[50%] w-[100%] order-last lg:order-1">
        <div className="mb-3">
          <div className="flex justify-center items-center mt-8 mb-2 text-center text-3xl md:text-4xl">
            <h1 className="text-black font-vollkorn">
              Contact <span className="font-semibold">customer support</span>
            </h1>
          </div>
          <p className="text-sm text-center w-[80vw] lg:w-[375px] xl:w-[400px]">
            If you are experiencing any issues, have a feature request, or need
            advice for your wedding, please feel free to contact us!
          </p>
        </div>

        <HelpForm />
        <div className="font-worksans text-center mt-4 mb-8">
          We’re just a click away. Reach out to our team directly on <br />
          telegram: <span className="font-semibold">@ryanlohhhh</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
