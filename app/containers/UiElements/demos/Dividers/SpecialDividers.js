import React, { Fragment } from 'react';
import Type from 'dan-styles/Typography.scss';
import Typography from '@material-ui/core/Typography';

import {
  FlairedEdgesDivider,
  ContentDivider,
} from '../../../../components/Divider';

function CommonDivider() {
  return (
    <Fragment>
      <Typography variant="button" className={Type.textCenter}>Flaired Edges Divider</Typography>
      <FlairedEdgesDivider />
      <Typography variant="button" className={Type.textCenter}>Content Text Divider</Typography>
      <ContentDivider content="OR" />
    </Fragment>
  );
}

export default CommonDivider;
