import React from 'react';
import { Container, Text } from './notFound.style';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Container>
      <Text>
        4 <i class="fa fa-times-circle"></i> 4 | Page not found
        <p className="display-4 text-white">
          Let's get you <Link to="/home">back</Link>{' '}
        </p>
      </Text>
    </Container>
  );
}
