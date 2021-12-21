import {
  DefaultOrderStyleProps,
  DefaultPositionStyleProps,
  GeneralOrderProps,
  GeneralPositionProps,
} from './types';

export const generalOrderProps: GeneralOrderProps = {
  modifyToolTip: 'Modify Order',
  cancelToolTip: 'Cancel Order',
  interactions: [],
  text: '',
  tooltip: '',
  quantity: '',
  editable: true,
  cancellable: true,
};

export const defaultOrderStyleProps: DefaultOrderStyleProps = {
  extendLeft: true,
  lineLength: 0,
  lineStyle: 2,
  lineWidth: 1,
  bodyFont: 'bold 7pt Verdana',
  quantityFont: 'bold 7pt Verdana',
  lineColor: 'rgb(255, 0, 0)',
  bodyBorderColor: 'rgb(255, 0, 0)',
  bodyBackgroundColor: 'rgba(255, 255, 255, 0.75)',
  bodyTextColor: 'rgb(255, 0, 0)',
  quantityBorderColor: 'rgb(255, 0, 0)',
  quantityBackgroundColor: 'rgba(255, 0, 0, 0.75)',
  quantityTextColor: 'rgb(255, 255, 255)',
  cancelButtonBorderColor: 'rgb(255, 0, 0)',
  cancelButtonBackgroundColor: 'rgba(255, 255, 255, 0.75)',
  cancelButtonIconColor: 'rgb(255, 0, 0)',
};

export const generalPositionProps: GeneralPositionProps = {
  protectTooltip: 'Protect Position',
  reverseTooltip: 'Reverse Position',
  closeTooltip: 'Close Position',
  interactions: [],
};

export const defaultPositionStyleProps: DefaultPositionStyleProps = {
  extendLeft: true,
  lineLength: 0,
  lineStyle: 2,
  lineWidth: 1,
  bodyFont: 'bold 7pt Verdana',
  quantityFont: 'bold 7pt Verdana',
  lineColor: 'rgb(0, 113, 224)',
  bodyBorderColor: 'rgb(0, 113, 224)',
  bodyBackgroundColor: 'rgba(255, 255, 255, 0.75)',
  bodyTextColor: 'rgb(0, 113, 224)',
  quantityBorderColor: 'rgb(0, 113, 224)',
  quantityBackgroundColor: 'rgba(0, 113, 224, 0.75)',
  quantityTextColor: 'rgb(255, 255, 255)',
  reverseButtonBorderColor: 'rgb(0, 113, 224)',
  reverseButtonBackgroundColor: 'rgba(255, 255, 255, 0.75)',
  reverseButtonIconColor: 'rgb(0, 113, 224)',
  closeButtonBorderColor: 'rgb(0, 113, 224)',
  closeButtonBackgroundColor: 'rgba(255, 255, 255, 0.75)',
  closeButtonIconColor: 'rgb(0, 113, 224)',
};
