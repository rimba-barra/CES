Ext.define('Erems.view.masterdocumentcustomer.GridDocumentKomunikasi',{
    extend:'Erems.library.template.view.GridDS2',
    alias:'widget.masterdocumentcustomergriddocumentkomunikasi',
    storeConfig:{
        id:'MasterCustomerGridDocumentStore',
        idProperty:'customer_komunikasi_id',
        extraParams:{
            mode_read:'documentsKomunikasi'
        }
    },
    bindPrefixName:'masterdocumentcustomer',
   // itemId:'',
    height:250,
    newButtonLabel:'New Log Komunikasi',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            viewConfig: {
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                   
                    width: 150,
                    dataIndex: 'email',
                    text: 'Email'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'department',
                    text: 'Department'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'phone',
                    text: 'Phone'
                },
                {
                    xtype: 'gridcolumn',
                    width: 300,
                    dataIndex: 'log_komunikasi',
                    text: 'Log Komunikasi'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'Addon',
                    text: 'Addon'
                }
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
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: me.newButtonLabel
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete'
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


