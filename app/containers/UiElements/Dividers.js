import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { SourceReader, PapperBlock } from 'dan-components';
import { CommonDividers, SpecialDividers } from './demos';

function Dividers() {
  const title = brand.name + ' - UI Elements';
  const description = brand.desc;
  const docSrc = 'containers/UiElements/demos/Dividers/';
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
      <PapperBlock title="Common Dividers" icon="ion-md-remove" desc="Some variant divider style base on hr tag">
        <div>
          <CommonDividers />
          <SourceReader componentName={docSrc + 'CommonDividers.js'} />
        </div>
      </PapperBlock>
      <PapperBlock title="Special Dividers" icon="ion-ios-more-outline" desc="Sometime the divider is more than a line. With this You can add text or decoration at the edges">
        <div>
          <SpecialDividers />
          <SourceReader componentName={docSrc + 'SpecialDividers.js'} />
        </div>
      </PapperBlock>
    </div>
  );
}

export default Dividers;
