Ext.define('Gl.view.koreksisetelahposting.AccountJournalGrid', {
    extend: 'Gl.library.template.view.Grid',
    store: 'KspAccountJournal',
    alias: 'widget.kspaccountjournalgrid',
    bindPrefixName: 'KspAccountJournal',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItemsCustome(),
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
                    hideable: false,
                    width: 200
                },
                {
                    xtype: 'gridcolumn',
                    text: 'D/C',
                    dataIndex: 'type_acc',
                    hideable: false,
                    width: 40
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Amount',
                    dataIndex: 'amount_acc',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
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
                                console.log(cells[j]);
                                Ext.fly(cells[j]).setStyle('background-color', level);
                            }
                        }
                }
            }
        },
    generateDockedItemsCustome: function() {
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
            }
        ];
        return dockedItems;
    },
    generateActionColumn: function() {
        var me = this;
        var ac  = {
            xtype: 'actioncolumn',
            width: 40,
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
//                {
//                    defaultIcon: 'icon-delete',
//                    action: 'destroy',
//                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
//                    altText: 'Delete',
//                    tooltip: 'Delete'
//                }
            ]
        }
        
        return ac;

    },
});