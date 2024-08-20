Ext.define('Erems.view.komisitran.Grid', {
    extend: 'Erems.library.template.view.GridDS2',
    alias: 'widget.komisitrangrid',
    storeConfig: {
        id: 'KomisitranGridStore',
        idProperty: 'komisi_id',
        extraParams: {}
    },
    bindPrefixName: 'Komisitran',
    newButtonLabel: 'New Permintaan Komisi',
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
                    width: 70,
                    dataIndex: 'unit_unit_number',
                    hideable: false,
                    text: 'Unit Number'
                },
                {
                    xtype: 'gridcolumn',  
                    width: 200,
                    dataIndex: 'purchaseletter_purchaseletter_no',
                    hideable: false,
                    text: 'Purchaseletter No.'
                },
                {
                    xtype: 'numbercolumn',
                    width: 200,
                    dataIndex: 'harganetto_klaim',
                    hideable: false,
                    text: 'Harga Netto Klaim'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'komisi_code',
                    hideable: false,
                    text: 'Komisi Code'
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
            ]
        };
        return ac;
    },
});
