import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { formatDate } from '../../utils';

const useStyles = makeStyles({
  desktopRoot: {
    width: '50vw',
    marginTop: 10,
    marginBottom: 10,
  },
  mobileRoot: {
    width: '80vw',
    marginTop: 10,
    marginBottom: 10
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  action: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default function BlogCard(props) {

  const classes = useStyles();
  const { width } = useWindowDimensions();

  return (
    <Card className={width > 700 ? classes.desktopRoot : classes.mobileRoot}>
      <CardContent>
        <Typography variant="h4" component="h2">
          {props.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.author}
        </Typography>
        <Typography variant="body2" component="p">
          {formatDate(props.creationTime)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" className={classes.action}>Learn More</Button>
      </CardActions>
    </Card>
  );
}