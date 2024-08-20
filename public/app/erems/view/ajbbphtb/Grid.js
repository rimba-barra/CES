Ext.define('Erems.view.ajbbphtb.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.ajbbphtbgrid',
    store: 'Ajbbphtb',
    bindPrefixName: 'Ajbbphtb',
    newButtonLabel: 'New AJB & BPHTB',
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
                    itemId: 'colms_kawasan',
                    width: 100,
                    align: 'right',
                    dataIndex: 'cluster',
                    text: 'Cluster'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_block',
                    width: 100,
                    dataIndex: 'block',
                    hideable: false,
                    text: 'Block Name'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_number',
                    width: 100,
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Unit No.'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_cust_name',
                    width: 150,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Customer Name'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_ajbbphtb_no',
                    width: 150,
					hideable: false,
                    dataIndex: 'ajbbphtb_no',
                    text: 'Nomor Surat'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_ajbbphtb_date',
                    width: 150,
                    dataIndex: 'ajbbphtb_date',
                    hideable: false,
                    text: 'Tanggal Surat',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_npop',
                    width: 150,
                    dataIndex: 'npop',
					align: 'right',
                    hideable: false,
                    text: 'NPOP'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_npoptkp',
                    width: 150,
                    dataIndex: 'npoptkp',
					align: 'right',
                    hideable: false,
                    text: 'NPOPTKP'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_npopkp',
                    width: 150,
                    dataIndex: 'npopkp',
					align: 'right',
                    hideable: false,
                    text: 'NPOPKP'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_bphtb',
                    width: 150,
                    dataIndex: 'bphtb',
					align: 'right',
                    hideable: false,
                    text: 'BPHTB'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_bajb',
                    width: 150,
                    dataIndex: 'bajb',
					align: 'right',
                    hideable: false,
                    text: 'AJB'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_nonpajak',
                    width: 150,
                    dataIndex: 'nonpajak',
					align: 'right',
                    hideable: false,
                    text: 'NON TAX'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_total',
                    width: 150,
                    dataIndex: 'total',
					align: 'right',
                    hideable: false,
                    text: 'TOTAL'
                },
				
                /*{
                    xtype: 'gridcolumn',
                    itemId: 'colms_addon',
                    width: 150,
                    dataIndex: 'addon',
                    hideable: false,
                    text: 'Added Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },*/
                
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
				{
                    text: 'View',
                    iconCls: 'icon-search',
                    className:'view',
                    bindAction: me.bindPrefixName + 'Read',
                    altText: 'View',
                    tooltip: 'View'
                }
            ]
        };
        return ac;
    }
});