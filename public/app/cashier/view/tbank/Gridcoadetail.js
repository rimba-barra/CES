Ext.define('Cashier.view.tbank.Gridcoadetail', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.tbankcoadetailgrid',
    store: 'Tbankcoadetail',
    bindPrefixName: 'Tbank',
    itemId: 'Tbankcoadetail',
    title: 'Coa Detail',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItemscustome(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
             features: [
                {
                    ftype: 'summary',
                }
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    width: 100,
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'coa',
                    hideable: false,
                    text: 'COA'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coaname',
                    dataIndex: 'coaname',
                    titleAlign: 'center',
                    align: 'left',
                    width: 180,
                    hideable: false,
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    dataIndex: 'description',
                    titleAlign: 'center',
                    align: 'left',
                    width: 200,
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dataflow',
                    dataIndex: 'dataflow',
                    titleAlign: 'center',
                    align: 'center',
                    width: 100,
                    hideable: false,
                    text: 'Data flow'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    dataIndex: 'amount',
                    titleAlign: 'center',
                    align: 'right',
                    width: 150,
                    hideable: false,
                    text: 'Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    summaryType: 'sum',
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        var summaryvalue = Ext.util.Format.number(value, '0,000.00');
                        return  "Sum Total : " + summaryvalue;
                    }
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
generateDockedItemscustome: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                     {
                       defaultIcon: 'icon-add',
                       iconCls: ' ux-actioncolumn icon-add act-add',
                       action: 'copyfromkasbank',
                       text: 'Copy From Voucher Cash or Bank',
                       tooltip: 'Copy From Voucher Cash or Bank'
                   },
                    {
                       defaultIcon: 'icon-add',
                       iconCls: ' ux-actioncolumn icon-add act-add',
                       action: 'copyfromcia',
                       text: 'Copy From CIA',
                       tooltip: 'Copy From Cash in Advance'
                   },
                    {
                        text: 'Add new',
                        itemId: 'btnAdd',
                        action: 'create',
                        iconCls: 'icon-add',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: false,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: false,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },

                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'pagingtbankcoadetail',
                width: 360,
                displayInfo: true,
                store: 'Tbankcoadetail',
                hideRefresh: true,
                listeners: {
                    afterrender: function (tbar) {
                        if (tbar.hideRefresh) {
                            tbar.down('#refresh').hide();
                        }
                    }

                }
            }
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 50,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
                {
                    defaultIcon: 'icon-edit',
                    iconCls: ' ux-actioncolumn icon-edit act-update',
                    action: 'update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    defaultIcon: 'icon-delete',
                    action: 'destroy',
                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            ]
        }

        return ac;

    },
});


