Ext.define('Erems.view.fakturpajak.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.fakturpajakformsearch',
	requires: [
		'Erems.library.template.component.Paymentflagcombobox',
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox',
	],
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'fs_unit_number',
                    name: 'unit_number',
                    fieldLabel: 'Unit Number',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    anchor:'-15'
                },
				{
                    xtype: 'panel',
                    height: 48,
                    bodyStyle:'background:none;border:0;',
					anchor:'-15',
                    layout: {
                        type: 'column'
                    },
                    items: [
						{
							xtype: 'datefield',
							itemId: 'payment_startdate',
							name: 'payment_startdate',
							fieldLabel: 'Payment Date',
							labelSeparator:'',
							width: 100,
							labelAlign: 'top',
							//editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u'
						},
						{
							xtype: 'label',
							margin: '23px 5px 0 5px',
							styleHtmlContent: false,
							width: 10,
							text:'to'
						},
						{
							xtype: 'datefield',
							itemId: 'payment_enddate',
							name: 'payment_enddate',
							fieldLabel: '&nbsp;',
							labelSeparator:'',
							width: 100,
							labelAlign: 'top',
							//editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u'
						},
                    ]
                },
                {
                    xtype: 'paymentflagcombobox',
                    itemId: 'fs_paymentflag_id',
                    name: 'paymentflag_id',
                    anchor:'-15'
                },
				{
                    xtype: 'clustercombobox',
                    itemId: 'fs_cluster_id',
                    name: 'cluster_id',
                    anchor:'-15'
                },
				{
                    xtype: 'blockcombobox',
                    itemId: 'fs_block_id',
                    name: 'block_id',
                    anchor:'-15'
                }
				
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});