import { Subject } from 'rxjs';

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
  remove(): void;
  onClose(callback: () => void): this;
  onClose<T>(data: T, callback: (data: T) => void): this;
  onModify(callback: () => void): this;
  onModify<T>(data: T, callback: (data: T) => void): this;
  onReverse(callback: () => void): this;
  onReverse<T>(data: T, callback: (data: T) => void): this;
  getPrice(): number;
  setPrice(value: number): this;
  getText(): string;
  setText(value: string): this;
  getTooltip(): string;
  setTooltip(value: string): this;
  getProtectTooltip(): string;
  setProtectTooltip(value: string): this;
  getCloseTooltip(): string;
  setCloseTooltip(value: string): this;
  getReverseTooltip(): string;
  setReverseTooltip(value: string): this;
  getQuantity(): string;
  setQuantity(value: string): this;
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
  getReverseButtonBorderColor(): string;
  setReverseButtonBorderColor(value: string): this;
  getReverseButtonBackgroundColor(): string;
  setReverseButtonBackgroundColor(value: string): this;
  getReverseButtonIconColor(): string;
  setReverseButtonIconColor(value: string): this;
  getCloseButtonBorderColor(): string;
  setCloseButtonBorderColor(value: string): this;
  getCloseButtonBackgroundColor(): string;
  setCloseButtonBackgroundColor(value: string): this;
  getCloseButtonIconColor(): string;
  setCloseButtonIconColor(value: string): this;
}

export interface ISubscription<T = () => void> {
  subscribe(obj: object | null, member: T, singleshot?: boolean): void;
  unsubscribe(obj: object | null, member: T): void;
  unsubscribeAll(obj: object | null): void;
}

export interface TvChart {
  onDataLoaded(): ISubscription<() => void>;
  createOrderLine: () => OrderLineMethods;
  createPositionLine: () => PositionLineMethods;
}

export type OnInteraction = Subject<InteractionMsg>;

export type LineStyle =
  | Partial<DefaultOrderStyleProps>
  | Partial<DefaultPositionStyleProps>;

export interface TvLines {
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
  data: { id: string; price: number } & Partial<GeneralOrderProps>;
  style: Partial<DefaultOrderStyleProps>;
}

export interface OrderUpdate {
  data: {
    id?: string;
    price: number;
  } & Partial<GeneralOrderProps>;
  style: { [key: string]: string | boolean | number };
}

export type PositionInteractions = Exclude<
  TvInteractionType,
  TvInteractionType.ON_CANCEL | TvInteractionType.ON_MOVE
>[];

export interface GeneralPositionProps {
  protectTooltip: string;
  reverseTooltip: string;
  closeTooltip: string;
  text: string;
  tooltip: string;
  quantity: string;
  interactions?: PositionInteractions;
}

export interface Position {
  data: { id: string; price: number } & Partial<GeneralPositionProps>;
  style: Partial<DefaultPositionStyleProps>;
}

export interface PositionUpdate {
  data: {
    id?: string;
    price: number;
  } & Partial<GeneralPositionProps>;
  style: Partial<DefaultPositionStyleProps>;
}

export interface DefaultPositionStyleProps {
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
  reverseButtonBorderColor: string;
  reverseButtonBackgroundColor: string;
  reverseButtonIconColor: string;
  closeButtonBorderColor: string;
  closeButtonBackgroundColor: string;
  closeButtonIconColor: string;
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
