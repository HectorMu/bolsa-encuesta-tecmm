import { useState, useEffect, useCallback } from "react";

const useServiceFetchV2 = (service, dependencies, initialState = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hookData, setHookData] = useState(initialState);
  const [error, setError] = useState({ error: false, message: "No error." });

  const fetchService = useCallback(async () => {
    setIsLoading(true);

    const data = await service();
    if (data?.error) {
      setError(data);
      setIsLoading(false);
      return;
    }

    setHookData(data);
    setIsLoading(false);
  }, dependencies);

  const refreshData = async () => {
    await fetchService();
  };

  useEffect(() => {
    fetchService();
  }, [fetchService]);

  return {
    isLoading,
    hookData,
    refreshData,
    error,
  };
};

export default useServiceFetchV2;
