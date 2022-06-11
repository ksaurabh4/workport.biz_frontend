import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { SourceReader, PapperBlock } from 'dan-components';
import {
  GridLayout,
  FullWidth,
  Centered,
  Interactive,
  AutoLayout,
  Limitation
} from './demos';

const styles = ({
  root: {
    flexGrow: 1,
  }
});

function GridPage(props) {
  const { classes } = props;
  const title = brand.name + ' - Layout';
  const description = brand.desc;
  const docSrc = 'containers/Layouts/demos/';
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
      <PapperBlock title="Grid Spacing" icon="ion-ios-apps-outline" desc="The responsive grid focuses on consistent spacing widths, rather than column width. Material design margins and columns follow an 8dp square baseline grid. Spacing can be 8, 16, 24, or 40 pixel wide.">
        <div>
          <GridLayout />
          <SourceReader componentName={docSrc + 'GridLayout.js'} />
        </div>
      </PapperBlock>

      <PapperBlock title="Full-width" icon="ion-ios-apps-outline" desc="Full-width grids: use fluid columns and breakpoints to determine when a layout needs to change.">
        <div>
          <FullWidth />
          <SourceReader componentName={docSrc + 'FullWidth.js'} />
        </div>
      </PapperBlock>

      <PapperBlock title="Centered Grid" icon="ion-ios-apps-outline" desc="Centered grids: use fixed columns and re-flow the layout when all columns (plus a defined margin) no longer fit on the screen.">
        <div>
          <Centered />
          <SourceReader componentName={docSrc + 'Centered.js'} />
        </div>
      </PapperBlock>

      <PapperBlock title="Interactive" icon="ion-ios-apps-outline" desc="Below is an interactive demo that lets you explore the visual results of the different settings:">
        <div>
          <Interactive />
          <SourceReader componentName={docSrc + 'Interactive.js'} />
        </div>
      </PapperBlock>

      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <PapperBlock title="Auto Layout" icon="ion-ios-apps-outline" desc="The Auto-layout makes the items equitably share the available space. That also means you can set the width of one item and the others will automatically resize around it.">
              <div>
                <AutoLayout />
                <SourceReader componentName={docSrc + 'AutoLayout.js'} />
              </div>
            </PapperBlock>
          </Grid>
          <Grid item md={6} xs={12}>
            <PapperBlock title="Limitations" icon="ion-ios-apps-outline" overflowX desc="There is one limitation with the negative margin we use to implement the spacing between items.">
              <div>
                <Limitation />
                <SourceReader componentName={docSrc + 'Limitation.js'} />
              </div>
            </PapperBlock>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

GridPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GridPage);
