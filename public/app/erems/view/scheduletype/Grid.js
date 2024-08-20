Ext.define('Erems.view.scheduletype.Grid',{
    extend:'Erems.library.template.view.Grid',
    alias:'widget.scheduletypegrid',
    store:'Scheduletype',
    bindPrefixName:'Scheduletype',
    newButtonLabel:'New Scheduletype',
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
                    dataIndex: 'scheduletype',
                    text: 'Schedule type'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
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