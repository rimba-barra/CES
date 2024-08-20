Ext.define('Cashier.view.setupcashflow.Gridcoasource', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.setupcashflowgridsource',
    store: 'Coa',
    title: 'Coa List',
    bindPrefixName: 'Setupcashflow',
    itemId: 'Setupcashflowgridsource',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItemscustome(),
            viewConfig: {
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    width: 120,
                    dataIndex: 'coa',
                    hideable: false,
                    text: 'Coa'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coaname',
                    width: 200,
                    dataIndex: 'coaname',
                    hideable: false,
                    text: 'Coa Name'
                },
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItemscustome: function () {
        var me = this;
        var dockedItems = [
            {
               /* xtype: 'pagingtoolbar',
                id: 'pagingtoolbargridcoasource',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: 'Coa'
                */
            }
        ];
        return dockedItems;
    },
});


