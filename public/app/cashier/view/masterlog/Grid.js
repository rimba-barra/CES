Ext.define('Cashier.view.masterlog.Grid',{
    extend: 'Cashier.library.template.view.GridDS2',
     
    alias:'widget.masterloggrid',
    bindPrefixName:'Masterlog',
    storeConfig: {
        id: 'MasterlogGridStore',
        idProperty: 'action_id',
        extraParams: {}
    },
   // itemId:'',
    newButtonLabel:'New Budget Coa ',
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
                    width: 150,
                    dataIndex: 'project_name',
                    hideable: false,
                    text: 'Project',
                    
                }, 
                 {
                    xtype: 'gridcolumn',
                    width: 150,
                    dataIndex: 'pt_name',
                    hideable: false,
                    text: 'Company',
                    
                    emptyText: 0,
                }, 
                 {
                    xtype: 'gridcolumn',
                    width: 150,
                    dataIndex: 'module',
                    hideable: false,
                    text: 'Module',
                    
                    emptyText: 0,
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'transaction_no',
                    hideable: false,
                    text: 'Transaction No.',
                    emptyText: 0,
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'action_type',
                    hideable: false,
                    text: 'Transaction Type'
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 70,
                    dataIndex: 'trans_amount',
                    hideable: false,
                    text: 'Amount',
                     renderer: Ext.util.Format.numberRenderer('0,000.00'),
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'addon',
                    hideable: false,
                    text: 'Transaction Date'
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 90,
                    dataIndex: 'user_name',
                    hideable: false,
                    text: 'User'
                },
                {
                    xtype: 'gridcolumn',
                    width: 600,
                    dataIndex: 'action',
                    hideable: false,
                    emptyText: 0,
                    text: 'Notes',
 
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
                        action: 'generate',
                        //disabled: true,
                        itemId: 'btnGenerate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Populate from COA',
                        hidden: true,
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
                       // bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDelete',
                        margin: '0 5 0 0',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected',
                        //bindAction: me.bindPrefixName + 'Delete'
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
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                
            ]
        };
        return ac;
    },
});


