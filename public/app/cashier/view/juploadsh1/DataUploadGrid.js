Ext.define('Cashier.view.juploadsh1.DataUploadGrid', {
    extend: 'Cashier.library.template.view.Grid',
    store: 'Juploadsh1',
    alias: 'widget.juploadsh1datauploadgrid',
    //itemId: 'UploadGrid',
    bindPrefixName: 'Juploadsh1',
    height:1500,
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    initComponent: function () {
        var me = this;
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItemsCustome(),
            plugins: [rowEditing],
            viewConfig: {
                
            },
           selModel: {
                injectCheckbox: 0,
                pruneRemoved: false
            },
            columns: [
                {xtype: 'rownumberer',width: 30},
                {
                    xtype: 'gridcolumn',
                    text: 'Unique Number',
                    dataIndex: 'uploaduniquenumber',
                    hidden: false,
                    width: 100,
                    align: 'right'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Project ID',
                    dataIndex: 'project_id',
                    hidden: false,
                    width: 100,
                    align: 'center'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'PT Id',
                    dataIndex: 'pt_id',
                    hidden: false,
                    width: 100,
                    align: 'center'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Journal No',
                    dataIndex: 'voucher_no',
                    hideable: false,
                    width: 150,
                    align: 'center'
                },
                {
                    xtype: 'datecolumn',
                    format: 'Y-m-d',
                    text: 'Journal Date',
                    dataIndex: 'voucher_date',
                    hideable: false,
                    width: 100,
                    align: 'center'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Prefix',
                    dataIndex: 'prefix',
                    hideable: false,
                    width: 50,
                    align: 'center'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Description',
                    dataIndex: 'description',
                    hideable: false,
                    width: 250,
                    align: 'left'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'COA Detail',
                    dataIndex: 'coa_detail',
                    hideable: false,
                    width: 100,
                    align: 'center'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Type',
                    dataIndex: 'type',
                    hideable: false,
                    width: 50,
                    align: 'center'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Cashflow',
                    dataIndex: 'cashflow',
                    hideable: false,
                    width: 50,
                    align: 'center'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Kawasan',
                    dataIndex: 'kawasan',
                    hideable: false,
                    width: 100,
                    align: 'center'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Sub Code',
                    dataIndex: 'sub_unit',
                    hideable: false,
                    width: 100,
                    align: 'left'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Sub Description',
                    dataIndex: 'sub_description',
                    hideable: false,
                    width: 200,
                    align: 'left'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Seq Detail',
                    dataIndex: 'seq_detail',
                    hidden: true,
                    width: 100,
                    align: 'center'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Amount Detail',
                    dataIndex: 'amount_detail',
                    hideable: false,
                    width: 100,
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
                    var color,nodes,node,record,level,cells,j,i;
                     // get all grid view nodes
                          nodes = view.getNodes();        
                        for (i = 0; i < nodes.length; i++) {                            
                             node = nodes[i];                            
                            // get node record
                             record = view.getRecord(node);                            
                            // get level from record data
                             level = record.get('type_acc'); 
                            switch (level) {
                                    case 'C': level = "#40bf80";  break;
                                    case 'D': level = "#9494b8";  break;
                                }
                            // get all td elements
                            cells = Ext.get(node).query('td');                              
                            // set bacground color to all row td elements
                            for(j = 0; j < cells.length; j++) {
                                //console.log(cells[j]);
                                Ext.fly(cells[j]).setStyle('background-color', level);
                            }
                        }
                }
            }
        },
    generateDockedItemsCustome: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        text: 'Upload Journal',
                        itemId: 'btnUpload',
                        action: 'upload',
                        iconCls: 'icon-excel'
                    },
                    {
                        xtype: 'tbspacer',
                        flex: 1
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'debetField',
                        id: 'debetField',
                        name: 'debetField',
                        readOnly: true,
                        fieldLabel: 'DEBET',
                        width: 250,
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'creditField',
                        id: 'creditField',
                        name: 'creditField',
                        readOnly: true,
                        fieldLabel: 'CREDIT',
                        width: 250,
                    },                   
                ]
            },
        ];
        return dockedItems;
    },
    generateActionColumn: function() {
        var me = this;
        var ac  = {
            xtype: 'actioncolumn',
            width: 50,
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