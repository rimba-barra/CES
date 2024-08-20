Ext.define('Erems.view.admincollectioncashier.Gridcoadetail', {
    extend:'Erems.library.template.view.GridDS2',
    alias: 'widget.coadetailgrid',
    storeConfig:{
        id:'AdminCollectionCoaGridStore',
        idProperty:'coa_config_detail_id',
        extraParams:{
            mode_read:'generatetemplatecoa',
            template_id:0
        }
    },
    bindPrefixName: 'Admincollectioncashier',
    itemId: 'AdminCollectionEremscoadetail',
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
                        //bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        xtype: 'button',
                        action: 'updateCoa',
                        disabled: false,
                        hidden: false,
                        itemId: 'btnEditCoa',
                        margin: '0 5 0 0',
                        id: 'btnEditCoa',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                       
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: false,
                        hidden: false,
                        itemId: 'btnDelete',
                        //bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },

                ]
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
               
               
            ]
        };
        return ac;
    },
 
});


