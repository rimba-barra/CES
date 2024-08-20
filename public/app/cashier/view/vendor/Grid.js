Ext.define('Cashier.view.vendor.Grid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.vendorgrid',
    store: 'Vendor',
    bindPrefixName: 'Vendor',
    itemId: 'Vendor',
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
                    itemId: 'colms_type_vendor',
                    width: 80,
                    dataIndex: 'type_vendor',
                    hideable: false,
                    text: 'Type',
                    renderer: function (value) {
                        if (value == 'external') {
                            return 'External Data';
                        } else if (value == 'internal') {
                            return 'Internal Data';
                        } else if (value == 'tenant') {
                            return 'Tenant';
                        } else {
                             return '-';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_vendorcode',
                    width: 80,
                    dataIndex: 'vendorcode',
                    hideable: false,
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_vendorname',
                    width: 200,
                    dataIndex: 'vendorname',
                    hideable: false,
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_address',
                    width: 300,
                    dataIndex: 'address',
                    hideable: false,
                    text: 'Address'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_jenisusaha',
                    width: 100,
                    dataIndex: 'jenisusaha',
                    hideable: false,
                    text: 'Business type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_office_phone',
                    width: 120,
                    dataIndex: 'office_phone',
                    hideable: false,
                    text: 'Office Phone'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_mobile_phone',
                    width: 120,
                    dataIndex: 'mobile_phone',
                    hideable: false,
                    text: 'Mobile Phone'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_fax',
                    width: 120,
                    dataIndex: 'fax',
                    hideable: false,
                    text: 'FAX'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_email',
                    width: 150,
                    dataIndex: 'email',
                    hideable: false,
                    text: 'Email'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_contactperson',
                    width: 150,
                    dataIndex: 'contactperson',
                    hideable: false,
                    text: 'Contact Person'
                },
                me.generateActionColumn()
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
                        hidden: true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'Print',
                        iconCls: 'icon-print',
                        text: 'Print / Save'
                    },
                    {
                        xtype: 'button',
                        action: 'export',
                        hidden: true,
                        itemId: 'btnExport',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'Export',
                        iconCls: 'icon-excel',
                        text: 'Export Data Vendor / Partner'
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
    },
});


