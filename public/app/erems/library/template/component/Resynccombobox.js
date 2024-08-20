Ext.define('Erems.library.template.component.Resynccombobox', {
	// extend: 'Ext.form.field.ComboBox',
	extend: 'Erems.library.component.Combobox',
	queryMode: 'local',
	alias: 'widget.resynccombobox',
	store: 'Resync',
	fieldLabel: 'Resync',
	displayField: 'resync_name',
	valueField: 'api_vabca_logs_id',
	// editable: true,
	// forceSelection: true,
	// listeners: {
	// 	beforequery: function (record) {
	// 		record.query = new RegExp(record.query, 'i');
	// 		record.forceAll = true;
	// 	}
	// },
	//addBlankValue:true,
	initComponent: function (config) {
		var me = this;

		me.callParent(config);
		//this.renderer = function(value, metadata, record, row, col, store) {
		//   return record.get(this.displayField);
		//}
	}
})