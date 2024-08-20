Ext.define('Erems.view.masterkomisi.Grid', {
    extend: 'Erems.library.template.view.GridDS2',
    alias: 'widget.masterkomisigrid',
    storeConfig: {
        id: 'MasterkomisiGridStore',
        idProperty: 'komisi_id',
        extraParams: {}
    },
    bindPrefixName: 'Masterkomisi',
    newButtonLabel: 'New Master Komisi',
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
                    width: 130,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',  
                    width: 130,
                    dataIndex: 'nama',
                    hideable: false,
                    text: 'Nama'
                },
                {
                    xtype: 'numbercolumn',
                    width: 100,
                    dataIndex: 'ybs',
                    hideable: false,
                    text: 'Komisi Ybs'
                },
                {
                    xtype: 'numbercolumn',
                    width: 100,
                    dataIndex: 'sales_co',
                    hideable: false,
                    text: 'Komisi Sales Co'
                },
                {
                    xtype: 'numbercolumn',
                    width: 100,
                    dataIndex: 'head_sales',
                    hideable: false,
                    text: 'Komisi Head Sales'
                },
                {
                    xtype: 'numbercolumn',
                    width: 100,
                    dataIndex: 'head_adm',
                    hideable: false,
                    text: 'Komisi Head Adm'
                },
                {
                    xtype: 'numbercolumn',
                    width: 100,
                    dataIndex: 'team',
                    hideable: false,
                    text: 'Komisi Team'
                },
               
           

               // me.generateActionColumn()
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

                    {
                        xtype: 'button',
                        action: 'create',
                        hidden: true,
                        itemId: 'btnNew',
                      //  id:'paymentEremsSBYID',
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
                       // id:'paymentEremsSBYUpdateID',
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
                        action: 'print',
                        hidden: true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',

                        iconCls: 'icon-print',
                        text: 'Print'
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
