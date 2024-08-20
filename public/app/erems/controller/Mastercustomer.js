Ext.define('Erems.controller.Mastercustomer', {
	extend: 'Erems.library.template.controller.Controllerwb',
	alias: 'controller.Mastercustomer',
	views: ['mastercustomer.Panel', 'mastercustomer.Grid', 'mastercustomer.FormSearch', 'mastercustomer.FormData'],
	stores: ['Kewarganegaraan'],
	//models: ['Mastercustomer'],
	requires: ['Erems.library.ComboLoader', 'Erems.library.ModuleTools'],
	refs: [
		{
			ref: 'grid',
			selector: 'mastercustomergrid'
		},
		{
			ref: 'formsearch',
			selector: 'mastercustomerformsearch'
		},
		{
			ref: 'formdata',
			selector: 'mastercustomerformdata'
		},
		{
			ref: 'griddocument',
			selector: 'mastercustomergriddocument'
		},
		{
			ref: 'formdatadocument',
			selector: 'mastercustomerformdatadocument'
		},
		{
			ref: 'gridaddress',
			selector: 'mastercustomergridaddress'
		},
		{
			ref: 'formdataaddress',
			selector: 'mastercustomerformdataaddress'
		},
		{
			ref: 'gridrevision',
			selector: 'mastercustomergridrevision'
		},
		{
			ref: 'formdatarevision',
			selector: 'mastercustomerformdatarevision'
		},
		{
			ref: 'formdatarevisiondocument',
			selector: 'mastercustomerformdatarevisiondocument'
		},
		{
			ref: 'gridrevisionaddress',
			selector: 'mastercustomergridrevisionaddress'
		},
	],
	controllerName: 'mastercustomer',
	formWidth: 750,
	fieldName: 'name',
	comboBoxIdEl: ['fd_cb_purpose', 'fd_cb_religion', 'fd_cb_purposebuy'],
	bindPrefixName: 'Mastercustomer',
	localStore: {
		detail: null,
		detailrevision: null
	},
	validationItems: [{name: 'name', msg: 'Name is empty'}

	],
	comboLoader: null,
	cbf: null,
	mt: null,
	formxWinId: 'win-customerwinId',
	dataProvinsi: null,
	dataKota: null,
	constructor: function (configs) {
		this.callParent(arguments);
		var me = this;
		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});

		me.cbf = new Erems.template.ComboBoxFields();
	},
	daftarDocumentType: null,
	init: function (application) {
		var me = this;
		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
		if (typeof ApliJs === "undefined") {
			Ext.Loader.injectScriptElement(document.URL + 'app/erems/js/ApliJs.js?_=' + new Date().getTime(), function () {

				console.log("[INFO] ApliJs loaded.");

			}, function () {
				// error load file
			});
		}
		this.control({
			'mastercustomerpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'mastercustomergrid': {
				afterrender: this.gridAfterRender,
				beforerender: this.mastercustomergridBeforeRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: function (el) {
					this.gridSelectionChange();
					this.gridActivateRevision();
				}
			},

			'mastercustomergrid toolbar button[action=create]': {
				click: function (el) {
					//   this.formDataShow(el,'create','create');
				}
			},
			'mastercustomergrid toolbar button[action=update]': {
				click: function (el) {
					//  this.formDataShow(el,'update','update');
				}
			},
			'mastercustomergrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'mastercustomergrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'mastercustomergrid toolbar button[action=upload_customer]': {
				click: this.upload_customer
			},
			'mastercustomergrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.insActionColumnClick
			},
			'mastercustomerformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'mastercustomerformsearch button[action=search]': {
				click: this.dataSearch
			},
			'mastercustomerformsearch button[action=reset]': {
				click: this.dataReset
			},
			'mastercustomerformdata': {
				afterrender: this.formDataAfterRender
			},
			'mastercustomerformdata button[action=save]': {
				click: this.mainDataSave
			},
			'mastercustomerformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'mastercustomerformdata #fd_photo': {
				change: function (fld, a) {
					me.formDataUploadImage(fld, a, 'photo');
				}
			},
			'mastercustomerformdata #fd_ktp': {
				change: function (fld, a) {
					me.formDataUploadImage(fld, a, 'ktp');
				}
			},
			'mastercustomerformdata #fd_npwp': {
				change: function (fld, a) {
					me.formDataUploadImage(fld, a, 'npwp');
				}
			},
			'mastercustomerformdata #fd_name': {
				keyup: me.createUsername
			},
			'mastercustomerformdata #fd_birthdate': {
				select: me.createUsername
			},
			'mastercustomerformdata [name=name]': {
				blur: me.nameAddressOnBlur
			},
			'mastercustomerformdata [name=address]': {
				blur: me.nameAddressOnBlur
			},
			/* BROWSE CONTROL */
			'mastercustomerbrowsepanel': {
				beforerender: me.browsepanelBeforeRender
			},
			'mastercustomerbrowsepanel button[action=select]': {
				click: me.browsegridSelection
			},
			'mastercustomerbrowsegrid': {
				afterrender: me.browsegridAfterRender
			},
			'mastercustomerformdata button[action=documents]': {
				click: function () {
					me.showDocuments();
				}
			},
			'mastercustomergriddocument button[action=create]': {
				click: function () {
					me.griddocumentButtonClick('create');
				}
			},
			'mastercustomergriddocument button[action=update]': {
				click: function () {
					me.griddocumentButtonClick('update');
				}
			},
			'mastercustomergriddocument button[action=destroy]': {
				click: function () {
					me.griddocumentButtonClick('destroy');
				}
			},
			'mastercustomerformdatadocument #fd_file': {
				change: function (fld, a) {
					me.formDataUploadFileDoc(fld, a, 'document');
				}
			},
			'mastercustomerformdatadocument button[action=save]': {
				click: function (fld, a) {
					me.saveDocument();
				}
			},

			/// MULTI ADDRESS
			'mastercustomerformdata button[action=multi_address]': {
				click: function () {
					me.showAddress();
				}
			},
			'mastercustomergridaddress button[action=create]': {
				click: function () {
					me.gridaddressButtonClick('create');
				}
			},
			'mastercustomergridaddress button[action=update]': {
				click: function () {
					me.gridaddressButtonClick('update');
				}
			},
			'mastercustomergridaddress button[action=destroy]': {
				click: function () {
					me.gridaddressButtonClick('destroy');
				}
			},

			'mastercustomerformdataaddress button[action=save]': {
				click: function (fld, a) {
					me.saveAddress();
				}
			},

			/* END BROWSE CONTROL */
			/* start: added by david prasetyo */
			'mastercustomergrid toolbar button[action=showrevisionlist]': {
				click: function () {
					me.showRevisionList();
				}
			},
			'mastercustomergridrevision': {
				itemdblclick: this.gridItemDblClickRevision,
				selectionchange: this.gridSelectionChangeRevision
			},
			'mastercustomerformdatarevision button[action=save]': {
				click: this.saveRevision
			},
			'mastercustomerformdatarevision button[action=reject]': {
				click: this.rejectRevision
			},
			'mastercustomerformdatarevision #btnCurrentData': {
				click: this.showCurrentData
			},
			'mastercustomergridrevision button[action=update]': {
				click: this.gridItemDblClickRevision
			},
			'mastercustomergridrevision toolbar button[action=destroy]': {
				click: this.dataDestroyRevision
			},

			'mastercustomerformdatarevision button[action=documents]': {
				click: function () {
					me.showDocuments();
				}
			},
			'mastercustomerformdatarevisiondocument #fd_file': {
				change: function (fld, a) {
					me.formDataUploadFileDoc(fld, a, 'document');
				}
			},
			'mastercustomerformdatarevisiondocument button[action=save]': {
				click: function (fld, a) {
					me.saveDocument();
				}
			},

			/// MULTI ADDRESS
			'mastercustomerformdatarevision button[action=multi_address]': {
				click: function () {
					me.showAddress();
				}
			},
			'mastercustomerformdatarevisionaddress button[action=save]': {
				click: function (fld, a) {
					me.saveAddress();
				}
			},

			/* ended: added by david prasetyo
			 
			 'mastercustomergriddocument button[action=destroy]': {
			 click: function() {
			 me.griddocumentButtonClick('destroy');
			 }
			 },
			 
			 
			 /*start added by ahmad riadi */
			'mastercustomerformdata [name=name] ': {
				'blur': function (that, The, eOpts) {
					var me, rowdata, form, valdata, counter;
					me = this;
					form = me.getFormdata();
					//me.setVal(form,"KTP_name",that.value);
					me.nameAddressOnBlur
				},
			},
			'mastercustomerformdata [name=address] ': {
				'blur': function (that, The, eOpts) {
					var me, rowdata, form, valdata, counter;
					me = this;
					form = me.getFormdata();
					//me.setVal(form,"KTP_address",that.value);
					me.nameAddressOnBlur
				},
			},
			'mastercustomerformdata [name=general_kewarganegaraan] ': {
				'select': function (g, record, item, index, e, eOpts) {
					var me, rowdata, form;
					me = this;
					rowdata = record[0]['data'];
					me.paramdata.flagkewarganegaraan = rowdata.kewarganegaraan;
					me.validationKewarganegaraan();
				},
			},
			'mastercustomerformdata [name=general_kodewna] ': {
				'blur': function (that, The, eOpts) {
					var me, rowdata, form, valdata, counter;
					me = this;
					me.validationWna("general_kodewna", that.value);
				},
			},
			'mastercustomerformdata [name=nationality] ': {
				'blur': function (that, The, eOpts) {
					var me, rowdata, form, valdata, counter;
					me = this;
					me.validationWna("nationality", that.value);
				},
			},
			'mastercustomerformdata [name=general_province_id] ': {
				'select': function (g, record, item, index, e, eOpts) {
					var me, rowdata, form;
					me = this;
					rowdata = record[0]['data'];
					me.getDependentCity(rowdata.province_id, "city_city_id");
				},
			},
			'mastercustomerformdata [name=identitas_province_id] ': {
				'select': function (g, record, item, index, e, eOpts) {
					var me, rowdata, form;
					me = this;
					rowdata = record[0]['data'];
					me.getDependentCity(rowdata.province_id, "identitas_city_id");
				},
			},
			/*end added by ahmad riadi */

			//addby anas 18012021
			'mastercustomergriddocument actioncolumn': {
				downloadaction: me.actionColumnDownload
			},

		});
	},
	saveDocument: function () {
		var me = this;
		var f = me.getFormdatadocument();
		var g = me.getGriddocument();
		var vs = f.getValues();

		var hasil = vs;
		if (!hasil.documenttype_documenttype_id) {
			me.tools.alert.warning("Tipe dokumen tidak valid.");
			return;
		}

		if (f.editedRow >= 0) { // update

			var rec = g.getStore().getAt(f.editedRow);
			rec.beginEdit();
			rec.set(hasil);
			rec.endEdit();
		} else { // create
			g.getStore().add(hasil);

		}

		f.setLoading("Sedang menyimpan...");
		me.tools.ajax({
			params: {
				data: Ext.encode(hasil)
			},
			success: function (data, model) {

				//me.getGrid().getStore().loadPage(1);
				f.setLoading(false);
				if (!data.others[0][0]['HASIL']) {
					me.tools.alert.warning(data.others[0][0]['MSG']);
					return;
				}

				g.getStore().loadPage(1);
				f.up("window").close();

			}
		}).read('savedocument');


	},
	refreshDocumentImageInfo: function (imageName) {
		var me = this;
		var form = me.getFormdatadocument();
		form.down("[name=filename]").setValue(imageName.imageName);
		me.mt.customerPhoto(form.down("#file_image"), imageName.imageName, 'app/erems/uploads/customerdocuments/', '360px 170px');
	},
	formDataUploadFileDoc: function (fld, a, mode) {

		var me = this;
		var form = fld.up("form");

		// update by anas 18012021
		me.uploadFile({
			form: form,
			params: {mode: mode},
			callback: {
				success: function (imageName) {

					me.refreshDocumentImageInfo(imageName);
				},
				failure: function () {

				}
			}
		});
	},
	griddocumentButtonClick: function (action) {
		var me = this;
		var g = me.getGriddocument();
		var fm = me.getFormdata();
		if (typeof fm == 'undefined') {
			var fm = me.getFormdatarevision();
		}
		var cId = fm.down("[name=customer_id]").getValue();
		if (action === "create") {
			var w = me.instantWindow('FormDataDocument', 400, 'Documents', 'documents', 'myCustomerDocumentFormWindow');
			var f = me.getFormdatadocument();
			f.editedRow = -1;
			me.tools.wesea(me.daftarDocumentType, f.down("[name=documenttype_documenttype_id]")).comboBox();
			f.down("[name=customer_customer_id]").setValue(cId);
		} else if (action === "update") {


			var row = g.getSelectedRow();
			if (row >= 0) {
				var w = me.instantWindow('FormDataDocument', 400, 'Documents', 'documents', 'myCustomerDocumentFormWindow');

				var f = me.getFormdatadocument();
				f.editedRow = row;
				me.tools.wesea(me.daftarDocumentType, f.down("[name=documenttype_documenttype_id]")).comboBox();
				f.loadRecord(g.getStore().getAt(row));
				me.refreshDocumentImageInfo(g.getStore().getAt(row).get('filename'));
// f.down("[name=documenttype_documenttype_id]").setValue(g.getStore().getAt(row).get("documenttype_documenttype_id"));
				//f.down("[name=customer_customer_id]").setValue(cId);
			} else {
				me.tools.alert.warning("Tidak ada dokumen yang terpilih.");
			}


			// me.tools.wesea(data.city, form.down("[name=city_" + me.cbf.city.v + "]")).comboBox();
		} else if (action === "destroy") {
			var row = g.getSelectedRow();
			if (row >= 0) {

				Ext.Msg.show({
					title: 'Konfirmasi',
					msg: 'Are you sure to delete this document?',
					buttons: Ext.Msg.YESNO,
					icon: Ext.Msg.QUESTION,
					fn: function (clicked) {

						if (clicked === "yes") {
							g.up("window").setLoading("Sedang menghapus...");
							me.tools.ajax({
								params: {
									customerdocument_id: g.getStore().getAt(row).get("customerdocument_id")
								},
								success: function (data, model) {

									//me.getGrid().getStore().loadPage(1);
									g.up("window").setLoading(false);
									if (!data.others[0][0]['HASIL']) {
										me.tools.alert.warning(data.others[0][0]['MSG']);
										return;
									}

									g.getStore().loadPage(1);


								}
							}).read('deletedocument');
						}
					}
				});



			} else {
				me.tools.alert.warning("Tidak ada dokumen yang terpilih.");
			}
		}



	},
	showDocuments: function () {
		var me = this;

		var fm = me.getFormdata();
		if (typeof fm == 'undefined') {
			var fm = me.getFormdatarevision();
		}

		var cId = fm.down("[name=customer_id]").getValue();
		var tempId = '';
		if (cId <= 0) {
//            me.tools.alert.warning("Invalid customer.");
//            return;
			var date = new Date();
			tempId = moment(date).format('YYYYMMDD') + apps.uid;
		}

		var w = me.instantWindow('GridDocument', 650, 'Documents', 'actiondo', 'myCustomerDocumentWindow');
		var g = me.getGriddocument();
		g.doInit();
		g.getSelectionModel().setSelectionMode('SINGLE');
		g.getStore().getProxy().setExtraParam("customer_id", cId);
		g.getStore().getProxy().setExtraParam("temp_id", tempId);
		g.getStore().load({
			callback: function (rec, op) {
				g.attachModel(op);
			}
		});

	},

	saveAddress: function () {
		var me = this;
		var fm = me.getFormdata();
		var f = me.getFormdataaddress();
		var g = me.getGridaddress();
		var vs = f.getValues();

		var hasil = vs;

		if (f.editedRow >= 0) { // update

			var rec = g.getStore().getAt(f.editedRow);
			rec.beginEdit();
			rec.set(hasil);
			rec.endEdit();
		} else { // create
			g.getStore().add(hasil);

		}

		f.setLoading("Sedang menyimpan...");
		me.tools.ajax({
			params: {
				data: Ext.encode(hasil)
			},
			success: function (data, model) {

				//me.getGrid().getStore().loadPage(1);
				f.setLoading(false);
				if (!data.others[0][0]['HASIL']) {
					me.tools.alert.warning(data.others[0][0]['MSG']);
					return;
				}

				/// update customer address jika dijadikan default address
				if (me.tools.intval(vs.is_default) == 1) {
					fm.down("[name=address]").setValue(vs.address);
				}

				g.getStore().loadPage(1);
				f.up("window").close();

			}
		}).read('saveaddress');


	},

	gridaddressButtonClick: function (action) {
		var me = this;
		var g = me.getGridaddress();
		var fm = me.getFormdata();
		if (typeof fm == 'undefined') {
			var fm = me.getFormdatarevision();
		}
		var cId = fm.down("[name=customer_id]").getValue();
		if (action === "create") {
			var w = me.instantWindow('FormDataAddress', 400, 'Address', 'address', 'myCustomerAddressFormWindow');
			var f = me.getFormdataaddress();
			f.editedRow = -1;

			f.down("[name=customer_customer_id]").setValue(cId);
		} else if (action === "update") {

			var row = g.getSelectedRow();
			if (row >= 0) {
				var w = me.instantWindow('FormDataAddress', 400, 'Address', 'address', 'myCustomerAddressFormWindow');
				var f = me.getFormdataaddress();
				f.editedRow = row;
				f.loadRecord(g.getStore().getAt(row));


			} else {
				me.tools.alert.warning("Tidak ada dokumen yang terpilih.");
			}


			// me.tools.wesea(data.city, form.down("[name=city_" + me.cbf.city.v + "]")).comboBox();
		} else if (action === "destroy") {
			var row = g.getSelectedRow();
			if (row >= 0) {

				Ext.Msg.show({
					title: 'Konfirmasi',
					msg: 'Are you sure to delete this address?',
					buttons: Ext.Msg.YESNO,
					icon: Ext.Msg.QUESTION,
					fn: function (clicked) {

						if (clicked === "yes") {
							g.up("window").setLoading("Sedang menghapus...");
							me.tools.ajax({
								params: {
									customeraddress_id: g.getStore().getAt(row).get("customeraddress_id")
								},
								success: function (data, model) {

									//me.getGrid().getStore().loadPage(1);
									g.up("window").setLoading(false);
									if (!data.others[0][0]['HASIL']) {
										me.tools.alert.warning(data.others[0][0]['MSG']);
										return;
									}

									g.getStore().loadPage(1);


								}
							}).read('deleteaddress');
						}
					}
				});



			} else {
				me.tools.alert.warning("Tidak ada address yang terpilih.");
			}
		}



	},
	showAddress: function () {
		var me = this;

		var fm = me.getFormdata();
		if (typeof fm == 'undefined') {
			var fm = me.getFormdatarevision();
		}

		var cId = fm.down("[name=customer_id]").getValue();
		if (cId <= 0) {
			me.tools.alert.warning("Invalid customer.");
			return;
		}
		var w = me.instantWindow('GridAddress', 400, 'Address', 'actiondoa', 'myCustomerAddressRevisionWindow');
		var g = me.getGridaddress();

		g.doInit();
		g.getSelectionModel().setSelectionMode('SINGLE');
		g.getStore().getProxy().setExtraParam("customer_id", cId);
		g.getStore().load({
			callback: function (rec, op) {
				g.attachModel(op);
			}
		});

	},
	nameAddressOnBlur: function () {
		var me = this;
		var f = me.getFormdata();

		if (f.down("[name=is_change_ktpaddress]").checked) {
			f.down("[name=KTP_name]").setValue(f.down("[name=name]").getValue());
			f.down("[name=KTP_address]").setValue(f.down("[name=address]").getValue());
		}

	},
	createUsername: function (ele) {
		var me = this;
		var form = me.getFormdata();

		var cName = form.down('#fd_name').getValue();
		var birthd = form.down('#fd_birthdate').getValue();
		var mbirth, dbirth;
		var newCName = '';
		var cNameArr = '';
		if (cName.length >= 8 && birthd != null) {
			cNameArr = cName.replace(/ /g, "");
			if (cNameArr.length > 8) {
				birthd = Ext.Date.format(birthd, "d m y").split(" ");
				mbirth = birthd[1];
				dbirth = birthd[0];
				newCName = cNameArr.substr(0, 6) + '' + dbirth + '' + mbirth;
				form.down('#fd_username').setValue(newCName);
				form.down('[name=password]').setValue('pass12345');
			}
		}



	},
	searchStringInArray: function (str, strArray, keySearch, keyId) {
		if (str) {
			var str = str.trim();
			var str = str.toLowerCase();
			var str = str.replace("kabupaten", "");
			var str = str.replace("kota", "");
			var str = str.trim();
			for (var j = 0; j < strArray.length; j++) {
				strInArr = strArray[j][keySearch];
				strInArr = strInArr.toLowerCase();
				if (strInArr.match(str))
					return strArray[j][keyId];
			}
		}
		return "";
	},

	formDataUploadImage: function (fld, a, mode) {

		var me = this;
		var form = fld.up("form");
		me.uploadImage({
			form: form,
			params: {mode: mode},
			callback: {
				success: function (res) {
					if (mode == 'photo') {
						var icon = Ext.Msg.INFO;
						var msg = 'Image Uploaded';
						Ext.Msg.show({
							title: 'Info',
							msg: msg,
							icon: icon,
							buttons: Ext.Msg.OK
						});
						me.refreshPhotoInfo(res.imageName);
					} else if (mode == 'ktp') {
						var form = me.getFormdata();
//						return false;
						var hasil = JSON.parse(res.hasil)[0];
						if (res.error_msg != "") {
							var icon = Ext.Msg.WARNING;
							Ext.Msg.show({
								title: 'Info',
								msg: res.error_msg,
								icon: icon,
								buttons: Ext.Msg.OK
							});
						}
//						else if (hasil.identity_number != "" && hasil.fullname != "" && hasil.identity_number != null && hasil.fullname != null) {
						else {
							rt = "";
							rw = "";
							if (hasil.state == "rejected") {
								var icon = Ext.Msg.WARNING;
								var msg = 'Data KTP tidak bisa terbaca, Silakan menggunakan gambar yang lain!';
								Ext.Msg.show({
									title: 'Info',
									msg: msg,
									icon: icon,
									buttons: Ext.Msg.OK
								});
							} else {
								if (hasil.rt_rw != "" && hasil.rt_rw != null && typeof hasil.rt_rw != "undefined") {
									var rt_rw = hasil.rt_rw.split("/");
									rt = null;
									rw = null;
									if (typeof rt_rw[0] !== 'undefined') {
										rt = rt_rw[0].trim();
									}
									if (typeof rt_rw[1] !== 'undefined') {
										rw = rt_rw[1].trim();
									}
								}
								var icon = Ext.Msg.INFO;
								var msg = 'Data KTP berhasil di konversi OCR ke kolom yang berwarna hijau muda. Harap di cek kembali, apabila ada kesalahan silakan di koreksi dan pastikan data nya benar.';
								Ext.Msg.show({
									title: 'Info',
									msg: msg,
									icon: icon,
									buttons: Ext.Msg.OK
								});
								me.refreshPhotoKTP(res.imageName);
								me.getFormdata().down("#ktp_panel").show();
								me.getFormdata().down("#general_panel").el.setStyle({'margin-top': 250});

								provId = me.searchStringInArray(hasil.province, me.dataProvinsi['data'], 'province_name', 'province_id');
								if (provId > 0) {
									me.getDependentCity(provId, "city_city_id");
									me.getDependentCity(provId, "identitas_city_id");
								}
								cityId = me.searchStringInArray(hasil.city, me.dataKota['data'], 'city_name', 'city_id');
								form.down('[name=file_ktp_name]').setValue(res.imageName);
								form.down('[name=file_ktp_name]').setFieldStyle('background:#e1f5e6');
								form.down('[name=NPWP_name]').setValue(hasil.fullname);
								form.down('[name=NPWP_name]').setFieldStyle('background:#e1f5e6');
								form.down('[name=NPWP_address]').setValue(hasil.address + (rt != "" ? " RT/RW: " + rt + "/" + rw : "") + (hasil.kel_desa != "" ? " Kelurahan: " + hasil.kel_desa : "") + (hasil.kecamatan != "" ? " Kecamatan: " + hasil.kecamatan : ""));
								form.down('[name=NPWP_address]').setFieldStyle('background:#e1f5e6');
								form.down('[name=name]').setValue(hasil.fullname);
								form.down('[name=name]').setFieldStyle('background:#e1f5e6');
								form.down('[name=gender]').setValue(hasil.gender);
								form.down('[name=gender]').setFieldStyle('background:#e1f5e6');
								form.down('[name=address]').setValue(hasil.address + (rt != "" ? " RT/RW: " + rt + "/" + rw : "") + (hasil.kel_desa != "" ? " Kelurahan: " + hasil.kel_desa : "") + (hasil.kecamatan != "" ? " Kecamatan: " + hasil.kecamatan : ""));
								form.down('[name=address]').setFieldStyle('background:#e1f5e6');
								form.down('[name=general_pekerjaan]').setValue(hasil.occupation);
								form.down('[name=general_pekerjaan]').setFieldStyle('background:#e1f5e6');
								form.down('[name=general_pekerjaan_baru]').setValue(hasil.occupation);
								form.down('[name=general_pekerjaan_baru]').setFieldStyle('background:#e1f5e6');
								form.down('[name=general_rt]').setValue(rt);
								form.down('[name=general_rt]').setFieldStyle('background:#e1f5e6');
								form.down('[name=general_rw]').setValue(rw);
								form.down('[name=general_rw]').setFieldStyle('background:#e1f5e6');
								form.down('[name=general_kecamatan]').setValue(hasil.kecamatan);
								form.down('[name=general_kecamatan]').setFieldStyle('background:#e1f5e6');
								form.down('[name=general_kelurahan]').setValue(hasil.kel_desa);
								form.down('[name=general_kelurahan]').setFieldStyle('background:#e1f5e6');
								form.down('[name=marital_status]').setValue(hasil.marital_status);
								form.down('[name=marital_status]').setFieldStyle('background:#e1f5e6');
								form.down('[name=marital_status_baru]').setValue(hasil.marital_status);
								form.down('[name=marital_status_baru]').setFieldStyle('background:#e1f5e6');
								form.down('[name=general_province_id]').setValue(provId);
								form.down('[name=general_province_id]').setFieldStyle('background:#e1f5e6');
								form.down('[name=city_city_id]').setValue(cityId);
								form.down('[name=city_city_id]').setFieldStyle('background:#e1f5e6');
								form.down('[name=religion_religion_id]').setValue(hasil.religion);
								form.down('[name=religion_religion_id]').setFieldStyle('background:#e1f5e6');
								form.down('[name=birthplace]').setValue(hasil.birth_place);
								form.down('[name=birthplace]').setFieldStyle('background:#e1f5e6');
								form.down('[name=birthdate]').setValue(hasil.birth_date);
								form.down('[name=birthdate]').setFieldStyle('background:#e1f5e6');
								form.down('[name=identitas_documenttype_id]').setValue(1);
								form.down('[name=identitas_documenttype_id]').setFieldStyle('background:#e1f5e6');
								form.down('[name=KTP_number]').setValue(hasil.identity_number);
								form.down('[name=KTP_number]').setFieldStyle('background:#e1f5e6');
								form.down('[name=KTP_name]').setValue(hasil.fullname);
								form.down('[name=KTP_name]').setFieldStyle('background:#e1f5e6');
								form.down('[name=KTP_address]').setValue(hasil.address + (rt != "" ? " RT/RW: " + rt + "/" + rw : "") + (hasil.kel_desa != "" ? " Kelurahan: " + hasil.kel_desa : "") + (hasil.kecamatan != "" ? " Kecamatan: " + hasil.kecamatan : ""));
								form.down('[name=KTP_address]').setFieldStyle('background:#e1f5e6');
								form.down('[name=identitas_province_id]').setValue(provId);
								form.down('[name=identitas_province_id]').setFieldStyle('background:#e1f5e6');
								form.down('[name=identitas_kecamatan]').setValue(hasil.kecamatan);
								form.down('[name=identitas_kecamatan]').setFieldStyle('background:#e1f5e6');
								form.down('[name=identitas_city_id]').setValue(cityId);
								form.down('[name=identitas_city_id]').setFieldStyle('background:#e1f5e6');
								form.down('[name=identitas_kelurahan]').setValue(hasil.kel_desa);
								form.down('[name=identitas_kelurahan]').setFieldStyle('background:#e1f5e6');
								form.down('[name=identitas_rt]').setValue(rt);
								form.down('[name=identitas_rt]').setFieldStyle('background:#e1f5e6');
								form.down('[name=identitas_rw]').setValue(rw);
								form.down('[name=identitas_rw]').setFieldStyle('background:#e1f5e6');
							}
						}
//						}else {
//							var icon = Ext.Msg.WARNING;
//							var msg = 'Data NIK / Nama tidak bisa terbaca, Silakan menggunakan gambar yang lain!';
//							Ext.Msg.show({
//								title: 'Info',
//								msg: msg,
//								icon: icon,
//								buttons: Ext.Msg.OK
//							});
//						}
					} else if (mode == 'npwp') {
						var form = me.getFormdata();
						var hasil = JSON.parse(res.hasil)[0];

						if (res.error_msg != "") {
							var icon = Ext.Msg.WARNING;
							Ext.Msg.show({
								title: 'Info',
								msg: res.error_msg,
								icon: icon,
								buttons: Ext.Msg.OK
							});
						} else {
							if (hasil.state == "rejected") {
								var icon = Ext.Msg.WARNING;
								var msg = 'Data NPWP tidak bisa terbaca, Silakan menggunakan gambar yang lain!';
								Ext.Msg.show({
									title: 'Info',
									msg: msg,
									icon: icon,
									buttons: Ext.Msg.OK
								});
							} else {
								var icon = Ext.Msg.INFO;
								var msg = 'Data NPWP berhasil di konversi OCR ke kolom yang berwarna hijau muda. Harap di cek kembali, apabila ada kesalahan silakan di koreksi dan pastikan data nya benar.';
								var npwp = hasil.npwp;

								if (typeof npwp != "undefined" && npwp != "" && npwp != null) {
									var npwp = npwp.replaceAll(".", "");
									var npwp = npwp.replaceAll("-", "");
								}

								Ext.Msg.show({
									title: 'Info',
									msg: msg,
									icon: icon,
									buttons: Ext.Msg.OK
								});

								form.down('[name=file_npwp_name]').setValue(res.imageName);
								form.down('[name=file_npwp_name]').setFieldStyle('background:#e1f5e6');
								form.down('[name=NPWP]').setValue(npwp);
								form.down('[name=NPWP]').setFieldStyle('background:#e1f5e6');
							}
						}
					}
				},
				failure: function () {

				}
			}
		});


	},
	uploadImage: function (params) {
		var me = this;
		var form = params.form;
		var callback = params.callback;
		form.submit({
			clientValidation: false,
			url: 'erems/' + me.controllerName + '/upload',
			params: params.params,
			waitMsg: 'Uploading image...',
			success: function (f, a) {
				if (!a.result.success) {
					icon = Ext.Msg.ERROR;
					msg = a.result.msg;
					Ext.Msg.show({
						title: 'Info',
						msg: msg,
						icon: icon,
						buttons: Ext.Msg.OK
					});
				} else {
					callback.success(a.result.msg);
				}
			},
			failure: function (f, a) {
				//  me.dataSave(me,dataForm);
//				console.log(f);
//				console.log(a);
				callback.failure();
				var msg = "...";
				if (typeof a.result !== "undefined") {
					msg = a.result.msg;
				} else {
					msg = "Please complete all the required field";
				}
				Ext.Msg.show({
					title: 'Fail',
					msg: msg,
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		});
	},
	mainDataSave: function () {
		var me = this;
		var form = me.getFormdata();

		var customerName = form.down('[name=name]').getValue();
		var addressCorr = form.down('[name=address]').getValue();
		var mobilePhone = form.down('[name=mobile_phone]').getValue();
		var birthDate = form.down('[name=birthdate]').getValue();
		var cityGeneral = form.down('[name=city_city_id]').getValue();
		var purposeBuy = form.down('[name=purposebuy_purposebuy_id]').getValue();
		var emailGeneral = form.down('[name=email]').getValue();
		var ktpNumber = form.down('[name=KTP_number]').getValue();
		var npwpNumber = form.down('[name=NPWP]').getValue();
		var npwpAddress = form.down('[name=NPWP_address]').getValue();
		var cityIdentity = form.down('[name=identitas_city_id]').getValue();
		var provinceGeneral = form.down('[name=general_province_id]').getValue();
		var provinceIdentity = form.down('[name=identitas_province_id]').getValue();
//        var tglAktaPendirian = form.down('[name=company_tanggalaktapendirian]').getValue();
//        var tglAktaPerubahan = form.down('[name=company_tanggalaktaperubahan]').getValue();
//        var tglAktaSusunan   = form.down('[name=company_tanggalaktasusunanpengurus]').getValue();
//        var cityCompany      = form.down('[name=company_city_id]').getValue();

//        var arrField         = {'Customer Name':customerName,'Address Coresspondence':addressCorr,'Mobile Phone':mobilePhone,'Birth Date':birthDate,'General City':cityGeneral,'Purpose Buy':purposeBuy,'General Email':emailGeneral,'Doc Number':ktpNumber,'NPWP Number':npwpNumber,'NPWP Address':npwpAddress,'Identity City':cityIdentity,'Tgl Akta Pendirian':tglAktaPendirian,'Tgl Akta Perubahan':tglAktaPerubahan,'Tgl Akta Susunan':tglAktaSusunan,'Company City':cityCompany};
		var arrField = {'Customer Name': customerName, 'Address Coresspondence': addressCorr, 'General Provinsi': provinceGeneral, 'Mobile Phone': mobilePhone, 'Birth Date': birthDate, 'General City': cityGeneral, 'Purpose Buy': purposeBuy, 'General Email': emailGeneral, 'Doc Number': ktpNumber, 'NPWP Number': npwpNumber, 'NPWP Address': npwpAddress, 'Identity City': cityIdentity, 'Identity Provinsi': provinceIdentity};


		if (me.isNull(arrField)) {
			var calculationDate = me.calcDate(birthDate, new Date());
			if (calculationDate.data_raw.year < 17 || calculationDate.data_raw.year > 100) {
				Ext.Msg.alert('Info', 'Umur Customer (' + calculationDate.result_ind + ').<br/>Harusnya umur customer minimal 17 Tahun dan Maksimal 100 Tahun.');
				return;
			} else {
				Ext.Msg.confirm('Confirm', 'Apakah data yg di input sudah Benar ?', function (btn) {
					if (btn == "yes") {
						me.tools.iNeedYou(me).save();
					}
				});

			}
		}

		/*   me.insSave({
		 form: me.getFormdata(),
		 grid: me.getGrid(),
		 store: me.localStore.detail,
		 finalData: function(data) {
		 return data;
		 },
		 sync: true,
		 callback: {
		 create: function(store, form, grid) {
		 // me.getGriddetail();
		 
		 }
		 }
		 });*/
	},
	isNull: function (arr) {
		var status = true;
		for (var key in arr) {
			if (arr[key] == 'undefined' || arr[key] == '' || arr[key] == null) {
				status = false;
				this.tools.alert.error(key + " Harus diisi..");
				break;
			} else {
				status = true;
			}
		}
		return status;
	},
	refreshPhotoInfo: function (imageName) {
		var me = this;
		var form = me.getFormdata();
		form.down("[name=photo]").setValue(imageName);

		//added by anas 17062021
		//jadi kalo gk ada foto gk load image
		if (imageName.length > 0)
		{
			me.mt.customerPhoto(form.down("#photo_image"), imageName, me.myConfig.IMG_FOLDER);
		}
	},
	refreshPhotoKTP: function (imageName) {
		var me = this;
		var form = me.getFormdata();
		if (imageName.length > 0) {
			me.mt.customerPhoto(form.down("#photo_ktp"), imageName, me.myConfig.IMG_FOLDER_CD, '370px 250px');
			form.down("#photo_ktp").el.setStyle({'background-repeat': 'no-repeat', 'background-position': 'center'});
		}
	},
	refreshPhotoInfoRevision: function (imageName) {
		var me = this;
		me.mt = new Erems.library.ModuleTools();
		var form = me.getFormdatarevision();
		form.down("[name=photo]").setValue(imageName);

		//added by anas 17062021
		//jadi kalo gk ada foto customer gk usah load image
		if (imageName.length > 0)
		{
			me.mt.customerPhoto(form.down("#photo_image"), imageName, me.myConfig.IMG_FOLDER);
		}
	},
	formDataAfterRender: function (el) {
		var state = el.up('window').state;
		// console.log("[WINDOW STATE] " + state);
		var me = this;
		me.fdar().init();


		if (state == 'create') {
			me.fdar().create();
		} else if (state == 'update') {
			me.fdar().update();
		} else if (state == 'view') {
			me.fdar().view();
		}
		me.getFormdata().down("#ktp_panel").el.setStyle({position: 'fixed', zIndex: 1000, padding: '0 0 0 0', background: 'none'});
	},
	fdar: function () {
		var me = this;
		var f = me.getFormdata();
		me.mt = new Erems.library.ModuleTools();

		if (typeof me.tools === 'undefined') {
			me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
		}

		var x = {
			init: function () {
				me.setActiveForm(f);
				me.localStore.detail = me.instantStore({
					id: me.controllerName + 'PLDetailStore',
					extraParams: {
						mode_read: 'maindetail'
					},
					idProperty: 'customer_id'
				});
			},
			create: function () {
				/* request model from zend */
				me.tools.ajax({
					params: {
						// purchaseletter_id: plId
					},
					/*success: function (data, model) {
					 me.fillFormComponents(data, f);
					 me.daftarDocumentType = data.documenttype;
					 me.localStore.detail.load({
					 callback: function (rec, op) {
					 me.attachModel(op, me.localStore.detail);
					 }
					 });
					 f.setLoading(false);
					 me.setVal(f, "general_kewarganegaraan", 'WNI');
					 }*/
					success: function (data, model) {
						//me.fillFormComponents(data, f);
						data.documenttype.data = jQuery.grep(data.documenttype.data, function (value) {
							return value.documentcategory_id == 1;
						});

						me.daftarDocumentType = data.documenttype;
						me.localStore.detail.load({
							callback: function (rec, op) {
								me.attachModel(op, me.localStore.detail);
							}
						});
						f.setLoading(false);
						me.setVal(f, "general_kewarganegaraan", 'WNI');
						me.fillFormComponents(data, f);
					}
				}).read('detail');
			},
			update: function () {

				//var rec = me.getGrid().getSelectedRecord();
				var rec = me.getGrid().getSelectedRecord();
				var idCustomer = typeof rec === "undefined" ? 0 : rec.get("customer_id");

				f.down("#formku3").setVisible(false);
				me.tools.ajax({
					params: {
					},
					success: function (data, model) {
						data.documenttype.data = jQuery.grep(data.documenttype.data, function (value) {
							return value.documentcategory_id == 1;
						});

						me.daftarDocumentType = data.documenttype;
						me.localStore.detail.load({
							params: {
								customer_id: idCustomer
							},
							callback: function (rec, op) {
								me.attachModel(op, me.localStore.detail);
								var rec = me.localStore.detail.getAt(0);

								me.getFormdata().loadRecord(rec);

								me.refreshPhotoInfo(rec.get("photo"));
								me.getFormdata().editedRow = me.getGrid().getSelectedRow();
							}
						});

						f.setLoading(false);
						me.fillFormComponents(data, f, rec.get("general_province_id"), rec.get("identitas_province_id"));
					}
				}).read('detail');

				// me.getFormdata().loadRecord(rec);
			}
		};
		return x;
	},
	fillFormComponents: function (data, form, genProvId = - 212, idenProvId = - 212) {
		var me = this;
		// console.log("[name=purpose_" + me.cbf.purpose.v + "]");
		me.tools.wesea(data.purpose, form.down("[name=purpose_" + me.cbf.purpose.v + "]")).comboBox();
		me.tools.wesea(data.purposebuy, form.down("[name=purposebuy_" + me.cbf.purposebuy.v + "]")).comboBox();
		me.tools.wesea(data.religion, form.down("[name=religion_" + me.cbf.religion.v + "]")).comboBox();
		me.tools.wesea(data.education, form.down("[name=education_" + me.cbf.education.v + "]")).comboBox();
		me.tools.wesea(data.city, form.down("[name=city_" + me.cbf.city.v + "]")).comboBox();
		me.tools.wesea(data.city, form.down("[name=company_" + me.cbf.city.v + "]")).comboBox();
		//citraclub_id

		/* start added by ahmad riadi */
		me.dataProvinsi = data.provinsi;
		me.dataKota = data.city;
		me.tools.wesea(data.provinsi, form.down("[name=general_province_id]")).comboBox();
		me.tools.wesea(data.documenttype, form.down("[name=identitas_documenttype_id]")).comboBox();
		me.tools.wesea(data.provinsi, form.down("[name=identitas_province_id]")).comboBox();
		me.tools.wesea(data.city, form.down("[name=identitas_city_id]")).comboBox();
		me.tools.wesea(data.bentukusaha, form.down("[name=ppatk_bentukusaha_id]")).comboBox();
		me.tools.wesea(data.instrumentpembayaran, form.down("[name=ppatk_instrumentpembayaran_id]")).comboBox();
		/* end added by ahmad riadi */
		me.tools.wesea(data.npwpklu, form.down("[name=NPWP_klu_id]")).comboBox();
		me.tools.wesea(data.npwpklasifikasiusaha, form.down("[name=NPWP_klasifikasiusaha_id]")).comboBox();
		me.getFormdata().down("[name=city_" + me.cbf.city.v + "]").getStore().filter({property: 'provinsi_province_id',
			value: genProvId,
		});
		me.getFormdata().down("[name=identitas_city_id]").getStore().filter({property: 'provinsi_province_id',
			value: idenProvId,
		});
	},
	/*start added by ahmad riadi */
	paramdata: {
		"flagkewarganegaraan": null,
	},
	validationKewarganegaraan: function () {
		var me, form, p, kewarganegaraan;
		me = this;
		p = me.paramdata;
		kewarganegaraan = p.flagkewarganegaraan;
		form = me.getFormdata();
		if (kewarganegaraan == "WNA") {
			me.setError(form, "general_kodewna", true, "This data data required");
			me.setError(form, "nationality", true, "This data data required");
			me.setAllow(form, "general_kodewna", false);
			me.setAllow(form, "nationality", false);
		} else {
			me.setError(form, "general_kodewna", false, "");
			me.setError(form, "nationality", false, "");
			me.setAllow(form, "general_kodewna", true);
			me.setAllow(form, "nationality", true);
		}
		me.setVal(form, "general_kodewna", "");
		me.setVal(form, "nationality", "");
	},
	validationWna: function (selector, valdata) {
		var me, rowdata, form, counter;
		me = this;
		form = me.getFormdata();
		counter = valdata.length;
		if (me.paramdata.flagkewarganegaraan == 'WNA' && counter > 0) {
			form.down("[name=" + selector + "]").setFieldStyle('background:none #FFFFFF;');
			form.down("[name=" + selector + "]").clearInvalid();
		}
	},
	getDependentCity: function (param, paramstore) {
		var me, f, provId, store;
		me = this;
		f = me.getFormdata();
		store = f.down("[name=" + paramstore + "]").getStore();
		store.clearFilter(true);
		store.filter({property: 'provinsi_province_id',
			value: param,
		});
//		store.filterBy(function (record) {
//			return record.data.provinsi_province_id == param;
//		});
	},
	setError: function (form, selector, flag, msg) {
		if (flag == true) {
			form.down("[name=" + selector + "]").setFieldStyle('background:none #FFFF00;');
			form.down("[name=" + selector + "]").markInvalid(msg);
		} else {
			form.down("[name=" + selector + "]").setFieldStyle('background:none #FFFFFF;');
			form.down("[name=" + selector + "]").clearInvalid();
		}
	},
	setAllow: function (form, selector, value) {
		form.down("[name=" + selector + "]").allowBlank = value;
	},
	setVal: function (form, selector, value) {
		form.down("[name=" + selector + "]").setValue(value);
	},
	/*end added by ahmad riadi */

	/*start: added by david prasetyo*/
	mastercustomergridBeforeRender: function () {
		var me = this;
		me.tools.ajax({
			params: {
			},
			success: function (data, model) {
				var isGranted = data.others[0][0].REVISIONAPPROVE;
				if (isGranted == true) {
					me.getGrid().down('#btnsShowrevisionlist').show();
				}
			}
		}).read('checkuser');
	},
	showRevisionList: function () {

		var me = this;
		var fm = me.getFormdata();
		var s = 'create';

		me.instantWindow('RevisionListForm', 900, 'Revision List', s, 'myRevisionWindow');

		var g = me.getGridrevision();
		var rows = me.getGrid().getSelectionModel().getSelection();
		var store = me.getGrid().getStore();
		var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';

		var CId = store.getAt(store.indexOf(rows[0])).internalId;

		g.doInit();
		g.getSelectionModel().setSelectionMode('SINGLE');
		g.getStore().getProxy().setExtraParam("customer_id", CId);
		g.getStore().load({
			callback: function (rec, op) {
				g.attachModel(op);
			}
		});
	},
	gridActivateRevision: function (el) {
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
		grid.down('#btnsShowrevisionlist').setDisabled(row.length < 1);
	},
	gridItemDblClickRevision: function (el) {
		var me = this,
				btnEdit = el.up('panel').down('#btnEditRevision'),
				state = 'update';

		var rec = me.getGridrevision().getSelectedRecord();
		var row = me.getGridrevision().getSelectionModel().getSelection();

		if (row[0].data.is_approved == 1 || row[0].data.is_rejected == 1) {
			me.tools.alert.warning("Disabled");
			throw "::Disabled";
		} else {
			var w = me.instantWindow('FormDataRevision', 750, 'Approve', state, 'FormDataRevision window');
		}

		var f = me.getFormdatarevision();
		f.loadRecord(rec);
		idCustomerTmp = rec.internalId;

		me.localStore.detailrevision = me.instantStore({
			id: me.controllerName + 'PLDetailStoreRevision',
			extraParams: {
				mode_read: 'maindetailrevision'
			},
			idProperty: 'customer_tmp_id'
		});

		me.tools.ajax({
			params: {
			},
			success: function (data, model) {

				me.fillFormComponents(data, f);

				me.localStore.detailrevision.load({
					params: {
						customer_tmp_id: idCustomerTmp
					},
					callback: function (rec, op) {

						me.attachModel(op, me.localStore.detailrevision);
						var rec = me.localStore.detailrevision.getAt(0);

						me.getFormdatarevision().loadRecord(rec);
						me.refreshPhotoInfoRevision(rec.get("photo"));
						me.getFormdatarevision().editedRow = 0;
					}
				});
			}
		}).read('detail');

		if (rec.data.is_approved == 1 || rec.data.is_rejected == 1) {
			me.getFormdatarevision().down('#btnSave').hide();
			me.getFormdatarevision().down('#btnReject').hide();
		} else {
			me.tools.ajax({
				params: {
				},
				success: function (data, model) {
					var isGranted = data.others[0][0].REVISIONAPPROVE;
					if (isGranted == true) {
						me.getFormdatarevision().down('#btnSave').show();
						me.getFormdatarevision().down('#btnReject').show();
					}
				}
			}).read('checkuser');
		}

	},
	gridSelectionChangeRevision: function () {
		var me = this;
		var grid = me.getGridrevision(), row = grid.getSelectionModel().getSelection();

		if (row.length > 0) {
			if (row[0].data.is_approved == 1 || row[0].data.is_rejected == 1) {
				grid.down('#btnEditRevision').setDisabled(1);
			} else {
				grid.down('#btnEditRevision').setDisabled(row.length < 1);
			}
		}


		//grid.down('#btnDeleteRevision').setDisabled(row.length < 1);
	},
	saveRevision: function () {
		/*Approve Revision*/
		var me = this;
		var f = me.getFormdatarevision();
		var g = me.getGridrevision();
		var values = f.getValues();
		var params = values;

		f.setLoading("Processing...");

		me.tools.ajax({
			params: params,
			success: function (data, model) {
				if (!data.others[0][0]['HASIL']) {
					me.tools.alert.warning(data.others[0][0]['MSG']);
					return;
				}
				g.getStore().loadPage(1);
				f.setLoading(false);
				f.up("window").close();
			}
		}).read('mainapproverevision');
	},
	rejectRevision: function () {
		var me = this;
		var f = me.getFormdatarevision();
		var g = me.getGridrevision();
		var values = f.getValues();
		var params = values;

		f.setLoading("Processing...");

		me.tools.ajax({
			params: params,
			success: function (data, model) {
				if (!data.others[0][0]['HASIL']) {
					me.tools.alert.warning(data.others[0][0]['MSG']);
					return;
				}
				g.getStore().loadPage(1);
				f.setLoading(false);
				f.up("window").close();
			}
		}).read('mainrejectrevision');
	},
	dataDestroyRevision: function () {
		var me = this;
		var rows = me.getGridrevision().getSelectionModel().getSelection();
		if (rows.length < 1) {
			Ext.Msg.alert('Info', 'No record selected !');
			return;
		} else {
			var confirmmsg, successmsg, failmsg;
			var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
			var store = me.getGridrevision().getStore();
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
						me.getGridrevision().up('window').mask('Deleting data, please wait ...');
					};
					for (var i = 0; i < rows.length; i++) {

						store.remove(rows[i]);
					}

					store.on('beforesync', msg);
					store.sync({
						success: function (s) {
							me.getGridrevision().up('window').unmask();
							var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
							var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
							store.un('beforesync', msg);
							store.reload();
							if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
								Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
							}
							Ext.Msg.show({
								title: 'Success',
								msg: successmsg,
								icon: Ext.Msg.INFO,
								buttons: Ext.Msg.OK
							});
						},
						failure: function () {
							me.getGridrevision().up('window').unmask();
							store.un('beforesync', msg);
							store.reload();
							Ext.Msg.show({
								title: 'Failure',
								msg: failmsg + ' The data may have been used.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					});
				}
			});
		}
	},
	showCurrentData: function (el) {

		var me = this,
				state = 'update';

		me.getFormdatarevision().up("window").setLoading("Loading...");

		var w = me.instantWindow('FormData', 750, 'Current Customer Data', state, 'FormData window');
		var rec = me.getGrid().getSelectedRecord();
		var f = me.getFormdata();
		var idCustomer = typeof rec === "undefined" ? 0 : rec.get("customer_id");


		/*button control & hide field*/
		me.getFormdata().down('#main_id').hide();
		me.getFormdata().down('#btnSave').hide();
		me.getFormdata().down('#fd_photo').hide();

		//READONLY all
		me.getFormdata().getForm().getFields().each(function (field) {
			field.setReadOnly(true);
		});

		me.localStore.detailcurrent = me.instantStore({
			id: me.controllerName + 'PLDetailStoreCurrent',
			extraParams: {
				mode_read: 'maindetailcurrent'
			},
			idProperty: 'customer_id'
		});
		me.tools.ajax({
			params: {
			},
			success: function (data, model) {

				me.fillFormComponents(data, f);

				me.localStore.detailcurrent.load({
					params: {
						customer_id: idCustomer
					},
					callback: function (rec, op) {
						me.attachModel(op, me.localStore.detailcurrent);
						var rec = me.localStore.detailcurrent.getAt(0);
						me.getFormdata().loadRecord(rec);
						me.refreshPhotoInfo(rec.get("photo"));
						me.getFormdata().editedRow = 0;
						me.getFormdatarevision().up("window").setLoading(false);
						me.getFormdata().down('#main_id').show();
					}
				});
			}
		}).read('detail');

	},
	upload_customer: function () {
		var me = this;
		$.ajax({
			method: "POST",
			url: "erems/mastercustomer/modalupload",
			data: ""
		}).done(function (msg) {
			ApliJs.showPhp(me, "modal_upload_customer", msg, 'true', 'body', '#modal-upload-customer', 'insert');
		});
	},

	apliJsFuncmodal_upload_customer: function (modalId) {
		var me = this;
		var x = {
			init: function () {

			},
			afterRender: function () {

				// ApliJs.reset();

				$(function () {

					$('.x-region-collapsed-placeholder').css("z-index", 1);

					$('#form-upload-customer').on("submit", function (e) {

						e.preventDefault();
						Ext.MessageBox.wait('Loading ...');
						$.ajax({

							url: "erems/mastercustomer/importexcel",
							method: "POST",
							data: new FormData(this),
							contentType: false,
							cache: false,
							processData: false,

							success: function (data) {
								Ext.MessageBox.updateProgress(1);
								var obj = JSON.parse(data);
//                                console.log(obj['status']);
								if (obj['status'] > 0) {
									$('#modal-upload-customer').modal('hide');
									Ext.MessageBox.hide();
									Ext.Msg.show({
										title: 'Warning',
										msg: '<div style="overflow: auto;"> Nomer KTP sudah ada: ' + obj['data'] + '</div>',
										icon: Ext.Msg.INFO,
										buttons: Ext.Msg.OK,
										height: 50,
										width: 200,
//                                        overflow: 'scroll',
									});
								} else {
									$('#modal-upload-customer').modal('hide');
									Ext.MessageBox.hide();
									Ext.Msg.show({
										title: 'Success',
										msg: 'Berhasil',
										icon: Ext.Msg.INFO,
										buttons: Ext.Msg.OK
									});
//                                    $('#messagebox-1001-innerCt').css('overflow', 'scroll !important');
								}

							}

						})

					});
				});



			}

		};

		return x;

	},

	//addby anas 18012021
	actionColumnDownload: function (view, rowIndex, colIndex, item, e, record, row) {
		//ceslive - updated by anas 01022021
		var url = window.location.protocol + "//" + window.location.host + '/webapps/Ciputra/public/app/erems/uploads/customerdocuments/' + view[5].data.filename;

		//cestest
		// var url = window.location.protocol+"//"+window.location.host+'/anastasia/Ciputra/public/app/erems/uploads/customerdocuments/'+view[5].data.filename;

		//local
		// var url = window.location.protocol+"//"+window.location.host+'/webapps/public/app/erems/uploads/customerdocuments/'+view[5].data.filename;

		var a = document.createElement('A');
		a.href = url;
		a.download = url.substr(url.lastIndexOf('/') + 1);
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	},

	//addby anas 18012021
	uploadFile: function (params) {
		var me = this;
		var form = params.form;
		var callback = params.callback;

		//updateby anas 22012021
		var filesize = 0;
		var filedoc = document.getElementsByName("file_browse")[0];
		if (filedoc != null)
			filesize = filedoc.files[0].size;

		if (filesize > 0 && filesize <= 5242880) //filesize max 5MB
		{

			form.submit({
				clientValidation: false,
				url: 'erems/' + me.controllerName + '/upload',
				params: params.params,
				waitMsg: 'Uploading file...',
				success: function (f, a) {

					var icon = Ext.Msg.INFO;
					var msg = 'File Uploaded';

					if (!a.result.success) {
						icon = Ext.Msg.ERROR;
						msg = a.result.msg;
					} else {
						callback.success(a.result.msg);
					}

					Ext.Msg.show({
						title: 'Info',
						msg: msg,
						icon: icon,
						buttons: Ext.Msg.OK
					});
				},
				failure: function (f, a) {
					callback.failure();
					var msg = "...";
					if (typeof a.result !== "undefined") {
						msg = a.result.msg;
					} else {
						msg = "Please complete all the required field";
					}
					Ext.Msg.show({
						title: 'Fail',
						msg: msg,
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});
				}
			});
		} else
		{
			var msg = "File upload maximum 5 MB";
			Ext.Msg.show({
				title: 'Fail',
				msg: msg,
				icon: Ext.Msg.ERROR,
				buttons: Ext.Msg.OK
			});
		}
	},

});