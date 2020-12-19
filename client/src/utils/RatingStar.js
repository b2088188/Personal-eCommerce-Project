import React, { Fragment } from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const RatingStar = ({
    average,
    size = 'large'
}) => {

    return (
        <Fragment>      
     {average>=1 ? <StarIcon  className = "ratingstar" fontSize = {size} /> : <StarBorderIcon className = "ratingstar" fontSize = {size} />}
     {average>=2 ? <StarIcon className = "ratingstar" fontSize = {size}  /> : average>=1.5 ? <StarHalfIcon className = "ratingstar" fontSize = {size} /> : <StarBorderIcon className = "ratingstar" fontSize = {size} />}
     {average>=3 ? <StarIcon className = "ratingstar" fontSize = {size} /> : average>=2.5 ? <StarHalfIcon className = "ratingstar" fontSize = {size} /> : <StarBorderIcon className = "ratingstar" fontSize = {size} />}
     {average>=4 ? <StarIcon className = "ratingstar" fontSize = {size} /> : average>=3.5 ? <StarHalfIcon className = "ratingstar" fontSize = {size} /> : <StarBorderIcon className = "ratingstar" fontSize = {size} />}
     {average>=5 ? <StarIcon className = "ratingstar" fontSize = {size} /> : average>=4.5 ? <StarHalfIcon className = "ratingstar" fontSize = {size} /> : <StarBorderIcon className = "ratingstar" fontSize = {size} />}
    </Fragment>
    )
}

export default RatingStar;