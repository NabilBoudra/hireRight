import { Job } from "@/utils/types";
import { createContext } from "react";

export const JobContext = createContext<Job|null>(null);