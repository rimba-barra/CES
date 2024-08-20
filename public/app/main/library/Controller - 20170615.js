Ext.define('Main.library.Controller', {
	extend: 'Ext.app.Controller',
	
	models: [],
	stores: [],
	views: [],	
	refs: [],
	
	selfName: null,
	appsName: null,
	formalName: null,
	
	mainPanel: null,
	mainGrid: null,
	mainFormSearch: null,
	mainFormData: null,
	
	paramName: { searchData:'datasearch', detailsData:'details', detailsremovedData:'detailsremoved' },	
	actionName: { create:'CREATE', update:'UPDATE', destroy:'DELETE', print:'PRINT' },
	
	button: {
		create: { id:'btnAdd', caption:'Add' },
		update: { id:'btnEdit', caption:'Edit' },
		destroy: { id:'btnDelete', caption:'Delete Selected' },		
		search: { id:'btnSearch', caption:'Search' },
		reset: { id:'btnReset', caption:'Reset' },
		save: { id:'btnSave', caption:'Save' },
		cancel: { id:'btnCancel', caption:'Cancel' },
		refresh: { id:'btnRefresh', caption:'Refresh' },
		print: { id:'btnPrint', caption:'Refresh' },
		close: { id:'btnCancel', caption:'Close' }
	},
	
	loadDependData: function(autoBindElRoot) {
		var me = this;	
			
		me.stores.forEach(function(storename){
			var storeId = '', storeClass = '';
			if (storename.indexOf('.')!=-1) {
				storeName = storename.split('.');
				storeName = storeName[(storeName.length-1)];
				storeClass = storename;
			} else {
				storeName = storename;
				storeClass = me.appsName+'.store.'+storename;
			}
			storeId1 = '-'+storeName+'-Stored';
			if (storeName.splitUCase().length==1) {
				var s = Ext.StoreManager.lookup(storeClass) || Ext.StoreManager.lookup(storeName);
				if (!Ext.StoreManager.lookup(storeId1) && s && s.getProxy().type!='memory') {				
					s = Ext.create(storeClass, {storeId:storeId1, refStoreName:storeName});
					var params = {}, datasearch = {}; 
					datasearch[s.getProxy().getReader().idProperty] = 0;
					params[me.paramName.searchData] = Ext.encode(datasearch);
					s.load({params:Ext.Object.merge(params,{limit:0})});
				}				
			}				
									
			/*
			if (storename!=me.selfName) { 
				storeId2 = '~'+me.selfName+'~'+storeName+'~Stored';
				if (!Ext.StoreManager.lookup(storeId2)) { 
					Ext.create(storeClass, { storeId:storeId2, refStoreName:storeName, storeClone:true }); 
					me.copyStore(storeId1, storeId2); 
				} 
			}
			*/

			if (autoBindElRoot) {
				var store = Ext.StoreManager.lookup(storeId1), idProperty;
				if (store) {
					idProperty = store.getProxy().getReader().idProperty;
					autoBindElRoot.query('[valueField='+idProperty+']').forEach(function(o){ 
						if (Ext.isObject(o) && (o.isXType('combobox') || o.isXType('gridpanel') || o.isXType('treepanel') || o.isXType('chart')) && (!o.getStore() || o.getStore().storeId=='ext-empty-store')) o.bindStore(store);
					});
				}
			}		
		});			
	},
	
	copyStore: function(storeSource, storeDest, filters) {		
		storeSource =  Ext.isString(storeSource) ? Ext.StoreManager.lookup(storeSource) : storeSource;
		storeDest = Ext.isString(storeDest) ? Ext.StoreManager.lookup(storeDest) : storeDest;		
		var loadtm = setTimeout(function(){
			if (!storeSource.isLoading()) {
				clearTimeout(loadtm);
				if (Ext.isDefined(filters)) {
					storeSource.clearFilter();
					storeSource.filter(filters);
				}
				storeDest.removeAll(true);
				storeSource.each(function(rec){
					storeDest.add(rec.copy());
				});
				storeDest.storeSource = storeSource.storeId;
				storeSource.clearFilter();				
			}			
		}, 50);		
	},
	
	setComboboxDefault: function(el, id, dataIndex, time) {
		if (!Ext.isObject(el) || !el.isXType('combobox')) return false;
		var store = el.getStore(), time = time || 10, dataIndex = dataIndex || 0,
			t = setTimeout(function(){	 
				do {
					if (!el.getValue() && !store.isLoading()) {
						clearTimeout(t);
						delete t;
						el.setValue(Ext.isArray(store[id]) ? store[id][dataIndex] : store[id]); 							
					}	 
				} while (store.isLoading());
			}, time);		
	},
	
	getGeneralSetting: function(fieldName, callback) {
		var me = this;
		if (me.selfName=='Setting') { return false; };
		var s = Ext.StoreManager.lookup('-Setting-Stored'), settingValue = false, t;
		t = setTimeout(function(){
			if (!s.isLoading()) {
				clearTimeout(t); 
				delete t;
				settingValue = s.getAt(0).get(fieldName);
				if (Ext.isFunction(callback)) { callback(settingValue); }
			}	
		}, 10);
		return settingValue;
	},
	
	execAction: function(o, action, me, args) { 
		if (!action) return false;
		if (!me) me = this;		
		var actionNameArray = action.splitUCase(), controllerName = actionNameArray[0], act = action.toUpperCase();				
		if (controllerName==me.selfName) {
			var defaultActionNames = Ext.Object.getValues(me.actionName);			
			if (defaultActionNames.indexOf(actionNameArray[(actionNameArray.length-1)].toUpperCase())==-1) return false;
			if (!args) args = {};
			var gridpanel = o.up('gridpanel'), store, record = [];			
			if (gridpanel) {
				store =  gridpanel.getStore();
				record = gridpanel.getSelectionModel().getSelection();
				o.masterEl = gridpanel.masterEl;
			} else if (o.isXType('combobox')) {
				store = o.getStore();
				record[0] = store.getById(o.getValue());
			}	
			if (!Ext.isObject(store.processFn)) store.processFn = {}; 
			if (!Ext.isObject(store.extraParam)) store.extraParam = {};
			if (act.indexOf(me.actionName.create)!=-1 || act.indexOf(me.actionName.update)!=-1) {
				var detailFormName = actionNameArray[1] && defaultActionNames.indexOf(actionNameArray[1].toUpperCase())==-1 ? actionNameArray[1] : '', headerId = {};
				if (detailFormName) {
					var masterEl = o.up('window').down('#'+o.masterEl);
					if (args.refCtrl && (!o.masterEl || !masterEl)) return false;
					var senderForm = o.up('form');
					if (masterEl) {
						headerIdKey = masterEl.getStore().getProxy().getReader().idProperty;
						if (masterEl.isXType('gridpanel')) {
							headerIdVal = masterEl.getSelectionModel().getSelection()[0].get(headerIdKey);
						} else {
							headerIdVal = masterEl.getValue();
						}
					} else if (senderForm) {
						headerIdKey = senderForm.store.getProxy().getReader().idProperty;
						headerIdVal = senderForm.down('#'+headerIdKey).getValue();
					} else {
						return false;
					}
					headerId[headerIdKey] = headerIdVal;
				}
				me.formDataShow({
					id:me.selfName+detailFormName,
					widget:me.appsName+'.view.'+me.selfName.toLowerCase()+'.'+detailFormName+'FormData', 
					sender:o, action:action, store:store, record:record,
					headerId:headerId, refCtrl:args.refCtrl||null
				});	
			} else if (act.indexOf(me.actionName.destroy)!=-1) {
				me.dataProcess({sender:o, state:me.actionName.destroy, store:store, record:record});
			} else if (act.indexOf(me.actionName.print)!=-1) {
				loadReport(o, me.appsName.toLowerCase()+'/'+me.selfName.toLowerCase()+'/'+acts[action]);
			}
		} else {			
			var ctrl = _Apps.getController(controllerName);
			if (!ctrl) return false;
			ctrl.execAction(o, action, null, {refCtrl:me.selfName});
		}		
	},
	
	constructor: function(application) {
		var me = this, meNameSplit = me.self.getName().split('.');
		
		me.appsName = meNameSplit[0];
		me.selfName = meNameSplit[(meNameSplit.length-1)];					
		me.formalName = me.formalName || me.selfName;
		
		me.mainPanel = me.selfName+'Panel';
		me.mainGrid = me.selfName+'Grid';
		me.mainFormSearch = me.selfName+'FormSearch';
		me.mainFormData = me.selfName+'FormData';
		
		me.refs = (me.refs || []).concat([
			{ ref:'MainPanel', selector:me.mainPanel },
			{ ref:'MainGrid', selector:me.mainPanel+' '+me.mainGrid },
			{ ref:'MainFormSearch', selector:me.mainPanel+' '+me.mainFormSearch },
			{ ref:'MainFormData', selector:me.mainFormData }
		]);
		
		me.callParent(arguments);
	},
	
	init: function(application) {
		var me = this;
				
		me.control(me.mainPanel, {
			beforerender: me.mainPanelBeforeRender,
			afterrender: me.mainPanelAfterRender,
			removed: me.mainPanelRemoved
		});
		
		me.control(me.mainPanel+' gridpanel', {
			beforerender: me.gridPanelBeforeRender,
			afterrender: me.gridPanelAfterRender,
			selectionchange: me.gridPanelSelectionChange,
			itemdblclick: me.gridPanelItemDblClick
		});
		
		me.control(me.mainPanel+' combobox', {
			beforerender: me.comboboxBeforeRender,
			afterrender: me.comboboxAfterRender,
			focus: me.comboboxFocus,
			change: me.comboboxChange,
			//select: me.comboboxSelect
		});
		
		me.control(me.mainFormSearch, {
			beforerender: me.formSearchBeforeRender,
			afterrender: me.formSearchAfterRender
		});
		
		me.control(me.mainFormData, {
			beforerender: me.formDataBeforeRender,
			afterrender: me.formDataAfterRender,
			removed: me.formDataRemoved
		});	
		
		me.callParent(arguments);
	},
	
	mainPanelBeforeRender: function(o) {
		var me = this, btnSearch = o.down('#'+me.button.search.id), btnReset = o.down('#'+me.button.reset.id);		
		me.loadDependData(o);
		if (me.getMainGrid() && me.getMainFormSearch()) me.dataReset();
		if (btnSearch) btnSearch.on('click', me.dataSearch, me);
		if (btnReset) btnReset.on('click', me.dataReset, me);
	},
	
	mainPanelAfterRender: Ext.emptyFn,
	
	mainPanelRemoved: function() {
		var me = this;
		/*
		Ext.StoreManager.each(function(store) { 
			var storeId = store.storeId; 
			if (storeId.indexOf('~'+me.selfName+'~')!=-1) { 
				store.removeAll(true); 
				Ext.StoreManager.unregister(storeId); 
			} 
		});
		*/
	},
	
	gridPanelBeforeRender: Ext.emptyFn,
	
	gridPanelAfterRender: function(o) {
		var me = this, gridStore = o.getStore(), actioncolumn = o.down('actioncolumn'), form = o.up('form');
		if (!Ext.isObject(o.button)) o.button = {};
		if (!Ext.isObject(o.button.create)) o.button.create = o.down('#'+(o.button.create||me.button.create.id));
		if (!Ext.isObject(o.button.update)) o.button.update = o.down('#'+(o.button.update||me.button.update.id));
		if (!Ext.isObject(o.button.destroy)) o.button.destroy = o.down('#'+(o.button.destroy||me.button.destroy.id));
		if (!Ext.isObject(o.button.refresh)) o.button.refresh = o.down('#'+(o.button.refresh||me.button.refresh.id));
		if (!Ext.isObject(o.button.print)) o.button.print = o.down('#'+(o.button.print||me.button.print.id));
		if (!Ext.isObject(o.button.create)) delete o.button.create;
		if (!Ext.isObject(o.button.refresh)) { delete o.button.refresh; } else { o.button.refresh.on('click', me.dataReload, me); }
		if (!Ext.isObject(o.button.print)) delete o.button.print;
		if (!Ext.isObject(o.button.update)) { delete o.button.update; } else if (o.button.update.isVisible()) { o.button.update.setDisabled(true); }
		if (!Ext.isObject(o.button.destroy)) { delete o.button.destroy; } else if (o.button.destroy.isVisible()) { o.button.destroy.setDisabled(true); }
		gridStore.syncStore = !o.up('form');
		if (gridStore.syncStore && actioncolumn && actioncolumn.isVisible() && o.minRecordCount && o.button.destroy && (!form || form.state==me.actionName.update)) {
			gridStore.on('datachanged', function(){
				Ext.each(actioncolumn.items, function(item, index) {
					if (acts[item.bindAction] && item.bindAction==o.button.destroy.bindAction) { item.getClass = function() { return (gridStore.getCount()<=o.minRecordCount ? 'x-hide-display' : item.className); }; }
				});
			}, me);
		}
		/*
		gridStore.on('beforeload', function(s){
			if (s.getModifiedRecords().length || s.getRemovedRecords().length) {				
				s.suspendEvents(true);
				o.getView().loadMask.hide();
				Ext.Msg.confirm('Reload Data', 'The list has been changed and not saved. Do you want to reload the data ?', function(btn){
					if (btn=='no') return false;
					s.resumeEvents();
				});
			}
		}, me);
		*/
		if (o.masterEl) {
			var masterEl = o.up('window').down('#'+o.masterEl);
			if (!masterEl) { delete o.masterEl; return false; }
			masterEl.hasSlave = true;
			if (masterEl.isXType('gridpanel')) {
				var isDisabled = masterEl.getSelectionModel().getSelection().length!=1;
				if (o.down('toolbar[dock=top]')) o.down('toolbar[dock=top]').setDisabled(isDisabled);
				if (o.down('pagingtoolbar')) o.down('pagingtoolbar').setDisabled(isDisabled);			
				if (isDisabled) o.getStore().removeAll();
			}
		}
	},
	
	gridPanelSelectionChange: function(o, selected) {
		var me = this, gridpanel = o.view.panel, form = gridpanel.up('form'), gridpanelStore = gridpanel.getStore(), idProperty = gridpanelStore.getProxy().getReader().idProperty;
		if (gridpanel.button.update && gridpanel.button.update.isVisible()) gridpanel.button.update.setDisabled(selected.length!=1);
		if (gridpanel.button.destroy && gridpanel.button.destroy.isVisible()) gridpanel.button.destroy.setDisabled(selected.length<1 || (gridpanelStore.syncStore && gridpanel.minRecordCount && (!form || form.state==me.actionName.update) ? gridpanelStore.getCount()<=gridpanel.minRecordCount || gridpanelStore.getCount()==selected.length : false));	
		if (gridpanel.hasSlave) {
			gridpanel.up('window').query('gridpanel[masterEl='+gridpanel.getItemId()+']').forEach(function(grid){
				var gridStore = grid.getStore(), pagingToolbar = grid.down('pagingtoolbar');
				if (selected.length!=1) {				
					gridStore.removeAll();
					if (gridStore.getProxy().extraParams[me.paramName.searchData]) delete gridStore.getProxy().extraParams[me.paramName.searchData]; 
				} else {
					var params = {}, datasearch = {}; 
					datasearch[idProperty] = selected[0].get(idProperty);				
					params[me.paramName.searchData] = Ext.encode(datasearch);
					gridStore.load({params:Ext.Object.merge(params,{page:1,start:0,limit:(pagingToolbar?25:0)})});				
				}
				if (grid.down('toolbar[dock=top]')) grid.down('toolbar[dock=top]').setDisabled(selected.length!=1);
				if (pagingToolbar) pagingToolbar.setDisabled(selected.length!=1);
			});			
		}
	},
	
	gridPanelItemDblClick: function(o) {
		var me = this, gridpanel = o.up('panel');
		me.execAction(o, gridpanel.button.update && gridpanel.button.update.isVisible() && gridpanel.button.update.bindAction ? gridpanel.button.update.bindAction : '');
	},
	
	comboboxBeforeRender: Ext.emptyFn,
	
	comboboxAfterRender: function(o) {
		if (o.masterEl) {
			var masterEl = o.up('window').down('#'+o.masterEl);
			if (!masterEl) { delete o.masterEl; return false; }
			masterEl.hasSlave = true;
		}
		o.getStore().syncStore = true;
	},
	
	comboboxFocus: function(o) {
		var me = this;
		if (!o.masterEl) {
			var comboStore = o.getStore(), form = o.up('form');
			if (comboStore.getProxy().type!='memory') {
				comboStore.clearFilter();
				comboStore.filterBy(function(item){ return item.get('active')==true || (form.initData && item.get(o.valueField)==form.initData[o.valueField]); });
				comboStore.sort(o.displayField, 'ASC');
			}
		} else {
			if (!o.isDisabled()) me.comboboxSelect(o.up('window').down('#'+o.masterEl));
		}
	},
	
	comboboxChange: function(o) {
		var me = this, form = o.up('form');
		form.query('combobox[masterEl='+(o.getName()||o.getItemId())+']').forEach(function(field){
			field.setValue('');
			field.setReadOnly(true);
		});	
		if (Ext.isNumber(o.getValue())) me.comboboxSelect(o);
	},
		
	comboboxSelect: function(o) {
		var form = o.up('form');
		if (o.hasSlave && o.getValue()) {
			form.query('[masterEl='+(o.getName()||o.getItemId())+']').forEach(function(field){
				if (field.isXType('combobox')) {
					var fieldStore = field.getStore();
					if (fieldStore.getProxy().type!='memory') {					
						fieldStore.clearFilter();
						fieldStore.filterBy(function(item){ return item.get('active')==true && item.get(o.valueField)==o.getValue(); });	
						fieldStore.sort(field.displayField, 'ASC');
					}
					field.setReadOnly(false);
				}
			});			
		}
	},
	
	formSearchBeforeRender: Ext.emptyFn,
	
	formSearchAfterRender: Ext.emptyFn,
	
	formDataShow: function(args) {
		var me = this, formicon = 'icon-form', state, formtitlePrefix = '';		
		if (!args.action && args.state) args.action = args.state;
		if (!args.widget || !args.action) return;		
		if (args.action.indexOf('Create')!=-1) {
			formicon = 'icon-form-add';
			state = me.actionName.create;
			formtitlePrefix = 'Add ';
			delete args.record;
		} else if (args.action.indexOf('Update')!=-1) {
			if (!args.record || !args.record[0]) { Ext.Msg.show({ title:'Error', msg:'No record defined !', icon:Ext.Msg.ERROR, buttons:Ext.Msg.OK }); return false; }
			formicon = 'icon-form-edit';			
			state = me.actionName.update;
			formtitlePrefix = 'Edit ';
		} else {
			return false;
		}		
		if (Ext.isArray(args.record)) args.record = args.record[0];
		var dForm = Ext.create(args.widget, {
			sender:args.sender, 
			state:state, action:args.action,
			store:args.store, record:args.record,
			headerId:args.headerId, refFields:{}, initData:{}, refCtrl:args.refCtrl,			
			listeners: { 
				beforerender: function(o) {
					me.loadDependData(o);
					var senderForm = o.sender.up('form'), btnSave = o.down('#'+me.button.save.id), btnCancel = o.down('#'+me.button.cancel.id);					
					if (o.title) o.setTitle('');
					if (btnSave) { /*btnSave.setDisabled(true);*/ btnSave.on('click', me.dataSave, me); }
					if (btnCancel) btnCancel.on('click', me.formDataClose, me);
					var fieldSkip = ['active', 'description'], senderForm = o.sender.up('form');
					o.combos = {};
					o.getForm().getFields().each(function(f){
						var fieldItemId = f.getName()||f.getItemId(), refField = senderForm ? senderForm.down('#'+fieldItemId) : null;
						if (refField && fieldSkip.indexOf(fieldItemId.toLowerCase())==-1) o.refFields[fieldItemId] = refField;
						if (f.isXType('combobox')) {
							o.combos[fieldItemId] = f;
							f.on({beforerender:me.comboboxBeforeRender, afterrender:me.comboboxAfterRender, focus:me.comboboxFocus, change:me.comboboxChange, /*select:me.comboboxSelect,*/ scope:me});	
						}
					});
					o.query('gridpanel').forEach(function(g){
						g.on({beforerender:me.gridPanelBeforeRender, afterrender:me.gridPanelAfterRender, selectionchange:me.gridPanelSelectionChange, itemdblclick:me.gridPanelItemDblClick, scope:me});
						if (o.state==me.actionName.create) g.getStore().removeAll();
					});					
				},
				boxready: function(o) {
					switch (o.state) {
						case me.actionName.create:
							if (Ext.isObject(o.down('#active'))) o.down('#active').setValue(1);
							Ext.Object.each(o.refFields, function(k, v) { o.initData[k] = v.getValue() || o.initData[k]; });
							if (Ext.isObject(o.headerId) && Ext.Object.getSize(o.headerId)==1) o.down('#'+Ext.Object.getKeys(o.headerId)[0]).setValue(Ext.Object.getValues(o.headerId)[0]); 
							break;
						case me.actionName.update:
							o.loadRecord(o.record);
							Ext.Object.each(o.combos, function(k, v) {
								var itemId = v.getName()||v.getItemId();
								o.initData[itemId] = o.record.get(itemId);
							});
							var idProperty = o.store.getProxy().getReader().idProperty, datasearch = {};
							datasearch[idProperty] = o.down('#'+idProperty).getValue();
							o.query('gridpanel').forEach(function(grid){
								if (!grid.masterEl) {
									var gridStore = grid.getStore(), idProperty = gridStore.getProxy().getReader().idProperty, params = {};
									params[me.paramName.searchData] = Ext.encode(datasearch);
									gridStore.load({params:Ext.Object.merge(params,{page:1,start:0,limit:(grid.down('pagingtoolbar')?25:0)})});
								}
							});
							break;
					}
					Ext.Object.each(o.combos, function(k, v) {			
						if (v.getStore().getProxy().type!='memory') {
							v.getStore().clearFilter();
							v.getStore().filterBy(function(item){ return item.get('active')==true || item.get(v.valueField)==o.initData[v.getName()||v.getItemId()]; });
							v.getStore().sort(v.displayField, 'ASC');
						}
						v.setValue(o.initData[v.getName()||v.getItemId()]);
					});
					Ext.Object.each(o.refFields, function(k, v) { o.down('#'+k).setReadOnly(v.readOnly); });
					if (o.sender.isXType('combobox')) o.down('#active').setReadOnly(true);		
					if (o.readOnly) me.setFormDataReadOnly(o);
				},
				/*
				dirtychange: function(o, dirty) {					
					o.owner.down('#'+me.button.save.id).setDisabled(!dirty);				
				},
				*/
				scope: this
			}
		});
		openWindowForm({
			id:'formdata-'+(args.id || me.selfName),
			title:args.formtitle || (formtitlePrefix+(dForm.title || me.formalName || 'Data')),
			iconCls:formicon,
			sender:args.sender,
			controller:me.selfName,
			content:dForm
		});
	},
		
	formDataClose: function(o) {	
		o.up('window').close();
	},
	
	formDataBeforeRender: Ext.emptyFn,	
	formDataAfterRender: Ext.emptyFn,
	formDataRemoved: Ext.emptyFn,

	setFormDataReadOnly: function(o) {
		var me = this;
		Ext.each(o.getForm().getFields().items, function(field) { field.setReadOnly(true); });
		Ext.each(o.query('button:not([itemId='+me.button.cancel.id+'])'), function(btn){ btn.setVisible(false); });
		Ext.each(o.query('toolbar[dock=top]'), function(t){ t.setVisible(false); });
		Ext.each(o.query('actioncolumn'), function(act){ act.setVisible(false); });
		o.down('#'+me.button.cancel.id).setText(me.button.close.caption);
		o.up('window').setTitle(o.up('window').title.replace(/Edit|New|Add|Detail/,'')+' Detail');		
		o.up('window').setIconCls('icon-form');
	},
	
	dataReload: function(o) {
		var panel = o.up('panel'), panelStore = panel.getStore();
		panelStore.reload();
	},
	
	dataSearch: function(o) {
		var me = this, store = me.getMainGrid().getStore();
		store.getProxy().setExtraParam(me.paramName.searchData, Ext.encode(me.getMainFormSearch().getValues()));
        store.loadPage(1);
	},
	
	dataReset: function(o) {
		var me = this;
        me.getMainFormSearch().getForm().reset();
        me.dataSearch();
	},
	
	dataSave: function(o) {	
		var me = this, formData = o.up('form');		
		if (formData.getForm().isValid()) {			
			var data = formData.getValues(), fieldName = [], details = {}, detailsremoved = {};
			formData.store.model.getFields().forEach(function(f){ fieldName.push(f.name); });
			formData.query('combobox').forEach(function(c) { var itemDisplay = c.displayField; if (fieldName.indexOf(itemDisplay)!=-1) data[itemDisplay] = c.getRawValue(); });
			formData.query('gridpanel').forEach(function(g) { 
				if (g.isVisible() && !g.isDisabled()) { 				
					var gstore = g.getStore(), keyId = g.getItemId().toLowerCase().replace('grid','');
					var detailsdata = gstore.getModifiedRecords(); if (detailsdata.length) { details[keyId] = Ext.pluck(detailsdata, 'data'); data['detailschanged'] = 1; }
					var removeddata = gstore.getRemovedRecords(); if (removeddata.length) { detailsremoved[keyId] = Ext.pluck(removeddata, 'data'); data['detailschanged'] = 1; }
				}
			});
			if (Ext.Object.getSize(details)) formData.store.extraParam[me.paramName.detailsData] = Ext.encode(details);
			if (Ext.Object.getSize(detailsremoved)) formData.store.extraParam[me.paramName.detailsremovedData] = Ext.encode(detailsremoved);			
			
			if (!Ext.isFunction(formData.store.processFn.callback)) {
				formData.store.processFn.callback = function() {
					var stor = this, sender = formData.sender.bindEl ? formData.sender.up('window').down('#'+formData.bindEl) : formData.sender;
					if (Ext.isObject(sender)) {
						Ext.Object.each(formData.refFields, function(k, v) {
							if (sender.getItemId()==v.getItemId()) {
								if (formData.state==me.actionName.create) {
									var newData = stor.getById(Math.max.apply(null, stor.data.keys));
									v.setValue(newData.get(v.getItemId()));
								}
							} else {
								v.setValue(formData.down('#'+k).getValue());
							}
						});
					}
				};
			}			
			if (formData.store.syncStore) {
				if (!Ext.isFunction(formData.store.processFn.successMsgBoxClose)) formData.store.processFn.successMsgBoxClose = function() { me.formDataClose(o); };
			} else {
				if (!Ext.isFunction(formData.store.processFn.postProcess)) formData.store.processFn.postProcess = function(){ me.formDataClose(o); };				
			}
			me.dataProcess({sender:o, state:formData.state, store:formData.store, record:formData.record, data:data});			
		}
	},
	
	dataProcess: function(args) {		
		if (!args || !args.sender || !args.state || !args.store) return false;		
		var me = this, recordLength = 0, processMsgLoading = 'Processing', processMsgSuccess = 'Success', processMsgFailure = 'Failure', deleteRecordInfo, senderParent = args.sender.up('panel');
		var syncStore = function(){
			if (!args.store.syncStore) return false;			
			
			args.store.on({
				beforesync: {
					fn: function(){
						if (Ext.isFunction(args.store.processFn.beforeSync)) if (args.store.processFn.beforeSync()===false) return false;
						Ext.Object.each(args.store.extraParam, function(k, v){ args.store.getProxy().setExtraParam(k, v); });
						senderParent.setLoading(processMsgLoading+', please wait ...');
					}, scope:this, single:true					
				}
			});
			
			args.store.sync({
				callback: function(){
					senderParent.setLoading(false);
					Ext.Object.each(args.store.extraParam, function(k, v){ delete args.store.getProxy().extraParams[k]; });
					if (Ext.isFunction(args.store.processFn.afterSync)) if (args.store.processFn.afterSync()===false) return false;
					args.store.processFn = {};
				},
				success: function(s){
					if (args.state==me.actionName.destroy){
						var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total,10);
						processMsgSuccess = (recordLength==1 ? deleteRecordInfo : (successcount!=recordLength?successcount+' of ':'')+deleteRecordInfo) + ' deleted successfully.';
					}
					if (Ext.isFunction(args.store.processFn.success)) args.store.processFn.success();
					var storeIdToFind = args.store.refStoreName || args.store.storeId;
					Ext.StoreManager.each(function(regstore){
						if (regstore.storeId==storeIdToFind || regstore.storeId==storeIdToFind+'Store' || regstore.storeId.indexOf('-'+storeIdToFind+'-')!=-1 || regstore.storeId.indexOf('~'+storeIdToFind+'~')!=-1) { 
							var cfg = {};								
							if (regstore.storeId==args.store.storeId) {	cfg = {callback:args.store.processFn.callback}; } 
							regstore.reload(cfg);
						} 
					});		
					Ext.Msg.show({ title:'Success', msg:processMsgSuccess, icon:Ext.Msg.INFO, buttons:Ext.Msg.OK, fn:args.store.processFn.successMsgBoxClose });	
				},
				failure: function(){
					args.store.rejectChanges();
					if (Ext.isFunction(args.store.processFn.failure)) args.store.processFn.failure();
					Ext.Msg.show({ title:'Failure', msg:processMsgFailure, icon:Ext.Msg.ERROR, buttons:Ext.Msg.OK, fn:args.store.processFn.failureMsgBoxClose });
				}
			});			
		};
		args.state = args.state.toUpperCase();		
		if (!Ext.isObject(args.store.processFn)) args.store.processFn = {};				
		if ((args.state==me.actionName.update || args.state==me.actionName.destroy)) {
			recordLength = args.record.length; if (!args.record || recordLength<1) { Ext.Msg.alert('Info', 'No record selected !'); return false; }			
		}
		if (Ext.isFunction(args.store.processFn.preProcess)) if (args.store.processFn.preProcess()===false) return false;
		if (args.state!=me.actionName.destroy) {
			if (!args.data) return false;
			switch (args.state) {
				case me.actionName.create:				
					processMsgLoading = 'Creating new data';
					processMsgSuccess = 'Data created successfully.';
					processMsgFailure = 'ERROR: Unable to create data.';
					args.store.add(args.data);
					break;
				case me.actionName.update:				
					processMsgLoading = 'Updating data';
					processMsgSuccess = 'Data updated successfully.';
					processMsgFailure = 'ERROR: Unable to update data.';
					args.record.set(args.data);
					break;
			}
			syncStore();
		} else if (args.state==me.actionName.destroy) {
			var confirmMsg;				
			processMsgLoading = 'Deleting data';
			if (recordLength==1) {					
				deleteRecordInfo = args.store.deleteRecordInfo || args.record[0].get(me.selfName.toLowerCase()+'_name') || 'data';					
				processMsgFailure = 'ERROR: Unable to delete '+deleteRecordInfo+'.';
				confirmMsg = 'Delete '+deleteRecordInfo+' ?';
			} else {					
				deleteRecordInfo = recordLength+' record'+(recordLength>1?'s':'');									
				processMsgFailure = 'ERROR: Unable to delete data.';
				confirmMsg = 'This action will delete '+deleteRecordInfo+'.<br />Continue ?';
			}
			processMsgFailure +='<br /><br />Data may have been used and cannot be deleted or data is already deleted.<br />Please refresh the data list or try to deactivate the data if no longer used.';
			args.store.confirmDestroy = args.store.confirmDestroy || true;
			if (args.store.confirmDestroy) {
				Ext.Msg.confirm('Delete Data', confirmMsg, function(btn){ 
					if (btn=='yes') {
						for(var i=0;i<recordLength;i++){ args.store.remove(args.record[i]); }
						syncStore();
					}
				});
			} else {
				for(var i=0;i<recordLength;i++){ args.store.remove(args.record[i]); }
				syncStore();
			}
		}
		if (Ext.isFunction(args.store.processFn.postProcess)) args.store.processFn.postProcess();
		if (!args.store.syncStore) args.store.processFn = {};
	}
});