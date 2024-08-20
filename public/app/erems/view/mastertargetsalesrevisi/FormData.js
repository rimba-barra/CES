Ext.define('Erems.view.mastertargetsalesrevisi.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.MastertargetsalesrevisiFormData',
	requires: ['Erems.library.template.view.MoneyField'],
	itemId: 'MastertargetsalesrevisiFormData',
	width: 450,
	fieldDefaults: {labelSeparator: ''},
	initComponent: function () {
		var me = this;
		Ext.applyIf(me, {
			defaults: {
				labelSeparator: ' ',
				labelClsExtra: 'small',
				fieldStyle: 'margin-bottom:3px;',
				anchor: '100%'
			},
			items: [
				{
					xtype: 'hiddenfield',
					itemId: 'targetsales_revisi_id',
					name: 'targetsales_revisi_id'
				},
				{
					xtype: 'hiddenfield',
					fieldLabel: 'initial',
					itemId: 'initial',
					name: 'initial',
					value: 0
				},
				{
					xtype: 'numberfield',
					fieldLabel: 'Tahun',
					itemId: 'tahun',
					name: 'tahun',
					minValue: 1945,
					maxValue: 2100,
					readOnly: true,
					labelWidth: 130
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Bulan',
					readOnly: true,
					itemId: 'bulan',
					name: 'bulan',
					labelWidth: 130
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Project',
					readOnly: true,
					itemId: 'project',
					name: 'project_name',
					labelWidth: 130
				},
			]
		});
		me.callParent(arguments);
	}
});