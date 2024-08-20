Ext.define('Erems.view.schedulemonitor.Schedulegrid', {
    alias       : 'widget.schedulemonitorschedulegrid',
    extend      : 'Erems.library.template.view.GridDS2',
    storeConfig : {
        id          : 'SencMonScheduleGridStore',
        idProperty  : 'schedule_id',
        extraParams : { mode_read : 'schedule' }
    },
    bindPrefixName : 'Schedulemonitor',
    newButtonLabel : '',
    height         : 250,
    columnLines    : true,
    plugins        : [
        Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit : 1 })
    ],
    initComponent : function () {
        var me = this;
        var cbf = new Erems.template.ComboBoxFields();

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor : 1,
            autoCancel         : false
        });

        Ext.applyIf(me, {
            dockedItems : me.generateDockedItems(),
            plugins     : [rowEditing],
            viewConfig  : { stripeRows : true },
            features    : [{ ftype: 'summary' }],
            columns     : [
                {
                    xtype : 'rownumberer'

                },
                {
                    xtype           : 'gridcolumn',
                    itemId          : 'colms_type',
                    width           : 60,
                    dataIndex       : 'scheduletype_scheduletype',
                    hideable        : false,
                    text            : 'Type',
                    summaryRenderer : function () {
                        return '<b>Totals:</b>';
                    }
                },

                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_ke',
                    width     : 40,
                    dataIndex : 'termin',
                    hideable  : false,
                    text      : 'Index'
                },
                {
                    xtype        : 'datecolumn',
                    text         : 'Duedate',
                    dataIndex    : 'duedate',
                    type         : 'date',
                    itemId       : 'colms_code',
                    width        : 140,
                    format       : 'd-m-Y H:i:s.u',
                    altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                    submitFormat : 'Y-m-d H:i:s.u',
                    hideable     : false,
                    editor       : {
                        xtype        : 'datefield',
                        format       : 'd-m-Y H:i:s.u',
                        altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                        submitFormat : 'Y-m-d H:i:s.u',
                        listeners: {
                            select : function (picker) {
                                var duedate = new Date(picker.getValue());
                                var nowdate = new Date(new Date());

                                duedate.setHours(nowdate.getHours());
                                duedate.setMinutes(nowdate.getMinutes());
                                duedate.setSeconds(nowdate.getSeconds());
                                duedate.setMilliseconds(nowdate.getMilliseconds());

                                picker.setValue(Ext.Date.format(duedate, picker.format));
                            }
                        }
                    }
                },
                {
                    xtype       : 'numbercolumn',
                    itemId      : 'colms_Recieveable',
                    width       : 100,
                    dataIndex   : 'amount',
                    hideable    : false,
                    align       : 'right',
                    text        : 'Amount',
                    summaryType : 'sum',
                    renderer    : function (v) {
                        return Ext.util.Format.currency(v, ' ', EREMS_GLOBAL_PRECISION);
                    },
                    summaryRenderer : function (value, summaryData, dataIndex) {
                        return '<b>'+accounting.formatMoney(value)+'</b>';
                    }
                },
                {
                    xtype       : 'numbercolumn',
                    itemId      : 'colms_rest',
                    width       : 100,
                    dataIndex   : 'remaining_balance',
                    hideable    : false,
                    align       : 'right',
                    text        : 'Remaining Balance',
                    summaryType : 'sum',
                    editor      : { xtype : 'xmoneyfieldEST' },
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        if(typeof value != 'undefined'){
                            var value = accounting.unformat(value);
                            record.set('remaining_balance', value); // set data unformating
                            return accounting.formatMoney(value);
                        }
                    },
                    summaryRenderer : function (value, summaryData, dataIndex) {
                        return '<b>'+accounting.formatMoney(value)+'</b>';
                    }
                },
                {
                    xtype       : 'numbercolumn',
                    itemId      : 'colms_remaining_denda',
                    width       : 120,
                    dataIndex   : 'remaining_denda',
                    hideable    : false,
                    align       : 'right',
                    text        : 'Remaining Denda',
                    summaryType : 'sum',
                    editor      : { xtype : 'xmoneyfieldEST' },
                    renderer : function (value, metaData, record, rowIndex, colIndex, store, view) {
                        if(typeof value != 'undefined'){
                            var value = accounting.unformat(value);
                            record.set('remaining_denda', value); // set data unformating
                            return accounting.formatMoney(value);
                        }
                    },
                    summaryRenderer : function (value, summaryData, dataIndex) {
                        return '<b>'+accounting.formatMoney(value)+'</b>';
                    },
                },
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;

        var dockedItems = [
            {
                xtype  : 'toolbar',
                dock   : 'top',
                height : 28,
                items  : [
                    {
                        xtype    : 'button',
                        action   : 'update',
                        itemId   :'btnEditSchedule',
                        hidden   :true,
                        margin   : '0 5 0 0',
                        iconCls  : 'icon-edit',
                        text     : 'Update',
                        disabled :true
                    },
                    '->',
                    {
                        xtype : 'label',
                        text  : 'Schedule'
                    },
                ]
            },
            {
                xtype       : 'pagingtoolbar',
                dock        : 'bottom',
                width       : 360,
                displayInfo : true,
                store       : this.getStore()
            }
        ];
        return dockedItems;
    }
});