Ext.define('Appsmgmt.view.accessright.GroupUserFormData', {
	extend: 'Ext.form.Panel',
	alias: 'widget.GroupUserFormData',
	itemId: 'GroupUser',
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
			items: [{
					xtype: 'hiddenfield',
					itemId: 'group_user_id',
					name: 'group_user_id',
					hidden: true
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
					queryMode: 'local',
					readOnly: true
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
					fieldLabel: 'User',
					itemId: 'user_id',
					name: 'user_id',
					displayField: 'user_name',
					valueField: 'user_id',
					allowBlank: false,
					editable: true,
					typeAhead: true,
					forceSelection: true,
					queryMode: 'local',
					listeners: {
						beforequery: function (record) {
							record.query = new RegExp(record.query, 'i');
							record.forceAll = true;
						}
					}
				},
				{
					xtype: 'fieldcontainer',
					itemId: 'projectpt',
					layout: 'column',
					defaults: {
						labelSeparator: ' ',
						labelClsExtra: 'small',
						anchor: '100%',
						columnWidth: 0.5,
						editable: false,
						typeAhead: true,
						forceSelection: true,
					},
					items: [{
							xtype: 'combobox',
							fieldLabel: 'Project',
							itemId: 'project_id',
							name: 'project_id',
							displayField: 'project_name',
							valueField: 'project_id',
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
							xtype: 'combobox',
							fieldLabel: 'PT',
							itemId: 'pt_id',
							name: 'pt_id',
							displayField: 'pt_name',
							valueField: 'pt_id',
							queryMode: 'local',
							readOnly: true,
							labelWidth: 30,
							margin: '0 0 0 40',
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
							xtype: 'combobox',
							itemId: 'projectpt_id',
							name: 'projectpt_id',
							displayField: 'projectpt_id',
							valueField: 'projectpt_id',
							queryMode: 'local',
							readOnly: true,
							hidden: true
						}]
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
							user: 'save',
							itemId: 'btnSave',
							padding: 5,
							width: 75,
							iconCls: 'icon-save',
							text: 'Save'
						},
						{
							xtype: 'button',
							user: 'cancel',
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