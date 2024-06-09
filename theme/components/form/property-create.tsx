"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { getCloudinaryUrl } from "@/helpers/cloudinary-image-fetch";

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
  category: string;
  price: string;
  available_for: string;
  listing_id: string;
  property_description: string;
  property_images: { file: File | null; url: string }[];
  general_details: GeneralDetails;
  room_interior: RoomInterior;
  exterior: Exterior;
  utilities: Utilities;
  at_a_glance: AtAGlance;
  latitude: string;
  longitude: string;
}

const initialFormData: FormData = {
  category: "",
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
  latitude: "",
  longitude: "",
};

interface PropertyFormProps {
  propertyId: string | null;
  onClose?: () => void;
}
const PropertyForm: React.FC<PropertyFormProps> = ({ propertyId, onClose }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  console.log("single form data", formData);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("category");
  const scrollableContainerRef = React.useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.available_for)
      newErrors.available_for = "Available for is required";
    if (!formData.listing_id) newErrors.listing_id = "Listing ID is required";
    if (!formData.property_description)
      newErrors.property_description = "Property description is required";
    if (
      formData.property_images.length < 5 ||
      formData.property_images.length > 11
    ) {
      newErrors.property_images =
        "At least five property images are required but not exceeding ten images.";
    }

    const { general_details, room_interior, exterior, utilities, at_a_glance } =
      formData;

    if (!general_details.Price)
      newErrors.general_details_Price = "Price is required";
    if (!general_details.Taxes)
      newErrors.general_details_Taxes = "Taxes are required";
    if (!general_details.Address)
      newErrors.general_details_Address = "Address is required";
    if (!general_details.Lot_Size)
      newErrors.general_details_Lot_Size = "Lot size is required";
    if (!general_details.Directions)
      newErrors.general_details_Directions = "Directions are required";

    if (!room_interior.Rooms)
      newErrors.room_interior_Rooms = "Number of rooms is required";
    if (!room_interior.Rooms_plus)
      newErrors.room_interior_Rooms_plus = "Number of rooms plus is required";
    if (!room_interior.Bedrooms)
      newErrors.room_interior_Bedrooms = "Number of bedrooms is required";
    if (!room_interior.Bedrooms_plus)
      newErrors.room_interior_Bedrooms_plus =
        "Number of bedrooms plus is required";
    if (!room_interior.Kitchens)
      newErrors.room_interior_Kitchens = "Number of kitchens is required";
    if (!room_interior.Family_Room)
      newErrors.room_interior_Family_Room = "Family room info is required";
    if (!room_interior.Basement)
      newErrors.room_interior_Basement = "Basement info is required";

    if (!exterior.Property_Type)
      newErrors.exterior_Property_Type = "Property type is required";
    if (!exterior.Style) newErrors.exterior_Style = "Style is required";
    if (!exterior.Exterior)
      newErrors.exterior_Exterior = "Exterior info is required";
    if (!exterior.Garage_Type)
      newErrors.exterior_Garage_Type = "Garage type is required";
    if (!exterior.Drive_Parking_Spaces)
      newErrors.exterior_Drive_Parking_Spaces =
        "Drive parking spaces info is required";
    if (!exterior.Pool) newErrors.exterior_Pool = "Pool info is required";

    if (!utilities.Fireplace_Stove)
      newErrors.utilities_Fireplace_Stove = "Fireplace/Stove info is required";
    if (!utilities.Heat_Source)
      newErrors.utilities_Heat_Source = "Heat source is required";
    if (!utilities.Heat_Type)
      newErrors.utilities_Heat_Type = "Heat type is required";
    if (!utilities.Central_Air_Conditioning)
      newErrors.utilities_Central_Air_Conditioning =
        "Central air conditioning info is required";
    if (!utilities.Laundry_Level)
      newErrors.utilities_Laundry_Level = "Laundry level is required";
    if (!utilities.Sewers)
      newErrors.utilities_Sewers = "Sewers info is required";
    if (!utilities.Water) newErrors.utilities_Water = "Water info is required";

    if (!at_a_glance.Type) newErrors.at_a_glance_Type = "Type is required";
    if (!at_a_glance.Area) newErrors.at_a_glance_Area = "Area is required";
    if (!at_a_glance.Municipality)
      newErrors.at_a_glance_Municipality = "Municipality is required";
    if (!at_a_glance.Neighbourhood)
      newErrors.at_a_glance_Neighbourhood = "Neighbourhood is required";
    if (!at_a_glance.Style) newErrors.at_a_glance_Style = "Style is required";
    if (!at_a_glance.LotSize)
      newErrors.at_a_glance_LotSize = "Lot size is required";
    if (!at_a_glance.Tax) newErrors.at_a_glance_Tax = "Tax info is required";
    if (!at_a_glance.Beds)
      newErrors.at_a_glance_Beds = "Number of beds is required";
    if (!at_a_glance.Baths)
      newErrors.at_a_glance_Baths = "Number of baths is required";
    if (!at_a_glance.Fireplace)
      newErrors.at_a_glance_Fireplace = "Fireplace info is required";
    if (!at_a_glance.Pool) newErrors.at_a_glance_Pool = "Pool info is required";
    if (!formData.latitude) newErrors.latitude = "Latitude is required";
    if (!formData.longitude) newErrors.longitude = "Longitude is required";
    return newErrors;
  };

  const hasTabErrors = (tab: string) => {
    switch (tab) {
      case "category":
        return !!(
          errors.category ||
          errors.price ||
          errors.available_for ||
          errors.listing_id ||
          errors.property_description ||
          errors.property_images
        );
      case "general_details":
        return !!(
          errors.general_details_Price ||
          errors.general_details_Taxes ||
          errors.general_details_Address ||
          errors.general_details_Lot_Size ||
          errors.general_details_Directions
        );
      case "room_interior":
        return !!(
          errors.room_interior_Rooms ||
          errors.room_interior_Rooms_plus ||
          errors.room_interior_Bedrooms ||
          errors.room_interior_Bedrooms_plus ||
          errors.room_interior_Kitchens ||
          errors.room_interior_Family_Room ||
          errors.room_interior_Basement
        );
      case "exterior":
        return !!(
          errors.exterior_Property_Type ||
          errors.exterior_Style ||
          errors.exterior_Exterior ||
          errors.exterior_Garage_Type ||
          errors.exterior_Drive_Parking_Spaces ||
          errors.exterior_Pool
        );
      case "utilities":
        return !!(
          errors.utilities_Fireplace_Stove ||
          errors.utilities_Heat_Source ||
          errors.utilities_Heat_Type ||
          errors.utilities_Central_Air_Conditioning ||
          errors.utilities_Laundry_Level ||
          errors.utilities_Sewers ||
          errors.utilities_Water
        );
      case "at_a_glance":
        return !!(
          errors.at_a_glance_Type ||
          errors.at_a_glance_Area ||
          errors.at_a_glance_Municipality ||
          errors.at_a_glance_Neighbourhood ||
          errors.at_a_glance_Style ||
          errors.at_a_glance_LotSize ||
          errors.at_a_glance_Tax ||
          errors.at_a_glance_Beds ||
          errors.at_a_glance_Baths ||
          errors.at_a_glance_Fireplace ||
          errors.at_a_glance_Pool
        );
      case "map":
        return !!(errors.latitude || errors.longitude);
      default:
        return false;
    }
  };

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const maxSize = 5 * 1024 * 1024; // 5 MB size limit
    const allowedFormats = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];
    let newFiles: { file: File | null; url: string }[] = [];

    if (files) {
      newFiles = Array.from(files)
        .map((file) => {
          if (!allowedFormats.includes(file.type)) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              property_images: `Only PNG, JPG, JPEG, and WEBP formats are allowed.`,
            }));
            return null;
          }
          if (file.size > maxSize) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              property_images: `File size should not exceed 5 MB.`,
            }));
            return null;
          }
          return {
            file,
            url: URL.createObjectURL(file),
          };
        })
        .filter((file): file is { file: File; url: string } => file !== null); // Remove null values
    }

    setFormData((prevFormData) => {
      const uniqueFiles = newFiles.filter(
        (newFile) =>
          !prevFormData.property_images.some(
            (existingFile) => existingFile.url === newFile.url
          )
      );
      return {
        ...prevFormData,
        property_images: [...prevFormData.property_images, ...uniqueFiles],
      };
    });
  };

  const handleDeleteImage = async (index: number) => {
    const imageToDelete = formData.property_images[index];
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized. Please log in.");
      return;
    }

    try {
      const filename = imageToDelete.url.split("/upload/")[1];
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/property/properties-image/${propertyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { filename: filename },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to delete image from backend.");
      }

      setFormData((prevFormData) => {
        const updatedImages = prevFormData.property_images.filter(
          (_, i) => i !== index
        );
        return {
          ...prevFormData,
          property_images: updatedImages,
        };
      });
    } catch (error) {
      console.error("Error deleting image:", error);
      setError("Failed to delete image.");
    }
  };

  const appendNestedObject = (
    formData: FormData,
    formDataToSend: globalThis.FormData
  ) => {
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof FormData];
      if (
        typeof value === "object" &&
        !(value instanceof File) &&
        !Array.isArray(value)
      ) {
        formDataToSend.append(key, JSON.stringify(value)); // Serialize the nested object
      } else if (key !== "property_images") {
        formDataToSend.append(key, value as string | Blob);
      }
    });
  };
  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
    setFormData(initialFormData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const files = formData.property_images
        .map((image) => image.file)
        .filter((file): file is File => file !== null);
      console.log("newly added files: ", files);
      // Prepare FormData
      const data = new FormData();
      files.forEach((file) => {
        data.append("property_images", file);
      });

      // Append other fields
      appendNestedObject(formData, data);

      //@ts-ignore
      for (let [key, value] of data.entries()) {
        if (value instanceof File) {
          console.log(`${key}: ${value.name} (File)`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      let response;
      if (propertyId) {
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/property/properties/${propertyId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/property/add-property`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      setSuccess(true);
      setError(null);
      setErrors({});
      setFormData(initialFormData);
      if (onClose) {
        onClose();
      }
      router.push("/admin");
    } catch (err) {
      console.error(err);
      setError("Error saving property. Please try again.");
      setSuccess(false);
    }
  };
  const extractCoordinates = (url: string) => {
    const regex = /@([0-9.-]+),([0-9.-]+)/;
    const matches = url.match(regex);
    if (matches) {
      return {
        latitude: matches[1],
        longitude: matches[2],
      };
    }
    return { latitude: "", longitude: "" };
  };
  useEffect(() => {
    if (propertyId) {
      const fetchPropertyData = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/property/properties/${propertyId}`
          );
          const propertyData = response.data;

          const { street_view } = propertyData;
          const { latitude, longitude } = extractCoordinates(street_view);

          const formattedPropertyData = {
            ...propertyData,
            latitude,
            longitude,
            property_images: propertyData.property_images.map((img: any) => ({
              file: null,
              url: getCloudinaryUrl(img.filename),
              filename: img.filename,
            })),
          };

          setFormData(formattedPropertyData);
        } catch (err) {
          console.error(err);
          setError("Failed to fetch property data.");
        }
      };

      fetchPropertyData();
    }
  }, []);
  useEffect(() => {
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  const tabContent = () => {
    switch (activeTab) {
      case "category":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <div>
              <label className="block font-semibold">Category:</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleSelectChange}
                className="p-3 border border-gray-300 rounded w-full"
              >
                <option value="">Select Category</option>
                <option value="featured">Featured</option>
                <option value="sold">Sold</option>
              </select>
              {errors.category && (
                <p className="text-red-500">{errors.category}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold">Price:</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.price && <p className="text-red-500">{errors.price}</p>}
            </div>
            <div>
              <label className="block font-semibold">Available For:</label>
              <select
                name="available_for"
                value={formData.available_for}
                onChange={handleSelectChange}
                className="p-3 border border-gray-300 rounded w-full"
              >
                <option value="">Select one</option>
                <option value="sale">Sale</option>
                <option value="lease">Lease</option>
              </select>

              {errors.available_for && (
                <p className="text-red-500">{errors.available_for}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Listing ID:</label>
              <input
                type="text"
                name="listing_id"
                value={formData.listing_id}
                onChange={handleListingIdChange}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.listing_id && (
                <p className="text-red-500">{errors.listing_id}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">
                Property Description:
              </label>
              <textarea
                name="property_description"
                value={formData.property_description}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded w-full"
              ></textarea>
              {errors.property_description && (
                <p className="text-red-500">{errors.property_description}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">
                Property Images ( At least 5 images):
              </label>
              <input
                type="file"
                name="property_images"
                multiple
                onChange={handleFileChange}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.property_images &&
                formData.property_images.length < 5 && (
                  <p className="text-red-500">{errors.property_images}</p>
                )}
              {formData.property_images.length > 0 && (
                <div className="mt-2">
                  <p>Uploaded Images:</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {formData.property_images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image.url}
                          alt={`Property Image ${index + 1}`}
                          className="w-full sm:w-[200px] object-cover h-[100px] rounded"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteImage(index)}
                          className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case "general_details":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <h3 className="text-xl font-bold mb-4">General Details</h3>
            <div>
              <label className="block font-semibold">Price:</label>
              <input
                type="text"
                name="Price"
                value={formData.general_details.Price}
                onChange={(e) => handleNestedChange(e, "general_details")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.general_details_Price && (
                <p className="text-red-500">{errors.general_details_Price}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Taxes:</label>
              <input
                type="text"
                name="Taxes"
                value={formData.general_details.Taxes}
                onChange={(e) => handleNestedChange(e, "general_details")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.general_details_Taxes && (
                <p className="text-red-500">{errors.general_details_Taxes}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Address:</label>
              <input
                type="text"
                name="Address"
                value={formData.general_details.Address}
                onChange={(e) => handleNestedChange(e, "general_details")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.general_details_Address && (
                <p className="text-red-500">{errors.general_details_Address}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Lot Size:</label>
              <input
                type="text"
                name="Lot_Size"
                value={formData.general_details.Lot_Size}
                onChange={(e) => handleNestedChange(e, "general_details")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.general_details_Lot_Size && (
                <p className="text-red-500">
                  {errors.general_details_Lot_Size}
                </p>
              )}
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
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.general_details_Directions && (
                <p className="text-red-500">
                  {errors.general_details_Directions}
                </p>
              )}
            </div>
          </div>
        );
      case "room_interior":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <h3 className="text-xl font-bold">Room Interior</h3>
            <div>
              <label className="block font-semibold">Rooms:</label>
              <input
                type="number"
                name="Rooms"
                value={formData.room_interior.Rooms}
                onChange={(e) => handleNestedChange(e, "room_interior")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.room_interior_Rooms && (
                <p className="text-red-500">{errors.room_interior_Rooms}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Rooms plus:</label>
              <input
                type="number"
                name="Rooms_plus"
                value={formData.room_interior.Rooms_plus}
                onChange={(e) => handleNestedChange(e, "room_interior")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.room_interior_Rooms_plus && (
                <p className="text-red-500">
                  {errors.room_interior_Rooms_plus}
                </p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Bedrooms:</label>
              <input
                type="number"
                name="Bedrooms"
                value={formData.room_interior.Bedrooms}
                onChange={(e) => handleNestedChange(e, "room_interior")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.room_interior_Bedrooms && (
                <p className="text-red-500">{errors.room_interior_Bedrooms}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Bedrooms plus:</label>
              <input
                type="number"
                name="Bedrooms_plus"
                value={formData.room_interior.Bedrooms_plus}
                onChange={(e) => handleNestedChange(e, "room_interior")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.room_interior_Bedrooms_plus && (
                <p className="text-red-500">
                  {errors.room_interior_Bedrooms_plus}
                </p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Kitchens:</label>
              <input
                type="number"
                name="Kitchens"
                value={formData.room_interior.Kitchens}
                onChange={(e) => handleNestedChange(e, "room_interior")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.room_interior_Kitchens && (
                <p className="text-red-500">{errors.room_interior_Kitchens}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Family Room:</label>
              <select
                name="Family_Room"
                value={formData.room_interior.Family_Room}
                onChange={(e: any) => handleNestedChange(e, "room_interior")}
                className="p-3 border border-gray-300 rounded w-full"
              >
                <option value="">Select</option>
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </select>
              {errors.room_interior_Family_Room && (
                <p className="text-red-500">
                  {errors.room_interior_Family_Room}
                </p>
              )}
            </div>
            <div>
              <label className="block font-semibold">Basement:</label>
              <input
                type="text"
                name="Basement"
                value={formData.room_interior.Basement}
                onChange={(e) => handleNestedChange(e, "room_interior")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.room_interior_Basement && (
                <p className="text-red-500">{errors.room_interior_Basement}</p>
              )}
            </div>
          </div>
        );
      case "exterior":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <h3 className="text-xl font-bold">Exterior</h3>
            <div>
              <label className="block font-semibold">Property Type:</label>
              <input
                type="text"
                name="Property_Type"
                value={formData.exterior.Property_Type}
                onChange={(e) => handleNestedChange(e, "exterior")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.exterior_Property_Type && (
                <p className="text-red-500">{errors.exterior_Property_Type}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold">Style:</label>
              <input
                type="text"
                name="Style"
                value={formData.exterior.Style}
                onChange={(e) => handleNestedChange(e, "exterior")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.exterior_Style && (
                <p className="text-red-500">{errors.exterior_Style}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold">Exterior:</label>
              <input
                type="text"
                name="Exterior"
                value={formData.exterior.Exterior}
                onChange={(e) => handleNestedChange(e, "exterior")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.exterior_Exterior && (
                <p className="text-red-500">{errors.exterior_Exterior}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold">Garage Type:</label>
              <input
                type="text"
                name="Garage_Type"
                value={formData.exterior.Garage_Type}
                onChange={(e) => handleNestedChange(e, "exterior")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.exterior_Garage_Type && (
                <p className="text-red-500">{errors.exterior_Garage_Type}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold">
                Drive Parking Spaces:
              </label>
              <input
                type="number"
                name="Drive_Parking_Spaces"
                value={formData.exterior.Drive_Parking_Spaces}
                onChange={(e) => handleNestedChange(e, "exterior")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.exterior_Drive_Parking_Spaces && (
                <p className="text-red-500">
                  {errors.exterior_Drive_Parking_Spaces}
                </p>
              )}
            </div>
            <div>
              <label className="block font-semibold">Pool:</label>
              <input
                type="text"
                name="Pool"
                value={formData.exterior.Pool}
                onChange={(e) => handleNestedChange(e, "exterior")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.exterior_Pool && (
                <p className="text-red-500">{errors.exterior_Pool}</p>
              )}
            </div>
          </div>
        );
      case "utilities":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <h3 className="text-xl font-bold">Utilities</h3>
            <div>
              <label className="block font-semibold">Fireplace/Stove:</label>
              <select
                name="Fireplace_Stove"
                value={formData.utilities.Fireplace_Stove}
                onChange={(e: any) => handleNestedChange(e, "utilities")}
                className="p-3 border border-gray-300 rounded w-full"
              >
                <option value="">Select</option>
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </select>
              {errors.utilities_Fireplace_Stove && (
                <p className="text-red-500">
                  {errors.utilities_Fireplace_Stove}
                </p>
              )}
            </div>
            <div>
              <label className="block font-semibold">Heat Source:</label>
              <input
                type="text"
                name="Heat_Source"
                value={formData.utilities.Heat_Source}
                onChange={(e) => handleNestedChange(e, "utilities")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.utilities_Heat_Source && (
                <p className="text-red-500">{errors.utilities_Heat_Source}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold">Heat Type:</label>
              <input
                type="text"
                name="Heat_Type"
                value={formData.utilities.Heat_Type}
                onChange={(e) => handleNestedChange(e, "utilities")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.utilities_Heat_Type && (
                <p className="text-red-500">{errors.utilities_Heat_Type}</p>
              )}
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
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.utilities_Central_Air_Conditioning && (
                <p className="text-red-500">
                  {errors.utilities_Central_Air_Conditioning}
                </p>
              )}
            </div>
            <div>
              <label className="block font-semibold">Laundry Level:</label>
              <input
                type="text"
                name="Laundry_Level"
                value={formData.utilities.Laundry_Level}
                onChange={(e) => handleNestedChange(e, "utilities")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.utilities_Laundry_Level && (
                <p className="text-red-500">{errors.utilities_Laundry_Level}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold">Sewers:</label>
              <input
                type="text"
                name="Sewers"
                value={formData.utilities.Sewers}
                onChange={(e) => handleNestedChange(e, "utilities")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.utilities_Sewers && (
                <p className="text-red-500">{errors.utilities_Sewers}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold">Water:</label>
              <input
                type="text"
                name="Water"
                value={formData.utilities.Water}
                onChange={(e) => handleNestedChange(e, "utilities")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.utilities_Water && (
                <p className="text-red-500">{errors.utilities_Water}</p>
              )}
            </div>
          </div>
        );
      case "at_a_glance":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <h3 className="text-xl font-bold">At a Glance</h3>
            <div>
              <label className="block font-semibold">Type:</label>
              <input
                type="text"
                name="Type"
                value={formData.at_a_glance.Type}
                onChange={(e) => handleNestedChange(e, "at_a_glance")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.at_a_glance_Type && (
                <p className="text-red-500">{errors.at_a_glance_Type}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold">Area:</label>
              <input
                type="text"
                name="Area"
                value={formData.at_a_glance.Area}
                onChange={(e) => handleNestedChange(e, "at_a_glance")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.at_a_glance_Area && (
                <p className="text-red-500">{errors.at_a_glance_Area}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold">Municipality:</label>
              <input
                type="text"
                name="Municipality"
                value={formData.at_a_glance.Municipality}
                onChange={(e) => handleNestedChange(e, "at_a_glance")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.at_a_glance_Municipality && (
                <p className="text-red-500">
                  {errors.at_a_glance_Municipality}
                </p>
              )}
            </div>
            <div>
              <label className="block font-semibold">Neighbourhood:</label>
              <input
                type="text"
                name="Neighbourhood"
                value={formData.at_a_glance.Neighbourhood}
                onChange={(e) => handleNestedChange(e, "at_a_glance")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.at_a_glance_Neighbourhood && (
                <p className="text-red-500">
                  {errors.at_a_glance_Neighbourhood}
                </p>
              )}
            </div>
            <div>
              <label className="block font-semibold">Style:</label>
              <input
                type="text"
                name="Style"
                value={formData.at_a_glance.Style}
                onChange={(e) => handleNestedChange(e, "at_a_glance")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.at_a_glance_Style && (
                <p className="text-red-500">{errors.at_a_glance_Style}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold">Lot Size:</label>
              <input
                type="text"
                name="LotSize"
                value={formData.at_a_glance.LotSize}
                onChange={(e) => handleNestedChange(e, "at_a_glance")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.at_a_glance_LotSize && (
                <p className="text-red-500">{errors.at_a_glance_LotSize}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold">Tax:</label>
              <input
                type="text"
                name="Tax"
                value={formData.at_a_glance.Tax}
                onChange={(e) => handleNestedChange(e, "at_a_glance")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.at_a_glance_Tax && (
                <p className="text-red-500">{errors.at_a_glance_Tax}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold">Beds:</label>
              <input
                type="number"
                name="Beds"
                value={formData.at_a_glance.Beds}
                onChange={(e) => handleNestedChange(e, "at_a_glance")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.at_a_glance_Beds && (
                <p className="text-red-500">{errors.at_a_glance_Beds}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold">Baths:</label>
              <input
                type="number"
                name="Baths"
                value={formData.at_a_glance.Baths}
                onChange={(e) => handleNestedChange(e, "at_a_glance")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.at_a_glance_Baths && (
                <p className="text-red-500">{errors.at_a_glance_Baths}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold">Fireplace:</label>
              <select
                name="Fireplace"
                value={formData.at_a_glance.Fireplace}
                onChange={(e: any) => handleNestedChange(e, "at_a_glance")}
                className="p-3 border border-gray-300 rounded w-full"
              >
                <option value="">Select</option>
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </select>
              {errors.at_a_glance_Fireplace && (
                <p className="text-red-500">{errors.at_a_glance_Fireplace}</p>
              )}
            </div>
            <div>
              <label className="block font-semibold">Pool:</label>
              <input
                type="text"
                name="Pool"
                value={formData.at_a_glance.Pool}
                onChange={(e) => handleNestedChange(e, "at_a_glance")}
                className="p-3 border border-gray-300 rounded w-full"
              />
              {errors.at_a_glance_Pool && (
                <p className="text-red-500">{errors.at_a_glance_Pool}</p>
              )}
            </div>
          </div>
        );
      case "map":
        return (
          <>
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Latitude</h3>
              <input
                type="number"
                step="any"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded w-full"
                placeholder="43.8518637 [get latitude from google map]"
              />
              {errors.latitude && (
                <p className="text-red-500">{errors.latitude}</p>
              )}
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Longitude</h3>
              <input
                type="number"
                step="any"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded w-full"
                placeholder="-79.3505216 [get longitude from google map]"
              />
              {errors.longitude && (
                <p className="text-red-500">{errors.longitude}</p>
              )}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl p-8 w-full mx-auto lg:w-[40%] bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        {propertyId ? "Edit Property" : "Create Property"}
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {success && (
        <p className="text-green-500 mb-4">
          {" "}
          {propertyId
            ? "Property edited successfully "
            : "Property created successfully!"}
        </p>
      )}

      <div className="mb-6">
        <div className="flex space-x-4 flex-col md:flex-row gap-4">
          <button
            className={`${
              activeTab === "category"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : hasTabErrors("category")
                ? "text-red-500 font-bold"
                : ""
            } pb-2`}
            onClick={() => setActiveTab("category")}
          >
            Category
          </button>
          <button
            className={`${
              activeTab === "general_details"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : hasTabErrors("general_details")
                ? "text-red-500 font-bold"
                : ""
            } pb-2`}
            onClick={() => setActiveTab("general_details")}
          >
            General Details
          </button>
          <button
            className={`${
              activeTab === "room_interior"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : hasTabErrors("room_interior")
                ? "text-red-500 font-bold"
                : ""
            } pb-2`}
            onClick={() => setActiveTab("room_interior")}
          >
            Room Interior
          </button>
          <button
            className={`${
              activeTab === "exterior"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : hasTabErrors("exterior")
                ? "text-red-500 font-bold"
                : ""
            } pb-2`}
            onClick={() => setActiveTab("exterior")}
          >
            Exterior
          </button>
          <button
            className={`${
              activeTab === "utilities"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : hasTabErrors("utilities")
                ? "text-red-500 font-bold"
                : ""
            } pb-2`}
            onClick={() => setActiveTab("utilities")}
          >
            Utilities
          </button>
          <button
            className={`${
              activeTab === "at_a_glance"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : hasTabErrors("at_a_glance")
                ? "text-red-500 font-bold"
                : ""
            } pb-2`}
            onClick={() => setActiveTab("at_a_glance")}
          >
            At a Glance
          </button>
          <button
            className={`${
              activeTab === "map"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : hasTabErrors("map")
                ? "text-red-500 font-bold"
                : ""
            } pb-2`}
            onClick={() => setActiveTab("map")}
          >
            Map
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div
          ref={scrollableContainerRef}
          className="max-h-[500px] overflow-y-auto scrollable-container px-3"
        >
          {tabContent()}
          <div className="flex gap-4">
            <button
              type="submit"
              className="mt-4 bg-indigo-600 text-white px-5 py-3 rounded hover:bg-blue-600"
            >
              {propertyId ? "Edit Property" : "Create Property"}
            </button>
            {onClose && propertyId && (
              <button
                type="button"
                className="mt-4 bg-gray-700 text-white px-5 py-3 rounded hover:bg-gray-600"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
