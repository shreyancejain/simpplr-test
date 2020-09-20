import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '850px',
    padding: '20px',
    margin: '20px',
    display: 'flex'
  },
  media: {
    height: '200px',
    width: '200px'
  },
  content: {
    flex: 1
  },
  header: {
    padding: 0,
    'margin-bottom': '5px'
  },
  rating: {
    'margin-bottom': '10px',
    color: 'red'
  }
}));

export default function ShopCard() {
  const classes = useStyles();
  const value = 4;
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="https://s3-media4.fl.yelpcdn.com/bphoto/AjZvhwzPldaryKynBQOzyA/o.jpg"
        title="test"
      />
      <CardContent className={classes.content}>
        <CardHeader
          className={classes.header}
          title="test"
          subheader="address"
        />
        <Rating 
          className={classes.rating}
          value={value} readOnly
          icon={<FavoriteIcon fontSize="inherit" />}
        />

        <Typography variant="body2" color="textSecondary" component="p">
          test comments
        </Typography>
      </CardContent>
    </Card>
  );
}
