Ext.define('Erems.controller.Clusterfacilities', {
	extend: 'Erems.library.template.controller.Controller2',
	alias: 'controller.Clusterfacilities',
	views: ['clusterfacilities.Panel', 'clusterfacilities.Grid', 'clusterfacilities.FormSearch', 'clusterfacilities.FormData', 'clusterfacilities.FormAddImage', 'clusterfacilities.GalleryGrid', 'clusterfacilities.GalleryImage'],
	requires: [
		'Erems.library.box.tools.GridForce', 
	],
	stores: ['Mastercluster', 'Mastertype', 'Masterproductcategory', 'Masterblock', 'Masterside', 'Masterposisi', 'Masterpurpose', 'Unitstatus'],
    models: ['Mastercluster', 'Mastertype', 'Masterproductcategory', 'Masterblock', 'Masterside', 'Masterposisi', 'Masterpurpose'],
    
	refs: [
		{
			ref: 'mainpanel',
			selector: 'clusterfacilitiespanel'
		},
		{
			ref: 'grid',
			selector: 'clusterfacilitiesgrid'
		},
		{
			ref: 'formsearch',
			selector: 'clusterfacilitiesformsearch'
		},
		{
			ref: 'formdata',
			selector: 'clusterfacilitiesformdata'
		},
		{
			ref: 'panel',
			selector: 'clusterfacilitiespanel'
		},
		{
			ref: 'griddetail',
			selector: 'clusterfacilitiesgallerygrid'
		},
		{
			ref: 'formdetail',
			selector: 'clusterfacilitiesformaddimage'
		}
	],
	myConfig: null,
	controllerName: 'clusterfacilities',
	fieldName: 'clusterfacilities',
	galleryImageGridid: 'galleryimageclusterfacilities_grid',
	bindPrefixName: 'Clusterfacilities',
	masterData: null,
	tools: null,
	gf: null,
	mt: null,
	constructor: function (configs) {
		this.callParent(arguments);
		var me = this;
		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});

		me.cbf = new Erems.template.ComboBoxFields();
//		_Apps.getController('Mastercluster');
	},
	init: function (application) {
		var me = this;
		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
		me.gf = new Erems.library.box.tools.GridForce();

		this.control({
			'clusterfacilitiespanel': {
				afterrender: this.panelAfterRender,
				beforerender: me.mainPanelBeforeRender
			},
			'clusterfacilitiesgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'clusterfacilitiesgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'clusterfacilitiesgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'clusterfacilitiesgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'clusterfacilitiesgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'clusterfacilitiesgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'clusterfacilitiesformsearch button[action=search]': {
				click: this.dataSearch
			},
			'clusterfacilitiesformsearch button[action=reset]': {
				click: this.dataReset
			},
			'clusterfacilitiesformdata': {
				afterrender: this.formDataAfterRender,
			},
			'clusterfacilitiesformdata button[action=save]': {
				click: this.mainDataSave
			},
			'clusterfacilitiesformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'clusterfacilitiesformdata button[action=gallery_add]': {
				click: function (el, act) {
					this.formDataShow(el, act, 'gallery_add');
				}
			},
			'clusterfacilitiesformdata button[action=gallery_show]': {
				click: function (el, act) {
					this.formDataShow(el, act, 'gallery_show');
				}
			},
			'clusterfacilitiesformdata #clusterfacilities_layermap': {
				change: function (fld, a) {
					me.formDataUploadImage(fld, a, 'mode');
				}
			},
			'clusterfacilitiesformaddimage #clusterfacilities_layermapd': {
				change: function (fld, a) {
					me.formDataUploadImage(fld, a, 'detail');
				}
			},
			'clusterfacilitiesformaddimage': {
				// afterrender: this.formDataGalleryAfterRender
			},
			'clusterfacilitiesgallerygrid': {
				afterrender: function (f) {
					// me.tools.gridHelper(me.getGriddetail()).addEvents(me);
					me.gf.addEvents(me.getGriddetail(), me);
				}
			},
			'clusterfacilitiesgallerygrid actioncolumn': {
				click: this.gridGalleryActionColumnClick
			},
			'clusterfacilitiesgalleryimagepanel': {
				beforerender: this.galleryImagePanelBeforeRender
			},
		});
	},
	formDataUploadImage: function (fld, a, mode) {
		var me = this;
		var form = fld.up("form");
		me.uploadImage({
			form: form,
			callback: {
				success: function (imageName) {
					if (mode === "detail") {
						me.refreshPhotoInfoDetail(imageName);
					} else {
						me.refreshPhotoInfo(imageName);
					}
				},
				failure: function () {
				}
			}
		});
	},
	refreshPhotoInfo: function (imageName) {
		var me = this;
		var form = me.getFormdata();
		form.down("[name=layer_img]").setValue(imageName);
		me.mt.customerPhoto(form.down("#clusterfacilities_layermapimage"), imageName, me.myConfig.IMG_FOLDER_CF);
	},
	refreshPhotoInfoDetail: function (imageName) {
		var me = this;
		var form = me.getFormdetail();
		form.down("[name=image]").setValue(imageName);
		me.mt.customerPhoto(form.down("#addImage_layermapimage"), imageName, me.myConfig.IMG_FOLDER_CF);
	},
	panelAfterRender: function (configs) {
		this.callParent(arguments);
		var me = this;
		var p = me.getPanel();
		p.setLoading("Loading components...");
		me.mt = new Erems.library.ModuleTools();
		me.tools.ajax({
			params: {},
			success: function (data, model) {
				me.masterData = data;
				me.tools.wesea(me.masterData.facilitiestype, me.getFormsearch().down("[name=facilitiestype_facilitiestype_id]")).comboBox(true);
				me.tools.wesea(me.masterData.cluster, me.getFormsearch().down("[name=cluster_cluster_id]")).comboBox(true);
				p.setLoading(false);
			}
		}).read('detail');
	},
	fillFormSearchComponents: function (data, f) {
		var me = this;
		me.tools.wesea(data.facilitiestype, f.down("[name=facilitiestype_facilitiestype_id]")).comboBox(false);
	},
	getImageStore: function () {
		return this.getClusterfacilitiesimageStore();
	},
	dataReset: function () {
		var me = this;
		me.getFormsearch().getForm().reset();
		me.getFormsearch().down('#clusterfacilities_cluster').setValue('');
		me.getFormsearch().down('#clusterfacilities_facilitiestype').setValue('');
		me.dataSearch();
	},
	fdar: function () {
		var me = this;
		var f = me.getFormdata();
		var x = {
			init: function () {
				me.setActiveForm(f);
				me.tools.wesea(me.masterData.cluster, f.down("[name=cluster_cluster_id]")).comboBox(false);
				me.tools.wesea(me.masterData.facilitiestype, f.down("[name=facilitiestype_facilitiestype_id]")).comboBox(false);
			},
			create: function () {

			},
			update: function () {
				var rec = me.getGrid().getSelectedRecord();
				f.editedRow = me.getGrid().getSelectedRow();
				var gd = me.getGriddetail();

				if (rec) {
					f.loadRecord(rec);
					me.mt.customerPhoto(f.down("#clusterfacilities_layermapimage"), rec.get("layer_img"), me.myConfig.IMG_FOLDER_CF);
					gd.getStore().load({
						params: {
							clusterfacilities_clusterfacilities_id: rec.get("clusterfacilities_id")
						}
					});
				}
			}
		};
		return x;
	},
	mainDataSave: function () {
		var me = this;
		me.insSave({
			form: me.getFormdata(),
			grid: me.getGrid(),
			// store: me.localStore.detail,
			finalData: function (data) {
				data['detail'] = me.getGriddetail().getJson();
				return data;
			},
			sync: true,
			callback: {
				create: function (store, form, grid) {

				}
			}
		});
	},
	gfFuncs: function () {
		var me = this;
		var x = {
			destroy: function (rec) {
				var id = me.tools.intval(rec.get("clusterfacilities_images_id"));
				if (id > 0) {
					me.tools.gridHelper(me.getGrid()).maindetailUpdateDeletedRows(me.getFormdata(), rec.get("clusterfacilities_images_id"));
				}
			},
			showForm: function (state) {
				var fd = me.getFormdetail();
				fd.down("[name=clusterfacilities]").setValue(me.getFormdata().down("[name=clusterfacilities]").getValue());
				if (state === 'Edit') {
					var rec = me.getGriddetail().getSelectedRecord();
					if (rec) {
						me.refreshPhotoInfoDetail(rec.get("image"));
					}
				}
			}
		};
		return x;
	}
});