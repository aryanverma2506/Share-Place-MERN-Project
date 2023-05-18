export interface PlaceModel {
  id: string | number;
  title: string;
  image: string;
  address: string;
  creator: string | number;
  description: string;
  location: {
    latitude: number;
    longitude: number;
  };
}
