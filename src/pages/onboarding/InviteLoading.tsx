import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../../constants/key';
import LoadingSpinner from '../../components/LoadingSpinner';

const InviteLoading = () => {
  const { workspaceName } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const navigate = useNavigate();
  const { setItem: setWorkspaceName } = useLocalStorage(LOCAL_STORAGE_KEY.workspaceName);
  const { setItem: setIsInvite } = useLocalStorage(LOCAL_STORAGE_KEY.isInvite);
  const { setItem: setInviteToken } = useLocalStorage(LOCAL_STORAGE_KEY.token);

  useEffect(() => {
    if (workspaceName) {
      setWorkspaceName(workspaceName);
      setIsInvite('true');
      if (token) {
        setInviteToken(token);
      }
      setTimeout(() => {
        navigate('/onboarding');
      }, 50);
    }
  }, [workspaceName, token, navigate]);

  return (
    <div className="min-w-max min-h-screen flex flex-col items-center justify-center">
      <LoadingSpinner />;
    </div>
  );
};

export default InviteLoading;
