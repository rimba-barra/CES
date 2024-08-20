Ext.define('Appsmgmt.controller.Application', {
	extend: 'Ext.app.Controller',
	alias: 'controller.Application',
	models: ['Application', 'Controller', 'Action', 'Menu', 'Group', 'Dependency', ],
	stores: ['Application', 'Controller', 'Action', 'Menu', 'MenuTree', 'Group', 'Dependency', ],
	views: ['application.Panel', 'application.ApplicationFormData', 'application.ControllerFormData', 'application.ActionFormData', 'application.MenuFormData', 'application.GroupFormData', 'application.AssignToGroupFormData', 'application.DependencyFormData', ],
	refs: [{
			ref: 'ApplicationMainPanel',
			selector: '#applicationMainPanel'
		}, {
			ref: 'ApplicationGrid',
			selector: '#applicationMainPanel #applicationGrid'
		}, {
			ref: 'ApplicationMainTab',
			selector: '#applicationMainPanel #applicationMainTab'
		}, {
			ref: 'ApplicationInfo',
			selector: '#applicationMainPanel #applicationForm'
		}, {
			ref: 'ControllerGrid',
			selector: '#applicationMainPanel #controllerGrid'
		}, {
			ref: 'ActionGrid',
			selector: '#applicationMainPanel #actionGrid'
		}, {
			ref: 'MenuGrid',
			selector: '#applicationMainPanel #menuGrid'
		}, {
			ref: 'GroupGrid',
			selector: '#applicationMainPanel #groupGrid'
		}, {
			ref: 'DependencyGrid',
			selector: '#applicationMainPanel #dependencyGrid'
		}],
	init: function (application) {
		this.control({
			'#applicationMainPanel': {
				beforerender: this.mainPanelBeforeRender,
				afterrender: this.mainPanelAfterRender,
				beforedestroy: this.mainPanelBeforeDestroy
			},
			'#applicationMainPanel panel': {
				selectionchange: this.gridSelectionChange,
				itemdblclick: this.gridItemDblClick
			},
			'#applicationMainPanel #btnRefresh': {
				click: this.btnRefreshClick
			},
			'#applicationMainPanel #btnRefresh': {
				click: this.btnRefreshClick
			},
			'#applicationMainPanel gridpanel:not([itemId=Application]) #btnRefresh': {
				click: this.btnRefreshClick
			},
			'ApplicationFormData, ControllerFormData, ActionFormData, AssignToGroupFormData, MenuFormData, GroupFormData, DependencyFormData, ObjectFormData': {
				afterrender: this.formDataAfterRender,
				beforedestroy: this.formDataBeforeDestroy
			},
			'ApplicationFormData #projectpt': {
				change: this.projectptChange
			},
			'MenuFormData #menu_caption': {
				blur: this.menuCaptionLength
			},
			'MenuFormData #menu_parent': {
				change: this.menuCaptionLength
			},
			'window[id=winappsmgmt-formdata-Application] #btnSave, window[id=winappsmgmt-formdata-Controller] #btnSave, window[id=winappsmgmt-formdata-Action] #btnSave, window[id=winappsmgmt-formdata-Menu] #btnSave, window[id=winappsmgmt-formdata-Group] #btnSave, window[id=winappsmgmt-formdata-Dependency] #btnSave': {
				click: this.dataSave
			},
			'window[id=winappsmgmt-formdata-assign-Action] #btnSave': {
				click: this.dataSaveAssignTo
			},
			'window[id=winappsmgmt-formdata-assign-Action] #btnCancel, window[id=winappsmgmt-formdata-Application] #btnCancel, window[id=winappsmgmt-formdata-Controller] #btnCancel, window[id=winappsmgmt-formdata-Action] #btnCancel, window[id=winappsmgmt-formdata-Menu] #btnCancel, window[id=winappsmgmt-formdata-Group] #btnCancel, window[id=winappsmgmt-formdata-Dependency] #btnCancel': {
				click: this.formDataClose
			}
		})
	},
	execAction: function (el, action, me) {
		if (!action) {
			action = ''
		}
		if (!me) {
			me = this
		}
		switch (action) {
			case 'create':
			case 'update':
			case 'assign':
				me.formDataShow(el, action);
				break;
			case 'delete':
				me.dataDestroy(el);
				break
		}

	},
	mainPanelBeforeRender: function () {
		if (typeof Ext.StoreManager.lookup('ApplicationAppStored') == 'undefined') {
			Ext.create('Appsmgmt.store.Application', {
				storeId: 'ApplicationAppStored', sorters: [{
						property: 'apps_name', direction: 'ASC'
					}]
			}
			)//.load({params: {limit: 0}})
		}
		if (typeof Ext.StoreManager.lookup('ControllerAppStored') == 'undefined') {
			Ext.create('Appsmgmt.store.Controller', {
				storeId: 'ControllerAppStored',
				sorters: [{property: 'controller_name', direction: 'ASC'}]
			})//.load({params: {limit: 0}})
		}
		if (typeof Ext.StoreManager.lookup('ActionAppStored') == 'undefined') {
			Ext.create('Appsmgmt.store.Action', {
				storeId: 'ActionAppStored',
				sorters: [{property: 'action_name', direction: 'ASC'}]
			})//.load({params: {limit: 0}})
		}
		if (typeof Ext.StoreManager.lookup('MenuAppStored') == 'undefined') {
			Ext.create('Appsmgmt.store.Menu', {
				storeId: 'MenuAppStored',
				sorters: [{property: 'menu_caption', direction: 'ASC'}]
			})//.load({params: {limit: 0}})
		}
		if (typeof Ext.StoreManager.lookup('GroupAppStored') == 'undefined') {
			Ext.create('Appsmgmt.store.Group', {
				storeId: 'GroupAppStored',
				sorters: [{property: 'group_name', direction: 'ASC'}]
			})//.load({params: {limit: 0}})
		}
//		if (typeof Ext.StoreManager.lookup('DependencyAppStored') == 'undefined') {
//			Ext.create('Appsmgmt.store.Dependency', {
//				storeId: 'DependencyAppStored',
//				sorters: [{property: 'apps_name', direction: 'ASC'}]
//			})//.load({params: {limit: 0}})DependencyAppStored
//		}
		setupObject(this.getApplicationMainPanel(), this.execAction, this);

	},
	mainPanelAfterRender: function () {
		var me = this;
		me.getApplicationGrid().getStore().load({
			params: {limit: 0},
			callback: function () {
				me.getApplicationGrid().getSelectionModel().select(0);
				currentApps = (me.self.getName()).split('.', 1).toString().toLowerCase() == me.getApplicationGrid().getSelectionModel().getSelection()[0].get('apps_basename').toLowerCase();
				if (currentApps) {
					Ext.each(me.getApplicationMainTab().query('actioncolumn'), function (b) {
						b.addListener({
							afterrender: function (a) {
								a.setVisible(false)
							}
						})
					})
				}
				me.getMenuGrid().getStore().getRootNode().removeAll();
				me.getMenuGrid().getRootNode().removeAll()
			}
		});
	},
	mainPanelBeforeDestroy: function () {
		var me = this;
		me.getApplicationGrid().getStore().removeAll();
		me.getControllerGrid().getStore().removeAll();
		me.getActionGrid().getStore().removeAll();
		me.getMenuGrid().getStore().getRootNode().removeAll();
		me.getGroupGrid().getStore().removeAll();
		me.getDependencyGrid().getStore().removeAll();
		Ext.StoreManager.lookup('ApplicationAppStored').clearFilter();
		Ext.StoreManager.lookup('ControllerAppStored').clearFilter();
		Ext.StoreManager.lookup('ActionAppStored').clearFilter();
		Ext.StoreManager.lookup('MenuAppStored').clearFilter();
		Ext.StoreManager.lookup('GroupAppStored').clearFilter();
//		Ext.StoreManager.lookup('DependencyAppStored').clearFilter();

	},
	gridSelectionChange: function (el, selected) {
		var me = this, panel = el.view.panel, currentApps = selected.length == 1 ? (me.self.getName()).split('.', 1).toString().toLowerCase() == me.getApplicationGrid().getSelectionModel().getSelection()[0].get('apps_basename').toLowerCase() : false;
		if (panel.down('#btnEdit')) {
			panel.down('#btnEdit').setDisabled(currentApps || selected.length != 1)
		}
		if (panel.down('#btnDelete')) {
			panel.down('#btnDelete').setDisabled(currentApps || selected.length < 1)
		}

		if (panel.down('#btnAssignToGroup')) {
			panel.down('#btnAssignToGroup').setDisabled(currentApps || selected.length < 1)
		}

		if (panel.getItemId() == 'applicationGrid') {
			var controllerStore = me.getControllerGrid().getStore(),
					actionStore = me.getActionGrid().getStore(),
					menuStore = me.getMenuGrid().getStore(),
					groupStore = me.getGroupGrid().getStore(),
					dependStore = me.getDependencyGrid().getStore();
			if (selected.length == 1) {
				var apps_id = selected[0].get('apps_id');
				me.getApplicationInfo().loadRecord(selected[0]);
				me.getApplicationMainTab().setTitle(selected[0].get('apps_name').toUpperCase());
				controllerStore.getProxy().setExtraParam('apps_id', apps_id);
				controllerStore.getProxy().setExtraParam('controller_name', '');
				me.getControllerGrid().down('#search_query_controller').setValue('');
				controllerStore.load({params: {'start': 0}});
				controllerStore.currentPage = 1;
				actionStore.getProxy().setExtraParam('apps_id', apps_id);
				actionStore.getProxy().setExtraParam('action_name', '');
				me.getActionGrid().down('#search_query_action').setValue('');
				actionStore.load({params: {'start': 0}});
				actionStore.currentPage = 1;
				menuStore.getProxy().setExtraParam('apps_id', apps_id);
				me.getMenuGrid().getRootNode().removeAll();
				menuStore.getRootNode().removeAll();
				if (me.getApplicationMainTab().getActiveTab().getItemId() == 'Menu') {
					me.getMenuGrid().setLoading(true, true)
				}
				menuStore.reload({
					params: {'start': 0},
					callback: function () {
						me.getMenuGrid().setLoading(false)
					}
				});
				groupStore.getProxy().setExtraParam('apps_id', apps_id);
				groupStore.load({params: {'start': 0}});
				groupStore.currentPage = 1;
				dependStore.getProxy().setExtraParam('apps_id', apps_id);
				dependStore.load({params: {'start': 0}});
				dependStore.currentPage = 1;
				me.getApplicationMainTab().setDisabled(false);
				Ext.each(me.getApplicationMainTab().query('#btnNew, actioncolumn'), function (a) {
					if (a.isXType('button')) {
						a.setDisabled(currentApps)
					} else if (a.isXType('actioncolumn')) {
						a.setVisible(!currentApps)
					}
				})
			} else {
				me.getApplicationMainTab().setTitle('');
				me.getApplicationMainTab().setDisabled(true);
				me.getApplicationInfo().getForm().reset();
				controllerStore.removeAll();
				actionStore.removeAll();
				me.getMenuGrid().getRootNode().removeAll();
				menuStore.getRootNode().removeAll();
				groupStore.removeAll();
				dependStore.removeAll()
			}
		}

	},
	gridItemDblClick: function (el) {
		var me = this, btnEdit = el.up('panel').down('#btnEdit');
		if (btnEdit.isVisible() && !btnEdit.isDisabled()) {
			me.execAction(el, 'update')
		}
	},
	btnRefreshClick: function (el) {
		var me = this, panel = el.up('panel');
		if (panel.isXType('treepanel')) {
			panel.setRootNode().removeAll();
			panel.getStore().setRootNode().removeAll();
			panel.setLoading(true, true);
			panel.getStore().reload({
				callback: function () {
					panel.setLoading(false)
				}
			})
		} else {
			var cfg, selModel = panel.getSelectionModel(), lastSelected = selModel.getLastSelected();
			if (panel.getItemId() == 'applicationGrid') {
				cfg = {
					callback: function () {
						if (lastSelected) {
							selModel.select(lastSelected.index)
						}
					}
				}
			}
			panel.getStore().reload(cfg)
		}

	},
	formDataShow: function (el, state) {
		var me = this, formtitle, formicon,
				parent = (Ext.isObject(el.up('gridpanel[itemId=applicationGrid]')) ? el.up('gridpanel[itemId=applicationGrid]') : me.getApplicationMainTab().getActiveTab()),
				parentId = (Ext.isObject(el.up('gridpanel[itemId=applicationGrid]')) ? 'Application' : parent.getItemId()),
				title = parentId,
				winId = 'winappsmgmt-formdata-' + parentId,
				formwidget = 'Appsmgmt.view.application.' + parentId + 'FormData',
				win = desktop.getWindow(winId);
		if (state == "assign") {
			formwidget = 'Appsmgmt.view.application.AssignToGroupFormData';
			winId = 'winappsmgmt-formdata-' + state + '-' + parentId;
		}

		switch (state) {
			case 'create':
				formtitle = 'New ' + title;
				formicon = 'icon-form';
				break;
			case 'update':
				formtitle = 'Edit ' + title;
				formicon = 'icon-form-edit';
				break
			case 'assign':
				formtitle = 'Assign to Group ';
				formicon = 'icon-copy';
				break
		}
		if (!win) {
			win = desktop.createWindow({
				id: winId,
				title: formtitle,
				iconCls: formicon,
				resizable: false,
				minimizable: false,
				maximizable: false,
				width: 650,
				renderTo: Ext.getBody(),
				constrain: true,
				constrainHeader: false,
				taskbarButton: false,
				modal: true,
				layout: 'fit',
				shadow: 'frame',
				shadowOffset: 10,
				border: false,
				items: Ext.create(formwidget),
				state: state,
				sender: el
			})
		}
		win.show();

	},
	formDataClose: function (el) {
		el.up('window').close();
	},
	formDataAfterRender: function (el) {
		var me = this,
				win = el.up('window'),
				state = win.state.toLowerCase(),
				form = el.getForm(),
				formId = el.getItemId(),
				store = [],
				apps_id = parseInt(me.getApplicationInfo().down('#apps_id').getValue(), 10),
				apps_name = me.getApplicationInfo().down('#apps_name').getValue();
		if (formId != 'Application') {
			el.down('#apps_id').setValue(apps_id);
			el.down('#apps_name').setValue(apps_name);
			switch (formId) {
				case 'Action':
					store[0] = Ext.StoreManager.lookup('ControllerAppStored');
					store[0].load({params: {apps_id: apps_id, limit: 0, controller_name: ''}});
					el.down('#controller_id').bindStore(store[0]);
					break;
				case 'AssignToGroup':
					store[0] = Ext.StoreManager.lookup('GroupAppStored');
					store[0].load({params: {apps_id: apps_id, limit: 0}});
					el.down('#group_id').bindStore(store[0]);
					break;
				case 'Menu':
					store[0] = Ext.StoreManager.lookup('ControllerAppStored');
					store[1] = Ext.StoreManager.lookup('MenuAppStored');
					store[0].load({params: {apps_id: apps_id, limit: 0, controller_name: ''}});
					store[1].load({params: {apps_id: apps_id, limit: 0}});
					el.down('#controller_id').bindStore(store[0]);
					el.down('#menu_parent').bindStore(store[1]);
					break;
				case 'Dependency':
					store[0] = Ext.create('Ext.data.Store', {
						fields: ['depend_id', 'depend_name', 'active']
					});
					Ext.StoreManager.lookup('ApplicationAppStored').load({
						params: {limit: 0},
						callback: function () {
							Ext.StoreManager.lookup('ApplicationAppStored').each(function (r) {
								if (r.get('apps_id') != apps_id) {
									store[0].add({
										'depend_id': r.get('apps_id'),
										'depend_name': r.get('apps_name'),
										'active': r.get('active')
									})
								}
							});
							el.down('#depend_id').bindStore(store[0]);
						}
					});
					break
			}
		}

		if (state == 'create') {
			switch (formId) {
				case 'Action':
					el.down('#action_url').setValue(me.getApplicationInfo().down('#apps_basename').getValue() + '/');
					store[0].filter({
						filterFn: function (a) {
							return a.get('active') == true
						}
					});
					break;
				case 'Menu':
					store[0].filter({
						filterFn: function (a) {
							return a.get('active') == true
						}
					});
					store[1].filter({
						filterFn: function (a) {
							return a.get('active') == true && a.get('menu_caption') != '-'
						}
					});
					if (win.sender.up('panel').getSelectionModel().getSelection().length == 1) {
						el.down('#menu_parent').setValue(win.sender.up('panel').getSelectionModel().getSelection()[0].get('menu_id'))
					}
					break;
				case 'Dependency':
					store[0].filter({
						filterFn: function (a) {
							return a.get('active') == true && a.get('depend_id') != apps_id
						}
					});
					break
			}
			el.down('#active').setValue(1)
		} else if (state == 'update') {
			var record = win.sender.up('panel').getSelectionModel().getSelection()[0];
			el.loadRecord(record);
			switch (formId) {
				case 'Application':
					if ((me.self.getName()).split('.', 1).toString().toLowerCase() == record.get('apps_basename').toLowerCase()) {
						el.down('#apps_basename').setReadOnly(true);
						el.down('#projectpt').setDisabled(true);
						el.down('#projectpt_menu').setDisabled(true);
						el.down('#active').setDisabled(true)
					}
					break;
				case 'Controller':
					el.down('#default_actions').setValue(0);
					el.down('#default_actions').setVisible(false);
					break;
				case 'Action':
					store[0].filter({
						filterFn: function (a) {
							return a.get('active') == true || a.get('controller_id') == record.get('controller_id')
						}
					});
					break;
				case 'Menu':
					var nodes = [];
					Ext.each(me.getDeepAllChildNodes(me.getMenuGrid().getStore().getNodeById(record.get('menu_id'))), function (a) {
						nodes.push(a.data['menu_id'])
					});
					store[0].filter({
						filterFn: function (a) {
							return a.get('active') == true || a.get('controller_id') == record.get('controller_id')
						}
					});
					store[1].filter({
						filterFn: function (a) {
							return(a.get('active') == true && a.get('menu_caption') != '-' && nodes.indexOf(a.get('menu_id')) == -1) || a.get('menu_id') == record.get('menu_parent')
						}
					});
					if (!record.get('controller_id')) {
						el.down('#controller_id').setValue('')
					}
					break;
				case 'Dependency':
					store[0].filter({
						filterFn: function (a) {
							return(a.get('active') == true && a.get('depend_id') != apps_id) || a.get('depend_id') == record.get('depend_id')
						}
					});
					break
			}
		}
	},
	formDataBeforeDestroy: function (el) {
		var formId = el.getItemId();
		switch (formId) {
			case 'Action':
				Ext.StoreManager.lookup('ControllerAppStored').clearFilter();
				break;
			case 'Menu':
				Ext.StoreManager.lookup('ControllerAppStored').clearFilter();
				Ext.StoreManager.lookup('MenuAppStored').clearFilter();
				break;
			case 'Dependency':
//				Ext.StoreManager.lookup('DependencyAppStored').clearFilter();
				break
		}

	},
	projectptChange: function (el) {
		var field = el.up('form').down('#projectpt_menu');
		if (el.getValue()) {
			field.setDisabled(false)
		} else {
			field.setValue('');
			field.setDisabled(true)
		}

	},
	menuCaptionLength: function (el) {
		var menucaption, menuparent;
		if (el.isXType('combobox')) {
			menucaption = el.prev('#menu_caption');
			menuparent = el
		} else if (el.isXType('textfield')) {
			menucaption = el;
			menuparent = el.next('#menu_parent')
		}
		if (menuparent.getValue()) {
			menucaption.minLength = 1
		} else {
			menucaption.minLength = 2
		}

	},
	dataSave: function (el) {
		var me = this, formpanel = el.up('form'), form = formpanel.getForm();
		if (form.isValid()) {
			var formId = formpanel.getItemId(),
					win = el.up('window'),
					state = win.state.toLowerCase(),
					store,
					extraFailMsg = '',
					msg = function () {
						win.body.mask('Saving data, please wait ...')
					};
			switch (formId) {
				case 'Menu':
					store = Ext.StoreManager.lookup('MenuAppStored');
					store.clearFilter();
					break;
				default:
					store = win.sender.up('panel').getStore();
					break
			}
			switch (state) {
				case 'create':
					extraFailMsg = '<br />Data may already exists.';
					store.add(form.getValues());
					break;
				case 'update':
					var idProperty = store.getProxy().getReader().getIdProperty(), rec = store.getById(parseInt(form.findField(idProperty).getValue(), 10));
					extraFailMsg = '<br />Data may have been used.';
					rec.beginEdit();
					rec.set(form.getValues());
					rec.endEdit();
					break
			}
			store.on('beforesync', msg);
			store.sync({
				success: function () {
					win.body.unmask();
					store.un('beforesync', msg);
					switch (formId) {
						case 'Controller':
							me.getActionGrid().getStore().reload();
							store.reload();
							break;
						case 'Menu':
							me.getMenuGrid().getRootNode().removeAll();
							me.getMenuGrid().getStore().getRootNode().removeAll();
							me.getMenuGrid().getStore().reload();
							store.clearFilter();
							break;
						default:
							store.reload();
							break
					}
					if (typeof Ext.StoreManager.lookup(formId + 'AppStored') != 'undefined') {
						Ext.StoreManager.lookup(formId + 'AppStored').reload()
					}
					Ext.Msg.show({
						title: 'Success',
						msg: 'Data saved successfully.',
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {
							me.formDataClose(el)
						}
					})
				},
				failure: function () {
					win.body.unmask();
					store.un('beforesync', msg);
					switch (formId) {
						case 'Controller':
							me.getActionGrid().getStore().reload();
							store.reload();
							break;
						case 'Menu':
							me.getMenuGrid().getRootNode().removeAll();
							me.getMenuGrid().getStore().getRootNode().removeAll();
							me.getMenuGrid().getStore().reload();
							store.clearFilter();
							break;
						default:
							store.reload();
							break
					}
					if (typeof Ext.StoreManager.lookup(formId + 'AppStored') != 'undefined') {
						Ext.StoreManager.lookup(formId + 'AppStored').reload()
					}
					Ext.Msg.show({
						title: 'Failure',
						msg: 'Error: Unable to save data.' + extraFailMsg,
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					})
				}
			})
		}
	},
	dataDestroy: function (el) {
		var me = this,
				tab = el.up('tabpanel'),
				gridId = (tab ? tab.getActiveTab().getItemId() : 'Application'),
				store,
				grid = el.up('panel'),
				winbody = grid.up('window').body,
				rec = grid.getSelectionModel().getSelection();
		switch (gridId) {
			case 'Menu':
				store = Ext.StoreManager.lookup('MenuAppStored');
				store.clearFilter();
				break;
			default:
				store = grid.getStore();
				break
		}
		if (rec.length < 1) {
			Ext.Msg.alert('Info', 'No record selected !');
			return false
		} else {
			var confirmmsg, successmsg, failmsg, recordcounttext = rec.length + ' record' + (rec.length > 1 ? 's' : '');
			if (rec.length == 1) {
				var recname;
				switch (gridId) {
					case'Application':
						recname = 'apps_name';
						break;
					case'Dependency':
						recname = 'depend_name';
						break;
					default:
						recname = gridId.toLowerCase() + '_name';
						break
				}
				var selectedRecord = '[' + rec[0].get(recname) + ']';
				confirmmsg = 'Delete ' + selectedRecord + ' ?';
				failmsg = 'Error: Unable to delete ' + selectedRecord + '.'
			} else {
				confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
				failmsg = 'Error: Unable to delete data.'
			}
			Ext.Msg.confirm('Delete Data', confirmmsg, function (c) {
				if (c == 'yes') {
					var d = function () {
						winbody.mask('Deleting data, please wait ...')
					};
					for (var i = 0; i < rec.length; i++) {
						if (grid.isXType('treepanel')) {
							store.remove(store.getById(rec[i].get(store.getProxy().getReader().getIdProperty())))
						} else {
							store.remove(rec[i])
						}
					}
					store.on('beforesync', d);
					store.sync({
						success: function (s) {
							winbody.unmask();
							var a = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
							var b = (rec.length == 1 ? selectedRecord : (a != rec.length ? a + ' of ' : '') + recordcounttext) + ' deleted successfully.';
							store.un('beforesync', d);
							switch (gridId) {
								case'Menu':
									me.getMenuGrid().getRootNode().removeAll();
									me.getMenuGrid().getStore().getRootNode().removeAll();
									me.getMenuGrid().getStore().reload();
									store.clearFilter();
									break;
								default:
									store.reload();
									break
							}
							if (typeof Ext.StoreManager.lookup(gridId + 'AppStored') != 'undefined') {
								Ext.StoreManager.lookup(gridId + 'AppStored').reload()
							}
							Ext.Msg.show({
								title: 'Success',
								msg: b, icon:
										Ext.Msg.INFO,
								buttons: Ext.Msg.OK
							})
						},
						failure: function () {
							grid.up('window').body.unmask();
							store.un('beforesync', d);
							switch (gridId) {
								case'Menu':
									me.getMenuGrid().getRootNode().removeAll();
									me.getMenuGrid().getStore().getRootNode().removeAll();
									me.getMenuGrid().getStore().reload();
									store.clearFilter();
									break;
								default:
									store.reload();
									break
							}
							if (typeof Ext.StoreManager.lookup(gridId + 'AppStored') != 'undefined') {
								Ext.StoreManager.lookup(gridId + 'AppStored').reload()
							}
							Ext.Msg.show({
								title: 'Failure',
								msg: failmsg + '<br />Data may have been used. Try to deactivate data.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							})
						}
					})
				}
			})
		}
	},
	dataSaveAssignTo: function (el) {
		var me = this, formpanel = el.up('form'), form = formpanel.getForm();
		if (form.isValid()) {
			var formId = formpanel.getItemId(),
					win = el.up('window');
			var me = this,
					grid = me.getActionGrid(),
					winbody = grid.up('window').body,
					rec = grid.getSelectionModel().getSelection();

			if (rec.length < 1) {
				Ext.Msg.alert('Info', 'No record selected !');
				return false
			} else {
				var confirmmsg, successmsg, failmsg, recordcounttext = rec.length + ' record' + (rec.length > 1 ? 's' : '');
				if (rec.length == 1) {
					var selectedRecord = '[' + rec[0].get('action_name') + ']';
					confirmmsg = 'Assign ' + selectedRecord + ' to ' + formpanel.down("#group_id").getRawValue() + '?';
					failmsg = 'Error: Unable to assign ' + selectedRecord + '.'
				} else {
					confirmmsg = 'This action will assign ' + recordcounttext + ' to ' + formpanel.down("#group_id").getRawValue() + '.<br />Continue ?';
					failmsg = 'Error: Unable to assign data.'
				}
				Ext.Msg.confirm('Assign to Group', confirmmsg, function (c) {
					if (c == 'yes') {
						win.body.mask('Saving data, please wait ...')

						var data = [];
						Ext.each(rec, function (record, idx) {
							data[idx] = {action_id: record.data.action_id};
						});

						Ext.Ajax.request({
							url: 'appsmgmt/application/actionassign',
							params: {
								data_action: Ext.encode(data),
								group_id: formpanel.down("#group_id").getValue()
							},
							success: function (response) {
								var a = parseInt(Ext.decode(response.responseText).total, 10);
								var b = (rec.length == 1 ? selectedRecord : (a != rec.length ? a + ' of ' : '') + recordcounttext) + ' assign successfully.';

								win.body.unmask();
								if (Ext.decode(response.responseText).success == true) {
									Ext.Msg.show({
										title: 'Success',
										msg: b, icon:
												Ext.Msg.INFO,
										buttons: Ext.Msg.OK,
										fn: function () {
											me.formDataClose(el)
										}
									});

								} else {
									Ext.Msg.show({
										title: 'Failure',
										msg: failmsg + '<br />Data may have been assign.',
										icon: Ext.Msg.ERROR,
										buttons: Ext.Msg.OK
									});
								}
							},
						});
					}
				})
			}
		}
	},
	getDeepAllChildNodes: function (node) {
		var me = this,
				allNodes = [];
		if (Ext.value(node, false)) {
			if (!node.hasChildNodes()) {
				allNodes.push(node)
			} else {
				allNodes.push(node);
				node.eachChild(function (Mynode) {
					allNodes = allNodes.concat(me.getDeepAllChildNodes(Mynode))
				})
			}
		}
		return allNodes
	}
});