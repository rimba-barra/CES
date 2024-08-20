Ext.define('Erems.library.template.controller.Controller2', {
	extend      : 'Erems.library.template.controller.Controllernomodelfull',
	c2OtherPars : null,
	whoCallMeID : null, /* controller lain yang memanggil controller ini*/
	constructor : function (configs) {
		this.callParent(arguments);
	},
	/*@override 22 Jan 2014*/
	dataSearch : function () {
		var me = this;

		var form   = me.getFormsearch().getForm();
		var fields = me.getFormsearch().getValues();

		me.getGrid().doInit();
		var store = me.getGrid().getStore();
		for (var x in fields){
			store.getProxy().setExtraParam(x, fields[x]);
		}
		me.loadPage(store);
	},
	loadPage: function (store) {
		var me = this;
		store.loadPage(1, {
			callback : function (rec, operation, success) {
				if (!store.modelExist) {
					me.getGrid().attachModel(operation);
					store.load();
				}
			}
		});
	},
	panelAfterRender: function (configs) {
		this.callParent(arguments);
		this.whoCallMeID = null;

		Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/mustache.min.js', function () {
			console.log("[INFO] Mustache loaded.");
			if (typeof ApliJs === "undefined") {
				Ext.Loader.injectScriptElement(document.URL + 'app/erems/js/ApliJs.js', function () {
					// console.log("[INFO] ApliJs loaded.");
				}, function () {
					// error load file
				});
			}
		}, function () {
		});
	},
	mainPanelBeforeRender: function (el) {
		var me = this;
		setupObject(el, me.execAction, me);
	},
	attachModel: function (operation, store, eraseOld) {
		var me = this;
		var data = Ext.JSON.decode(operation.response.responseText);

		store.model.setFields(data.model);
		store.loadData([], false);
		var eo = typeof eraseOld !== "boolean" ? false : eraseOld;
		store.loadRawData(data.data, eo);
		store.modelExist = true;
	},
	/* added 24 february 2014*/
	attachModel_b: function (operation, store, eraseOld) {
		var me   = this;
		var data = Ext.JSON.decode(operation.response.responseText);

		store.model.setFields(data.model);
		store.loadData([], false);
		var eo = typeof eraseOld !== "boolean" ? false : eraseOld;

		var result  = store.proxy.reader.read(data.data),
			records = result.records;
		for (var x in records) {
			store.add(records[x]);
		}
		store.modelExist = true;
	},
	setDefaultValue : function (el, fieldID, fieldDefault) {
		var idDefault = 0;
		var fd = typeof fieldDefault === "undefined" ? "is_default" : fieldDefault;

		el.getStore().each(function (rec) {
			if (rec !== null) {
				if (rec.get(fd) === true && idDefault === 0) {
					idDefault = rec.get(fieldID);
				}
			}
		});
		if (idDefault > 0) {
			el.setValue(idDefault);
		}
	},
	formDataAfterRender: function (el) {
		var state = el.up('window').state;
		console.log("[WINDOW STATE] " + state);
		var me = this;
		me.fdar().init();

		if (state == 'create') {
			me.fdar().create();
		} else if (state == 'update' || state == 'read') {
			me.fdar().update();
		} else if (state == 'view') {
			me.fdar().view();
		}
	},
	/*@added 19 Maret 2014*/
	xFormatDate: function (date) {
		if (date) {
			var d = date.getDate();
			var m = (date.getMonth() + 1);
			var y = date.getFullYear();
			return y + "-" + m + "-" + d;
		}
		return "";
	},
	xFormatFloat: function (val) {
		var x = 0;
		x = parseFloat(val);
		x = isNaN(x) ? 0 : x;
		return x;
	},
	/* added 25 Maret 2014 copas dari controllerReport **/
	getComboboxText: function (name, form) {
		var me = this;
		var f = typeof form == "undefined" ? me.getFormdata() : form;
		var text = f.down("[name=" + name + "]").getSelectedText();

		if (text) {
			return text;
		}
		return FALSE;
	},
	gridAfterRender: function (configs) {
		this.callParent(arguments);
	},
	newActionColumnClick: function (el) {
		var me = this;
		me.formDataShow(el, 'update', me.bindPrefixName + 'Update');
	},
	instantBrowseWindow: function (panel, width, title, state, id) {
		var me = this;
		var formtitle, formicon;

		title     = typeof title == 'undefined' ? 'My Window' : title;
		id        = typeof id == 'undefined' ? 'myInstantWindow' : id;
		state     = typeof state == 'undefined' ? 'create' : state;
		panel     = typeof panel == 'undefined' ? 'Panel' : panel;
		width     = typeof width == 'undefined' ? 600 : width;
		formtitle = title;
		formicon  = 'icon-form-add';

		var winId = id;
		var win   = desktop.getWindow(winId);

		if (!win) {
			win = desktop.createWindow({
				id              : winId,
				title           : formtitle,
				state           : state,
				iconCls         : formicon,
				resizable       : false,
				minimizable     : false,
				maximizable     : false,
				width           : width,
				renderTo        : Ext.getBody(),
				constrain       : true,
				constrainHeader : false,
				modal           : true,
				layout          : 'fit',
				shadow          : 'frame',
				shadowOffset    : 10,
				border          : false,
				items           : [
					{
						xtype  : 'panel',
						height : 300,
						layout : { type : 'border' },
						items  : [
							Ext.create('Erems.library.template.view.FormSearchBrowse'),
							Ext.create('Erems.view.' + me.controllerName + '.' + panel)
						]
					}
				],
			});
		}
		win.show();
	},
	instantWindow: function (panel, width, title, state, id, controller) {
		var me = this;
		var formtitle, formicon;

		title     = typeof title == 'undefined' ? 'My Window' : title;
		id        = typeof id == 'undefined' ? 'myInstantWindow' : id;
		state     = typeof state == 'undefined' ? 'create' : state;
		panel     = typeof panel == 'undefined' ? 'Panel' : panel;
		width     = typeof width == 'undefined' ? 600 : width;
		formtitle = title;
		formicon  = 'icon-form-add';

		var controllerFolder = typeof controller === 'undefined' ? me.controllerName : controller;
		var winId            = id;
		var win              = desktop.getWindow(winId);

		if (!win) {
			win = desktop.createWindow({
				id              : winId,
				title           : formtitle,
				iconCls         : formicon,
				resizable       : true,
				minimizable     : false,
				maximizable     : true,
				width           : width,
				renderTo        : Ext.getBody(),
				constrain       : true,
				constrainHeader : false,
				modal           : true,
				layout          : 'fit',
				shadow          : 'frame',
				shadowOffset    : 10,
				border          : false,
				items           : Ext.create('Erems.view.' + controllerFolder + '.' + panel),
				state           : state
			});
		}
		win.show();
	},
	registerOTHERParams: function (data) {
		this.c2OtherPars = data['others'][0][0];
	},
	getOTHERParams: function (key) {
		return this.c2OtherPars[key];
	},
    checkboxChangeReport: function (el) {
        if (el.getValue()) {
            el.prev().setValue(0);
        }
    },

    comboboxChangeReport: function (el) {
        el.next().setValue("0");
    },
})
