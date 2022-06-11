import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  listItem: {
    marginTop: theme.spacing(1),
  },
});

function ListItem(props) {
  const { classes, children } = props;
  return (
    <li className={classes.listItem}>
      {children}
    </li>
  );
}

ListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

const ListItemStyled = withStyles(styles)(ListItem);

const renderers = {
  h1: props => <Typography {...props} gutterBottom variant="h4" />,
  h2: props => <Typography {...props} gutterBottom variant="subtitle1" />,
  h3: props => <Typography {...props} gutterBottom variant="h6" />,
  h4: props => <Typography {...props} gutterBottom variant="caption" paragraph />,
  h5: props => <Typography {...props} gutterBottom />,
  h6: props => <Typography {...props} gutterBottom />,
  li: ({
    tight, // eslint-disable-line
    ordered, // eslint-disable-line
    ...props
  }) => (
    <ListItemStyled>
      <Typography component="span" {...props} />
    </ListItemStyled>
  ),
  p: props => <Typography {...props} paragraph />,
};

export default function Markdown(props) {
  return <ReactMarkdown components={renderers} {...props} />;
}
