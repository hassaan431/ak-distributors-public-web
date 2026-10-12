export { cn } from "cn";

export function getApiBaseUrl(): string {
  return process.env.BACKEND_INTERNAL_URL || "https://akdistributors.pythonanywhere.com";
}
