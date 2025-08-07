import { useEffect } from 'react';
import { postReIssueAccessToken } from '../../apis/auth';
import { LOCAL_STORAGE_KEY } from '../../constants/key';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const TokenLoading = () => {
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const accesstoken = await postReIssueAccessToken();
      setItem(accesstoken);
      console.log(accesstoken);
    };
    fetchAccessToken();
  }, []);

  return <h3 className="font-title-sub-r text-gray-600">로딩중입니다.</h3>;
};

export default TokenLoading;
