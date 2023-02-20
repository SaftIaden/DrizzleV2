/* eslint-disable no-promise-executor-return */
// eslint-disable-next-line no-undef
function getPosition(options?: PositionOptions): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, options));
}

export default getPosition;
