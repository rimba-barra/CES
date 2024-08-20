Ext.define('Erems.view.masterdocumentcustomer.Grid',{
    extend:'Erems.library.template.view.GridDS2',
    alias:'widget.masterdocumentcustomergrid',
    storeConfig:{
        id:'MasterCustomerGridStore',
        idProperty:'customer_id',
        extraParams:{}
    },
   // store:'Mastercustomer',
    bindPrefixName:'Masterdocumentcustomer',
   // itemId:'',
    newButtonLabel:'New Document Customer',
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
                    itemId: 'colms_code',
                    width: 60,
                    align: 'right',
                    dataIndex: 'code',
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_name',
                    width: 100,
                    dataIndex: 'name',
                    hideable: false,
                    text: 'Customer Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_home_phone',
                    width: 110,
                    dataIndex: 'home_phone',
                    hideable: false,
                    text: 'Home Phone'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_office_phone',
                    width: 110,
                    dataIndex: 'office_phone',
                    hideable: false,
                    text: 'Office Phone'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_mobile_phone',
                    width: 110,
                    dataIndex: 'mobile_phone',
                    hideable: false,
                    text: 'Handphone'
                },
                //added by anas 15062021
                {
                    xtype: 'gridcolumn',
                    width: 110,
                    dataIndex: 'KTP_number',
                    text: 'No KTP'
                },
                //end added by anas
                {
                    xtype: 'gridcolumn',
                    width: 110,
                    dataIndex: 'address',
                    text: 'Address'
                },{
                    xtype: 'datecolumn',
                    width: 110,
                    format:'d-m-Y',
                    dataIndex: 'birthdate',
                    text: 'Birthdate'
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
                        name: 'btnEditName',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
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
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            // hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                // {
                //     text: 'Edit',
                //     iconCls: 'icon-edit',
                //     bindAction: me.bindPrefixName + 'Update',
                //     altText: 'Edit',
                //     tooltip: 'Edit',
                //     hidden:true
                // },
                // {
                //     text: 'Delete',
                //     iconCls: 'icon-delete',
                //     bindAction: me.bindPrefixName + 'Delete',
                //     altText: 'Delete',
                //     tooltip: 'Delete',
                //     hidden:true
                // }
            ]
        };
        return ac;
    }
});


