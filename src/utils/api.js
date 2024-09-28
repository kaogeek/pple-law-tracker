// api.js

export const fetchLawsData = async () => {
    try {
      const response = await fetch(
        "https://script.googleusercontent.com/macros/echo?user_content_key=O96OZrDaW2Z4EAPuf9oG6q53Eb0tgNNgRoitowKfrvs_T7iPjMnIBacJgm8ii-tpkTEg_M_sKwGDp3nCB1xgTmIUdLRbuTJ-OJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHayBUfv6ZGLG6uFQuDdJOe2htPEOuoYF2vx2QPUlL7SXJB4nRgSyH3pYu1_6bwRyEXpveX5FRmVUvWcrvud4QYHrrG1gCmKj_aAXIuFltvcj9nLUPiaU-mb5OtjOmrHMgPg&lib=MXeYM1LBWLVaGglQI9XZ8_aFfG1nqiLfk"
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