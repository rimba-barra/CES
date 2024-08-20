Ext.define('Hrd.view.edittunjangan.GridKomponen', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.edittunjangankomgrid',
    storeConfig: {
        id: 'EdittunjangankomGridStore',
        idProperty: 'komponengaji_id',
        extraParams: {
            mode_read: 'value'
        }
    },
    bindPrefixName: 'Edittunjangan',
    newButtonLabel: 'New',
    initComponent: function() {
        var me = this;

        var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        });

        Ext.applyIf(me, {
            plugins: [cellEditing],
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn',
            },
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'komponengaji_code',
                    text: 'Kode'
                },
                {
                    dataIndex: 'komponengaji_description',
                    text: 'Keterangan',
                    //   width:300
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'value',
                    width:200,
                    text: 'Nilai',
                    field: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0,
                        maxValue: 100000000000
                    }
                    //   width:300
                }
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [];
        return dockedItems;
    }
});