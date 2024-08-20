Ext.define('Erems.view.aktappjb.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.aktappjbgrid',
    store: 'Aktappjb',
    bindPrefixName: 'Aktappjb',
    newButtonLabel: 'New Akta PPJB',
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
                    itemId: 'colms_aktappjb_no',
                    width: 175,
                    dataIndex: 'aktappjb_no',
                    hideable: false,
                    text: 'Akta PPJB No.'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_aktappjb_date',
                    width: 150,
                    dataIndex: 'aktappjb_date',
                    hideable: false,
                    text: 'Akta PPJB Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_cluster',
                    width: 100,
                    align: 'right',
                    dataIndex: 'cluster',
                    text: 'Cluster'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_block',
                    width: 60,
                    dataIndex: 'block',
                    hideable: false,
                    text: 'Block'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_number',
                    width: 60,
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Unit'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_aktappjb_name',
                    width: 100,
                    align: 'right',
                    dataIndex: 'aktappjb_name',
                    text: 'Akta PPJB Name'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_aktappjb_address',
                    width: 150,
                    align: 'right',
                    dataIndex: 'aktappjb_address',
                    text: 'Akta PPJB Address'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_aktappjb_ktp',
                    width: 150,
                    dataIndex: 'aktappjb_ktp',
                    hideable: false,
                    text: 'KTP Number'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_aktappjb_npwp',
                    width: 150,
                    dataIndex: 'aktappjb_npwp',
                    hideable: false,
                    text: 'NPWP'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchaseletter_no',
                    width: 175,
                    dataIndex: 'purchaseletter_no',
                    hideable: false,
                    text: 'Purchase Letter No'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_firstinstallment_date',
                    width: 150,
                    dataIndex: 'firstinstallment_date',
                    hideable: false,
                    text: 'First Installment Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_pelunasan_date',
                    width: 150,
                    dataIndex: 'pelunasan_date',
                    hideable: false,
                    text: 'Pelunasan Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_duration',
                    width: 100,
                    dataIndex: 'duration',
                    hideable: false,
                    text: 'Inst. Duration'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_sign_date',
                    width: 150,
                    dataIndex: 'sign_date',
                    hideable: false,
                    text: 'Sign Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_handover_date',
                    width: 150,
                    dataIndex: 'handover_date',
                    hideable: false,
                    text: 'Hand Over Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_notaris',
                    width: 150,
                    dataIndex: 'notaris',
                    hideable: false,
                    text: 'Notaris'
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