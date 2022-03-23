import Toast from 'react-native-root-toast';
import {getStore} from '../../App';
// import ConstantColor from "../theme/ConstantColor";

export const showToast = (msg) => {
  let toast = Toast.show(msg, {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor: getStore.getState().auth.theme.primaryColor,
    textColor: getStore.getState().auth.theme.container.backgroundColor,
  });
};

export const showCenterToast = (msg) => {
  let toast = Toast.show(msg, {
    duration: Toast.durations.LONG,
    position: Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor: getStore.getState().auth.theme.primaryColor,
    textColor: getStore.getState().auth.theme.container.backgroundColor,
  });
};

