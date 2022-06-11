import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import imgData from 'dan-api/images/imgData';
import PapperBlock from '../PapperBlock/PapperBlock';
import styles from './widget-jss';

function AlbumWidget(props) {
  const { classes } = props;
  return (
    <PapperBlock noMargin title="My Albums (4)" whiteBg desc="">
      <div className={classes.albumRoot}>
        <ImageList rowHeight={180} className={classes.gridList}>
          {
            imgData.map((tile, index) => {
              if (index >= 4) {
                return false;
              }
              return (
                <ImageListItem key={index.toString()}>
                  <img src={tile.img} className={classes.img} alt={tile.title} />
                  <ImageListItemBar
                    title={tile.title}
                    subtitle={(
                      <span>
                        by:&nbsp;
                        {tile.author}
                      </span>
                    )}
                    actionIcon={(
                      <IconButton className={classes.icon}>
                        <InfoIcon />
                      </IconButton>
                    )}
                  />
                </ImageListItem>
              );
            })
          }
        </ImageList>
      </div>
    </PapperBlock>
  );
}

AlbumWidget.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlbumWidget);
