Ext.define('Hrd.view.workgroupemployee.Grid', {
    extend: 'Hrd.library.template.view.Grid',
    alias: 'widget.workgroupemployeegrid',
    store: 'Workgroup',
    bindPrefixName: 'Workgroupemployee',
    itemId: 'Workgroupemployee',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                me.generateActionColumn(),
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    dataIndex: 'code',
                    width: 120,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    dataIndex: 'description',
                    width: 180,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Description'
                },
            ],
        });

        me.callParent(arguments);
    },

});


