export const MINUTE_TO_PIXEL = 3;

export const timePixelMap = {
  '1m': MINUTE_TO_PIXEL,
  '5m': MINUTE_TO_PIXEL * 5,
  '30m': MINUTE_TO_PIXEL * 30,
  '1h': MINUTE_TO_PIXEL * 60,
  '12h': MINUTE_TO_PIXEL * 720,
  '1d': MINUTE_TO_PIXEL * 1440
};

export const minPixels = 0; // Previous Day, 00:00 => 0px
export const maxPixels = 3 * timePixelMap['1d'] - timePixelMap['1m']; // Next Day, 23:59 => 8638px
