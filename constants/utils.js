import { Platform, StatusBar } from 'react-native';
import { Icon, theme } from 'galio-framework';

export const StatusHeight = StatusBar.currentHeight;
export const HeaderHeight = (theme.SIZES.BASE * 3.5 + (StatusHeight || 0));
export const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812);
export const formatTitle = (title) => title.replace("Drawer", '').replace("Stack", '').replace("Tab", '')
export const removeIconOutline = (iconName) => iconName.replace("-outline", "")