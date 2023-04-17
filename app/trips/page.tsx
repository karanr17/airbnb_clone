import { getCurrentUser } from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import { TripsClient } from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    <ClientOnly>
      <EmptyState title="Unauthorized" subtitle="Please login to continue" />
    </ClientOnly>;
  }

  const reservations = await getReservations({ userId: currentUser?.id });

  if (reservations.length === 0) {
    <ClientOnly>
      <EmptyState
        title="No trips found"
        subtitle="Looks like you haven't reserved any trips."
      />
    </ClientOnly>;
  }

  return (
    <ClientOnly>
      <TripsClient 
        reservations={reservations} 
        currentUser={currentUser} 
      />
    </ClientOnly>
  );
};

export default TripsPage;