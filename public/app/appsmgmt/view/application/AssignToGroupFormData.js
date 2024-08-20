Ext.define('Appsmgmt.view.application.AssignToGroupFormData', {
	extend: 'Ext.form.Panel',
	alias: 'widget.AssignToGroupFormData',
	itemId: 'AssignToGroup',
	frame: true,
	autoScroll: true,
	bodyBorder: true,
	bodyPadding: 10,
	bodyStyle: 'border-top:none;border-left:none;border-right:none;',
	initComponent: function () {
		var me = this;
		Ext.applyIf(me, {
			defaults: {
				labelSeparator: ' ',
				labelClsExtra: 'small',
				anchor: '100%'
			},
			items: [
				{
					xtype: 'hiddenfield',
					itemId: 'apps_id',
					name: 'apps_id',
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Application',
					itemId: 'apps_name',
					name: 'apps_name',
					readOnly: true
				},
				{
					xtype: 'combobox',
					fieldLabel: 'Group',
					itemId: 'group_id',
					name: 'group_id',
					displayField: 'group_name',
					valueField: 'group_id',
					allowBlank: false,
					editable: true,
					typeAhead: true,
					forceSelection: true,
					queryMode: 'local',
//					readOnly: true,
					listeners: {
						beforequery: function (record) {
							record.query = new RegExp(record.query, 'i');
							record.forceAll = true;
						}
					}
				}
			],
			dockedItems: [{
					xtype: 'toolbar',
					dock: 'bottom',
					ui: 'footer',
					layout: {
						padding: 6,
						type: 'hbox'
					},
					items: [{
							xtype: 'button',
							action: 'save',
							itemId: 'btnSave',
							padding: 5,
							width: 75,
							iconCls: 'icon-save',
							text: 'Save'
						},
						{
							xtype: 'button',
							action: 'cancel',
							itemId: 'btnCancel',
							padding: 5,
							width: 75,
							iconCls: 'icon-cancel',
							text: 'Cancel'
						}]
				}]
		});
		me.callParent(arguments)
	}
});