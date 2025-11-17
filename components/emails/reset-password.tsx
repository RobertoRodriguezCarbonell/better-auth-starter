import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Tailwind,
} from '@react-email/components';

interface ForgotPasswordEmailProps {
  username: string;
  resetUrl: string;
  userEmail: string;
}

const ForgotPasswordEmail = (props: ForgotPasswordEmailProps) => {
  const { username, resetUrl, userEmail } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Text className="text-[24px] font-bold text-gray-900 m-0">
                Reset Your Password
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px] px-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                Hi {username},
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                We received a request to reset the password for your account associated with <strong>{userEmail}</strong>.
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[24px]">
                Click the button below to create a new password:
              </Text>
            </Section>

            {/* Reset Button */}
            <Section className="text-center mb-[32px] px-[32px]">
              <Button
                href={resetUrl}
                className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
              >
                Reset Password
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-[32px] px-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                If the button doesn't work, you can copy and paste this link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 break-all">
                {resetUrl}
              </Text>
            </Section>

            <Hr className="border-gray-200 my-[24px]" />

            {/* Security Notice */}
            <Section className="mb-[24px] px-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                <strong>Security Notice:</strong>
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                • This link will expire in 24 hours for security reasons
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                • If you didn't request this reset, please ignore this email
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px]">
                • Never share this link with anyone
              </Text>
            </Section>

            <Hr className="border-gray-200 my-[24px]" />

            {/* Footer */}
            <Section className="px-[32px]">
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                This email was sent to {username}. If you have any questions, please contact our support team.
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] mt-[8px] m-0">
                © {new Date().getFullYear()} Your Company Name. All rights reserved.
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] mt-[4px] m-0">
                123 Business Street, Suite 100, City, State 12345
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ForgotPasswordEmail;