Ext.define('Cashier.view.masterlimitkasbon.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.masterlimitkasbonformdata',
    requires: [
        'Cashier.library.template.view.MoneyField',
        'Cashier.library.template.component.Ptbyusercombobox',
        'Cashier.library.template.combobox.Usercombobox',
        'Cashier.library.template.combobox.Cashbontypecombobox',
    ],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 270,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [{
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },	
                {
                    xtype: 'ptbyusercombobox',
                    itemId: 'fs_pt_id',
                    name: 'projectpt_id',
                    anchor:'-15'

                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'id_limitkasbon',
                    name: 'id_limitkasbon'
                },
		       {
                    xtype: 'usercombobox',
                    itemId: 'fs_user_id',
                    name: 'user_id',
                    anchor:'-15',
                    allowBlank: false,

                },
                 {
                    xtype: 'cashbontypecombobox',
                    itemId: 'fs_cashbontype_id',
                    name: 'tipekasbondept_id',
                    anchor:'-15',
                    allowBlank: true,

                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Cashbon Limit',
                    anchor: '-5',
                    name: 'limit_cashbon',
                    flex: 1,
                    maxValue: 99,
                    minValue: 1,
                    value:0,
                    enableKeyEvents: true,
                    allowBlank: false,
                    blankText: 'This should not be blank!',
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Aging Days Limit',
                    anchor: '-5',
                    name: 'limit_aging',
                    flex: 1,
                    maxValue: 99,
                    minValue: 1,
                    value:0,
                    enableKeyEvents: true,
                    allowBlank: false,
                    blankText: 'This should not be blank!',
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
	
	
});