/* eslint-disable import/prefer-default-export */
type preference = {
  id: number;
  starredLocations: {
    lat: number;
    long: number;
  }[];
};

export type { preference };
