import Button from '@/components/ui/button';
import ErrorAlert from '@/components/ui/ErrorAlert';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { getFilteredEvents } from '../../../dummy-data';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/ResultsTitle';

function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;

  if(!filterData) {
    return <p className='center'>Loading...</p>
  }

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
    return <Fragment>
      <ErrorAlert>
        <p>Invalid filter. Please adjust your value</p>
      </ErrorAlert>
      <div className='center'>
        <Button link='/events'>Show all Events </Button>
      </div>
    </Fragment>
  }

  const filteredEvents = getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  })

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

  const date = new Date(filteredYear, filteredMonth - 1)


  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents}></EventList>
    </Fragment>
  );
}

export default FilteredEventsPage;
