Ext.define('Erems.view.pelunasan.Grid', {
    extend         : 'Erems.library.template.view.Grid',
    alias          : 'widget.pelunasangrid',
    store          : 'Pelunasan',
    bindPrefixName : 'Pelunasan',
    newButtonLabel : 'New Pelunasan',
    initComponent  : function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu : me.generateContextMenu(),
            dockedItems : me.generateDockedItems(),
            viewConfig  : {},
            selModel    : Ext.create('Ext.selection.CheckboxModel', {}),
            plugins     : [
				Ext.create('Ext.grid.plugin.CellEditing', {
                    ptype        : 'cellediting',
                    clicksToEdit : 1
				})
			],
            columns: [
				{
                    xtype : 'rownumberer'
                },
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_kawasan',
                    width     : 100,
                    align     : 'right',
                    dataIndex : 'cluster',
                    text      : 'Cluster'
                },
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_block',
                    width     : 100,
                    dataIndex : 'block',
                    hideable  : false,
                    text      : 'Block Name'
                },
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_unit_number',
                    width     : 100,
                    dataIndex : 'unit_number',
                    hideable  : false,
                    text      : 'Unit No.'
                },
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_cust_name',
                    width     : 150,
                    dataIndex : 'customer_name',
                    hideable  : false,
                    text      : 'Customer Name'
                },
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_purchaseletter_no',
                    width     : 150,
                    hideable  : false,
                    dataIndex : 'purchaseletter_no',
                    text      : 'Purchase Letter No'
                },
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_purchase_date',
                    width     : 80,
                    dataIndex : 'purchase_date',
                    hideable  : false,
                    text      : 'Purchase Date',
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y'),
                    align     : 'center',
                },
				{
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_harga_jual',
                    width     : 150,
                    dataIndex : 'harga_jual',
                    align     : 'right',
                    hideable  : false,
                    text      : 'Sales Price'
                },
				{
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_total_payment',
                    width     : 150,
                    dataIndex : 'total_payment',
                    align     : 'right',
                    hideable  : false,
                    text      : 'Total Payment'
                },
				{
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_remaining_balance_total',
                    width     : 150,
                    dataIndex : 'remaining_balance_total',
                    align     : 'right',
                    hideable  : false,
                    text      : 'Remaining Balance'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_remaining_denda_total',
                    width     : 150,
                    dataIndex : 'remaining_denda_total',
                    align     : 'right',
                    hideable  : false,
                    text      : 'Remaining Denda'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_serahterima_date',
                    width     : 80,
                    dataIndex : 'serahterima_date',
                    hideable  : false,
                    text      : 'Tanggal BAST',
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y'),
                    align     : 'center',
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_ajb_date',
                    width     : 80,
                    dataIndex : 'ajb_date',
                    hideable  : false,
                    text      : 'Tanggal AJB',
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y'),
                    align     : 'center',
                },
				{
                    xtype        : 'datecolumn',
                    header       : 'Lunas Date?',
                    dataIndex    : 'lunas_date',
                    width        : 90,
                    format       : 'd-m-Y',
                    altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                    submitFormat : 'Y-m-d H:i:s.u',
                    style        : 'font-weight:bold;',
                    editor       : {
                        xtype        : 'datefield',
                        format       : 'd-m-Y',
                        altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                        submitFormat : 'Y-m-d H:i:s.u'
					}
				},
                
                me.generateActionColumn()
            ],
			bbar: [
                '',
                {
                    xtype : 'tbfill'
                },
                '',
                {
                    xtype : 'tbfill'
                },
    			{
                    xtype   : 'button',
                    hidden  : false,
                    itemId  : 'btnLunasAll',
                    margin  : '0 5 0 0',
                    action  : 'setLunasAll',
                    iconCls : 'icon-edit',
                    text    : 'SET LUNAS ALL',
    			},
    			{
                    xtype   : 'button',
                    hidden  : false,
                    itemId  : 'btnLunas',
                    margin  : '0 5 0 0',
                    action  : 'submitLunas',
                    iconCls : 'icon-save',
                    text    : 'APPLY',
    			}
            ]
        });

        me.callParent(arguments);
    }
});