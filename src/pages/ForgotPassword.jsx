// @mui
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
// components
import { MetaTags } from 'react-meta-tags';
import EmailForm from '~/components/ForgotPassword/EmailForm';
import ResetForm from '~/components/ForgotPassword/ResetForm';
import { getExistingAccount } from '~/services/authServices';

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function ForgotPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkExistingAccount = async () => {
      const accountRes = await getExistingAccount(token);
      if (accountRes.status === 401) {
        navigate('/login', { replace: true });
      }
    };

    if (token !== undefined) {
      checkExistingAccount();
    }
  }, [token, navigate]);

  return (
    <RootStyle>
      <Container maxWidth="sm">
        <MetaTags>
          <title>Brother Coffee - Quên mật khẩu</title>
        </MetaTags>
        <ContentStyle>
          <Typography variant="h4" gutterBottom>
            {token ? 'Tạo mật khẩu mới' : 'Quên mật khẩu'}
          </Typography>

          <Typography sx={{ color: 'text.secondary', mb: 5 }}>
            {token ? 'Nhập mật khẩu mới' : 'Nhập email để tiếp tục'}
          </Typography>

          {token ? <ResetForm /> : <EmailForm />}
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
