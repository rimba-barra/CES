Ext.define('Cashier.view.offsetreport.Grid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.offsetreportgrid',
    bindPrefixName: 'Offsetreport',
    // store: 'Coa',
    store: Ext.create('Ext.data.Store', {
        storeId:'tempCoaSelectedStore',
        fields:['coa_id', 'type', 'coa', 'name', 'kelsub', 'description'],
        data:{},
        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                root: 'items'
            }
        }
    }),
    height: 200,
    newButtonLabel: 'New',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'coa_id',
                    hidden: true
                },
                {
                    xtype: 'gridcolumn',
                    width: 50,
                    dataIndex: 'type',
                    text: 'Type',
                    align: 'center'
                },
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    dataIndex: 'coa',
                    text: 'COA',
                    align: 'center'
                },
                {
                    xtype: 'gridcolumn',
                    width: 250,
                    dataIndex: 'name',
                    text: 'COA Name'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'kelsub',
                    text: 'Sub Group Code',
                    align: 'center'
                },
                {
                    xtype: 'gridcolumn',
                    width: 160,
                    dataIndex: 'description',
                    text: 'Sub Group Name'
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
                items: [
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: false,
                        hidden: false,
                        itemId: 'btnDelete',
                        margin: '0 5 0 0',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected',
                    },
                    {
                        xtype: 'button',
                        action: 'reset',
                        disabled: false,
                        hidden: false,
                        itemId: 'btnReset',
                        margin: '0 5 0 0',
                        iconCls: 'icon-reset',
                        text: 'Clear Data',
                    }
                ]
            },
            // {
            //     xtype: 'pagingtoolbar',
            //     dock: 'bottom',
            //     width: 360,
            //     displayInfo: true,
            //     store: this.getStore()
            // }
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: false,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    action: 'delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }

            ]
        };
        return ac;
    },
});


