// api.js

export const fetchLawsData = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/kaogeek/pple-law-tracker-api/refs/heads/main/data/law.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };  