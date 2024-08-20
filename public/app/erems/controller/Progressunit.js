Ext.define('Erems.controller.Progressunit', {
	extend   : 'Erems.library.template.controller.Controller2',
	alias    : 'controller.Progressunit',
	requires : ['Erems.library.Browse', 'Erems.library.box.Config', 'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields', 'Erems.library.box.tools.EventSelector', 'Erems.library.Detailtool'],
	views    : ['progressunit.Panel', 'progressunit.Grid', 'progressunit.FormSearch', 'progressunit.FormData', 'progressunit.FormDataGenerateTargetKontruksi', 'progressunit.FormDataUpdateDetailProgress', 'progressunit.FormDataSurvey'],
	refs     : [
		{
			ref: 'grid',
			selector: 'progressunitgrid'
		},
		{
			ref: 'gridmaindetail',
			selector: 'progressgridmaindetail'
		},
		{
			ref: 'griddetail',
			selector: 'progressgriddetail'
		},
		{
			ref: 'gridimage',
			selector: 'progressgridimage'
		},
		{
			ref: 'gridspk',
			selector: 'progressgridspk'
		},
		//

		{
			ref: 'formsearch',
			selector: 'progressunitformsearch'
		},
		{
			ref: 'formdata',
			selector: 'progressunitformdata'
		},
		{
			ref: 'formdatadetail',
			selector: 'progressunitformdatadetail'
		},
		{
			ref: 'formdataimage',
			selector: 'progressunitformdataimage'
		},
		{
			ref: 'formdatagallery',
			selector: 'progressunitformdatagallery'
		},
		{
			ref: 'formdataspk',
			selector: 'progressunitformdataspk'
		},
		{
			ref: 'panel',
			selector: 'progressunitpanel'
		},
		{
			ref: 'gridtarget',
			selector: 'progressgridtarget'
		},
		{
			ref: 'gridcair',
			selector: 'progressgridpencairan'
		},
		{
			ref: 'formdatageneratetargetkontruksi',
			selector: 'progressunitformdatageneratetargetkontruksi'
		},
		{
			ref: 'formdataupdatedetailprogress',
			selector: 'progressunitformdataupdatedetailprogress'
		},
		//added by anas 09072021
		{
			ref: 'formdatasurvey',
			selector: 'progressunitformdatasurvey'
		},
	],
	controllerName     : 'progressunit',
	fieldName          : 'construction_id',
	bindPrefixName     : 'Progressunit',
	formWidth          : 800,
	nomMaster          : 'main_list',
	nomIdProperty      : 'construction_id',
	imageFolder        : 'app/erems/uploads/progress_unit/',
	usePicProgressCPMS : 0,
	localStore         : {
		spkList          : null,
		mainConstruction : null,
		unitInfo         : null,
		images           : null,
		imagesApi        : new Array
	},
	dae : {
		unit    : null,
		cluster : null,
		block   : null
	},
	currentSpkPos : 0,
	cbf           : null,
	mt            : null,
	tools         : null,
	myConfig      : null,
	isSendMail    : false,
	editConfig    : [], // added by rico 27092022
	constructor   : function (configs) {
		this.callParent(arguments);
		var me = this;
		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});

		me.cbf = new Erems.template.ComboBoxFields();
	},
	init: function (application) {
		var me     = this;
		me.tools   = new Erems.library.box.tools.Tools({config: me.myConfig});
		var events = new Erems.library.box.tools.EventSelector();

		this.control({
			'progressunitpanel': {
				beforerender : me.mainPanelBeforeRender,
				afterrender  : this.panelAfterRender
			},
			'progressunitgrid': {
				afterrender     : this.gridAfterRender,
				itemdblclick    : this.gridItemDblClick,
				itemcontextmenu : this.gridItemContextMenu,
				selectionchange : this.gridSelectionChange,
			},
			'progressgridtarget': {
				afterrender: function (grid) {
					me.gridTargetAfterRender(grid);
				},
			},
			'progressunitgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'progressunitgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'progressunitgrid toolbar button[action=generateTargetKonstruksi]': {
				click: function () {
					me.showFormGenerateTargetKontruksi();
				}
			},
			'progressunitgrid toolbar button[action=updateDetailProgress]': {
				click: function () {
					me.showFormUpdateDetailProgress();
				}
			},
			'progressunitformdatageneratetargetkontruksi button[action=generateSelection]': {
				click: function () {
					me.generateTargetSelected();
				}
			},
			'progressunitformdatageneratetargetkontruksi button[action=generateAll]': {
				click: function () {
					me.generateTargetAll();
				}
			},
			'progressunitformdatageneratetargetkontruksi button[action=generateAllSPK]': {
				click: function () {
					me.generateTargetAllSPK();
				}
			},
			'progressunitformdataupdatedetailprogress button[action=updateSelection]': {
				click: function () {
					me.updateDetailSelected();
				}
			},
			'progressunitformdataupdatedetailprogress button[action=updateAll]': {
				click: function () {
					me.updateDetailAll("cluster");
				}
			},
			'progressunitformdataupdatedetailprogress button[action=updateAllSPK]': {
				click: function () {
					me.updateDetailAll("SPK");
				}
			},
			'progressunitgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'progressunitgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'progressgridtarget toolbar button[action=generate]': {
				click: function () {
					me.generateTarget();
				}
			},
			'progressunitgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'progressunitformsearch button[action=search]': {
				click: this.dataSearch
			},
			'progressunitformsearch button[action=reset]': {
				click: this.dataReset
			},
			'progressunitformdata': {
				afterrender: this.formDataAfterRender
			},
			'progressunitformdata button[action=save]': {
				click: function () {
					me.saveAJax();
				}
			},
			'progressunitformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'progressunitformdata button[action=next]': {
				click: function () {
					me.moveSpkList('next');
				}
			},
			'progressunitformdata button[action=previous]': {
				click: function () {
					me.moveSpkList('previous');
				}
			},
			'progressunitformdatagallery button[action=next]': {
				click: function () {
					me.moveImagesList('next');
				}
			},
			'progressunitformdatagallery button[action=previous]': {
				click: function () {
					me.moveImagesList('previous');
				}
			},
			'progressunitformdata button[action=show_spk]': {
				click: function () {
					me.showFormSpk('create');
				}
			},
			//
			'progressunitformdata [name=unit_unit_id]': {
				select: function (el, val) {
					me.unitOnSelect();
				}
			},
			'progressunitformdata [name=is_holdteknik]': {
				change: function (el, val) {
					if (el.getValue()) {
						me.getFormdata().down("[name=notes_holdteknik]").setReadOnly(false);
					} else {
						me.getFormdata().down("[name=notes_holdteknik]").setReadOnly(true);
					}
				}
			},
			'progressgriddetail toolbar button[action=create]': {
				click: function () {
					me.showFormDetail();
				}
			},
			'progressgridimage toolbar button[action=addNewDetail]': {
				click: function () {
					me.showFormImage();
				}
			},
			'progressunitformdatadetail button[action=save]': {
				click: this.mainDataSave
			},
			'progressgriddetail actioncolumn': {
				click: this.insActionColumnClick
			},
			'progressunitformdataimage button[action=save]': {
				click: this.imageDataSave
			},
			'progressgridimage actioncolumn': {
				click: this.insActionColumnClick
			},
			'progressgridmaindetail actioncolumn': {
				click: this.insActionColumnClick
			},
			'progressunitformdataspk toolbar button[action=select_spk]': {
				click: me.selectSPKFromList
			},
			'progressunitformsearch': {
				afterrender: this.progressunitformsearchAfterRender
			},
			// 'progressunitformsearch [name=cluster_id]': {
			// 	select: function (el, val) {
			// 		me.searchClusterOnSelect();
			// 		me.getFormsearch().down("[name=unit_number]").setValue("");
			// 	}
			// },
			// 'progressunitformsearch [name=block_id]': {
			// 	select: function (el, val) {

			// 		me.getFormsearch().down("[name=unit_number]").setValue("");
			// 	}
			// },
			// 'progressunitformsearch [name=spk_id]': {
			// 	select: function (el, val) {

			// 		me.getFormsearch().down("[name=unit_number]").setValue("");
			// 	}
			// },
			// 'progressunitformsearch [name=unit_number]': {
			// 	blur: function (el, val) {
			// 		me.getFormsearch().down("[name=cluster_id]").setValue('999');
			// 		me.getFormsearch().down("[name=block_id]").setValue('999');
			// 		me.getFormsearch().down("[name=spk_id]").setValue('999');
			// 	}
			// },

			//added by anas 24022021
			'progressunitformdatagallery button[action=downlaod]': {
				click: function (el, val) {
					me.actionDownload();
				}
			},
			//addby anas 09072021
			'progressunitgrid toolbar button[action=add_survey]': {
				click: function () {
					me.instantWindow('FormDataSurvey', 350, 'Hasil Survey', "create", 'myWindow');
				}
			},
			'progressunitformdatasurvey': {
				afterrender: this.formDataSurveyAfterRender
			},
			'progressunitformdatasurvey button[action=save]': {
				click: me.detailFormSurvey.save
			},
			'progressunitformdatasurvey button[action=cancel]': {
				click: function(){
					if(me.getFormdatasurvey().down('[name=flag_form]').getValue() == 'order_bangun'){
						me.getGrid().getStore().reload();
					}
				}
			},
			//end added by anas
		});

		if (typeof moment !== 'function') {
			Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/moment.min.js', function () {
			}, function () {
			});
		}
	},
	// gridActionColumnAfterRender: function(el) {
 //        var me = this;
 //        console.log(me.getGrid().getStore());
 //        var actitem = el.items;
 //        Ext.each(actitem, function(item, index) {
 //        	console.log(item, index)
 //         // item.getClass = function() {
         
 //         // if (me.rights[item.action]) {
 //         // return 'ux-actioncolumn ' + item.defaultIcon + ' act-' + item.action;
 //         // } else {
 //         // return 'x-hide-display';
 //         // }
 //         // };
         
 //         });


 //    },
	gridAfterRender: function (el) {
		this.callParent(arguments);

		var me = this,
			grid = me.getGrid();

		// grid.getSelectionModel().checkOnly = true;
		// console.log(grid.getSelectionModel())
			// row  = grid.getSelectionModel();

		// var store = me.getGrid().getStore();
		// console.log(me.getGrid().down("#actioncolumn"))
		// var me = this;
		// var actitem = el.items.items;

			// console.log(me.getGrid().getView())
		// Ext.each(actitem, function (item, index) {
			// item.getClass = function () {
				// if (index == 0) {
				// 	return 'ux-actioncolumn ' + 'icon-edit' + ' act-' + 'PencairankprUpdate';
				// }
				// if (index == 1) {
				// 	return 'ux-actioncolumn ' + 'icon-delete' + ' act-' + 'PencairankprDelete';
				// }
			// };
		// });
	},
	jqueryBinding : function (store, records, options) {
		this.checkboxInlineEdit('is_orderbangun');
	},
	checkboxInlineEdit : function (name) {
		var me = this;

		Ext.select('[name=' + name + ']').on('change', function(a,b) {
			var isChecked = this.checked,
				unit_id   = b.dataset.unit_id;

			if(name == 'is_orderbangun'){
				var formTools = new Erems.library.Detailtool();
				formTools.setConfig({
					viewPanel        : 'FormDataSurvey',
					parentFDWindowId : me.getGrid().up('window').id,
					controllerName   : me.controllerName
				});
				formTools.form().show('create', 350, 'Change Order Bangun');

				var fData = formTools.form().getForm();

				fData.setHeight(190);
				fData.down('[name=nilai_survey]').destroy();
				fData.down('[name=nilai_survey_nps]').destroy();
				fData.down('[name=unit_id]').setValue(unit_id);
				fData.down('[name=flag_form]').setValue('order_bangun');
		        fData.add({
					xtype : 'hiddenfield',
					name  : 'is_order_bangun',
					value : (isChecked ? 1 : 0)
		        });
		        fData.add({
					xtype      : 'xnotefieldEST',
					name       : 'notes',
					allowBlank : false,
					fieldLabel : 'Notes<br>' + (isChecked ? 'Checked' : 'Unchecked'),
					labelWidth : 40,
					width      : '100%',
					height     : 100
		        });
			}
		});
	}, 
	searchClusterOnSelect: function () {
		var me = this;
		var f = me.getFormsearch();
		var clusterId = me.tools.intval(f.down("[name=cluster_id]").getValue());

		f.down("[name=block_id]").getStore().filterBy(function (rec, id) {
			return true;
		});
		f.down("[name=block_id]").setValue("");

		if (clusterId != 999) {
			f.down("[name=block_id]").getStore().filterBy(function (rec, id) {
				if (me.tools.intval(rec.raw.block_id) === 999) {
					return true;
				}

				if (rec.raw.cluster_cluster_id === clusterId) {
					return true;
				} else {
					return false;
				}
			});
		}
		f.down("[name=block_id]").setValue('999');
	},
	formDataAfterRender: function (el) {
		var state = el.up('window').state;
		//console.log("[WINDOW STATE] " + state);
		var me = this;
		me.fdar().init();

		if (state == 'create') {
			me.fdar().create();
		} else if (state == 'update') {
			me.fdar().update();
		} else if (state == 'generateSelection') {
			me.fdar().generateSelection();
		} else if (state == 'generateAll') {
			me.fdar().generateAll();
		}

		//console.log(me.getFormdata());
		//  console.log(me.getFormdata().getBox().x);
		//   console.log(me.getFormdata().getBox().y);

		//me.getFormdata().down("#spkInformationIDPUPanel").setPosition(me.getFormdata().getBox().x,me.getFormdata().getBox().y);
		//  me.getFormdata().down("[myId=spkInformationIDPUPanel]").setPosition(30,30);
		me.getFormdata().down("[myId=spkInformationIDPUPanel]").el.setStyle({position: 'fixed', zIndex: 1000, padding: '0 0 0 0', background: 'none'});
	},
	gridTargetAfterRender: function (grid) {
		var me = this;
		grid.on('edit', function (editor, e) {
			e.record.commit();
			console.log(e.record.data);
			grid.setLoading("Please wait...");
			var p = e.record.data;
			p['unit_id'] = 0;
			p['spk_id'] = 0;
			me.tools.ajax({
				params: p,
				success: function (data, model) {

					grid.setLoading(false);

				}
			}).read('updatetarget');
		});
	},
	generateTarget: function () {
		var me = this;
		var f = me.getFormdata();

		/*
		 var buildingClass = f.down("[name=type_building_class]").getValue();
		 if (buildingClass === "RS") {
		 //go
		 } else if (buildingClass === "RE") {
		 //go
		 } else {
		 me.tools.alert.warning("Building Class (RE/RS) tidak terdefinisi. Mohon cek Master Type.");
		 console.log("Building class undefined. Defined: "+buildingClass);
		 throw Error("Building class undefined.");
		 }
		 
		 */

		f.setLoading("Please wait...");
		me.tools.ajax({
			params: {
				spk_id: f.down("[name=spk_spk_id]").getValue(),
				unit_id: f.down("[name=unit_unit_id]").getValue(),
			},
			success: function (data, model) {
				console.log(data);
				var hasil = data['others'][0][0]['STATUS'];
				if (hasil.length == 0) {
					me.tools.alert.warning("Generate kosong, <br>batasan plafon belum ditentukan");
				}
				f.setLoading(false);
				if (!hasil) {
					me.tools.alert.warning("Failed. Please try again");
				} else {
					me.loadTargetList();
				}

			}
		}).read('generatetarget');
	},
	insActionColumnClick: function (view, cell, row, col, e) {
		var m = e.getTarget().className.match(/\bact-(\w+)\b/);
		if (m) {
			this.insACC(view, m[1], row);
		}
	},
	deleteImageFromGrid: function (row) {
		console.log("delete...");
		var me = this;
		var gu = me.getGridimage();
		var id = me.tools.intval(gu.getStore().getAt(row).get("constructionpicture_id"));
		if (id > 0) {

			me.tools.gridHelper(me.getGriddetail()).maindetailUpdateDeletedRows(me.getFormdatadetail(), gu.getStore().getAt(row).get("constructionpicture_id"));
		}
		gu.getStore().removeAt(row);
	},
	panelAfterRender: function (configs) {
		this.callParent(arguments);

		var me = this, p = me.getPanel(), grid = me.getGrid();

		me.tools.ajax({
			params  : {},
			success : function (data, model) {
				if (data['others'][0][0]['GENERATE_TARGET'] == 1) {
					grid.down('#btnGenerateTargetKonstruksi').setDisabled(false);
					grid.down('#btnGenerateTargetKonstruksi').setVisible(true);
				}

				if (data['others'][0][0]['UPDATE_PROGRESS'] == 1) {
					grid.down('#btnUpdateDetailProgress').setDisabled(false);
					grid.down('#btnUpdateDetailProgress').setVisible(true);
				}

				//added by anas 09072021
				if (data['others'][0][0]['surveyConfig'] == 1) {
					grid.down('#btnSurvey').setVisible(true);
					grid.down('#nilai_survey').setVisible(true);
					grid.down('#nilai_survey_nps').setVisible(true);
				}
				//end added by anas

				// added by rico 27082022
				me.editConfig = data['others'][0][0]['editConfig'];

				me.usePicProgressCPMS = data['others'][0][0]['ISUSEPICCPMS']

				if (data['others'][0][0]['VisibleOrderBangun'] == 1) {
					grid.down('#is_orderbangun').setVisible(true);
				}
			}
		}).read('detail');

		/// testing Mustache
		/* 
		 console.log("testing mustache");
		 
		 $.getScript("app/erems/uploads/mustache/mustache.js", function() {
		 
		 
		 // Here you can use anything you defined in the loaded script
		 
		 
		 
		 
		 
		 $.get("app/erems/email_template/test.html", function(data) {
		 
		 var person = {
		 firstName: "Christophe",
		 lastName: "Coenraets",
		 blogURL: "http://coenraets.org",
		 name:"Tommy"
		 };
		 
		 
		 var template = data;
		 var html = Mustache.to_html(template, person);
		 
		 p.removeAll();
		 p.add({
		 html: html
		 });
		 
		 p.doComponentLayout();
		 
		 });
		 
		 
		 
		 
		 });
		 
		 
		 
		 return;
		 
		 /// end testing Mustache
		 
		 */
		//me.tools.wesea(data.scheduletype, f.down("[name=scheduletype]")).comboBox();

		var gm = me.getGridmaindetail();
		gm.doInit();
		/* set spklist store*/
		me.localStore.spkList = me.instantStore({
			id          : me.controllerName + 'SpkList',
			extraParams : { mode_read : 'listspk' }
		});

		/* set unitinfo store*/
		me.localStore.unitInfo = me.instantStore({
			id          : me.controllerName + 'UnitInfo',
			extraParams : {
				mode_read: 'unitinfo'
			}
		});

		me.localStore.mainConstruction = me.instantStore({
			id: me.controllerName + 'MainConstruction',
			extraParams: {
				mode_read: 'maindetail'
			}
		});

		me.localStore.images = me.instantStore({
			id: me.controllerName + 'ImagesGallery',
			extraParams: {
				mode_read: 'picture'
			}
		});

		p.setLoading("Please wait,loading components..");
		me.tools.ajax({
			params: {
				unit_id: 0
			},
			success: function (data, model) {

				me.tools.wesea({
					data: data,
					model: model
				}, gm).grid();





				p.setLoading("Please wait,loading  unitinformation components..");
				me.localStore.unitInfo.load({
					params: {
						unit_id: 0
					},
					callback: function (recui, opui) {
						me.attachModel(opui, me.localStore.unitInfo, false);
						p.setLoading("Please wait,loading spklist components..");
						me.localStore.spkList.load({
							params: {
								spk_id: 0
							},
							callback: function (recsl, opsl) {
								me.attachModel(opsl, me.localStore.spkList, false);
								p.setLoading("Please wait,loading detail components..");
								me.localStore.mainConstruction.load({
									params: {
										construction_id: 0
									},
									callback: function (recmc, opmc) {
										me.attachModel(opmc, me.localStore.mainConstruction, false);
										p.setLoading("Please wait,loading images components..");
										me.localStore.images.load({
											params: {},
											callback: function (recim, opim) {
												me.attachModel(opim, me.localStore.images, false);

												/// load form search data
												me.tools.ajax({
													params: {
														unit_id: 0
													},
													success: function (data, model) {
														// console.log(data);
														me.fillFormSearchComponents(data, me.getFormsearch());

														var gp = data.others[0][0]['GLOBALPARAMSPARAMS'];
														if (gp['PROGRESS_SEND_MAIL']) {
															me.isSendMail = me.tools.intval(gp['PROGRESS_SEND_MAIL']);
														}
														p.setLoading(false);
														p.up("window").maximize();
													}
												}).read('detail');


												/// attach showGallery method to maingriddetail
												var gmd = me.getGridmaindetail();

												gmd.showGallery = function (row) {
													me.galleryShow(gmd.getStore(), row, 'spkunit');
												};


											}
										});


									}
								});


							}
						});

					}
				});

			}
		}).read('listspk');

		grid.store.on('load', function (store, records, options) {
			me.jqueryBinding(store, records, options);
		});
	},
	saveAJax: function (pos) {
		var me = this;
		var f = me.getFormdata();


		var pengawas_id = f.down("[name=employee]").getValue();
		var rb1 = f.down("[name=rb1]").getValue();
		var rb2 = f.down("[name=rb2]").getValue();
		var rb3 = f.down("[name=rb3]").getValue();
		var rb4 = f.down("[name=rb4]").getValue();
		var rb5 = f.down("[name=rb5]").getValue();

		var serahterima1_value = f.down("[name=serahterima1_date]").getValue();
		if (serahterima1_value != null) {
			serahterima1_value = new Date(serahterima1_value);
		} else {
			serahterima1_value = null;
		}
		var serahterima1 = serahterima1_value;

		var serahterima2_value = f.down("[name=serahterima2_date]").getValue();
		if (serahterima2_value != null) {
			serahterima2_value = new Date(serahterima2_value);
		} else {
			serahterima2_value = null;
		}
		var serahterima2 = serahterima2_value;

		var note = f.down("[name=description2]").getValue();
		var spkid = f.down("[name=spk_spk_id]").getValue();
		var unitid = f.down("[name=unit_unit_id]").getValue();
		var is_holdteknik = f.down("[name=is_holdteknik]").getValue();
		var notes_holdteknik = f.down("[name=notes_holdteknik]").getValue();

		if ((is_holdteknik && notes_holdteknik != '') || is_holdteknik == false) {
			f.setLoading("Saving ...");
			me.tools.ajax({
				params: {
					pengawas_id: pengawas_id,
					rb1: rb1,
					rb2: rb2,
					rb3: rb3,
					rb4: rb4,
					rb5: rb5,
					serahterima1: serahterima1,
					serahterima2: serahterima2,
					note: note,
					spkid: spkid,
					unitid: unitid,
					is_holdteknik: is_holdteknik,
					notes_holdteknik: notes_holdteknik
				},
				success: function (data, model) {

					var msg = data['others'][0][0]['MSG'];
					var st = data['others'][0][0]['STATUS'];

					if (st == "true") {
						Ext.Msg.show({
							title: 'Info',
							msg: msg,
							icon: Ext.Msg.INFO,
							buttons: Ext.Msg.OK,
							fn: function () {

							}
						});
					}
					me.getFormdata().up("window").close();
					f.setLoading(false);


				}
			}).read('savepengawas');
		} else {
			me.tools.alert.warning("Notes Hold Teknik required!");
		}
	},
	fillFormSearchComponents: function (data, form) {
		var me = this;
		me.tools.wesea(data.cluster, form.down("[name=cluster_id]")).comboBox(true);
		me.tools.wesea(data.block, form.down("[name=block_id]")).comboBox(true);
		me.tools.wesea(data.spk, form.down("[name=spk_id]")).comboBox(true);
	},
	progressunitformsearchAfterRender: function () {

		var me = this;
		var z = {
			do: function () {
				var ar = ['cluster_id', 'block_id', 'unit_id', 'spk_id'];
				/*@model name*/
				var arx = ['cluster', 'block', 'unit', 'spk'];
				for (var x in ar) {
					var y = me.getFormsearch().down("[name='" + ar[x] + "']");

					y.createStore(me, arx[x]);
					y.getStore().load();
				}
			}
		};

		if (this.acmoDone) {
			z.do();
		} else {
			this.acmoArrayFuncs.push(z);
		}
	},
	gridSelectionChange: function () {
		/* old code*/
		var me 	 = this,
			grid = me.getGrid(), 
			row  = grid.getSelectionModel().getSelection(),
			rec = grid.getSelectionModel().getSelection()[row.length-1];
			// rec  = grid.getSelectedRecord();

		grid.down('#btnEdit').setDisabled(row.length != 1);
		grid.down('#btnGenerateTargetKonstruksi').setDisabled(row.length == 0);
		grid.down('#btnUpdateDetailProgress').setDisabled(row.length == 0);

		//added by anas 09072021
		grid.down('#btnSurvey').setDisabled(row.length != 1);

		//grid.down('#btnDelete').setDisabled(row.length < 1);
		/* new code*/

		var title = 'Detail Progress';
		if (typeof rec !== "undefined") {
			title = title + ' <b>' + rec.get("unit_number") + '</b>';

			grid.setDisabled(true);
			var store = me.getGridmaindetail().getStore();
			//store.getProxy().setExtraParam("unit_id", rec.get("unit_id"));
			/* store.load({
			 params:{
			 unit_id:rec.get("unit_id")
			 },
			 callback: function() {
			 me.getGrid().setDisabled(false);
			 }
			 });*/
			me.tools.ajax({
				params: {
					page    : 'mainDetail',
					unit_id : rec.get("unit_id"),
					spk_id  : rec.get("spk_spk_id")
				},
				success: function (data, model) {
					me.tools.wesea({
						data  : data,
						model : model
					}, me.getGridmaindetail()).grid();

					grid.setDisabled(false);
				}
			}).read('constructionspkunit');
		}
		else{
			me.tools.wesea({
				data  : [],
				model : []
			}, me.getGridmaindetail()).grid();

			grid.setDisabled(false);
		}

		me.getPanel().down('#detailProgress').setTitle(title);
	},
	selectSPKFromList: function () {
		var me = this;
		var rec = me.getGridspk().getSelectedRecord();
		if (typeof rec === "undefined") {
			Ext.Msg.alert("Alert", "Select 1 SPK First");
			// me.getFormdataspk().up("window").close();
		} else {
			me.fillSpkInfo(rec.index);
			// me.fillUnitInfo(id);
			me.currentSpkPos = rec.index;
			me.updatePageInfo();
			me.getFormdataspk().up("window").close();
		}
	},
	insACC: function (view, action, row) {
		var me = this;
		var grid = view.up("grid");
		var store = grid.getStore();

		switch (grid.itemId) {
			case "ProgressGridDetail":
				if (action == "destroy") {
					var rec = store.getAt(row);
					var f = me.getFormdata();
					f.setLoading("Deleting record...");
					me.tools.ajax({
						params: {construction_id: rec.get("construction_id")},
						success: function (data, model) {

							var statusDelete = data.others[0][0]['STATUS'];

							if (statusDelete) {
								me.tools.alert.info(data.others[0][0]['MSG']);
								store.removeAt(row);
								me.loadTargetCair(me.getv("unit_unit_id"), me.getv("spk_spk_id"));
								me.refreshGridDetail(me.getv("spk_spk_id"), me.getv("unit_unit_id"));
							} else {
								me.tools.alert.error(data.others[0][0]['MSG']);
							}
							f.setLoading(false);


						}
					}).read('deleteprogress');


				} else if (action == "update") {
					me.showFormDetail('update', row);

				} else if (action == "gallery") {
					me.galleryShow(store, row);
				}
				break;
			case "ProgressGridImage":
				if (action == "destroy") {
					//  me.deleteDetailInMaster(me.getGriddetail(), me.getGridimage(), row, me.getFormdatadetail().down("[name=construction_id]").getValue());
					var confirmmsg = 'Delete Data..?? ?';
					Ext.Msg.confirm('Delete Data..??', confirmmsg, function (btn) {
						if (btn == 'yes') {
							me.deleteImageFromGrid(row);
						}
					});
				} else if (action == "update") {
					me.showFormImage('update');
					var form = me.getFormdataimage();
					var rec = store.getAt(row)
					form.loadRecord(rec);
					form.editedRow = row;
					form.down('#photo_image').el.setStyle({backgroundImage: 'url(' + me.imageFolder + rec.get("images") + ')', backgroundSize: '130px 150px'});
					me.getFormdataimage().down("#photo_image").show();
				}
				break;
			case "ProgressMainDetailGrid":
				if (action === "view") {
					me.galleryShow(store, row);
				}
				break;
		}
	},
	galleryShow: function (store, row, mode) {
		var me = this;
		me.showFormGallery();
		var m = typeof mode === 'undefined' ? 'construction' : 'spkunit';
		var p = {
			construction_id: store.getAt(row).get("construction_id"),
			mode: m
		};
		if (m === "spkunit") {
			p["spk_id"] = store.getAt(row).get("spk_id");
			p["unit_id"] = me.getGrid().getSelectedRecord().get("unit_id");
		}

		//// Added by erwin.st 28052021
		me.localStore.imagesApi = new Array;

		me.localStore.images.load({
			params: p,
			callback: function (rec) {

				if (me.usePicProgressCPMS == 0) {
					me.currentImgPos = 0;
					me.updateGalleryPageInfo();
					me.fillGalleryInfo();
				} else {
					//// Added by erwin.st 28052021
					me.tools.ajax({
						params: {unit_id: me.getGrid().getSelectedRecord().get("unit_id")},
						success: function (data, model) {
							if (typeof data !== 'undefined') {
								var arrImg = new Array;
								data.filter(function (i) {
									i.foto_tahapan.filter(function (x) {
										arrImg.push(x);
									});
								});

								me.localStore.imagesApi = arrImg;
							}

							me.currentImgPos = 0;
							me.updateGalleryPageInfo();
							me.fillGalleryInfo();
						}
					}).read('pictureapi');
				}

			}
		});
	},
	//picturespkunit
	mainDataSave: function () {
		var me = this;
		var f = me.getFormdata();
		var statusSPK = f.down("[name=status]").getValue();
		if (statusSPK != "OPEN") {
			me.tools.alert.warning("SPK '" + f.down("[name=spk_no]").getValue() + "' harus berstatus OPEN untuk melanjutkan proses.");
			return;
		}
		me.insSave({
			form: me.getFormdatadetail(),
			grid: me.getGriddetail(),
			store: me.localStore.mainConstruction,
			finalData: function (data) {
				data['spk_spk_id'] = me.getv("spk_spk_id");
				data['unit_unit_id'] = me.getv("unit_unit_id");
				data['progressdetail'] = me.tools.gridHelper(me.getGridimage()).getJson();

				data['purchaseletter_purchaseletter_id'] = me.getGrid().getSelectedRecord().get("purchaseletter_purchaseletter_id");
				if (me.getFormdatadetail().editedRow > -1) {
					data['deletedRows'] = me.getGriddetail().getStore().getAt(me.getFormdatadetail().editedRow).get("deletedRows");

				}
				return data;
			},
			sync: true,
			callback: {
				create: function (store, form, grid) {

					me.loadTargetCair(me.getv("unit_unit_id"), me.getv("spk_spk_id"));
					me.refreshGridDetail(me.getv("spk_spk_id"), me.getv("unit_unit_id"));
				},
				update: function (store, form, grid) {
					me.loadTargetCair(me.getv("unit_unit_id"), me.getv("spk_spk_id"));
					me.refreshGridDetail(me.getv("spk_spk_id"), me.getv("unit_unit_id"));
					// me.getGridcair().getStore().loadPage(1);
				}
			}
		});
	},
	imageDataSave: function () {
		var me = this;
		var file = me.getFormdataimage().down("[name=images]").getValue();
		var photoBrowse = me.getFormdataimage().down("[name=photo_browse]").getValue();
		if (photoBrowse.length > 0) {
			me.uploadImage({
				form: me.getFormdataimage(),
				callback: {
					success: function (imageName) {
						var store = me.getGridimage().getStore();
						var data = {
							images: imageName,
							description: me.getFormdataimage().down("[name=description]").getValue()
						};
						if (me.getFormdataimage().editedRow > -1) {
							var rec = store.getAt(me.getFormdataimage().editedRow);
							rec.beginEdit();
							rec.set(data);
							rec.endEdit();
						} else {
							me.getGridimage().getStore().add(data);
						}
						me.getFormdataimage().up("window").close();

					},
					failure: function () {

					}
				}
			});
		}
		if (file.length > 0 && photoBrowse.length == 0) {

			var store = me.getGridimage().getStore();
			var rec = store.getAt(me.getFormdataimage().editedRow);
			rec.beginEdit();
			rec.set({description: me.getFormdataimage().down("[name=description]").getValue()});
			rec.endEdit();

			me.getFormdataimage().up("window").close();
		}

	},
	showFormDetail: function (state, rowGrid) {
		var s = typeof state === "undefined" ? "create" : state;
		var row = typeof rowGrid === "undefined" ? -1 : rowGrid;
		var me = this;

		var gd = me.getGriddetail();


		// added 12 Maret 2015
		// check list batasan plafon

		if (me.getGridtarget().getStore().getCount() === 0) {
			me.tools.alert.warning("Please generate contruction target first");
			return;
		}

		/// check jika sudah ada progress 100 %  di grid, maka tidak boleh input
		if (s === "create") {
			var maxProgress = 0;
			var gds = gd.getStore();
			gds.each(function (rec) {

				if (rec != null) {
					if (me.tools.intval(rec.get("progress_persen")) > maxProgress) {
						maxProgress = rec.get("progress_persen");
					}
				}

			});
			if (maxProgress >= 100) {
				me.tools.alert.warning("Progress sudah 100%");
				return;

			}
		}
		// end check

		me.instantWindow('FormDataDetail', 500, 'Detail Progress', s, 'myWindow');
		var f = me.getFormdatadetail();
		var fm = me.getFormdata();

		var gi = me.getGridimage();
		gi.doInit();


		//// set unit information
		var arf = ['unit_unit_number', 'cluster_code', 'block_code', 'cluster_cluster', 'block_block'];
		for (var i in arf) {
			f.down("[name=" + arf[i] + "]").setValue(fm.down("[name=" + arf[i] + "]").getValue());
		}


		f.down("[name=send_mail]").setDisabled(me.isSendMail === 1 ? false : true);

		f.down("[name=spk_spk_no]").setValue(fm.down("[name=spk_no]").getValue());


		if (s === "create") {




			f.setLoading("Please wait, loading image");
			me.tools.ajax({
				params: {
					construction_id: 0
				},
				success: function (gid, gim) {

					me.tools.wesea({
						data: gid,
						model: gim
					}, gi).grid();
					f.setLoading(false);


				}
			}).read('picture');

		} else {
			var form = me.getFormdatadetail();
			var rec = gd.getStore().getAt(row);
			form.loadRecord(rec);
			form.editedRow = row;

			f.setLoading("Please wait, loading image");
			me.tools.ajax({
				params: {
					construction_id: rec.get("construction_id")
				},
				success: function (gid, gim) {

					me.tools.wesea({
						data: gid,
						model: gim
					}, gi).grid();
					f.setLoading(false);


				}
			}).read('picture');
		}
	},
	showFormImage: function (state) {
		var me = this;



		var s = typeof state === "undefined" ? "create" : state;

		me.instantWindow('FormDataImage', 500, 'Picture', s, 'myWindowImage');
		if (s === "create") {
			me.getFormdataimage().down("#photo_image").hide();
		} else {


		}

	},
	showFormGallery: function (state) {
		var s = typeof state === "undefined" ? "create" : state;
		var me = this;
		me.instantWindow('FormDataGallery', 500, 'Construction Progress', s, 'myWindowGallery');
		if (s === "create") {

		} else {


		}

	},
	showFormSpk: function (state) {
		var s = typeof state === "undefined" ? "create" : state;
		var me = this;
		me.instantWindow('FormDataSpk', 500, 'SPK List', s, 'myWindowSpk');
		if (!me.storeExist(me.getGridspk().getStore())) {
			me.getGridspk().createStore(me, 'ProgressSPKStore', 'spk_id');
			me.nomBindingModel('spk', me.getGridspk().getStore());
		}
		var jumlah = me.localStore.spkList.getCount();
		for (var i = 0; i < jumlah; i++) {
			me.getGridspk().getStore().add(me.localStore.spkList.getAt(i));
		}

		if (s === "create") {

		} else {


		}
	},
	unitOnSelect: function () {
		var me = this;
		var f = me.getFormdata();
		var id = me.tools.intval(f.down('[name=unit_unit_id]').getValue());
		me.getActiveForm().up('window').body.mask('Loading data, please wait...');
		me.getGriddetail().getStore().loadData([], false);

		if (me.localStore.spkList != null) {
			me.localStore.spkList.getProxy().setExtraParam("unit_id", id);
			me.localStore.spkList.load({
				callback: function (rec) {

					if (me.localStore.spkList.getCount() > 0) {

						me.getGriddetail().setDisabled(false);
						me.refreshGridDetail(me.localStore.spkList.getAt(0).get("spk_id"), id);

						me.fillSpkInfo(0);
						me.fillUnitInfo(id);
						me.currentSpkPos = 0;
						me.updatePageInfo();

					} else {
						Ext.Msg.alert("Alert", "No SPK for this unit");
						me.getActiveForm().up('window').body.unmask();
						me.getActiveForm().up('window').close();
					}


				}
			});
		} else {
			console.log("[Error] spk list store null");
		}
	},
	refreshGridDetail: function (spkId, unitId) {
		var me = this;
		var f = me.getFormdata();
		var gpgd = me.getFormdata().down("#ProgressGridDetail");
		f.setLoading("Please wait, refresh construction list...");
		var gd = me.getGriddetail();
		gd.getStore().getProxy().setExtraParam("spk_id", spkId);
		gd.getStore().getProxy().setExtraParam("unit_id", unitId);
		gd.doInit();
		gd.getStore().load({
			callback: function (rec, op) {
				gd.attachModel(op);
				f.setLoading(false);
			}
		});
		/*
		 me.tools.ajax({
		 params: {
		 spk_id: spkId,
		 unit_id: unitId
		 },
		 success: function(gpgdd, gpgdm) {
		 
		 me.tools.wesea({
		 data: gpgdd,
		 model: gpgdm
		 }, gpgd).grid();
		 f.setLoading(false);
		 
		 
		 }
		 }).read('constructionspkunit');
		 */
	},
	fillUnitInfo: function (unitId) {
		var me = this;
		if (me.localStore.unitInfo != null) {
			me.localStore.unitInfo.load({
				params: {
					unit_id: unitId
				},
				callback: function (rec) {

					if (typeof rec === 'object') {
						rec = me.localStore.unitInfo.getAt(0);
						me.getFormdata().loadRecord(rec);
						if (rec.get("unitstatus_unitstatus_id") == 3 || rec.get("unitstatus_unitstatus_id") == 16) {
							me.getFormdata().down("[name=is_holdteknik]").setReadOnly(false);
						}

						if (rec.get("is_holdteknik") == 1) {
							me.getFormdata().down("[name=notes_holdteknik]").setReadOnly(false);
						}
					}


				}
			});
		} else {
			console.log("[Error] unit info store null");
		}
	},
	fillSpkInfo: function (pos) {
		var me = this;
		var rec = me.localStore.spkList.getAt(pos);

		me.getActiveForm().loadRecord(rec);
		me.setv("spk_spk_id_display", rec.get("spk_id"));
		me.setv("spk_spk_id", rec.get("spk_id"));
		// console.log(rec);
		me.setv("contractor_contractorname2", rec.get("contractor_contractorname"));
		me.setv("spk_no2", rec.get("spk_no"));

		var serahterima1_date = rec.get("spkdetail_serahterima1_date");
		if (serahterima1_date != "") {
			serahterima1_date = new Date(serahterima1_date);
		} else {
			serahterima1_date = "";
		}
		me.setv("serahterima1_date", serahterima1_date);

		var serahterima2_date = rec.get("spkdetail_serahterima2_date");
		if (serahterima2_date != "") {
			serahterima2_date = new Date(serahterima2_date);
		} else {
			serahterima2_date = "";
		}
		me.setv("serahterima2_date", serahterima2_date);

		me.setv("description2", rec.get("spkdetail_note"));
		me.setv("employee", rec.get("spkdetail_pengawas_id"));
		me.setv("rb1", rec.get("spkdetail_rubah_design"));
		me.setv("rb2", rec.get("spkdetail_berita_acara"));
		me.setv("rb3", rec.get("spkdetail_gambar"));
		me.setv("rb4", rec.get("spkdetail_jadwal"));
		me.setv("rb5", rec.get("spkdetail_sik"));

		/* load construction list*/
		var detailStore = me.getGriddetail().getStore();
		//  detailStore.getProxy().setExtraParam("unit_id", me.getv("unit_unit_id"));
		// detailStore.getProxy().setExtraParam("spk_id", me.getv("spk_spk_id"));
		detailStore.load({
			params: {
				unit_id: me.getv("unit_unit_id"),
				spk_id: me.getv("spk_spk_id")
			},
			callback: function (recb) {


				me.loadTargetCair(me.getv("unit_unit_id"), me.getv("spk_spk_id"));

				// load detail progress
				var gd = me.getGriddetail();
				gd.getStore().getProxy().setExtraParam("spk_id", me.getv("spk_spk_id"));
				gd.getStore().getProxy().setExtraParam("unit_id", me.getv("unit_unit_id"));
				gd.getStore().load();


				me.getActiveForm().up('window').body.unmask();
			}
		});
	},
	loadTargetCair: function (unitId, spkId) {



		var me = this;
		var gt = me.getGridtarget();
		var gc = me.getGridcair();

		gt.getStore().load({
			params: {
				//state:"load_default_attribute"
				unit_id: unitId,
				spk_id: spkId
			},
			callback: function (rec, op) {

				gt.attachModel(op);
			}
		});
		gc.getStore().load({
			params: {
				//state:"load_default_attribute"
				unit_id: unitId,
				spk_id: spkId
			},
			callback: function (rec, op) {
				gc.attachModel(op);
			}
		});

	},
	loadTargetList: function () {
		var me = this;
		var f = me.getFormdata();
		var spkDate = f.down("[name=started]").getValue();
		//var spkDate = f.down("[name=spk_date]").getValue();

		var buildingClass = f.down("[name=type_building_class]").getValue();
		var gt = me.getGridtarget().getStore();
		gt.getProxy().setExtraParam('unit_id', f.down("[name=unit_unit_id]").getValue());
		gt.getProxy().setExtraParam('spk_id', f.down("[name=spk_spk_id]").getValue());

		gt.loadPage(1, {
			callback: function (rec, operation, success) {
				gt.each(function (rec) {
					console.log(rec);
					var targetHari = 0;
					if (buildingClass === "RS") {
						targetHari = me.tools.intval(rec.get("batasplafon_target_RS"));
					} else if (buildingClass === "RE") {
						targetHari = me.tools.intval(rec.get("batasplafon_target_RE"));
					} else {
						Ext.Msg.show({
							title: "Info",
							msg: "Generate gagal karena building class belum terpilih RE/RS di Master Type.",
							closable: !0,
							icon: Ext.Msg.INFO,
							buttons: Ext.Msg.OK
						});
						return 0;
					}

					//console.log("buildingClass " + buildingClass);
					//console.log("ini hari " + targetHari);
					//  console.log(spkDate);

					//console.log(newDate.format("YYYY-MM-DD"));
					var newDate2 = new Date();
					var newDate = moment(spkDate).add(targetHari, 'days');
					newDate2.setFullYear(newDate.format("YYYY"));
					newDate2.setDate(newDate.format("DD"));
					newDate2.setMonth(newDate.format("MM") - 1);
					rec.beginEdit();
					rec.set({
						target_date: newDate2

					});
					rec.endEdit();



					/// update target
					var p = rec.data;
					p['unit_id'] = 0;
					p['spk_id'] = 0;
					me.tools.ajax({
						params: p,
						success: function (data, model) {
							//   console.log(p);

							//   grid.setLoading(false);

						}
					}).read('updatetarget');

				});


			}
		});
	},
	moveSpkList: function (mode) {
		var me = this;
		var pos = me.currentSpkPos;
		var totalRec = me.localStore.spkList.getCount();
		if (mode === 'next') {
			if (pos < totalRec) {
				pos++;
			}

		} else {
			if (pos > 0) {
				pos--;
			}

		}

		me.currentSpkPos = pos;
		me.updatePageInfo();
		me.fillSpkInfo(pos);
	},
	updatePageInfo: function () {
		var me = this;
		var totalRec = me.localStore.spkList.getCount();
		var page = me.currentSpkPos + 1;
		var form = this.getFormdata();
		page = page > totalRec ? totalRec : page;

		if (page == totalRec && page <= 1) {
			form.down('#previousButton').setDisabled(true);
			form.down('#nextButton').setDisabled(true);
		} else if (page <= 1) {
			form.down('#previousButton').setDisabled(true);
			form.down('#nextButton').setDisabled(false);
		} else if (page >= totalRec) {
			form.down('#previousButton').setDisabled(false);
			form.down('#nextButton').setDisabled(true);
		}

		form.down('#spkPageInfo').setText("Page " + (page) + " of " + totalRec);
	},
	moveImagesList: function (mode) {
		var me = this;
		var totalRec = me.localStore.images.getCount();

		//// Added by erwin.st 28052021
		totalRec += me.localStore.imagesApi.length;

		if (mode === "next" && me.currentImgPos < totalRec) {
			me.currentImgPos++;
		} else {
			if (me.currentImgPos > 0) {
				me.currentImgPos--;
			}

		}
		me.updateGalleryPageInfo();
		me.fillGalleryInfo();

	},
	updateGalleryPageInfo: function () {
		var me = this;
		var currentPage = me.currentImgPos;
		var totalRec = me.localStore.images.getCount();

		//// Added by erwin.st 28052021
		totalRec += me.localStore.imagesApi.length;

		var page = currentPage + 1;
		page = page > totalRec ? totalRec : page;
		me.getFormdatagallery().down('#galleryPageInfo').setText("Page " + page + " of " + totalRec);

	},
	fillGalleryInfo: function () {
		var me = this;
		var index = me.currentImgPos;
		var rec = me.localStore.images.getAt(index);
		var form = me.getFormdatagallery();
		if (typeof rec !== "undefined") {
			form.down('#photo_image').el.setStyle({backgroundImage: 'url(' + me.imageFolder + rec.get("images") + ')', backgroundSize: '300px 350px'});
			form.down('[name=description]').setValue(rec.get("description"));
		} else { //// Added by erwin.st 28052021

			var totalRec = me.localStore.images.getCount();
			totalRec += me.localStore.imagesApi.length;

			var totalRecNonApi = me.localStore.images.getCount();
			var totalRecApi = me.localStore.imagesApi.length;
			var idx = index - totalRecNonApi;

			if (idx < totalRecApi) {
				form.down('#photo_image').el.setStyle({backgroundImage: 'url(' + me.localStore.imagesApi[idx].url + ')', backgroundSize: '300px 350px'});
				form.down('[name=description]').setValue(me.localStore.imagesApi[idx].note);
			}
		}
	},
	fdar: function () {
		var me = this;
		var gt = me.getGridtarget();
		var gc = me.getGridcair();
		var f = me.getFormdata();
		var x = {
			init: function () {
				me.setActiveForm(f);

				var gd = me.getGriddetail();
				gd.doInit();
				gt.doInit();
				gc.doInit();
				me.getFormdata().down("#ProgressGridDetail").setDisabled(true);
			},
			create: function () {},
			update: function () {
				//semy
				me.tools.ajax({
					params: {},
					success: function (data, model) {
						me.tools.wesea(data.employee, f.down("[name=employee]")).comboBox();
					}
				}).read('processinit');

				var rec = me.getGrid().getSelectedRecord();
				me.getFormdata().down("[name=unit_unit_number]").setValue(rec.get("unit_number"));
				me.getFormdata().down("[name=unit_unit_id]").setValue(rec.get("unit_id"));
				me.getFormdata().down("[name=purchaseletter_purchaseletter_id]").setValue(rec.get("purchaseletter_purchaseletter_id"));
				me.unitOnSelect();
				me.getFormdata().down('[name=employee]').setDisabled(false);

				// added by rico 27092022
				var gd = me.getGriddetail();

				if ($.inArray(apps.gid, me.editConfig) == -1){
					gd.down("#actioncolumn").items.splice(1, 1);	  
				}

			},
			generateSelection: function () {
				// console.log('masuk fdar generateSelection');
			},
			generateAll: function () {
				// console.log('masuk fdar generateAll');
			}
		};
		return x;
	},
	nomFunctioninDataSearch: function () {
		var me = this;
		var grid = me.getGridmaindetail();
		if (!me.storeExist(grid.getStore())) {
			me.getGridmaindetail().createStore(me, me.controllerName + 'MainDetail', 'construction_id', {
				mode_read: "constructionspk"
			});

			var pt = grid.down("pagingtoolbar"); /// pagingtoolbar
			pt.bindStore(me.getGridmaindetail().getStore());
		}
		/* set images store for gallery*/
		me.localStore.images = me.instantStore({
			id: me.controllerName + 'ImagesGallery',
			extraParams: {
				mode_read: 'picture'
			}
		});

		var foo = {
			do: function () {
				me.nomBindingModel('contructionspk', me.getGridmaindetail().getStore());
				me.nomBindingModel('image', me.localStore.images);
			}
		};
		if (me.acmoDone) {
			foo.do();
		} else { /* jika tidak maka kita daftarkan function kita ke dalam antrian acmoArrayFunc*/
			this.acmoArrayFuncs.push(foo);
		}
	},
	showFormGenerateTargetKontruksi: function (state, rowGrid) {
		var me = this;

		me.instantWindow('FormDataGenerateTargetKontruksi', 650, 'Generate Target Konstruksi', "create", 'myWindow');
		var gridGenerate = me.getFormdatageneratetargetkontruksi(), grid = me.getGrid(), row = grid.getSelectionModel().getSelection();

		gridGenerate.down('#btnGenerateSelection').setDisabled(row.length == 0);
		var formsearch = me.getFormsearch();
		var y = me.tools.intval(formsearch.down("[name=cluster_id]").getValue());
		if (y != 999 && y != 0) {
			gridGenerate.down('#btnGenerateAll').setDisabled(false);
		} else {
			gridGenerate.down('#btnGenerateAll').setDisabled(true);
		}

		var y = me.tools.intval(formsearch.down("[name=spk_id]").getValue());
		if (y != 999 && y != 0) {
			gridGenerate.down('#btnGenerateAllSPK').setDisabled(false);
		} else {
			gridGenerate.down('#btnGenerateAllSPK').setDisabled(true);
		}
	},
	showFormUpdateDetailProgress: function (state, rowGrid) {
		var me = this;

		me.instantWindow('FormDataUpdateDetailProgress', 650, 'Update Detail Progress', "create", 'myWindow');
		var gridGenerate = me.getFormdataupdatedetailprogress(), grid = me.getGrid(), row = grid.getSelectionModel().getSelection();

		gridGenerate.down('#btnUpdateSelection').setDisabled(row.length == 0);
		var formsearch = me.getFormsearch();
		var y = me.tools.intval(formsearch.down("[name=cluster_id]").getValue());
		console.log(y);
		if (y != 999 && y != 0) {
			gridGenerate.down('#btnUpdateAll').setDisabled(false);
		} else {
			gridGenerate.down('#btnUpdateAll').setDisabled(true);
		}

		var y = me.tools.intval(formsearch.down("[name=spk_id]").getValue());
		if (y != 999 && y != 0) {
			gridGenerate.down('#btnUpdateAllSPK').setDisabled(false);
		} else {
			gridGenerate.down('#btnUpdateAllSPK').setDisabled(true);
		}
	},
	generateTargetSelected: function () {
		var me = this;
		var f = me.getFormdata();
		var gridTarget = me.getFormdatageneratetargetkontruksi();

		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
		// console.log(row);
		var unitCheck = '';
		for (var i = 0; i < row.length; i++) {
			console.log(row[i].internalId);
			unitCheck = unitCheck + row[i].internalId + '~';
		}
		gridTarget.setLoading("Please wait...");
		me.tools.ajax({
			params: {
				unitCheck: unitCheck
			},
			success: function (data, model) {
				console.log('respon ajax');
				// console.log(totalRow);
				console.log(data);
				var msgData = '';
				for (var i = 0; i < data.length; i++) {
					msgData += data[i].cluster.cluster + ' ' + data[i].block.code + ' ' + data[i].unit.unit_number + '<br>';
				}
				if (data.length > 0) {
					Ext.Msg.show({
						title: "Info",
						msg: "Generate gagal karena ada unit yang sudah ada SPK target. Berikut data unit :<br>" + msgData,
						closable: !0,
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK
					});
					gridTarget.setLoading(false);
					return 0;
				} else {
					var callback = '';
					me.prosesAutoGenerateTarget(unitCheck, function handleReposList(err, repos) {
						if (repos) {
							gridTarget.setLoading(false);
						}
					}, msgData, false, false);
					gridTarget.up("window").close();
				}
			}
		}).read('checkUnit');
	},
	generateTargetAll: function () {
		var me = this;
		var f = me.getFormdata();
		var gridTarget = me.getFormdatageneratetargetkontruksi();
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();

		var unitCheck = '';
		for (var i = 0; i < row.length; i++) {
			// console.log(row[i].internalId);
			unitCheck = unitCheck + row[i].internalId + '~';
		}

		Ext.Msg.show({
			title: "Information",
			msg: "Generate target konstruksi ke seluruh unit yang dipilih dan ke seluruh unit dalam satu cluster unit tersebut ?",
			buttonText: {
				//ok     : "Hanya Halaman Ini",
				yes: "Yes",
				no: "No",
			},
			buttons: Ext.MessageBox.YESNO,
			icon: Ext.MessageBox.QUESTION,
			width: 300,
			fn: function (btn) {
				if (btn == 'yes') { //"Hanya Halaman Ini",
					gridTarget.setLoading("Please wait...");
					// var paramsRead = [];
					// paramsRead['mode_read'] = 'checkUnitOneCluster';
					// paramsRead['unitCheck'] = unitCheck;
					Ext.Ajax.timeout = 60000 * 30;
					Ext.Ajax.request({
						url: 'erems/progressunit/read',
						params: {
							mode_read: 'checkUnitOneCluster',
							unitCheck: unitCheck
						},
						success: function (response) {
							var info = Ext.JSON.decode(response.responseText);
							if (info) {
								if (typeof info[1] !== 'undefined') {
									//array unit yang punya spk
									var listUNITexisting = info[1][0]['ListId'];
									var listUNITexistingArr = listUNITexisting.split(",");

									//array unit yang sudah ada spk detail target 
									var listSPKexistingArr = [];
									for (var i = 0; i < info[0].length; i++) {
										listSPKexistingArr[i] = '' + info[0][i]['unit_unit_id'];
									}

									//buang unit yang sudah punya spk detail target
									var listUNITexistingArr = listUNITexistingArr.filter(function (el) {
										return !listSPKexistingArr.includes(el);
									});
									console.log('listSPKexistingArr');
									console.log(listSPKexistingArr);

									var listGenerateUnit = listUNITexistingArr.join('~');
									console.log(listGenerateUnit);
									me.prosesAutoGenerateTarget(listGenerateUnit, function handleReposList(err, repos) {
										// if (err) throw err
										// Handle the repositories list here
										if (repos) {
											gridTarget.up("window").close();
										}
									}, listGenerateUnit, true, false);
								}
							} else {
								me.alert.error("Error when processing result.");
								// gridTarget.setLoading(false);
								gridTarget.up("window").close();
							}

						},
						failure: function () {
							me.alert.error("Server taking too long to respond.");
							gridTarget.up("window").close();
						}
					});
				}
			}
		});
	},
	generateTargetAllSPK: function () {
		var me = this;
		var f = me.getFormdata();
		var gridTarget = me.getFormdatageneratetargetkontruksi();
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();

		var unitCheck = '';
		for (var i = 0; i < row.length; i++) {
			// console.log(row[i].internalId);
			unitCheck = unitCheck + row[i].internalId + '~';
		}

		Ext.Msg.show({
			title: "Information",
			msg: "Generate target konstruksi ke seluruh unit yang dipilih dan ke seluruh unit dalam satu SPK unit tersebut ?",
			buttonText: {
				//ok     : "Hanya Halaman Ini",
				yes: "Yes",
				no: "No",
			},
			buttons: Ext.MessageBox.YESNO,
			icon: Ext.MessageBox.QUESTION,
			width: 300,
			fn: function (btn) {
				if (btn == 'yes') { //"Hanya Halaman Ini",
					gridTarget.setLoading("Please wait...");
					// var paramsRead = [];
					// paramsRead['mode_read'] = 'checkUnitOneSpk';
					// paramsRead['unitCheck'] = unitCheck;
					Ext.Ajax.timeout = 60000 * 30;
					Ext.Ajax.request({
						url: 'erems/progressunit/read',
						params: {
							mode_read: 'checkUnitOneSpk',
							unitCheck: unitCheck
						},
						success: function (response) {
							var info = Ext.JSON.decode(response.responseText);
							if (info) {
								if (typeof info[1] !== 'undefined') {
									//array unit yang punya spk
									var listUNITexisting = info[1][0]['ListId'];
									var listUNITexistingArr = listUNITexisting.split(",");

									//array unit yang sudah ada spk detail target 
									var listSPKexistingArr = [];
									for (var i = 0; i < info[0].length; i++) {
										listSPKexistingArr[i] = '' + info[0][i]['unit_unit_id'];
									}

									//buang unit yang sudah punya spk detail target
									var listUNITexistingArr = listUNITexistingArr.filter(function (el) {
										return !listSPKexistingArr.includes(el);
									});
									console.log('listSPKexistingArr');
									console.log(listSPKexistingArr);

									var listGenerateUnit = listUNITexistingArr.join('~');
									console.log(listGenerateUnit);
									me.prosesAutoGenerateTarget(listGenerateUnit, function handleReposList(err, repos) {
										// if (err) throw err
										// Handle the repositories list here
										if (repos) {
											gridTarget.up("window").close();
										}
									}, listGenerateUnit, false, true);
								}
							} else {
								me.alert.error("Error when processing result.");
								// gridTarget.setLoading(false);
								gridTarget.up("window").close();
							}

						},
						failure: function () {
							me.alert.error("Server taking too long to respond.");
							gridTarget.up("window").close();
						}
					});
				}
			}
		});
	},

	prosesAutoGenerateTarget(unitCheck, callback, msgData, cluster = true, spk = true) {
		var me = this;
		me.tools.ajax({
			params: {
				unitCheck: unitCheck
			},
			success: function (data, model) {
				var msgDataGenerate = '';
				if (data.length > 0) {
					if (cluster) {
						msgDataGenerate += 'Cluster ' + data[0].cluster.cluster;
					} else if (spk) {
						msgDataGenerate += 'SPK ' + data[0].spk.spk_no;
					} else {
						for (var i = 0; i < data.length; i++) {
							msgDataGenerate += data[i].cluster.cluster + ' ' + data[i].block.code + ' ' + data[i].unit.unit_number + '<br>';
						}
					}
					// else{
					// msgDataGenerate += 'CLuster '+data[0].cluster.cluster;
					// }
					Ext.Msg.show({
						title: "Info",
						msg: "Generate target berhasil. Berikut data unit :<br>" + msgDataGenerate,
						closable: !0,
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK
					});
					callback(null, 1);
					me.getGrid().down("pagingtoolbar").getStore().reload();
				} else {
					Ext.Msg.show({
						title: "Info",
						msg: "Generate target gagal berhasil. Berikut data unit :<br>" + msgData,
						closable: !0,
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK
					});
					callback(null, 1);
					me.getGrid().down("pagingtoolbar").getStore().reload();
				}
			}
		}).read('generateTargetUnit');
		// return result;
	},

	updateDetailSelected: function () {
		var me = this;
		// var f = me.getFormdata();
		var gridTarget = me.getFormdataupdatedetailprogress();


		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
		var unitCheck = '';
		var unitDetail = [];
		console.log('row');
		console.log(row);
		for (var i = 0; i < row.length; i++) {
			console.log(row[i].internalId);
			unitCheck = unitCheck + row[i].internalId + '~';
			unitDetail[row[i].internalId] = row[i];
		}
		var progressParams = [];
		progressParams['progressDate'] = gridTarget.down("[name=progress_date]").getRawValue();
		progressParams['progresPercent'] = gridTarget.down("[name=progres_percent]").getValue();
		progressParams['description'] = gridTarget.down("[name=description]").getValue();
		progressParams['unitCheck'] = unitCheck;

		gridTarget.setLoading("Please wait...");
		// me.tools.ajax({
		//     params: {
		//         unitCheck : unitCheck
		//     },
		//     success: function(data) {
		// console.log('respon ajax');
		// console.log(data[0].construction);
		Ext.Ajax.timeout = 60000 * 30;
		Ext.Ajax.request({
			url: 'erems/progressunit/read',
			params: {
				mode_read: 'checkUnitprogress',
				unitCheck: unitCheck
			},
			success: function (response) {
				var data = Ext.JSON.decode(response.responseText);
				var msgData = '';
				// var passPercentage = data[0][0]['totalRow'];
				var passPercentage = true;
				console.log(data[1][0]);
				var listUnitInfo = [];
				for (var i = 0; i < data[1].length; i++) {
					listUnitInfo.push(data[1][i]['unit_unit_id']);
					// console.log(data[1][i].cluster.cluster);
					// msgData += data[1][i]['cluster_cluster']+' '+data[1][i]['block_code']+' '+data[1][i]['unit_unit_number']+'<br>';
					// msgData += data[1][i]['cluster']['cluster']+' '+data[1][i]['block']['code']+' '+data[1][i]['unit']['unit_number']+'<br>';
					if (data[1][i]['progress_persen'] >= progressParams['progresPercent']) {
						msgData = data[1][i]['cluster_cluster'] + ' ' + data[1][i]['block_code'] + ' ' + data[1][i]['unit_unit_number'] + '<br>';
						passPercentage = false;
						break;
					}
				}


				// untuk cek apakah ada unit yang tidak ada di th_construction
				var listSPKexistingArr = progressParams['unitCheck'].split('~');
				listSPKexistingArr.pop();
				var listUnitIdNoConstruction = listSPKexistingArr;
				var listUnitIdNoConstruction = listUnitIdNoConstruction.filter(function (el) {
					return !listUnitInfo.includes(parseFloat(el));
				});

				if (listUnitIdNoConstruction.length > 0) {
					for (var j = 0; j < listUnitIdNoConstruction.length; j++) {
						if (!listSPKexistingArr.includes(listUnitIdNoConstruction[j])) {
							progressParams['unitCheck'] += listUnitIdNoConstruction[j] + '~';
						}
					}
				}

				//check target dari unit yang akan di update progress
				if (data[2][0]['ListUnitIdHaveTarget'] != null) {
					var checkUnitParam = progressParams['unitCheck'].split('~');
					checkUnitParam.pop();
					var listUnitHaveTargetKonstruksi = data[2][0]['ListUnitIdHaveTarget'];
					listUnitHaveTargetKonstruksi = listUnitHaveTargetKonstruksi.split(",");
					for (var k = 0; k < checkUnitParam.length; k++) {
						if (!listUnitHaveTargetKonstruksi.includes(checkUnitParam[k])) {
							msgData = 'Unit ini tidak memiliki target : ' + unitDetail[checkUnitParam[k]]['raw']['cluster']['cluster'] + ' ' + unitDetail[checkUnitParam[k]]['raw']['block']['block'] + ' ' + unitDetail[checkUnitParam[k]]['raw']['unit']['unit_number'] + '<br>';
							checkUnitParam.splice(k, 1);
							passPercentage = false;
							break;
						}
					}

					progressParams['unitCheck'] = '';
					if (checkUnitParam.length != 0 && passPercentage) {
						passPercentage = true;
						progressParams['unitCheck'] = checkUnitParam.join('~') + '~';
						msgData = '';
						for (var l = 0; l < checkUnitParam.length; l++) {
							// msgData += unitDetail[checkUnitParam[l]].raw.cluster.cluster+' '+unitDetail[checkUnitParam[l]].raw.block.block+' '+unitDetail[checkUnitParam[l]].raw.unit.unit_number+'<br>';
							msgData += unitDetail[checkUnitParam[l]]['raw']['cluster']['cluster'] + ' ' + unitDetail[checkUnitParam[l]]['raw']['block']['block'] + ' ' + unitDetail[checkUnitParam[l]]['raw']['unit']['unit_number'] + '<br>';
						}
					}
				} else {
					msgData = '';
					var checkUnitParam = progressParams['unitCheck'].split('~');
					checkUnitParam.pop();
					for (var k = 0; k < checkUnitParam.length; k++) {
						msgData += unitDetail[checkUnitParam[k]]['raw']['cluster']['cluster'] + ' ' + unitDetail[checkUnitParam[k]]['raw']['block']['block'] + ' ' + unitDetail[checkUnitParam[k]]['raw']['unit']['unit_number'] + '<br>';
					}

					Ext.Msg.show({
						title: "Info",
						// msg: "Unit berikut tidak memiliki target Konstruksi :<br>"+msgData+"Agar bisa melanjutkan harap unit tsb jangan dipilih.",
						msg: "Unit yang dipilih tidak memiliki target konstruksi dan/atau sudah memiliki progres persentase yang lebih besar dari yang di input.",
						closable: !0,
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK
					});
					gridTarget.setLoading(false);
					return 0;
				}
				// hasilnya akan diupdate hanya yang punya target

				if (passPercentage && progressParams['unitCheck'] != '') {
					var callback = '';
					me.updateDetailTarget(progressParams, function handleReposList(err, repos) {
						if (repos) {
							gridTarget.up("window").close();
						}
						gridTarget.setLoading(false);
					}, msgData, false);
				} else {
					Ext.Msg.show({
						title: "Info",
						// msg: "Unit berikut memiliki Persentase pembangunan lebih besar dari Progress yang diinput :<br>"+msgData+"Agar bisa melanjutkan harap unit tsb jangan dipilih.",
						msg: "Unit yang dipilih tidak memiliki target konstruksi dan/atau sudah memiliki progres persentase yang lebih besar dari yang di input.",
						closable: !0,
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK
					});
					gridTarget.setLoading(false);
					return 0;
				}
			},
			failure: function () {
				me.alert.error("Server taking too long to respond.");
				gridTarget.up("window").close();
			}
		});
		// }).read('checkUnitprogress');
	},
	updateDetailAll: function (flag_all) {
		var me = this;
		var f = me.getFormdata();
		var gridTarget = me.getFormdataupdatedetailprogress();
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();

		var unitCheck = '', progresPercent = gridTarget.down("[name=progres_percent]").getValue();
		for (var i = 0; i < row.length; i++) {
			unitCheck = unitCheck + row[i].internalId + '~';
		}
		var progressParams = [];
		progressParams['progressDate'] = gridTarget.down("[name=progress_date]").getRawValue();
		progressParams['progresPercent'] = gridTarget.down("[name=progres_percent]").getValue();
		progressParams['description'] = gridTarget.down("[name=description]").getValue();
		progressParams['unitCheck'] = unitCheck;
		var mode_read = "checkUnitOneClusterProgress";
		if (flag_all == "SPK") {
			mode_read = "checkUnitOneSpkProgress";
		}

		Ext.Msg.show({
			title: "Information",
			msg: "Update progress konstruksi ke seluruh unit yang dipilih dan ke seluruh unit dalam satu " + flag_all + " unit tersebut ?",
			buttonText: {
				yes: "Yes",
				no: "No",
			},
			buttons: Ext.MessageBox.YESNO,
			icon: Ext.MessageBox.QUESTION,
			width: 300,
			fn: function (btn) {
				if (btn == 'yes') { //"Hanya Halaman Ini",
					gridTarget.setLoading("Please wait...");
					Ext.Ajax.timeout = 60000 * 30;
					Ext.Ajax.request({
						url: 'erems/progressunit/read',
						params: {
							mode_read: mode_read,
							unitCheck: unitCheck,
							progresPercent: progresPercent
						},
						success: function (response) {
							var info = Ext.JSON.decode(response.responseText);
							if (info) {
								if (typeof info[1] !== 'undefined') {
									// var passPercentage = true;
									var msgData = '';

									//array unit yang sudah ada spk detail target 
									var listSPKexisting = info[1][0]['ListIdHaveSPK'];
									var listSPKexistingArr = listSPKexisting.split(",");

									progressParams['unitCheck'] = '';
									var progresPercent = parseFloat(progressParams['progresPercent']);
//									var CLusterName = info[0][0]['cluster_cluster'];
//									var SPKNo = info[0][0]['spk_spk_no'];

									var flag_cluster = true;
									var flag_spk = false;
									if (flag_all == "SPK") {
										flag_cluster = false;
										flag_spk = true;
									}

									//array unit yang punya konstruksi
									var listUnitKonstruksiHaveSPKArr = [];
									var listIDUnitKonstruksiHaveSPKArr = [];

									// untuk unit id yang tidak ada th construction
									var listUnitIdNoConstruction = listSPKexistingArr;

									var listUnitInfo = [];

									for (var i = 0; i < info[0].length; i++) {
										listUnitInfo.push(info[0][i]['unit_unit_id']);
										if (
												listSPKexistingArr.includes(info[0][i]['unit_unit_id'].toString())
												&& !listIDUnitKonstruksiHaveSPKArr.includes(info[0][i]['unit_unit_id'])
												&& info[0][i]['progress_persen'] < progressParams['progresPercent']
												) {
											console.log('masuk kurangin unit filter');
											// console.log("info[0][i]['progress_persen'] < progressParams['progresPercent']");
											// console.log(info[0][i]['progress_persen'] +' / '+ progresPercent);
											// console.log(info[0][i]['progress_persen'] < progresPercent);
											msgData += info[0][i]['cluster_cluster'] + ' ' + info[0][i]['block_code'] + ' ' + info[0][i]['unit_unit_number'] + '<br>';
											listUnitKonstruksiHaveSPKArr.push(info[0][i]);
											listIDUnitKonstruksiHaveSPKArr.push(info[0][i]['unit_unit_id']);
											progressParams['unitCheck'] += info[0][i]['unit_unit_id'] + '~';
										}
										// else if(info[0][i]['progress_persen'] < progressParams['progresPercent']){
										else if (
												info[0][i]['progress_persen'] < progressParams['progresPercent']
												&& !listIDUnitKonstruksiHaveSPKArr.includes(info[0][i]['unit_unit_id'])
												&& !listSPKexistingArr.includes(info[0][i]['unit_unit_id'].toString())
												) {
											console.log('masuk all harusnya');
											progressParams['unitCheck'] += info[0][i]['unit_unit_id'] + '~';
											listIDUnitKonstruksiHaveSPKArr.push(info[0][i]['unit_unit_id']);
										}
									}

									// untuk cek apakah ada unit yang tidak ada di th_construction
									var listUnitIdNoConstruction = listUnitIdNoConstruction.filter(function (el) {
										return !listUnitInfo.includes(parseFloat(el));
									});
									if (listUnitIdNoConstruction.length > 0) {
										for (var j = 0; j < listUnitIdNoConstruction.length; j++) {
											progressParams['unitCheck'] += listUnitIdNoConstruction[j] + '~';
										}
									}
									// hasilnya akan masuk ke kategori update all di 1 cluster, tapi hanya beberapa unit

									console.log("progressParams['unitCheck']");
									console.log(progressParams['unitCheck']);

									//check target dari unit yang akan di update progress
									var checkUnitParam = progressParams['unitCheck'].split('~');
									checkUnitParam.pop();
									if (info[2][0]['ListUnitIdHaveTarget'] != null) {
										var listUnitHaveTargetKonstruksi = info[2][0]['ListUnitIdHaveTarget'];
										var listUnitHaveTargetKonstruksi = listUnitHaveTargetKonstruksi.split(",");
										for (var k = 0; k < checkUnitParam.length; k++) {
											if (!listUnitHaveTargetKonstruksi.includes(checkUnitParam[k])) {
												checkUnitParam.splice(k, 1);
											}
										}
									}

									progressParams['unitCheck'] = '';
									if (checkUnitParam.length != 0) {
										progressParams['unitCheck'] = checkUnitParam.join('~') + '~';
									}
									//check target dari unit yang akan di update progress
									console.log("progressParams['unitCheck']22");
									console.log(progressParams['unitCheck']);

									if (listUnitKonstruksiHaveSPKArr.length > 0 && listSPKexistingArr.length > 0 && progressParams['unitCheck'] != '') {
										console.log('masuk kurangin unit')
										// for(var i = 0;i<listUnitKonstruksiHaveSPKArr.length;i++){
										//     if(listUnitKonstruksiHaveSPKArr[i]['progress_persen'] < progressParams['progresPercent']){
										//         msgData += listUnitKonstruksiHaveSPKArr[i]['cluster_cluster']+' '+listUnitKonstruksiHaveSPKArr[i]['block_code']+' '+listUnitKonstruksiHaveSPKArr[i]['unit_unit_number']+'<br>';
										//         progressParams['unitCheck'] += listUnitKonstruksiHaveSPKArr[i]['unit_unit_id']+'~';
										//     }
										// }
										// console.log(progressParams);
										me.updateDetailTarget(progressParams, function handleReposList(err, repos) {
											console.log('err');
											console.log(err);
											if (repos) {
												gridTarget.up("window").close();
											}
											gridTarget.setLoading(false);
										}, msgData, flag_cluster, flag_spk);
									} else if (listSPKexistingArr.length > 0 && listUnitKonstruksiHaveSPKArr.length == 0 && progressParams['unitCheck'] != '') {
										console.log('masuk semua unit');
										msgData = 'Cluster ';
										if (flag_all == "SPK") {
											msgData = 'SPK ';
										}
										me.updateDetailTarget(progressParams, function handleReposList(err, repos) {
											if (repos) {
												gridTarget.up("window").close();
											}
											gridTarget.setLoading(false);
										}, msgData, flag_cluster, flag_spk);
									} else {
										Ext.Msg.show({
											title: "Info",
											msg: "Semua unit memiliki persentase pembangunan lebih besar dari progress yang diinput / Tidak ada unit yang memiliki target konstruksi.",
											closable: !0,
											icon: Ext.Msg.INFO,
											buttons: Ext.Msg.OK
										});
										gridTarget.setLoading(false);
										return 0;
									}

									// var listGenerateUnit = listUNITexistingArr.join('~');
									// console.log(listGenerateUnit);
									//  me.updateDetailTarget(listGenerateUnit, function handleReposList(err, repos) {
									//   // if (err) throw err
									//   // Handle the repositories list here
									//     gridTarget.up("window").close();
									// },listGenerateUnit,true);
								} else {
									Ext.Msg.alert('Alert', 'Error when processing result.');
									gridTarget.setLoading(false);
								}
							} else {
								Ext.Msg.alert('Alert', 'Error when processing result.');
								gridTarget.setLoading(false);
							}

						},
						failure: function () {
							me.alert.error("Server taking too long to respond.");
							gridTarget.up("window").close();
						}
					});
				}
			}
		});
	},
	updateDetailTarget(progressParams, callback, msgData, cluster = true, spk = false) {
		var me = this;
		// console.log('progressParams');
		// console.log(progressParams);
		me.tools.ajax({
			params: {
				'progressDate': progressParams['progressDate'],
				'progresPercent': progressParams['progresPercent'],
				'description': progressParams['description'],
				'unitCheck': progressParams['unitCheck']
			},
			// params : progressParams,
			success: function (data, model) {
				var msgDataGenerate = '';
				if (data.length > 0) {
					if (!cluster && !spk) {
						for (var i = 0; i < data.length; i++) {
							msgDataGenerate += '- ' + data[i].cluster.cluster + ' ' + data[i].block.code + ' ' + data[i].unit.unit_number + '<br>';
						}
					} else if (cluster) {
						msgDataGenerate += 'Cluster ' + data[0].cluster.cluster;
					} else if (spk) {
						msgDataGenerate += 'SPK ' + data[0].spk.spk_no;
					}
					Ext.Msg.show({
						title: "Info",
						msg: "Update detail progress berhasil. Berikut data unit :<br>" + msgDataGenerate,
						closable: !0,
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK
					});
					callback(null, 1);
					me.getGrid().down("pagingtoolbar").getStore().reload();
				} else {
					Ext.Msg.show({
						title: "Info",
						msg: "Update detail progress gagal. Berikut data unit :<br>" + msgData,
						closable: !0,
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK
					});
					callback(0, null);
				}
			}
		}).read('updateDetailProgress');

		// var msgDataGenerate = '';
		// msgDataGenerate += 'CLuster ';
		// Ext.Msg.show({
		//     title: "Info",
		//     msg: "Update detail progress berhasil. Berikut data unit :<br>"+msgDataGenerate,
		//     closable: !0,
		//     icon: Ext.Msg.INFO,
		//     buttons: Ext.Msg.OK
		// });
		// callback(null, 1);
	},
	handleReposList(err, repos) {
		if (err)
			throw err

		// Handle the repositories list here
		console.log('My very few repos', repos)
	},
	//added by anas 24022021
	actionDownload: function (){
		var me    = this;
		var index = me.currentImgPos;
		var rec   = me.localStore.images.getAt(index);

		// me.localStore.imagesApi.length

		// if (rec == null || rec == "")
		// {
		// 	me.tools.alert.warning("No image available");
		// } else {
		// 	// var imageUrl = me.imageFolder+"/"+rec.get("images");

		// 	// // //ceslive
		// 	// // var url = window.location.protocol+"//"+window.location.host+'/webapps/Ciputra/public/'+imageUrl;

		// 	// // //cestest
		// 	// var url = window.location.protocol+"//"+window.location.host+'/anastasia/Ciputra/public/'+imageUrl;

		// 	// //local
		// 	// // var url = window.location.protocol+"//"+window.location.host+'/webapps/public/'+imageUrl;

		// 	var url = document.URL + me.imageFolder + rec.get("images");

		// 	var a = document.createElement('A');
		// 	a.href = url;
		// 	a.download = url.substr(url.lastIndexOf('/') + 1);
		// 	document.body.appendChild(a);
		// 	a.click();
		// 	document.body.removeChild(a);
		// }

		/// Edited by erwin.st 28052021
		if (typeof rec !== 'undefined') {
			var url = document.URL + me.imageFolder + rec.get("images");

			var a = document.createElement('A');
			a.href = url;
			a.download = url.substr(url.lastIndexOf('/') + 1);
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		} else if (me.localStore.imagesApi.length > 0) {
			var totalRecNonApi = me.localStore.images.getCount();
			var totalRecApi = me.localStore.imagesApi.length;

			var idx = index - totalRecNonApi;
			if (idx == totalRecApi) {
				idx--;
			}

			if (idx < totalRecApi) {
				var url = me.localStore.imagesApi[idx].url;

				var a = document.createElement('A');
				a.setAttribute('href', url);
				a.setAttribute('target', '_blank');
				a.setAttribute('download', url.substr(url.lastIndexOf('/') + 1));

				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
			}
		} else {
			me.tools.alert.warning("No image available");
		}
	},
	//added by anas 09072021
	formDataSurveyAfterRender: function (el) {
		var me = this, grid = me.getGrid(), row = grid.getSelectionModel().getSelection();

		if (row[0] != null){
			var unit_id          = row[0].data.unit_id;
			var nilai_survey     = row[0].data.nilai_survey;
			var nilai_survey_nps = row[0].data.nilai_survey_nps;

			me.getFormdatasurvey().down("[name=unit_id]").setValue(unit_id);
			me.getFormdatasurvey().down("[name=nilai_survey]").setValue(nilai_survey);
			me.getFormdatasurvey().down("[name=nilai_survey_nps]").setValue(nilai_survey_nps);
		}
	},
	//added by anas 09072021
	detailFormSurvey: {
		that            : this,
		editingIndexRow : 0,
		save            : function () {
			var me = this;
			var form = me.getFormdatasurvey().getForm();

			if (form.isValid()) {
				var fields = me.getFormdatasurvey().getValues();

				resetTimer();
				me.getFormdatasurvey().up('window').body.mask('Saving, please wait ...');

				var objAlt = {
					title   : 'Failure',
					msg     : 'Error: Unable to save data.',
					icon    : Ext.Msg.ERROR,
					buttons : Ext.Msg.OK
				};


				if(fields.flag_form == 'order_bangun'){
					var parAjax = {
						unit_id         : fields.unit_id,
						is_order_bangun : fields.is_order_bangun,
						notes           : fields.notes,
						modiby          : apps.uid,
						mode_read       : 'orderBangun'
					};
				}
				else{
					var parAjax = {
						unit_id          : fields.unit_id,
						nilai_survey     : fields.nilai_survey,
						nilai_survey_nps : fields.nilai_survey_nps,
						modiby           : apps.uid,
						mode_read        : 'survey'
					};
				}

				Ext.Ajax.request({
					url     : 'erems/progressunit/read',
					params  : parAjax,
					success : function (response) {
						me.getFormdatasurvey().up('window').body.unmask();

						var objAlt2 = objAlt;
						if (Ext.decode(response.responseText).success == true) {
							objAlt2 = {
								title   : 'Success',
								msg     : 'Data saved successfully.',
								icon    : Ext.Msg.INFO,
								buttons : Ext.Msg.OK,
								fn      : function () {
									me.getFormdatasurvey().up('window').close();
									var gridDepan = me.getGrid();
									var storeDepan = gridDepan.getStore();
									storeDepan.reload();
								}
							};
						}
						Ext.Msg.show(objAlt2);
					},
					failure: function (e) {
						me.getFormdatasurvey().up('window').body.unmask();
						Ext.Msg.show(objAlt);
					}
				});
			}
		}
	},
});