Ext.define("Appsmgmt.controller.Accessright", {
	extend: "Ext.app.Controller",
	alias: "controller.Accessright",
	controllerName: "accessright",
	models: "Application Group Action Menu User Dependency GroupAction GroupMenu GroupUser Masterdata.model.Projectpt".split(" "),
	stores: "Application Group Action Menu User Dependency GroupAction GroupMenu GroupMenuTree GroupUser Masterdata.store.Projectpt".split(" "),
	views: ["accessright.Panel", "accessright.GroupActionFormData", "accessright.GroupMenuFormData", "accessright.GroupUserFormData", "accessright.GroupActionFormData"],
	refs: [{
			ref: "AccessrightMainPanel",
			selector: "#accessrightMainPanel"
		},
		{
			ref: "GroupGrid",
			selector: "#accessrightMainPanel #groupGrid"
		},
		{
			ref: "AppsCombo",
			selector: "#accessrightMainPanel #groupGrid #apps_id"
		},
		{
			ref: "AccessrightMainTab",
			selector: "#accessrightMainPanel #accessrightMainTab"
		},
		{
			ref: "GroupActionGrid",
			selector: "#accessrightMainPanel #groupactionGrid"
		},
		{
			ref: "GroupMenuGrid",
			selector: "#accessrightMainPanel #groupmenuGrid"
		},
		{
			ref: "GroupUserGrid",
			selector: "#accessrightMainPanel #groupuserGrid"
		},
		{
			ref: "GroupCopyFormData",
			selector: "#GroupCopyAction"
		},
		{
			ref: "GroupCopyMenuFormData",
			selector: "#GroupCopyMenu"
		}],
	init: function (a) {
		this.control({
			"#accessrightMainPanel": {
				beforerender: this.mainPanelBeforeRender,
				afterrender: this.mainPanelAfterRender,
				beforedestroy: this.mainPanelBeforeDestroy
			},
			"#accessrightMainPanel #groupGrid #apps_id": {
				change: this.applicationSelect,
				select: this.applicationSelect
			},
			"#accessrightMainPanel panel": {
				selectionchange: this.gridSelectionChange,
				itemdblclick: this.gridItemDblClick
			},
			"#accessrightMainPanel panel #btnRefresh": {
				click: this.btnRefreshClick
			},
			"#accessrightMainPanel panel #btnCopyAction": {
				click: function (a) {
					this.formDataShows("copy")
				}
			},
			"#accessrightMainPanel panel #btnCopyMenu": {
				click: function (a) {
					this.formDataShowMenu("copy")
				}
			},
			"GroupActionFormData, GroupMenuFormData, GroupUserFormData, GroupCopyFormData, GroupCopyMenuFormData": {
				afterrender: this.formDataAfterRender,
				beforedestroy: this.formDataBeforeDestroy
			},
			"GroupActionFormData #apps_id": {
				change: this.appsChange,
				select: this.appsSelect
			},
			"GroupUserFormData #project_id": {
				change: this.projectChange,
				select: this.projectSelect
			},
			"GroupUserFormData #pt_id": {
				blur: this.ptBlur,
				focus: this.ptFocus,
				change: this.ptChange,
				select: this.ptSelect
			},
			GroupCopyFormData: {
				afterrender: function (a) {}
			},
			GroupCopyMenuFormData: {
				afterrender: function (a) {}
			},
			"window[id=winappsmgmt-formdata-GroupAction] #btnSave, window[id=winappsmgmt-formdata-GroupMenu] #btnSave, window[id=winappsmgmt-formdata-GroupUser] #btnSave": {
				click: this.dataSave
			},
			"window[id=winappsmgmt-formdata-GroupAction] #btnCancel, window[id=winappsmgmt-formdata-GroupMenu] #btnCancel, window[id=winappsmgmt-formdata-GroupUser] #btnCancel": {
				click: this.formDataClose
			},
			"window[id=winappsmgmt-formdata-GroupAction] #btnSaveCopy ": {
				click: this.dataCopy
			},
			"GroupCopyMenuFormData #btnSaveCopyMenu ": {
				click: this.dataCopyMenu
			}
		})
	},
	execAction: function (a, c, b) {
		c || (c = "");
		b || (b = this);
		if ("GroupUser" == b.getAccessrightMainTab().getActiveTab().getItemId() && "delete" == c) {
			var d = b.self.getName().split(".", 1).toString().toLowerCase() == b.getGroupGrid().getSelectionModel().getSelection()[0].get("apps_basename").toLowerCase(),
					h = b.getGroupUserGrid().getSelectionModel().getSelection()[0].get("user_name") == apps.uid;
			d && h && (Ext.Msg.show({
				title: " ",
				msg: "This is the current active user account for this module.",
				icon: Ext.Msg.WARNING,
				buttons: Ext.Msg.OK,
				fn: function () {}
			}), c = "")
		}
		switch (c) {
			case "create":
			case "update":
			case "copy":
				b.formDataShow(a, c);
				break;
			case "delete":
				b.dataDestroy(a)
		}
	},
	mainPanelBeforeRenderr: function (el) {
		var me = this;
		setupObject(el, me.execAction, me);
	},
	mainPanelBeforeRender: function () {
		"undefined" == typeof Ext.StoreManager.lookup("ApplicationStored") && Ext.create("Appsmgmt.store.Application", {
			storeId: "ApplicationStored",
			sorters: [{
					property: "apps_name",
					direction: "ASC"
				}]
		}).load({
			params: {
				limit: 0
			}
		});
		"undefined" == typeof Ext.StoreManager.lookup("GroupAcessRightStored") && Ext.create("Appsmgmt.store.Group", {
			storeId: "GroupAcessRightStored",
			sorters: [{
					property: "apps_name",
					direction: "ASC"
				}]
		})//.load({
//			params: {
//				limit: 0
//			}
//		});
		"undefined" == typeof Ext.StoreManager.lookup("ActionAcessRightStored") && Ext.create("Appsmgmt.store.Action", {
			storeId: "ActionAcessRightStored",
			sorters: [{
					property: "action_name",
					direction: "ASC"
				}]
		})//.load({
//			params: {
//				limit: 0
//			}
//		});
//		"undefined" == typeof Ext.StoreManager.lookup("MenuStored") && Ext.create("Appsmgmt.store.Menu", {
//			storeId: "MenuStored",
//			sorters: [{
//					property: "menu_parent",
//					direction: "ASC"
//				},
//				{
//					property: "menu_order",
//					direction: "ASC"
//				},
//				{
//					property: "menu_name",
//					direction: "ASC"
//				}]
//		}).load({
//			params: {
//				limit: 0
//			}
//		});
//		"undefined" == typeof Ext.StoreManager.lookup("DependencyStored") && Ext.create("Appsmgmt.store.Dependency", {
//			storeId: "DependencyStored",
//			sorters: [{
//					property: "apps_name",
//					direction: "ASC"
//				}]
//		}).load({
//			params: {
//				limit: 0
//			}
//		});
//		"undefined" == typeof Ext.StoreManager.lookup("UserStored") && Ext.create("Appsmgmt.store.User", {
//			storeId: "UserStored",
//			sorters: [{
//					property: "user_name",
//					direction: "ASC"
//				},
//				{
//					property: "user_fullname",
//					direction: "ASC"
//				}]
//		}).load({
//			params: {
//				limit: 0
//			}
//		});
//		"undefined" == typeof Ext.StoreManager.lookup("GroupMenuStored") && Ext.create("Appsmgmt.store.GroupMenu", {
//			storeId: "GroupMenuStored",
//			sorters: [{
//					property: "menu_parent",
//					direction: "ASC"
//				},
//				{
//					property: "menu_order",
//					direction: "ASC"
//				},
//				{
//					property: "menu_name",
//					direction: "ASC"
//				}]
//		}).load({
//			params: {
//				limit: 0
//			}
//		});
		"undefined" == typeof Ext.StoreManager.lookup("ProjectptStored") && Ext.create("Masterdata.store.Projectpt", {
			storeId: "ProjectptStored",
			sorters: [{
					property: "project_name",
					direction: "ASC"
				}]
		}).load({
			params: {
				limit: 0
			}
		});
		setupObject(this.getAccessrightMainPanel(), this.execAction, this)
	},
	mainPanelAfterRender: function () {
		var a = this,
//				c = a.getApplicationStore().load({params: {limit: 0}});
				c = Ext.StoreManager.lookup("ApplicationStored");
		b = Ext.StoreManager.lookup("GroupAcessRightStored");
		a.getAppsCombo().bindStore(c);
		a.getGroupGrid().bindStore(b);
		b.getProxy().extraParams = [];
		b.load({
			params: {
				limit: 25
			},
			callback: function () {
				a.getGroupGrid().getSelectionModel().select(0);
				(currentApps = a.self.getName().split(".", 1).toString().toLowerCase() == a.getGroupGrid().getSelectionModel().getSelection()[0].get("apps_basename").toLowerCase()) && Ext.each(a.getAccessrightMainTab().query("actioncolumn"), function (a) {
					"groupuserGrid" != a.up("panel").getItemId() && a.addListener({
						afterrender: function (a) {
							a.setVisible(!1)
						}
					})
				})
			}
		});
//		store.sort("apps_name", "ASC");
		a.getGroupMenuGrid().getStore().getRootNode().removeAll();
		a.getGroupMenuGrid().getRootNode().removeAll()
	},
	mainPanelBeforeDestroy: function () {
		this.getGroupActionGrid().getStore().removeAll();
		this.getGroupMenuGrid().getStore().getRootNode().removeAll();
		Ext.StoreManager.lookup("ApplicationStored").clearFilter();
//		Ext.StoreManager.lookup("GroupAcessRightStored").clearFilter();
		Ext.StoreManager.lookup("ActionAcessRightStored").clearFilter();
//		Ext.StoreManager.lookup("MenuStored").clearFilter();
//		Ext.StoreManager.lookup("UserStored").clearFilter();
//		Ext.StoreManager.lookup("GroupMenuStored").clearFilter();
		Ext.StoreManager.lookup("ProjectptStored").clearFilter()
	},
	applicationSelect: function (a) {
		var me = this;
		var store = me.getGroupGrid().getStore();
		store.getProxy().setExtraParam('apps_id', a.getValue());
		store.getProxy().setExtraParam('limit', 0);
		store.loadPage(1)
		me.getGroupGrid().down("pagingtoolbar").hide()
//		if (pg) {
//			pg.getStore().load();
//		}
//		store.load({
//			params: {
//				limit: 100000,
//				pageSize:0,
//				page: 1,
//			}
//		});
		this.getGroupGrid().down("#colAppsName").setVisible(!1);
//		var c = this.getGroupGrid().getStore();
//		c.clearFilter();
//		a.getValue() ? (c.filter("apps_id", parseInt(a.getValue(), 10)), c.sort("group_name", "ASC"), c.sort("group_name2", "ASC"), this.getGroupGrid().down("#colAppsName").setVisible(!1)) : (c.sort("apps_name", "ASC"), this.getGroupGrid().down("#colAppsName").setVisible(!0))
	},
	gridSelectionChange: function (a, c) {
		var b = this,
				d = a.view.panel,
				h = 1 == c.length ? b.self.getName().split(".", 1).toString().toLowerCase() == b.getGroupGrid().getSelectionModel().getSelection()[0].get("apps_basename").toLowerCase() : "";
		d.down("#btnEdit") && d.down("#btnEdit").setDisabled("groupuserGrid" != d.getItemId() && h || 1 != c.length);
		d.down("#btnDelete") && d.down("#btnDelete").setDisabled("groupuserGrid" != d.getItemId() && h || 1 > c.length);
		if ("groupGrid" == d.getItemId()) {
			b.getAppsCombo().getStore();
			d = b.getGroupActionGrid().getStore();
			var e = b.getGroupMenuGrid().getStore(),
					f = b.getGroupUserGrid().getStore();
			if (1 == c.length) {
				var k = Ext.StoreManager.lookup("ApplicationStored").getById(c[0].get("apps_id")).get("projectpt"),
						g = c[0].get("group_id"),
						l = (c[0].get("apps_name") + " - " + c[0].get("group_name")).toUpperCase();
				b.getAccessrightMainTab().setTitle(l);
				d.getProxy().setExtraParam("group_id", g);
				d.load({
					params: {
						page: 1
					}
				});
				d.currentPage = 1;
				e.getProxy().setExtraParam("group_id", g);
				b.getGroupMenuGrid().getRootNode().removeAll();
				e.getRootNode().removeAll();
				"GroupMenu" == b.getAccessrightMainTab().getActiveTab().getItemId() && b.getGroupMenuGrid().setLoading(!0, !0);
				e.reload({
					params: {
						page: 1
					},
					callback: function () {
						b.getGroupMenuGrid().setLoading(!1)
					}
				});
				f.getProxy().setExtraParam("group_id", g);
				f.load({
					params: {
						page: 1
					}
				});
				f.currentPage = 1;
				b.getGroupUserGrid().down("#colProject").setVisible(k);
				b.getGroupUserGrid().down("#colPt").setVisible(k);
				b.getAccessrightMainTab().setDisabled(!1);
				Ext.each(b.getAccessrightMainTab().query("#groupactionGrid #btnNew, #btnCopyAction, #groupactionGrid actioncolumn, #groupmenuGrid #btnNew, #groupmenuGrid actioncolumn"), function (a) {
					a.isXType("button") ? a.setDisabled(h) : a.isXType("actioncolumn") && a.setVisible(!h)
				})
			} else
				b.getAccessrightMainTab().setTitle(""),
						b.getAccessrightMainTab().setDisabled(!0),
						b.getGroupUserGrid().down("#colProject").setVisible(!1),
						b.getGroupUserGrid().down("#colPt").setVisible(!1),
						d.removeAll(),
						e.getRootNode().removeAll(),
						f.removeAll()
		}
	},
	gridItemDblClick: function (a) {
		var c = a.up("panel").down("#btnEdit");
		c.isVisible() && !c.isDisabled() && this.execAction(a, "update")
	},
	btnRefreshClick: function (a) {
		var c = a.up("panel");
		c.isXType("treepanel") ? (c = a.up("treepanel"), c.setRootNode().removeAll(), c.getStore().setRootNode().removeAll(), c.setLoading(!0, !0), c.getStore().reload({
			callback: function () {
				c.setLoading(!1)
			}
		})) : c.getStore().reload()
	},
	formDataShow: function (a, c) {
		var b = this.getAccessrightMainTab().getActiveTab(),
				d = b.getItemId();
		b = b.title;
		var h = "winappsmgmt-formdata-" + d;
		d = "Appsmgmt.view.accessright." + d + "FormData";
		var e = desktop.getWindow(h);
		switch (c) {
			case "create":
				var f = "Add " + b;
				var k = "icon-form-add";
				break;
			case "update":
				f = "Edit " + b;
				k = "icon-form-edit";
				break;
			case "copy":
				f = "Copy " + b,
						k = "icon-form-edit"
		}
		e || (e = desktop.createWindow({
			id: h,
			title: f,
			iconCls: k,
			resizable: !1,
			minimizable: !1,
			maximizable: !1,
			width: 650,
			renderTo: Ext.getBody(),
			constrain: !0,
			constrainHeader: !1,
			taskbarButton: !1,
			modal: !0,
			layout: "fit",
			shadow: "frame",
			shadowOffset: 10,
			border: !1,
			items: Ext.create(d),
			state: c,
			sender: a
		}));
		e.show()
	},
	formDataShowMenu: function (a, c) {
		var b = "winappsmgmt-formdata-" + this.getAccessrightMainTab().getActiveTab().getItemId(),
				d = desktop.getWindow(b);
		d || (d = desktop.createWindow({
			id: b,
			title: "Copy Menu",
			iconCls: void 0,
			resizable: !1,
			minimizable: !1,
			maximizable: !1,
			width: 650,
			renderTo: Ext.getBody(),
			constrain: !0,
			constrainHeader: !1,
			taskbarButton: !1,
			modal: !0,
			layout: "fit",
			shadow: "frame",
			shadowOffset: 10,
			border: !1,
			items: Ext.create("Appsmgmt.view.accessright.GroupCopyMenuFormData"),
			state: "copy",
			sender: a
		}));
		d.show()
	},
	formDataShows: function (a, c) {
		var b = "winappsmgmt-formdata-" + this.getAccessrightMainTab().getActiveTab().getItemId(),
				d = desktop.getWindow(b);
		d || (d = desktop.createWindow({
			id: b,
			title: "Copy Action",
			iconCls: void 0,
			resizable: !1,
			minimizable: !1,
			maximizable: !1,
			width: 650,
			renderTo: Ext.getBody(),
			constrain: !0,
			constrainHeader: !1,
			taskbarButton: !1,
			modal: !0,
			layout: "fit",
			shadow: "frame",
			shadowOffset: 10,
			border: !1,
			items: Ext.create("Appsmgmt.view.accessright.GroupCopyFormData"),
			state: "copy",
			sender: a
		}));
		d.show()
	},
	formDataClose: function (a) {
		a.up("window").close()
	},
	formDataAfterRender: function (a) {
		var me = this;
		win = a.up("window");
		state = win.state.toLowerCase();
		formId = a.getItemId();
		store = [];
		apps_id = parseInt(this.getGroupGrid().getSelectionModel().getSelection()[0].get("apps_id"), 10);
		group_id = parseInt(this.getGroupGrid().getSelectionModel().getSelection()[0].get("group_id"), 10);
		group_name = this.getGroupGrid().getSelectionModel().getSelection()[0].get("group_name");
		group_id2 = parseInt(this.getGroupGrid().getSelectionModel().getSelection()[0].get("group_id"), 10);
		projectpt = Ext.StoreManager.lookup("ApplicationStored").getById(apps_id).get("projectpt");
		groupStore = Ext.create("Appsmgmt.store.Group");
//		dependStore = Ext.StoreManager.lookup("DependencyStored");
		dependStore = me.getDependencyStore().load({params: {limit: 0}});
		appsStore = Ext.create("Ext.data.Store", {
			fields: ["apps_id", "apps_name", "projectpt"]
		});
		appsRec = Ext.StoreManager.lookup("ApplicationStored").getById(apps_id);
		appsStore.add({
			apps_id: apps_id,
			apps_name: appsRec.get("apps_name"),
			projectpt: appsRec.get("projectpt")
		});
		dependStore.filter({
			filterFn: function (a) {
				return 1 == a.get("active") && a.get("apps_id") == apps_id
			}
		});
		dependStore.data.each(function (a) {
			appsStore.add({
				apps_id: a.get("depend_id"),
				apps_name: a.get("depend_name"),
				projectpt: a.get("depend_projectpt")
			})
		});
		a.down("#apps_id").bindStore(appsStore);
		"copy" == state && a.down("#group_id2").bindStore(groupStore);
		groupStore.load({
			params: {
				limit: 0,
				apps_id: apps_id
			}
		});
		a.down("#apps_id").setValue(apps_id);
		a.down("#group_id").setValue(group_id);
		a.down("#group_name").setValue(group_name);
		switch (formId) {
			case "GroupAction":
				store[0] = Ext.StoreManager.lookup('ActionAcessRightStored').load({params: {apps_id: apps_id, limit: 0}});
				a.down("#action_id").bindStore(store[0]);
				a.down("#action_id").setReadOnly(!1);
				break;
			case "GroupMenu":
				"undefined" == typeof Ext.StoreManager.lookup("GroupMenuStored") && Ext.create("Appsmgmt.store.GroupMenu", {storeId: "GroupMenuStored", }).load({params: {group_id: group_id, limit: 0}});
				storeMenu = me.getMenuStore();
				store[0] = storeMenu.load({params: {apps_id: apps_id, limit: 0}});
				a.down("#menu_id").bindStore(store[0]);
				break;
			case "GroupUser":
				if (store[0] = me.getUserStore().load({params: {limit: 0}}), a.down("#user_id").bindStore(store[0]), projectpt) {
					store[1] = Ext.StoreManager.lookup("ProjectptStored");
					store[2] = Ext.create("Ext.data.Store", {
						fields: ["project_id", "project_name"]
					});
					store[3] = Ext.create("Ext.data.Store", {
						model: store[2].model,
						recordType: store[2].recordType
					});
					store[2].sort("project_name", "ASC");
					store[3].sort("pt_name", "ASC");
					var c = [];
					Ext.each(store[1].collect("project_id"), function (a) {
						store[1].each(function (b) {
							a == b.get("project_id") && (c[a] = {
								project_id: a,
								project_name: b.get("project_name")
							})
						})
					});
					Ext.each(c, function (a) {
						Ext.isObject(a) && store[2].add(a)
					});
					store[1].each(function (a) {
						store[3].add(a)
					});
					a.down("#projectpt_id").bindStore(store[1]);
					a.down("#project_id").bindStore(store[2]);
					a.down("#pt_id").bindStore(store[3]);
					a.down("#project_id").allowBlank = !1;
					a.down("#pt_id").allowBlank = !1
				} else
					a.down("#projectpt").setVisible(!1)
		}
		if ("create" == state)
			store[0].filter({
				filterFn: function (a) {
					return 1 == a.get("active")
				}
			}),
					a.down("#active").setValue(1);
		else if ("update" == state) {
			var b = win.sender.up("panel").getSelectionModel().getSelection()[0],
					d = this.getGroupGrid().getSelectionModel().getSelection()[0].get("apps_id");
			a.loadRecord(b);
			switch (formId) {
				case "GroupAction":
					store[0].filter({
						filterFn: function (a) {
							return a.get("apps_id") == b.get("apps_id") && 1 == a.get("active") && (b.get("apps_id") == d || b.get("apps_id") != d && a.get("share")) || a.get("action_id") == b.get("action_id")
						}
					});
					a.down("#action_id").setReadOnly(!1);
					a.down("#action_id").setValue(b.get("action_id"));
					break;
				case "GroupMenu":
					store[0].filter({
						filterFn: function (a) {
							return 1 == a.get("active") || a.get("menu_id") == b.get("menu_id")
						}
					});
					a.down("#menu_id").setReadOnly(!0);
					break;
				case "GroupUser":
					groupStore.filter({
						filterFn: function (a) {
							return a.get("apps_id") == b.get("apps_id") && 1 == a.get("active") || a.get("group_id") == b.get("group_id")
						}
					});
					store[0].filter({
						filterFn: function (a) {
							return 1 == a.get("active") || a.get("user_id") == b.get("user_id")
						}
					});
					projectpt && (store[2].filter({
						filterFn: function (a) {
							return 1 == a.get("active") || a.get("project_id") == b.get("project_id")
						}
					}), store[3].filter({
						filterFn: function (a) {
							return 1 == a.get("active") || a.get("pt_id") == b.get("pt_id")
						}
					}));
					a.down("#projectpt_id").setValue(b.get("projectpt_id"));
					a.down("#group_id").setReadOnly(!1);
					a.down("#pt_id").setReadOnly(!1);
					var h = this.self.getName().split(".", 1).toString().toLowerCase() == this.getGroupGrid().getSelectionModel().getSelection()[0].get("apps_basename").toLowerCase(),
							e = this.getGroupUserGrid().getSelectionModel().getSelection()[0].get("user_name") == apps.uid;
					h && e && (a.down("#user_id").setReadOnly(!0), a.down("#group_id").setReadOnly(!0), a.down("#pt_id").setReadOnly(!0), a.down("#active").setReadOnly(!0))
			}
		}
	},
	formDataBeforeDestroy: function (a) {
//		a = a.getItemId();
		Ext.StoreManager.lookup("ApplicationStored").clearFilter();
//		Ext.StoreManager.lookup("GroupAcessRightStored").clearFilter();
//		Ext.StoreManager.lookup("DependencyStored").clearFilter();
//		switch (a) {
//			case "GroupAction":
//				Ext.StoreManager.lookup("ActionStored").clearFilter();
//				break;
//			case "GroupMenu":
//				Ext.StoreManager.lookup("MenuStored").clearFilter();
//				Ext.StoreManager.lookup("GroupMenuStored").clearFilter();
//				break;
//			case "GroupUser":
//				Ext.StoreManager.lookup("UserStored").clearFilter(),
		Ext.StoreManager.lookup("ProjectptStored").clearFilter()
//		}
	},
	appsChange: function (a) {
		a.next().getStore().clearFilter();
		a.next().setValue("");
		a.next().setReadOnly(!0)
	},
	appsSelect: function (a) {
		var c = this.getGroupGrid().getSelectionModel().getSelection()[0].get("apps_id");
		a.next().getStore().filter({
			filterFn: function (b) {
				return b.get("apps_id") == a.getValue() && 1 == b.get("active") && (a.getValue() == c || a.getValue() != c && 1 == b.get("share"))
			}
		});
		a.next().setReadOnly(!1)
	},
	projectChange: function (a) {
		a.next().getStore().clearFilter();
		a.next().setValue("");
		a.next().setReadOnly(!0)
	},
	projectSelect: function (a) {
		a.next().getStore().filter("project_id", a.getValue());
		a.next().setReadOnly(!1)
	},
	ptBlur: function (a) {
		a.prev().getValue() || a.setValue("")
	},
	ptFocus: function (a) {
		a.prev().getValue() || a.setValue("-- select project first --")
	},
	ptChange: function (a) {
		a.next().setValue("")
	},
	ptSelect: function (a) {
		var c = a.up("form"),
				b = a.next("#projectpt_id").getStore();
		b.clearFilter();
		b.filter({
			filterFn: function (a) {
				return a.get("project_id") == c.down("#project_id").getValue() && a.get("pt_id") == c.down("#pt_id").getValue()
			}
		});
		a.next("#projectpt_id").setValue(b.getAt(0).get("projectpt_id"))
	},
	dataSave: function (a) {
		var c = this,
				b = a.up("form"),
				d = b.getForm();
		if (d.isValid()) {
			var h = b.getItemId(),
					e = a.up("window");
			e.sender.up("panel");
			b = e.state.toLowerCase();
			var f = "",
					k = function () {
						e.body.mask("Saving data, please wait ...")
					};
			switch (h) {
				case "GroupMenu":
					if (b != "update") {
						var g = c.getGroupMenuStore().load({params: {group_id: d.getValues().group_id, limit: 0}});
					}
					break;
				default:
					g = e.sender.up("panel").getStore()
			}
			switch (b) {
				case "create":
					f = "<br />Data may already exists.";
					g.add(d.getValues());
					break;
				case "update":
					if (h == "GroupMenu") {
						var g = Ext.StoreManager.lookup("GroupMenuStored");
					}
					b = g.getProxy().getReader().getIdProperty(),
							b = g.getById(parseInt(d.findField(b).getValue(), 10)),
							f = "<br />Data may have been used.",
							b.beginEdit(),
							b.set(d.getValues()),
							b.endEdit()
			}
			g.on("beforesync", k);
			g.sync({
				success: function () {
					e.body.unmask();
					g.un("beforesync", k);
					switch (h) {
						case "GroupMenu":
							c.getGroupMenuGrid().getRootNode().removeAll();
							c.getGroupMenuGrid().getStore().getRootNode().removeAll();
							c.getGroupMenuGrid().getStore().reload();
							g.clearFilter();
							break;
						default:
							g.reload()
					}
					"undefined" != typeof Ext.StoreManager.lookup(h + "Stored") && Ext.StoreManager.lookup(h + "Stored").reload();
					Ext.Msg.show({
						title: "Success",
						msg: "Data saved successfully.",
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {
							c.formDataClose(a)
						}
					})
				},
				failure: function () {
					e.body.unmask();
					g.un("beforesync", k);
					switch (h) {
						case "GroupMenu":
							c.getGroupMenuGrid().getRootNode().removeAll();
							c.getGroupMenuGrid().getStore().getRootNode().removeAll();
							c.getGroupMenuGrid().getStore().reload();
							g.clearFilter();
							break;
						default:
							g.reload()
					}
					"undefined" != typeof Ext.StoreManager.lookup(h + "Stored") && Ext.StoreManager.lookup(h + "Stored").reload();
					Ext.Msg.show({
						title: "Failure",
						msg: "Error: Unable to save data." + f,
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					})
				}
			})
		}
	},
	dataDestroy: function (a) {
		var c = this,
				b = a.up("tabpanel").getActiveTab().getItemId(),
				d = a.up("panel"),
				h = d.up("window").body,
				e = d.getSelectionModel().getSelection();
		switch (b) {
			case "GroupMenu":
				var f = c.getGroupMenuStore().load({params: {group_id: e[0].get('group_id'), limit: 0}});
				break;
			default:
				f = d.getStore()
		}
		if (1 > e.length)
			return Ext.Msg.alert("Info", "No record selected !"),
					!1;
		var k = e.length + " record" + (1 < e.length ? "s" : "");
		if (1 == e.length) {
			switch (b) {
				case "GroupAction":
					var g = "action_name";
					break;
				case "GroupMenu":
					g = "menu_name";
					break;
				case "GroupUser":
					g = "user_name"
			}
			var l = "[" + e[0].get(g) + "]";
			a = "Delete " + l + " ?";
			var m = "Error: Unable to delete " + l + "."
		} else
			a = "This action will delete " + k + ".<br />Continue ?",
					m = "Error: Unable to delete data.";
		Ext.Msg.confirm("Delete Data", a, function (a) {
			if ("yes" == a) {
				var g = function () {
					h.mask("Deleting data, please wait ...")
				};
				for (a = 0; a < e.length; a++)
					d.isXType("treepanel") ? f.remove(f.getById(e[a].get(f.getProxy().getReader().getIdProperty()))) : f.remove(e[a]);
				f.on("beforesync", g);
				f.sync({
					success: function (a) {
						h.unmask();
						a = parseInt(Ext.decode(a.operations[0].response.responseText).total, 10);
						a = (1 == e.length ? l : (a != e.length ? a + " of " : "") + k) + " deleted successfully.";
						f.un("beforesync", g);
						switch (b) {
							case "GroupMenu":
								c.getGroupMenuGrid().getRootNode().removeAll();
								c.getGroupMenuGrid().getStore().getRootNode().removeAll();
								c.getGroupMenuGrid().getStore().reload();
								f.clearFilter();
								break;
							default:
								f.reload()
						}
						"undefined" != typeof Ext.StoreManager.lookup(b + "Stored") && Ext.StoreManager.lookup(b + "Stored").reload();
						Ext.Msg.show({
							title: "Success",
							msg: a,
							icon: Ext.Msg.INFO,
							buttons: Ext.Msg.OK
						})
					},
					failure: function () {
						d.up("window").body.unmask();
						f.un("beforesync", g);
						switch (b) {
							case "GroupMenu":
								c.getGroupMenuGrid().getRootNode().removeAll();
								c.getGroupMenuGrid().getStore().getRootNode().removeAll();
								c.getGroupMenuGrid().getStore().reload();
								f.clearFilter();
								break;
							default:
								f.reload()
						}
						"undefined" != typeof Ext.StoreManager.lookup(b + "Stored") && Ext.StoreManager.lookup(b + "Stored").reload();
						Ext.Msg.show({
							title: "Failure",
							msg: m + "<br />Data may have been used. Try to deactivate data.",
							icon: Ext.Msg.ERROR,
							buttons: Ext.Msg.OK
						})
					}
				})
			}
		})
	},
	dataCopyMenu: function (a) {
		a.up("panel");
		this.getGroupActionGrid();
		var c = this.getGroupCopyMenuFormData();
		c.setLoading("Please wait...");
		Ext.Ajax.request({
			url: "appsmgmt/accessright/groupactioncreate",
			params: {
				mode_read: "copymenu",
				group1: c.down("[name=group_id]").getValue(),
				group2: c.down("[name=group_id2]").getValue()
			},
			success: function (b, d) {
				c.setLoading(!1);
				1 == Ext.decode(b.responseText).success ? Ext.Msg.show({
					title: "Info",
					msg: "Success Copy Menu.",
					closable: !0,
					icon: Ext.Msg.INFO,
					buttons: Ext.Msg.OK
				}) : Ext.Msg.show({
					title: "Info",
					msg: "Fail. Nothing Changed!.",
					closable: !0,
					icon: Ext.Msg.INFO,
					buttons: Ext.Msg.OK
				});
				a.up("window").close()
			},
			failure: function () {
				Ext.Msg.show({
					title: "Info",
					msg: "Failed Copy Menu.",
					closable: !0,
					icon: Ext.Msg.INFO,
					buttons: Ext.Msg.OK
				})
			}
		})
	},
	dataCopy: function (a) {
		a.up("panel");
		this.getGroupActionGrid();
		var c = this.getGroupCopyFormData();
		c.setLoading("Please wait...");
		Ext.Ajax.request({
			url: "appsmgmt/accessright/groupactioncreate",
			params: {
				mode_read: "copyaction",
				group1: c.down("[name=group_id]").getValue(),
				group2: c.down("[name=group_id2]").getValue()
			},
			success: function (b, d) {
				c.setLoading(!1);
				1 == Ext.decode(b.responseText).success ? Ext.Msg.show({
					title: "Info",
					msg: "Success Copy Action.",
					closable: !0,
					icon: Ext.Msg.INFO,
					buttons: Ext.Msg.OK
				}) : Ext.Msg.show({
					title: "Info",
					msg: "Fail. Nothing Changed!",
					closable: !0,
					icon: Ext.Msg.INFO,
					buttons: Ext.Msg.OK
				});
				a.up("window").close()
			},
			failure: function () {
				Ext.Msg.show({
					title: "Info",
					msg: "Failed Copy Action.",
					closable: !0,
					icon: Ext.Msg.INFO,
					buttons: Ext.Msg.OK
				})
			}
		})
	}
});