Ext.define('Erems.view.sppjbsby.Grid', {
    extend: 'Erems.library.template.view.GridDS2',
    alias: 'widget.sppjbsbygrid',
    storeConfig: {
        id: 'SppjbsbyGridStore',
        idProperty: 'payment_id',
        extraParams: {}
    },
    bindPrefixName: 'Sppjbsby',
    newButtonLabel: 'New SPPJB',
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
                     xtype: 'datecolumn',
                    format: 'd-m-Y',
                    width: 100,
                    dataIndex: 'sppjb_date',
                    hideable: false,
                    text: 'Tanggal'
                },
                 {
                    xtype: 'gridcolumn',  
                    width: 130,
                    dataIndex: 'sppjb_no',
                    hideable: false,
                    text: 'Nomor'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'sppjb_name',
                    hideable: false,
                    text: 'Nama'
                },
               
           
                 {
                    xtype: 'gridcolumn',
                    width: 300,
                    dataIndex: 'sppjb_address',
                    hideable: false,
                    text: 'Alamat'
                }
                

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
                    },
                    /*
                    {
                        xtype: 'button',
                        action: 'printx',

                        margin: '0 5 0 0',

                        iconCls: 'icon-pdf',
                        text: 'Print PDF'
                    },
                    */
                   
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