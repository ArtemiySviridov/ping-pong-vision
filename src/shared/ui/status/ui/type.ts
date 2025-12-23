export type StatusVariant =
  | 'active'
  | 'cancelled'
  | 'planned'
  | 'over'
  | 'win'
  | 'lose'
  | 'pending'
  | 'blocked';

export interface StatusProps {
  variant: string;
  text: string;
}
