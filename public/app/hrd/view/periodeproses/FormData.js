Ext.define('Hrd.view.periodeproses.FormData', {
    alias: 'widget.periodeprosesformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'periodeproses_id'
                },
				{
                    xtype: 'combobox',
					width: 300,
                    fieldLabel: 'Status',
                    name: 'statusperiode_id',
                    displayField: 'statusperiode',
                    valueField: 'statusperiode_id',
					allowBlank	: false
                },
                {
					xtype: 'numberfield',
                    fieldLabel: 'Tahun',
                    name: 'tahun',
					allowBlank	: false,
					value: new Date().getFullYear()
                },
				{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
						{
							xtype: 'datefield',
							itemId: 'start_periode',
							name: 'start_periode',
							allowBlank	: false,
							fieldLabel: 'Periode',
							labelSeparator:'',
							editable: false,
							width: 230,
							format: 'd-M-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							value: new Date()
						},
						/*{
							xtype: 'label',
							styleHtmlContent: false,
							width: 5,
							text:'to'
						},*/
						{
							xtype: 'datefield',
							itemId: 'end_periode',
							name: 'end_periode',
							allowBlank	: false,
							labelSeparator:'',
							editable: false,
							width: 130,
							format: 'd-M-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							value: new Date()
						}
					]
				}
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});