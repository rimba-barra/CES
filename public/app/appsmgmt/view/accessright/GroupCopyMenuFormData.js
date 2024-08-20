Ext.define("Appsmgmt.view.accessright.GroupCopyMenuFormData", {
	extend: "Ext.form.Panel",
	alias: "widget.GroupCopyMenuFormData",
	itemId: "GroupCopyMenu",
	frame: !0,
	autoScroll: !0,
	bodyBorder: !0,
	bodyPadding: 10,
	bodyStyle: "border-top:none;border-left:none;border-right:none;",
	initComponent: function () {
		Ext.applyIf(this, {
			defaults: {
				anchor: "100%",
				labelSeparator: " ",
				labelClsExtra: "small"
			},
			items: [{
					xtype: "hiddenfield",
					itemId: "group_action_id",
					name: "group_action_id",
					hidden: !0
				},
				{
					xtype: "combobox",
					fieldLabel: "Application",
					itemId: "apps_id",
					name: "apps_id",
					displayField: "apps_name",
					valueField: "apps_id",
					allowBlank: !1,
					editable: !1,
					typeAhead: !0,
					forceSelection: !0,
					queryMode: "local",
					readOnly: !0,
					disabled: !0
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
					xtype: "combobox",
					fieldLabel: "Group 2",
					itemId: "group_id2",
					name: "group_id2",
					displayField: "group_name",
					valueField: "group_id",
					allowBlank: !1,
					typeAhead: !0,
					queryMode: "local",
					readOnly: !1,
					editable: true,
					forceSelection: true,
					listeners: {
						beforequery: function (record) {
							record.query = new RegExp(record.query, 'i');
							record.forceAll = true;
						}
					}
				}],
			dockedItems: [{
					xtype: "toolbar",
					dock: "bottom",
					ui: "footer",
					layout: {
						padding: 6,
						type: "hbox"
					},
					items: [{
							xtype: "button",
							action: "copy",
							itemId: "btnSaveCopyMenu",
							padding: 5,
							width: 100,
							iconCls: "icon-save",
							text: "Copy Menu"
						},
						{
							xtype: "button",
							action: "cancel",
							itemId: "btnCancel",
							padding: 5,
							width: 75,
							iconCls: "icon-cancel",
							text: "Cancel"
						}]
				}]
		});
		this.callParent(arguments)
	}
});