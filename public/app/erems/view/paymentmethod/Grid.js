Ext.define('Erems.view.paymentmethod.Grid',{
    extend:'Erems.library.template.view.Grid',
    alias:'widget.paymentmethodgrid',
    store:'Paymentmethod',
    bindPrefixName:'Paymentmethod',
    newButtonLabel:'New Payment method',
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
                    dataIndex: 'paymentmethod',
                    hideable: false,
                    text: 'Payment Method'
                },
               
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});