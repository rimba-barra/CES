Ext.define('Erems.library.template.component.Citraclubcombobox', {
	extend: 'Erems.library.component.Combobox',
	alias: 'widget.citraclubcombobox',
	store: 'Mastercitraclub',
	fieldLabel: 'Citra club',
	displayField: 'clubname',
	valueField: 'citraclub_id',
	addBlankValue: true,
	initComponent: function () {
		var me = this;

		me.callParent(arguments);
		//this.renderer = function(value, metadata, record, row, col, store) {
		//   return record.get(this.displayField);
		//}
	}
})