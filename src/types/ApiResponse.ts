// ApiResponse ek blueprint hai jo batata hai ki API ke response ka format kaisa hoga:

// success aur message required fields hain.
// isAcceptingMessages aur messages optional hain.

import { Message } from "@/model/User";
export interface ApiResponse {
  success: boolean;
  message: string;
  isAcceptingMessages?: boolean;
  messages?: Array<Message>;
}
