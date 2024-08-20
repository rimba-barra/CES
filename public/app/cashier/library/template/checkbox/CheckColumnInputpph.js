/**
 * A Column subclass which renders a checkbox in each column cell which toggles the truthiness of the associated data field on click.
 *
 * Example usage:
 * 
 *    // create the grid
 *    var grid = Ext.create('Ext.grid.Panel', {
 *        ...
 *        columns: [{
 *           text: 'Foo',
 *           ...
 *        },{
 *           xtype: 'checkcolumn',
 *           text: 'Indoor?',
 *           dataIndex: 'indoor',
 *           width: 55
 *        }]
 *        ...
 *    });
 *
 */
 Ext.define('Cashier.library.template.checkbox.CheckColumnInputpph', {
    extend: 'Ext.grid.column.Column',
    alternateClassName: 'Ext.ux.CheckColumn',
    alias: 'widget.checkcolumninputpph',

    /**
     * @cfg
     * @hide
     * Overridden from base class. Must center to line up with editor.
     */
    align: 'center',

    /**
     * @cfg {Boolean} [stopSelection=true]
     * Prevent grid selection upon mousedown.
     */
    stopSelection: true,

    tdCls: Ext.baseCSSPrefix + 'grid-cell-checkcolumn',
    isChecked: false,
    constructor: function() {
        this.addEvents(
            /**
             * @event beforecheckchange
             * Fires when before checked state of a row changes.
             * The change may be vetoed by returning `false` from a listener.
             * @param {Ext.ux.CheckColumn} this CheckColumn
             * @param {Number} rowIndex The row index
             * @param {Boolean} checked True if the box is to be checked
             */
            'beforecheckchange',
            /**
             * @event checkchange
             * Fires when the checked state of a row changes
             * @param {Ext.ux.CheckColumn} this CheckColumn
             * @param {Number} rowIndex The row index
             * @param {Boolean} checked True if the box is now checked
             */
            'checkchange'
        );
        this.scope = this;
        this.callParent(arguments);
    },

    /**
     * @private
     * Process and refire events routed from the GridView's processEvent method.
     */
    processEvent: function(type, view, cell, recordIndex, cellIndex, e, record, row) {
        var me = this,
            key = type === 'keydown' && e.getKey(),
            mousedown = type == 'mousedown';

        if (!me.disabled && (mousedown || (key == e.ENTER || key == e.SPACE))) {
            var dataIndex = me.dataIndex,
                checked = !record.get(dataIndex);

            if (mousedown && !Ext.fly(e.getTarget()).hasCls('x-grid-checkcolumninputpph')) {
                return !me.stopSelection;
            } else {
                // Allow apps to hook beforecheckchange
                if (me.fireEvent('beforecheckchange', me, recordIndex, checked) !== false) {
                    record.set(dataIndex, checked);
                    me.fireEvent('checkchange', me, recordIndex, checked);

                    var dataval = (checked === true) ? 1 : 0;
                    record.set(dataIndex, dataval);

                    // Mousedown on the now nonexistent cell causes the view to blur, so stop it continuing.
                    if (mousedown) {
                        e.stopEvent();
                    }

                    // Selection will not proceed after this because of the DOM update caused by the record modification
                    // Invoke the SelectionModel unless configured not to do so
                    if (!me.stopSelection) {
                        view.selModel.selectByPosition({
                            row: recordIndex,
                            column: cellIndex
                        });
                    }

                    // Prevent the view from propagating the event to the selection model - we have done that job.
                    return false;
                } else {
                    // Prevent the view from propagating the event to the selection model if configured to do so.
                    return !me.stopSelection;
                }
            }
        } else {
            return me.callParent(arguments);
        }
    },

    /**
     * Enables this CheckColumn.
     * @param {Boolean} [silent=false]
     */
    onEnable: function(silent) {
        var me = this;

        me.callParent(arguments);
        me.up('tablepanel').el.select('.' + Ext.baseCSSPrefix + 'grid-cell-' + me.id).removeCls(me.disabledCls);
        if (!silent) {
            me.fireEvent('enable', me);
        }
    },

    /**
     * Disables this CheckColumn.
     * @param {Boolean} [silent=false]
     */
    onDisable: function(silent) {
        var me = this;

        me.callParent(arguments);
        me.up('tablepanel').el.select('.' + Ext.baseCSSPrefix + 'grid-cell-' + me.id).addCls(me.disabledCls);
        if (!silent) {
            me.fireEvent('disable', me);
        }
    },

    // Note: class names are not placed on the prototype bc renderer scope
    // is not in the header.
    renderer : function(value, meta, record, rowIndex, colIndex) {
        var me = this;
        var checkbox, row;

        row = record['data'];
        
        var isChecked = false;
        var isDisabled = "";
        if (row.flag_pph == 1 && me.text == "Flag PPH") {
            isChecked = true;
        } else {
            isChecked = false;
        }

        if (colIndex == 0) {
            isDisabled = "disabled";
        } else {
            isDisabled = "";
        }

        checkbox = "<center>";
        checkbox = checkbox + "<input type='checkbox' "+isDisabled+" " + (isChecked ? "checked" : '') + " id='"+ me.id +"_" +rowIndex+ "_"+colIndex+"' class='x-grid-checkcolumninputpph'/>";
        checkbox = checkbox + "</center>";
        return checkbox;
    }
});