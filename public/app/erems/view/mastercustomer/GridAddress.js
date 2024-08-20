Ext.define('Erems.view.mastercustomer.GridAddress',{
    extend:'Erems.library.template.view.GridDS2',
    alias:'widget.mastercustomergridaddress',
    storeConfig:{
        id:'MasterCustomerGridAddressStore',
        idProperty:'customeraddress_id',
        extraParams:{
            mode_read:'address'
        }
    },
   // store:'Mastercustomer',
    bindPrefixName:'Mastercustomer',
   // itemId:'',
    height:400,
    newButtonLabel:'New Address',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {

            },
           // selModel: new Ext.selection.Model({mode:"SINGLE"}),
           selModel: Ext.create('Ext.selection.CheckboxModel', {

            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                   
                    width: 200,
                   // align: 'right',
                    dataIndex: 'address',
                    text: 'Address'
                },{
                    xtype: 'booleancolumn',
                    width: 50,
                    resizable: false,
                    align: 'center',
                    dataIndex: 'is_default',
                    text: 'Default',
                    falseText: ' ',
                    trueText: '&#10003;'
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
                        //hidden: true,
                       // itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: me.newButtonLabel
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                       // disabled: true,
                       // hidden: true,
                       // itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                       // disabled: true,
                      //  hidden: true,
                       // itemId: 'btnDelete',
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
    },
});


