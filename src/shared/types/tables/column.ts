import React from 'react';

export interface Column<T> {
  key: keyof T | 'actions';
  title: string;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface AvatarWithNameData {
  id: string;
  fullName: string;
  avatar: Avatar;
}

export interface Avatar {
  alter: string;
  path: string | null;
}

export type TableTitle =
  | 'player'
  | 'date'
  | 'number'
  | 'str'
  | 'roleSelect'
  | 'status';

export interface ServerColumn {
  key: string;
  title: string;
  type: TableTitle;
}
