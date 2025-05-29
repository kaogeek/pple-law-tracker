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

export const fetchLawsDataNoco = async () => {
  try {
    const response = await fetch(
      // "/law-noco.json"
      "https://storage.googleapis.com/pple-media/promise-tracker/national.json"
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

export const fetchLocalLawsData = async () => {
  try {
    const response = await fetch(
      "https://storage.googleapis.com/pple-media/promise-tracker/local.json"
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