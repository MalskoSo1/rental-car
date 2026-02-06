import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CarDetailsClient from "./CarDetails.client";
import { fetchCarById } from "@/lib/carsApi";

interface CarDetailsProps {
  params: Promise<{ id: string }>;
}

const CarDetails = async ({ params }: CarDetailsProps) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getCar", id],
    queryFn: () => fetchCarById(id),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CarDetailsClient />
      </HydrationBoundary>
    </>
  );
};

export default CarDetails;
