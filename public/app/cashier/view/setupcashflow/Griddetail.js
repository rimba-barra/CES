Ext.define('Cashier.view.setupcashflow.Griddetail', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.setupcashflowgriddetail',
    store: 'Mdsetupcashflow',
    bindPrefixName: 'Setupcashflow',
    itemId: 'Setupcashflowdetail',
    title: 'Detail',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    width: 180,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'coa',
                    hideable: false,
                    text: 'Coa'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coaname',
                    width: 300,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'coaname',
                    hideable: false,
                    text: 'Coa name'
                },
                me.generateActionColumndetail()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'destroy',                       
                        icon: 'app/main/images/icons/delete.png',
                        text: 'Delete Selected',
                        hidden: true
                    },
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'pagingsetupcashflowdetail',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }
        ];
        return dockedItems;
    },
    generateActionColumndetail: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: false,
            itemId: 'actioncolumndetail',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
              /*  {
                    altText: 'Delete',
                    tooltip: 'Delete',
                    icon: 'app/main/images/icons/delete.png',
                    handler: function (view, rowIndex, colIndex, item, e, record, row) {
                        this.fireEvent('deletedetail', view, rowIndex, colIndex, item, e, record, row, 'edit');
                    }
                }, */
            ]
        }
        return ac; 

    },
});


