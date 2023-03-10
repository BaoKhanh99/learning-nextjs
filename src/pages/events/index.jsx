import EventList from '../../components/events/EventList';
import { getAllEvents } from '../../../dummy-data';

function EventsPage() {
  const events = getAllEvents();

  return (
    <div>
      <EventList items={events} />
    </div>
  );
}

export default EventsPage;
