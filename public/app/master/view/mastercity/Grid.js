Ext.define('Master.view.mastercity.Grid', {
    extend: 'Master.library.template.view.GridDS2',
    alias: 'widget.mastercitygrid',
    storeConfig: {
        id: 'mastercityGridStore',
        idProperty: 'city_id',
        extraParams: {}
    },
    bindPrefixName: 'Mastercity',
    newButtonLabel: 'New City',
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
                    width: 100,
                    dataIndex: 'city_name',
                    hideable: false,
                    text: 'Kota'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'citytype_city_type_name',
                    hideable: false,
                    text: 'Type'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'provinsi_province_name',
                    hideable: false,
                    text: 'Provinsi'
                },
               
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'country_country_name',
                    hideable: false,
                    text: 'Negara'
                },
               
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [

//                    {
//                        xtype: 'button',
//                        action: 'create',
//                        hidden: true,
//                        itemId: 'btnNew',
//                        id:'paymentMasterSBYID',
//                        margin: '0 5 0 0',
//                        iconCls: 'icon-new',
//                        bindAction: me.bindPrefixName + 'Create',
//                        text: me.newButtonLabel
//                    },
//
//                    {
//                        xtype: 'button',
//                        action: 'update',
//                        disabled: true,
//                        hidden: true,
//                        itemId: 'btnEdit',
//                        margin: '0 5 0 0',
//                        id:'paymentMasterSBYUpdateID',
//                        iconCls: 'icon-edit',
//                        text: 'Edit',
//                        bindAction: me.bindPrefixName + 'Update'
//                    },
//                    {
//                        xtype: 'button',
//                        action: 'destroy',
//                        disabled: true,
//                        hidden: true,
//                        itemId: 'btnDelete',
//                        bindAction: me.bindPrefixName + 'Delete',
//                        iconCls: 'icon-delete',
//                        text: 'Delete Selected'
//                    },
                    
                   
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            },
            {
                //  bodyPadding: 10,
                padding: '0 0 0 0',
                dock: 'bottom',
                layout: 'hbox',
                bodyStyle: 'border:0px',
                width: '100%',
                id: 'testModalID',
                html: ''
            },
          
           
        ];
        return dockedItems;
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
                },
                {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                  
                    bindAction: me.bindPrefixName + 'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                },
				{ //========= added on march 15th 2016 by Tirtha
                    text: 'View',
                    iconCls: 'icon-search',
                    className:'view',
                  
                    bindAction: me.bindPrefixName + 'Read',
                    altText: 'View',
                    tooltip: 'View'
                }
            ]
        };
        return ac;
    },
});
