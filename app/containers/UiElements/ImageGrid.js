import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { SourceReader, PapperBlock } from 'dan-components';
import {
  ImageGridList,
  TitlebarImageList,
  AdvancedImageList,
  SingleLineImageList
} from './demos';

function ImageGrid() {
  const title = brand.name + ' - UI Elements';
  const description = brand.desc;
  const docSrc = 'containers/UiElements/demos/ImageGrid/';
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
      <PapperBlock title="Image-only Grid list" icon="ion-ios-grid" desc="A simple example of a scrollable image ImageList">
        <div>
          <ImageGridList />
          <SourceReader componentName={docSrc + 'ImageImageList.js'} />
        </div>
      </PapperBlock>
      <PapperBlock title="Grid list with titlebars" icon="ion-ios-keypad-outline" desc="This example demonstrates the use of the ImageListItemBar to add an overlay to each ImageListItem.">
        <div>
          <TitlebarImageList />
          <SourceReader componentName={docSrc + 'TitlebarImageList.js'} />
        </div>
      </PapperBlock>
      <PapperBlock title="Advanced Grid list" icon="ion-ios-apps-outline" desc="This example demonstrates featured tiles, using the rows and cols props to adjust the size of the tile, and the padding prop to adjust the spacing.">
        <div>
          <AdvancedImageList />
          <SourceReader componentName={docSrc + 'AdvancedImageList.js'} />
        </div>
      </PapperBlock>
      <PapperBlock title="Single line Grid list" icon="ion-ios-barcode" desc="This example demonstrates a horizontal scrollable single-line grid list of images.">
        <div>
          <SingleLineImageList />
          <SourceReader componentName={docSrc + 'SingleLineImageList.js'} />
        </div>
      </PapperBlock>
    </div>
  );
}

export default ImageGrid;
