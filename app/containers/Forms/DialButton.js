import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { SourceReader, PapperBlock } from 'dan-components';
import { DialSimple, DialCustomClose, DialTooltip } from './demos';

const styles = ({
  root: {
    flexGrow: 1,
  }
});

function DialButton() {
  const title = brand.name + ' - Form';
  const description = brand.desc;
  const docSrc = 'containers/Forms/demos/';
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
      <PapperBlock title="Simple Speed Dial Button" icon="ion-ios-add-circle-outline" desc="The floating action button can display related actions.">
        <div>
          <DialSimple />
          <SourceReader componentName={docSrc + 'DialSimple.js'} />
        </div>
      </PapperBlock>
      <PapperBlock title="Custom close icon" icon="ion-ios-add-circle-outline" desc="You can provide an alternate icon for the closed and open states using the icon and openIcon props of the SpeedDialIcon component.">
        <div>
          <DialCustomClose />
          <SourceReader componentName={docSrc + 'DialCustomClose.js'} />
        </div>
      </PapperBlock>
      <PapperBlock title="Persistent action tooltips" icon="ion-ios-add-circle-outline" desc="The SpeedDialActions tooltips can be be displayed persistently so that users don't have to long-press in order to see the tooltip on touch devices.">
        <div>
          <DialTooltip />
          <SourceReader componentName={docSrc + 'DialTooltip.js'} />
        </div>
      </PapperBlock>
    </div>
  );
}

export default withStyles(styles)(DialButton);
