import React from 'react';

export default function Row({ currentUser, text }) {
  return (
    <div className="row mt-3">
      <div className="col-md-5 col-sm-12">
        <p className="font-weight-bold ml-4">{text} :</p>
      </div>
      <div className="col-md-7 col-sm-12">
        <p>{currentUser && currentUser}</p>
      </div>
    </div>
  );
}
