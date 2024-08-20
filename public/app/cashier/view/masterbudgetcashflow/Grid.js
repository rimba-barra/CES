Ext.define('Cashier.view.masterbudgetcashflow.Grid',{
     extend: 'Cashier.library.template.view.GridDS2',
     
    alias:'widget.masterbudgetcashflowgrid',
    bindPrefixName:'Masterbudgetcashflow',
    storeConfig: {
        id: 'MasterBudgetCoaGridStore',
        idProperty: 'budget_id',
        extraParams: {}
    },
   // itemId:'',
    newButtonLabel:'New Budget Cashflow ',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {},
            selModel: Ext.create('Ext.selection.CheckboxModel', {

            }),
            columns: [
                {
                    width: 30,
                    xtype: 'rownumberer'
                },
               
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_sides',
                    width: 100,
                    dataIndex: 'cashflowtype',
                    hideable: false,
                    text: 'Cashflow Type'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'department',
                    hideable: false,
                    text: 'Department',
                    renderer: function(val) {
                        if (val == '' || val == null) {
                            return '-';
                        }else{
                            return val;
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'coa_name',
                    hideable: false,
                    text: 'COA',
                    renderer: function(val) {
                        if (val == '' || val == null) {
                            return '-';
                        }else{
                            return val;
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 110,
                    dataIndex: 'budget_type',
                    align :'center',
                    hideable: false,
                    text: 'Budget Type'
                },
                {
                    xtype: 'gridcolumn',
                    width: 90,
                    dataIndex: 'total',
                    hideable: false,
                    emptyText: 0,
                    text: 'Budget Yearly',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    align: 'right'
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 90,
                    dataIndex: 'jan',
                    hideable: false,
                    text: 'Jan',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    emptyText: 0,
                    align: 'right'
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 90,
                    dataIndex: 'feb',
                    hideable: false,
                    text: 'Feb',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    align: 'right'
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 90,
                    dataIndex: 'mar',
                    hideable: false,
                    text: 'Mar',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    align: 'right'
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 90,
                    dataIndex: 'apr',
                    hideable: false,
                    text: 'Apr',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    align: 'right'
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 90,
                    dataIndex: 'may',
                    hideable: false,
                    text: 'May',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    align: 'right'
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 90,
                    dataIndex: 'jun',
                    hideable: false,
                    text: 'Jun',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    align: 'right'
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 90,
                    dataIndex: 'jul',
                    hideable: false,
                    text: 'Jul',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    align: 'right'
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 90,
                    dataIndex: 'aug',
                    hideable: false,
                    text: 'Aug',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    align: 'right'
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 90,
                    dataIndex: 'sep',
                    hideable: false,
                    text: 'Sept',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    align: 'right'
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 90,
                    dataIndex: 'oct',
                    hideable: false,
                    text: 'Oct',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    align: 'right'
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 90,
                    dataIndex: 'nov',
                    hideable: false,
                    text: 'Nov',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    align: 'right'
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 90,
                    dataIndex: 'dec',
                    hideable: false,
                    text: 'Dec',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    align: 'right'
                }, 
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    viewConfig: {
        listeners: {
            refresh: function(view) {
                var nodes, node, record, level, cells, j, i;
                nodes = view.getNodes();

                for (i = 0; i < nodes.length; i++) {
                    node   = nodes[i];
                    record = view.getRecord(node);
                    
                    if (record.get("coa_id") == '' || record.get("coa_id") == null) {
                        level = '#baddb4';
                    } else {
                        if (i % 2 == 0) {
                            level = '#fafafa';
                        } else {
                            level = '#FFFFFF';
                        }
                    }
                    
                    cells = Ext.get(node).query('td');

                    for (j = 0; j < cells.length; j++) {
                        Ext.fly(cells[j]).setStyle('background-color', level);
                    }
                }
            }
        }
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
                        text: 'Populate from CF'
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
                    {
                        xtype: 'button',
                        action: 'upload',
                        disabled: false,
                        hidden: false,
                        itemId: 'btnUpload',
                        margin: '0 5 0 0',
                        iconCls: 'icon-form',
                        text: 'Upload Budget CF'
                    },
                    {
                        xtype: 'button',
                        action: 'export',
                        disabled: false,
                        hidden: false,
                        itemId: 'btnExport',
                        margin: '0 5 0 0',
                        iconCls: 'icon-excel',
                        text: 'Export Data'
                    },
                    {
                        xtype: 'button',
                        action: 'deleteall',
                        disabled: false,
                        hidden: false,
                        name: 'delete-all',
                        itemId: 'btnDeleteAll',
                        margin: '0 5 0 0',
                        iconCls: 'icon-delete',
                        text: 'Delete All',
                    },
                    {
                        xtype: 'tbspacer',
                        flex: 1
                    },
                    {
                        xtype: 'tbseparator'
                    },
                    {
                        xtype: 'label',
                        text: '',
                        align:'right',
                        listeners: {
                          render: function () {
                            this.setText('<span style="width:15px;height:15px;background-color:#baddb4;border:1px #000 solid;">&nbsp;&nbsp;&nbsp;&nbsp;</span> Summary &nbsp;&nbsp;', false);
                          }
                        }
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


