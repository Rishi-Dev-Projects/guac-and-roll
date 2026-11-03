/**
 * Owner / Host Information — /about "The Host" chapter
 *
 * ⚠️  MOCK CONTENT. Every value below is placeholder copy written so the
 * section's design can be reviewed. None of it is verified owner information.
 *
 * OWNER ACTION REQUIRED before production:
 *   1. Replace name, role, monogram, since, intro, quote and conversation
 *      with the owner's real details (their own words where possible).
 *   2. Optionally add a real portrait at /public/images/owner/… and set `photo`.
 *   3. Set `isMock` to false. While it is true, the page shows a visible
 *      "Preview · owner details to be confirmed" tag so visitors are never misled.
 *
 * `favouriteItemId` must be an id from src/data/menu.ts — the name and price
 * shown on the page are read from the menu data, never typed here.
 */

export interface OwnerConversationEntry {
  question: string;
  answer: string;
}

export interface OwnerProfile {
  isMock: boolean;
  name: string;
  role: string;
  monogram: string;
  /** Path under /public, e.g. "/images/owner/portrait.jpg". null = monogram portrait. */
  photo: string | null;
  photoAlt?: string;
  since: string;
  intro: string;
  quote: string;
  conversation: OwnerConversationEntry[];
  favouriteItemId: string;
  favouriteNote: string;
}

export const owner: OwnerProfile = {
  isMock: true,
  name: "Aarav Patel",
  role: "Founder & Host",
  monogram: "AP",
  photo: null,
  since: "2024",
  intro:
    "Guac N' Roll began with a simple wish for Baben: a place where a plate of tacos and a cold drink come with all the time in the world to enjoy them.",
  quote: "I wanted to build a table nobody ever has to hurry away from.",
  conversation: [
    {
      question: "Why a Mexican-inspired cafe in Bardoli?",
      answer:
        "Because sharing food is the best excuse to stay a little longer. Tacos come in fours, nachos are made for passing around — the menu does the inviting for us.",
    },
    {
      question: "Why all the arches?",
      answer:
        "An arch feels like being welcomed in. You walk through one at the door, and you find it again over the kitchen counter. It tells you to slow down.",
    },
    {
      question: "Who did you build it for?",
      answer:
        "Students between lectures, friends after school, families on a weekend evening. Anyone looking for a third place that isn't home and isn't work.",
    },
    {
      question: "What makes a good afternoon here?",
      answer:
        "A corner table, a smoothie, someone you like, and nowhere else to be until the table lamps come on.",
    },
  ],
  favouriteItemId: "crispy-avocado-taco",
  favouriteNote: "Ask for it when you can't decide.",
};
