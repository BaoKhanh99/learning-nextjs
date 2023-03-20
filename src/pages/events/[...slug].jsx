import { Fragment } from 'react';

import Button from '@/components/ui/button';
import ErrorAlert from '@/components/ui/ErrorAlert';
import { getFilteredEvents } from '@/helpers/api-util';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/ResultsTitle';

function FilteredEventsPage(props) {
  if(props.hasError) {
    return <Fragment>
      <ErrorAlert>
        <p>Invalid filter. Please adjust your value</p>
      </ErrorAlert>
      <div className='center'>
        <Button link='/events'>Show all Events </Button>
      </div>
    </Fragment>
  }

  const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return <Fragment>
      <ErrorAlert>
        <p>No events found for the chosen filter!</p>
      </ErrorAlert>
      <div className='center'>
        <Button link='/events'>Show all Events </Button>
      </div>
    </Fragment>
  }

  const date = new Date(props.date.year, props.date.month - 1)


  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents}></EventList>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const filterData = params.slug;

  const filteredYear = +filterData[0];
  const filteredMonth = +filterData[1];

  if(
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth > 13 ||
    filteredMonth < 1
  ) {
    return { props: { hasError: true } }
  }

  const filteredEvents = await getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  })

  return {
    props: {
      events: filteredEvents,
      date: {
        year: filteredYear,
        month: filteredMonth,
      },
    },
  };
}

export default FilteredEventsPage;
