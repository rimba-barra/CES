Ext.define('Erems.controller.Mastertype', {
	extend   : 'Erems.library.template.controller.Controller2',
	alias    : 'controller.Mastertype',
	views    : ['mastertype.Panel', 'mastertype.Grid', 'mastertype.FormSearch', 'mastertype.FormData', 'mastertype.TypeAttributeGrid', 'mastertype.FormAddValue'],
	requires : ['Erems.library.ComboLoader', 'Erems.library.box.Config', 'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields', 'Erems.library.box.tools.EventSelector', 'Erems.library.ModuleTools'],
	stores   : ['Masterattributevalue'],
	refs     : [
		{
			ref      : 'grid',
			selector : 'mastertypegrid'
		},
		{
			ref      : "griddetail",
			selector : "typeattributegrid"
		},
		{
			ref      : 'formsearch',
			selector : 'mastertypeformsearch'
		},
		{
			ref      : 'formdata',
			selector : 'mastertypeformdata'
		},
		{
			ref      : 'formdetail',
			selector : 'mastertypeformaddvalue'
		}
	],
	controllerName     : 'mastertype',
	fieldName          : 'name',
	bindPrefixName     : 'Mastertype',
	comboLoader        : null,
	cbf                : null,
	dataAttributeValue : null,
	formxWinId         : 'win-mastertypewinId',
	localStore         : {
		detail : null
	},
	constructor: function (configs) {
		this.callParent(arguments);
		var me = this;
		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});

		me.cbf = new Erems.template.ComboBoxFields();
	},
	init: function (application) {
		var me = this;

		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
		var events = new Erems.library.box.tools.EventSelector();

		this.control({
			'mastertypepanel': {
				beforerender : me.mainPanelBeforeRender,
				afterrender  : this.panelAfterRender
			},
			'mastertypegrid': {
				afterrender     : this.gridAfterRender,
				itemdblclick    : this.gridItemDblClick,
				itemcontextmenu : this.gridItemContextMenu,
				selectionchange : this.gridSelectionChange
			},
			'mastertypegrid toolbar button[action=create]': {
				click: function () {
					me.formDataShow('create');
				}
			},
			'mastertypegrid toolbar button[action=update]': {
				click: function () {
					me.formDataShow('update');
				}
			},
			'mastertypegrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'mastertypegrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'mastertypegrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'mastertypeformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'mastertypeformsearch button[action=search]': {
				click: this.dataSearch
			},
			'mastertypeformsearch button[action=reset]': {
				click: this.dataReset
			},
			'mastertypeformdata': {
				afterrender: this.formDataAfterRender,
				beforerender: function (el) {
					// el.down('#fd_masterattribute_atttype').getStore().load();
				}
			},
			'mastertypeformdata button[action=save]': {
				click: this.mainDataSave
			},
			'mastertypeformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'mastertypeformdata button[action=value_add]': {
				click: function () {
					me.showFormDetail();
				}
			},
			'mastertypeformdata #fd_mastertype_productcategory': {
				select: function (el, val) {
					var form = me.getFormdata();
					var storepurpose = form.down('[name=purpose_id]').getStore();

					form.down('[name=purpose_id]').setValue(0);
					if (el.getRawValue() == "KAVLING") {
						storepurpose.clearFilter(true);
						storepurpose.filter({
							property      : 'purpose',
							value         : 'KAVLING',
							exactMatch    : false,
							caseSensitive : false
						});
					} else if (el.getRawValue() == "BANGUNAN") {
						storepurpose.clearFilter(true);
						storepurpose.each(function (record) {
							record.data.kavling = "no";
							if ((record.data.purpose).toUpperCase().includes("KAVLING")) {
								record.data.kavling = "yes";
							}
						});

						storepurpose.filter({
							property      : 'kavling',
							value         : "no",
							exactMatch    : true,
							caseSensitive : true
						});
					}
				}
			},
			'mastertypeformdata #fd_purpose_id': {
				select: function (el, val) {
					var form = me.getFormdata();
					var rawValue = el.getRawValue();
					var land_size = form.down('[name=land_size]');
					var building = form.down('#fd_mastertype_building_size');
					var floor = form.down('#fd_mastertype_floor_size');

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
			'mastertypeformdata #fd_file_left' : {
				change : function(fld){
					me.getFormdata().down('#fd_file_right').setDisabled(true);
					me.formDataUploadFileDoc(fld, 'left');
				}
			},
			'mastertypeformdata #fd_file_right' : {
				change : function(fld){
					me.getFormdata().down('#fd_file_left').setDisabled(true);
					me.formDataUploadFileDoc(fld, 'right');
				}
			},
			'typeattributegrid actioncolumn': {
				click: this.insActionColumnClick
			},
			'mastertypeformaddvalue #fav_attribute': {
				change: this.attributeComboBoxChange
			},
			'mastertypeformaddvalue #fav_attributevalue': {
				change: this.attributevalueComboBoxChange
			},
			'mastertypeformsearch numberfield': {
				change: function (ele, val) {
					me.foserNumberFieldChange(me, ele, val);
				}
			},
			'mastertypeformaddvalue button[action=save]': {
				click: this.detailDataSave
			},
			'mastertypeformaddvalue [name=attribute_id]': {
				select: this.attributeOnSelect
			},
			'mastertypeformaddvalue #attributeValueCb': {
				select: this.valueOnSelect
			},
			'typeattributegrid': {
				selectionchange: this.gridAttributeTypeChange
			},
		});
	},
	panelAfterRender: function (configs) {
		this.callParent(arguments);
		var me = this;
		var f = me.getFormsearch();
		me.tools.ajax({
			params  : {},
			success : function (data, model) {
				me.tools.wesea(data.cluster, f.down("[name=cluster_id]")).comboBox(true);
				me.tools.wesea(data.productcategory, f.down("[name=productcategory_id]")).comboBox(true);
			}
		}).read('searchinit');

	},
	valueOnSelect: function (el) {
		var me = this;
		var formDetail = me.getFormdetail();
		formDetail.down("[name=value]").setValue(el.getDisplayValue());

	},
	attributeOnSelect: function () {
		var me = this;

		var formDetail  = me.getFormdetail();
		var attributeEl = formDetail.down("[name=attribute_id]");
		var valueEl     = formDetail.down("#attributeValueCb");
		var store       = valueEl.getStore();
		store.clearFilter(true);
		store.filter("attribute_attribute_id", attributeEl.getValue());
		var valueExist = store.getCount() > 0 ? true : false;

		valueEl.setVisible(valueExist);
		formDetail.down("[name=value]").setVisible(!valueExist);
		var isText = me.isFreeText();
		var rec = this.getAttributeRecord();
		if (!isText) {
			if (rec) {
				var defaultValue = rec.get('attributevalue_attributevalue_id');
				if (defaultValue > 0) {
					valueEl.setValue(defaultValue);
				} else {
					formDetail.down("[name=attributevalue_id]").setValue(0);
				}
			}
		}
		// valueEl.getStore().filter("attribute_attribute_id",parseInt(attributeEl.getValue()));
	},
	insACC: function (view, action, row) {
		var me    = this;
		var grid  = view.up("grid");
		var store = grid.getStore();
		switch (grid.itemId) {
			case "detailmastertype_grid":
				if (action === "destroy") {
					me.deleteDetailInMaster(me.getGrid(), me.getGriddetail(), row, me.getFormdata().down("[name=type_id]").getValue());
				} 
				else if (action === "update") {
					me.showFormDetail("update", function () {
						var fd = me.getFormdetail();
						var rec = store.getAt(row);
						fd.loadRecord(rec);
						if (rec.get("attributevalue_attributevalue_id")) {
							fd.down("[name=attributevalue_id]").setValue(rec.get("attributevalue_attributevalue_id"));
						}
						if (rec.get("attributevalue_id")) {
							fd.down("[name=attributevalue_id]").setValue(rec.get("attributevalue_id"));
						}

						var attributeEl = fd.down("[name=attribute_id]");
						var valueEl = fd.down("#attributeValueCb");
						var storecb = valueEl.getStore();
						storecb.clearFilter(true);
						storecb.filter("attribute_attribute_id", attributeEl.getValue());
						var valueExist = storecb.getCount() > 0 ? true : false;

						valueEl.setVisible(valueExist);
						fd.down("[name=value]").setVisible(!valueExist);

					});
					me.getFormdetail().editedRow = row;
				}
				break;
		}
	},
	getAttributeRecord: function () {
		var attributeEl = this.getFormdetail().down("[name=attribute_id]");
		var index = attributeEl.getStore().findExact('attribute_id', attributeEl.getValue());
		var rec = null;

		if (index > -1) {
			rec = attributeEl.getStore().getAt(index);
		}
		return rec;
	},
	isFreeText: function () {
		var rec = this.getAttributeRecord();
		var isText = false;

		if (rec) {
			isText = rec.get("is_freetext");
		}
		return isText;
	},
	detailDataSave: function () {
		var me = this;
		me.insSave({
			form      : me.getFormdetail(),
			grid      : me.getGriddetail(),
			// store  : me.localStore.detail,
			finalData : function (data) {
				var formDetail = me.getFormdetail();
				var attributeEl = formDetail.down("[name=attribute_id]");
				var gridStore = me.getGriddetail().getStore();
				data["attribute_attribute"] = attributeEl.getDisplayValue();

				var rec = gridStore.getAt(formDetail.editedRow);
				var attribute = [];
				var value = [];

				for (var i = 0; i < gridStore.data.items.length; i++) {
					if (formDetail.up('window').state == 'create') {
						attribute.push(gridStore.data.items[i].data['attribute_attribute']);
						attribute.push(gridStore.data.items[i].data['value']);
					} else {
						if (rec.get("attribute_attribute") != gridStore.data.items[i].data['attribute_attribute']) {
							attribute.push(gridStore.data.items[i].data['attribute_attribute']);
						}
						if (rec.get("value") != gridStore.data.items[i].data['value']) {
							attribute.push(gridStore.data.items[i].data['value']);
						}
					}
				}

				if (attribute.includes(data["attribute_attribute"]) != true && value.includes(data["value"]) != true) {
					var isText = me.isFreeText();
					if (!isText) {
						data["value"] = formDetail.down("[name=attributevalue_id]").getDisplayValue();
						data["attributevalue_attributevalue"] = formDetail.down("[name=attributevalue_id]").getDisplayValue();
					} else {
						data["value"] = formDetail.down("[name=value]").getValue();
						data["attributevalue_attributevalue"] = formDetail.down("[name=value]").getDisplayValue();
					}
					return data;
				} else {
					Ext.Msg.alert('Info', 'Record exist!');
					return null;
				}
			},
			// sync: true,
			callback: {
				create: function (store, form, grid) {
					// me.getGriddetail();
				}
			}
		});
	},
	mainDataSave: function () {
		var me = this;
		
		me.tools.iNeedYou(me).save(function () {
			me.insSave({
				form      : me.getFormdata(),
				grid      : me.getGrid(),
				// store  : me.localStore.detail,
				finalData : function (data) {
					data["typeattribute"] = me.getGriddetail().getJson();

					return data;
				},
				sync     : true,
				callback : {
					create : function (store, form, grid) {
						
					}
				},
			})
		}, function (data) {
			data["typeattribute"] = me.getGriddetail().getJson();
			return data;
		});
	},
	addValueSave: function () {
	},
	showFormDetail: function (state, callbackDetail) {
		var s = typeof state === "undefined" ? "create" : state;
		var me = this;
		me.instantWindow('FormAddValue', 500, 'Add Value', s, 'myWindow');

		me.getFormdetail().up("window").body.mask("Loading...");

		var formDetail = me.getFormdetail();
		var attributeEl = formDetail.down("[name=attribute_id]");
		var valueEl = formDetail.down("#attributeValueCb");
		attributeEl.doInit();
		valueEl.doInit();
		attributeEl.getStore().load({
			callback: function (rec, op) {

				attributeEl.attachModel(op);
				me.setDefaultValue(attributeEl, "attribute_id");


				valueEl.getStore().load({
					callback: function (recv, opv) {

						valueEl.attachModel(opv);
						if (typeof callbackDetail === "function") {
							callbackDetail();
						}
						var fd = me.getFormdetail();
						if (s == 'create') {
							/// 
							me.attributeOnSelect();

							if (valueEl.getStore().getCount() > 0) {
								var index = attributeEl.getStore().findExact('attribute_id', attributeEl.getValue());
								var rec = null;
								if (index > -1) {
									rec = attributeEl.getStore().getAt(index);
									if (rec) {
										var v = rec.get("attributevalue_attributevalue_id");
										if (v) {
											fd.down("[name=attributevalue_id]").setValue(v);
										}
									}
								}
							}
						}

						fd.up("window").body.unmask();
					}
				});

			}
		});
	},
	fdar: function () {
		//  var cList = ["productcategory_productcategory_id", "cluster_cluster_id"];
		var me = this;
		var f  = me.getFormdata();
		var x  = {
			init: function () {
				me.mt = new Erems.library.ModuleTools();
				me.setActiveForm(f);
				me.getGriddetail().doInit();
			},
			create: function () {
				me.tools.ajax({
					params: {
						// purchaseletter_id: plId
					},
					success: function (data, model) {
						me.fillFormComponents(data, f);
						me.getGriddetail().getStore().load({
							params: {
								//state: "load_default_attribute"
							},
							callback: function (rec, op) {
								me.getGriddetail().attachModel(op);

								/// set default value for alll attribute in grid
								var s = me.getGriddetail().getStore();
								if (s.getCount() > 0) {
									var v = null;
									s.each(function (rec) {
										if (!rec.get("is_freetext")) {
											v = rec.get("attributevalue_attributevalue");
										}
										rec.beginEdit();
										rec.set({
											value: v
										});
										rec.endEdit();
									});
								}
							}
						});
						//  me.tools.wesea(data.schedule, me.getSchedulegrid()).grid();
						f.setLoading(false);
					}
				}).read('detail');
			},
			update: function () {
				var rec = me.getGrid().getSelectedRecord();
				me.getFormdata().editedRow = me.getGrid().getSelectedRow();

				me.tools.ajax({
					params: {
						// purchaseletter_id: plId
					},
					success: function (data, model) {
						me.fillFormComponents(data, f);
						me.getFormdata().loadRecord(rec);

						if (rec.get("is_cpms") == 1) {
							me.getFormdata().down("[name=code]").setReadOnly(true);
							me.getFormdata().down("[name=productcategory_productcategory_id]").setReadOnly(true);
							me.getFormdata().down("[name=cluster_cluster_id]").setReadOnly(true);
							me.getFormdata().down("[name=purpose_id]").setReadOnly(true);
							me.getFormdata().down("[name=name]").setReadOnly(true);
							me.getFormdata().down("[name=land_size]").setReadOnly(true);
							me.getFormdata().down("[name=building_size]").setReadOnly(true);
							me.getFormdata().down("[name=floor_size]").setReadOnly(true);
						}

						if(rec.get('floorplan_leftaccess')){
							me.refreshDocumentImageInfo(rec.get('floorplan_leftaccess'), 'left');
						}

						if(rec.get('floorplan_rightaccess')){
							me.refreshDocumentImageInfo(rec.get('floorplan_rightaccess'), 'right');
						}

						me.getGriddetail().getStore().load({
							params: {
								type_id: rec.get("type_id")
							},
							callback: function (rec, op) {
								me.getGriddetail().attachModel(op);
							}
						});
						f.setLoading(false);
					}
				}).read('detail');
			}
		};
		return x;
	},
	loadedElement: {
		religion: false
	},
	foserNumberFieldChange: function (me, ele, val) {
		var x = null;
		if (ele.typeNumber == 'min') {
			x = me.getFormsearch().down('#fs_mastertype_top' + ele.textName);
			//  ele.top('form').down('#fs_mastertype_top'+ele.textName).setValue(ele.getValue());
			if (parseInt(x.getValue()) < parseInt(ele.getValue())) {
				x.setValue(ele.getValue());
			}
		} else if (ele.typeNumber == 'max') {
			x = me.getFormsearch().down('#fs_mastertype_bot' + ele.textName);

			if (parseInt(x.getValue()) > parseInt(ele.getValue())) {
				x.setValue(ele.getValue());
			}
		}
	},
	attributevalueComboBoxChange: function (el) {
		var store = el.getStore();
		var idSelected = el.getValue();
		var indexRecord = store.findExact('attributevalue_id', idSelected);

		if (indexRecord >= 0) {
			el.up('form').down('#attributevalue').setValue(store.getAt(indexRecord).get('attributevalue'));
		}
	},
	attributeComboBoxChange: function (el) {
		var store = el.getStore();
		var idSelected = el.getValue();
		var indexRecord = store.findExact('attribute_id', idSelected);
		var attval = null;
		attval = el.up('form').down('#fav_attributevalue');
		el.up('form').down('#attributevalue').setValue('');
		el.up('form').down('#fav_attributename').setValue(store.getAt(indexRecord).get('attribute'));
		attval.setValue('');
		if (parseInt(store.getAt(indexRecord).get('is_freetext')) == 1) {
			el.up('form').down('#attributevalue').show();
			attval.hide();
		} else {
			el.up('form').down('#attributevalue').hide();
			attval.show();
			attval.getStore().load({params: {attribute_id: idSelected}});
		}
		//console.log(store);
	},
	formSearchAfterRender: function (el) {
	},
	getDefaultAttribute: function () {
		var me = this;
		var id = 1;
		var store = me.getFormdatavalue().down("[name=attribute_id]").getStore();

		id = store.data.items[0].internalId;
		return id;
	},
	fillFormComponents: function (data, form) {
		var me = this;

		me.tools.wesea(data.productcategory, form.down("[name=productcategory_productcategory_id]")).comboBox();
		me.tools.wesea(data.cluster, form.down("[name=cluster_cluster_id]")).comboBox();
		me.tools.wesea(data.purpose, form.down("[name=purpose_id]")).comboBox();

		me.dataAttributeValue = data.attributevalue;
	},
	dataDestroy: function () {
		var me = this;
		var rows = me.getGrid().getSelectionModel().getSelection();
		if (rows.length < 1) {
			Ext.Msg.alert('Info', 'No record selected !');
			return;
		} else {
			var confirmmsg, successmsg, failmsg;
			var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
			var store = me.getGrid().getStore();
			if (rows.length == 1) {
				var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
				confirmmsg = 'Delete ' + selectedRecord + ' ?';
				failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
			} else {
				confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
				failmsg = 'Error: Unable to delete data.';
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
							var res = Ext.decode(s.operations[0].response.responseText).total == undefined ? 1 : 0;
							if (res == 0) {
								me.getGrid().up('window').unmask();
								store.un('beforesync', msg);
								store.reload();
								Ext.Msg.show({
									title: 'Failure',
									msg: failmsg + ' <br/>The data may have been used.',
									icon: Ext.Msg.ERROR,
									buttons: Ext.Msg.OK
								});
							} else {
								me.getGrid().up('window').unmask();
								var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
								var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
								store.un('beforesync', msg);
								store.reload();
								// if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
								//     Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
								// }
								Ext.Msg.show({
									title: 'Success',
									msg: successmsg,
									icon: Ext.Msg.INFO,
									buttons: Ext.Msg.OK
								});
							}
						},
						failure: function () {
							me.getGrid().up('window').unmask();
							store.un('beforesync', msg);
							store.reload();
							Ext.Msg.show({
								title: 'Failure',
								msg     : failmsg + ' <br/>The data may have been used.',
								icon    : Ext.Msg.ERROR,
								buttons : Ext.Msg.OK
							});
						}
					});
				}
			});
		}
	},
	gridAttributeTypeChange: function () {
		var me = this;
		var rows = me.getGriddetail().getSelectionModel().getSelection();
		console.log("row grid clicked");
		if (rows.length > 0) {
			var store = me.getMasterattributevalueStore();
			store.load({params: {attribute_id: rows[0].data.attribute_id}});
		}
	},
	formDataUploadFileDoc: function(fld, flag) {
		var me = this;
		var form = fld.up("form");

		me.uploadFile({
			form     : form,
			params   : {tipe : 'document', flag : flag},
			callback : {
				success: function(imageName) {
					me.refreshDocumentImageInfo(imageName, flag);
				},
				failure: function() {
				}
			}
		});
	},
	refreshDocumentImageInfo: function(imageName, flag) {
		var me = this;
		var form     = me.getFormdata();
		var file     = 'file_floorplan_'+flag+'access';
		var filename = 'floorplan_' + flag + 'access';
		var fileshow = 'file_image_' + flag;

		form.down("[name=" + filename + "]").setValue(imageName);
        form.down('[name=' + file + ']').setRawValue(imageName);
		form.down("[name=" + fileshow + "]").setSrc('app/erems/uploads/mastertype/' + imageName);
	},
	uploadFile: function(params) {
		var me = this;
		var form     = params.form;
		var callback = params.callback;
		var flag     = params.params.flag;

		var filesize = 0;
		var filedoc = document.getElementsByName("file_floorplan_"+flag+"access")[0];
		if(filedoc != null){
			filesize = filedoc.files[0].size;
		}

        var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.img)$/i;
        if(!allowedExtensions.exec(filedoc.files[0].name)){
        	me.getFormdata().down('#fd_file_'+(flag == 'left' ? 'right' : 'left')).setDisabled(false);

			var msg = "Only image formats are accepted (.jpg, .jpeg, .png, .gif, .img)";
			Ext.Msg.show({
				title   : 'Fail',
				msg     : msg,
				icon    : Ext.Msg.ERROR,
				buttons : Ext.Msg.OK
			});
        }
		else if(filesize > 0 && filesize <= 2097152){ //filesize max 2MB 2097152
			form.submit({
				clientValidation : false,
				url              : 'erems/' + me.controllerName + '/upload',
				params           : params.params,
				waitMsg          : 'Uploading file...',
				success          : function(f, a) {
					me.getFormdata().down('#fd_file_'+(flag == 'left' ? 'right' : 'left')).setDisabled(false);

					var icon = Ext.Msg.INFO;
					var msg = 'File Uploaded';

					if (!a.result.success) {
						icon = Ext.Msg.ERROR;
						msg = a.result.msg;
					} else {
						callback.success(a.result.msg);
					}

					Ext.Msg.show({
						title   : 'Info',
						msg     : msg,
						icon    : icon,
						buttons : Ext.Msg.OK
					});
				},
				failure: function(f, a) {
					me.getFormdata().down('#fd_file_'+(flag == 'left' ? 'right' : 'left')).setDisabled(false);

					callback.failure();
					var msg = "...";
					if(typeof a.result !=="undefined"){
						msg= a.result.msg;
					}else{
						msg = "Please complete all the required field";
					}
					Ext.Msg.show({
						title   : 'Fail',
						msg     : msg,
						icon    : Ext.Msg.ERROR,
						buttons : Ext.Msg.OK
					});
				}
			});
		} else {
			me.getFormdata().down('#fd_file_'+(flag == 'left' ? 'right' : 'left')).setDisabled(false);

			var msg = "File upload maximum 2 MB";
			Ext.Msg.show({
				title   : 'Fail',
				msg     : msg,
				icon    : Ext.Msg.ERROR,
				buttons : Ext.Msg.OK
			});
		}
	},
});