import * as React from 'react';

interface EmailTemplateProps {
  username: string;
}

export function EmailTemplate({ username }: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <p>Esto es una prueba de envío de emails personalizados con Resend</p>
    </div>
  );
}