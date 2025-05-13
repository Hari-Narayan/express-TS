// src/@types/express/index.d.ts

// Import the original User type/interface if it's defined elsewhere
import { User as CustomUserType } from "../../models/User"; // Adjust the path as needed

declare global {
  namespace Express {
    interface Request {
      // Add your custom property here
      // Use your actual User type/interface instead of 'any' or your imported type
      // Make it potentially undefined or null if the user might not always be attached
      user?: CustomUserType | null;
    }
  }
}

// If you're not using modules in this file, you might need:
// export {};
