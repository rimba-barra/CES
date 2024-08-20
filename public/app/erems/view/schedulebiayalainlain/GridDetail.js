Ext.define('Erems.view.schedulebiayalainlain.GridDetail', {
    extend  : 'Erems.library.template.view.Grid',
    alias   : 'widget.schedulebiayalainlaingriddetail',
    store   : 'Schedulebiayalainlaindetail',
    height  : 200,
    plugins : [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    initComponent : function () {
        var me = this;

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor : 1,
            autoCancel         : false
        });

        Ext.applyIf(me, {
            dockedItems : me.generateDockedItems(),
            viewConfig  : {
            },
            columns : [
                {
                    xtype : 'rownumberer'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_biayalegalitas_schedule_id',
                    dataIndex : 'biayalegalitas_schedule_id',
                    hidden    : true,
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_biayalegalitas_id',
                    dataIndex : 'biayalegalitas_id',
                    hidden    : true,
                },
                {
                    xtype     : 'datecolumn',
                    type      : 'date',
                    itemId    : 'colms_due_date',
                    width     : 90,
                    format    : 'd-m-Y',
                    dataIndex : 'due_date',
                    hideable  : false,
                    text      : 'Due Date',
                    editor    : {
                        xtype      : 'datefield',
                        allowBlank : true,
                        format     : 'd/m/Y',
                    }
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_scheduletype',
                    width     : 150,
                    dataIndex : 'scheduletype',
                    hideable  : false,
                    text      : 'Type',
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_termin',
                    width     : 50,
                    dataIndex : 'termin',
                    hideable  : false,
                    text      : 'Index'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_amount',
                    width     : 100,
                    dataIndex : 'amount',
                    hideable  : false,
                    text      : 'Amount',
                    editor : {
                        xtype           : 'numberfield',
                        allowBlank      : true,
                        enableKeyEvents : true,
                        maskRe          : /[0-9\.]/,
                    },                    
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_remaining_balance',
                    width     : 150,
                    dataIndex : 'remaining_balance',
                    hideable  : false,
                    text      : 'Remaining Balance'
                },
                me.generateActionColumn()
            ],

        });

        me.callParent(arguments);
    },

    generateDockedItems: function () {

        var me = this;

        var dockedItems = [
           
        ];
        return dockedItems;
    },

    generateActionColumn: function () {

        var me = this;
        var ac = {
        };
        return ac;
    }


});