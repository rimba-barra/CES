Ext.define('Erems.view.prosessms.Grid',{
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterSMSGridStore',
        idProperty: 'sms_id',
        extraParams: {}
    },
    alias:'widget.prosessmsgrid',
    
    bindPrefixName:'Prosessms',
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
                    dataIndex: 'sms_phonenumber',
                    text: 'Phone Number'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'smscategory_smscategory',
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
                        action: 'process',
                        hidden: false,
                          disabled: true,
                       // itemId: 'btnPrint',
                        margin: '0 5 0 0',
                      //  bindAction: me.bindPrefixName + 'Print',
                        iconCls: 'icon-gear',
                        text: 'Process'
                    },
                    {
                        xtype: 'button',
                        action: 'send_sms',
                        itemId: 'btnSendSms',
                        // disabled: true,
                        margin: '0 5 0 0',
                        icon: document.URL + 'app/main/images/icons/phone.png', // Use a URL in the icon config
                        text: 'Send selected'
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
                        action: 'excel',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Export this page'
                    },
                    {
                        xtype: 'button',
                        action: 'excel_selected',
                        itemId: 'btnExportSelected',
                        // disabled: true,
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Export selected'
                    },
                     {
                        xtype: 'button',
                        action: 'excel_all',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Export all'
                    },
                    {
                        xtype: 'button',
                        action: 'csv_all',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Export all (csv)'
                    },
                    {
                        xtype: 'textfield',
                        margin: '0 5 0 0',
                        itemId: 'textSaldo',
                        value: 'Saldo: ?',
                        width: 250,
                        readOnly: true
                    },
                    {
                        xtype    : 'button',
                        action   : 'send_email',
                        itemId   : 'btnSendEmail',
                        hidden   : true,
                        disabled : true,
                        margin   : '0 5 0 0',
                        icon     : document.URL + 'app/main/images/icons/email.png', // Use a URL in the icon config
                        text     : 'Send Email'
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


