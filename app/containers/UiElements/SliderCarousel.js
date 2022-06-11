import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { SourceReader, PapperBlock } from 'dan-components';
import {
  SingleCarousel,
  MultipleCarousel,
  AutoplayCarousel,
  ThumbnailCarousel,
  VerticalCarousel,
  CustomCarousel,
  AnimatedSlider
} from './demos';

function SliderCarousel() {
  const title = brand.name + ' - UI Elements';
  const description = brand.desc;
  const docSrc = 'containers/UiElements/demos/SliderCaraousel/';
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock title="Animated Slider" icon="ion-ios-photos-outline" desc="A Slider/Carousel component for React supporting custom css animations.">
        <div>
          <AnimatedSlider />
          <SourceReader componentName={docSrc + 'AnimatedSlider.js'} />
        </div>
      </PapperBlock>
      <PapperBlock title="Simple Slider" icon="ion-ios-image-outline" desc="React slick is a carousel component built with React. It is a react port of  slick carousel">
        <div>
          <SingleCarousel />
          <SourceReader componentName={docSrc + 'SingleCarousel.js'} />
        </div>
      </PapperBlock>
      <PapperBlock title="Carousel" icon="ion-ios-images-outline" desc="">
        <div>
          <MultipleCarousel />
          <SourceReader componentName={docSrc + 'MultipleCarousel.js'} />
        </div>
      </PapperBlock>
      <PapperBlock title="Autoplay Carousel" icon="ion-ios-play-outline" desc="">
        <div>
          <AutoplayCarousel />
          <SourceReader componentName={docSrc + 'AutoplayCarousel.js'} />
        </div>
      </PapperBlock>
      <PapperBlock title="Carousel with Thumbnail Pagination" icon="ion-ios-images" desc="">
        <div>
          <ThumbnailCarousel />
          <SourceReader componentName={docSrc + 'ThumbnailCarousel.js'} />
        </div>
      </PapperBlock>
      <PapperBlock title="Vertical Carousel" icon="ion-ios-download-outline" desc="">
        <div>
          <VerticalCarousel />
          <SourceReader componentName={docSrc + 'VerticalCarousel.js'} />
        </div>
      </PapperBlock>
      <PapperBlock title="Custom Navigation Carousel" icon="ion-ios-code-working" desc="">
        <div>
          <CustomCarousel />
          <SourceReader componentName={docSrc + 'CustomCarousel.js'} />
        </div>
      </PapperBlock>
    </div>
  );
}

export default SliderCarousel;
