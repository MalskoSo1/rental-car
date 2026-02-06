// import css from "./page.module.css";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CarDetailsClient from "./CarDetails.client";
import { fetchCarById } from "@/lib/carsApi";
import { notFound } from "next/navigation";

interface CarDetailsProps {
  params: Promise<{ id: string }>;
}

const CarDetails = async ({ params }: CarDetailsProps) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["getCar", id],
      queryFn: () => fetchCarById(id),
    });
  } catch {
    notFound();
  }

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CarDetailsClient />
      </HydrationBoundary>
    </>
  );
};

export default CarDetails;
