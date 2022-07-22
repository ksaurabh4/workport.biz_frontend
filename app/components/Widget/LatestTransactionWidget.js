import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import styles from 'dan-components/Tables/tableStyle-jss';
import messageStyles from 'dan-styles/Messages.scss';
import moment from 'moment';
import PapperBlock from '../PapperBlock/PapperBlock';

// let id = 0;
// function createData(time, market, price, total, get, status) {
//   id += 1;
//   return {
//     id,
//     time,
//     market,
//     price,
//     total,
//     get,
//     status,
//   };
// }

// const data = [
//   createData('12 Sep 2018', 'BTC', 7324, 300, 0.053, 'Pending'),
//   createData('1 Sep 2018', 'LTC', 1.2, 10, 12, 'Cancelled'),
//   createData('27 Aug 2018', 'XLM', 0.78, 15, 14.3, 'Complete'),
//   createData('11 Aug 201', 'ADA', 29.5, 12, 1.56, 'Pending'),
//   createData('11 Aug 2018', 'BTC', 7124, 12, 1.77, 'Complete'),
// ];

function LatestTransactionWidget(props) {
  const { classes, data } = props;
  const getStatus = status => {
    switch (status) {
      case 'pro':
      case 'standard':
      case 'enterprise':
        return messageStyles.bgSuccess;
      // case 'Pending': return messageStyles.bgWarning;
      case 'trial': return messageStyles.bgWarning;
      // case 'Info': return messageStyles.bgInfo;
      case 'active': return messageStyles.bgInfo;
      case 'deactive': return messageStyles.bgError;
      case 'Complete': return messageStyles.bgSuccess;
      default: return messageStyles.bgDefault;
    }
  };
  return (
    <PapperBlock whiteBg noMargin title="Companies Overview" icon="ion-ios-time-outline" desc="">
      <div className={classes.rootTable}>
        <Table padding="none" className={classes.tableSmall}>
          <TableHead>
            <TableRow>
              <TableCell padding="normal">Company</TableCell>
              <TableCell padding="normal">Added</TableCell>
              <TableCell padding="normal">Users</TableCell>
              <TableCell padding="normal">Status</TableCell>
              <TableCell padding="normal">Active Plan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map(n => ([
              <TableRow key={n.compId}>
                <TableCell padding="normal">
                  {n.compName.toUpperCase()}
                </TableCell>
                <TableCell padding="normal">
                  {moment(n.compAddedDate).format('DD-MM-YYYY')}
                </TableCell>
                <TableCell padding="normal">
                  {/* <Typography variant="subtitle1">{n.compName}</Typography> */}
                  <Typography variant="caption">
                    {n.userCount}
                  </Typography>
                </TableCell>
                {/* <TableCell align="right" padding="normal">
                  <Typography variant="subtitle1">
                    {n.subsIsActive}
                  </Typography>
                  <Typography variant="caption">
                    {n.get}
                    &nbsp;
                    {n.market}
                  </Typography>
                </TableCell> */}
                <TableCell padding="none">
                  <Chip label={n.subsIsActive === 1 ? 'Active'.toUpperCase() : 'De-activated'.toUpperCase()} className={classNames(classes.tableChip, getStatus(n.subsIsActive === 1 ? 'active' : 'deactive'))} />
                </TableCell>
                <TableCell padding="none">
                  <Chip label={n.compPlanName.toUpperCase()} className={classNames(classes.tableChip, getStatus(n.compPlanName))} />
                </TableCell>
              </TableRow>
            ]))}
          </TableBody>
        </Table>
      </div>
    </PapperBlock>
  );
}

LatestTransactionWidget.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LatestTransactionWidget);
