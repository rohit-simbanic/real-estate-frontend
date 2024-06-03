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
    const response = await fetch(`http://localhost:5000/properties/${id}`, {
      next: { revalidate: 0 },
    });
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
  const response = await fetch("http://localhost:5000/banner", {
    cache: "no-store",
  });
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
      `http://localhost:5000/pre-constructed-property/${id}`,
      { next: { revalidate: 0 } }
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
