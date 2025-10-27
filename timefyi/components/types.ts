export interface IconBaseProps {
  /** Size of the icon in pixels (default: 24) */
  size?: number;
  /** Color of the icon (default: currentColor) */
  color?: string;
  /** Optional className for Tailwind styling */
  className?: string;
}

export interface TCategoryCardProps {
  icon?: React.ReactElement;
  title?: string;
  description?: string;
}
