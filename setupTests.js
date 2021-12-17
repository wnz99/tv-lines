global.mocksClear = (mocks) => mocks.forEach((mock) => mock.mockClear());

global.tvChart = function tvChart() {
  const obj = {
    createOrderLine: jest.fn().mockImplementation(() => obj),
    setCancelTooltip: jest.fn().mockImplementation(() => obj),
    setEditable: jest.fn().mockImplementation(() => obj),
    setCancellable: jest.fn().mockImplementation(() => obj),
    setModifyTooltip: jest.fn().mockImplementation(() => obj),
    setPrice: jest.fn().mockImplementation(() => obj),
    setQuantity: jest.fn().mockImplementation(() => obj),
    setText: jest.fn().mockImplementation(() => obj),
    setTooltip: jest.fn().mockImplementation(() => obj),
    onMove: jest.fn().mockImplementation(() => obj),
    onModify: jest.fn().mockImplementation(() => obj),
    onCancel: jest.fn().mockImplementation(() => obj),
    setExtendLeft: jest.fn().mockImplementation(() => obj),
    setLineLength: jest.fn().mockImplementation(() => obj),
    setLineStyle: jest.fn().mockImplementation(() => obj),
    setLineWidth: jest.fn().mockImplementation(() => obj),
    setBodyFont: jest.fn().mockImplementation(() => obj),
    setQuantityFont: jest.fn().mockImplementation(() => obj),
    setLineColor: jest.fn().mockImplementation(() => obj),
    setBodyBorderColor: jest.fn().mockImplementation(() => obj),
    setBodyBackgroundColor: jest.fn().mockImplementation(() => obj),
    setBodyTextColor: jest.fn().mockImplementation(() => obj),
    setQuantityBorderColor: jest.fn().mockImplementation(() => obj),
    setQuantityBackgroundColor: jest.fn().mockImplementation(() => obj),
    setQuantityTextColor: jest.fn().mockImplementation(() => obj),
    setCancelButtonBorderColor: jest.fn().mockImplementation(() => obj),
    setCancelButtonBackgroundColor: jest.fn().mockImplementation(() => obj),
    setCancelButtonIconColor: jest.fn().mockImplementation(() => obj),
    // Positions
    createPositionLine: jest.fn().mockImplementation(() => obj),
    onReverse: jest.fn().mockImplementation(() => obj),
    onClose: jest.fn().mockImplementation(() => obj),
    setProtectTooltip: jest.fn().mockImplementation(() => obj),
    setReverseTooltip: jest.fn().mockImplementation(() => obj),
    setCloseTooltip: jest.fn().mockImplementation(() => obj),
    setReverseButtonBorderColor: jest.fn().mockImplementation(() => obj),
    setReverseButtonBackgroundColor: jest.fn().mockImplementation(() => obj),
    setReverseButtonIconColor: jest.fn().mockImplementation(() => obj),
    setCloseButtonBorderColor: jest.fn().mockImplementation(() => obj),
    setCloseButtonBackgroundColor: jest.fn().mockImplementation(() => obj),
    setCloseButtonIconColor: jest.fn().mockImplementation(() => obj),

    remove: jest.fn(),
  };

  return obj;
};
