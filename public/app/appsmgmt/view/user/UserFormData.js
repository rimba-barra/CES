Ext.define('Appsmgmt.view.user.UserFormData', {
	extend: 'Ext.form.Panel',
	alias: 'widget.UserFormData',
	itemId: 'User',
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
					xtype: 'fieldset',
					defaults: {
						labelSeparator: ' ',
						labelClsExtra: 'small',
						anchor: '100%'
					},
					items: [{
							xtype: 'hiddenfield',
							itemId: 'user_id',
							name: 'user_id',
							hidden: true
						},
						{
							xtype: 'textfield',
							fieldLabel: 'User Name',
							itemId: 'user_name',
							name: 'user_name',
							allowBlank: false,
							enforceMaxLength: true,
							minLength: 4,
							maxLength: 50,
							maskRe: /[A-Za-z0-9]/,
							anchor: '50%'
						},
						{
							xtype: 'textfield',
							fieldLabel: 'Full Name',
							itemId: 'user_fullname',
							name: 'user_fullname',
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
								anchor: '100%',
								columnWidth: 0.5
							},
							items: [{
									xtype: 'textfield',
									fieldLabel: 'Password',
									itemId: 'user_pass',
									name: 'user_pass',
									allowBlank: false,
									enforceMaxLength: true,
									minLength: 6,
									maxLength: 50,
									maskRe: /[^\`\"\'\s]/
								},
								{
									xtype: 'textfield',
									fieldLabel: 'Email',
									itemId: 'user_email',
									name: 'user_email',
									vtype: 'email',
									enforceMaxLength: true,
									maxLength: 255,
									maskRe: /[^\`\"\']/,
									labelWidth: 50,
									margin: '0 0 0 30'
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
							margin: '10 0 0 0',
							name: 'active',
							boxLabel: 'Active',
							boxLabelCls: 'x-form-cb-label small',
							inputValue: '1',
							uncheckedValue: '0'
						}]
				},
				{
					xtype: 'fieldset',
					margin: '10 0',
					items: [{
							xtype: 'combobox',
							fieldLabel: 'Employee Name',
							itemId: 'employee_id',
							name: 'employee_id',
							displayField: 'employee_name',
							valueField: 'employee_id',
							editable: false,
							typeAhead: true,
							forceSelection: true,
							queryMode: 'local',
							labelSeparator: ' ',
							labelClsExtra: 'small',
							anchor: '100%'
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
									fieldLabel: 'NIK',
									itemId: 'employee_nik',
									name: 'employee_nik',
									readOnly: true
								},
								{
									xtype: 'textfield',
									fieldLabel: 'Position',
									itemId: '',
									name: '',
									readOnly: true,
									labelWidth: 60,
									margin: '0 0 0 30'
								}]
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
									fieldLabel: 'Division',
									itemId: '',
									name: '',
									readOnly: true
								},
								{
									xtype: 'textfield',
									fieldLabel: 'Department',
									itemId: '',
									name: '',
									readOnly: true,
									labelWidth: 60,
									margin: '0 0 0 30'
								}]
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