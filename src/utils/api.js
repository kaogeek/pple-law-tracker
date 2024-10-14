// api.js

export const fetchLawsData = async () => {
    try {
      const response = await fetch(
        // "https://raw.githubusercontent.com/kaogeek/pple-law-tracker-api/refs/heads/main/data/law.json"
        "https://script.googleusercontent.com/macros/echo?user_content_key=ldGc2ROiBjFxXmkW1nd1eOjIzVqd0thYpliwmXksaXmqnjY3sVncG-7U-xDjwRhMKwIB2tYNlW893Db3HzYxicWszrKGUQC1OJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa_jOTO_hlgork2nTG7mQG4860fkLiTD3smUWQ7Lz8ULury6r-09C1ElHJ0YTbqqxIOLfXPE-EWQcb-VQUO9Dp-edTYai3lWv9wXIuFltvcj9nLUPiaU-mb5OtjOmrHMgPg&lib=MXeYM1LBWLVaGglQI9XZ8_aFfG1nqiLfk"
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