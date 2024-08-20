Ext.define('Hrd.view.setuppayroll.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.setuppayrollgrid',
    storeConfig: {
        id: 'SetuppayrollGridStore',
        idProperty: 'setuppayroll_id',
        extraParams: {
            mode_read:'main'
        }
    },
    bindPrefixName: 'Setuppayroll',
    newButtonLabel: 'New',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
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
                    width:200
                },
                {
                    dataIndex: 'bln_hr',
                    text: 'Bln / Hr',
                    width:60
                },
                {
                    dataIndex: 'is_trans',
                    text: 'Trans (Y/N)',
                    width:80
                },
                {
                    xtype:'numbercolumn',
                    dataIndex: 'value',
                    text: 'Value',
                    width:120
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