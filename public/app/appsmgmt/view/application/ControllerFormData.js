Ext.define('Appsmgmt.view.application.ControllerFormData', {
	extend: 'Ext.form.Panel',
	alias: 'widget.ControllerFormData',
	itemId: 'Controller',
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
					itemId: 'controller_id',
					name: 'controller_id',
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
					fieldLabel: 'Controller Name',
					itemId: 'controller_name',
					name: 'controller_name',
					allowBlank: false,
					enforceMaxLength: true,
					maxLength: 50,
					maskRe: /[A-Za-z0-9]/
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
						labelClsExtra: 'small'
					},
					items: [{
							xtype: 'checkboxfield',
							fieldLabel: ' ',
							itemId: 'active',
							name: 'active',
							boxLabel: 'Active',
							boxLabelCls: 'x-form-cb-label small',
							inputValue: '1',
							uncheckedValue: '0',
							margin: '10 0 0 0',
							columnWidth: 0.3
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: ' ',
							itemId: 'default_actions',
							name: 'default_actions',
							boxLabel: 'Generate Default Actions',
							boxLabelCls: 'x-form-cb-label small',
							inputValue: '1',
							uncheckedValue: '0',
							margin: '10 0 0 0',
							columnWidth: 0.7
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