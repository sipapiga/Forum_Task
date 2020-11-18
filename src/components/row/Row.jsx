import React from 'react';

export default function Row({ currentUser, text }) {
  return (
    <div className="row mt-3">
      <div className="col-md-4 col-sm-12">
        <p className="font-weight-bold">{text} :</p>
      </div>
      <div className="col-md-8 col-sm-12">
        <p>{currentUser && currentUser}</p>
      </div>
    </div>
  );
}
