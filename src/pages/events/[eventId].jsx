import ErrorAlert from '@/components/ui/ErrorAlert';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { getEventById } from '../../../dummy-data';
import EventContent from '../event-detail/EventContent';
import EventLogistics from '../event-detail/EventLogistics';
import EventSummary from '../event-detail/EventSumary';

function EventDetailPage() {
  const router = useRouter();
  const event = getEventById(router.query.eventId);

  if(!event) {
    return <ErrorAlert>
      <p>No event found!</p>
    </ErrorAlert>;
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address = {event.location}
        image={event.image}
        imageAlt = {event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default EventDetailPage;
