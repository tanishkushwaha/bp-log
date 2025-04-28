import { useCallback, useEffect, useState } from "react";
import { getAllBPData } from "@/utils/storage";
import { useBPData } from "@/contexts/BPDataContext";

/**
 * Fetches blood pressure data from and stores it in BPDataContext.
 *
 * @param {any} refreshKey - The refresh key used to trigger a data fetch.
 * @returns {{loading: boolean}} loading - The loading state of the data fetch.
 */

export default function useFetchBPData(refreshKey: any): { loading: boolean } {
  const { setData } = useBPData();
  const [loading, setLoading] = useState(true);

  useEffect(
    useCallback(() => {
      setLoading(true);
      getAllBPData().then((data) => {
        setData(data);
        setLoading(false);
      });
    }, []),
    [refreshKey]
  );

  return { loading };
}
