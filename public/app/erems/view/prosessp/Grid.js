Ext.define('Erems.view.prosessp.Grid',{
    extend:'Erems.library.template.view.GridDS2',
    alias:'widget.prosesspgrid',
    storeConfig:{
        id:'PaymentGridStore',
        idProperty:'payment_id',
        extraParams:{}
    },
   // store:'Prosessp',
    bindPrefixName:'Prosessp',
    newButtonLabel:'New Payment',
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
                
                    width: 80,
                    align: 'right',
                    dataIndex: 'unit_unit_number',
                    text: 'Unit Number'
                },
		{
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    width: 100,
                    dataIndex: 'duedate',
                    hideable: false,
                    
                    text: 'Duedate'
                },
                {
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    width: 100,
                    dataIndex: 'sp1_date',
                    hideable: false,
                    text: 'Tgl SP'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'sp1_no',
                    hideable: false,
                    text: 'No. Sp'
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
                        action: 'proses',
                       
                        margin: '0 5 0 0',
                
                        iconCls: 'icon-gear',
                        text: 'Proses'
                    },
                   /* {
                        xtype: 'button',
                        action: 'create',
                        hidden: true,
                       // itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                     //   bindAction: me.bindPrefixName + 'Create',
                        text: 'New Proses SP'
                    },
                    */
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
                        action: 'print',
                     
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                
                        iconCls: 'icon-print',
                        text: 'Print'
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
    }
});