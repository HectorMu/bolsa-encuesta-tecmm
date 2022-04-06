import { useState, useEffect, useCallback } from "react";

const useServiceFetchV2 = (service, dependencies) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hookData, setHookData] = useState([]);

  const fetchService = useCallback(async () => {
    setIsLoading(true);
    const data = await service();
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
  };
};

export default useServiceFetchV2;
