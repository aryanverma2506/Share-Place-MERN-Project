export const getCoordsForAddress = (address: string) => {
  return Promise.resolve([-73.98565832400479, 40.7484253807047]);
};

// import axios from "axios";

// import HttpError from "../models/http-error";

// interface MapsResponseData {
//   results: {
//     geometry: {
//       location: {
//         lat: number;
//         lng: number;
//       };
//     };
//   }[];
//   status: string;
// }

// export const getCoordsForAddress = async (address: string) => {
//   const response = await axios.get<MapsResponseData>(
//     `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//       address
//     )}&key=${process.env.API_KEY}`
//   );

//   const data = response.data;

//   if (!data || data.status === "ZERO_RESULTS") {
//     throw new HttpError(
//       "Could not find location for the specified address.",
//       422
//     );
//   }

//   const coordinates = data.results[0].geometry.location;

//   return coordinates;
// };
