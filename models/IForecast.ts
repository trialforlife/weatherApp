export interface IForecast {
  dt: number;
  main: IMainForecastData;
  weather: Array<IWeatherData>;
  clouds: ICloudsData;
  wind: IWindData;
  visibility: number;
  pop: number;
  sys: ISys;
  dt_txt: string;
  city: ICity;
}
export interface IForecastResponse {
  cod: number;
  message: number | string;
  cnt: number;
  list: Array<IForecast>;
}
interface IMainForecastData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}
interface IWeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;
}
interface ICloudsData {
  all: number;
}
interface IWindData {
  speed: number;
  deg: number;
  gust: number;
}
interface ISys {
  pod: string;
}
interface ICity {
  id: number;
  name: string;
  coord: ICoord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface ICoord {
  lat: number;
  lon: number;
}
