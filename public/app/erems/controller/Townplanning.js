Ext.define('Erems.controller.Townplanning', {
	extend      : 'Erems.library.template.controller.Controller2',
	alias       : 'controller.Townplanning',
	requires    : ['Erems.library.DetailtoolAll',,'Erems.library.Browse', 'Erems.library.box.Config', 'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields', 'Erems.library.box.tools.EventSelector'],
	views       : ['townplanning.Panel', 'townplanning.Grid', 'townplanning.FormSearch', 'townplanning.FormData', 'townplanning.browseunit.SUnitPanel', 'townplanning.browseunit.SUnitGrid', 'townplanning.browseunit.SUnitFormSearch', 'townplanning.FormDataFloor'],
	detailTool3 : null,
	refs        : [
		{
			ref      : 'grid',
			selector : 'townplanninggrid'
		},
		{
			ref      : 'formsearch',
			selector : 'townplanningformsearch'
		},
		{
			ref      : 'formdata',
			selector : 'townplanningformdata'
		},
		{
			ref      : 'panel',
			selector : 'townplanningpanel'
		},
		{
			ref      : 'gridhistory',
			selector : 'townplanninggridunithistory'
		},
		{
			ref      : 'formdatadetail',
			selector : 'townplanningformdatadetail'
		},
		//add by dika 20230110
		{
			ref      : 'formdatafloor',
			selector : 'townplanningformdatafloor'
		},
	],
	controllerName : 'townplanning',
	fieldName      : 'unit_number',
	bindPrefixName : 'Townplanning',
	localStore     : {
		detail : null,
		unit   : null,
	},
	cbf                   : null,
	mt                    : null,
	tools                 : null,
	myConfig              : null,
	formWidth             : 800,
	prodCatCodeKav        : null,
	mandatoryCodeTanah    : 0,
	TownPlanningWithoutPT : 0,
	constructor           : function (configs) {
		this.callParent(arguments);
		var me = this;
		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});

		me.cbf = new Erems.template.ComboBoxFields();
		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
	},
	init: function (application) {
		var me = this;

		if (typeof Mustache === "undefined") {
			Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/mustache.min.js', function () {

				if (typeof ApliJs === "undefined") {
					Ext.Loader.injectScriptElement(document.URL + 'app/erems/js/ApliJs.js?_dc=' + Ext.Date.now(), function () {

						console.log("[INFO] ApliJs loaded.");

					}, function () {
						// error load file
					});
				}


			}, function () {
				//  me.tools.alert.warning("Error load Prolibs.js file.");
			});

		}

		var events = new Erems.library.box.tools.EventSelector();

		this.control({
			'townplanningpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: me.panelAfterRender

			},
			'townplanninggrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange,
				// listeners: {
				// 	load: function () {
				// 		me.jqueryBinding();
				// 	}
				// }
			},
			'townplanninggrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'townplanninggrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'townplanninggrid toolbar button[action=view]': {
				click: function () {
					me.formDataShow('view');
				}
			},
			'townplanninggrid toolbar button[action=destroy]': {
				click: function () {
					this.dataDestroy();
				}
			},
			'townplanninggrid toolbar button[action=upload_townplanning]': {
				click: this.upload_townplanning
			},
			'townplanninggrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'townplanninggrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'townplanningformsearch': {
				afterrender: me.formSearchAfterRender
			},
			'townplanningformsearch button[action=search]': {
				click: this.dataSearch
			},
			'townplanningformsearch button[action=reset]': {
				click: this.dataReset
			},
			'townplanningformdata': {
				afterrender: this.formDataAfterRender
			},
			'townplanningformdata button[action=save]': {
				click: function () {
					me.mainDataSave();
				}
			},
			'townplanningformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'townplanningformdata #fd_number_check': {
				change: me.formDataCheckBoxNumberChange
			},
			'townplanningformdata #fd_cb_type': {
				// change: me.formDataTypeComboBoxChange
				select: me.formDataTypeComboBoxChange
			},
			'townplanningformdata #fd_number_start': {
				change: me.formDataNumberStartChange
			},
			'townplanningformdata #fd_purpose_id': {
				change: function (el) {
					var form = me.getFormdata();
					var rawValue = el.getRawValue();
					var land_size = form.down('[name=land_size]');
					var building = form.down('#fd_building_size');
					var floor = form.down('#fd_floor_size');

					if (rawValue === 'APARTEMEN' || rawValue === 'APARTMENT' || rawValue.includes('OFFICE') || rawValue.includes('SOHO')) {
						building.setFieldLabel('SGA Size');
						floor.setFieldLabel('Netto Size');
						land_size.setReadOnly(true);
						land_size.setValue(0);
					} else {
						building.setFieldLabel('Building Size');
						floor.setFieldLabel('Floor Size');
						land_size.setReadOnly(false);
					}
				}
			},
			'townplanningformdata button[action=add_cluster]': {
				click: function () {
					me.addCluster();
				}
			},
			'townplanningformdata button[action=add_category]': {
				click: function () {
					me.addCategory();
				}
			},
			'townplanningformdata button[action=add_type]': {
				click: function () {
					me.addType();
				}
			},
			'townplanningformdata button[action=add_block]': {
				click: function () {
					me.addBlock();
				}
			},
			'townplanningformdata button[action=add_position]': {
				click: function () {
					me.addPosition();
				}
			},
			'townplanningformdata button[action=add_side]': {
				click: function () {
					me.addSide();
				}
			},
			'townplanningformdata button[action=add_purpose]': {
				click: function () {
					me.addPurpose();
				}
			},
			//  
			'sunitpanel': {
				beforerender: me.sunitpanelBeforeRender
			},
			'sunitgridpl button[action=select]': {
				click: me.selectunitgridSelection
			},
			'sunitgridpl': {
				afterrender: me.selectunitgridAfterRender
			},
			/* BROWSE CONTROL */
			'townplanningbrowsepanel': {
				beforerender: me.browsepanelBeforeRender
			},
			'townplanningbrowsepanel button[action=select]': {
				click: me.browsegridSelection
			},
			'townplanningbrowsegrid': {
				afterrender: me.browsegridAfterRender
			},
			'townplanningbrowseformsearch button[action=search]': {
				click: me.browseSearch
			},
			/* END BROWSE CONTROL */
			'townplanningformdata [name=cluster_cluster_id]': {
				select: function (el, val) {
					me.seFi.cb('cluster_code', el, 'code', val);
					me.filterBlockData();
					me.updateTypeInfo();
					me.toplanClusterOnSelect();
				},
			},
			'townplanningformdata [name=cluster_code]': {
				blur: function (el, e) {
					me.textFieldCodeOnKeyUpBase({form: me.getFormdata(), codeTextField: 'cluster_code', idTextField: 'cluster_cluster_id', codeField: 'code'});
				},
			},
			'townplanningformdata [name=productcategory_productcategory_id]': {
				/*
				 select: function (el, val) {
				 me.seFi.cb('productcategory_code', el, 'code', val);
				 me.updateTypeCb();
				 }
				 */
			},
			'townplanningformdata [name=productcategory_code]': {
				/*
				 blur: function (el, e) {
				 me.textFieldCodeOnKeyUpBase({form: me.getFormdata(), codeTextField: 'productcategory_code', idTextField: 'productcategory_productcategory_id', codeField: 'code'});
				 },
				 */
			},
			'townplanningformdata [name=type_type_id]': {
				select: function (el, val) {
					me.seFi.cb('type_code', el, 'code', val);
					me.updateTypeInfo();
				}
			},
			'townplanningformdata [name=type_code]': {
				blur: function (el, e) {
					me.textFieldCodeOnKeyUpBase({form: me.getFormdata(), codeTextField: 'type_code', idTextField: 'type_type_id', codeField: 'code'});
					me.updateTypeInfo();
				},
			},
			'townplanningformdata [name=block_block_id]': {
				select: function (el, val) {
					me.seFi.cb('block_code', el, 'code', val);
				}
			},
			'townplanningformdata [name=block_code]': {
				blur: function (el, e) {
					me.textFieldCodeOnKeyUpBase({form: me.getFormdata(), codeTextField: 'block_code', idTextField: 'block_block_id', codeField: 'code'});
				},
			},
			'townplanningformdata [name=position_position_id]': {
				select: function (el, val) {
					me.seFi.cb('position_code', el, 'code', val);
				}
			},
			'townplanningformdata [name=position_code]': {
				blur: function (el, e) {
					me.textFieldCodeOnKeyUpBase({form: me.getFormdata(), codeTextField: 'position_code', idTextField: 'position_position_id', codeField: 'code'});
				},
			},
			'townplanningformdata [name=side_side_id]': {
				select: function (el, val) {
					me.seFi.cb('side_code', el, 'code', val);
				}
			},
			'townplanningformdata [name=side_code]': {
				blur: function (el, e) {
					me.textFieldCodeOnKeyUpBase({form: me.getFormdata(), codeTextField: 'side_code', idTextField: 'side_side_id', codeField: 'code'});
				},
			},
			'townplanningformdata [name=purpose_purpose_id]': {
				select: function (el, val) {
					me.seFi.cb('purpose_code', el, 'code', val);
				}
			},
			'townplanningformdata [name=purpose_code]': {
				blur: function (el, e) {
					me.textFieldCodeOnKeyUpBase({form: me.getFormdata(), codeTextField: 'purpose_code', idTextField: 'purpose_purpose_id', codeField: 'code'});
				},
			},
			'townplanningformdata [name=is_fasum]': {
				change: function (el, val) {
					// me.seFi.cb('type_code', el, 'code', val);
					// me.updateTypeInfo();
					me.checkIsFasum(el, val);
				}
			},
			'townplanninggrid combobox[name=sort_by]': {
				select: function () {
					me.refreshGridData();
				}
			},
			'townplanninggrid combobox[name=sort_type]': {
				select: function () {
					me.refreshGridData();
				}
			},
			'townplanningformsearch [name=unit_number]': {
				keypress: function (e, el) {
					var me = this;
					if (el.getCharCode() === 13) {
						me.dataSearch();
					}
				}
			},
			'townplanningformsearch [name=virtualaccount_bca]': {
				keypress: function (e, el) {
					var me = this;
					if (el.getCharCode() === 13) {
						me.dataSearch();
					}
				}
			},
			'townplanningformsearch [name=virtualaccount_mandiri]': {
				keypress: function (e, el) {
					var me = this;
					if (el.getCharCode() === 13) {
						me.dataSearch();
					}
				}
			},
			'townplanninggridunithistory': {
				selectionchange: this.gridDetailSelectionChange
			},
			'townplanninggridunithistory toolbar button[action=view]': {
				click: function () {
					this.formDataDetailShow('view');
				}
			},
			'townplanningformdatadetail': {
//				beforerender: this.formDataBeforeRender,
				afterrender: this.formDataDetailAfterRender
			},
			//add by dika 20230110
			'townplanninggrid toolbar button[action=update_floor]': {
				click: function () {
					var me = this;
					me.detailTool3 = new Erems.library.DetailtoolAll();
					me.detailTool3.setConfig({
						viewPanel        : 'FormDataFloor',
						parentFDWindowId : me.getGrid().up('window').id,
						controllerName   : me.controllerName
					});
					me.detailTool3.form().show('create', 350, 'Update Floor');
				}
			},
			'townplanningformdatafloor': {
				afterrender: this.formDataUpdateFloorafterRender
			},
			'townplanningformdatafloor button[action=save]': {
				click: me.detailFormDataUpdateFloor.save
			}
			//end add
		});
	},

	refreshGridData: function () {
		var me = this;

		me.getGrid().getStore().getProxy().setExtraParam("sort_by", me.getGrid().down("[name=sort_by]").getValue());
		me.getGrid().getStore().getProxy().setExtraParam("sort_type", me.getGrid().down("[name=sort_type]").getValue());
		me.getGrid().getStore().loadPage(1);
	},

	// mainPanelBeforeRender: function (el) {
	// 	var me = this;
	// 	console.log('aaa');

	// 	me.detailTool3 = new Erems.library.DetailtoolAll();
	// 	me.detailTool3.setConfig({
	// 		viewPanel        : 'FormDataFloor',
	// 		parentFDWindowId : me.getGrid().up('window').id,
	// 		controllerName   : me.controllerName
	// 	});

	// 	console.log('bbb');

	// 	// Ext.Ajax.request({
	// 	// 	url     : 'erems/admincollection/read',
	// 	// 	params  : { read_type_mode : 'configuration' },
	// 	// 	success : function (response) {
	// 	// 		var res = Ext.JSON.decode(response.responseText);

	// 	// 		me.subholding_config = res['subholding_config'];
	// 	// 		me.button_openva     = res['button'];
	// 	// 		me.checklist_openva  = res['checklist'];
	// 	// 		me.denda_permil      = res['denda_permil'];
	// 	// 		me.batas_toleransi   = res['batas_toleransi'];

	// 	// 		var grid = me.getGrid()
	// 	// 		grid.down('#btnOpen').setVisible(me.button_openva);
	// 	// 	}
	// 	// });
	// },

	gridSelectionChange: function() {
        var me = this;
        var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
        var edit = grid.down('#btnEdit');
        var deleteb = grid.down('#btnDelete');
        var view = grid.down('#btnView');
        var floor = grid.down('#btnFloor');
        if (edit !== null) {
            edit.setDisabled(row.length != 1);
        }
        if (deleteb !== null) {
            deleteb.setDisabled(row.length < 1);
        }
        if (view !== null) {
            view.setDisabled(row.length != 1);
        }
        if (floor !== null) {
            floor.setDisabled(row.length != 1);
        }
    },

	toplanClusterOnSelect: function () {
		var me = this;
		var f = me.getFormdata();
		var typeCombo = f.down("[name=type_type_id]");
		var clusterId = me.tools.intval(f.down("[name=cluster_cluster_id]").getValue());
		clusterId = clusterId > 0 ? clusterId : -1;
		typeCombo.getStore().clearFilter(true); // ms.clearFilter(); -> kalau tidak berefek.
		typeCombo.setValue("");
		f.down("[name=type_code]").setValue("");

		f.down("[name=productcategory_productcategory_id]").setValue("");
		f.down("[name=productcategory_code]").setValue("");


		/*
		 typeCombo.getStore().filterBy(function (rec, id) {
		 
		 if (rec.raw.cluster_id === clusterId) {
		 return true;
		 } else {
		 return false;
		 }
		 });
		 */
	},
	textFieldCodeOnKeyUpBase: function (params) {
		var me = this;
		var f = !params.form ? me.getFormdata() : params.form;
		var val = f.down("[name=" + params.codeTextField + "]").getValue();
		var combo = f.down("[name=" + params.idTextField + "]");

		combo.getStore().clearFilter(true);
		combo.getStore().filterBy(function (rec, id) {
			if(val == ''){
				return true;
			}
			else if (rec.raw[params.codeField].toLowerCase().includes(val.toLowerCase())) {
				return true;
			}
			else {
				return false;
			}
		});

		if (combo.getStore().getCount() > 0) {
			me.tools.comboHelper(combo).setFirstValue();
		}

	},
	filterBlockData: function () {
		var me = this;
		var f = me.getFormdata();
		var b = f.down("[name=block_block_id]");
		var c = f.down("[name=cluster_cluster_id]");
		var bs = b.getStore();
		b.setValue("");
		bs.clearFilter(true);
		bs.filter("cluster_cluster_id", c.getValue());
	},
	updateTypeInfo: function () {
		var me = this;
		var f = me.getFormdata();
		var t = f.down("[name=type_type_id]");
		var i = t.getStore().findExact('type_id', t.getValue());
		if (i > -1) {

		}

		var rec = t.getStore().getAt(i);
		if (rec) {
			for (var x in rec.data) {
				var el = f.down("[name=" + x + "]");
				if (el && x != 'kelebihan') {
					el.setValue(rec.data[x]);
				}
			}
			f.down("[name=type_code]").setValue(rec.get("code"));

			var prodCatId = me.tools.intval(rec.get("productcategory_id"));
			f.down("[name=productcategory_productcategory_id]").setValue(prodCatId);
			var prodCatCode = me.tools.comboHelper(f.down("[name=productcategory_productcategory_id]")).getText({
				d: 'code', v: 'productcategory_id'
			});
			f.down("[name=productcategory_code]").setValue(prodCatCode);
			me.setDisabledFieldProdCategory(prodCatCode);

			f.down('[name=purpose_code]').setValue("");
			f.down('[name=purpose_purpose_id]').setValue(0);
			me.checkPurpose();


		} else {
			// console.log("[TYPE] tidak ada record");
		}
	},
	checkPurpose:function(){
		var me = this;
		var f = me.getFormdata();
		var storepurpose = f.down('[name=purpose_purpose_id]').getStore();
		var prodCat = f.down("[name=productcategory_productcategory_id]").getRawValue();

		if (prodCat == "KAVLING") {
			storepurpose.clearFilter(true);
			storepurpose.filter({
				property: 'purpose',
				value: 'KAVLING',
				exactMatch: false,
				caseSensitive: false
			});
		} else if (prodCat == "BANGUNAN") {
			storepurpose.clearFilter(true);
			storepurpose.each(function (record) {
				record.data.kavling = "no";
				if ((record.data.purpose).toUpperCase().includes("KAVLING")) {
					record.data.kavling = "yes";
				}
			});
			storepurpose.filter({
				property: 'kavling',
				value: "no",
				exactMatch: true,
				caseSensitive: true
			});
		}
	},
	setDisabledFieldProdCategory: function (prodCatCode) {
		var me = this;
		var f = me.getFormdata();
		if (prodCatCode == me.prodCatCodeKav) {
			f.down("[name=building_size]").setValue(0);
			f.down("[name=building_size]").setReadOnly(true);
			f.down("[name=floor]").setReadOnly(true);
			f.down("[name=floor_size]").setReadOnly(true);
			f.down("[name=bedroom]").setReadOnly(true);
			f.down("[name=bathroom]").setReadOnly(true);
			//				f.down("[name=width]").disable();
			//				f.down("[name=long]").disable();
			//				f.down("[name=kelebihan]").disable();
			f.down("[name=electricity]").setReadOnly(true);
		} else {
			f.down("[name=building_size]").setReadOnly(false);
			f.down("[name=floor]").setReadOnly(false);
			f.down("[name=floor_size]").setReadOnly(false);
			f.down("[name=bedroom]").setReadOnly(false);
			f.down("[name=bathroom]").setReadOnly(false);
			//				f.down("[name=width]").enable();
			//				f.down("[name=long]").enable();
			f.down("[name=kelebihan]").setReadOnly(false);
			f.down("[name=electricity]").setReadOnly(false);
		}
	},
	updatePositionCb: function () {
		var me = this;
		var f = me.getFormdata();
		var c = me.tools.intval(f.down("[name=cluster_cluster_id]").getValue());
		var s = f.down("[name=position_position_id]").getStore();
		if (c > 0) {
			s.filterBy(function (rec, id) {

				if (rec.get("cluster_id") === c) {
					return true;
				} else {
					return false;
				}
			});
		}

		/// set default value
		if (s.getCount() > 0) {
			f.down("[name=position_position_id]").setValue(s.getAt(0).get("position_id"));
		} else {
			f.down("[name=position_position_id]").setValue("");
		}
	},
	updateBlockCb: function () {
		var me = this;
		var f = me.getFormdata();
		var c = me.tools.intval(f.down("[name=cluster_cluster_id]").getValue());
		var s = f.down("[name=block_block_id]").getStore();
		if (c > 0) {
			s.filterBy(function (rec, id) {

				if (rec.get("cluster_id") === c) {
					return true;
				} else {
					return false;
				}
			});
		}

		/// set default value
		if (s.getCount() > 0) {
			f.down("[name=block_block_id]").setValue(s.getAt(0).get("block_id"));
		} else {
			f.down("[name=block_block_id]").setValue("");
		}
	},
	updateTypeCb: function () {
		var me = this;
		var f = me.getFormdata();
		var c = me.tools.intval(f.down("[name=cluster_cluster_id]").getValue());
		var pc = me.tools.intval(f.down("[name=productcategory_productcategory_id]").getValue());
		var s = f.down("[name=type_type_id]").getStore();

		if (pc > 0 && c > 0) {
			s.filterBy(function (rec, id) {

				if (rec.get("cluster_id") === c && rec.get("productcategory_id") === pc) {
					return true;
				} else {
					return false;
				}
			});
		} else if (pc > 0) {
			s.filterBy(function (rec, id) {

				if (rec.get("productcategory_id") === pc) {
					return true;
				} else {
					return false;
				}
			});
		} else if (c > 0) {
			s.filterBy(function (rec, id) {

				if (rec.get("cluster_id") === c) {
					return true;
				} else {
					return false;
				}
			});
		}

		/// set default value
		if (s.getCount() > 0) {
			f.down("[name=type_type_id]").setValue(s.getAt(0).get("type_id"));

			me.updateTypeInfo();
		} else {
			f.down("[name=type_type_id]").setValue("");
		}
	},
	panelAfterRender: function (configs) {
		this.callParent(arguments);
		var me = this;

		ApliJs.applicationName = "erems";

		var p = me.getPanel();

		// p.setLoading("Please wait");
		me.getFormsearch().down("[action=search]").setDisabled(true);
		me.getFormsearch().down("[action=reset]").setDisabled(true);
		me.tools.ajax({
			params: {},
			success: function (data, model) {
				me.TownPlanningWithoutPT = data.others[0][0].TownPlanningWithoutPT;

				me.fillFormSearchComponents(data, me.getFormsearch());
				me.getFormsearch().down("[action=search]").setDisabled(false);
				me.getFormsearch().down("[action=reset]").setDisabled(false);
				//  p.setLoading(false);
			}
		}).read('detail');
	},
	fillFormSearchComponents: function (data, f) {
		var me = this;
		me.tools.wesea(data.unitstatus, f.down("[name=unitstatus_unitstatus_id]")).comboBox(true);
		me.tools.wesea(data.cluster, f.down("[name=cluster_cluster_id]")).comboBox(true);
		me.tools.wesea(data.block, f.down("[name=block_block_id]")).comboBox(true);
	},
	formDataCheckBoxNumberChange: function (el, val) {
		//#fd_cb_type
		var me = this;
		var f = me.getFormdata();
		var ne = f.down("[name=number_end]");
		var ng = f.down("[name=mode_number_generator]");
		ne.setReadOnly(!val);
		ng.setReadOnly(!val);
		if (!val) {
			ne.setValue("");
			ng.setValue(0);
		}
	},
	addCategory: function () {
		this.tools.iNeedYou(this).showWindow('Masterproductcategory', {title: 'Create New Product Category'});
	},
	addCluster: function () {
		var me = this;
		this.tools.iNeedYou(this).showWindow('Mastercluster', {title: 'Create New Cluster'});
	},
	addType: function () {
		this.tools.iNeedYou(this).showWindow('Mastertype', {title: 'Create New Type'});
	},
	addBlock: function () {
		this.tools.iNeedYou(this).showWindow('Masterblock', {title: 'Create New Block'});
	},
	addPosition: function () {
		this.tools.iNeedYou(this).showWindow('Masterposisi', {title: 'Create New Position'});
	},
	addSide: function () {
		this.tools.iNeedYou(this).showWindow('Masterside', {title: 'Create New Side'});
	},
	addPurpose: function () {
		this.tools.iNeedYou(this).showWindow('Masterpurpose', {title: 'Create New Purpose'});
	},
	afterAddNewFromOutside: function (controllerId) {
		var me = this;
		var f = me.getFormdata();
		var win = Ext.getCmp(_myAppGlobal.getController(controllerId).formxWinId);
		if (win) {
			win.close();
		}
		f.setLoading("Refreshing...");
		me.tools.ajax({
			params: {},
			success: function (data, model) {


				me.fillFormComponents(data, f);
				f.setLoading(false);
			}
		}).read('detail');
	},
	mainDataSave: function (mode) {
		var me = this;
		var m = typeof mode !== "undefined" ? mode : "";
		var f = me.getFormdata();
		var vs = f.getValues();
		var unitId = me.tools.intval(vs.unit_id);

		if (unitId > 0) { // untuk mode update saja
			var msgValidasi = "";
			var valid = false;
			if (vs.unithistory_description.length == 0) {
				msgValidasi = "Catatan perubahan harus diisi.";
				// f.down("[name=unithistory_description]").f.focus();
			} else if (vs.unithistory_instruksi_order.length == 0) {
				msgValidasi = "Instruksi order catatan perubahan harus diisi.";
				//  f.down("[name=unithistory_instruksi_order]").fieldEl.dom.focus();
			} else if (vs.building_size > 0 && vs.productcategory_code == me.prodCatCodeKav) {
				msgValidasi = "Building size harus nol.";
				//  f.down("[name=unithistory_instruksi_order]").fieldEl.dom.focus();
			} else {
				valid = true;
			}
			if (!valid) {
				me.tools.alert.warning(msgValidasi);
				return;
			}
		}

		if (me.mandatoryCodeTanah == 1 && !f.down('[name=tanahcode_pt_id]').getValue()) {
			me.tools.alert.warning('Silahkan pilih kode tanah.');
			return;
		} else {
			me.insSave({
				form: me.getFormdata(),
				grid: me.getGrid(),
				// store     : me.localStore.detail,
				finalData: function (data) {
					var f = me.getFormdata();
					data["gambar_rumah"] = $("#tpFormID input[name=gambar_rumah]").val();
					data["lebar_jalan"] = $("#tpFormID input[name=lebar_jalan]").val();
					data["is_readystock"] = $("#tpFormID input[name=is_readystock]").prop('checked') ? 1 : 0;
					data["gambar"] = $("#tpFormID2 input[name=gambar]").val();
					data["notes_siapstock"] = $("#tpFormID #notes_siapstock").val();
					data["orientasi_akses_unit_id"] = $("#tpFormID select[name='orientasi_akses_unit_id']").val();
					// console.log($("#tpFormID input[name=is_ready]").prop('checked'));
					return data;
				},
				sync: true,
				callback: {
					create: function (store, form, grid) {

					}
				}
			});
		}
	},
	getFormProperties: function (action) {
		var me = this;
		var p = {
			state: 'view',
			formtitle: 'View',
			formicon: 'icon-form-add'
		};
		if (typeof action !== 'undefined') {
			p.state = action.replace(me.bindPrefixName, "").toLowerCase();

			var grid = me.getGrid();
			var actionColItems = grid.down('actioncolumn').items;
			var founded = false;
			for (var i in actionColItems) {
				if (actionColItems[i].bindAction === action) {
					p.formtitle = actionColItems[i].text;
					p.formicon = actionColItems[i].iconCls;
					founded = true;
				}

			}
			if (!founded) {
				p.formtitle = p.state;
			}
		}
		return p;
	},
	formDataShow: function (el, act, action) {
		var me = this;
		var formtitle, formicon;

		//  var state = action == me.bindPrefixName + 'Create' ? 'create' : 'update';
		var gfp = me.getFormProperties(action);
		var state = gfp.state;
		formtitle = gfp.formtitle;
		formicon = gfp.formicon;
		/*switch (state) {
		 case 'create':
		 formtitle = 'Add New';
		 formicon = 'icon-form-add';
		 break;
		 case 'update':
		 formtitle = 'Edit';
		 formicon = 'icon-form-edit';
		 break;
		 }*/

		var winId = 'win-holidayformdata';
		var win = desktop.getWindow(winId);
		if (!win) {
			win = desktop.createWindow({
				id: winId,
				title: formtitle,
				iconCls: formicon,
				resizable: false,
				minimizable: false,
				maximizable: false,
				width: me.formWidth,
				// height:Ext.getBody().getViewSize().height * 0.9,
				//height:200,
				renderTo: Ext.getBody(),
				constrain: true,
				constrainHeader: false,
				modal: true,
				layout: 'fit',
				shadow: 'frame',
				shadowOffset: 10,
				border: false,
				//items: Ext.create('Erems.view.' + me.controllerName + '.FormData'),
				state: state,
				listeners: {
					boxready: function () {
						// win.setHeight(200);

						win.body.mask('Loading...');
						var tm = setTimeout(function () {
							win.add(Ext.create('Erems.view.' + me.controllerName + '.FormData'));
							win.center();
							win.body.unmask();
							clearTimeout(tm);
						}, 1000);

					}
				}

			});
		}
		win.show();

	},
	fdar: function () {
		var me = this;
		var f = me.getFormdata();
		var x = {
			init: function () {
				me.setActiveForm(me.getFormdata());
				me.showSH1fields(me.getFormdata());

				// var myPaneltimeout = setTimeout(function(){
				// 	me.getFormdata().down("#TPOtherInformationID").toggleCollapse(true);
				// 	me.getFormdata().down("#TPUploadimageID").toggleCollapse(true);

				// 	clearTimeout(myPaneltimeout);
				// }, 3000);
			},
			create: function () {

				f.setLoading("Please wait.. loading components");
				me.tools.ajax({
					params: {
						// purchaseletter_id: plId
					},
					success: function (data, model) {
						var currentPt = me.tools.intval(data.others[0][0]["CURRENTPTID"]);
						me.fillFormComponents(data, f);
						/// isi form jika ada unit yang sedang dipilih
						var rec = me.getGrid().getSelectedRecord();
						if (rec) {
							f.loadRecord(rec);
							currentPt = rec.get('pt_pt_id'); /// add erwin.st 030323
						}
						f.down("[name=unit_id]").setValue(0);
						if (currentPt > 0) {
							f.down("[name=pt_pt_id]").setValue(currentPt);
						}
						f.setLoading(false);

						var orientasiList = "<option value='0'> - </option>";
						var orientasi    = data["others"][0][0]["ORIENTASI"][1];
						for (var i in orientasi) {
							orientasiList += "<option value='" + orientasi[i]["orientasi_akses_unit_id"] + "'>" + orientasi[i]["orientasi_akses_unit"] + "</option>";
						}

						var viewParams = {
							orientasi_akses_unit_id: 0,
							lebar_jalan: 0,
							gambar_rumah: "",
							is_readychecked: "checked",
							notes_siapstock: "",
							orientasi_list    : orientasiList
						};
						ApliJs.loadHtmlB(me, me.getFormdata().down("#TPOtherInformationID"), 'sby_form_other', viewParams);
						// me.getFormdata().down("#TPOtherInformationID").toggleCollapse(true);

						var viewParams1 = {
							gambar: "",
						};
						ApliJs.loadHtmlB(me, me.getFormdata().down("#TPUploadimageID"), 'upload_image', viewParams1);
						// me.getFormdata().down("#TPUploadimageID").toggleCollapse(true);

						me.filterBlockData();
					}
				}).read('detail');
				f.down("[action=save]").show();
				me.showSH1fields(f);

				if(me.TownPlanningWithoutPT == 1){
					f.down("[name=pt_pt_id]").setValue(0); // added by rico 08032023
					f.down("[name=tanahcode_pt_id]").setValue(0); // added by rico 08032023
				}

				f.down("[name=pt_id_body]").setVisible(!me.TownPlanningWithoutPT); // added by rico 08032023
				f.down("[name=tanahcode]").setVisible(!me.TownPlanningWithoutPT); // added by rico 08032023
			},
			update: function (state = 'update') {
				var rec = me.getGrid().getSelectedRecord();
				var plId = rec.get("spk_id");
				f.editedRow = me.getGrid().getSelectedRow();
				f.setLoading("Loading...");
				f.down("[name=number_check]").setDisabled(true);
				f.down("[name=is_fasum]").setDisabled(true);
				me.tools.ajax({
					params: {},
					success: function (data, model) {

						if (rec.get("unitstatus_status") === "PLANNING") {
							if (state == 'update') {
								f.down("[action=save]").show();
							}
						} else {
							var vs = f.getForm().getValues();
							for (var i in vs) {
								var el = f.down("[name=" + i + "]");
								if (el) {
									el.setReadOnly(true);
								}
							}
						}

						me.fillFormComponents(data, f);
						f.loadRecord(rec);
						f.down("[name=progress_text]").setValue(rec.get("progress"));
						f.down("[name=tanahcode_pt_id]").setValue(rec.get("tanahcode_pt_id"));
						f.setLoading(false);
						f.down("#catatanPerubahanPanelId").show();
						f.down("[name=unithistory_person_in_charge]").setValue(data.others[0][0]["USER_FULLNAME"]);
						var guh = me.getGridhistory();
						guh.doInit();
						guh.getStore().getProxy().setExtraParam('mode_read', 'history');
						guh.getStore().getProxy().setExtraParam('unit_id', me.getGrid().getSelectedRecord().get("unit_id"));
						guh.getStore().loadPage(1, {
							callback: function (rec, operation, success) {
								if (!guh.getStore().modelExist) {

									guh.attachModel(operation);
								}

								var pg = guh.down("pagingtoolbar");
								if (pg) {
									pg.getStore().load();
								}

								if (guh.getStore().getCount() > 0) {
									var topRec = guh.getStore().getAt(0);
									// f.down("[name=unithistory_person_in_charge]").setValue(topRec.get("person_in_charge"));
									//   f.down("[name=unithistory_description]").setValue(topRec.get("description"));
									//   f.down("[name=unithistory_instruksi_order]").setValue(topRec.get("instruksi_order"));
								}
							}
						});

						var orientasiList = "<option value='0'> - </option>";
						var orientasi    = data["others"][0][0]["ORIENTASI"][1];
						for (var i in orientasi) {
							orientasiList += "<option value='" + orientasi[i]["orientasi_akses_unit_id"] + "'>" + orientasi[i]["orientasi_akses_unit"] + "</option>";
						}

						var viewParams = {
							orientasi_akses_unit_id: rec.get("orientasi_akses_unit_id"),
							lebar_jalan: rec.get("lebar_jalan"),
							gambar_rumah: rec.get("gambar_rumah"),
							is_readychecked: rec.get("is_readystock") > 0 ? "checked" : "",
							notes_siapstock: rec.get("notes_siapstock"),
							orientasi_list    : orientasiList,
							action           : 'update'
						};
						ApliJs.loadHtmlB(me, me.getFormdata().down("#TPOtherInformationID"), 'sby_form_other', viewParams);
						// me.getFormdata().down("#TPOtherInformationID").toggleCollapse(true);

						var viewParams1 = {
							gambar: rec.get("gambar")
						};
						ApliJs.loadHtmlB(me, me.getFormdata().down("#TPUploadimageID"), 'upload_image', viewParams1);
						me.checkPurpose();

						// me.getFormdata().down("#TPUploadimageID").toggleCollapse(true);

						me.filterBlockData();
						f.down("[name=block_block_id]").setValue(me.getGrid().getSelectedRecord().get('block_block_id'));
					}
				}).read('detail');
				//				me.showSH1fields(f);
				me.setDisabledFieldProdCategory(rec.get("productcategory_code"));

				// if(me.TownPlanningWithoutPT == 1){
				// 	f.down("[name=pt_pt_id]").setValue(0); // added by rico 08032023
				// 	f.down("[name=tanahcode_pt_id]").setValue(0); // added by rico 08032023
				// }

				f.down("[name=pt_id_body]").setVisible(!me.TownPlanningWithoutPT); // added by rico 08032023
				f.down("[name=tanahcode]").setVisible(!me.TownPlanningWithoutPT); // added by rico 08032023

				f.down('[name=type_type_id]').setReadOnly(rec.get("is_orderbangun"));
				f.down('[name=type_code]').setReadOnly(rec.get("is_orderbangun"));
			},
			view: function () {
				me.fdar().update('view');
				me.getFormdata().getForm().getFields().each(function (field) {
					field.setReadOnly(true);
				});
				Ext.Array.each(me.getFormdata().query("[xtype=button]"), function (field) {
					field.setVisible(false);
				});
				me.getFormdata().down('#btnCancel').show();
			}
		};
		return x;
	},
	fillFormComponents: function (data, form) {
		var me = this;
		me.tools.wesea(data.cluster, form.down("[name=cluster_cluster_id]")).comboBox();
		me.tools.wesea(data.productcategory, form.down("[name=productcategory_productcategory_id]")).comboBox();
		me.tools.wesea(data.type, form.down("[name=type_type_id]")).comboBox();
		me.tools.wesea(data.block, form.down("[name=block_block_id]")).comboBox();
		me.tools.wesea(data.position, form.down("[name=position_position_id]")).comboBox();
		me.tools.wesea(data.side, form.down("[name=side_side_id]")).comboBox();
		me.tools.wesea(data.purpose, form.down("[name=purpose_purpose_id]")).comboBox();
		me.tools.wesea(data.pt, form.down("[name=pt_pt_id]")).comboBox();
		me.tools.wesea(data.tanahcode, form.down("[name=tanahcode_pt_id]")).comboBox();
	},
	fillFormComponentsFormFloor: function (data, form) {
		var me = this;
		me.tools.wesea(data.productcategory, form.down("[name=productcategory_productcategory_id]")).comboBox();
		me.tools.wesea(data.purpose, form.down("[name=purpose_purpose_id]")).comboBox();
	},
	dataDestroy: function () {
		var me = this;
		console.log(me.tools);
		var rows = me.getGrid().getSelectionModel().getSelection();
		if (rows.length < 1) {
			Ext.Msg.alert('Info', 'No record selected !');
			return;
		} 
		else {
			var unitStatus = rows[0].get("unitstatus_status");
			unitStatus = !unitStatus ? "" : unitStatus;
			if (unitStatus.length > 0) {
				if (unitStatus !== "PLANNING") {
					me.tools.alert.warning("Unit dalam status :" + unitStatus + " tidak bisa dihapus.");
					return;
				}
			}

			/// FGD cek bukti pemilik dan spk
			var numbers = [];
			for (var i = 0; i < rows.length; i++) {
				numbers.push(rows[i].get("unit_id"));
			}

			numbers = numbers.join('~');

			Ext.Ajax.request({
				url     : 'erems/townplanning/read',
				params  : { mode_read: 'checkdelete', numbers : numbers },
				success : function (response) {
					var res = Ext.JSON.decode(response.responseText);
					if (!res.STATUS) {
						me.tools.alert.warning(res.MSG);
					} 
					else {
						var confirmmsg, successmsg, failmsg;
						var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
						var store           = me.getGrid().getStore();

						if (rows.length == 1) {
							var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
							confirmmsg = 'Delete ' + selectedRecord + ' ?';
							failmsg    = 'Error: Unable to delete ' + selectedRecord + '.';
						} 
						else {
							confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
							failmsg    = 'Error: Unable to delete data.';
						}

						Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
							if (btn == 'yes') {
								resetTimer();
								var msg = function () {
									me.getGrid().up('window').mask('Deleting data, please wait ...');
								};
								for (var i = 0; i < rows.length; i++) {
									store.remove(rows[i]);
								}

								store.on('beforesync', msg);
								store.sync({
									success: function (s) {
										me.getGrid().up('window').unmask();
										var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
										var successmsg = (rows.length == 1 ? selectedRecord : rows.length) + ' deleted successfully.';
										store.un('beforesync', msg);
										store.reload();

										Ext.Msg.show({
											title   : 'Success',
											msg     : successmsg,
											icon    : Ext.Msg.INFO,
											buttons : Ext.Msg.OK
										});
									},
									failure: function () {
										me.getGrid().up('window').unmask();
										store.un('beforesync', msg);
										store.reload();

										Ext.Msg.show({
											title   : 'Failure',
											msg     : failmsg + ' The data may have been used.',
											icon    : Ext.Msg.ERROR,
											buttons : Ext.Msg.OK
										});
									}
								});
							}
						});
					}
				}
			});
		}
	},
	apliJsFuncsby_form_other: function () {
		var me = this;
		var x = {
			afterRender: function (tpl, params) {
				if (params.gambar_rumah.length > 0) {
					$("#tpFormID .view_rumah").css("background-image", "url(app/erems/uploads/townplanning/" + params.gambar_rumah + ")");
				}

				if ($("#tpFormID input[name='action']").val() === "update") {
					$("#tpFormID select[name='orientasi_akses_unit_id']").val(params.orientasi_akses_unit_id);
				}

				$('#tpFormID input[name=gambar_rumah_input]').on('change', function () {
					var file_data = $('#tpFormID input[name=gambar_rumah_input]').prop('files')[0];
					//console.log(file_data);
					var form_data = new FormData();
					form_data.append('file', file_data);
					form_data.append('mode_read', 'uploadgambarrumah');

					$.ajax({
						url: 'erems/townplanning/read/',
						dataType: 'text',
						cache: false,
						contentType: false,
						processData: false,
						data: form_data,
						type: 'post',
						success: function (response) {

							var json = jQuery.parseJSON(response);
							var data = json.data.others[0][0];
							if (data.STATUS) {
								$("#tpFormID .view_rumah").css("background-image", "url(app/erems/uploads/townplanning/" + data.MSG + ")");
								$("#tpFormID input[name=gambar_rumah]").val(data.MSG);
								//
							} else {
								me.tools.alert.warning(data.MSG);
							}

						}
					});
				});

				// added by rico 14062021
				$('#tpFormID input[name=is_readystock]').on('click', function () {
					if ($('#tpFormID input[name=is_readystock]').prop('checked') == true) {
						$('#notes_siapstock').prop('readonly', true);
					} else {
						$('#notes_siapstock').prop('readonly', false);
					}
				});

			}
		};
		return x;
	},
	apliJsFuncupload_image: function () {
		var me = this;
		var x = {
			afterRender: function (tpl, params) {
				if (params.gambar.length > 0) {
					$("#tpFormID2 .view_image").css("background-image", "url(app/erems/uploads/townplanning/" + params.gambar + ")");
				}

				$('#tpFormID2 input[name=image_input]').on('change', function () {
					var file_data = $('#tpFormID2 input[name=image_input]').prop('files')[0];
					var form_data = new FormData();
					form_data.append('file', file_data);
					form_data.append('mode_read', 'uploadgambarrumah');

					$.ajax({
						url         : 'erems/townplanning/read/',
						dataType    : 'text',
						cache       : false,
						contentType : false,
						processData : false,
						data        : form_data,
						type        : 'post',
						success     : function (response) {
							var json = jQuery.parseJSON(response);
							var data = json.data.others[0][0];
							if (data.STATUS) {
								$("#tpFormID2 .view_image").css("background-image", "url(app/erems/uploads/townplanning/" + data.MSG + ")");
								$("#tpFormID2 input[name=gambar]").val(data.MSG);
							} else {
								me.tools.alert.warning(data.MSG);
							}
						}
					});

				});
			}
		};
		return x;
	},
	gridAfterRender: function (configs) {
		this.callParent(arguments);
		var me = this;

		grid = me.getGrid();
		grid.store.on('load', function (store, records, options) {
			me.jqueryBinding();
		});
		// me.getGrid().down("pagingtoolbar").getStore().reload();

		Ext.Ajax.request({
			url     : 'erems/townplanning/read',
			params  : { mode_read: 'isSh1Features' },
			success : function (response) {
				var res = Ext.JSON.decode(response.responseText);
				if(res.STATUS == 1){
					for (i = 1; i < me.getGrid().getView().getGridColumns().length; i++) {
						me.getGrid().getView().getGridColumns()[i].setVisible(true);
					}
				}
			}
		});

		me.getGrid().down("pagingtoolbar").getStore().reload();
	},
	jqueryBinding: function () {
		var me = this;
		//inlineEdit
		me.checkboxInlineEdit('is_readystock');
		me.checkboxInlineEdit('is_readylegal');
		$("#WINDOW-mnuTownPlanningTransaction input[name=is_readylegal]").attr("disabled", true);
	},
	checkboxInlineEdit: function (name) {
		var me = this;
		$("input[name='" + name + "']").change(function (event) {
			var p = me.getGrid();
			p.setLoading("Updating data, please wait ...");
			
			val = $(this).is(":checked") ? 1 : 0;
			unit_id = $(this).attr('data');
			me.tools.ajax({
				params: {id: unit_id, collumn: name, value: val},
				success: function (data) {
					p.setLoading(false);
					me.getGrid().getStore().reload();
				},
				failure : function() {
					p.setLoading(false);
				}
			}).read('inlineEdit');
		});
	},
	showSH1fields: function (f) {
		var me = this;
		Ext.Ajax.request({
			url     : 'erems/townplanning/read',
			params  : { mode_read: 'isSh1Features' },
			success : function (response) {
				var res = Ext.JSON.decode(response.responseText);
				if (res.TANAHCODE == 1) {
					f.down("[name=tanahcode]").setVisible(true);
				}

				var blank = true, lblTanahcode = 'Kode Tanah';
				if (res.TANAHCODE_MANDATORY == 1) {
					me.mandatoryCodeTanah = 1;
					blank                 = false; 
					lblTanahcode          = lblTanahcode + ' <span style="color:red">*</span>';
				} 

				f.down("[name=tanahcode]").allowBlank = blank;
				f.down('[name=tanahcode]').child().labelEl.update(lblTanahcode);
			}
		});
	},

	checkIsFasum: function (el, val) {
		var me = this;
		var f = me.getFormdata();

		if (val) {
			f.down("[name=number_check]").setDisabled(true);
			$("#tpFormID input[name=is_readystock]").prop('checked', false);
		} else {
			f.down("[name=number_check]").setDisabled(false);
			$("#tpFormID input[name=is_readystock]").prop('checked', true);
		}

	},

	upload_townplanning: function () {

		var me = this;
		$.ajax({
			method: "POST",
			url: "erems/townplanning/modalupload",
			data: ""
		}).done(function (msg) {
			ApliJs.showPhp(me, "modal_upload_townplanning", msg, 'true', 'body', '#modal-upload-townplanning', 'insert');
		});
	},

	apliJsFuncmodal_upload_townplanning: function (modalId) {
		var me = this;
		var x = {
			init: function () {

			},
			afterRender: function () {

				// ApliJs.reset();

				$(function () {

					$('.x-region-collapsed-placeholder').css("z-index", 1);

					$('#form-upload-townplanning').on("submit", function (e) {
						e.preventDefault();
						Ext.MessageBox.wait('Loading ...');
						$.ajax({

							url: "erems/townplanning/importexcel",
							method: "POST",
							data: new FormData(this),
							contentType: false,
							cache: false,
							processData: false,

							success: function (data) {
								Ext.MessageBox.updateProgress(1);
								var obj = JSON.parse(data);
								//                                    console.log(obj[0][0]['result']);
								if (obj['status'] > 0) {
									$('#modal-upload-townplanning').modal('hide');
									Ext.MessageBox.hide();
									Ext.Msg.show({
										title: 'Warning',
										msg: '<div style="overflow: auto;"> Master data belum ada:' + obj['data'] + '</div>',
										icon: Ext.Msg.INFO,
										buttons: Ext.Msg.OK,
										width: 200,
									});
								} else {
									$('#modal-upload-townplanning').modal('hide');
									Ext.MessageBox.hide();
									Ext.Msg.show({
										title: 'Success',
										msg: 'Berhasil',
										icon: Ext.Msg.INFO,
										buttons: Ext.Msg.OK
									});
								}
							},
							failure: function (data) {
								console.log(data);
							}

						})

					});
				});



			}

		};

		return x;

	},
	// added by rico 04/03/2022
	formDataDetailShow: function (state) {
		var me = this;
		//var state = 'create';//action == me.bindPrefixName + 'Create' ? 'create' : 'update';
		switch (state) {
			case 'create':
				formtitle = 'Create Detail Komisi Permintaan';
				formicon = 'icon-form-add';
				break;
			case 'update':
				formtitle = 'Edit Detail Komisi Permintaan';
				formicon = 'icon-form-edit';
				break;
			case 'view':
				formtitle = 'View';
				formicon = 'icon-search';
				break;
		}
		var winId = 'win-komisipermintaandetailformdata';
		var win = desktop.getWindow(winId);
		if (!win) {
			win = desktop.createWindow({
				id: winId,
				title: formtitle,
				iconCls: formicon,
				resizable: false,
				minimizable: false,
				maximizable: false,
				width: 700,
				renderTo: Ext.getBody(),
				constrain: true,
				constrainHeader: false,
				modal: true,
				layout: 'fit',
				shadow: 'frame',
				shadowOffset: 10,
				border: false,
				state: state,
				//items: Ext.create('Erems.view.' + me.controllerName + '.HgbajbFormData'),
				listeners: {
					boxready: function () {
						win.body.mask('Loading...');
						var tm = setTimeout(function () {
							win.add(Ext.create('Erems.view.' + me.controllerName + '.FormDataDetail'));
							win.center();
							win.body.unmask();
							clearTimeout(tm);
						}, 1000);
					},
				}
			});
		}
		win.show();
	},
	gridDetailSelectionChange: function () {
		var me = this;
		var state = me.getFormdata().up('window').state;
		var grid = me.getGridhistory(), row = grid.getSelectionModel().getSelection();
		var view = grid.down('#btnView');

		if (view !== null) {
			view.setDisabled(row.length != 1);
		};
	},
	formDataDetailAfterRender: function (el) {
		var me = this;
		me.storeProcess = me.createSpProcessObj(me.storeProcess);
		me.fdar().init();

		var grid = me.getGridhistory();
		var form = me.getFormdatadetail();
		var row = grid.getSelectionModel().getSelection();

		var tgl = new Date(row[0].data.change_date);
		var year = tgl.getFullYear();
		var month = tgl.getMonth() + 1;
		var day = tgl.getDate();
		var hours = tgl.getHours();
		var minutes = tgl.getMinutes();
		var seconds = tgl.getSeconds();

		if (day < 10)
			day = '0' + day;
		if (month < 10)
			month = '0' + month;

		var date = day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;

		form.down('[name=change_date]').setValue(date);
		form.down('[name=description]').setValue(row[0].data.description);
		form.down('[name=instruksi_order]').setValue(row[0].data.instruksi_order);
		form.down('[name=person_in_charge]').setValue(row[0].data.person_in_charge);
	},
	formDataUpdateFloorafterRender: function (el) {
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
		var f = me.getFormdatafloor();

		me.tools.ajax({
			params: {},
			success: function (data, model) {


				me.fillFormComponentsFormFloor(data, f);
				var maxLantai= data.others[1][0].maxJumlahLantai;
				me.getFormdatafloor().down("[name=max_lantai]").setValue(maxLantai);
				f.setLoading(false);
			}
		}).read('detail');

		console.log(row);


		var unitId      		= row[0].data.unit_id;
		var productcategory_id 	= row[0].data.productcategory_productcategory_id;
		var floor      			= row[0].data.floor;
		var land_size 			= row[0].data.land_size;
		var building_size		= row[0].data.building_size;
		var purpose_id 			= row[0].data.purpose_purpose_id;


		me.getFormdatafloor().down("[name=unit_id]").setValue(unitId);
		me.getFormdatafloor().down("[name=productcategory_productcategory_id]").setValue(productcategory_id);
		me.getFormdatafloor().down("[name=purpose_purpose_id]").setValue(purpose_id);
		me.getFormdatafloor().down("[name=land_size]").setValue(land_size);
		me.getFormdatafloor().down("[name=building_size]").setValue(building_size);
		me.getFormdatafloor().down("[name=floor]").setValue(floor);
		// me.getFormdataopen().down("[name=include_denda_va]").setValue(include_denda_va);

		// me.getFormdataopen().down('[name=include_denda_va]').setVisible(me.checklist_openva);

		// added by rico 14092021
		// Ext.Ajax.request({
		// 	url: 'erems/admincollection/read',
		// 	params: {
		// 		read_type_mode: 'open_hari_va'
		// 	},
		// 	success: function (response) {
		// 		var res = Ext.JSON.decode(response.responseText);
		// 		var grid = me.getGrid()

		// 		if (res['checklist']) {
		// 			me.getFormdataopen().down('[name=include_denda_va]').setVisible(true);
		// 		}
		// 	}
		// });
	},
	detailFormDataUpdateFloor: {
		that: this,
		editingIndexRow: 0,
		save: function () {
			var me = this;
			var form = me.getFormdatafloor().getForm();

			if (form.isValid()) {
				var fields = me.getFormdatafloor().getValues();
				var p = me.getPanel();
				var f = me.getFormdatafloor();

				resetTimer();
				me.getFormdatafloor().up('window').body.mask('Saving, please wait ...');
				if (fields.floor == null || fields.floor < 0) {
					me.getFormdatafloor().up('window').body.unmask();
					Ext.Msg.show({
						title: 'Failure',
						msg: 'Error: Please check field Floor (Jumlah Lantai)',
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});
				} else if (fields.productcategory_productcategory_id < 2 && fields.floor <= 0 ) {
					me.getFormdatafloor().up('window').body.unmask();
					me.tools.alert.warning("Jumlah lantai harus lebih dari 0");
				} else if (fields.productcategory_productcategory_id > 1 && fields.floor > 0 ) {
					me.getFormdatafloor().up('window').body.unmask();
					me.tools.alert.warning("Jumlah lantai untuk kategori kavling tidak bisa lebih dari 0");
				} else if (fields.floor > parseInt(fields.max_lantai)) {
					me.getFormdatafloor().up('window').body.unmask();
					me.tools.alert.warning("Jumlah lantai tidak bisa lebih besar dari " + fields.max_lantai);
				}else{
					Ext.Ajax.request({
						url     : 'erems/townplanning/read',
						params  : { mode_read: 'updateFloor', unit_id : fields.unit_id, floor : fields.floor },
						success : function (response) {
							me.getFormdatafloor().up('window').body.unmask();
							var res = Ext.JSON.decode(response.responseText);
							if (res.HASIL == 1) {
								Ext.Msg.show({
									title   : 'Success',
									msg     : 'Data saved successfully.',
									icon    : Ext.Msg.INFO,
									buttons : Ext.Msg.OK,
									fn      : function () {
										me.getFormdatafloor().up('window').close();
										var gridDepan = me.getGrid();
										var storeDepan = gridDepan.getStore();
										storeDepan.reload();
									}
								});
							} 
							else {
								Ext.Msg.show({
									title   : 'Failure',
									msg     : 'Error: Unable to save',
									icon    : Ext.Msg.ERROR,
									buttons : Ext.Msg.OK
								});
							}
						}
					});
				}
			}
		}
	}
});