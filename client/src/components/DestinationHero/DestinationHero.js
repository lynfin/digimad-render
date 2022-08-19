import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Ratings from 'react-ratings-declarative';
import { Container, MainHeading } from '../../globalStyles';
import {
  HeroDiv,
  HeroSection,
  HeroText,
  ImageWrapper,
  HeroImage,
  ButtonWrapper,
} from './DestinationHeroStyles';

function DestinationHero({ destinationDetails }) {
  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener, noreferrer');
  };
  let history = useHistory();

  return (
    <HeroSection>
      <HeroDiv />
      <ImageWrapper>
        <HeroImage src={destinationDetails.image} />
      </ImageWrapper>
      <Container>
        <MainHeading>{destinationDetails.name}</MainHeading>
        {/* <Ratings
          rating={destinationDetails.techRating}
          widgetDimensions='40px'
          widgetSpacings='15px'
        >
          <Ratings.Widget widgetRatedColor='yellow' />
          <Ratings.Widget widgetRatedColor='yellow' />
          <Ratings.Widget widgetRatedColor='yellow' />
          <Ratings.Widget widgetRatedColor='yellow' />
          <Ratings.Widget widgetRatedColor='yellow' />
        </Ratings> */}
        <ButtonWrapper onClick={() => openInNewTab(destinationDetails.website)}>
          <HeroText>Visit their website</HeroText>
        </ButtonWrapper>
        <ButtonWrapper onClick={() => history.push('/speedtest')}>
          <HeroText>Record your speedtest</HeroText>
        </ButtonWrapper>
        <HeroText>
          ...more details to be displayed - rating, address, phone, etc
        </HeroText>
      </Container>
    </HeroSection>
  );
}

export default DestinationHero;
