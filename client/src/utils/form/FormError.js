import React, { Fragment } from 'react';
import { Message } from '../../design/elements';

const FormError = ({ errors }) => {
   function renderFormErrorMessage(errors) {
      return errors.map((el, i) => {
         return <Message key={i} alert={el.message} severity='error' />;
      });
   }
   return (
      <Fragment>
         {Object.values(errors).length > 0 && renderFormErrorMessage(Object.values(errors))}
      </Fragment>
   );
};

export default FormError;
