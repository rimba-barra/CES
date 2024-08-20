Ext.define('Erems.view.cancellation.Schedulegrid', {
    extend          : 'Erems.library.template.view.GridDS2',
    alias           : 'widget.cancellationschedulegrid',
    store          : 'CancellationSchedule',
    bindPrefixName : 'Cancellation',
    newButtonLabel : 'New Purchaseletter_no',
    height         : 200,
    initComponent: function() {
        var me         = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems : me.generateDockedItems(),
            viewConfig  : {},
            columns     : [
                {
                    xtype : 'rownumberer'
                },
                {
                    xtype     : 'datecolumn',
                    type      : 'date',
                    itemId    : 'colms_duedate',
                    width     : 70,
                    format    : 'd-m-Y',
                    dataIndex : 'duedate',
                    hideable  : false,
                    text      : 'Duedate'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_type',
                    width     : 35,
                    dataIndex : 'scheduletype',
                    hideable  : false,
                    text      : 'Type'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_termin',
                    width     : 45,
                    dataIndex : 'termin',
                    hideable  : false,
                    text      : 'Queue'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_amount',
                    width     : 130,
                    dataIndex : 'amount',
                    hideable  : false,
                    align     : 'right',
                    text      : 'Amount',
                    renderer : function(v) {
                        return Ext.util.Format.currency(v, ' ', EREMS_GLOBAL_PRECISION);
                    },
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_interest',
                    width     : 70,
                    dataIndex : 'interset',
                    align     : 'right',
                    hideable  : false,
                    text      : 'Interest'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_remaining_balance',
                    width     : 130,
                    dataIndex : 'remaining_balance',
                    hideable  : false,
                    align     : 'right',
                    text      : 'Remaining Balance',
                    renderer  : function(v) {
                        return Ext.util.Format.currency(v, ' ', EREMS_GLOBAL_PRECISION);
                    },
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_interestrest',
                    width     : 120,
                    dataIndex : 'interestrest',
                    hideable  : false,
                    align     : 'right',
                    text      : 'Remaining Balance Int'
                },
                {
                    xtype     : 'gridcolumn',
                    width     : 100,
                    dataIndex : 'sourcemoney_sourcemoney',
                    hideable  : false,
                    text      : 'Source Money'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_recommendationdate',
                    width     : 120,
                    dataIndex : 'recomendationdate',
                    hideable  : false,
                    text      : 'Recomendation Date'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_persentase_npv',
                    width     : 120,
                    dataIndex : 'persentase_npv',
                    hideable  : false,
                    text      : '% NPV' ,
                    hidden    : true 
                },
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: []
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }
        ];
        return dockedItems;
    },
});