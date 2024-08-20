Ext.define('Cashier.view.masterrangebagihasil.GridDetail', {
    extend       : 'Cashier.library.template.view.Grid',
    alias        : 'widget.masterrangebagihasilgriddetail',
    itemId       : 'masterrangebagihasilgriddetail',
    store        : 'Masterrangebagihasildetail',
    height       : 150,
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype : 'toolbar',
                    dock  : 'top',
                    height: 28,
                    items : [
                        {
                            text   : 'Add New',
                            itemId : 'btnAdd',
                            iconCls: 'icon-add',
                            action : 'create',
                        },
                        {
                            text   : 'Edit',
                            itemId : 'btnEdit',
                            iconCls: 'icon-edit',
                            action : 'update',
                        },
                        {
                            text   : 'Delete Selected',
                            itemId : 'btnDelete',
                            iconCls: 'icon-delete',
                            action : 'destroy',
                        },
                    ]
                }
            ],
            enableColumnHide: false,
            enableColumnMove: false,
            sortableColumns : false,
            viewConfig      : { markDirty: false },
            columnLines     : true,
            selModel        : Ext.create('Ext.selection.CheckboxModel', {}),
            columns         : [
                {
                    xtype    : 'gridcolumn',
                    text     : 'rangebagihasil_detail_id',
                    dataIndex: 'rangebagihasil_detail_id',
                    hidden   : true,
                },
                {
                    text        : 'Harga Tanah/m2',
                    menuDisabled: true,
                    columns     : [
                        { xtype: 'numbercolumn', hideable: false, menuDisabled: true, width: 150, align: 'right', cls: 'text-center', text: 'Start', dataIndex: 'hargatanah_permeter_start' },
                        { xtype: 'numbercolumn', hideable: false, menuDisabled: true, width: 150, align: 'right', cls: 'text-center', text: 'End', dataIndex: 'hargatanah_permeter_end' },
                    ]
                },
                {
                    text        : 'Komposisi Tanah',
                    menuDisabled: true,
                    columns     : [
                        { xtype: 'numbercolumn', hideable: false, menuDisabled: true, width: 100, align: 'right', cls: 'text-center', text: 'Partner', dataIndex: 'komposisi_tanah_partner' },
                        { xtype: 'numbercolumn', hideable: false, menuDisabled: true, width: 100, align: 'right', cls: 'text-center', text: 'Ciputra', dataIndex: 'komposisi_tanah_ciputra' },
                    ]
                },
                {
                    text        : 'Komposisi Bangunan',
                    menuDisabled: true,
                    columns     : [
                        { xtype: 'numbercolumn', hideable: false, menuDisabled: true, width: 100, align: 'right', cls: 'text-center', text: 'Partner', dataIndex: 'komposisi_bangunan_partner' },
                        { xtype: 'numbercolumn', hideable: false, menuDisabled: true, width: 100, align: 'right', cls: 'text-center', text: 'Ciputra', dataIndex: 'komposisi_bangunan_ciputra' },
                    ]
                },
            ]
        });
        me.callParent(arguments);
    }
});