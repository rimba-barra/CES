Ext.define('Appsmgmt.view.application.ActionFormData', {
	extend: 'Ext.form.Panel',
	alias: 'widget.ActionFormData',
	itemId: 'Action',
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
					itemId: 'action_id',
					name: 'action_id',
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
					xtype: 'textfield',
					fieldLabel: 'Action Name',
					itemId: 'action_name',
					name: 'action_name',
					allowBlank: false,
					enforceMaxLength: true,
					maxLength: 50,
					maskRe: /[A-Za-z0-9]/
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Action Base Name',
					itemId: 'action_basename',
					name: 'action_basename',
					allowBlank: false,
					enforceMaxLength: true,
					maxLength: 50,
					maskRe: /[A-Za-z0-9]/
				},
				{
					xtype: 'combobox',
					fieldLabel: 'Controller',
					itemId: 'controller_id',
					name: 'controller_id',
					displayField: 'controller_name',
					valueField: 'controller_id',
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
					xtype: 'textfield',
					fieldLabel: 'URL',
					itemId: 'action_url',
					name: 'action_url',
					allowBlank: false,
					enforceMaxLength: true,
					maxLength: 255,
					maskRe: /[A-Za-z0-9\/]/
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
					xtype: 'fieldcontainer',
					layout: 'column',
					defaults: {
						labelSeparator: ' ',
						labelClsExtra: 'small',
						columnWidth: 0.3
					},
					items: [{
							xtype: 'checkboxfield',
							fieldLabel: ' ',
							itemId: 'share',
							name: 'share',
							boxLabel: 'Share',
							boxLabelCls: 'x-form-cb-label small',
							inputValue: '1',
							uncheckedValue: '0',
							margin: '10 0 0 0'
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: ' ',
							itemId: 'active',
							name: 'active',
							boxLabel: 'Active',
							boxLabelCls: 'x-form-cb-label small',
							inputValue: '1',
							uncheckedValue: '0',
							margin: '10 0 0 0'
						}]
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