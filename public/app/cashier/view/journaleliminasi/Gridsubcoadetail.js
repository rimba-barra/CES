Ext.define('Cashier.view.journaleliminasi.Gridsubcoadetail', {
    extend:'Cashier.library.template.view.GridDS2',
    alias: 'widget.journaleliminasisubcoadetailgrid',
    storeConfig:{
        id:'SubCoaDetailCoaGridStore',
        idProperty:'journaldetailsub_id',
        extraParams:{
            mode_read:'subdetailcoa',
        }
    },
    height: 250,
    bindPrefixName: 'Journaleliminasi',
    itemId: 'Journalsubcoadetail',
    title: 'Sub Coa Detail',
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
                    itemId: 'colms_subglcode',
                    width: 100,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'kelsub_kelsub',
                    hideable: false,
                    text: 'Kelsub'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_subcode',
                    width: 70,
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'subgl_code',
                    hideable: false,
                    text: 'Sub Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code1',
                    width: 60,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'subgl_code1',
                    hideable: false,
                    text: 'Code 1'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code2',
                    width: 60,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'subgl_code2',
                    hideable: false,
                    text: 'Code 2'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'subgl_code3',
                    width: 60,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'subgl_code3',
                    hideable: false,
                    text: 'Code 3'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code4',
                    width: 60,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'subgl_code4',
                    hideable: false,
                    text: 'Code 4'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    dataIndex: 'amount',
                    titleAlign: 'center',
                    align: 'right',
                    width: 120,
                    hideable: false,
                    text: 'Amount',
                    
            /*  
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    summaryType: 'sum',
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        var summaryvalue = Ext.util.Format.number(value, '0,000.00');
                        return  "Sum Total : " + summaryvalue;
                    }*/
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_remarks',
                    width: 180,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'remarks',
                    hideable: false,
                    text: 'Description'
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
                        xtype: 'button',
                        action: 'create',
                        hidden: false,
                        disabled: true,
                        itemId: 'btnCreate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Add New Sub ',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                
                    {
                        xtype: 'button',
                        action: 'update',
                        hidden: false,
                        disabled: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        hidden: false,
                        disabled: true,
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
                width: 360,
                displayInfo: true,
                name: 'subdetailjournalpagingtoolbar',
                //store: this.getStore(),
                hideRefresh: true,
                listeners: {
                    afterrender: function (tbar) {
                        //if (tbar.hideRefresh) {
                        //    tbar.down('#refresh').hide();
                        //}
                    }

                }
            }
         
        ];
        return dockedItems;
    },

});


