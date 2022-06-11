import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { SourceReader, PapperBlock } from 'dan-components';
import {
  AutoSuggest,
  TagSuggestions,
  SelectSuggestions,
  SelectSuggestionTags,
  HighlightSuggest
} from './demos';

const styles = ({
  root: {
    flexGrow: 1,
  }
});

function Autocomplete(props) {
  const { classes } = props;
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
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={12}>
            <PapperBlock title="Highlight Suggestion" icon="ion-ios-flash-outline" desc="In the following example, we demonstrate how to use autocomplete. It's also using autosuggest-highlight for the highlighting logic.">
              <div>
                <HighlightSuggest />
                <SourceReader componentName={docSrc + 'HighlightSuggest.js'} />
              </div>
            </PapperBlock>
          </Grid>
          <Grid item md={6}>
            <PapperBlock title="Auto Suggestion" icon="ion-ios-done-all" desc="The autocomplete is a normal text input enhanced by a panel of suggested options.">
              <div>
                <AutoSuggest />
                <SourceReader componentName={docSrc + 'AutoSuggest.js'} />
              </div>
            </PapperBlock>
          </Grid>
          <Grid item md={6}>
            <PapperBlock title="Tag Suggestion" icon="ion-ios-pricetags-outline" desc="In the following example, we demonstrate with tag input.">
              <div>
                <TagSuggestions />
                <SourceReader componentName={docSrc + 'TagSuggestions.js'} />
              </div>
            </PapperBlock>
          </Grid>
          <Grid item md={6}>
            <PapperBlock title="Select Suggestion" icon="ion-ios-flash-outline" desc="In the following example, we demonstrate how to use autocomplete with select.">
              <div>
                <SelectSuggestions />
                <SourceReader componentName={docSrc + 'SelectSuggestions.js'} />
              </div>
            </PapperBlock>
          </Grid>
          <Grid item md={6}>
            <PapperBlock title="Select Tag Suggestion" icon="ion-ios-pricetags-outline" desc="In the following example, we demonstrate how to combine tag input and autocomplete.">
              <div>
                <SelectSuggestionTags />
                <SourceReader componentName={docSrc + 'SelectSuggestionTags.js'} />
              </div>
            </PapperBlock>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

Autocomplete.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Autocomplete);
