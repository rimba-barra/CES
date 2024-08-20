Ext.define('Appsmgmt.view.accessright.GroupActionFormData', {
	extend: 'Ext.form.Panel',
	alias: 'widget.GroupActionFormData',
	itemId: 'GroupAction',
	frame: true,
	autoScroll: true,
	bodyBorder: true,
	bodyPadding: 10,
	bodyStyle: 'border-top:none;border-left:none;border-right:none;',
	initComponent: function () {
		var me = this;
		Ext.applyIf(me, {
			defaults: {
				anchor: '100%',
				labelSeparator: ' ',
				labelClsExtra: 'small'
			},
			items: [
				{
					xtype: 'hiddenfield',
					itemId: 'group_action_id',
					name: 'group_action_id',
					hidden: true
				},
				{
					xtype: 'hiddenfield',
					itemId: 'group_id',
					name: 'group_id',
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Group',
					itemId: 'group_name',
					name: 'group_name',
					readOnly: true
				},
				{
					xtype: 'combobox',
					fieldLabel: 'Application',
					itemId: 'apps_id',
					name: 'apps_id',
					displayField: 'apps_name',
					valueField: 'apps_id',
					allowBlank: false,
					editable: false,
					typeAhead: true,
					forceSelection: true,
					queryMode: 'local'
				},
				{
					xtype: 'combobox',
					fieldLabel: 'Action',
					itemId: 'action_id',
					name: 'action_id',
					displayField: 'action_name',
					valueField: 'action_id',
					allowBlank: false,
					typeAhead: true,
					queryMode: 'local',
					editable: true,
					forceSelection: true,
					listeners: {
						beforequery: function (record) {
							record.query = new RegExp(record.query, 'i');
							record.forceAll = true;
						}
					}
				},
				{
					xtype: 'textarea',
					fieldLabel: 'Description',
					itemId: 'description',
					name: 'description',
					height: 50,
					enforceMaxLength: true,
					maxLength: 255,
					maskRe: /[^\`\"\']/
				},
				{
					xtype: 'checkboxfield',
					fieldLabel: ' ',
					itemId: 'active',
					margin: '20 0 0 0',
					name: 'active',
					boxLabel: 'Active',
					boxLabelCls: 'x-form-cb-label small',
					inputValue: '1',
					uncheckedValue: '0'
				}],
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