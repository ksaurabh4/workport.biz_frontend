import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { SourceReader, PapperBlock } from 'dan-components';
import { ReduxFormDemo } from './demos';

const styles = ({
  root: {
    flexGrow: 1,
  }
});

function ReduxForm() {
  const [valueForm, setValueForm] = useState();
  const showResult = (values) => {
    setTimeout(() => {
      setValueForm(values);
    }, 500); // simulate server latency
  };

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
      <PapperBlock title="Redux Form" icon="ion-ios-list-box-outline" desc="This is a simple demonstration of how to connect all the standard material-ui form elements to redux-form.">
        <div>
          <ReduxFormDemo onSubmit={(values) => showResult(values)} />
          {valueForm && (
            <p>
              You submitted:
              <br />
              { JSON.stringify(valueForm) }
            </p>
          )}
          <SourceReader componentName={docSrc + 'ReduxFormDemo.js'} />
        </div>
      </PapperBlock>
    </div>
  );
}

export default withStyles(styles)(ReduxForm);
