import { useErrorStore } from "@/shared/infra/services/store/error-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setError } = useErrorStore();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        throwOnError(error) {
          setError(error);
          return false;
        },
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
