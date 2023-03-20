import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Head from 'next/head';

import Button from '@/components/ui/button';
import ErrorAlert from '@/components/ui/ErrorAlert';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/ResultsTitle';

function FilteredEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState();

  const router = useRouter();
  const filterData = router.query.slug;

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(process.env.NEXT_PUBLIC_FIREBASE, fetcher);

  useEffect(()=> {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        })
      }

      setLoadedEvents(events);
    }
  }, [data]);

  if(!loadedEvents) {
    return <p className='center'>Loading...</p>
  }

  const filteredYear = +filterData[0];
  const filteredMonth = +filterData[1];

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);

    return eventDate.getFullYear() === filteredYear && eventDate.getMonth() === filteredMonth - 1;
  });

  if(
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth > 13 ||
    filteredMonth < 1 ||
    error
  ) {
    return <Fragment>
      <Head><title>Invalid filter</title></Head>
      <ErrorAlert>
        <p>Invalid filter. Please adjust your value</p>
      </ErrorAlert>
      <div className='center'>
        <Button link='/events'>Show all Events </Button>
      </div>
    </Fragment>
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return <Fragment>
      <Head><title>No events found</title></Head>
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
      <Head>
        <title>All events for { filteredMonth }/ { filteredYear }</title>
        <meta
          name='description'
          content={ `All events for ${ filteredMonth }/ ${ filteredYear }` }
        />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents}></EventList>
    </Fragment>
  );
}

export default FilteredEventsPage;
