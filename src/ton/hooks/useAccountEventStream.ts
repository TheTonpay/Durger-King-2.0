import { useCallback, useEffect, useState } from "react";
import { isAddress } from "../helpers/address";

export function useAccountEventStream(
  address: string,
  onEvent: (event: any) => void
) {
  const [listening, setListening] = useState(true);

  const stopListening = () => setListening(false);
  const startListening = () => setListening(true);

  const [originalEvents, setOriginalEvents] = useState<never[]>([]);

  const fetchEvents = useCallback(async () => {
    if (!isAddress(address)) return [];

    const response = await fetch(
      `https://testnet.tonapi.io/v1/event/getAccountEvents?account=${address}&limit=10`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data.events;
  }, [address]);

  useEffect(() => {
    fetchEvents().then((events) => {
      setOriginalEvents(events);
    });
  }, [fetchEvents, address]);

  useEffect(() => {
    if (!listening) return;

    const interval = setInterval(() => {
      fetchEvents().then((events) => {
        const newEvents = events.filter(
          (event: any) =>
            !originalEvents.some((e: any) => e.event_id === event.event_id)
        );
        newEvents.forEach((event: any) => onEvent(event));
        setOriginalEvents(events);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [listening, fetchEvents, originalEvents]);

  return { stopListening, startListening };
}
