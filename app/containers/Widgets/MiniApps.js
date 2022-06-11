import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { SourceReader, PapperBlock } from 'dan-components';
import {
  TodoListMini,
  ContactsMini,
  CalculatorMini,
  TradeMini
} from './demos';

function MiniApps() {
  const title = brand.name + ' - Widgets';
  const description = brand.desc;
  const docSrc = 'containers/Widgets/demos/';
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
      <PapperBlock title="Calculator" whiteBg icon="ion-ios-calculator-outline" desc="Calculator widget will help you as much as a physycal calculator">
        <div>
          <CalculatorMini />
          <SourceReader componentName={docSrc + 'CalculatorMini.js'} />
        </div>
      </PapperBlock>
      <PapperBlock title="Contact" whiteBg icon="ion-ios-contacts-outline" desc="A shortcut way to call and read messages from your contact">
        <div>
          <ContactsMini />
          <SourceReader componentName={docSrc + 'ContactsMini.js'} />
        </div>
      </PapperBlock>
      <PapperBlock title="To Do List" whiteBg icon="ion-ios-checkbox-outline" desc="Never forget what you want to do, all those things is here. Just a single click to mark it as done">
        <div>
          <TodoListMini />
          <SourceReader componentName={docSrc + 'TodoListMini.js'} />
        </div>
      </PapperBlock>
      <PapperBlock title="Trading Assets" icon="ion-ios-swap" desc="Make buy and sale transaction faster and simpler">
        <div>
          <TradeMini />
          <SourceReader componentName={docSrc + 'TradeMini.js'} />
        </div>
      </PapperBlock>
    </div>
  );
}

export default MiniApps;
