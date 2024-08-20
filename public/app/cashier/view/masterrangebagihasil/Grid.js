Ext.define('Cashier.view.masterrangebagihasil.Grid', {
    extend        : 'Cashier.library.template.view.Grid',
    alias         : 'widget.masterrangebagihasilgrid',
    store         : 'Masterrangebagihasil',
    bindPrefixName: 'Masterrangebagihasil',
    newButtonLabel: 'New Master Range Bagi Hasil',
    initComponent : function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig : {

            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {

            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype    : 'gridcolumn',
                    header   : 'rangebagihasil_id',
                    dataIndex: 'rangebagihasil_id',
                    hidden   : true
                },
                {
                    xtype    : 'gridcolumn',
                    itemId   : 'colms_code',
                    width    : 100,
                    dataIndex: 'code',
                    hideable : false,
                    text     : 'Code'
                },
                {
                    xtype    : 'gridcolumn',
                    itemId   : 'colms_name',
                    width    : 150,
                    dataIndex: 'name',
                    hideable : false,
                    text     : 'Nama'
                },
                {
                    xtype    : 'gridcolumn',
                    itemId   : 'colms_komisi_marketing',
                    width    : 130,
                    dataIndex: 'komisi_marketing',
                    hideable : false,
                    text     : 'Komisi Marketing'
                },
                {
                    xtype    : 'gridcolumn',
                    itemId   : 'colms_pph',
                    width    : 130,
                    dataIndex: 'pph',
                    hideable : false,
                    text     : 'PPH'
                },
                {
                    xtype    : 'booleancolumn',
                    dataIndex: 'is_progresif',
                    text     : 'Progresif',
                    falseText: ' ',
                    trueText : '&#10003;',
                    align    : 'center',
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});


