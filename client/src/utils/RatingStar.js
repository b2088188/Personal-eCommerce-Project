import React, {Fragment} from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const RatingStar = ({
	average
}) => {

   return (
   	<Fragment>   		
     {average>=1 ? <StarIcon className = "product-view__ratingstar" /> : <StarBorderIcon className = "product-view__ratingstar" />}
     {average>=2 ? <StarIcon className = "product-view__ratingstar" /> : average>=1.5 ? <StarHalfIcon className = "product-view__ratingstar" /> : <StarBorderIcon className = "product-view__ratingstar" />}
     {average>=3 ? <StarIcon className = "product-view__ratingstar" /> : average>=2.5 ? <StarHalfIcon className = "product-view__ratingstar" /> : <StarBorderIcon className = "product-view__ratingstar" />}
     {average>=4 ? <StarIcon className = "product-view__ratingstar" /> : average>=3.5 ? <StarHalfIcon className = "product-view__ratingstar" /> : <StarBorderIcon className = "product-view__ratingstar" />}
     {average>=5 ? <StarIcon className = "product-view__ratingstar" /> : average>=4.5 ? <StarHalfIcon className = "product-view__ratingstar" /> : <StarBorderIcon className = "product-view__ratingstar" />}
   	</Fragment>
   	)
}

export default RatingStar;
