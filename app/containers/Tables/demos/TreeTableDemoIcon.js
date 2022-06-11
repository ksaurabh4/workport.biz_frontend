import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { TreeTable } from 'dan-components';
import openAction from '../actions/treeTbActions';
import data from './dataTreeTable.js';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
});

function TreeTableDemoIcon(props) {
  const { classes } = props;

  // Redux State
  const branch = 'treeTablePM';
  const treeOpen = useSelector(state => state.treeTablePM.treeOpen);
  const arrowMore = useSelector(state => state.treeTablePM.arrowMore);

  // Dispatcher
  const toggleTree = useDispatch();

  return (
    <div>
      <div className={classes.root}>
        <TreeTable
          treeOpen={treeOpen}
          toggleTree={(id, payload) => toggleTree(openAction(id, payload, branch))}
          arrowMore={arrowMore}
          dataTable={data}
          branch={branch}
          expandIcon="ion-ios-add-circle-outline"
          collapseIcon="ion-ios-remove-circle-outline"
        />
      </div>
    </div>
  );
}

TreeTableDemoIcon.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TreeTableDemoIcon);
