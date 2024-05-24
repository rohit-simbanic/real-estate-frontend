//@ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface GeneralDetails {
  Price: string;
  Taxes: string;
  Address: string;
  Lot_Size: string;
  Directions: string;
}

interface RoomInterior {
  Rooms: number;
  Rooms_plus: number;
  Bedrooms: number;
  Bedrooms_plus: number;
  Kitchens: number;
  Family_Room: string;
  Basement: string;
}

interface Exterior {
  Property_Type: string;
  Style: string;
  Exterior: string;
  Garage_Type: string;
  Drive_Parking_Spaces: number;
  Pool: string;
}

interface Utilities {
  Fireplace_Stove: string;
  Heat_Source: string;
  Heat_Type: string;
  Central_Air_Conditioning: string;
  Laundry_Level: string;
  Sewers: string;
  Water: string;
}

interface AtAGlance {
  Type: string;
  Area: string;
  Municipality: string;
  Neighbourhood: string;
  Style: string;
  LotSize: string;
  Tax: string;
  Beds: number;
  Baths: number;
  Fireplace: string;
  Pool: string;
}

interface FormData {
  agent_id: number;
  category: string;
  name: string;
  price: string;
  available_for: string;
  listing_id: string;
  property_description: string;
  property_images: string[];
  general_details: GeneralDetails;
  room_interior: RoomInterior;
  exterior: Exterior;
  utilities: Utilities;
  at_a_glance: AtAGlance;
  street_view: string;
  map_location: string;
}

const initialFormData: FormData = {
  agent_id: 1,
  category: "",
  name: "",
  price: "",
  available_for: "",
  listing_id: "",
  property_description: "",
  property_images: [],
  general_details: {
    Price: "",
    Taxes: "",
    Address: "",
    Lot_Size: "",
    Directions: "",
  },
  room_interior: {
    Rooms: 0,
    Rooms_plus: 0,
    Bedrooms: 0,
    Bedrooms_plus: 0,
    Kitchens: 0,
    Family_Room: "",
    Basement: "",
  },
  exterior: {
    Property_Type: "",
    Style: "",
    Exterior: "",
    Garage_Type: "",
    Drive_Parking_Spaces: 0,
    Pool: "",
  },
  utilities: {
    Fireplace_Stove: "",
    Heat_Source: "",
    Heat_Type: "",
    Central_Air_Conditioning: "",
    Laundry_Level: "",
    Sewers: "",
    Water: "",
  },
  at_a_glance: {
    Type: "",
    Area: "",
    Municipality: "",
    Neighbourhood: "",
    Style: "",
    LotSize: "",
    Tax: "",
    Beds: 0,
    Baths: 0,
    Fireplace: "",
    Pool: "",
  },
  street_view: "",
  map_location: "",
};

const EditPreConstructedPropertyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      const propertyId = searchParams.get("propertyId");
      if (propertyId) {
        fetch(
          `https://backend-real-estate-m1zm.onrender.com/pre-constructed-property/${propertyId}`
        )
          .then((response) => response.json())
          .then((data) => {
            const propertyData = {
              ...data,
              property_images: data.property_images || [], // Ensure property_images is always an array
              general_details: {
                Price: data.general_details?.Price || "",
                Taxes: data.general_details?.Taxes || "",
                Address: data.general_details?.Address || "",
                Lot_Size: data.general_details?.Lot_Size || "",
                Directions: data.general_details?.Directions || "",
              },
              room_interior: {
                Rooms: data.room_interior?.Rooms || 0,
                Rooms_plus: data.room_interior?.Rooms_plus || 0,
                Bedrooms: data.room_interior?.Bedrooms || 0,
                Bedrooms_plus: data.room_interior?.Bedrooms_plus || 0,
                Kitchens: data.room_interior?.Kitchens || 0,
                Family_Room: data.room_interior?.Family_Room || "",
                Basement: data.room_interior?.Basement || "",
              },
              exterior: {
                Property_Type: data.exterior?.Property_Type || "",
                Style: data.exterior?.Style || "",
                Exterior: data.exterior?.Exterior || "",
                Garage_Type: data.exterior?.Garage_Type || "",
                Drive_Parking_Spaces: data.exterior?.Drive_Parking_Spaces || 0,
                Pool: data.exterior?.Pool || "",
              },
              utilities: {
                Fireplace_Stove: data.utilities?.Fireplace_Stove || "",
                Heat_Source: data.utilities?.Heat_Source || "",
                Heat_Type: data.utilities?.Heat_Type || "",
                Central_Air_Conditioning:
                  data.utilities?.Central_Air_Conditioning || "",
                Laundry_Level: data.utilities?.Laundry_Level || "",
                Sewers: data.utilities?.Sewers || "",
                Water: data.utilities?.Water || "",
              },
              at_a_glance: {
                Type: data.at_a_glance?.Type || "",
                Area: data.at_a_glance?.Area || "",
                Municipality: data.at_a_glance?.Municipality || "",
                Neighbourhood: data.at_a_glance?.Neighbourhood || "",
                Style: data.at_a_glance?.Style || "",
                LotSize: data.at_a_glance?.LotSize || "",
                Tax: data.at_a_glance?.Tax || "",
                Beds: data.at_a_glance?.Beds || 0,
                Baths: data.at_a_glance?.Baths || 0,
                Fireplace: data.at_a_glance?.Fireplace || "",
                Pool: data.at_a_glance?.Pool || "",
              },
            };
            setFormData(propertyData);
          })
          .catch((error) => setError("Failed to fetch property data"));
      }
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleNestedChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    category: keyof FormData
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [category]: {
        ...(prevFormData[category] as Record<string, any>),
        [name]: value,
      },
    }));
  };

  const handleListingIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      listing_id: `NXYZ${value.replace(/^NXYZ/, "")}`,
    }));
  };
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      property_images: value.split(",").map((img) => img.trim()),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const updatedFormData = {
        ...formData,
        property_images: formData.property_images.map((img) => img.trim()),
      };

      const endpoint = `https://backend-real-estate-m1zm.onrender.com/pre-constructed-property/${formData.listing_id}`;
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        throw new Error("Failed to save property");
      }

      setSuccess(true);
      setError(null);

      router.push("/admin");
    } catch (err) {
      console.error(err);
      setError("Error saving property. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Edit Property</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && (
        <p className="text-green-500 mb-4">Property updated successfully!</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Property Information */}
        <div>
          <label className="block font-semibold">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleSelectChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          >
            <option value="">Select Category</option>
            <option value="pre-constructed">Pre Constructed</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Price:</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Available For:</label>
          <input
            type="text"
            name="available_for"
            value={formData.available_for}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        {/* <div>
          <label className="block font-semibold">Listing ID:</label>
          <input
            type="text"
            name="listing_id"
            value={formData.listing_id}
            onChange={handleListingIdChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div> */}
        <div>
          <label className="block font-semibold">Property Description:</label>
          <textarea
            name="property_description"
            value={formData.property_description}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-semibold">
            Property Images (comma-separated URLs):
          </label>
          <input
            type="text"
            name="property_images"
            value={formData.property_images.join(", ")}
            onChange={handleImagesChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        {/* General Details */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">General Details</h3>
          <div>
            <label className="block font-semibold">Price:</label>
            <input
              type="text"
              name="Price"
              value={formData.general_details?.Price}
              onChange={(e) => handleNestedChange(e, "general_details")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Taxes:</label>
            <input
              type="text"
              name="Taxes"
              value={formData.general_details?.Taxes}
              onChange={(e) => handleNestedChange(e, "general_details")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Address:</label>
            <input
              type="text"
              name="Address"
              value={formData.general_details?.Address}
              onChange={(e) => handleNestedChange(e, "general_details")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Lot Size:</label>
            <input
              type="text"
              name="Lot_Size"
              value={formData.general_details.Lot_Size}
              onChange={(e) => handleNestedChange(e, "general_details")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">
              Directions/Cross Streets:
            </label>
            <input
              type="text"
              name="Directions"
              value={formData.general_details.Directions}
              onChange={(e) => handleNestedChange(e, "general_details")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
        </div>

        {/* Room Interior */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Room Interior</h3>
          <div>
            <label className="block font-semibold">Rooms:</label>
            <input
              type="number"
              name="Rooms"
              value={formData.room_interior.Rooms}
              onChange={(e) => handleNestedChange(e, "room_interior")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Rooms plus:</label>
            <input
              type="number"
              name="Rooms_plus"
              value={formData.room_interior.Rooms_plus}
              onChange={(e) => handleNestedChange(e, "room_interior")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Bedrooms:</label>
            <input
              type="number"
              name="Bedrooms"
              value={formData.room_interior.Bedrooms}
              onChange={(e) => handleNestedChange(e, "room_interior")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Bedrooms plus:</label>
            <input
              type="number"
              name="Bedrooms_plus"
              value={formData.room_interior.Bedrooms_plus}
              onChange={(e) => handleNestedChange(e, "room_interior")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Kitchens:</label>
            <input
              type="number"
              name="Kitchens"
              value={formData.room_interior.Kitchens}
              onChange={(e) => handleNestedChange(e, "room_interior")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Family Room:</label>
            <select
              name="Family_Room"
              value={formData.room_interior.Family_Room}
              onChange={(e: any) => handleNestedChange(e, "room_interior")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            >
              <option value="">Select</option>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Basement:</label>
            <input
              type="text"
              name="Basement"
              value={formData.room_interior.Basement}
              onChange={(e) => handleNestedChange(e, "room_interior")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
        </div>

        {/* Exterior */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Exterior</h3>
          <div>
            <label className="block font-semibold">Property Type:</label>
            <input
              type="text"
              name="Property_Type"
              value={formData.exterior.Property_Type}
              onChange={(e) => handleNestedChange(e, "exterior")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Style:</label>
            <input
              type="text"
              name="Style"
              value={formData.exterior.Style}
              onChange={(e) => handleNestedChange(e, "exterior")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Exterior:</label>
            <input
              type="text"
              name="Exterior"
              value={formData.exterior.Exterior}
              onChange={(e) => handleNestedChange(e, "exterior")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Garage Type:</label>
            <input
              type="text"
              name="Garage_Type"
              value={formData.exterior.Garage_Type}
              onChange={(e) => handleNestedChange(e, "exterior")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Drive Parking Spaces:</label>
            <input
              type="number"
              name="Drive_Parking_Spaces"
              value={formData.exterior.Drive_Parking_Spaces}
              onChange={(e) => handleNestedChange(e, "exterior")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Pool:</label>
            <input
              type="text"
              name="Pool"
              value={formData.exterior.Pool}
              onChange={(e) => handleNestedChange(e, "exterior")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
        </div>

        {/* Utilities */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Utilities</h3>
          <div>
            <label className="block font-semibold">Fireplace/Stove:</label>
            <select
              name="Fireplace_Stove"
              value={formData.utilities.Fireplace_Stove}
              onChange={(e: any) => handleNestedChange(e, "utilities")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            >
              <option value="">Select</option>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Heat Source:</label>
            <input
              type="text"
              name="Heat_Source"
              value={formData.utilities.Heat_Source}
              onChange={(e) => handleNestedChange(e, "utilities")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Heat Type:</label>
            <input
              type="text"
              name="Heat_Type"
              value={formData.utilities.Heat_Type}
              onChange={(e) => handleNestedChange(e, "utilities")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">
              Central Air Conditioning:
            </label>
            <input
              type="text"
              name="Central_Air_Conditioning"
              value={formData.utilities.Central_Air_Conditioning}
              onChange={(e) => handleNestedChange(e, "utilities")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Laundry Level:</label>
            <input
              type="text"
              name="Laundry_Level"
              value={formData.utilities.Laundry_Level}
              onChange={(e: any) => handleNestedChange(e, "utilities")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Sewers:</label>
            <input
              type="text"
              name="Sewers"
              value={formData.utilities.Sewers}
              onChange={(e) => handleNestedChange(e, "utilities")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Water:</label>
            <input
              type="text"
              name="Water"
              value={formData.utilities.Water}
              onChange={(e) => handleNestedChange(e, "utilities")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
        </div>

        {/* At a Glance */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">At a Glance</h3>
          <div>
            <label className="block font-semibold">Type:</label>
            <input
              type="text"
              name="Type"
              value={formData.at_a_glance.Type}
              onChange={(e) => handleNestedChange(e, "at_a_glance")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Area:</label>
            <input
              type="text"
              name="Area"
              value={formData.at_a_glance.Area}
              onChange={(e) => handleNestedChange(e, "at_a_glance")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Municipality:</label>
            <input
              type="text"
              name="Municipality"
              value={formData.at_a_glance.Municipality}
              onChange={(e) => handleNestedChange(e, "at_a_glance")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Neighbourhood:</label>
            <input
              type="text"
              name="Neighbourhood"
              value={formData.at_a_glance.Neighbourhood}
              onChange={(e) => handleNestedChange(e, "at_a_glance")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Style:</label>
            <input
              type="text"
              name="Style"
              value={formData.at_a_glance.Style}
              onChange={(e) => handleNestedChange(e, "at_a_glance")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Lot Size:</label>
            <input
              type="text"
              name="LotSize"
              value={formData.at_a_glance.LotSize}
              onChange={(e) => handleNestedChange(e, "at_a_glance")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Tax:</label>
            <input
              type="text"
              name="Tax"
              value={formData.at_a_glance.Tax}
              onChange={(e) => handleNestedChange(e, "at_a_glance")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Beds:</label>
            <input
              type="number"
              name="Beds"
              value={formData.at_a_glance.Beds}
              onChange={(e) => handleNestedChange(e, "at_a_glance")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Baths:</label>
            <input
              type="number"
              name="Baths"
              value={formData.at_a_glance.Baths}
              onChange={(e) => handleNestedChange(e, "at_a_glance")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Fireplace:</label>
            <select
              name="Fireplace"
              value={formData.at_a_glance.Fireplace}
              onChange={(e: any) => handleNestedChange(e, "at_a_glance")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            >
              <option value="">Select</option>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Pool:</label>
            <input
              type="text"
              name="Pool"
              value={formData.at_a_glance.Pool}
              onChange={(e) => handleNestedChange(e, "at_a_glance")}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Street View</h3>
          <input
            type="text"
            name="street_view"
            value={formData.street_view}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Map Location</h3>
          <input
            type="text"
            name="map_location"
            value={formData.map_location}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Edit Property
        </button>
      </form>
    </div>
  );
};

export default EditPreConstructedPropertyForm;
