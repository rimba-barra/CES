Ext.define('Erems.view.mastergaransi.Grid',{
    extend:'Erems.library.template.view.Grid',
    alias:'widget.mastergaransigrid',
    store:'Mastergaransi',
    bindPrefixName:'Mastergaransi',
    newButtonLabel:'New Garansi type',
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
                    itemId: 'colms_code',
                    width: 60,
                    align: 'right',
                    dataIndex: 'code',
                    text: 'Code'
                },
            {
                xtype: 'gridcolumn',
                itemId: 'colms_guaranteetype',
                width: 100,
                dataIndex: 'guaranteetype',
                hideable: false,
                text: 'Guarantee Type'
            },{
                xtype: 'gridcolumn',
                itemId: 'colms_description',
                width: 100,
                dataIndex: 'description',
                hideable: false,
                text: 'Description'
            },{
                xtype: 'gridcolumn',
                itemId: 'colms_period',
                width: 100,
                dataIndex: 'guarantee',
                hideable: false,
                text: 'Period'
            },{
                xtype: 'gridcolumn',
                itemId: 'colms_guaranteetype',
                width: 100,
                dataIndex: 'period',
                hideable: false,
                text: 'Guarantee Type'
            },
               
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});