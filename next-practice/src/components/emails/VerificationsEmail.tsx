import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
    Container,
    Body,
    // Hr,
    // Img,
  } from '@react-email/components';
  
  interface VerificationEmailProps {
    username: string;
    otp: string;
  }
  
  export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <title>Verify Your Account - MistryMessage</title>
          <Font
            fontFamily="Inter"
            fallbackFontFamily="Arial"
            webFont={{
              url: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
              format: 'woff2',
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Preview>Verify your MistryMessage account with code: {otp}</Preview>
        <Body style={main}>
          <Container style={container}>
            {/* Header Section */}
            <Section style={header}>
              <Row>
                <Heading style={logo}>🔮 MistryMessage</Heading>
              </Row>
            </Section>

            {/* Main Content */}
            <Section style={content}>
              <Row>
                <Heading style={h1}>Verify Your Account</Heading>
              </Row>
              
              <Row>
                <Text style={greeting}>Hello {username}! 👋</Text>
              </Row>
              
              <Row>
                <Text style={paragraph}>
                  Use this code to complete your MistryMessage registration:
                </Text>
              </Row>
              
              {/* OTP Code Section */}
              <Section style={otpSection}>
                <Row>
                  <Text style={otpCode}>{otp}</Text>
                </Row>
              </Section>
              
              <Row>
                <Text style={paragraph}>
                  Code expires in <strong>10 minutes</strong>.
                </Text>
              </Row>
              
              <Row>
                <Button style={button} href={`http://localhost:3000/verify/${username}`}>
                  Verify Account
                </Button>
              </Row>
              
              <Row>
                <Text style={footer}>
                  Didn&apos;t request this? Ignore this email.
                </Text>
              </Row>
            </Section>
            
            {/* Footer */}
            <Section style={footerSection}>
              <Row>
                <Text style={footerText}>
                  © 2024 MistryMessage
                </Text>
              </Row>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }

  // Styles
  const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: 'Inter, Arial, sans-serif',
  };

  const container = {
    backgroundColor: '#ffffff',
    border: '1px solid #f0f0f0',
    borderRadius: '12px',
    margin: '40px auto',
    padding: '0',
    width: '600px',
    maxWidth: '100%',
  };

  const header = {
    backgroundColor: '#6366f1',
    borderRadius: '12px 12px 0 0',
    padding: '32px 40px',
    textAlign: 'center' as const,
  };

  const logo = {
    color: '#ffffff',
    fontSize: '28px',
    fontWeight: '700',
    margin: '0',
    textAlign: 'center' as const,
  };

  const content = {
    padding: '40px',
  };

  const h1 = {
    color: '#1f2937',
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '1.25',
    margin: '0 0 20px 0',
    textAlign: 'center' as const,
  };

  const greeting = {
    color: '#374151',
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '1.5',
    margin: '0 0 16px 0',
  };

  const paragraph = {
    color: '#6b7280',
    fontSize: '16px',
    lineHeight: '1.6',
    margin: '0 0 16px 0',
  };

  const otpSection = {
    backgroundColor: '#f8fafc',
    border: '2px dashed #e5e7eb',
    borderRadius: '8px',
    margin: '24px 0',
    padding: '20px',
    textAlign: 'center' as const,
  };

  const otpCode = {
    backgroundColor: '#ffffff',
    border: '2px solid #6366f1',
    borderRadius: '8px',
    color: '#6366f1',
    display: 'inline-block',
    fontSize: '32px',
    fontWeight: '700',
    letterSpacing: '8px',
    margin: '0',
    padding: '16px 24px',
    textAlign: 'center' as const,
  };

  const button = {
    backgroundColor: '#6366f1',
    borderRadius: '8px',
    color: '#ffffff',
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '1',
    margin: '20px 0',
    padding: '12px 24px',
    textAlign: 'center' as const,
    textDecoration: 'none',
    width: '180px',
  };

  const footer = {
    color: '#9ca3af',
    fontSize: '14px',
    lineHeight: '1.5',
    margin: '16px 0 0 0',
    textAlign: 'center' as const,
  };

  const footerSection = {
    backgroundColor: '#f9fafb',
    borderRadius: '0 0 12px 12px',
    padding: '24px 40px',
    textAlign: 'center' as const,
  };

  const footerText = {
    color: '#9ca3af',
    fontSize: '12px',
    lineHeight: '1.4',
    margin: '0 0 4px 0',
  };