Ext.define('Erems.view.topupwhatsapp.Grid',{
    alias:'widget.topupwhatsappgrid',
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'TopupwhatsappStore',
        idProperty: 'whatsapp_topup_id',
        extraParams: {}
    },
    newButtonLabel:'New Topup Whatsapp',
    bindPrefixName:'Topupwhatsapp',
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
                {
                    xtype: 'gridcolumn',
                    itemId: 'coltw_user_fullname',
                    dataIndex: 'user_fullname',
                    text: 'User'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'coltw_topup_date',
                    dataIndex: 'topup_date',
                    hideable: false,
                    text: 'Topup Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'coltw_nominal',
                    dataIndex: 'nominal',
                    align: 'right',
                    hideable: false,
                    text: 'Nominal'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'coltw_biaya',
                    dataIndex: 'biaya',
                    align: 'right',
                    hideable: false,
                    text: 'Biaya'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'coltw_saldo',
                    dataIndex: 'saldo',
                    align: 'right',
                    hideable: false,
                    text: 'Saldo'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'coltw_remaining_saldo',
                    dataIndex: 'remaining_saldo',
                    align: 'right',
                    hideable: false,
                    text: 'Remaining Saldo'
                },
                {
                    xtype: 'booleancolumn',
                    itemId: 'coltw_is_approve',
                    width: 50,
                    resizable: false,
                    align: 'center',
                    dataIndex: 'is_approve',
                    text: 'Approve',
                    falseText: ' ',
                    trueText: '&#10003;'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'coltw_approve_date',
                    width: 150,
                    dataIndex: 'approve_date',
                    hideable: false,
                    text: 'Approve Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y H:i:s'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'coltw_approve_fullname',
                    dataIndex: 'approve_fullname',
                    hideable: false,
                    text: 'Approve User'
                },
                {
                    xtype: 'booleancolumn',
                    itemId: 'coltw_is_reject',
                    width: 50,
                    resizable: false,
                    align: 'center',
                    dataIndex: 'is_reject',
                    text: 'Reject',
                    falseText: ' ',
                    trueText: '&#10003;'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'coltw_reject_date',
                    width: 150,
                    dataIndex: 'reject_date',
                    hideable: false,
                    text: 'Reject Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y H:i:s'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'coltw_reject_fullname',
                    dataIndex: 'reject_fullname',
                    hideable: false,
                    text: 'Reject User'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'coltw_addon',
                    width: 150,
                    dataIndex: 'Addon',
                    hideable: false,
                    text: 'Addon',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y H:i:s'),
                },
                
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
            renderer: function (value, metadata, record) {
                if (record.get('is_reject') == '' && record.get('is_approve') == '') {
                    this.items[0].disabled = false;
                    this.items[1].disabled = false;
                } else {
                    this.items[0].disabled = true;
                    this.items[1].disabled = true;
                }
            },
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
                }
            ]
        };
        return ac;
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
                        action: 'export_excel',
                        itemId: 'btnExport',
                        margin: '0 5 0 0',
                        iconCls: 'icon-print',
                        text: 'Export All'
                    },
                    {
                        xtype: 'textfield',
                        margin: '0 5 0 0',
                        itemId: 'textSaldoTopup',
                        value: 'Saldo: ?',
                        width: 250,
                        readOnly: true
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
    }
});


