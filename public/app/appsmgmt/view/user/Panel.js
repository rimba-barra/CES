Ext.define('Appsmgmt.view.user.Panel', {
	extend: 'Ext.panel.Panel',
	requires: ['Appsmgmt.library.SearchTrigger'],
	controllers: ['User'],
	alias: 'widget.UserPanel',
	itemId: 'userMainPanel',
	layout: 'border',
	bodyPadding: 2,
	initComponent: function () {
		var me = this;
		Ext.applyIf(me, {
			items: [{
					region: 'west',
					xtype: 'gridpanel',
					itemId: 'userGrid',
					store: 'User',
					columnLines: true,
					split: true,
					width: 405,
					maxWidth: 600,
					minWidth: 405,
					contextMenu: [{
							text: 'Reset Password',
							iconCls: 'icon-appsmgmt-key',
							bindAction: 'UserChangePassword'
						}, {
							text: 'Set to Logout',
							iconCls: 'icon-appsmgmt-logout',
							bindAction: 'UserLogout'
						}, {
							text: 'Edit',
							iconCls: 'icon-edit',
							bindAction: 'UserUpdate',
							useActionBaseName: true
						}, {
							text: 'Delete',
							iconCls: 'icon-delete',
							bindAction: 'UserDelete',
							useActionBaseName: true
						}],
					dockedItems: [{
							dock: 'top',
							xtype: 'toolbar',
							items: [{
									text: 'New User',
									itemId: 'btnNew',
									iconCls: 'icon-new',
									bindAction: 'UserCreate',
									useActionBaseName: true
								}, {
									text: 'Edit',
									itemId: 'btnEdit',
									iconCls: 'icon-edit',
									bindAction: 'UserUpdate',
									useActionBaseName: true,
									disabled: true
								}, {
									text: 'Delete',
									itemId: 'btnDelete',
									iconCls: 'icon-delete',
									bindAction: 'UserDelete',
									useActionBaseName: true,
									disabled: true
								}, {
									text: 'Refresh',
									itemId: 'btnRefresh',
									iconCls: 'icon-refresh'
								},
//                    {
//                        xtype: 'searchtrigger',
//                        autoSearch: true,
//                        emptyText: 'Search User Name',
//                        filterId: 'user_name',
//                        anyMatch: true
//                    }

								{
									xtype: 'textfield',
									itemId: 'search_query_user',
									emptyText: 'Search',
									width: 110,
//									handler: function (view, rowIndex, colIndex, item, e, record, row) {
//										alert("Asas");
////										this.fireEvent('editaction', arguments);
////										//console.log(arguments);
//									}
									listeners: {
										'render': function (cmp) {
											cmp.getEl().on('keypress', function (e) {
												if (e.getKey() == e.ENTER) {
													var grid = Ext.ComponentQuery.query('#userGrid')[0]
													var store = grid.getStore();
													var search_query = Ext.ComponentQuery.query('#search_query_user')[0].getValue();
													store.getProxy().setExtraParam('search_query', search_query);
													grid.getStore().loadPage(1);
												}
											});
										}
									}
								},
								{
									text: '',
									itemId: 'btnSearch',
									iconCls: 'icon-search'
								},
							]
						},

						{
							xtype: 'pagingtoolbar',
							dock: 'bottom',
							width: 360,
							displayInfo: true,
							store: 'User'
						}

					],
					columns: [{
							text: 'ID',
							dataIndex: 'user_id',
							width: 40,
							align: 'right',
							hideable: false
						}, {
							text: 'User Name',
							dataIndex: 'user_name',
							flex: 1,
							minWidth: 100,
							hideable: false
						}, {
							text: 'Full Name',
							dataIndex: 'user_fullname',
							width: 150,
							hideable: false
						}, {
							xtype: 'booleancolumn',
							text: 'Logged in',
							dataIndex: 'login_status',
							falseText: ' ',
							trueText: '&#10003;',
							width: 60,
							align: 'center',
							resizable: false
						}, {
							xtype: 'booleancolumn',
							text: 'Active',
							dataIndex: 'active',
							falseText: ' ',
							trueText: '&#10003;',
							width: 50,
							align: 'center',
							resizable: false
						}, ]
				}, {
					region: 'center',
					xtype: 'tabpanel',
					itemId: 'userMainTab',
					title: '&nbsp;',
					bodyPadding: 2,
					disabled: true,
					defaults: {
						layout: 'fit',
					},
					items: [{
							title: 'User Info',
							itemId: 'User',
							items: [{
									xtype: 'form',
									itemId: 'userForm',
									autoScroll: true,
									bodyPadding: 15,
									items: [{
											xtype: 'fieldset',
											style: 'background:#f5f5f5;',
											defaults: {
												labelSeparator: ' ',
												labelClsExtra: 'small',
												readOnly: true,
												fieldStyle: 'font-size:0.9em;font-weight:bold;'
											},
											items: [{
													xtype: 'fieldcontainer',
													defaults: {
														labelSeparator: ' ',
														labelClsExtra: 'small',
														readOnly: true
													},
													layout: 'column',
													items: [{
															xtype: 'textfield',
															fieldLabel: 'ID',
															itemId: 'user_id',
															name: 'user_id',
															columnWidth: 0.7,
															fieldStyle: 'font-size:0.9em;font-weight:bold;'
														}, {
															xtype: 'checkboxfield',
															itemId: 'active',
															name: 'active',
															boxLabel: 'Active',
															boxLabelCls: 'x-form-cb-label small',
															inputValue: '1',
															uncheckedValue: '0',
															margin: '0 0 0 30',
															columnWidth: 0.3
														}]
												}, {
													xtype: 'textfield',
													fieldLabel: 'User Name',
													itemId: 'user_name',
													name: 'user_name',
													columnWidth: 0.7,
													anchor: '70%'
												}, {
													xtype: 'textfield',
													fieldLabel: 'Full Name',
													itemId: 'user_fullname',
													name: 'user_fullname',
													columnWidth: 0.7,
													anchor: '70%'
												}, {
													xtype: 'textfield',
													fieldLabel: 'Email',
													itemId: 'user_email',
													name: 'user_email',
													columnWidth: 0.7,
													anchor: '70%'
												}, {
													xtype: 'textarea',
													fieldLabel: 'Description',
													itemId: 'description',
													name: 'description',
													columnWidth: 0.7,
													anchor: '70%'
												}]
										}, {
											xtype: 'fieldset',
											margin: '10 0 0 0',
											style: 'background:#f5f5f5;',
											defaults: {
												labelSeparator: ' ',
												labelClsExtra: 'small',
												readOnly: true,
												fieldStyle: 'font-size:0.9em;font-weight:bold;'
											},
											items: [{
													xtype: 'textfield',
													fieldLabel: 'NIK',
													itemId: 'employee_nik',
													name: 'employee_nik',
													anchor: '50%'
												}, {
													xtype: 'fieldcontainer',
													defaults: {
														labelSeparator: ' ',
														labelClsExtra: 'small',
														readOnly: true,
														fieldStyle: 'font-size:0.9em;font-weight:bold;',
														anchor: '50%',
														columnWidth: 0.5
													},
													layout: 'column',
													items: [{
															xtype: 'textfield',
															fieldLabel: 'Employee Name',
															itemId: 'employee_name',
															name: 'employee_name'
														}, {
															xtype: 'textfield',
															fieldLabel: 'Position',
															itemId: '',
															name: '',
															labelWidth: 65,
															margin: '0 0 0 20'
														}]
												}, {
													xtype: 'fieldcontainer',
													defaults: {
														labelSeparator: ' ',
														labelClsExtra: 'small',
														readOnly: true,
														fieldStyle: 'font-size:0.9em;font-weight:bold;',
														anchor: '50%',
														columnWidth: 0.5
													},
													layout: 'column',
													items: [{
															xtype: 'textfield',
															fieldLabel: 'Division',
															itemId: '',
															name: ''
														}, {
															xtype: 'textfield',
															fieldLabel: 'Department',
															itemId: '',
															name: '',
															labelWidth: 65,
															margin: '0 0 0 20'
														}]
												}]
										}, {
											xtype: 'fieldset',
											margin: '10 0 0 0',
											style: 'background:#f5f5f5;',
											defaults: {
												labelSeparator: ' ',
												labelClsExtra: 'small',
												readOnly: true,
												fieldStyle: 'font-size:0.9em;font-weight:bold;'
											},
											items: [{
													xtype: 'fieldcontainer',
													defaults: {
														labelSeparator: ' ',
														labelClsExtra: 'small',
														readOnly: true,
														anchor: '100%'
													},
													layout: 'column',
													fieldLabel: 'Last Login Time',
													items: [{
															xtype: 'datefield',
															itemId: 'last_login_time',
															name: 'last_login_time',
															columnWidth: 0.3,
															format: 'D, d M Y   h:i:s A',
															fieldStyle: 'font-size:0.9em;font-weight:bold;',
														}, {
															xtype: 'checkboxfield',
															itemId: 'login_status',
															name: 'login_status',
															boxLabel: 'Logged In',
															boxLabelCls: 'x-form-cb-label small',
															inputValue: '1',
															uncheckedValue: '0',
															margin: '0 0 0 20',
															columnWidth: 0.7
														}]
												}, {
													xtype: 'fieldcontainer',
													defaults: {
														labelSeparator: ' ',
														labelClsExtra: 'small',
														readOnly: true,
														fieldStyle: 'font-size:0.9em;font-weight:bold;',
														anchor: '100%'
													},
													layout: 'column',
													fieldLabel: 'Last Login From',
													items: [{
															xtype: 'textfield',
															itemId: 'last_login_ip',
															name: 'last_login_ip',
															columnWidth: 0.3
														}, {
															xtype: 'textfield',
															itemId: 'last_login_host',
															name: 'last_login_host',
															columnWidth: 0.7,
															margin: '0 0 0 5'
														}]
												}, {
													xtype: 'fieldcontainer',
													defaults: {
														labelSeparator: ' ',
														labelClsExtra: 'small',
														readOnly: true,
														fieldStyle: 'font-size:0.9em;font-weight:bold;',
														anchor: '100%'
													},
													width: '100%',
													layout: 'column',
													fieldLabel: 'Last Activity',
													items: [{
															xtype: 'datefield',
															itemId: 'last_activity_time',
															name: 'last_activity_time',
															format: 'D, d M Y   h:i:s A',
															columnWidth: 0.3
														}, {
															xtype: 'textfield',
															itemId: 'last_active_page',
															name: 'last_active_page',
															columnWidth: 0.7,
															margin: '0 0 0 5'
														}]
												}, {
													xtype: 'fieldcontainer',
													defaults: {
														labelSeparator: ' ',
														labelClsExtra: 'small',
														readOnly: true,
														fieldStyle: 'font-size:0.9em;font-weight:bold;',
														anchor: '100%'
													},
													width: '100%',
													layout: 'column',
													fieldLabel: 'Password Changed',
													items: [{
															xtype: 'datefield',
															itemId: 'passchangedon',
															name: 'passchangedon',
															format: 'D, d M Y   h:i:s A',
															columnWidth: 0.3
														}]
												}, {
													xtype: 'button',
													text: 'Reset Password',
													iconCls: 'icon-appsmgmt-key',
													bindAction: 'UserChangePassword',
													margin: '20 10 0 0',
													padding: '4 5'
												}, {
													xtype: 'button',
													text: 'Set to Logout',
													iconCls: 'icon-appsmgmt-logout',
													bindAction: 'UserLogout',
													margin: '20 0 0 0',
													padding: '4 5'
												}]
										}]
								}]
						}, {
							title: 'Group',
							itemId: 'UserGroup',
							items: [{
									xtype: 'gridpanel',
//									store: 'GroupUser',
									itemId: 'groupuserGrid',
									columnLines: true,
									selModel: Ext.create('Ext.selection.CheckboxModel', {}),
									dockedItems: [{
											xtype: 'toolbar',
											dock: 'top',
											items: [{
													text: 'Add Group',
													itemId: 'btnNew',
													iconCls: 'icon-add',
													bindAction: 'GroupUserCreate',
													useActionBaseName: true
												}, {
													text: 'Edit',
													itemId: 'btnEdit',
													iconCls: 'icon-edit',
													bindAction: 'GroupUserUpdate',
													useActionBaseName: true,
													disabled: true
												}, {
													text: 'Delete Selected',
													itemId: 'btnDelete',
													iconCls: 'icon-delete',
													bindAction: 'GroupUserDelete',
													useActionBaseName: true,
													disabled: true
												}, {
													text: 'Refresh',
													itemId: 'btnRefresh',
													iconCls: 'icon-refresh'
												}]
										}, {
											dock: 'bottom',
//											store: 'GroupUser',
											xtype: 'pagingtoolbar',
											displayInfo: true,
											plugins: Ext.create('PagingToolbarPageSize')
										}],
									columns: [{
											xtype: 'rownumberer'
										}, {
											text: 'ID',
											dataIndex: 'group_user_id',
											width: 40,
											align: 'right',
											hideable: false,
											hidden: true
										}, {
											text: 'Group ID',
											dataIndex: 'group_id',
											width: 40,
											align: 'right',
											hideable: false,
											hidden: true
										}, {
											text: 'Apps. ID',
											dataIndex: 'apps_id',
											width: 40,
											align: 'right',
											hideable: false,
											hidden: true
										}, {
											text: 'Application',
											dataIndex: 'apps_name',
											flex: 1,
											hideable: false
										}, {
											text: 'Group Name',
											dataIndex: 'group_name',
											flex: 1,
											hideable: false
										}, {
											text: 'Project',
											dataIndex: 'project_name',
											flex: 1
										}, {
											text: 'PT',
											dataIndex: 'pt_name',
											flex: 1
										}, {
											text: 'Description',
											dataIndex: 'description',
											flex: 1
										}, {
											xtype: 'booleancolumn',
											text: 'Active',
											dataIndex: 'active',
											falseText: ' ',
											trueText: '&#10003;',
											width: 50,
											align: 'center',
											resizable: false
										}, {
											xtype: 'actioncolumn',
											width: 50,
											align: 'right',
											hideable: false,
											resizable: false,
											items: [{
													text: 'Edit',
													iconCls: 'icon-edit',
													bindAction: 'GroupUserUpdate',
													useActionBaseName: true,
													altText: 'Edit',
													tooltip: 'Edit'
												}, {
													text: 'Delete',
													iconCls: 'icon-delete',
													bindAction: 'GroupUserDelete',
													useActionBaseName: true,
													altText: 'Delete',
													tooltip: 'Delete'
												}]
										}]
								}]
						}, {
							title: 'Activities',
							itemId: 'Activity',
							disabled: true,
							items: [{
									xtype: 'gridpanel',
									itemId: 'userActivityGrid',
									store: 'UserActivity',
									columnLines: true,
									dockedItems: [{
											xtype: 'toolbar',
											dock: 'top',
											items: [{
													text: 'Refresh',
													itemId: 'btnRefresh',
													iconCls: 'icon-refresh'
												}]
										}, {
											dock: 'bottom',
											xtype: 'pagingtoolbar',
											store: 'UserActivity',
											displayInfo: true,
											plugins: Ext.create('PagingToolbarPageSize')
										}],
									columns: [{
											xtype: 'rownumberer'
										}, {
											text: 'ID',
											dataIndex: 'user_activity_id',
											width: 40,
											align: 'right',
											hideable: false,
											hidden: true
										}, {
											xtype: 'datecolumn',
											text: 'Time',
											dataIndex: 'access_time',
											format: 'D, d M Y - h:i:s A',
											width: 200,
											hideable: false
										}, {
											text: 'Page',
											dataIndex: 'access_page',
											flex: 1,
											hideable: false
										}, {
											text: 'Session',
											dataIndex: 'access_session',
											flex: 1,
											hideable: false
										}, {
											text: 'IP',
											dataIndex: 'access_ip',
											flex: 1,
											hideable: false
										}, {
											text: 'Host',
											dataIndex: 'access_host',
											flex: 1,
											hideable: false
										}]
								}]
						}]
				}]
		});
		me.callParent(arguments)
	}
});