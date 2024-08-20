Ext.define('Cashier.view.masterclosingcentral.Grid',{
     extend: 'Cashier.library.template.view.GridDS2',
     
    alias:'widget.masterclosingcentralgrid',
    bindPrefixName:'Masterclosingcentral',
    storeConfig: {
        id: 'MasterclosingcentralGridStore', //'MasterBudgetCoaGridStore',
        idProperty: 'budget_id',
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
                    itemId: 'colms_sides',
                    width: 100,
                    dataIndex: 'coa',
                    hideable: false,
                    text: 'COA Account'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_side',
                    width: 200,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    dataIndex: 'total',
                    hideable: false,
                    emptyText: 0,
                    text: 'Budget Yearly',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    dataIndex: 'jan',
                    hideable: false,
                    text: 'Jan',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    emptyText: 0,
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    dataIndex: 'feb',
                    hideable: false,
                    text: 'Feb',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    dataIndex: 'mar',
                    hideable: false,
                    text: 'Mar',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    dataIndex: 'apr',
                    hideable: false,
                    text: 'Apr',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    dataIndex: 'may',
                    hideable: false,
                    text: 'May',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    dataIndex: 'jun',
                    hideable: false,
                    text: 'Jun',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    dataIndex: 'jul',
                    hideable: false,
                    text: 'Jul',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    dataIndex: 'aug',
                    hideable: false,
                    text: 'Aug',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    dataIndex: 'sep',
                    hideable: false,
                    text: 'Sept',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    dataIndex: 'oct',
                    hideable: false,
                    text: 'Oct',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    dataIndex: 'nov',
                    hideable: false,
                    text: 'Nov',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    dataIndex: 'dec',
                    hideable: false,
                    text: 'Dec',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
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
                        text: 'Populate from COA'
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
                        margin: '0 5 0 0',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected',
                        bindAction: me.bindPrefixName + 'Delete'
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
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                }
               
            ]
        };
        return ac;
    },
});


