Ext.define('Appsmgmt.view.user.PasswordForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.PasswordForm',
	itemId: 'Password',
	frame: false,
	autoScroll: true,
	bodyBorder: false,
	bodyStyle: 'background:transparent;border-top:none;border-left:none;border-right:none;',
	initComponent: function () {
		var me = this;
		Ext.applyIf(me, {
			defaults: {
				labelWidth: 70,
				labelSeparator: ' ',
				labelClsExtra: 'small',
				anchor: '100%'
			},
			items: [
				{
					xtype: 'hiddenfield',
					itemId: 'user_id',
					name: 'user_id',
				},
				{
					xtype: 'textfield',
					fieldLabel: 'User',
					itemId: 'user_name',
					name: 'user_name',
					allowBlank: false,
					readOnly: true
				},
//				{
//					xtype: 'combobox',
//					fieldLabel: 'User',
//					itemId: 'user_id',
//					name: 'user_id',
//					displayField: 'user_name',
//					valueField: 'user_id',
//					allowBlank: false,
//					editable: false,
//					typeAhead: true,
//					forceSelection: true,
//					queryMode: 'local',
//					readOnly: true
//				},
				{
					xtype: 'textfield',
					fieldLabel: 'Password',
					itemId: 'user_pass',
					name: 'user_pass',
					minLength: apps.passminlength,
					allowBlank: false,
					maxLength: 50,
					enforceMaxLength: 50,
					maskRe: /[A-Za-z0-9!@#$%^&*()_+<>?,.\-\/]/,
					margin: '0 0 30 0'
				}],
			buttons: [{
					text: '?',
					itemId: 'btnHelp'
				},
				'->', {
					text: 'Submit',
					itemId: 'btnSubmit',
//					formBind: true
				},
				{
					text: 'Cancel',
					itemId: 'btnCancel'
				}]
		});
		me.callParent(arguments)
	}
});