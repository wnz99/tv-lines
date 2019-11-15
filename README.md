# tv-lines

A wrapper around TradingView `Chart` object to be used with the React TradingView wrapper component.

# Usage

Sample code:

```javascript
const initOrders = (tvWidget) => {
  // tvWidget is the TV chart instance

  const chart = tvWidget.chart();
  const tvLines = tvUtil(chart);

  tvLines.interactions$.subscribe(interaction => {
    // interaction will be an object as:
    // {
    //   type: "onOrderAdd", -> type can be: 'onOrderAdd', 'onOrderModify', 'onOrderCancel', 'onOrderMove', 
    //   'onPositionAdd', 'onPositionClose', 'onPositionMofify', 'onPositionReverse'
    //   timestamp: 1573390204704, -> the time stamp of the interaction
    //   line: {data: {…}, style: {...}, tvLine: n} - > an object with the original order data and tvLine TV line instance
    //   update: {
    //      price: 123, -> The new price for 'onMove' interaction
    //    }
    //   }
    console.log(interaction);
  });

  const orderId

  const order = {
    data: {
      id: orderId,
      price: '188',
      quantity: '50',
      tooltip: 'Custom tooltip',
      editable: true,
      text: 'First test order'
    }
    style: {
      lineColor: 'rgb(0, 17, 255)',
      quantityBackgroundColor: 'rgb(0, 17, 255)'
    }
  };
  const orderLine = tvLines.order.add(order);

  // Later on

  tvLines.order.update(orderId, {
  data: {
    price: 187.5,
    quantity: '50',
    tooltip: 'Custom tooltip changed',
    editable: true,
    text: 'First test order modified'
  },
  style: {
    lineColor: 'rgb(100, 100, 100)',
    quantityBackgroundColor: 'rgb(100, 100, 100)'
  }
  });

  // Later on

  tvLines.order.delete(123)

  // or alternatively

  orderLine.remove()
}


<TradingViewChart
  onChartReady={initOrders}
/>
```

## Data and styling

The order data object has the following properties:

```javascript
  const data: {
    price: 187.5, // -> Double
    quantity: '50', // -> String
    tooltip: 'tootip text',
    editable: true,
    text: 'Order text' -> // For example: 'BUY: $123'
    modifyTooltip: 'Modify Order',
    cancelToolTip: 'Cancel Order',
  },
```

The order style object has the following default properties:

```javascript
  const style: {
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
```

## Original TradingView documentation:

### `createOrderLine(options)`

    options is an object with one possible key - disableUndo which can be true or false. For compatibility reasons the default value is set to false.

Creates a new trading order on the chart and returns an API-object that you can use to adjust its properties and behavior.

It is strongly recommended to read this article before using this call.

API object methods:

    remove(): Removes the position from the chart. You can’t this API-object after the call.
    onModify(callback) / onModify(data, callback)
    onMove(callback) / onMove(data, callback)
    onCancel(callback) / onCancel(data, callback)

API object has a set of properties listed below. Each property should be used through respective accessors. For example, if you wish to work with the Extend Left property, then use getExtendLeft() of setExtendLeft() methods.

    General properties:
    Property 	Type 	Supported Values 	Default Value
    Price 	Double 	Double 	0.0
    Text 	String 	String 	""
    Tooltip 	String 	String 	""
    Modify Tooltip 	String 	String 	""
    Cancel Tooltip 	String 	String 	""
    Quantity 	String 	String 	""
    Editable 	Boolean 	Boolean 	true

    Horizontal line properties:
    Property 	Type 	Supported Values 	Default Value
    Extend Left 	Boolean 	"inherit" or Boolean 	True
    Line Length 	Integer 	"inherit" or 0 .. 100 	0
    Line Style 	Integer 	"inherit" or 0 .. 2 	2
    Line Width 	Integer 	"inherit" or 1 .. 4 	1

    Fonts:
    Property 	Type 	Default Value
    Body Font 	String 	"bold 7pt Verdana"
    Quantity Font 	String 	"bold 7pt Verdana"

    Colors:
    Property 	Type 	Default Value
    Line Color 	String 	"rgb(255, 0, 0)"
    Body Border Color 	String 	"rgb(255, 0, 0)"
    Body Background Color 	String 	"rgba(255, 255, 255, 0.75)"
    Body Text Color 	String 	"rgb(255, 0, 0)"
    Quantity Border Color 	String 	"rgb(255, 0, 0)"
    Quantity Background Color 	String 	"rgba(255, 0, 0, 0.75)"
    Quantity Text Color 	String 	"rgb(255, 255, 255)"
    Cancel Button Border Color 	String 	"rgb(255, 0, 0)"
    Cancel Button Background Color 	String 	"rgba(255, 255, 255, 0.75)"
    Cancel Button Icon Color 	String 	"rgb(255, 0, 0)"

Example:

```javascript
widget.chart().createOrderLine()
    .setTooltip("Additional order information")
    .setModifyTooltip("Modify order")
    .setCancelTooltip("Cancel order")
    .onMove(function() {
        this.setText("onMove called");
    })
    .onModify("onModify called", function(text) {
        this.setText(text);
    })
    .onCancel("onCancel called", function(text) {
        this.setText(text);
    })
    .setText("STOP: 73.5 (5,64%)")
    .setQuantity("2");
```
