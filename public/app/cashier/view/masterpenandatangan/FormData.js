Ext.define('Cashier.view.masterpenandatangan.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.masterpenandatanganformdata',
    requires: [
        'Cashier.library.template.view.MoneyField',
        'Cashier.library.template.component.Ptbyusercombobox',
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
                    itemId: 'penandatangan_id',
                    name: 'penandatangan_id'
                },
		{
                    xtype: 'textfield',
                    fieldLabel: 'Inisial',
                    anchor: '-5',
                    name: 'inisial',
                    flex: 1,
                    allowBlank: false,
                    blankText: 'This should not be blank!',
                },
		{
                    xtype: 'textfield',
                    fieldLabel: 'Name',
                    anchor: '-5',
                    name: 'name',
                    flex: 1,
                    allowBlank: false,
                    blankText: 'This should not be blank!',
                },
                
		{
                    xtype: 'textfield',
                    fieldLabel: 'Jabatan',
                    anchor: '-5',
                    name: 'jabatan',
                    flex: 1,
                },
                
		{
                    xtype: 'textfield',
                    fieldLabel: 'Departemen',
                    anchor: '-5',
                    name: 'departemen',
                    flex: 1,
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Sequence',
                    anchor: '-5',
                    name: 'sort',
                    flex: 1,
                    maxValue: 99,
                    minValue: 1,
                    value:0,
                    enableKeyEvents: true
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
	
	
});