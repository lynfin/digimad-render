import React from 'react';
import { Link } from 'react-router-dom';
import { parseISO, format } from 'date-fns';
import { TextWrapper } from '../../globalStyles';
import {
  ImageWrapper,
  CarouselImage,
  CardButton,
  ButtonWrapper,
} from './CarouselCardStyles';

function CarouselCard({ el, index, onDestinationSelected, cardStyle }) {
  function handleClick() {
    onDestinationSelected(el.id);
  }
  function formatValue(value, valueFormat) {
    switch (valueFormat) {
      case 'float':
        return parseFloat(value).toFixed(2);
      case 'date':
        return format(parseISO(value), 'MM/dd/yyyy');
      default:
        return value;
    }
  }
  let summary1 = formatValue(el[cardStyle.summary1], cardStyle.summary1Type);
  summary1 += cardStyle.summary1Units ? ' ' + cardStyle.summary1Units : '';

  let summary2 = formatValue(el[cardStyle.summary2], cardStyle.summary2Type);
  summary2 += cardStyle.summary2Units ? ' ' + cardStyle.summary2Units : '';

  // come back and interpret cardStyle with destination data for summary lines
  return (
    <ImageWrapper key={index}>
      <CarouselImage src={el.image} />
      <TextWrapper size='1.1rem' margin='0.4rem 0 0' weight='bold'>
        {el.name}
      </TextWrapper>
      <TextWrapper size='0.9rem' margin='0.7rem' color='#4f4f4f'>
        {summary1}
      </TextWrapper>
      <TextWrapper size='0.9rem' margin='0.7rem' color='#4f4f4f'>
        {summary2}
      </TextWrapper>
      <TextWrapper size='0.9rem' margin='0.7rem' color='#4f4f4f'>
        {`${el.address.city}, ${el.address.country}`}
      </TextWrapper>
      <ButtonWrapper>
        <Link to={{ pathname: 'destination', state: { el } }}>
          {/* <CardButton> */}
          {/* <CardButton onClick={onDestinationSelected(el.id)}> */}
          <CardButton onClick={handleClick}>Details</CardButton>
        </Link>
      </ButtonWrapper>
      <ButtonWrapper>
        <Link to={{ pathname: 'speedtest', state: { el } }}>
          {/* <CardButton> */}
          {/* <CardButton onClick={onDestinationSelected(el.id)}> */}
          <CardButton onClick={handleClick}>Record Test</CardButton>
        </Link>
      </ButtonWrapper>
    </ImageWrapper>
  );
}

export default CarouselCard;
