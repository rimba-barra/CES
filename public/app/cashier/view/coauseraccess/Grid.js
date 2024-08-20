Ext.define('Cashier.view.coauseraccess.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.coauseraccessgrid',
    store: 'Coa',
    bindPrefixName: 'Coauseraccess',
    itemId: 'Coauseraccess',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },           
            columns: [
                {
                    xtype: 'rownumberer',
                    resizable:true,
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    width: 120,
                    dataIndex: 'coa',
                    hideable: false,
                    text: 'Coa'
                    ,renderer : function (value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail') + '" data-qwidth="500px"';
                        return value;
                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coaname',
                    width: 200,
                    dataIndex: 'coaname',
                    hideable: false,
                    text: 'Coa Name'
                     ,renderer : function (value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail') + '" data-qwidth="500px"';
                        return value;
                    }
                },
            ]
        });

        me.callParent(arguments);
    },
     generateDockedItems: function() {
        var me = this;
        var dockedItems = [           
           /* {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }*/
        ];
        return dockedItems;
    },
});


