Ext.define('Erems.view.masterdocumentcustomer.GridDocumentPhone',{
    extend:'Erems.library.template.view.GridDS2',
    alias:'widget.masterdocumentcustomergriddocumentphone',
    storeConfig:{
        id:'MasterCustomerGridDocumentStore',
        idProperty:'customerphone_id',
        extraParams:{
            mode_read:'documentsPhone'
        }
    },
    bindPrefixName:'masterdocumentcustomer',
   // itemId:'',
    height:250,
    newButtonLabel:'New Customer Phone',
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
                   
                    width: 200,
                    dataIndex: 'department_name',
                    text: 'Department'
                },
                {
                    xtype: 'gridcolumn',
                    width: 75,
                    dataIndex: 'phone',
                    text: 'Phone'
                },
                {
                    xtype: 'gridcolumn',
                    width: 300,
                    dataIndex: 'phone_description',
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'Addon',
                    text: 'Addon'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'user_email',
                    text: 'Addby'
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


