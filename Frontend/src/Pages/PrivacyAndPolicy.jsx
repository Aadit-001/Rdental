import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const PrivacyAndPolicy = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 14 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ mb: 4 }}>
          Privacy Policy
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography paragraph>
            We value your trust. That's why we follow highest standards for secure transactions and customer information privacy. Please read the following statement to learn about our information gathering and dissemination practices.
          </Typography>
          <Typography paragraph>
            Our privacy policy is subject to change at any time without notice. To make sure you are aware of any changes, please review this policy periodically.
          </Typography>
          <Typography paragraph sx={{ fontWeight: 'bold' }}>
            Note: By visiting rdental.in you agree to be bound by the terms and conditions of this Privacy Policy. If you do not agree please do not use or access our Website.
          </Typography>
          <Typography paragraph>
            By mere use of the Website, you expressly consent to our use and disclosure of your personal information in accordance with this Privacy Policy. This Privacy Policy is incorporated into and subject to the Terms of Use.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            1. Communication
          </Typography>
          <Typography paragraph>
            When You visit rdental.in website or send emails to us, You are communicating with us electronically. We communicate with You by email, SMS, whatsapp or by posting notices on the website. For contractual purposes, You consent to receive communications from us electronically and You agree that all agreements, notices, disclosures and other communications that we provide to You electronically satisfy any legal requirement that those communications be in writing. This condition does not affect Your statutory rights.
          </Typography>
          <Typography paragraph>
            You understand that once You register as a rdental user on the rdental.in platform, Upon placing an order on our website, we shall be entitled to use your registered mobile number on the website to send transaction-related SMS or WhatsApp to you, irrespective of DND services being activated on your mobile. We may occasionally send promotional SMS to your registered mobile number. The customer hereby authorizes us to receive transactional SMS to his registered number, even if the number is registered for the DND "Do not Disturb" service.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            2. Collection of Information
          </Typography>
          <Typography paragraph>
            When you use our Website, we collect and store your personal information which is provided by you from time to time. Our primary goal in doing so is to provide you a safe, efficient, smooth and customized experience. This allows us to provide services and features that most likely meet your needs, and to customize our Website to make your experience safer and easier.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            3. Use of Information
          </Typography>
          <Typography paragraph>
            We use personal information to provide the services you request. To the extent we use your personal information to market to you, we will provide you the ability to opt-out of such uses. We use your personal information to resolve disputes; troubleshoot problems; help promote a safe service; collect money; measure consumer interest in our products and services, inform you about online and offline offers, products, services, and updates.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            4. Information Sharing
          </Typography>
          <Typography paragraph>
            We may share personal information with our other corporate entities and affiliates. These entities and affiliates may market to you as a result of such sharing unless you explicitly opt-out. We may disclose personal information to third parties when required by law or for business operations.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            5. External Links
          </Typography>
          <Typography paragraph>
            Our Website links to other websites that may collect personally identifiable information about you. rdental.in is not responsible for the privacy practices or the content of those linked websites.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            6. Security
          </Typography>
          <Typography paragraph>
            Our Website has stringent security measures in place to protect the loss, misuse, and alteration of the information under our control. Whenever you change or access your account information, we offer the use of a secure server.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            7. Opt-Out Choice
          </Typography>
          <Typography paragraph>
            We provide all users with the opportunity to opt-out of receiving non-essential (promotional, marketing-related) communications from us on behalf of our partners, and from us in general, after setting up an account.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            8. Advertisements
          </Typography>
          <Typography paragraph>
            We use third-party advertising companies to serve ads when you visit our Website. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            9. Your Consent
          </Typography>
          <Typography paragraph>
            By using the Website and/or by providing your information, you consent to the collection and use of the information you disclose on the Website in accordance with this Privacy Policy, including but not limited to Your consent for sharing your information as per this privacy policy.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            10. Questions
          </Typography>
          <Typography paragraph>
            Please contact us regarding any questions regarding this statement.
          </Typography>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" align="center">
            Last updated: February 6, 2025
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyAndPolicy;
