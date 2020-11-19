import React from 'react';
import { Container, BreadCrumbText } from './breadcrumb.style';

export default function Breadcrumb({ onClick, children }) {
  return (
    <Container className="container">
      {children.map((child) => {
        return (
          <div
            key={child.props.children}
            className="mr-4"
            onClick={() => onClick(child.props.children)}
          >
            <BreadCrumbText>
              {child.props.children} <i className="fa fa-sort-down"></i>
            </BreadCrumbText>
          </div>
        );
      })}
    </Container>
  );
}
