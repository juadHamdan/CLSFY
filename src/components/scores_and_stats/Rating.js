import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

const MyRating = ({value}) => {
    return(
        <> 
            <Rating sx={{verticalAlign: 'text-bottom'}} size='large' name="half-rating-read" value={value} precision={0.5} readOnly />
        </>
    )
}

export default MyRating;