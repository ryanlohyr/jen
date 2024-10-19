// Define the interface for the error messages
interface ErrorMessages {
  [key: string]: {
    message: string;
    code: number;
    text?: string;
  };
}

// Define the error messages
const errorMessages: ErrorMessages = {
  pageNotFound: {
    message: "We can’t seem to find the page you’re looking for.",
    code: 404,
    text: "",
  },
  vendorNotFound: {
    message: "We can’t seem to find the vendor you’re looking for.",
    code: 404,
    text: "VendorPageNotFound",
  },
  // Add more error messages as needed
};

export default errorMessages;
