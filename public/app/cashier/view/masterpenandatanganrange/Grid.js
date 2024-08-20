Ext.define('Cashier.view.masterpenandatanganrange.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.masterpenandatanganrangegrid',
    store: 'Masterpenandatanganrange',
    bindPrefixName: 'Masterpenandatanganrange',
    newButtonLabel: 'Add New',
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
                    header: 'Penandatangan ID',
                    dataIndex: 'range_penandatangan_id',
                    hidden: true
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_pt_name',
                    width: 250,
                    dataIndex: 'pt_name',
                    hideable: false,
                    text: 'Company'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_inisial',
                    width: 150,
                    dataIndex: 'penandatangan_inisial',
                    hideable: false,
                    text: 'Inisial'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_name',
                    width: 150,
                    dataIndex: 'penandatangan_name',
                    hideable: false,
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_fromamount',
                    width: 150,
                    dataIndex: 'range_fromamount',
                    hideable: false,
                    text: 'Min Amount'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_untilamount',
                    width: 150,
                    dataIndex: 'range_untilamount',
                    hideable: false,
                    text: 'Max Amount'
                },
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_prefixid',
                    width: 150,
                    dataIndex: 'prefix',
                    hideable: false,
                    text: 'Prefix'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },

	generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
           hidden: true,
           itemId: 'actioncolumn',
           width: 50,
           resizable: false,
            align: 'right',
            hideable: false,
           items: [
               {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName+'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                   text: 'Delete',
                   iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName+'Delete',
                   altText: 'Delete',
                   tooltip: 'Delete'                
               },
				
            ]
       };        return ac;
    }
});