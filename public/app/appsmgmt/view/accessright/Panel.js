Ext.define("Appsmgmt.view.accessright.Panel", {
	extend: "Ext.panel.Panel",
	alias: "widget.AccessrightPanel",
	itemId: "accessrightMainPanel",
	layout: "border",
	bodyPadding: 2,
	initComponent: function () {
		Ext.applyIf(this, {
			items: [{
					region: "west",
					xtype: "gridpanel",
//					store: "Group",
					itemId: "groupGrid",
					columnLines: !0,
					split: !0,
					width: 305,
					maxWidth: 500,
					minWidth: 305,
					dockedItems: [{
							dock: "top",
							xtype: "panel",
							layout: "fit",
							bodyPadding: 6,
							bodyStyle: "background: transparent;padding-bottom:10px;",
							items: [{
									xtype: "combobox",
									fieldLabel: "Apps",
									itemId: "apps_id",
									name: "apps_id",
									displayField: "apps_name",
									valueField: "apps_id",
									queryMode: "local",
									typeAhead: !0,
									labelWidth: 30,
									labelSeparator: " ",
									labelClsExtra: "small",
									anchor: "90%",
									editable: true,
									forceSelection: true,
									listeners: {
										beforequery: function (record) {
											record.query = new RegExp(record.query, 'i');
											record.forceAll = true;
										}
									}
								}
							]
						},
						{
							dock: "top",
							xtype: "panel",
							layout: "fit",
							bodyPadding: 6,
							bodyStyle: "background: transparent;padding-bottom:10px;",
							items: [{
									xtype: 'textfield',
									itemId: 'search_query',
									emptyText: 'Search By Group Name',
									width: 110,
									listeners: {
										'render': function (cmp) {
											cmp.getEl().on('keypress', function (e) {
												if (e.getKey() == e.ENTER) {
													var grid = Ext.ComponentQuery.query('#accessrightMainPanel #groupGrid')[0]
													var store = grid.getStore();
													var search_query = Ext.ComponentQuery.query('#search_query')[0].getValue();
													store.getProxy().setExtraParam('group_name', search_query);
													grid.getStore().loadPage(1);
												}
											});
										}
									}
								}
							]
						},
						{
							dock: "bottom",
							xtype: "pagingtoolbar",
//							store: "Group",
							width: 60,
							displayInfo: true,
//							plugins: Ext.create("PagingToolbarPageSize")
						}],
					columns: [{
							text: "ID",
							dataIndex: "group_id",
							width: 40,
							align: "right",
							hideable: !1
						},
						{
							text: "Group Name",
							dataIndex: "group_name",
							flex: 1,
							hideable: !1
						},
						{
							text: "Application",
							itemId: "colAppsName",
							dataIndex: "apps_name",
							width: 150,
							hideable: !1
						}]
				},
				{
					region: "center",
					xtype: "tabpanel",
					itemId: "accessrightMainTab",
					title: "&nbsp;",
					bodyPadding: 2,
					disabled: !0,
					defaults: {
						layout: "fit"
					},
					items: [{
							title: "Action",
							itemId: "GroupAction",
							items: [{
									xtype: "gridpanel",
									itemId: "groupactionGrid",
									store: "GroupAction",
									columnLines: !0,
									selModel: Ext.create("Ext.selection.CheckboxModel", {}),
									dockedItems: [{
											xtype: "toolbar",
											dock: "top",
											items: [{
													text: "Add Action",
													itemId: "btnNew",
													iconCls: "icon-add",
													bindAction: "GroupActionCreate",
													useActionBaseName: !0
												},
												{
													text: "Edit",
													itemId: "btnEdit",
													iconCls: "icon-edit",
													bindAction: "GroupActionUpdate",
													useActionBaseName: !0,
													disabled: !0
												},
												{
													text: "Delete Selected",
													itemId: "btnDelete",
													iconCls: "icon-delete",
													bindAction: "GroupActionDelete",
													useActionBaseName: !0,
													disabled: !0
												},
												{
													text: "Refresh",
													itemId: "btnRefresh",
													iconCls: "icon-refresh"
												},
												{
													text: "Copy Action",
													itemId: "btnCopyAction",
													iconCls: "icon-print",
													disabled: !0,
													useActionBaseName: !1,
													bindAction: "ActionCreate"
												}]
										},
										{
											dock: "bottom",
											xtype: "pagingtoolbar",
											store: "GroupAction",
											displayInfo: !0,
											plugins: Ext.create("PagingToolbarPageSize")
										}],
									columns: [{
											xtype: "rownumberer"
										},
										{
											text: "ID",
											dataIndex: "group_action_id",
											width: 40,
											align: "right",
											hideable: !1,
											hidden: !0
										},
										{
											text: "Action ID",
											dataIndex: "action_id",
											width: 40,
											align: "right",
											hideable: !1,
											hidden: !0
										},
										{
											text: "Action Name",
											dataIndex: "action_name",
											flex: 1,
											hideable: !1
										},
										{
											text: "Base Name",
											dataIndex: "action_basename",
											flex: 1,
											hideable: !1
										},
										{
											text: "URL",
											dataIndex: "action_url",
											flex: 1
										},
										{
											text: "Description",
											dataIndex: "description",
											flex: 1
										},
										{
											xtype: "booleancolumn",
											text: "Active",
											dataIndex: "active",
											falseText: " ",
											trueText: "&#10003;",
											width: 50,
											align: "center",
											resizable: !1
										},
										{
											xtype: "actioncolumn",
											width: 50,
											align: "right",
											hideable: !1,
											resizable: !1,
											items: [{
													text: "Edit",
													iconCls: "icon-edit",
													bindAction: "GroupActionUpdate",
													useActionBaseName: !0,
													altText: "Edit",
													tooltip: "Edit"
												},
												{
													text: "Delete",
													iconCls: "icon-delete",
													bindAction: "GroupActionDelete",
													useActionBaseName: !0,
													altText: "Delete",
													tooltip: "Delete"
												}]
										}]
								}]
						},
						{
							title: "Menu",
							itemId: "GroupMenu",
							items: [{
									xtype: "treepanel",
									itemId: "groupmenuGrid",
									store: "GroupMenuTree",
									useArrows: !0,
									rootVisible: !1,
									columnLines: !0,
									rowLines: !0,
									multiSelect: !0,
									dockedItems: [{
											dock: "top",
											xtype: "toolbar",
											items: [{
													text: "Add Menu",
													itemId: "btnNew",
													iconCls: "icon-add",
													bindAction: "GroupMenuCreate",
													useActionBaseName: !0
												},
												{
													text: "Edit",
													itemId: "btnEdit",
													iconCls: "icon-edit",
													bindAction: "GroupMenuUpdate",
													useActionBaseName: !0,
													disabled: !0
												},
												{
													text: "Delete Selected",
													itemId: "btnDelete",
													iconCls: "icon-delete",
													bindAction: "GroupMenuDelete",
													useActionBaseName: !0,
													disabled: !0
												},
												{
													text: "Refresh",
													itemId: "btnRefresh",
													iconCls: "icon-refresh"
												},
												{
													text: "Copy Menu",
													itemId: "btnCopyMenu",
													iconCls: "icon-print",
													disabled: !1
												}]
										}],
									selModel: Ext.create("Ext.selection.CheckboxModel", {}),
									columns: [{
											text: "ID",
											dataIndex: "group_menu_id",
											width: 40,
											align: "right",
											hideable: !1,
											hidden: !0
										},
										{
											text: "Menu ID",
											dataIndex: "menu_id",
											width: 40,
											align: "right",
											hideable: !1,
											hidden: !0
										},
										{
											xtype: "treecolumn",
											text: "Menu Caption",
											dataIndex: "menu_caption",
											flex: 1,
											hideable: !1
										},
										{
											text: "Menu Name",
											dataIndex: "menu_name",
											width: 100,
											hideable: !1
										},
										{
											text: "Description",
											dataIndex: "description",
											flex: 1
										},
										{
											xtype: "booleancolumn",
											text: "Active",
											dataIndex: "active",
											falseText: " ",
											trueText: "&#10003;",
											width: 50,
											align: "center",
											resizable: !1
										},
										{
											xtype: "actioncolumn",
											width: 50,
											align: "right",
											hideable: !1,
											resizable: !1,
											items: [{
													text: "Edit",
													iconCls: "icon-edit",
													bindAction: "GroupMenuUpdate",
													useActionBaseName: !0,
													altText: "Edit",
													tooltip: "Edit"
												},
												{
													text: "Delete",
													iconCls: "icon-delete",
													bindAction: "GroupMenuDelete",
													useActionBaseName: !0,
													altText: "Delete",
													tooltip: "Delete"
												}]
										}]
								}]
						},
						{
							title: "User",
							itemId: "GroupUser",
							items: [{
									xtype: "gridpanel",
									itemId: "groupuserGrid",
									store: "GroupUser",
									columnLines: !0,
									selModel: Ext.create("Ext.selection.CheckboxModel", {}),
									dockedItems: [{
											xtype: "toolbar",
											dock: "top",
											items: [{
													text: "Add User",
													itemId: "btnNew",
													iconCls: "icon-add",
													bindAction: "GroupUserCreate",
													useActionBaseName: !0
												},
												{
													text: "Edit",
													itemId: "btnEdit",
													iconCls: "icon-edit",
													bindAction: "GroupUserUpdate",
													useActionBaseName: !0,
													disabled: !0
												},
												{
													text: "Delete Selected",
													itemId: "btnDelete",
													iconCls: "icon-delete",
													bindAction: "GroupUserDelete",
													useActionBaseName: !0,
													disabled: !0
												},
												{
													text: "Refresh",
													itemId: "btnRefresh",
													iconCls: "icon-refresh"
												}]
										},
										{
											dock: "bottom",
											xtype: "pagingtoolbar",
											store: "GroupUser",
											displayInfo: !0,
											plugins: Ext.create("PagingToolbarPageSize")
										}],
									columns: [{
											xtype: "rownumberer"
										},
										{
											text: "ID",
											dataIndex: "group_user_id",
											width: 40,
											align: "right",
											hideable: !1,
											hidden: !0
										},
										{
											text: "User ID",
											dataIndex: "user_id",
											width: 40,
											align: "right",
											hideable: !1,
											hidden: !0
										},
										{
											text: "User Name",
											dataIndex: "user_name",
											flex: 1,
											hideable: !1
										},
										{
											text: "Full Name",
											dataIndex: "user_fullname",
											flex: 1
										},
										{
											text: "Project",
											itemId: "colProject",
											dataIndex: "project_name",
											flex: 1,
											hidden: !0,
											hideable: !1
										},
										{
											text: "PT",
											itemId: "colPt",
											dataIndex: "pt_name",
											flex: 1,
											hidden: !0,
											hideable: !1
										},
										{
											text: "Description",
											dataIndex: "description",
											flex: 1
										},
										{
											xtype: "booleancolumn",
											text: "Active",
											dataIndex: "active",
											falseText: " ",
											trueText: "&#10003;",
											width: 50,
											align: "center",
											resizable: !1
										},
										{
											xtype: "actioncolumn",
											width: 50,
											align: "right",
											hideable: !1,
											resizable: !1,
											items: [{
													text: "Edit",
													iconCls: "icon-edit",
													bindAction: "GroupUserUpdate",
													useActionBaseName: !0,
													altText: "Edit",
													tooltip: "Edit"
												},
												{
													text: "Delete",
													iconCls: "icon-delete",
													bindAction: "GroupUserDelete",
													useActionBaseName: !0,
													altText: "Delete",
													tooltip: "Delete"
												}]
										}]
								}]
						}]
				}]
		});
		this.callParent(arguments)
	}
});