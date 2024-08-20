Ext.define('Erems.library.template.component.Namapenerimakomisicombobox', {
	extend: 'Erems.library.component.Combobox',
	alias: 'widget.namapenerimakomisicombobox',
	store: 'Namapenerimakomisi',
//	store: 'Masterdistchannel',
//    fieldLabel: 'Distribution Channel',
	displayField: 'reff_name',
	valueField: 'reff_id',
	//addBlankValue:true,
	initComponent: function () {
		var me = this;

		me.callParent(arguments);
		//this.renderer = function(value, metadata, record, row, col, store) {
		//   return record.get(this.displayField);
		//}
	}
})