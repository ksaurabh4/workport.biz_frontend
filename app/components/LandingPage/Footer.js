import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import logo from 'dan-images/logo.svg';
import brand from 'dan-api/dummy/brand';
import link from 'dan-api/ui/link';

import styles from './landingStyle-jss';

let counter = 0;
function createData(name, url) {
  counter += 1;
  return {
    id: counter,
    name,
    url,
  };
}

function Decoration(props) {
  const { classes } = props;
  return (
    <div>
      <svg fill="#fff" className={classes.footerDecoration}>
        <use xlinkHref="/images/decoration/petal5.svg#Petal-Bottom" />
      </svg>
    </div>
  );
}

Decoration.propTypes = {
  classes: PropTypes.object.isRequired,
};

const DecorationStyled = withStyles(styles)(Decoration);

function Footer(props) {
  const { classes } = props;
  const menuList = [
    createData('feature', '#feature'),
    createData('showcase', '#showcase'),
    // createData('terstimonials', '#testi'),
    // createData('technology', '#tech'),
    createData('about', '#about'),
    createData('pricing', '#pricing'),
    // createData('contact', '#contact'),
  ];

  return (
    <footer className={classes.footer}>
      <DecorationStyled />
      <div className={classes.container}>
        <div className={classes.spaceContainer}>
          <div className={classes.brand}>
            <img src={logo} alt={brand.name} />
            {brand.name}
          </div>
          <nav>
            <ul>
              {menuList.map(item => (
                <li key={item.id.toString()}>
                  <Button size="small" href={item.url}>{item.name}</Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className={classes.copyright}>
        <div className={classes.container}>
          <p>&copy; 2022 Workport Biz. All Right Reserved </p>
          <p>For Enquire <strong>mailworkport@gmail.com</strong></p>
          <IconButton color="primary" className={classes.button} href={link.whatsapp} target="_blank"><p style={{ marginRight: '5px' }}>Contact us on WhatsApp</p><i className="ion-logo-whatsapp" /></IconButton>
        </div>

      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
