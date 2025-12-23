import { useProfileStore } from '@/entities/profile/model/profileStore';

export const useProfileData = () => {
  const personalInfo = useProfileStore((state) => state.personalInfo);

  return {
    personalInfo,
  };
};
