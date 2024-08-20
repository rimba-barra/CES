Ext.define('Cashier.view.masterreceipt.Grid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.masterreceiptgrid',
    bindPrefixName: 'Masterreceipt',
    storeConfig: {
        id: 'MasterreceiptGridStore',
        idProperty: 'receipt_id',
        extraParams: {module: 'masterreceipt'},
    },
    newButtonLabel: 'Add New',
    initComponent: function() {
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
                me.generateActionColumn(),
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_receipt_type',
                    width: 100,
                    dataIndex: 'receipt_type',
                    hideable: false,
                    align: 'center',
                    text: 'Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_prefix',
                    width: 150,
                    dataIndex: 'prefix_no',
                    hideable: false,
                    text: 'Prefix',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_receipt_no',
                    width: 150,
                    dataIndex: 'receipt_no',
                    hideable: false,
                    text: 'Receipt No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_status',
                    width: 50,
                    dataIndex: 'status',
                    align: 'center',
                    hideable: false,
                    text: 'Status',
                    renderer: function (value) {
                        if (value == 'NEW') {
                            return '<span style="color:blue">' + value +'</span>';
                        } else if (value == 'USED') {
                            return '<span style="color:green">'+ value +'</span>';
                        } else if (value == 'VOID') {
                            return '<span style="color:orange">'+ value +'</span>';
                        } else if (value == 'DELETE') {
                            return '<span style="color:red">'+ value +'</span>';
                        } else if (value == 'EXTERNAL-USED') {
                            return '<span style="color:brown" data-qtitle="Info" data-qwidth="200" '+ 
                            'data-qtip="Receipt yang digunakan di luar CES.">USED</span>';
                        }
                        
                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 150,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Remarks'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucherid',
                    width: 150,
                    dataIndex: 'voucherid',
                    hideable: false,
                    align: 'center',
                    text: 'Voucher ID'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_notes',
                    width: 150,
                    dataIndex: 'delete_reason',
                    hideable: false,
                    text: 'Notes',
                    renderer: function (value) {
                        if (value == '' || value == null) {
                            return '-';
                        } else {
                            return value;
                        }
                        
                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_addon',
                    width: 150,
                    dataIndex: 'addon',
                    hideable: false,
                    align: 'center',
                    text: 'Addon'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_addbyname',
                    width: 150,
                    dataIndex: 'addbyname',
                    hideable: false,
                    align: 'center',
                    text: 'Addby',
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
                        action: 'create',
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-add',
                        bindAction: me.bindPrefixName + 'Create',
                        text: 'Add Receipt Book'
                    },
                    {
                        xtype: 'button',
                        action: 'edit',
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
                        action: 'delete',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'tbseparator'
                    },
                    {
                        xtype: 'button',
                        action: 'void',
                        disabled: true,
                        hidden: false,
                        itemId: 'btnVoid',
                        bindAction: me.bindPrefixName + 'Void',
                        iconCls: 'icon-new',
                        text: 'Void'
                    },
                    {
                        xtype: 'button',
                        action: 'usereceipt',
                        disabled: true,
                        hidden: false,
                        itemId: 'btnUsereceipt',
                        bindAction: me.bindPrefixName + 'Use',
                        icon: 'app/main/images/icons/approve.png',
                        text: 'Use Receipt',
                        tooltip: 'Ubah Status Receipt menjadi USED (External), Receipt yang digunakan diluar CES.'
                    },
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
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 100,
            resizable: false,
            align: 'right',
            hideable: false,
            items: []
        };
        return ac;
    },
});