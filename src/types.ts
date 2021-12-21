import { Subject } from 'rxjs';

type PositionCb = () => void;

export interface InteractionMsg {
  type: InteractionType;
  timestamp: number;
  line: Line;
  update?: { price: number | undefined };
}

export interface OrderLineMethods {
  remove(): void;
  onModify(callback: () => void): this;
  onModify<T>(data: T, callback: (data: T) => void): this;
  onMove(callback: () => void): this;
  onMove<T>(data: T, callback: (data: T) => void): this;
  onCancel(callback: () => void): this;
  onCancel<T>(data: T, callback: (data: T) => void): this;
  getPrice(): number;
  setPrice(value: number): this;
  getText(): string;
  setText(value: string): this;
  getTooltip(): string;
  setTooltip(value: string): this;
  getModifyTooltip(): string;
  setModifyTooltip(value: string): this;
  getCancelTooltip(): string;
  setCancelTooltip(value: string): this;
  getQuantity(): string;
  setQuantity(value: string): this;
  getEditable(): boolean;
  setEditable(value: boolean): this;
  getCancellable(): boolean;
  setCancellable(value: boolean): this;
  getExtendLeft(): boolean;
  setExtendLeft(value: boolean): this;
  getLineLength(): number;
  setLineLength(value: number): this;
  getLineStyle(): number;
  setLineStyle(value: number): this;
  getLineWidth(): number;
  setLineWidth(value: number): this;
  getBodyFont(): string;
  setBodyFont(value: string): this;
  getQuantityFont(): string;
  setQuantityFont(value: string): this;
  getLineColor(): string;
  setLineColor(value: string): this;
  getBodyBorderColor(): string;
  setBodyBorderColor(value: string): this;
  getBodyBackgroundColor(): string;
  setBodyBackgroundColor(value: string): this;
  getBodyTextColor(): string;
  setBodyTextColor(value: string): this;
  getQuantityBorderColor(): string;
  setQuantityBorderColor(value: string): this;
  getQuantityBackgroundColor(): string;
  setQuantityBackgroundColor(value: string): this;
  getQuantityTextColor(): string;
  setQuantityTextColor(value: string): this;
  getCancelButtonBorderColor(): string;
  setCancelButtonBorderColor(value: string): this;
  getCancelButtonBackgroundColor(): string;
  setCancelButtonBackgroundColor(value: string): this;
  getCancelButtonIconColor(): string;
  setCancelButtonIconColor(value: string): this;
}

export interface PositionLineMethods {
  onReverse: (cb: PositionCb) => PositionLineMethods;
  onClose: (cb: PositionCb) => PositionLineMethods;
  onModify: (cb: PositionCb) => PositionLineMethods;
  setExtendLeft: (data: boolean | undefined) => PositionLineMethods;
  setLineLength: (data: number | undefined) => PositionLineMethods;
  setLineStyle: (data: number | undefined) => PositionLineMethods;
  setLineWidth: (data: number | undefined) => PositionLineMethods;
  setBodyFont: (data: string | undefined) => PositionLineMethods;
  setQuantityFont: (data: string | undefined) => PositionLineMethods;
  setLineColor: (data: string | undefined) => PositionLineMethods;
  setBodyBorderColor: (data: string | undefined) => PositionLineMethods;
  setBodyBackgroundColor: (data: string | undefined) => PositionLineMethods;
  setBodyTextColor: (data: string | undefined) => PositionLineMethods;
  setQuantityBorderColor: (data: string | undefined) => PositionLineMethods;
  setQuantityBackgroundColor: (data: string | undefined) => PositionLineMethods;
  setQuantityTextColor: (data: string | undefined) => PositionLineMethods;
  setPrice: (data: number) => PositionLineMethods;
  setProtectTooltip: (data: string | undefined) => PositionLineMethods;
  setQuantity: (data: string | undefined) => PositionLineMethods;
  setText: (data: string | undefined) => PositionLineMethods;
  setTooltip: (data: string | undefined) => PositionLineMethods;
  setReverseTooltip: (data: string | undefined) => PositionLineMethods;
  setCloseTooltip: (data: string | undefined) => PositionLineMethods;
  setReverseButtonBorderColor: (
    data: string | undefined
  ) => PositionLineMethods;
  setReverseButtonBackgroundColor: (
    data: string | undefined
  ) => PositionLineMethods;
  setReverseButtonIconColor: (data: string | undefined) => PositionLineMethods;
  setCloseButtonBorderColor: (data: string | undefined) => PositionLineMethods;
  setCloseButtonBackgroundColor: (
    data: string | undefined
  ) => PositionLineMethods;
  setCloseButtonIconColor: (data: string | undefined) => PositionLineMethods;
  remove: () => void;
}

export interface TvChart {
  createOrderLine: () => OrderLineMethods;
  createPositionLine: () => PositionLineMethods;
}

export type OnInteraction = Subject<InteractionMsg>;

export type LineStyle = Partial<DefaultOrderStyleProps>;

export interface TvUtil {
  order: {
    add: (order: Order) => OrderLineMethods;
    delete: (id: string) => boolean | undefined;
    update: (order: { id: string; update: Order }) => OrderLineMethods;
  };
  position: {
    add: (order: Position) => PositionLineMethods;
    delete: (id: string) => boolean | undefined;
    update: (order: { id: string; update: Position }) => PositionLineMethods;
    get: (id: string) => Line | undefined;
  };
  tvChart: TvChart;
  isBrowser: boolean;
  interactions$: OnInteraction;
}

export enum InteractionType {
  ON_ORDER_ADD = 'onOrderAdd',
  ON_ORDER_CANCEL = 'onOrderCancel',
  ON_ORDER_MODIFY = 'onOrderMofify',
  ON_ORDER_MOVE = 'onOrderMove',
  ON_POSITION_ADD = 'onPositionAdd',
  ON_POSITION_CLOSE = 'onPositionClose',
  ON_POSITION_MODIFY = 'onPositionMofify',
  ON_POSITION_REVERSE = 'onPositionReverse',
}

export enum TvInteractionType {
  ON_CANCEL = 'onCancel',
  ON_CLOSE = 'onClose',
  ON_MODIFY = 'onModify',
  ON_MOVE = 'onMove',
  ON_REVERSE = 'onReverse',
}

export enum LineType {
  ORDER_LINE = 'order',
  POSITION_LINE = 'position',
}

export type OrderInteractions = Exclude<
  TvInteractionType,
  TvInteractionType.ON_CLOSE | TvInteractionType.ON_REVERSE
>[];

export interface GeneralOrderProps {
  modifyToolTip: string;
  cancelToolTip: string;
  quantity: string;
  text: string;
  tooltip: string;
  editable: boolean;
  cancellable: boolean;
  interactions?: Exclude<
    TvInteractionType,
    TvInteractionType.ON_CLOSE | TvInteractionType.ON_REVERSE
  >[];
}

export interface DefaultOrderStyleProps {
  extendLeft: boolean;
  lineLength: number;
  lineStyle: number;
  lineWidth: number;
  bodyFont: string;
  quantityFont: string;
  lineColor: string;
  bodyBorderColor: string;
  bodyBackgroundColor: string;
  bodyTextColor: string;
  quantityBorderColor: string;
  quantityBackgroundColor: string;
  quantityTextColor: string;
  cancelButtonBorderColor: string;
  cancelButtonBackgroundColor: string;
  cancelButtonIconColor: string;
}

export interface Order {
  data: { id: string; price: number; quantity?: string } & GeneralOrderProps;
  style: Partial<DefaultOrderStyleProps>;
}

export interface OrderUpdate {
  data: { id?: string; price: number; quantity?: string } & GeneralOrderProps;
  style: { [key: string]: string | boolean | number };
}

export type PositionInteractions = Exclude<
  TvInteractionType,
  TvInteractionType.ON_CANCEL | TvInteractionType.ON_MOVE
>[];

export interface GeneralPositionProps {
  protectTooltip?: string;
  reverseTooltip?: string;
  closeTooltip?: string;
  text?: string;
  tooltip?: string;
  interactions?: PositionInteractions;
}

export interface Position {
  data: { id: string; price: number; quantity?: string } & GeneralPositionProps;
  style: { [key: string]: string | boolean | number };
}

export interface PositionUpdate {
  data: {
    id?: string;
    price: number;
    quantity?: string;
  } & GeneralPositionProps;
  style: { [key: string]: string | boolean | number };
}

export interface DefaultPositionStyleProps {
  extendLeft?: boolean;
  lineLength?: number;
  lineStyle?: number;
  lineWidth?: number;
  bodyFont?: string;
  quantityFont?: string;
  lineColor?: string;
  bodyBorderColor?: string;
  bodyBackgroundColor?: string;
  bodyTextColor?: string;
  quantityBorderColor?: string;
  quantityBackgroundColor?: string;
  quantityTextColor?: string;
  reverseButtonBorderColor?: string;
  reverseButtonBackgroundColor?: string;
  reverseButtonIconColor?: string;
  closeButtonBorderColor?: string;
  closeButtonBackgroundColor?: string;
  closeButtonIconColor?: string;
}

export type TvLine = OrderLineMethods | PositionLineMethods;

export type Line = {
  data: Order['data'] | Position['data'];
  style: LineStyle;
  tvLine: TvLine;
};

export interface TvCtx {
  getPrice: () => number;
}

declare global {
  interface Window {
    getPrice(): number;
  }
}
