import './MessagePanel.scss';
import HappyIcon from './icons/HappyIcon';
import SadIcon from './icons/SadIcon';

type IconMood = 'happy' | 'sad';

interface MessagePanelProps {
  message: string;
  iconMood: IconMood;
}

const MessagePanel = ({ message, iconMood }: MessagePanelProps) => {
  const IconComponent = {
    happy: HappyIcon,
    sad: SadIcon,
  }[iconMood];
  return (
    <div className="message-panel">
      <IconComponent size={191} />
      <p className="message-panel__message text-sm-regular">{message}</p>
    </div>
  );
};
export default MessagePanel;
