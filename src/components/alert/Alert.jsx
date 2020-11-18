import React from 'react';

export default function Alert({ alert }) {
  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`} role="alert">
        <i className="fa fa-info-circle" />
        {alert.msg &&
          Object.entries(alert.msg).map((msg) => {
            return <>{msg[1]}</>;
          })}{' '}
        *
      </div>
    )
  );
}
