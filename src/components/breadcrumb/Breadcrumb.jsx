import React, { useState } from 'react';
import { BreadCrumbText } from './breadcrumb.style';

export default function Breadcrumb({ onClick, children, key }) {
  const [active, setActive] = useState('');

  return (
    <div className="container-fluid" key={key}>
      <div className="ui breadcrumb">
        {children.map((child, index) => {
          return (
            <>
              <BreadCrumbText
                key={index}
                onClick={() =>
                  onClick(
                    child.props.children,
                    setActive(child.props.children[0])
                  )
                }
                className={`${
                  active === child.props.children[0] ? 'active' : ''
                } section`}
              >
                {child.props.children}
              </BreadCrumbText>
              <div className="divider"> / </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
