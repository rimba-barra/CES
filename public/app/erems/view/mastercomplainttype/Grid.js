Ext.define('Erems.view.mastercomplainttype.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.mastercomplainttypegrid',
    store: 'Mastercomplainttype',
    bindPrefixName: 'Mastercomplainttype',
    newButtonLabel: 'New Complaint Type',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_id',
                    width: 60,
                    align: 'right',
                    dataIndex: 'code',
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 100,
                    dataIndex: 'complainttype',
                    hideable: false,
                    text: 'Complaint type'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_desc',
                    width: 100,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});