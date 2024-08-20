Ext.define('Appsmgmt.view.application.DependencyFormData', {
	extend: 'Ext.form.Panel',
	alias: 'widget.DependencyFormData',
	itemId: 'Dependency',
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
					itemId: 'apps_depend_id',
					name: 'apps_depend_id',
					hidden: true
				},
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
					fieldLabel: 'Dependency',
					itemId: 'depend_id',
					name: 'depend_id',
					displayField: 'depend_name',
					valueField: 'depend_id',
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