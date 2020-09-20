import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  },
  progress: {
    position: 'relative',
    top: '50%',
    left: '50%'
  }
}));

export default function ShopCard(props) {
  const classes = useStyles();
  const [shop] = useState(props.shop);
  const [review, setReview] = useState([]);
  console.log(shop.rating, shop);
  const [loadingReview, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch(`/api/review/${shop.id}`)
      .then(response => response.json())
      .then(review => {
        setReview(review)
        setLoading(false);
      });
  }, [shop.id])
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={shop.image_url}
        title={shop.name}
      />
      <CardContent className={classes.content}>
        <CardHeader
          className={classes.header}
          title={shop.name}
          subheader={shop.location.display_address.join(', ')}
        />
        <Rating
          className={classes.rating}
          value={shop.rating} readOnly
          precision={0.5}
          icon={<FavoriteIcon fontSize="inherit" />}
        />
        {loadingReview ? <div><CircularProgress className={classes.progress} color="secondary"/></div> : <div>
          <Typography variant="body2" color="textSecondary" component="p">
            {review.text}
          </Typography>
          <Typography variant="body1" align="right" color="textPrimary" component="p">
            By: {review?.user?.name}
          </Typography>
        </div>}
      </CardContent>
    </Card>
  );
}
