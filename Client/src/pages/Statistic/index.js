import { Box, Container, Typography } from '@mui/material';
import Header from 'components/Header';

export const Statistics = () => {
  return (
    <div>
      <Header />
      <Typography sx={{ mt: 4, mb: 6, ml: 10, fontSize: 22, fontWeight: 600 }}>Hà Nội</Typography>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
          {months.map((month, index) => (
            <Box key={index} sx={{ position: 'relative' }}>
              <img src={process.env.PUBLIC_URL + 'vertical.png'} alt="" />
              <Typography
                sx={{
                  position: 'absolute',
                  bottom: '-50px',
                  transform: ' translateX(-50%)',
                  fontWeight: 600,
                }}
              >
                {month}
              </Typography>
            </Box>
          ))}
          <Box sx={{ position: 'absolute', bottom: 32, left: '-54px' }}>
            <img src={process.env.PUBLIC_URL + 'horizontal.png'} alt="" />
          </Box>
          <Box sx={{ position: 'absolute', bottom: 34, left: 0, right: 0 }}>
            <img style={{ width: '100%' }} src={process.env.PUBLIC_URL + 'statistic.png'} alt="" />
          </Box>
          {degrees.map((degree, index) => (
            <Box
              key={index}
              sx={{ position: 'absolute', left: '-40px', bottom: `${2.5 * degree}%` }}
            >
              <Typography>{degree}°C</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </div>
  );
};

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const degrees = [0, 10, 20, 30, 40];
