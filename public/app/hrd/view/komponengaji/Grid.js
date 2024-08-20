Ext.define('Hrd.view.komponengaji.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.komponengajigrid',
    storeConfig: {
        id: 'KomponengajiGridStore',
        idProperty: 'komponengaji_id',
        extraParams: {}
    },
    bindPrefixName: 'Komponengaji',
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
                    dataIndex: 'code',
                    text: 'Kode'
                },
                {
                    dataIndex: 'description',
                    text: 'Keterangan',
                    width:200
                },
                {
                    dataIndex: 'pph_baris',
                    text: 'Pph Baris',
                    width:60
                },
                {
                    dataIndex: 'plus_minus',
                    text: '+ / -',
                    width:50
                },
                {
                    dataIndex: 'kpph',
                    text: 'K. PPh',
                    width:50
                },
                {
                    dataIndex: 'tunjangan_potongan',
                    text: 'Tunjangan / Potongan'
                }
                ,
              //  me.generateActionColumn()
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
                        action: 'csvimport',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Import from CSV'
                    }
                ]
            }
        ];
        return dockedItems;
    }
});