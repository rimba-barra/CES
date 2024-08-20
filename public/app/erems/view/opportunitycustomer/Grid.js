Ext.define('Erems.view.opportunitycustomer.Grid',{
    extend:'Erems.library.template.view.GridDS2',
    alias:'widget.opportunitycustomergrid',
    storeConfig:{
        id:'MasterCustomerGridStore',
        idProperty:'opportunitycustomer_id',
        extraParams:{}
    },
   // store:'Opportunitycustomer',
    bindPrefixName:'Opportunitycustomer',
   // itemId:'',
    newButtonLabel:'New Customer',
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
                    xtype: 'rownumberer',
                    width: 30
                },                
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_addby',
                    width: 120,
                    dataIndex: 'addname',
                    hideable: false,
                    text: 'Sales'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_downline_id',
                    width: 120,
                    dataIndex: 'downline_name',
                    hideable: false,
                    text: 'Downline'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_name',
                    width: 150,
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
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_home_phone2',
                    width: 110,
                    dataIndex: 'home_phone2',
                    hideable: false,
                    text: 'Home Phone 2'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_mobile_phone',
                    width: 110,
                    dataIndex: 'mobile_phone',
                    hideable: false,
                    text: 'Mobile Phone'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_mobile_phone2',
                    width: 110,
                    dataIndex: 'mobile_phone2',
                    hideable: false,
                    text: 'Mobile Phone 2'
                },
                {
                    xtype: 'gridcolumn',
                    width: 310,
                    dataIndex: 'address',
                    text: 'Address'
                },
		{
                    xtype: 'gridcolumn',
                    itemId: 'colms_modiname',
                    width: 130,
                    dataIndex: 'Addon',
                    hideable: false,
                    text: 'Date Registration'
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
                        action: 'excel_all',
                        margin: '0 5 0 0',
                        iconCls: 'icon-excel',
                        text: 'Export Excel'
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
            // ,
            // {
            //     dock: 'bottom',
            //     xtype: 'pagingtoolbar',
            //     store: this.getStore(),
            //     displayInfo: true,
            //     plugins: Ext.create('PagingToolbarPageSize')
            // }
        ];
        return dockedItems;
    },
});


