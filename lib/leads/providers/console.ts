import type { LeadProvider } from "../types";

/** Dev/test provider: prints the lead to the server console. */
export const consoleProvider: LeadProvider = {
  name: "console",
  async send(lead) {
    console.info("[lead]", JSON.stringify(lead, null, 2));
  },
};
