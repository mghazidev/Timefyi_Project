export interface IconBaseProps {
  size?: number;
  color?: string;
  className?: string;
}

export interface TCategoryCardProps {
  icon?: React.ReactElement;
  title?: string;
  description?: string;
}

export interface UserTimezone {
  id: string;
  standardName: string;
  gmtName: string;
  gmtSign: string;
  gmtOffset: string;
  narrowOffset: string;
  abbreviatedName: string;
  unabbreviatedName: string;
  name: string;
  title: string;
  city: string;
  country: string;
}
