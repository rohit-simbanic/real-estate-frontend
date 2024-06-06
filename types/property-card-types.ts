export interface PropertyImage {
  filename: string;
}
export interface PropertyDetails {
  agent_id: number;
  category: string;
  price: string;
  available_for: "sale" | "lease";
  listing_id: string;
  property_description: string;
  property_images: PropertyImage[];
  general_details: GeneralDetails;
  room_interior: RoomInterior;
  exterior: Exterior;
  utilities: Utilities;
  at_a_glance: AtAGlance;
  street_view: string;
  map_location: string;
  latitude?: string;
  longitude?: string;
}

export interface GeneralDetails {
  Price: string;
  Taxes: string;
  Address: string;
  Lot_Size: string;
  Directions: string;
}

export interface RoomInterior {
  Rooms: number;
  Rooms_plus: number;
  Bedrooms: number;
  Bedrooms_plus: number;
  Kitchens: number;
  Family_Room: "Y" | "N";
  Basement: string;
}

export interface Exterior {
  Property_Type: string;
  Style: string;
  Exterior: string;
  Garage_Type: string;
  Drive_Parking_Spaces: number;
  Pool: string;
}

export interface Utilities {
  Fireplace_Stove: "Y" | "N";
  Heat_Source: string;
  Heat_Type: string;
  Central_Air_Conditioning: string;
  Laundry_Level: string;
  Sewers: string;
  Water: string;
}

export interface AtAGlance {
  Type: string;
  Area: string;
  Municipality: string;
  Neighbourhood: string;
  Style: string;
  Lot_Size: string;
  Tax: string;
  Beds: number;
  Baths: number;
  Fireplace: "Y" | "N";
  Pool: string;
}
