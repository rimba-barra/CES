Ext.define('Cashier.view.tloan.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.tloangrid',
    store: 'Tloan',
    bindPrefixName: 'Tloan',
    itemId: 'Tloan',
    newButtonLabel: 'Add New',
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
                    itemId: 'colms_projectcode',
                    dataIndex: 'projectcode',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Project Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_projectname',
                    dataIndex: 'projectname',
                    width: 180,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Project Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptcode',
                    dataIndex: 'ptcode',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Pt Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    dataIndex: 'ptname',
                    width: 180,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Pt Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_department',
                    dataIndex: 'department',
                    width: 200,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Department'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_loan_date',
                    dataIndex: 'loan_date',
                    width: 110,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Loan Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_loan_no',
                    dataIndex: 'loan_no',
                    width: 120,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Loan No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    dataIndex: 'coa',
                    width: 100,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Acc. No.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa_desc',
                    dataIndex: 'coa_desc',
                    width: 180,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Acc. Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    dataIndex: 'description',
                    width: 200,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    dataIndex: 'amount',
                    width: 150,
                    titleAlign: 'center',
                    align: 'right',
                    hideable: false,
                    text: 'Total Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_paid',
                    dataIndex: 'paid',
                    width: 150,
                    titleAlign: 'center',
                    align: 'right',
                    hideable: false,
                    text: 'Total Payment',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_remaining',
                    dataIndex: 'remaining',
                    width: 150,
                    titleAlign: 'center',
                    align: 'right',
                    hideable: false,
                    text: 'Total Remaining',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                me.generateActionColumn()
            ],
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
                        action: 'print',
                        hidden: true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'Print',
                        iconCls: 'icon-print',
                        text: 'Print / Save'
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


