import { Fragment } from 'react';

import EventList from '../../components/events/EventList';
import { getAllEvents } from '../../../dummy-data';
import EventsSearch from '@/components/events/EventsSearch';

function EventsPage() {
  const events = getAllEvents();

  return (
    <Fragment>
      <EventsSearch />
      <EventList items={events} />
    </Fragment>
  );
}

export default EventsPage;
