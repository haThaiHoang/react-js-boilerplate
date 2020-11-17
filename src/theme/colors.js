import tinycolor from 'tinycolor2'

export const PRIMARY = '#0a0f89'

// Color utils
export const darken = (color, value) => tinycolor(color).darken(value).toString()
export const lighten = (color, value) => tinycolor(color).lighten(value).toString()
export const alpha = (color, value) => tinycolor(color).setAlpha(value).toRgbString()
export const isLight = (color) => tinycolor(color).isLight()
