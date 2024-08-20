Ext.define('Hrd.view.transferdata.GridKomponen', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.transferdatagridkomponen',
    storeConfig: {
        id: 'TransferdataGridKomponenStore',
        idProperty: 'komponengaji_id',
        extraParams: {}
    },
    columnLines: false,
    bindPrefixName: 'Transferdata',
    newButtonLabel: 'New',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {},
            defaults: {
                xtype: 'gridcolumn',
                align: 'center'


            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                
                {
                    dataIndex:'code',
                    text: 'Kode'
                },
                {
                    dataIndex:'description',
                    text: 'Keterangan',
                    width:200
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