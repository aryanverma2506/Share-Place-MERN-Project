import { useCallback, useEffect, useRef, useState } from "react";

interface RequestConfig {
  url: string;
  method?: "GET" | "PATCH" | "POST" | "DELETE";
  headers?: {
    [props: string]: string;
  };
  body?: string | FormData | null;
}

type SendRequestFunction = <T extends Object>(
  requestConfig: RequestConfig
) => Promise<T>;

export function useHttpClient(): {
  isLoading: boolean;
  error: string | null;
  sendRequest: SendRequestFunction;
  clearError: () => void;
} {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const activeHttpRequests = useRef<AbortController[]>([]);

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  const sendRequest: SendRequestFunction = useCallback(
    async (requestConfig) => {
      setIsLoading(() => true);
      setError(() => null);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method || "GET",
          credentials: "include",
          headers: requestConfig.headers || {},
          body: requestConfig.body || null,
          signal: httpAbortCtrl.signal,
        });
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        return responseData;
      } catch (error: any) {
        setError(() => error.message || "Something went wrong!");
        throw error;
      } finally {
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (ctrl) => ctrl !== httpAbortCtrl
        );
        setIsLoading(() => false);
      }
    },
    []
  );

  function clearError(): void {
    setError(() => null);
  }

  return { isLoading, error, sendRequest, clearError };
}
