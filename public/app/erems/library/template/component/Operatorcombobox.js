Ext.define('Erems.library.template.component.Operatorcombobox', {
	extend: 'Erems.library.component.Combobox',
	alias: 'widget.operatorcombobox',
//	fieldLabel: '',
	store: new Ext.data.ArrayStore({
		fields: [
			'operator_id',
			'operator'
		],
		data: [['=', '='], ['!=', '!='], ['<=', '≤'], ['>=', '≥']]
	}),
	displayField: 'operator',
	valueField: 'operator_id',

	initComponent: function () {
		var me = this;

		me.callParent(arguments);
		//this.renderer = function(value, metadata, record, row, col, store) {
		//   return record.get(this.displayField);
		//}
	}
})