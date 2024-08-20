Ext.define('Erems.view.siteplan.FormSearch', {
	extend: 'Erems.library.template.view.FormSearch',
	alias: 'widget.siteplanformsearch',
	requires: [
		'Erems.library.template.component.Clustercombobox'],
	initComponent: function () {
		var me = this;

		//        var cbf = new Erems.template.ComboBoxFields();

		Ext.applyIf(me, {
			defaults: me.generateDefaults(),
			items: [

				{
					xtype: 'clustercombobox',
					itemId: 'fs_cluster_id',
					name: 'cluster_id',
					anchor: '-15',
					listeners: {
						beforequery: function (record) {
							record.query = new RegExp(record.query, 'i');
							record.forceAll = true;
						},
					}

				},
			],
			dockedItems: me.generateDockedItems()
		});

		me.callParent(arguments);
	}
});