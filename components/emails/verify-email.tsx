import * as React from 'react';

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

interface VerifyEmailProps {
    username: string;
    verifyUrl: string;
}

const VerifyEmail = ({ username, verifyUrl }: VerifyEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Por favor verifica tu dirección de correo electrónico para completar tu registro</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] p-[32px] max-w-[600px] mx-auto">
            <Section>
              <Heading className="text-[24px] font-bold text-gray-900 mb-[24px] text-center">
                Verifica tu dirección de correo electrónico
                
              </Heading>
              
              <Text className="text-[16px] text-gray-700 mb-[16px]">
                Hola {username},
              </Text>
              
              <Text className="text-[16px] text-gray-700 mb-[24px]">
                {/* Thank {username} you for signing up! To complete your registration and start using your account, 
                please verify your email address by clicking the button below. */}
                Gracias por registrarte! Para completar tu registro y comenzar a usar tu cuenta,
                por favor verifica tu dirección de correo electrónico haciendo clic en el botón de abajo.
              </Text>
              
              <Section className="text-center mb-[32px]">
                <Button
                  href={verifyUrl}
                  className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[6px] text-[16px] font-medium no-underline box-border"
                >
                  Verifica tu dirección de correo electrónico
                </Button>
              </Section>
              
              <Text className="text-[14px] text-gray-600 mb-[16px]">
                Si el botón no funciona, puedes copiar y pegar este enlace en tu navegador:
              </Text>
              
              <Text className="text-[14px] text-blue-600 break-all mb-[32px]">
                {verifyUrl}
              </Text>
              
              <Text className="text-[14px] text-gray-600 mb-[8px]">
                Este enlace de verificación expirará en 1 hora por razones de seguridad.
              </Text>
              
              <Text className="text-[14px] text-gray-600">
                Si no creaste una cuenta, puedes ignorar este correo electrónico.
              </Text>
            </Section>
            
            <Section className="border-t border-gray-200 pt-[24px] mt-[32px]">
              <Text className="text-[12px] text-gray-500 text-center m-0 mb-[8px]">
                Saludos cordiales,<br />
                El equipo de Autopus
              </Text>
              
              <Text className="text-[12px] text-gray-400 text-center m-0">
                © 2025 Autopus. Todos los derechos reservados.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerifyEmail;