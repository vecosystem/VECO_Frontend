import { ClipLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className={`flex justify-center items-center w-full h-dvh`}>
      <ClipLoader color={'#132650'} />
    </div>
  );
};

export default Loading;
