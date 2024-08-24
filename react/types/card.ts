export type IconCardDetails = {
  title: string;
  desc: string;
  icon: React.ReactElement;
};

export type IconCardStyles = {
  card?: string;
  topLine?: string;
  leftLine?: string;
  cardHeader?: string;
  headerContainer?: string;
  headerWrapper?: string;
  iconContainer?: string;
  titleContainer?: string;
  cardContent?: string;
  cardDescription?: string;
};

export type IconCardType = IconCardDetails & {
  styles?: IconCardStyles;
};
