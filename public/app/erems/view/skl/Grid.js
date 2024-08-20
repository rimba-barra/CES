Ext.define('Erems.view.skl.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.sklgrid',
    store: 'Skl',
    bindPrefixName: 'Skl',
    newButtonLabel: 'New S K L',
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
                    itemId: 'colms_kawasan',
                    width: 100,
                    align: 'right',
                    dataIndex: 'cluster',
                    text: 'Cluster'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_block',
                    width: 100,
                    dataIndex: 'block',
                    hideable: false,
                    text: 'Block Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_number',
                    width: 100,
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Unit No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cust_name',
                    width: 150,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Customer Name'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_total_payment',
                    width: 150,
                    dataIndex: 'total_payment',
                    align: 'right',
                    hideable: false,
                    text: 'Total Payment'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_remaining_balance_total',
                    width: 150,
                    dataIndex: 'remaining_balance_total',
                    align: 'right',
                    hideable: false,
                    text: 'Remaining Balance'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_remaining_denda_total',
                    width: 150,
                    dataIndex: 'remaining_denda_total',
                    align: 'right',
                    hideable: false,
                    text: 'Remaining Denda'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_type_name',
                    width: 150,
                    dataIndex: 'type_name',
                    hideable: false,
                    text: 'Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_uangmukatype',
                    width: 150,
                    dataIndex: 'uangmukatype',
                    hideable: false,
                    text: 'Source'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_pricetype',
                    width: 100,
                    dataIndex: 'pricetype',
                    hideable: false,
                    text: 'Price Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_homephone',
                    width: 150,
                    hideable: false,
                    dataIndex: 'customer_homephone',
                    text: 'Home Phone'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_customer_mobilephone',
                    width: 150,
                    hideable: false,
                    dataIndex: 'customer_mobilephone',
                    text: 'Handphone'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_customer_address',
                    width: 150,
                    hideable: false,
                    dataIndex: 'customer_address',
                    text: 'Address'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchaseletter_no',
                    width: 150,
                    hideable: false,
                    dataIndex: 'purchaseletter_no',
                    text: 'Purchase Letter No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchase_date',
                    width: 150,
                    dataIndex: 'purchase_date',
                    hideable: false,
                    text: 'Purchase Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_harga_jual',
                    width: 150,
                    dataIndex: 'harga_jual',
                    align: 'right',
                    hideable: false,
                    text: 'Sales Price'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_skl_date',
                    width: 150,
                    dataIndex: 'skl_date',
                    hideable: false,
                    text: 'SKL Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_skl_no',
                    width: 150,
                    hideable: false,
                    dataIndex: 'skl_no',
                    text: 'SKL No'
                },
                /*{
                    xtype: 'gridcolumn',
                    itemId: 'colms_addon',
                    width: 150,
                    dataIndex: 'addon',
                    hideable: false,
                    text: 'Added Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },*/

                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },

    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName + 'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                },
                {
                    text: 'View',
                    iconCls: 'icon-search',
                    className: 'view',
                    bindAction: me.bindPrefixName + 'Read',
                    altText: 'View',
                    tooltip: 'View'
                }
            ]
        };
        return ac;
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
                        action: 'create',
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: me.newButtonLabel
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: true,
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
                        hidden: true,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'print',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'PrintData',
                        iconCls: 'icon-print',
                        text: 'Print SKL'
                    },
                    {
                        xtype: 'button',
                        action: 'print_doc',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnPrintdoc',
                        margin: '0 5 0 0',
                        // bindAction: me.bindPrefixName + 'PrintData',
                        iconCls: 'icon-print',
                        text: 'Print SKL'
                    }
                ]
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
    }
});