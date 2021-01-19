import React, { Fragment } from 'react';
import { Icon } from '../components';
import { Star, StarHalf, StarBorder } from '@material-ui/icons';

const RatingStar = ({ average, size = 'large' }) => {
   return (
      <Fragment>
         {average >= 1 ? (
            <Icon as={Star} modifiers='tertiary' fontSize={size} />
         ) : (
            <Icon as={StarBorder} modifiers='tertiary' fontSize={size} />
         )}
         {average >= 2 ? (
            <Icon as={Star} modifiers='tertiary' fontSize={size} />
         ) : average >= 1.5 ? (
            <Icon as={StarHalf} modifiers='tertiary' fontSize={size} />
         ) : (
            <Icon as={StarBorder} modifiers='tertiary' fontSize={size} />
         )}
         {average >= 3 ? (
            <Icon as={Star} modifiers='tertiary' fontSize={size} />
         ) : average >= 2.5 ? (
            <Icon as={StarHalf} modifiers='tertiary' fontSize={size} />
         ) : (
            <Icon as={StarBorder} modifiers='tertiary' fontSize={size} />
         )}
         {average >= 4 ? (
            <Icon as={Star} modifiers='tertiary' fontSize={size} />
         ) : average >= 3.5 ? (
            <Icon as={StarHalf} modifiers='tertiary' fontSize={size} />
         ) : (
            <Icon as={StarBorder} modifiers='tertiary' fontSize={size} />
         )}
         {average >= 5 ? (
            <Icon as={Star} modifiers='tertiary' fontSize={size} />
         ) : average >= 4.5 ? (
            <Icon as={StarHalf} modifiers='tertiary' fontSize={size} />
         ) : (
            <Icon as={StarBorder} modifiers='tertiary' fontSize={size} />
         )}
      </Fragment>
   );
};

export default RatingStar;
