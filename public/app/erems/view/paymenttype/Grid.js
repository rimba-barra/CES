Ext.define('Erems.view.paymenttype.Grid',{
    extend:'Erems.library.template.view.Grid',
    alias:'widget.paymenttypegrid',
    store:'Paymenttype',
    bindPrefixName:'Paymenttype',
    newButtonLabel:'New Paymenttype',
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
                    dataIndex: 'paymenttype',
                    hideable: false,
                    text: 'Payment Type'
                },
               
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});