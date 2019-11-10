module.exports = {
  defaultOrderProp: {
    modifyTooltip: 'Modify Order',
    cancelToolTip: 'Cancel Order',
  },

  defaultOrderStyleProp: {
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
    cancelButtonIconColorString: 'rgb(255, 0, 0)',
  },

  interactionType: {
    ON_ORDER_ADD: 'onAdd',
    ON_ORDER_MOVE: 'onMove',
    ON_ORDER_MODIFY: 'onMofify',
    ON_ORDER_CANCEL: 'onCancel',
  },
};
