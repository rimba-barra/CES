Ext.define('Erems.view.proseswhatsapp.Grid',{
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterSMSGridStore',
        idProperty: 'whatsapp_id',
        extraParams: {}
    },
    alias:'widget.proseswhatsappgrid',
    
    bindPrefixName:'Proseswhatsapp',
   // itemId:'',
    newButtonLabel:'New SMS',
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
                    dataIndex: 'customer_name',
                    text: 'Customer Name'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'unit_unit_number',
                    text: 'Unit Number'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'purchaseletter_purchaseletter_no',
                    text: 'Purchaseletter Number'
                },
                {
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'process_date',
                    width:80,
                    text: 'Process Date'
                },
                
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'whatsapp_phonenumber',
                    text: 'Phone Number'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'whatsappcategory',
                    text: 'Category'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'notes',
                    width:380,
                    text: 'Notes'
                },
                /*
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'return_code',
                    width:100,
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'status',
                    width:100,
                    text: 'API Status'
                },
                */
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'readstatus',
                    width:80,
                    text: 'Status'
                },
                {
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'sent_date',
                    width:80,
                    text: 'Sent Date'
                },
                
               me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateActionColumn: function() {
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
                    // added by rico 04102022
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
                    // added by rico 04102022
                    {
                        xtype: 'button',
                        action: 'view',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnView',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Preview',
                        bindAction: me.bindPrefixName + 'Read',
                    },
                    {
                        xtype: 'button',
                        action: 'send_wa',
                        itemId: 'btnSendWA',
                        disabled: true,
                        margin: '0 5 0 0',
                        icon: document.URL + 'app/main/images/icons/phone.png', // Use a URL in the icon config
                        text: 'Send selected'
                    },
//                    {
//                        xtype: 'button',
//                        action: 'excel_all',
//                        margin: '0 5 0 0',
//                        iconCls: 'icon-new',
//                        disabled: true,
//                        text: 'Export all'
//                    },
                    {
                        xtype: 'textfield',
                        margin: '0 5 0 0',
                        itemId: 'textSaldoProses',
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
    },
});


