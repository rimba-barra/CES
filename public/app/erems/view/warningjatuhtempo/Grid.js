Ext.define('Erems.view.warningjatuhtempo.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.warningjatuhtempogrid',
    store: 'Warningjatuhtempo',
    bindPrefixName: 'Warningjatuhtempo',
    newButtonLabel: 'New Warning Jatuh Tempo',
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
                    itemId: 'colms_duedate',
                    width: 100,
                    dataIndex: 'duedate',
                    hideable: false,
                    text: 'Due Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_lama_tunggakan',
                    width: 100,
					align: 'right',
                    dataIndex: 'lama_tunggakan',
                    hideable: false,
                    text: 'Lama Tunggakan'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_amount',
                    width: 150,
					align: 'right',
                    dataIndex: 'amount',
                    hideable: false,
                    text: 'Amount'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_remaining_balance',
                    width: 150,
					align: 'right',
                    dataIndex: 'remaining_balance',
                    hideable: false,
                    text: 'Remaining Balance'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_scheduletype',
                    width: 75,
                    dataIndex: 'scheduletype',
                    hideable: false,
                    text: 'Type'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_termin',
                    width: 50,
					align: 'right',
                    dataIndex: 'termin',
                    hideable: false,
                    text: 'Termin'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_uangmukatype',
                    width: 150,
                    dataIndex: 'uangmukatype',
                    hideable: false,
                    text: 'Source'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_pricetype',
                    width: 100,
                    dataIndex: 'pricetype',
                    hideable: false,
                    text: 'Price Type'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_homephone',
                    width: 100,
					hideable: false,
                    dataIndex: 'customer_homephone',
                    text: 'Home Phone'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_customer_mobilephone',
                    width: 100,
					hideable: false,
                    dataIndex: 'customer_mobilephone',
                    text: 'Handphone'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_customer_address',
                    width: 150,
					hideable: false,
                    dataIndex: 'customer_address',
                    text: 'Address'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchaseletter_no',
                    width: 150,
					hideable: false,
                    dataIndex: 'purchaseletter_no',
                    text: 'Purchase Letter No'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchase_date',
                    width: 100,
                    dataIndex: 'purchase_date',
                    hideable: false,
                    text: 'Purchase Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_harga_jual',
                    width: 150,
                    dataIndex: 'harga_jual',
					align: 'right',
                    hideable: false,
                    text: 'Sales Price'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_salesman_name',
                    width: 130,
					hideable: false,
                    dataIndex: 'salesman_name',
                    text: 'Sales Name'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_clubcitra_member',
                    width: 150,
					hideable: false,
                    dataIndex: 'clubcitra_member',
                    text: 'Member'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_respon_note',
                    width: 150,
                    dataIndex: 'respon_note',
                    hideable: false,
                    text: 'Customer Feedback'
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
                    text: 'Feedback',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName+'CreateFeedback',
                    altText: 'Feedback',
                    tooltip: 'Feedback'
                }
            ]
        };
        return ac;
    }
});