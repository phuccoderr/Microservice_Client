import { IoMdEye, IoMdEyeOff } from "react-icons/io";

interface ShowHidePasswordProps {
  showPassword: boolean;
  handleShowPassword: () => void;
}

const ShowHidePassword = ({
  showPassword,
  handleShowPassword,
}: ShowHidePasswordProps) => {
  return (
    <div className="absolute right-0 top-0 flex h-full w-10 cursor-pointer items-center justify-center">
      {showPassword ? (
        <IoMdEye onClick={handleShowPassword} />
      ) : (
        <IoMdEyeOff onClick={handleShowPassword} />
      )}
    </div>
  );
};

export default ShowHidePassword;
