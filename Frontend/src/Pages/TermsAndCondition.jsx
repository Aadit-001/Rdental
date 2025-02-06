import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const TermsAndConditions = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 14 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ mb: 4 }}>
          Terms and Conditions
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography paragraph>
            For the purpose of these Terms and Conditions, The term "we", "us", "our" used anywhere on this page shall mean R DENTAL, whose registered/operational office is A-13, Candis Compound, Mhatre Road, Dahisar West, Mumbai Suburban, Maharashtra Mumbai MAHARASHTRA 400068. "you", "your", "user", "visitor" shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.
          </Typography>
          <Typography paragraph>
            Your use of the website and/or purchase from us are governed by following Terms and Conditions:
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            1. Website Content and Changes
          </Typography>
          <Typography paragraph>
            The content of the pages of this website is subject to change without notice.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            2. Disclaimer of Warranties
          </Typography>
          <Typography paragraph>
            Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            3. Use of Materials
          </Typography>
          <Typography paragraph>
            Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            4. Intellectual Property
          </Typography>
          <Typography paragraph>
            Our website contains material which is owned by or licensed to us. This material includes, but are not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
          </Typography>
          <Typography paragraph>
            All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            5. Unauthorized Use
          </Typography>
          <Typography paragraph>
            Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            6. External Links
          </Typography>
          <Typography paragraph>
            From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information.
          </Typography>
          <Typography paragraph>
            You may not create a link to our website from another website or document without R DENTAL's prior written consent.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            7. Governing Law
          </Typography>
          <Typography paragraph>
            Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            8. Transaction Liability
          </Typography>
          <Typography paragraph>
            We, shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.
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

export default TermsAndConditions;
