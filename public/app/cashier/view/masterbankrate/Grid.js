Ext.define('Cashier.view.masterbankrate.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.masterbankrategrid',
    store: 'Masterbankrate',
    bindPrefixName: 'Masterbankrate',
    itemId: 'MasterbankrateGrid',
    title: 'Bank Rate',
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
                    hidden: true,
                    value: 'default'
                },
                {
                    xtype: 'gridcolumn',
                    width: 300,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'projectpt_name',
                    hideable: false,
                    text: 'PT'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'coaname',
                    titleAlign: 'left',
                    align: 'left',
                    width: 250,
                    hideable: false,
                    text: 'Bank'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'subgl_name',
                    titleAlign: 'left',
                    align: 'left',
                    width: 250,
                    hideable: false,
                    text: 'Sub GL'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'rate',
                    titleAlign: 'left',
                    align: 'left',
                    width: 100,
                    hideable: false,
                    text: 'Rate'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'periode',
                    titleAlign: 'left',
                    align: 'left',
                    width: 200,
                    hideable: false,
                    text: 'Period',
                    renderer: function(value, meta, record) {
                        return Ext.Date.format(record.data.date_from, 'd M Y') + ' - ' + Ext.Date.format(record.data.date_until, 'd M Y');
                    }
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    // generateDockedItems: function () {
    //     var me = this;
    //     var dockedItems = [
    //         {
    //             xtype: 'toolbar',
    //             dock: 'top',
    //             height: 28,
    //             items: [
    //                 {
    //                     text: 'Add',
    //                     itemId: 'btnAdd',
    //                     action: 'create',
    //                     iconCls: 'icon-add',
    //                     bindAction: me.bindPrefixName + 'Create'
    //                 },
    //                 {
    //                     text: 'Edit',
    //                     itemId: 'btnEdit',
    //                     action: 'update',
    //                     iconCls: 'icon-edit',
    //                     disabled: true,
    //                     bindAction: me.bindPrefixName + 'Update'
    //                 },
    //                 {
    //                     text: 'Delete Selected',
    //                     itemId: 'btnDelete',
    //                     action: 'destroy',
    //                     iconCls: 'icon-delete',
    //                     disabled: true,
    //                     bindAction: me.bindPrefixName + 'Delete'
    //                 }
    //             ]
    //         },
    //         {
    //             xtype: 'pagingtoolbar',
    //             dock: 'bottom',
    //             id: 'pagingmasterbanktype',
    //             width: 360,
    //             displayInfo: true,
    //             store:'Masterbanktype'
    //         }
    //     ];
    //     return dockedItems;
    // },
    // generateActionColumn: function () {
    //     var me = this;
    //     var ac = {
    //         xtype: 'actioncolumn',
    //         width: 50,
    //         hidden: false,
    //         resizable: false,
    //         align: 'right',
    //         items: [
    //             {
    //                 defaultIcon: 'icon-edit',
    //                 iconCls: ' ux-actioncolumn icon-edit act-update',
    //                 action: 'update',
    //                 altText: 'Edit',
    //                 tooltip: 'Edit'
    //             },
    //             {
    //                 defaultIcon: 'icon-delete',
    //                 action: 'destroy',
    //                 iconCls: 'ux-actioncolumn icon-delete act-destroy',
    //                 altText: 'Delete',
    //                 tooltip: 'Delete'
    //             }
    //         ]
    //     }

    //     return ac;

    // },
});


