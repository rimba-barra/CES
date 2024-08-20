Ext.define('Cashier.view.setupcashflow.Gridcoadestination', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.setupcashflowgridcoadestination',
    store: 'Coasetupdestination',
    bindPrefixName: 'Setupcashflow',
    itemId: 'Setupcashflowgriddestination',
    newButtonLabel: 'Add New',
    title: 'Coa Selected',
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
                    width: 600,
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
                id: 'pagingtoolbargridcoadestination',
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


