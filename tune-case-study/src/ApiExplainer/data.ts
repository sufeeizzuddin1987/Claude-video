import type { IconName } from "./icons";

export type Product = {
  id: string;
  name: string;
  sub: string;
  price: number;
  icon: IconName;
  policy: string | null;
  /** when the passenger toggles it on (absolute seconds); null = not selected */
  selectAt: number | null;
};

// Illustrative products and sample prices only.
export const PRODUCTS: Product[] = [
  { id: "TRAVEL", name: "Travel Protect", sub: "Medical & trip cover", price: 24.9, icon: "shieldPlane", policy: "TP-100245", selectAt: 58.4 },
  { id: "BAGGAGE", name: "Baggage Protect", sub: "Lost or delayed bags", price: 9.9, icon: "bag", policy: "TP-100246", selectAt: 59.4 },
  { id: "DELAY", name: "Flight Delay", sub: "Pays out on long delays", price: 7.9, icon: "clock", policy: "TP-100247", selectAt: 60.4 },
  { id: "FLEX", name: "Flex Cancel", sub: "Cancel for any reason", price: 15.9, icon: "ticketX", policy: null, selectAt: null },
];

export const BASE_FARE = 189;
