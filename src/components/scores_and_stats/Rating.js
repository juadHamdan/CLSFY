import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

const MyRating = ({value}) => {
    return(
        <>
            <Typography component="legend">Overall:</Typography>
            <Rating name="half-rating-read" defaultValue={value} precision={0.5} readOnly />
        </>
    )
}

export default MyRating;