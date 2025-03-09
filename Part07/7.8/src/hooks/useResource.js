import { useState, useEffect } from "react";
import axios from "axios";

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  // Fetch all resources when component mounts
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(baseUrl);
        setResources(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchResources();
  }, [baseUrl]); // Runs when baseUrl changes

  // ✅ Function to create a new resource
  const create = async (resource) => {
    try {
      const response = await axios.post(baseUrl, resource);
      setResources([...resources, response.data]); // Add new resource to state
    } catch (error) {
      console.error("Error creating resource:", error);
    }
  };

  return [resources, { create }];
};

export default useResource;
