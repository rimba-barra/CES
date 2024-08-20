Ext.define('Hrd.view.transferdata.GridMap', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.transferdatagridmap',
    storeConfig: {
        id: 'TransferdataGridMapStore',
        idProperty: 'xxx_id',
        extraParams: {}
    },
    columnLines: false,
    bindPrefixName: 'Transferdata',
    newButtonLabel: 'New',
    initComponent: function() {
        var me = this;

        var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        });

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {},
            plugins: [cellEditing],
            defaults: {
                xtype: 'gridcolumn',
                align: 'center'


            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    dataIndex: 'no',
                    text: 'No'
                },
                {
                    dataIndex: 'komponengaji_code',
                    text: 'Komp. Gaji',
                    listeners: {
                        click: function(el, a, index) {
                            gbTransferDataImport.komponenClick(index);
                        }
                    }
                },
                {
                    dataIndex: 'komponengaji_description',
                    text: 'Keterangan',
                    listeners: {
                        click: function(el, a, index) {
                            gbTransferDataImport.komponenClick(index);
                        }
                    }
                },
                {
                    dataIndex: 'kolom',
                    text: 'Kolom'
                },
                {
                    dataIndex: 'periode',
                    text: 'Periode',
                    field: {
                        xtype: 'textfield'
                    }
                },
                {
                    dataIndex: 'is_roundup',
                    text: 'Round Up',
                    field: {
                        xtype: 'combobox',
                        typeAhead: true,
                        triggerAction: 'all',
                        selectOnTab: true,
                        store: [
                            ['Ya', 'Ya'],
                            ['Tidak', 'Tidak'],
                        ],
                        lazyRender: true,
                        listClass: 'x-combo-list-small'
                    }
                }
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
                ]
            }
        ];
        return dockedItems;
    }
});