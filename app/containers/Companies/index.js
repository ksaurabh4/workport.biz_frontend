import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import CompaniesTable from './CompaniesTable';

function Employees() {
  const title = brand.name + ' - Comapanies Page';
  const description = brand.desc;
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
      <PapperBlock title="Companies Details" desc="View, create & edit your companies from here!">
        <CompaniesTable />
      </PapperBlock>
    </div>
  );
}

export default Employees;
