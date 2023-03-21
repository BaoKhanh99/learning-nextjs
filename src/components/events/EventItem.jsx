import Image from 'next/image';

import classes from './event-item.module.css';
import AddressIcon from '../icons/AddressIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import DateIcon from '../icons/DateIcon';
import Button from '../ui/button';

function EventItem(props) {
  const { title, image, date, location, id } = props;
  const readableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedAddress = location.replace(', ', '\n');
  const exploreLink = `/events/${id}`;

  return <li className={classes.item}>
    <Image src={ '/' + image } width='400' height='400' alt={title} />
    <div className={classes.content}>
      <div className={classes.summary}>
        <h2>{title}</h2>
        <div className={classes.date}>
          <DateIcon/>
          <time>{readableDate}</time>
        </div>
        <div className={classes.address}>
          <AddressIcon/>
          <address>{formattedAddress}</address>
        </div>
      </div>
      <div className={classes.actions}>
        <Button link={exploreLink}>
          Explore Event
          <span className={classes.icon}>
            <ArrowRightIcon/>
          </span>
        </Button>
      </div>
    </div>
  </li>
}

export default EventItem;
