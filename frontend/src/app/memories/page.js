"use client";

import React, { useState, useEffect } from "react";
import Memories from "@/features/memories/Memories";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const page = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://0.0.0.0:8080/memory/all_memories?user_id=brandon"
        );
        setData(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {data && <Memories userMemories={data} />}
      {error && <div>{error}</div>}
      {!data && !error && <BeatLoader />}
    </>
  );
};

export default page;
