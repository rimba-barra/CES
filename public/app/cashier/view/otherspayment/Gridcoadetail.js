Ext.define('Cashier.view.otherspayment.Gridcoadetail', {
    extend:'Cashier.library.template.view.GridDS2',
    alias: 'widget.otherspaymentcoadetailgrid',
    storeConfig:{
        id:'OthersPaymentCoaGridStore',
        idProperty:'coa_config_detail_id',
        extraParams:{
            mode_read:'generatetemplatecoa',
            template_id:0
        }
    },
    bindPrefixName: 'Otherspayment',
    itemId: 'Otherspaymentcoadetail',
    title: 'Coa Detail',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
             features: [
                {
                    ftype: 'summary',
                }
            ],
            
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    width: 80,
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'code',
                    hideable: false,
                    text: 'COA'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coaname',
                    dataIndex: 'coa_name',
                    titleAlign: 'center',
                    align: 'left',
                    width: 180,
                    hideable: false,
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    dataIndex: 'description',
                    titleAlign: 'center',
                    align: 'left',
                    width: 70,
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dataflow',
                    dataIndex: 'type',
                    titleAlign: 'center',
                    align: 'center',
                    width: 70,
                    hideable: false,
                    text: 'Data flow'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_persen',
                    dataIndex: 'persen',
                    titleAlign: 'center',
                    align: 'center',
                    width: 70,
                    hideable: false,
                    text: 'Persen'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    dataIndex: 'amount',
                    titleAlign: 'center',
                    align: 'right',
                    width: 170,
                    hideable: false,
                
                    header: 'Total Amount',
                    summaryType: 'sum',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        var summaryvalue = Ext.util.Format.number(value, '0,000.00');
                     
                      
                    },
                    
                },
                me.generateActionColumn()
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
                        text: 'Generate Template COA',
                        itemId: 'btnGenerate',
                        action: 'generate',
                        iconCls: 'icon-print',
                       
                    }, 
                    {
                        xtype: 'button',
                        action: 'create',
                        hidden: false,
                        itemId: 'btnCreate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Add new',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: false,
                        hidden: false,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: false,
                        hidden: false,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },

                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'pagingtcashcoadetail',
                width: 360,
                displayInfo: true,
                store: 'Tcashcoadetail',
                hideRefresh: true,
                listeners: {
                    afterrender: function (tbar) {
                        if (tbar.hideRefresh) {
                            tbar.down('#refresh').hide();
                        }
                    }

                }
            }
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 100,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [                
                
                {
                    defaultIcon: 'icon-edit',
                    iconCls: ' ux-actioncolumn icon-edit act-update',
                    action: 'update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    defaultIcon: 'icon-delete',
                    action: 'destroy',
                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            ]
        }

        return ac;

    },
});


