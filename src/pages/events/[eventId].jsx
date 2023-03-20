import { Fragment } from 'react';

import { getFeaturedEvents, getEventById } from '@/helpers/api-util';
import EventContent from '../event-detail/EventContent';
import EventLogistics from '../event-detail/EventLogistics';
import EventSummary from '../event-detail/EventSumary';

function EventDetailPage(props) {
  const event = props.selectedEvent;

  if(!event) {
    return <div className='center'>
      <p>Loading...</p>
    </div>;
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

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event
    },
    revalidate: 30
  }
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map(event => ({ params: {eventId: event.id} }));

  return {
    paths: paths,
    fallback: 'blocking'
  }
}

export default EventDetailPage;
