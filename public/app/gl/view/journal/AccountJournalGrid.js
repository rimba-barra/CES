Ext.define('Gl.view.journal.AccountJournalGrid', {
    extend: 'Gl.library.template.view.Grid',
    store: 'AccountJournal',
    alias: 'widget.AccountJournalGrid',
    //itemId: 'AccountJournalGrid',
    bindPrefixName: 'JournalAccountJournal',
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
                {xtype: 'rownumberer'},
                {
                    xtype: 'gridcolumn',
                    text: 'ID',
                    dataIndex: 'journaldetail_id_acc',
                    hidden: true,
                    hideable: false,
                    width: 40,
                    align: 'right'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Kode Account',
                    dataIndex: 'coa_acc',
                    editor: {
                        xtype: 'coasettingongridcombobox',
                        name: 'coa_acc',
                        itemId: 'coa_acc'
                    },
                    hideable: false,
                    width: 90
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Nama Account',
                    dataIndex: 'name_acc',
                    hideable: false,
                    width: 200
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Keterangan',
                    dataIndex: 'keterangan_acc',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    },
                    hideable: false,
                    width: 450
                },
                {
                    xtype: 'gridcolumn',
                    text: 'D/C',
                    dataIndex: 'type_acc',
                    editor: {
                        xtype: 'textfield',
                        maskRe: /[C-Dc-d]/,
                        fieldStyle: 'text-align:center',
                        allowBlank: false
                    },
                    hideable: false,
                    align: 'center',
                    width: 40
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Amount',
                    dataIndex: 'amount_acc',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    editor: {
                        xtype: 'textfield',
                        maskRe: /[0-9\.]/,
                        fieldStyle: 'text-align:right'
                    },
                    align: 'right',
                    hideable: false,
                    width: 100
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Sub',
                    dataIndex: 'kelsub_acc',
                    hideable: false,
                    width: 100
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
                        text: 'Add Account Journal',
                        itemId: 'btnAdd',
                        action: 'create',
                        iconCls: 'icon-add',
                        bindAction: me.bindPrefixName+'Create'
                    },
                    {
                        text: 'Add New Row',
                        itemId: 'btnNewrow',
                        action: 'newrow',
                        iconCls: 'icon-add'
                    },
                    {
                        text: 'Upload Journal',
                        itemId: 'btnUpload',
                        action: 'upload',
                        iconCls: 'icon-excel'
                    },
                    {
                        text: 'Export Journal',
                        itemId: 'btnExportacc',
                        action: 'exportacc',
                        iconCls: 'icon-excel'
                    },
                    {
                        text: 'Upload Journal 2',
                        itemId: 'btnUploads',
                        action: 'uploads',
                        hidden: true,
                        iconCls: 'icon-add'
                    }
                   
                ]
            }
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