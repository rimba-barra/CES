Ext.define('Appsmgmt.view.application.MenuFormData', {
	extend: 'Ext.form.Panel',
	alias: 'widget.MenuFormData',
	itemId: 'Menu',
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
					itemId: 'menu_id',
					name: 'menu_id',
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
					fieldLabel: 'Menu Name',
					itemId: 'menu_name',
					name: 'menu_name',
					allowBlank: false,
					enforceMaxLength: true,
					maxLength: 50,
					maskRe: /[A-Za-z0-9]/
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Caption',
					itemId: 'menu_caption',
					name: 'menu_caption',
					allowBlank: false,
					enforceMaxLength: true,
					maxLength: 50,
					maskRe: /[A-Za-z0-9\s\-\(\)]/
				},
				{
					xtype: 'combobox',
					fieldLabel: 'Parent',
					itemId: 'menu_parent',
					name: 'menu_parent',
					displayField: 'menu_name_display',
					valueField: 'menu_id',
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
					xtype: 'combobox',
					fieldLabel: 'Controller',
					itemId: 'controller_id',
					name: 'controller_id',
					displayField: 'controller_name',
					valueField: 'controller_id',
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
					fieldLabel: 'Widget',
					itemId: 'widget',
					name: 'widget',
					enforceMaxLength: true,
					maxLength: 50,
					maskRe: /[A-Za-z0-9\.]/
				},
				{
					xtype: 'fieldcontainer',
					layout: 'column',
					defaults: {
						labelSeparator: ' ',
						labelClsExtra: 'small',
						anchor: '100%',
						columnWidth: 0.5
					},
					items: [{
							xtype: 'textfield',
							fieldLabel: 'Icon',
							itemId: 'menu_icon',
							name: 'menu_icon',
							enforceMaxLength: true,
							maxLength: 255,
							maskRe: /[A-Za-z0-9\.\-\_\/]/
						},
						{
							xtype: 'textfield',
							fieldLabel: 'Icon Cls',
							itemId: 'menu_icon_cls',
							name: 'menu_icon_cls',
							enforceMaxLength: true,
							maxLength: 50,
							maskRe: /[A-Za-z0-9\s\.\-\_\/]/,
							labelWidth: 40,
							margin: '0 0 0 40'
						},
					]
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Order',
					itemId: 'menu_order',
					name: 'menu_order',
					enforceMaxLength: true,
					maxLength: 4,
					maskRe: /[0-9]/,
					anchor: '25%',
					value: 0
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Function Args.',
					itemId: 'menu_args',
					name: 'menu_args',
					enforceMaxLength: true,
					maxLength: 255
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