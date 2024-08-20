Ext.define('Erems.controller.Mastercluster', {
	extend: 'Erems.library.template.controller.Controller2',
	alias: 'controller.Mastercluster',
	stores: ['Mastercluster', 'Mastertype', 'Masterproductcategory', 'Masterblock', 'Masterside', 'Masterposisi', 'Masterpurpose', 'Unitstatus'],
	models: ['Mastercluster', 'Mastertype', 'Masterproductcategory', 'Masterblock', 'Masterside', 'Masterposisi', 'Masterpurpose'],
	views: ['mastercluster.Panel', 'mastercluster.Grid', 'mastercluster.FormSearch', 'mastercluster.FormData', 'mastercluster.FormAddImage', 'mastercluster.GalleryGrid', 'mastercluster.GalleryImage'],
	refs: [
		{
			ref: 'mainpanel',
			selector: 'masterclusterpanel'
		},
		{
			ref: 'grid',
			selector: 'masterclustergrid'
		},
		{
			ref: 'formsearch',
			selector: 'masterclusterformsearch'
		},
		{
			ref: 'formdata',
			selector: 'masterclusterformdata'
		},
		{
			ref: 'griddetail',
			selector: 'masterclustergallerygrid'
		},
		{
			ref: 'formdetail',
			selector: 'masterclusterformaddimage'
		}
	],
	controllerName: 'mastercluster',
	fieldName: 'cluster',
	galleryImageGridid: 'galleryimagemastercluster_grid',
	bindPrefixName: 'Mastercluster',
	localStore: {
		detail: null,
		selectedUnit: null,
		customer: null
	},
	browseHandler: null,
	cbf: null,
	mt: null,
	formxWinId: 'win-clusterwinId',
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

		this.control({
			'masterclusterpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'masterclustergrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'masterclustergrid toolbar button[action=create]': {
				click: function () {
					me.formDataShow('create');
				}
			},
			'masterclustergrid toolbar button[action=update]': {
				click: function () {
					me.formDataShow('update');
				}
			},
			'masterclustergrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'masterclustergrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'masterclustergallerygrid': {
				beforerender: function (el, a, b) {
					el.folderImage = me.myConfig.IMG_FOLDER_CL;
				},
				itemdblclick: function (view, rec) {
					me.insACC(view, 'update', rec.index);
				}
			},
			'masterclustergallerygrid toolbar button[action=add]': {
				click: function () {
					me.showFormDetail('create');
				}
			},
			'masterclustergallerygrid toolbar button[action=gallery]': {
				click: function () {
					me.showFormGallery('create');
				}
			},
			'masterclustergallerygrid actioncolumn': {
				click: this.insActionColumnClick
			},
			'masterclustergrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'masterclusterformsearch button[action=search]': {
				click: this.dataSearch
			},
			'masterclusterformsearch button[action=reset]': {
				click: this.dataReset
			},
			'masterclusterformdata': {
				afterrender: this.formDataAfterRender,
			},
			'masterclusterformdata button[action=save]': {
				click: function () {
					me.mainDataSave();
				}
			},
			'masterclusterformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'masterclusterformdata button[action=gallery_add]': {
				click: function (el, act) {
					this.formDataShow(el, act, 'gallery_add');
				}
			},
			'masterclusterformdata button[action=gallery_show]': {
				click: function (el, act) {
					this.formDataShow(el, act, 'gallery_show');
				}
			},
			'masterclusterformdata #mastercluster_layermap': {
				change: function (fld, a) {
					this.formDataUploadImage(fld, a, 'site_plant');
				}
			},
			'masterclusterformdata #mastercluster_legend_layer': {
				change: function (fld, a) {
					this.formDataUploadImage(fld, a, 'legend_layer');
				}
			},
			'masterclusterformdata #mastercluster_siteplan_svg': {
				change: function (fld, a) {
					this.formDataUploadImage(fld, a, 'siteplan_svg');
				}
			},
			'masterclusterformaddimage #mastercluster_detail_image': {
				change: function (fld, a) {
					this.formDataUploadImage(fld, a, 'detail_image');
				}
			},
			'masterclustergalleryimagepanel': {
				beforerender: this.galleryImagePanelBeforeRender

			},
			'masterclusterformaddimage button[action=save]': {
				click: function () {
					me.insertImageToGrid();
				}
			},
			'expenserequestgriddetail actioncolumn': {
				click: this.insActionColumnClick
			},
			/*       
			 'masterclusterformaddimage button[action=save]': {
			 click: this.saveImage
			 }, 
			 */
		});
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
							me.getGrid().up('window').unmask();
							console.log(s.operations[0].response.responseText);
							var jsonRes = Ext.decode(s.operations[0].response.responseText);
							var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
							var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
							store.un('beforesync', msg);
							store.reload();

							if (jsonRes.success_transaction) {
								Ext.Msg.show({
									title: 'Success',
									msg: successmsg,
									icon: Ext.Msg.INFO,
									buttons: Ext.Msg.OK
								});

							} else {
								me.tools.alert.warning(jsonRes.msg);
							}

						},
						failure: function (t) {

							me.getGrid().up('window').unmask();
							store.un('beforesync', msg);
							store.reload();
							Ext.Msg.show({
								title: 'Failure',
								msg: failmsg + ' The data may have been used [ERR].',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					});
				}
			});
		}
	},
	galleryImagePanelBeforeRender: function (el) {
		var me = this;

		var imageStore = me.getFormdata().down('#' + me.galleryImageGridid).getStore();
		var tempAr = [];
		imageStore.each(function (rec) {
			tempAr.push({
				url: rec.data.image,
				title: rec.data.title,
				description: rec.data.description
			});
		})
		el.dataGallery = tempAr;
		el.beforeRenderCustom();
	},
	formDataUploadImage: function (fld, a, mode) {
		var me = this;
		var form = fld.up("form");
		me.uploadImage({
			form: form,
			params: {mode: mode},
			callback: {
				success: function (imageName) {
					if (mode === 'site_plant') {
						me.refreshImageInfo(imageName);
					} else if (mode === 'legend_layer') {
						me.refreshImageInfo_legend(imageName);
					} else if (mode === 'siteplan_svg') {
						me.refreshImageInfo_siteplansvg(imageName);
					} else {
						me.refreshImageInfo_detail(imageName);
					}
				},
				failure: function () {
				}
			}
		});
	},
	//
	refreshImageInfo: function (imageName) {
		var me = this;
		var form = me.getFormdata();
		form.down("[name=img_siteplant]").setValue(imageName);
		me.mt.customerPhoto(form.down("#mastercluster_layermapimage"), imageName, me.myConfig.IMG_FOLDER_CL, '222px 200px');
	},
	refreshImageInfo_legend: function (imageName) {
		var me = this;
		var form = me.getFormdata();
		form.down("[name=img_legendlayer]").setValue(imageName);
		me.mt.customerPhoto(form.down("#mastercluster_legendimage"), imageName, me.myConfig.IMG_FOLDER_CL, '50px 50px');
	},
	refreshImageInfo_siteplansvg: function (imageName) {
		var me = this;
		var form = me.getFormdata();
		form.down("[name=siteplan_svg]").setValue(imageName);
		$("#mastercluster_siteplansvg").html('<object id="svglegend" data="' + me.myConfig.IMG_FOLDER_CL + imageName + '?_=' + new Date().getTime() + '" type="image/svg+xml" style="width:100%; height:100%"></object>');
	},
	refreshImageInfo_detail: function (imageName) {
		var me = this;
		var form = me.getFormdetail();
		form.down("[name=image]").setValue(imageName);
		me.mt.customerPhoto(form.down("#addImage_layermapimage"), imageName, me.myConfig.IMG_FOLDER_CL, '355px 200px');
	},
	panelAfterRender: function (configs) {
		this.callParent(arguments);
		this.whoCallMeID = null;
	},
	mainDataSave: function (mode) {
		var me = this;
		var m = typeof mode !== "undefined" ? mode : "";
		if (me.whoCallMeID) {
			me.tools.ajax({
				form: me.getFormdata(),
				callback: function () {
					_Apps.getController(me.whoCallMeID).afterAddNewFromOutside(me.id);
				},
				finalData: function (data) {
					return data;
				}
			}).create();
		} else {
			me.insSave({
				form: me.getFormdata(),
				grid: me.getGrid(),
				//  store: me.localStore.detail,
				finalData: function (data) {
					// var f = me.getFormdata();
					data["detail"] = me.tools.gridHelper(me.getGriddetail()).getJson();

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
	insACC: function (view, action, row) {
		var me = this;
		var grid = view.up("grid");
		switch (grid.itemId) {
			case "galleryimagemastercluster_grid":
				if (action == "destroy") {
					var confirmmsg = 'Delete data??';
					Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
						if (btn == 'yes') {
							me.deleteUnitFromGrid(row);
						}
					});
				} else if (action == "update") {
					// me.editUnitFromGrid(row);
					me.showFormDetail("update");
					var f = me.getFormdetail();
					f.editedRow = row;
					var rec = grid.getStore().getAt(row);
					f.loadRecord(rec);
					me.refreshImageInfo_detail(rec.get("image"));
				}
				break;
		}
	},
	deleteUnitFromGrid: function (row) {
		var me = this;
		var id = 0;
		var s = me.getGriddetail().getStore();
		id = me.tools.intval(s.getAt(row).get("clusterimages_id"));
		if (id > 0) {
			me.tools.gridHelper(me.getGrid()).maindetailUpdateDeletedRows(me.getFormdata(), s.getAt(row).get("clusterimages_id"));
		}
		s.removeAt(row);
	},
	insertImageToGrid: function () {
		var me = this;
		var f = me.getFormdetail();
		var editedRow = f.editedRow;
		var gd = me.getGriddetail();
		var vs = f.getValues();
		var items = gd.getStore().data.items;

		if (vs.title != '' && vs.title != null && vs.title != undefined) {
			if (editedRow > -1) {
				var rec = gd.getStore().getAt(editedRow);
				rec.beginEdit();
				rec.set(vs);
				rec.endEdit();
			} else {
				gd.getStore().add(vs);
			}

			if (vs.is_default == 1) {
				for (var i = 0; i < items.length; i++) {
					if (items[i].data['title'] != vs.title) {
						items[i].data['is_default'] = 0;

						var records = gd.getStore().getAt(i);
						records.beginEdit();
						records.set(records.data);
						records.endEdit();
					}
				}
			}
			gd.getView().refresh();
			f.up("window").close();
		} else {
			Ext.Msg.show({
				title: 'Failure',
				msg: 'Title must be filled.',
				icon: Ext.Msg.ERROR,
				buttons: Ext.Msg.OK
			});
		}
	},
	showFormDetail: function (action) {
		var me = this;
		me.instantWindow('FormAddImage', 400, 'Image', action, 'myDetailWindow');
		var f = me.getFormdetail();
		var fm = me.getFormdata();
		f.down("[name=cluster_cluster]").setValue(fm.down("[name=cluster]").getValue());
	},
	showFormGallery: function (action) {
		var me = this;
		me.instantWindow('GalleryImage', 400, 'Images Gallery', action, 'myGalleryWindow');
	},
	fdar: function () {
		var me = this;
		var f = me.getFormdata();
		me.mt = new Erems.library.ModuleTools();
		var gd = null;
		gd = me.getGriddetail();

		var x = {
			init: function () {
				me.setActiveForm(f);
				gd.doInit();

				me.localStore.detail = me.instantStore({
					id: me.controllerName + 'CNDetailStore',
					extraParams: {
						mode_read: 'maindetail'
					},
					idProperty: 'changename_id'
				});
			},
			create: function () {
				f.editedRow = -1;
				me.tools.ajax({
					params: {
						// purchaseletter_id: plId
					},
					success: function (data, model) {
						me.fillFormComponents(data, f);
						f.setLoading("Init components...");
						me.tools.ajax({
							params: {},
							success: function (datag, modelg) {
								me.tools.wesea({
									data: datag,
									model: modelg
								}, gd).grid();

								f.setLoading(false);
							}
						}).read('imagelist');
					}
				}).read('detail');

			},
			update: function () {
				f.editedRow = me.getGrid().getSelectedRow();
				var rec = me.getGrid().getSelectedRecord();
				f.loadRecord(rec);
				f.setLoading("Loading...");
				me.tools.ajax({
					params: {
						// purchaseletter_id: plId
					},
					success: function (data, model) {
						me.fillFormComponents(data, f);
						f.down("[name=harga_taman]").setValue(accounting.formatMoney(f.down("[name=harga_taman]").getValue()));
						f.down("[name=harga_hook]").setValue(accounting.formatMoney(f.down("[name=harga_hook]").getValue()));
						me.refreshImageInfo(rec.get("img_siteplant"));
						me.refreshImageInfo_legend(rec.get("img_legendlayer"));
						if (rec.get("siteplan_svg") != "") {
							me.refreshImageInfo_siteplansvg(rec.get("siteplan_svg"));
						}
						// load image list
						f.setLoading("Load image list...");
						me.tools.ajax({
							params: {
								cluster_id: rec.get("cluster_id")
							},
							success: function (datag, modelg) {
								me.tools.wesea({
									data: datag,
									model: modelg
								}, gd).grid();

								var s = gd.down("pagingtoolbar").getStore();
								s.getProxy().setExtraParam('mode_read', 'imagelist');
								s.getProxy().setExtraParam('cluster_id', f.down("[name=cluster_id]").getValue());
								s.reload();

								f.setLoading(false);
							}
						}).read('imagelist');
					}
				}).read('detail');

				if(apps.projectiscpms == 1){
					me.setterReadonly(f, ['code', 'cluster'], true);
				}
			}
		};
		return x;
	},
	fillFormComponents: function (data, form) {
		var me = this;
		//   me.tools.wesea(data.reasonchgname, form.down("[name=reasonchgname_reasonchgname_id]")).comboBox();
		//citraclub_id
	}
});