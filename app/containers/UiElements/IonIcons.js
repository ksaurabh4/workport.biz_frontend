import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import dataIcon from 'dan-api/icons/ion-icon';
import { PapperBlock } from 'dan-components';
import DetailIonIcon from './IconGallery/DetailIonIcon';
import SearchIcons from './IconGallery/SearchIcons';

const styles = theme => ({
  hide: {
    display: 'none'
  },
  iconsList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
    overflow: 'auto',
    maxHeight: 1000,
    position: 'relative'
  },
  iconWrap: {
    position: 'relative',
    width: 120,
    margin: 20,
    [theme.breakpoints.down('xs')]: {
      margin: 10,
    },
    textAlign: 'center'
  },
  btn: {
    display: 'block',
    textAlign: 'center',
    margin: '0 auto',
    '& i': {
      width: 36,
      height: 36,
      lineHeight: '36px'
    }
  },
  icon: {
    fontSize: 48,
  },
  preloader: {
    width: '100%'
  },
});

function IonIcons(props) {
  const [loading, setLoading] = useState(true);
  const [openDetail, setOpenDetail] = useState(false);
  const [iconName, setIconName] = useState('');
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleOpenDetail = name => {
    setOpenDetail(true);
    setIconName(name);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  const handleSearch = (event) => {
    event.persist();
    // Show result base on keyword
    setFilterText(event.target.value.toLowerCase());
  };

  const title = brand.name + ' - UI Elements';
  const description = brand.desc;
  const { classes } = props;
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
      <PapperBlock title="Ion Icons" icon="ion-ios-ionic" desc="Ion icons a beautifully crafted open source icons. Premium designed icons for use in web.">
        <div>
          {loading && <LinearProgress color="secondary" className={classes.preloader} />}
          <SearchIcons filterText={filterText} handleSearch={(event) => handleSearch(event)} />
          <div className={classes.iconsList}>
            {dataIcon.map((raw, index) => {
              if (raw.toLowerCase().indexOf(filterText) === -1) {
                return false;
              }
              return (
                <div className={classes.iconWrap} key={index.toString()}>
                  <IconButton title="Click to see detail" onClick={() => handleOpenDetail(raw)} className={classes.btn}>
                    <i className={raw} />
                  </IconButton>
                  <Typography gutterBottom noWrap>{raw}</Typography>
                </div>
              );
            })}
            <DetailIonIcon closeDetail={() => handleCloseDetail()} isOpenDetail={openDetail} iconName={iconName} />
          </div>
        </div>
      </PapperBlock>
    </div>
  );
}

IonIcons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IonIcons);
