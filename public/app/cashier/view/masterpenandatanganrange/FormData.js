Ext.define('Cashier.view.masterpenandatanganrange.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.masterpenandatanganrangeformdata',
    requires: [
        'Cashier.library.template.view.MoneyField',
        'Cashier.library.template.component.Penandatangancombobox',
        'Cashier.library.template.component.Rangeapprovecombobox',
        'Cashier.library.template.component.Ptbyusercombobox',
    ],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 400,
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
                    xtype: 'hiddenfield',
                    itemId: 'range_penandatangan_id',
                    name: 'range_penandatangan_id'
                },	
                {
                    xtype: 'ptbyusercombobox',
                    itemId: 'fs_pt_id',
                    name: 'projectpt_id',
                    anchor:'-15'

                },
                {
                    xtype: 'penandatangancombobox',
                    itemId: 'fs_penandatangan_id',
                    name: 'penandatangan_id',
                    anchor:'-15'

                },
		{
                    xtype: 'textfield',
                    fieldLabel: 'Inisial',
                    anchor: '-5',
                    name: 'penandatangan_inisial',
                    itemId: 'penandatangan_inisial',
                    flex: 1,
                    readOnly: true,
                },
		{
                    xtype: 'textfield',
                    fieldLabel: 'Name',
                    anchor: '-5',
                    name: 'penandatangan_name',
                    itemId: 'penandatangan_name',
                    flex: 1,
                    readOnly: true,
                },
                
		{
                    xtype: 'textfield',
                    fieldLabel: 'Jabatan',
                    anchor: '-5',
                    name: 'penandatangan_jabatan',
                    itemId: 'penandatangan_jabatan',
                    flex: 1,
                    readOnly: true,
                },
                
		{
                    xtype: 'textfield',
                    fieldLabel: 'Departemen',
                    anchor: '-5',
                    name: 'penandatangan_departemen',
                    itemId: 'penandatangan_departemen',
                    flex: 1,
                    readOnly: true,
                },	
                {
                    xtype: 'rangeapprovecombobox',
                    itemId: 'fs_rangeapprove_id',
                    name: 'rangeapprove_id',
                    anchor:'-15'

                },
		{
                    xtype: 'textfield',
                    fieldLabel: 'Min Amount',
                    anchor: '-5',
                    name: 'range_min_amount',
                    itemId: 'range_min_amount',
                    flex: 1,
                    readOnly: true,
                },
                
		{
                    xtype: 'textfield',
                    fieldLabel: 'Max Amount',
                    anchor: '-5',
                    name: 'range_max_amount',
                    itemId: 'range_max_amount',
                    flex: 1,
                    readOnly: true,
                },
                 {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'prefixcombobox',
                            fieldLabel: 'Prefix',
                            itemId: 'fd_prefix_id',
                            id: 'prefix_id',
                            name: 'prefix_id',
                            width: 400,
                            emptyText: 'Select Prefix',
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                       
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
	
	
});