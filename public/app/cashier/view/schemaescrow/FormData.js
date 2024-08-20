Ext.define('Cashier.view.schemaescrow.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.schemaescrowformdata',
    requires: [
        'Cashier.library.template.view.MoneyField',
        'Cashier.library.template.component.Ptbyusercombobox',
        'Cashier.view.schemaescrow.PencairanGrid',
    ],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    width: 1000,
    height: 650,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [{
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },	
                {
                    xtype: 'hiddenfield',
                    itemId: 'fs_pt_id',
                    name: 'projectpt_id',
                    anchor:'-15'

                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'purchaseletter_id',
                    name: 'purchaseletter_id'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'unit_id',
                    name: 'unit_id'
                },
		{
                    xtype: 'textfield',
                    fieldLabel: 'Purchaseletter No',
                    anchor: '-5',
                    name: 'purchaseletter_no',
                    readOnly: true,
                },
		{
                    xtype: 'textfield',
                    fieldLabel: 'Customer Name',
                    anchor: '-5',
                    name: 'customer_name',
                    readOnly: true,
                },
		{
                    xtype: 'textfield',
                    fieldLabel: 'Cluster',
                    anchor: '-5',
                    name: 'cluster_name',
                    readOnly: true,
                },
		{
                    xtype: 'textfield',
                    fieldLabel: 'Unit Number',
                    anchor: '-5',
                    name: 'unit_number',
                    readOnly: true,
                },
		{
                    xtype: 'textfield',
                    fieldLabel: 'KPR Approve',
                    anchor: '-5',
                    name: 'kpr_value_approve',
                    readOnly: true,
                },
		{
                    xtype: 'textfield',
                    fieldLabel: 'Akad Date',
                    anchor: '-5',
                    name: 'akad_realisasiondate',
                    readOnly: true,
                },
                 /* DETAIL PENCAIRAN */
               	{xtype: 'panel', bodyPadding: 10, title: 'DETAIL PENCAIRAN', collapsible: true,
                    width: '100%',
                    items: [
                                        {
                                                xtype: 'panel',
                    layout: 'fit',
                    bodyStyle: 'border:0px',
                    items: [
                                                        {
                                                                //  bodyPadding: 10,
                                                                padding: '10px 0 0 0',
                                                                layout: 'hbox',
                                                                bodyStyle: 'border:0px',
                                                                items: [{
                                                                                xtype: 'schemaescrowpencairangrid',
                                                                                width: '100%',
                                                                                itemId: 'MyPencairanGrid'
                                                                }]
                                                        }
                                                ]
                                        }
                                ]
                        }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
	
	
});