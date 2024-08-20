Ext.define('Hrd.view.perjalanandinas.GridDetail', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.perjalanandinasgriddetail',
    storeConfig: {
        id: 'PerjalanandinasGridDetailStore',
        idProperty: 'perjalanandinas_detail_id',
        extraParams: {
            mode_read:'detail',
            perjalanandinas_id:0
        }
    },
    columnLines: false,
    bindPrefixName: 'Perjalanandinas',
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
                    xtype: 'rownumberer'
                },
                {
                   dataIndex: 'group_code',
                   text: 'Golongan'
                },
                {
                   dataIndex: 'standart_hotel',
                   text: 'Standart Hotel'
                },
                {
                   dataIndex: 'negaratujuan_negaratujuan',
                   text: 'Negara Tujuan'
                },
                {
                   dataIndex: 'currency_id',
                   text: 'Currency'
                },
                {
                   xtype:'numbercolumn', 
                   dataIndex: 'uanghotel',
                   
                   text: 'Harga Hotel'
                },
                {
                   xtype:'numbercolumn', 
                   dataIndex: 'uangmakan_pp_1m',
                   text: 'PPUM <= 1 bulan'
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
                    {
                        xtype:'button',
                        action:'adddetail',
                        iconCls: 'icon-new',
                        text:'Add'
                    },
                    {
                        xtype:'button',
                        action:'editdetail',
                        iconCls: 'icon-edit',
                        text:'Edit'
                    },
                    {
                        xtype:'button',
                        action:'deletedetail',
                        iconCls: 'icon-delete',
                        text:'Delete'
                    },

                ]
            }
        ];
        return dockedItems;
    }
});