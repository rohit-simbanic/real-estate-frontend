export const fetchProperties = async (endpoint: string) => {
  try {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};

export const fetchSingleProperty = async (id: string) => {
  try {
    const response = await fetch(
      `https://backend-real-estate-m1zm.onrender.com/properties/${id}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching property with id ${id}:`, error);
    throw error;
  }
};

export const fetchBannerData = async () => {
  const response = await fetch(
    "https://backend-real-estate-m1zm.onrender.com/banner",
    {
      cache: "no-store",
    }
  );
  const data = await response.json();
  return data;
};

export const fetchPreconstructedProperties = async (endpoint: string) => {
  try {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};

export const fetchSinglePreconstructedProperty = async (id: string) => {
  try {
    const response = await fetch(
      `https://backend-real-estate-m1zm.onrender.com/pre-constructed-property/${id}`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching property with id ${id}:`, error);
    throw error;
  }
};
