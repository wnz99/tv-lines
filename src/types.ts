import { Subject } from 'rxjs';

import {
  IOrderLineAdapter,
  IPositionLineAdapter,
  IChartWidgetApi,
} from './charting_library';

export { IOrderLineAdapter, IPositionLineAdapter } from './charting_library';

export interface InteractionMsg {
  type: InteractionType;
  timestamp: number;
  line: Line;
  update?: { price: number | undefined };
}

export type TvChart = Pick<
  IChartWidgetApi,
  | 'onDataLoaded'
  | 'createOrderLine'
  | 'createPositionLine'
  | 'removeAllShapes'
  | 'createShape'
>;

export type OnInteraction = Subject<InteractionMsg>;

export type LineStyle =
  | Partial<DefaultOrderStyleProps>
  | Partial<DefaultPositionStyleProps>;

export interface TvLines {
  order: {
    add: (order: Order) => IOrderLineAdapter;
    delete: (id: string) => boolean | undefined;
    update: (order: { id: string; update: Order }) => IOrderLineAdapter;
  };
  position: {
    add: (order: Position) => IPositionLineAdapter;
    delete: (id: string) => boolean | undefined;
    update: (order: { id: string; update: Position }) => IPositionLineAdapter;
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

export type TvLine = IOrderLineAdapter | IPositionLineAdapter;

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
