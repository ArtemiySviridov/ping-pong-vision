import { useRef } from 'react';
import Button from '@/shared/ui/Button';
import { Upload } from 'lucide-react';
import './FileUpload.scss';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  label?: string;
  isLoading?: boolean;
}

const FileUpload = ({
  onFileSelect,
  accept = 'image/*',
  label = 'Загрузить фото',
  isLoading = false,
}: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Файл слишком большой. Максимальный размер: 5MB');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    onFileSelect(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="file-upload">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="file-upload__input"
      />

      <Button
        variant="tertiary"
        text={isLoading ? 'Загрузка...' : label}
        icon={<Upload size={16} />}
        onClick={triggerFileInput}
        disabled={isLoading}
        size="small"
      />
    </div>
  );
};

export default FileUpload;
