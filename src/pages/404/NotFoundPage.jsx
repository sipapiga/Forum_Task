import React from 'react';
import { Container, Text } from './notFound.style';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Container>
      <Text>
        <strong className="text-primary"> 4 </strong>
        <i className="far fa-frown"></i>
        <strong className="text-warning"> 4</strong>| Page not found
        <p className="display-4 text-white">
          <div className="text-secondary">
            Let's get you <Link to="/home">back</Link>
          </div>
        </p>
      </Text>
    </Container>
  );
}
