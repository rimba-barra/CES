Ext.define('Cashier.view.masterformatreportlr.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.masterformatreportlrgrid',
    store: 'Masterformatreportlr',
    bindPrefixName: 'Masterformatreportlr',
    itemId: 'Masterformatreportlr',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: null, //me.generateContextMenu(),
            dockedItems: null, //me.generateDockedItems(),
            viewConfig: {
            },
            selModel: null,
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 1
                })
            ],
            defaults: {
                height: 250
            },
            editpos: 0,
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'rptformat_id',
                    hidden: true
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'coa_id',
                    hidden: true
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'coa',
                    hideable: false,
                    text: 'COA',
                    sortable: false,
                    editpos: 0,
                    editor: {
                        xtype: 'coacombobox',
                        fieldLabel: '',
                        valueField: 'coa',
                        tpl: Ext.create('Ext.XTemplate',
                            '<table class="x-grid-table" width="300px" >',
                                '<tr class="x-grid-row">',
                                    '<th width="100px"><div class="x-column-header x-column-header-inner">Coa</div></th>',
                                    '<th width="200px"><div class="x-column-header x-column-header-inner">Name</div></th>',
                                '</tr>',
                                '<tpl for=".">',
                                    '<tr class="x-boundlist-item">',
                                        '<td ><div class="x-grid-cell x-grid-cell-inner">{coa}</div></td>',
                                        '<td><div class="x-grid-cell x-grid-cell-inner">{coaname}</div></td>',
                                    '</tr>',
                                '</tpl>',
                            '</table>'
                        ),   
                        listeners: {
                            change: function(el, value) {
                                var coa_id = el.valueModels[0].data.coa_id;
                                var coa_name = el.valueModels[0].data.coaname;
                                
                                var store = me.getStore('Masterformatreportlr');
                                var record = store.getAt(me.editpos);

                                record.set('coa_name', coa_name);
                                record.set('coa_id', coa_id);
                            }
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 250,
                    dataIndex: 'coa_name',
                    hideable: false,
                    sortable: false,
                    text: 'COA Name',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    },
                    renderer: function(value, meta, record) {

                        var level = record.data.level;
                        var coaname = value;
                        var new_coaname = '';

                        if (level == null || level == 0) {
                            level = 1;
                        }

                        for (var i = 1; i <= parseInt(level); i++) {
                            if (i < level) {
                                new_coaname += '&nbsp;&nbsp;';
                            } else {
                                new_coaname += coaname;
                            }
                        }

                        // var val = value.replace(' ', '&nbsp;');
                        return new_coaname;
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 90,
                    dataIndex: 'flag',
                    hideable: false,
                    sortable: false,
                    text: 'Flag',
                    editor: {
                        xtype: 'combobox',
                        fieldLabel: '',
                        valueField: 'val',
                        displayField: 'label',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['val', 'label'],
                            data: [
                                {'val': 'H', 'label': 'H - Header'},
                                {'val': 'I', 'label': 'I - Detail'},
                                {'val': 'T', 'label': 'T - Total'}
                            ]
                        })
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 90,
                    dataIndex: 'type',
                    sortable: false,
                    hideable: false,
                    text: 'Type',
                    editor: {
                        xtype: 'combobox',
                        fieldLabel: '',
                        valueField: 'val',
                        displayField: 'label',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['val', 'label'],
                            data: [
                                {'val': 'D', 'label': 'D - Debit'},
                                {'val': 'C', 'label': 'C - Credit'}
                            ]
                        })
                    }
                },
                {
                    xtype: 'gridcolumn',
                    width: 90,
                    dataIndex: 'level',
                    sortable: false,
                    hideable: false,
                    text: 'Level',
                    editor: {
                        xtype: 'combobox',
                        fieldLabel: '',
                        valueField: 'val',
                        displayField: 'label',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['val', 'label'],
                            data: [
                                {'val': '1', 'label': '1'},
                                {'val': '2', 'label': '2'},
                                {'val': '3', 'label': '3'},
                                {'val': '4', 'label': '4'},
                                {'val': '5', 'label': '5'},
                                {'val': '6', 'label': '6'},
                                {'val': '7', 'label': '7'},
                            ]
                        }),
                        listeners: {
                            change: function(el, value) {

                                var store = me.getStore('Masterformatreportlr');
                                var record = store.getAt(me.editpos);
                                var coaname = record.get('coa_name').trim().replace(/(?:^(?:&nbsp;)+)|(?:(?:&nbsp;)+$)/g, '');

                                var new_coaname = '';

                                for (var i = 1; i <= parseInt(value); i++) {
                                    if (i < value) {
                                        new_coaname += '  ';
                                    } else {
                                        new_coaname += coaname;
                                    }
                                }

                                record.set('coa_name', new_coaname);
                            }
                        }
                    }
                },
                me.generateActionColumn()
            ],
            listeners: {
                beforeedit: function(editor, e, eOpts) {
                    me.editpos = e.rowIdx;
                }
            }
        });

        me.callParent(arguments);
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: false,
            width: 50,
            resizable: false,
            align: 'center',
            hideable: false,
            items: [
                {
                    text: 'Add Record',
                    icon: 'app/main/images/icons/edit.png',
                    action: 'add',
                    altText: 'Add Record',
                    tooltip: 'Add Record',
                    handler: function(grid, rowIndex, colIndex) {
                        var store = me.getStore('Masterformatreportlr');
                        store.insert(rowIndex + 1, [{formatrpt_id: null}]);
                    }
                },
                {
                    text: 'Delete Selected',
                    icon: 'app/main/images/icons/delete.png',
                    action: 'delete',
                    altText: 'Delete Selected',
                    tooltip: 'Delete Selected',
                    handler: function(grid, rowIndex, colIndex) {
                        var store = me.getStore('Masterformatreportlr');
                        store.removeAt(rowIndex);
                        if (rowIndex == 0) {
                            store.insert(0, [{formatrpt_id: null}]);
                        }                      
                    }
                }
            ]
        };
        return ac;
    }
});


