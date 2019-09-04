import tinycolor from 'tinycolor2'

export const RED50 = '#ffebee'
export const RED100 = '#ffcdd2'
export const RED200 = '#ef9a9a'
export const RED300 = '#e57373'
export const RED400 = '#ef5350'
export const RED500 = '#f44336'
export const RED600 = '#e53935'
export const RED700 = '#d32f2f'
export const RED800 = '#c62828'
export const RED900 = '#b71c1c'

export const GRAY50 = '#fafafa'
export const GRAY100 = '#f5f5f5'
export const GRAY200 = '#eeeeee'
export const GRAY300 = '#e0e0e0'
export const GRAY400 = '#bdbdbd'
export const GRAY500 = '#9e9e9e'
export const GRAY600 = '#757575'
export const GRAY700 = '#616161'
export const GRAY800 = '#424242'
export const GRAY900 = '#212121'

export const BLUE50 = '#e3f2fd'
export const BLUE100 = '#bbdefb'
export const BLUE200 = '#90caf9'
export const BLUE300 = '#64b5f6'
export const BLUE400 = '#42a5f5'
export const BLUE500 = '#2196f3'
export const BLUE600 = '#1e88e5'
export const BLUE700 = '#1976d2'
export const BLUE800 = '#1565c0'
export const BLUE900 = '#0d47a1'

export const PRIMARY1 = '#0a0f89'
export const PRIMARY2 = '#00584B'
export const PRIMARY3 = '#510058'
export const ACCENT = GRAY500

// Color utils
export const darken = (color, value) => tinycolor(color).darken(value).toString()
export const lighten = (color, value) => tinycolor(color).lighten(value).toString()
export const alpha = (color, value) => tinycolor(color).setAlpha(value).toRgbString()
export const isLight = (color) => tinycolor(color).isLight()
