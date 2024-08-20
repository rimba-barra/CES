//Ext.define('Appsmgmt.view.application.Panel',{extend:'Ext.panel.Panel',alias:'widget.ApplicationPanel',itemId:'applicationMainPanel',layout:'border',bodyPadding:2,initComponent:function(){var me=this;Ext.applyIf(me,{items:[{region:'west',xtype:'gridpanel',itemId:'applicationGrid',store:'Application',columnLines:true,split:true,width:305,maxWidth:500,minWidth:305,contextMenu:[{text:'Edit',iconCls:'icon-edit',bindAction:'ApplicationUpdate',useActionBaseName:true},{text:'Delete',iconCls:'icon-delete',bindAction:'ApplicationDelete',useActionBaseName:true}],dockedItems:[{dock:'top',xtype:'toolbar',items:[{text:'New Application',itemId:'btnNew',iconCls:'icon-new',bindAction:'ApplicationCreate',useActionBaseName:true},{text:'Edit',itemId:'btnEdit',iconCls:'icon-edit',bindAction:'ApplicationUpdate',useActionBaseName:true,disabled:true},{text:'Delete',itemId:'btnDelete',iconCls:'icon-delete',bindAction:'ApplicationDelete',useActionBaseName:true,disabled:true},{text:'Refresh',itemId:'btnRefresh',iconCls:'icon-refresh'}]}],columns:[{text:'ID',dataIndex:'apps_id',width:40,align:'right',hideable:false},{text:'Application Name',dataIndex:'apps_name',flex:1,hideable:false},{text:'Base Name',dataIndex:'apps_basename',hideable:false}]},{region:'center',xtype:'tabpanel',itemId:'applicationMainTab',title:'&nbsp;',bodyPadding:2,disabled:true,defaults:{layout:'fit',},items:[{title:'App Info',itemId:'Application',items:[{xtype:'form',itemId:'applicationForm',autoScroll:true,bodyPadding:15,items:[{xtype:'fieldset',style:'background:#f5f5f5;',defaults:{labelSeparator:' ',labelClsExtra:'small',readOnly:true,fieldStyle:'font-size:0.9em;font-weight:bold;'},items:[{xtype:'textfield',fieldLabel:'App. ID',itemId:'apps_id',name:'apps_id',anchor:'30%'},{xtype:'fieldcontainer',defaults:{labelSeparator:' ',labelClsExtra:'small',readOnly:true,anchor:'100%'},layout:'column',items:[{xtype:'textfield',fieldLabel:'App. Name',itemId:'apps_name',name:'apps_name',columnWidth:0.7,fieldStyle:'font-size:0.9em;font-weight:bold;'},{xtype:'checkboxfield',boxLabel:'Project-PT',itemId:'projectpt',name:'projectpt',inputValue:'1',uncheckedValue:'0',boxLabelCls:'x-form-cb-label small',margin:'0 0 0 30',columnWidth:0.3}]},{xtype:'fieldcontainer',layout:'column',defaults:{labelSeparator:' ',labelClsExtra:'small',readOnly:true,anchor:'100%'},items:[{xtype:'textfield',fieldLabel:'App. Base Name',itemId:'apps_basename',name:'apps_basename',columnWidth:0.7,fieldStyle:'font-size:0.9em;font-weight:bold;'},{xtype:'checkboxfield',itemId:'projectpt_menu',name:'projectpt_menu',boxLabel:'Show Project-PT Menu',boxLabelCls:'x-form-cb-label small',inputValue:'1',uncheckedValue:'0',margin:'0 0 0 30',columnWidth:0.3}]},{xtype:'fieldcontainer',layout:'column',defaults:{labelSeparator:' ',labelClsExtra:'small',readOnly:true,anchor:'100%'},items:[{xtype:'textarea',fieldLabel:'Description',itemId:'description',name:'description',columnWidth:0.7,height:50},{xtype:'checkboxfield',boxLabel:'Active',itemId:'active',name:'active',inputValue:'1',uncheckedValue:'0',boxLabelCls:'x-form-cb-label small',margin:'30 0 0 30',columnWidth:0.3}]}]}]}]},{title:'Controllers',itemId:'Controller',items:[{xtype:'gridpanel',itemId:'controllerGrid',store:'Controller',columnLines:true,selModel:Ext.create('Ext.selection.CheckboxModel',{}),dockedItems:[{dock:'top',xtype:'toolbar',items:[{text:'New Controller',itemId:'btnNew',iconCls:'icon-new',bindAction:'ControllerCreate',useActionBaseName:true},{text:'Edit',itemId:'btnEdit',iconCls:'icon-edit',bindAction:'ControllerUpdate',useActionBaseName:true,disabled:true},{text:'Delete Selected',itemId:'btnDelete',iconCls:'icon-delete',bindAction:'ControllerDelete',useActionBaseName:true,disabled:true},{text:'Refresh',itemId:'btnRefresh',iconCls:'icon-refresh'}]},{dock:'bottom',xtype:'pagingtoolbar',store:'Controller',displayInfo:true,plugins:Ext.create('PagingToolbarPageSize')}],columns:[{xtype:'rownumberer'},{text:'ID',dataIndex:'controller_id',width:40,align:'right',hideable:false},{text:'Controller Name',dataIndex:'controller_name',flex:1,hideable:false},{text:'Description',dataIndex:'description',flex:1},{xtype:'booleancolumn',text:'Active',dataIndex:'active',falseText:' ',trueText:'&#10003;',width:50,align:'center',resizable:false},{xtype:'actioncolumn',width:50,align:'right',hideable:false,resizable:false,items:[{text:'Edit',iconCls:'icon-edit',bindAction:'ControllerUpdate',useActionBaseName:true,altText:'Edit',tooltip:'Edit'},{text:'Delete',iconCls:'icon-delete',bindAction:'ControllerDelete',useActionBaseName:true,altText:'Delete',tooltip:'Delete'}]}]}]},{title:'Actions',itemId:'Action',items:[{xtype:'gridpanel',itemId:'actionGrid',store:'Action',columnLines:true,selModel:Ext.create('Ext.selection.CheckboxModel',{}),dockedItems:[{xtype:'toolbar',dock:'top',items:[{text:'New Action',itemId:'btnNew',iconCls:'icon-new',bindAction:'ActionCreate',useActionBaseName:true},{text:'Edit',itemId:'btnEdit',iconCls:'icon-edit',bindAction:'ActionUpdate',useActionBaseName:true,disabled:true},{text:'Delete Selected',itemId:'btnDelete',iconCls:'icon-delete',bindAction:'ActionDelete',useActionBaseName:true,disabled:true},{text:'Refresh',itemId:'btnRefresh',iconCls:'icon-refresh'}]},{dock:'bottom',xtype:'pagingtoolbar',store:'Action',displayInfo:true,plugins:Ext.create('PagingToolbarPageSize')}],columns:[{xtype:'rownumberer'},{text:'ID',dataIndex:'action_id',width:40,align:'right',hideable:false},{text:'Action Name',dataIndex:'action_name',flex:1,hideable:false},{text:'Base Name',dataIndex:'action_basename',flex:1},{text:'URL',dataIndex:'action_url',flex:1},{text:'Controller',dataIndex:'controller_name',flex:1},{text:'Description',dataIndex:'description',flex:1},{xtype:'booleancolumn',text:'Share',dataIndex:'share',falseText:' ',trueText:'&#10003;',width:50,align:'center',resizable:false},{xtype:'booleancolumn',text:'Active',dataIndex:'active',falseText:' ',trueText:'&#10003;',width:50,align:'center',resizable:false},{xtype:'actioncolumn',width:50,align:'right',hideable:false,resizable:false,items:[{text:'Edit',iconCls:'icon-edit',bindAction:'ActionUpdate',useActionBaseName:true,altText:'Edit',tooltip:'Edit'},{text:'Delete',iconCls:'icon-delete',bindAction:'ActionDelete',useActionBaseName:true,altText:'Delete',tooltip:'Delete'}]}]}]},{title:'Menus',itemId:'Menu',items:[{xtype:'treepanel',itemId:'menuGrid',store:'MenuTree',useArrows:true,rootVisible:false,columnLines:true,rowLines:true,multiSelect:true,dockedItems:[{dock:'top',xtype:'toolbar',items:[{text:'New Menu',itemId:'btnNew',iconCls:'icon-new',bindAction:'MenuCreate',useActionBaseName:true},{text:'Edit',itemId:'btnEdit',iconCls:'icon-edit',bindAction:'MenuUpdate',useActionBaseName:true,disabled:true},{text:'Delete Selected',itemId:'btnDelete',iconCls:'icon-delete',bindAction:'MenuDelete',useActionBaseName:true,disabled:true},{text:'Refresh',itemId:'btnRefresh',iconCls:'icon-refresh'}]}],selModel:Ext.create('Ext.selection.CheckboxModel',{}),columns:[{text:'ID',dataIndex:'menu_id',width:40,align:'right',hideable:false},{xtype:'treecolumn',text:'Caption',dataIndex:'menu_caption',width:200,hideable:false},{text:'Name',dataIndex:'menu_name'},{text:'Parent',dataIndex:'menu_parent_name'},{text:'Order',dataIndex:'menu_order',width:40,align:'right'},{text:'Controller',dataIndex:'controller_name'},{text:'Widget',dataIndex:'widget'},{text:'Icon',dataIndex:'menu_icon'},{text:'Icon Cls',dataIndex:'menu_icon_cls'},{text:'Func. Args.',dataIndex:'menu_args'},{xtype:'booleancolumn',text:'Active',dataIndex:'active',falseText:' ',trueText:'&#10003;',width:50,align:'center',resizable:false},{text:'Description',dataIndex:'description'},{xtype:'actioncolumn',width:50,align:'right',hideable:false,resizable:false,items:[{text:'Edit',iconCls:'icon-edit',bindAction:'MenuUpdate',useActionBaseName:true,altText:'Edit',tooltip:'Edit'},{text:'Delete',iconCls:'icon-delete',bindAction:'MenuDelete',useActionBaseName:true,altText:'Delete',tooltip:'Delete'}]}]}]},{title:'Groups',itemId:'Group',items:[{xtype:'gridpanel',itemId:'groupGrid',store:'Group',columnLines:true,selModel:Ext.create('Ext.selection.CheckboxModel',{}),dockedItems:[{dock:'top',xtype:'toolbar',items:[{text:'New Group',itemId:'btnNew',iconCls:'icon-new',bindAction:'GroupCreate',useActionBaseName:true},{text:'Edit',itemId:'btnEdit',iconCls:'icon-edit',bindAction:'GroupUpdate',useActionBaseName:true,disabled:true},{text:'Delete Selected',itemId:'btnDelete',iconCls:'icon-delete',bindAction:'GroupDelete',useActionBaseName:true,disabled:true},{text:'Refresh',itemId:'btnRefresh',iconCls:'icon-refresh'}]},{dock:'bottom',xtype:'pagingtoolbar',store:'Group',displayInfo:true,plugins:Ext.create('PagingToolbarPageSize')}],columns:[{xtype:'rownumberer'},{text:'ID',dataIndex:'group_id',width:40,align:'right',hideable:false},{text:'Group Name',dataIndex:'group_name',flex:1,hideable:false},{text:'Description',dataIndex:'description',flex:1},{xtype:'booleancolumn',text:'Active',dataIndex:'active',falseText:' ',trueText:'&#10003;',width:50,align:'center',resizable:false},{xtype:'actioncolumn',width:50,align:'right',hideable:false,resizable:false,items:[{text:'Edit',iconCls:'icon-edit',bindAction:'GroupUpdate',useActionBaseName:true,altText:'Edit',tooltip:'Edit'},{text:'Delete',iconCls:'icon-delete',bindAction:'GroupDelete',useActionBaseName:true,altText:'Delete',tooltip:'Delete'}]}]}]},{title:'Dependencies',itemId:'Dependency',items:[{xtype:'gridpanel',itemId:'dependencyGrid',store:'Dependency',columnLines:true,selModel:Ext.create('Ext.selection.CheckboxModel',{}),dockedItems:[{dock:'top',xtype:'toolbar',items:[{text:'Add Dependency',itemId:'btnNew',iconCls:'icon-add',bindAction:'DependencyCreate',useActionBaseName:true},{text:'Edit',itemId:'btnEdit',iconCls:'icon-edit',bindAction:'DependencyUpdate',useActionBaseName:true,disabled:true},{text:'Delete Selected',itemId:'btnDelete',iconCls:'icon-delete',bindAction:'DependencyDelete',useActionBaseName:true,disabled:true},{text:'Refresh',itemId:'btnRefresh',iconCls:'icon-refresh'}]},{dock:'bottom',xtype:'pagingtoolbar',store:'Dependency',displayInfo:true,plugins:Ext.create('PagingToolbarPageSize')}],columns:[{xtype:'rownumberer'},{text:'ID',dataIndex:'apps_depend_id',width:40,align:'right',hideable:false},{text:'Application Name',dataIndex:'depend_name',flex:1,hideable:false},{text:'Application Base Name',dataIndex:'depend_basename',flex:1,hideable:false},{text:'Description',dataIndex:'description',flex:1},{xtype:'booleancolumn',text:'Active',dataIndex:'active',falseText:' ',trueText:'&#10003;',width:50,align:'center',resizable:false},{xtype:'actioncolumn',width:50,align:'right',hideable:false,resizable:false,items:[{text:'Edit',iconCls:'icon-edit',bindAction:'DependencyUpdate',useActionBaseName:true,altText:'Edit',tooltip:'Edit'},{text:'Delete',iconCls:'icon-delete',bindAction:'DependencyDelete',useActionBaseName:true,altText:'Delete',tooltip:'Delete'}]}]}]}]}]});me.callParent(arguments)}});

Ext.define('Appsmgmt.view.application.Panel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.ApplicationPanel',
	itemId: 'applicationMainPanel',
	layout: 'border',
	bodyPadding: 2,
	initComponent: function () {
		var me = this;
		Ext.applyIf(me, {
			items: [{
					region: 'west',
					xtype: 'gridpanel',
					itemId: 'applicationGrid',
					store: 'Application',
					columnLines: true,
					split: true,
					width: 305,
					maxWidth: 500,
					minWidth: 305,
					contextMenu: [{
							text: 'Edit',
							iconCls: 'icon-edit',
							bindAction: 'ApplicationUpdate',
							useActionBaseName: true
						}, {
							text: 'Delete',
							iconCls: 'icon-delete',
							bindAction: 'ApplicationDelete',
							useActionBaseName: true
						}],
					dockedItems: [{
							dock: 'top',
							xtype: 'toolbar',
							items: [{
									text: 'New Application',
									itemId: 'btnNew',
									iconCls: 'icon-new',
									bindAction: 'ApplicationCreate',
									useActionBaseName: true
								}, {
									text: 'Edit',
									itemId: 'btnEdit',
									iconCls: 'icon-edit',
									bindAction: 'ApplicationUpdate',
									useActionBaseName: true,
									disabled: true
								}, {
									text: 'Delete',
									itemId: 'btnDelete',
									iconCls: 'icon-delete',
									bindAction: 'ApplicationDelete',
									useActionBaseName: true,
									disabled: true
								}, {
									text: 'Refresh',
									itemId: 'btnRefresh',
									iconCls: 'icon-refresh'
								}]
						}],
					columns: [{
							text: 'ID',
							dataIndex: 'apps_id',
							width: 40,
							align: 'right',
							hideable: false
						}, {
							text: 'Application Name',
							dataIndex: 'apps_name',
							flex: 1,
							hideable: false
						}, {
							text: 'Base Name',
							dataIndex: 'apps_basename',
							hideable: false
						}]
				}, {
					region: 'center',
					xtype: 'tabpanel',
					itemId: 'applicationMainTab',
					title: '&nbsp;',
					bodyPadding: 2,
					disabled: true,
					defaults: {
						layout: 'fit',
					},
					items: [{
							title: 'App Info',
							itemId: 'Application',
							items: [{
									xtype: 'form',
									itemId: 'applicationForm',
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
													xtype: 'textfield',
													fieldLabel: 'App. ID',
													itemId: 'apps_id',
													name: 'apps_id',
													anchor: '30%'
												}, {
													xtype: 'fieldcontainer',
													defaults: {
														labelSeparator: ' ',
														labelClsExtra: 'small',
														readOnly: true,
														anchor: '100%'
													},
													layout: 'column',
													items: [{
															xtype: 'textfield',
															fieldLabel: 'App. Name',
															itemId: 'apps_name',
															name: 'apps_name',
															columnWidth: 0.7,
															fieldStyle: 'font-size:0.9em;font-weight:bold;'
														}, {
															xtype: 'checkboxfield',
															boxLabel: 'Project-PT',
															itemId: 'projectpt',
															name: 'projectpt',
															inputValue: '1',
															uncheckedValue: '0',
															boxLabelCls: 'x-form-cb-label small',
															margin: '0 0 0 30',
															columnWidth: 0.3
														}]
												}, {
													xtype: 'fieldcontainer',
													layout: 'column',
													defaults: {
														labelSeparator: ' ',
														labelClsExtra: 'small',
														readOnly: true,
														anchor: '100%'
													},
													items: [{
															xtype: 'textfield',
															fieldLabel: 'App. Base Name',
															itemId: 'apps_basename',
															name: 'apps_basename',
															columnWidth: 0.7,
															fieldStyle: 'font-size:0.9em;font-weight:bold;'
														}, {
															xtype: 'checkboxfield',
															itemId: 'projectpt_menu',
															name: 'projectpt_menu',
															boxLabel: 'Show Project-PT Menu',
															boxLabelCls: 'x-form-cb-label small',
															inputValue: '1',
															uncheckedValue: '0',
															margin: '0 0 0 30',
															columnWidth: 0.3
														}]
												}, {
													xtype: 'fieldcontainer',
													layout: 'column',
													defaults: {
														labelSeparator: ' ',
														labelClsExtra: 'small',
														readOnly: true,
														anchor: '100%'
													},
													items: [{
															xtype: 'textarea',
															fieldLabel: 'Description',
															itemId: 'description',
															name: 'description',
															columnWidth: 0.7,
															height: 50
														}, {
															xtype: 'checkboxfield',
															boxLabel: 'Active',
															itemId: 'active',
															name: 'active',
															inputValue: '1',
															uncheckedValue: '0',
															boxLabelCls: 'x-form-cb-label small',
															margin: '30 0 0 30',
															columnWidth: 0.3
														}]
												}, {
													xtype: 'fieldcontainer',
													layout: 'column',
													defaults: {
														labelSeparator: ' ',
														labelClsExtra: 'small',
														readOnly: true,
														anchor: '100%'
													},
													items: [{
															xtype: 'textfield',
															fieldLabel: 'URL Address',
															itemId: 'url_address',
															name: 'url_address',
															columnWidth: 0.7,
															fieldStyle: 'font-size:0.9em;font-weight:bold;'
														}]
												}]
										}]
								}]
						}, {
							title: 'Controllers',
							itemId: 'Controller',
							items: [{
									xtype: 'gridpanel',
									itemId: 'controllerGrid',
									store: 'Controller',
									columnLines: true,
									selModel: Ext.create('Ext.selection.CheckboxModel', {}),
									dockedItems: [{
											dock: 'top',
											xtype: 'toolbar',
											items: [{
													text: 'New Controller',
													itemId: 'btnNew',
													iconCls: 'icon-new',
													bindAction: 'ControllerCreate',
													useActionBaseName: true
												}, {
													text: 'Edit',
													itemId: 'btnEdit',
													iconCls: 'icon-edit',
													bindAction: 'ControllerUpdate',
													useActionBaseName: true,
													disabled: true
												}, {
													text: 'Delete Selected',
													itemId: 'btnDelete',
													iconCls: 'icon-delete',
													bindAction: 'ControllerDelete',
													useActionBaseName: true,
													disabled: true
												}, {
													text: 'Refresh',
													itemId: 'btnRefresh',
													iconCls: 'icon-refresh'
												},
												{
													xtype: 'tbspacer',
													flex: 1
												},
												{
													xtype: 'textfield',
													itemId: 'search_query_controller',
													emptyText: 'Search By Controller Name',
													width: 210,
													align: 'right',
													listeners: {
														'render': function (cmp) {
															function search() {
																var grid = Ext.ComponentQuery.query('#Controller #controllerGrid')[0]
																var store = grid.getStore();
																var search_query = Ext.ComponentQuery.query('#search_query_controller')[0].getValue();
																store.getProxy().setExtraParam('controller_name', search_query);
																grid.getStore().loadPage(1);
															}
															cmp.getEl().on('change', function (e) {
																search();
															});

															cmp.getEl().on('keypress', function (e) {
																if (e.getKey() == e.ENTER) {
																	search();
																}
															});
														}
													}
												}
											]
										}, {
											dock: 'bottom',
											xtype: 'pagingtoolbar',
											store: 'Controller',
											displayInfo: true,
											plugins: Ext.create('PagingToolbarPageSize')
										}],
									columns: [{
											xtype: 'rownumberer'
										}, {
											text: 'ID',
											dataIndex: 'controller_id',
											width: 40,
											align: 'right',
											hideable: false
										}, {
											text: 'Controller Name',
											dataIndex: 'controller_name',
											flex: 1,
											hideable: false
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
													bindAction: 'ControllerUpdate',
													useActionBaseName: true,
													altText: 'Edit',
													tooltip: 'Edit'
												}, {
													text: 'Delete',
													iconCls: 'icon-delete',
													bindAction: 'ControllerDelete',
													useActionBaseName: true,
													altText: 'Delete',
													tooltip: 'Delete'
												}]
										}]
								}]
						}, {
							title: 'Actions',
							itemId: 'Action',
							items: [{
									xtype: 'gridpanel',
									itemId: 'actionGrid',
									store: 'Action',
									columnLines: true,
									selModel: Ext.create('Ext.selection.CheckboxModel', {}),
									dockedItems: [{
											xtype: 'toolbar',
											dock: 'top',
											items: [{
													text: 'New Action',
													itemId: 'btnNew',
													iconCls: 'icon-new',
													bindAction: 'ActionCreate',
													useActionBaseName: true
												}, {
													text: 'Edit',
													itemId: 'btnEdit',
													iconCls: 'icon-edit',
													bindAction: 'ActionUpdate',
													useActionBaseName: true,
													disabled: true
												}, {
													text: 'Delete Selected',
													itemId: 'btnDelete',
													iconCls: 'icon-delete',
													bindAction: 'ActionDelete',
													useActionBaseName: true,
													disabled: true
												},
												{
													text: 'Assign to Group',
													itemId: 'btnAssignToGroup',
													iconCls: "icon-copy",
													useActionBaseName: true,
													disabled: true,
													bindAction: "ActionAssign"
													
												}, {
													text: 'Refresh',
													itemId: 'btnRefresh',
													iconCls: 'icon-refresh'
												},
												{
													xtype: 'tbspacer',
													flex: 1
												},
												{
													xtype: 'textfield',
													itemId: 'search_query_action',
													emptyText: 'Search By Action Name',
													width: 210,
													align: 'right',
													listeners: {
														'render': function (cmp) {
															function search_action() {
																var grid = Ext.ComponentQuery.query('#Action #actionGrid')[0]
																var store = grid.getStore();
																var search_query = Ext.ComponentQuery.query('#search_query_action')[0].getValue();
																store.getProxy().setExtraParam('action_name', search_query);
																grid.getStore().loadPage(1);
															}
															cmp.getEl().on('change', function (e) {
																search_action();
															});

															cmp.getEl().on('keypress', function (e) {
																if (e.getKey() == e.ENTER) {
																	search_action();
																}
															});
														}
													}
												}]
										}, {
											dock: 'bottom',
											xtype: 'pagingtoolbar',
											store: 'Action',
											displayInfo: true,
											plugins: Ext.create('PagingToolbarPageSize')
										}],
									columns: [{
											xtype: 'rownumberer'
										}, {
											text: 'ID',
											dataIndex: 'action_id',
											width: 40,
											align: 'right',
											hideable: false
										}, {
											text: 'Action Name',
											dataIndex: 'action_name',
											flex: 1,
											hideable: false
										}, {
											text: 'Base Name',
											dataIndex: 'action_basename',
											flex: 1
										}, {
											text: 'URL',
											dataIndex: 'action_url',
											flex: 1
										}, {
											text: 'Controller',
											dataIndex: 'controller_name',
											flex: 1
										}, {
											text: 'Description',
											dataIndex: 'description',
											flex: 1
										}, {
											xtype: 'booleancolumn',
											text: 'Share',
											dataIndex: 'share',
											falseText: ' ',
											trueText: '&#10003;',
											width: 50,
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
										}, {
											xtype: 'actioncolumn',
											width: 50,
											align: 'right',
											hideable: false,
											resizable: false,
											items: [{
													text: 'Edit',
													iconCls: 'icon-edit',
													bindAction: 'ActionUpdate',
													useActionBaseName: true,
													altText: 'Edit',
													tooltip: 'Edit'
												}, {
													text: 'Delete',
													iconCls: 'icon-delete',
													bindAction: 'ActionDelete',
													useActionBaseName: true,
													altText: 'Delete',
													tooltip: 'Delete'
												}]
										}]
								}]
						}, {
							title: 'Menus',
							itemId: 'Menu',
							items: [{
									xtype: 'treepanel',
									itemId: 'menuGrid',
									store: 'MenuTree',
									useArrows: true,
									rootVisible: false,
									columnLines: true,
									rowLines: true,
									multiSelect: true,
									dockedItems: [{
											dock: 'top',
											xtype: 'toolbar',
											items: [{
													text: 'New Menu',
													itemId: 'btnNew',
													iconCls: 'icon-new',
													bindAction: 'MenuCreate',
													useActionBaseName: true
												}, {
													text: 'Edit',
													itemId: 'btnEdit',
													iconCls: 'icon-edit',
													bindAction: 'MenuUpdate',
													useActionBaseName: true,
													disabled: true
												}, {
													text: 'Delete Selected',
													itemId: 'btnDelete',
													iconCls: 'icon-delete',
													bindAction: 'MenuDelete',
													useActionBaseName: true,
													disabled: true
												}, {
													text: 'Refresh',
													itemId: 'btnRefresh',
													iconCls: 'icon-refresh'
												}]
										}],
									selModel: Ext.create('Ext.selection.CheckboxModel', {}),
									columns: [{
											text: 'ID',
											dataIndex: 'menu_id',
											width: 40,
											align: 'right',
											hideable: false
										}, {
											xtype: 'treecolumn',
											text: 'Caption',
											dataIndex: 'menu_caption',
											width: 200,
											hideable: false
										}, {
											text: 'Name',
											dataIndex: 'menu_name'
										}, {
											text: 'Parent',
											dataIndex: 'menu_parent_name'
										}, {
											text: 'Order',
											dataIndex: 'menu_order',
											width: 40,
											align: 'right'
										}, {
											text: 'Controller',
											dataIndex: 'controller_name'
										}, {
											text: 'Widget',
											dataIndex: 'widget'
										}, {
											text: 'Icon',
											dataIndex: 'menu_icon'
										}, {
											text: 'Icon Cls',
											dataIndex: 'menu_icon_cls'
										}, {
											text: 'Func. Args.',
											dataIndex: 'menu_args'
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
											text: 'Description',
											dataIndex: 'description'
										}, {
											xtype: 'actioncolumn',
											width: 50,
											align: 'right',
											hideable: false,
											resizable: false,
											items: [{
													text: 'Edit',
													iconCls: 'icon-edit',
													bindAction: 'MenuUpdate',
													useActionBaseName: true,
													altText: 'Edit',
													tooltip: 'Edit'
												}, {
													text: 'Delete',
													iconCls: 'icon-delete',
													bindAction: 'MenuDelete',
													useActionBaseName: true,
													altText: 'Delete',
													tooltip: 'Delete'
												}]
										}]
								}]
						}, {
							title: 'Groups',
							itemId: 'Group',
							items: [{
									xtype: 'gridpanel',
									itemId: 'groupGrid',
									store: 'Group',
									columnLines: true,
									selModel: Ext.create('Ext.selection.CheckboxModel', {}),
									dockedItems: [{
											dock: 'top',
											xtype: 'toolbar',
											items: [{
													text: 'New Group',
													itemId: 'btnNew',
													iconCls: 'icon-new',
													bindAction: 'GroupCreate',
													useActionBaseName: true
												}, {
													text: 'Edit',
													itemId: 'btnEdit',
													iconCls: 'icon-edit',
													bindAction: 'GroupUpdate',
													useActionBaseName: true,
													disabled: true
												}, {
													text: 'Delete Selected',
													itemId: 'btnDelete',
													iconCls: 'icon-delete',
													bindAction: 'GroupDelete',
													useActionBaseName: true,
													disabled: true
												}, {
													text: 'Refresh',
													itemId: 'btnRefresh',
													iconCls: 'icon-refresh'
												}]
										}, {
											dock: 'bottom',
											xtype: 'pagingtoolbar',
											store: 'Group',
											displayInfo: true,
											plugins: Ext.create('PagingToolbarPageSize')
										}],
									columns: [{
											xtype: 'rownumberer'
										}, {
											text: 'ID',
											dataIndex: 'group_id',
											width: 40,
											align: 'right',
											hideable: false
										}, {
											text: 'Group Name',
											dataIndex: 'group_name',
											flex: 1,
											hideable: false
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
													bindAction: 'GroupUpdate',
													useActionBaseName: true,
													altText: 'Edit',
													tooltip: 'Edit'
												}, {
													text: 'Delete',
													iconCls: 'icon-delete',
													bindAction: 'GroupDelete',
													useActionBaseName: true,
													altText: 'Delete',
													tooltip: 'Delete'
												}]
										}]
								}]
						}, {
							title: 'Dependencies',
							itemId: 'Dependency',
							items: [{
									xtype: 'gridpanel',
									itemId: 'dependencyGrid',
									store: 'Dependency',
									columnLines: true,
									selModel: Ext.create('Ext.selection.CheckboxModel', {}),
									dockedItems: [{
											dock: 'top',
											xtype: 'toolbar',
											items: [{
													text: 'Add Dependency',
													itemId: 'btnNew',
													iconCls: 'icon-add',
													bindAction: 'DependencyCreate',
													useActionBaseName: true
												}, {
													text: 'Edit',
													itemId: 'btnEdit',
													iconCls: 'icon-edit',
													bindAction: 'DependencyUpdate',
													useActionBaseName: true,
													disabled: true
												}, {
													text: 'Delete Selected',
													itemId: 'btnDelete',
													iconCls: 'icon-delete',
													bindAction: 'DependencyDelete',
													useActionBaseName: true,
													disabled: true
												}, {
													text: 'Refresh',
													itemId: 'btnRefresh',
													iconCls: 'icon-refresh'
												}]
										}, {
											dock: 'bottom',
											xtype: 'pagingtoolbar',
											store: 'Dependency',
											displayInfo: true,
											plugins: Ext.create('PagingToolbarPageSize')
										}],
									columns: [{
											xtype: 'rownumberer'
										}, {
											text: 'ID',
											dataIndex: 'apps_depend_id',
											width: 40,
											align: 'right',
											hideable: false
										}, {
											text: 'Application Name',
											dataIndex: 'depend_name',
											flex: 1,
											hideable: false
										}, {
											text: 'Application Base Name',
											dataIndex: 'depend_basename',
											flex: 1,
											hideable: false
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
													bindAction: 'DependencyUpdate',
													useActionBaseName: true,
													altText: 'Edit',
													tooltip: 'Edit'
												}, {
													text: 'Delete',
													iconCls: 'icon-delete',
													bindAction: 'DependencyDelete',
													useActionBaseName: true,
													altText: 'Delete',
													tooltip: 'Delete'
												}]
										}]
								}]
						}]
				}]
		});
		me.callParent(arguments)
	}
});