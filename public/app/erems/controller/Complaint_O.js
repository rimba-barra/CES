Ext.define('Erems.controller.Complaint', {
	extend   : 'Erems.library.template.controller.Controlleralt',
	alias    : 'controller.Complaint',
	requires : [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox',
		'Erems.library.template.component.Statusserahterimacombobox',
		'Erems.library.DetailtoolAll'
	],
	views       : ['complaint.Panel', 'complaint.Grid', 'complaint.FormSearch', 'complaint.FormData', 'complaint.DetailGrid', 'complaint.FormDataDetail', 'complaint.FormDataSurvey'],
	stores      : ['Jenissurat', 'Complaint', 'Unit', 'Mastercluster', 'Mastercustomer', 'Purchaseletterdetail', 'Masterblock', 'Utilitydetail', 'Complaintsurat', 'Complaintdetail', 'Mastercomplaintstatus', 'Mastercomplainttype', 'Mastercontractor', 'Masteremployee', 'Complaintimages', 'Mastergaransi', 'Masterparameterglobal', 'Complaintdokumen', 'ComplaintSurvey', 'Complainthistory'],
	models      : ['Complaint', 'Unit', 'Mastercustomer', 'Purchaseletterdetail', 'Masterblock', 'Utilitydetail', 'Complaintsurat', 'Complaintdetail', 'Mastercomplaintstatus', 'Mastercomplainttype', 'Mastercontractor', 'Masteremployee', 'Complaintimages', 'Mastergaransi', 'Complaintdokumen', 'ComplaintSurvey', 'Complainthistory'],
	detailTool  : null,
	detailTool2 : null,
	detailTool3 : null,
	detailTool4 : null,
	detailTool5 : null,
	detailTool6 : null,
	detailTool7 : null,
	detailTool8 : null,
	openedForm  : null,
	refs        : [
		{
			ref      : 'grid',
			selector : 'complaintgrid'
		},
		{
			ref      : 'formsearch',
			selector : 'complaintformsearch'
		},
		{
			ref      : 'formdata',
			selector : 'complaintformdata'
		},
		{
			ref      : 'detailgridsurat',
			selector : 'complaintdetailgridsurat'
		},
		{
			ref      : 'formdatadetailsurat',
			selector : 'complaintformdatadetailsurat'
		},
		{
			ref      : 'detailgrid',
			selector : 'complaintdetailgrid'
		},
		{
			ref      : 'formdatadetail',
			selector : 'complaintformdatadetail'
		},
		{
			ref      : 'formdatadetailrespon',
			selector : 'complaintformdatadetailrespon'
		},
		{
			ref      : 'detailgridimages',
			selector : 'complaintdetailgridimages'
		},
		{
			ref      : 'formdatadetailimages',
			selector : 'complaintformdatadetailimages'
		},
		{
			ref      : 'formdataviewimages',
			selector : 'complaintformdataviewimages'
		},
		{
			ref      : 'formdataviewimages2',
			selector : 'complaintformdataviewimages2'
		},
		{
			ref      : 'detailgriddokumen',
			selector : 'complaintdetailgriddokumen'
		},
		{
			ref      : 'formdatadetaildokumen',
			selector : 'complaintformdatadetaildokumen'
		},
		{
			ref      : 'formdatasurvey',
			selector : 'complaintformdatasurvey'
		},
		{
			ref      : 'detailgridsurvey',
			selector : 'complaintdetailgridsurvey'
		},
		{
			ref      : 'detailgridhistory',
			selector : 'complaintdetailgridhistory'
		},
	],
	controllerName  : 'complaint',
	fieldName       : 'purchaseletter_no',
	bindPrefixName  : 'Complaint',
	validationItems : [
		{name: 'purchaseletter_id', msg: 'You must select Kavling / Unit No. first'}
	],
	citrarayaset            : 0,
	formWidth               : 800,
	countLoadProcess        : 0,
	parametercomplaint      : 6, // 3 =  3 bulan, jadi komplain hanya bisa dilakukan maximal (3 Bulan = parameter) setelah tanggal serah terima
	recordmastergrid        : null,
	useSalesForce           : 0,
	sendSalesForceSH1Server : 0,
	bastwithoutST           : 0,
	init                    : function (application) {
		var me = this;

		this.control({
			test: me.eventMonthField,
			'complaintpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'complaintgrid': {
				afterrender     : this.gridAfterRender,
				itemdblclick    : this.gridItemDblClick,
				itemcontextmenu : this.gridItemContextMenu,
				selectionchange : this.gridSelectionChange,
			},
			'complaintgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'complaintgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'complaintgrid toolbar button[action=use_sales_force]': {
				click: function (el) {
					me.onOffSF(el);
				}
			},
			'complaintgrid toolbar button[action=send_sf_sh1]': {
				click: function (button, pressed) {
					me.onOffSFSH1(button, pressed);
				}
			},
			'complaintgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'complaintgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'complaintformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'complaintformsearch button[action=search]': {
				click: this.dataSearch
			},
			'complaintformsearch button[action=reset]': {
				click: this.dataReset
			},
			'complaintformdata': {
				beforerender: this.formDataBeforeRender,
				afterrender: this.formDataAfterRender
			},
			'complaintformdata button[action=sync]': {
				click: function () {
					me.dataSync();
				}
			},
			'complaintformdata button[action=save]': {
				click: function () {
					/* start edited by ahmad riadi 01-02-2017 */
					if (apps.subholdingId == 2) {
						var me        = this;
						var blockdata = me.validationhandover();

						if (blockdata.status < 1) {
							Ext.Msg.show({
								title   : 'WARNING',
								msg     : blockdata.message,
								buttons : Ext.Msg.OK,
								icon    : Ext.Msg.WARNING
							});
						} 
						else if (blockdata.status == 1) {
							me.dataSave();
						}
					} 
					else if (apps.subholdingId == 1 && apps.subholdingSub.trim() == "sh1b") {
						var me        = this;
						var blockdata = me.validationhandoverSH1B();

						if (blockdata.status < 1) {
							Ext.Msg.show({
								title   : 'WARNING',
								msg     : blockdata.message,
								buttons : Ext.Msg.OK,
								icon    : Ext.Msg.WARNING
							});
						} 
						else {
							me.dataSave();
						}
					} 
					else {
						var me = this;
						var blockdata = me.validationhandoverPinjampakai();

						if (blockdata.status < 1) {
							Ext.Msg.show({
								title   : 'WARNING',
								msg     : blockdata.message,
								buttons : Ext.Msg.OK,
								icon    : Ext.Msg.WARNING
							});
						} 
						else {
							me.dataSave();
						}
					}
					/* end edited by ahmad riadi 01-02-2017 */
				}
			},
			'complaintformdata button[action=cancel]': {
				click: this.formDataClose
			},
//            'complaintformdata button[action=download_bast_dok]': {
//                click: this.downloaddokumenbast
//            },
			//Add or Edit Detail Grid Surat
			'complaintdetailgridsurat': {
				selectionchange : me.detailGridSurat.gridDetailSuratSelectionChange,
			},
			'complaintdetailgridsurat toolbar button[action=create]': {
				click: function () {
					// if(accounting.unformat(this.getFormdata().down('[name=progress_pembayaran]').value) < 100 || accounting.unformat(this.getFormdata().down('[name=total_remaining_denda]').value) > 0){
					// 	Ext.Msg.show({
					// 		title   : 'WARNING',
					// 		msg     : "Surat undangan belum bisa dibuat karena pembayaran kurang dari 100% / masih terdapat denda",
					// 		buttons : Ext.Msg.OK,
					// 		icon    : Ext.Msg.WARNING
					// 	});
					// }
					// else 
					if(me.getDetailgridsurat().getStore().getCount() == 4){
						Ext.Msg.show({
							title   : 'WARNING',
							msg     : "Surat undangan tidak bisa dibuat lagi, karena jumlah sudah maksimal.",
							buttons : Ext.Msg.OK,
							icon    : Ext.Msg.WARNING
						});
					}
					else{
						me.detailTool.form().show('create', 500, 'Add New Surat');
						me.validateFormdataSurat();
					}
				}
			},
			'complaintformdatadetailsurat': {
				afterrender: this.formDataDetailSuratAfterRender
			},
			'complaintformdatadetailsurat button[action=save]': {
				click: me.detailFormSurat.save
			},
			'complaintdetailgridsurat actioncolumn': {
				click: me.detailGridSurat.actionColumnClick
			},
			'complaintdetailgridsurat #colms_is_hadir': {
				click : function(a,b,c,d,e,f,g){
					$("input[name='is_hadir']").change(function (r) {
						var y   = $(this);
						var val = y.is(":checked") ? 1 : 0;

						var msg = 'Are you sure you don\'t want to attend this invitation?';
						if(val){
							msg = 'Are you sure you want to attend this invitation?';
						}

						Ext.MessageBox.show({
							title   : 'Warning',
							msg     : msg,
							buttons : Ext.MessageBox.OKCANCEL,
							icon    : Ext.MessageBox.WARNING,
							fn      : function (btn) {
								if (btn == 'ok') {
									y.prop("checked", val);

									f.beginEdit();
									f.set({is_hadir : val});
									f.endEdit();
								} 
								else {
									var chk = val > 0 ? false : true;
									y.prop("checked", chk);

									f.beginEdit();
									f.set({is_hadir : chk});
									f.endEdit();
								}
							}
						});
					});
				}
			},
			'complaintformdatadetailsurat [name=undangan_date]': {
				select : function(i,v){
					var form     = me.getFormdatadetailsurat();
					var undangan = form.down('[name=undangan]').getValue();

					if(undangan == 2 || undangan == 3 || undangan == 'SEPIHAK'){
						var grid     = me.getDetailgridsurat();
						var dStore   = grid.getStore();
						var totStore = dStore.getCount();

						var prevIdx = dStore.indexOf(grid.getSelectionModel().getSelection()[0])-1;
						var prevRec = dStore.getAt(prevIdx);

						var nextIdx = dStore.indexOf(grid.getSelectionModel().getSelection()[0])+1;
						var nextRec = dStore.getAt(nextIdx);

						var paramSetting = me.NextDayUndanganDate1;
						if(undangan == 3){ paramSetting = me.NextDayUndanganDate2; }
						else if(undangan == 'SEPIHAK'){ paramSetting = me.NextDayUndanganDate3; }

						if(me.calcDate(v, prevRec.get('undangan_date')).total_days > paramSetting){
							Ext.Msg.show({
								title   : 'WARNING',
								msg     : "Durasi surat undangan " + undangan + " melebihi setingan default " + paramSetting + " hari dari surat undangan " + prevRec.get('undangan') + ".",
								buttons : Ext.Msg.OK,
								icon    : Ext.Msg.WARNING
							});
						}
					}
				}
			},
			//End Add or Edit Detail Grid Surat

			//Add or Edit Detail Grid Complaint
			'complaintdetailgrid toolbar button[action=create]': {
				click: function () {
					var me        = this;
					var blockdata = me.validationcomplainbyandoverdate();

					if (blockdata > 0) {
						Ext.Msg.show({
							title   : 'WARNING',
							msg     : "Complaint could be reported after 6 months of serah terima date ..!",
							buttons : Ext.Msg.OK,
							icon    : Ext.Msg.WARNING
						});
					} 
					else {
						me.detailTool2.form().show('create', 700, 'Add New Complaint', 'FormDetailComplaint');
					}
				}
			},
			'complaintformdatadetail': {
				beforerender : this.formDataDetailBeforeRender,
				afterrender  : this.formDataDetailAfterRender
			},
			'complaintformdatadetail button[action=save]': {
				click: me.detailForm.save //belum
			},
			'complaintdetailgrid actioncolumn': {
				click: me.detailGrid.actionColumnClick
			},

			//prev and next button show image from detail grid
			'complaintformdataviewimages2 button[action=prev_img]': {
				click: me.detailGrid.showPrevImgForm //belum
			},
			'complaintformdataviewimages2 button[action=next_img]': {
				click: me.detailGrid.showNextImgForm //belum
			},
			//end prev and next button show image from detail grid

			//form respon on detail grid
			'complaintformdatadetailrespon': {
				afterrender: this.formDataDetailResponAfterRender
			},
			'complaintformdatadetailrespon button[action=save]': {
				click: me.detailForm.saveRespon
			},
			//end form respon on detail grid

			//detail images
			'complaintdetailgridimages toolbar button[action=create]': {
				click: function () {
					me.detailTool4.form().show('create', 500, 'Add New Detail Images', 'FormDetailImages');
				}
			},
			'complaintdetailgridimages toolbar button[action=view]': {
				click: me.detailGridImages.viewImage
			},
			'complaintdetailgridimages': {
				selectionchange: me.detailGridImages.selectionChange
			},
			'complaintdetailgridimages actioncolumn': {
				click: me.detailGridImages.actionColumnClick
			},
			'complaintformdatadetailimages': {
				afterrender: this.formDataDetailImagesAfterRender
			},
			'complaintformdatadetailimages button[action=save]': {
				click: me.detailFormImages.save
			},
			'complaintformdataviewimages button[action=prev_img]': {
				click: me.detailGridImages.prevImg
			},
			'complaintformdataviewimages button[action=next_img]': {
				click: me.detailGridImages.nextImg
			},
			//end detail images

			//pilih aransi combobox dan serah terima date
			'complaintformdata combo[name=guaranteetype_sipil_id]': {
				select: function () {
					me.onSelectGaransi('sipil');
				}
			},
			'complaintformdata combo[name=guaranteetype_bocor_id]': {
				select: function () {
					me.onSelectGaransi('bocor');
				}
			},
			'complaintformdata datefield[name=serahterima_date]': {
				select: function () {
					if(me.subholding == 2){
						var form = me.getFormdata(), 
							dStore_sipil   = form.down('[name=guaranteetype_sipil_id]').getStore(),
							totStore_sipil = dStore_sipil.getCount(), 
							dStore_bocor   = form.down('[name=guaranteetype_bocor_id]').getStore(),
							totStore_bocor = dStore_bocor.getCount();

						var garansi_sipil = '';
						for (var i = 0; i < totStore_sipil; i++) {
							dStore_sipil.each(function (record, idx) {
								if (i == idx) {
									if(record.data.is_use == 1){
										garansi_sipil = record.data.guaranteetype_id;
									}
								}
							});
						}

						var garansi_bocor = '';
						for (var i = 0; i < totStore_bocor; i++) {
							dStore_bocor.each(function (record, idx) {
								if (i == idx) {
									if(record.data.is_use == 2){
										garansi_bocor = record.data.guaranteetype_id;
									}
								}
							});
						}

						form.down('[name=guaranteetype_sipil_id]').setValue(garansi_sipil);
						form.down('[name=guaranteetype_bocor_id]').setValue(garansi_bocor);
					}

					me.onSelectGaransi('sipil');
					me.onSelectGaransi('bocor');
				}
			},
			//end 

			//print
			'complaintgrid toolbar button[action=print_bast]': {
				click: this.docPrint
			},
			// print pinjam pakai
			'complaintgrid toolbar button[action=print_pinjam]': {
				click: this.docPrintPinjam
			},
			'complaintdetailgridsurat toolbar button[action=print_undangan]': {
				click: this.docPrintUndangan
			},
			//end print

			//detail dokumen
			'complaintdetailgriddokumen toolbar button[action=create]': {
				click: function () {
					me.detailTool7.form().show('create', 500, 'Add New Dokumen BAST', 'FormDetailDokumen');
				}
			},
			'complaintformdatadetaildokumen button[action=save]': {
				click: me.detailFormDokumen.save
			},
			'complaintdetailgriddokumen actioncolumn': {
				downloadaction: me.detailGridDokumen.actionColumnDownload
			},
			'complaintdetailgriddokumen': {
				selectionchange: me.detailGridDokumen.gridDetailDokumenSelectionChange
			},
			'complaintdetailgriddokumen toolbar button[action=delete]': {
				click: me.detailGridDokumen.deleteAction
			},
			//end detail dokumen

			'complaintgrid toolbar button[action=add_survey]': {
				click: function () {
					me.detailTool8.form().show('create', 500, 'Hasil Survey');
				}
			},
			'complaintformdatasurvey': {
				afterrender: this.formDataSurveyAfterRender
			},
			'complaintformdatasurvey button[action=save]': {
				click: me.detailFormSurvey.save
			},

			//added by anas 04082021
			'complaintdetailgridsurvey': {
				// selectionchange: me.detailGridSurvey.gridDetailSurveySelectionChange,
			},
			'complaintdetailgridsurvey toolbar button[action=update]': {
				click: me.detailGridSurvey.update
			},
			'complaintformdatasurvey button[action=reset]': {
				click: me.detailFormSurvey.reset
			},
			'complaintdetailgridhistory': {

			},

		});
	},
	onOffSF: function (button) {
		var me = this;
		
		var msg = "Mengaktifkan Sales Force?";
		if (me.useSalesForce == 1) {
			msg = "Menonaktifkan Sales Force?";
		}

		Ext.Msg.confirm('Sales Force', msg, function (btn) {
			if (btn == 'yes') {
				var value = 1;
				if (me.useSalesForce == 1) {
					value = 0;
				} 
				me.updateParameter('USE_SALES_FORCE', value);
			}
		});
	},
	onOffSFSH1: function (button, pressed) {
		var me = this;
		
		var msg = "Mengaktifkan Send Sales Force SH1 Server??";
		if (me.sendSalesForceSH1Server == 1) {
			msg = "Menonaktifkan Send Sales Force SH1 Server?";
		}

		Ext.Msg.confirm('Sales Force SH1 Server', msg, function (btn) {
			if (btn == 'yes') {
				var value = 1;
				if (me.sendSalesForceSH1Server == 1) {
					value = 0;
				}

				me.updateParameter('SEND_SALES_FORCE_SH1_SERVER', value);
			}
		});
	},
	updateParameter: function (parameterName, valueParam) {
		var me = this;
		var el = me.getGrid();
		
		el.up('window').body.mask('Update Parameter, Please Wait...');

		Ext.Ajax.request({
			url    : 'erems/complaint/read',
			params : {
				read_type_mode : 'updateParameter',
				parameter_name : parameterName,
				value          : valueParam
			},
			success : function (response) {
				try {
					var resp = response.responseText;
					if (resp) {
						var info = Ext.JSON.decode(resp);
						if (info.success == true) {
							if (parameterName == 'USE_SALES_FORCE') {
								var button = el.down('#use_sales_force');
								if (valueParam == 1) {
									button.setText('Use Sales Force : On');
									me.useSalesForce = 1;
									button.toggle(true);
									if (me.subholding == 2) {
										me.getGrid().down('#send_sf_sh1').setVisible(true);
									}
								} 
								else {
									button.setText('Use Sales Force : Off');
									me.useSalesForce = 0;
									button.toggle(false);
									me.getGrid().down('#send_sf_sh1').setVisible(false);
								}
							} 
							else if (parameterName == 'SEND_SALES_FORCE_SH1_SERVER') {
								var button = el.down('#send_sf_sh1');
								if (valueParam == 1) {
									button.setText('Send Sales Force SH1 Server  : On');
									me.sendSalesForceSH1Server = 1;
									button.toggle(true);
								} 
								else {
									button.setText('Send Sales Force SH1 Server  : Off');
									me.sendSalesForceSH1Server = 0;
									button.toggle(false);
								}
							}
							el.up('window').body.unmask();

						} 
						else {
							el.up('window').body.unmask();
							Ext.Msg.show({
								title   : 'Failure',
								msg     : 'Error: Update Parameter.',
								icon    : Ext.Msg.ERROR,
								buttons : Ext.Msg.OK
							});
						}
					}
				} catch (e) {
					console.error(e);
					el.up('window').body.unmask();
					Ext.Msg.show({
						title   : 'Failure',
						msg     : 'Error: Update Parameter.',
						icon    : Ext.Msg.ERROR,
						buttons : Ext.Msg.OK
					});
				}
			},
			failure : function (e) {
				console.error(e);
				el.up('window').body.unmask();
				Ext.Msg.show({
					title   : 'Failure',
					msg     : 'Error: Update Parameter.',
					icon    : Ext.Msg.ERROR,
					buttons : Ext.Msg.OK
				});
			}
		});
	},
	gridSelectionChange : function () {
		var me = this, grid = me.getGrid(), row = grid.getSelectionModel().getSelection();

		grid.down('#btnPrint').setDisabled(true);
		grid.down('#btnSurvey').setDisabled(true);

		grid.down('#btnPrintPinjam').setDisabled(true); // added by rico 23122022

		if (row.length == 1){
			grid.down('#btnSurvey').setDisabled(false);
		}

		if (row[0]) {
			if(row[0].data.pinjampakai_date > 1900){ // added by rico 23122022
				grid.down('#btnPrintPinjam').setDisabled(false);
			}

			if (me.bastwithoutST == 1) {
				if (row[0].data.customer_name != "" || row[0].data.purchaseletter_no != "") {
					grid.down('#btnPrint').setDisabled(false);
				}
			} else {
				if (apps.project == 5102) {
					grid.down('#btnPrint').setDisabled(false);
				}

				var serahterima_date    = row[0].data.serahterima_date;
				var complaintsuratStore = me.getComplaintsuratStore();

				complaintsuratStore.removeAll();
				complaintsuratStore.load({
					params   : {aftersales_id : row[0].data.aftersales_id},
					callback : function (rec) {
						var count_surat = 0
						$.each(rec, function (k, v) {
							count_surat += v.data.jenis_surat == 'SURAT' ? 1 : 0;
						});

						if (apps.subholdingId == 2) {
							if (count_surat > 0) {
								grid.down('#btnPrint').setDisabled(false);
							}
						} 
						else if (serahterima_date && row.length == 1) {
							grid.down('#btnPrint').setDisabled(false);
						}
					}
				});
			}
		}

		me.callParent(arguments);
	},
	formDataBeforeRender: function (el) {
		var me = this;
		setupObject(el, me.execAction, me);
	},
	formDataAfterRender: function (el) {
		var me = this;
		me.loadComboBoxStore(el);
		var state = el.up('window').state;
		//show form add surat 
		me.detailTool = new Erems.library.DetailtoolAll();
		me.detailTool.setConfig({
			viewPanel        : 'FormDataDetailSurat',
			parentFDWindowId : me.getFormdata().up('window').id,
			controllerName   : me.controllerName
		});
		me.detailTool.parentGridAlias = 'complaintdetailgridsurat';
		//end show form surat

		//show form add detail complaint
		me.detailTool2 = new Erems.library.DetailtoolAll();
		me.detailTool2.setConfig({
			viewPanel        : 'FormDataDetail',
			parentFDWindowId : me.getFormdata().up('window').id,
			controllerName   : me.controllerName
		});
		//end show form add detail complaint

		//show form respon
		me.detailTool3 = new Erems.library.DetailtoolAll();
		me.detailTool3.setConfig({
			viewPanel        : 'FormDataDetailRespon',
			parentFDWindowId : me.getFormdata().up('window').id,
			controllerName   : me.controllerName
		});

		//show images from form data, not from form data detail //masih error 2-mei-14
		me.detailTool6 = new Erems.library.DetailtoolAll();
		me.detailTool6.setConfig({
			viewPanel        : 'FormDataViewImages2',
			parentFDWindowId : me.getFormdata().up('window').id,
			controllerName   : me.controllerName
		});

		me.detailTool7 = new Erems.library.DetailtoolAll();
		me.detailTool7.setConfig({
			viewPanel        : 'FormDataDetailDokumen',
			parentFDWindowId : me.getFormdata().up('window').id,
			controllerName   : me.controllerName
		});

		//untuk mereset filter pada detail grid apabila pernah di edit
		me.detailForm.editingIndexRow = 0;
		me.detailForm.clickIndexRow   = [];

		//load global parameter
		var masterparameterglobalStore = me.getMasterparameterglobalStore();

		masterparameterglobalStore.removeAll();
		masterparameterglobalStore.load({
			params   : {parametername : 'COMPLAINT'},
			callback : function (rec) {
				for (var i = 0; i < rec.length; i++) {

					if (rec[i].data.parametername == 'COMPLAINT_ST_DATE') {
						me.getFormdata().down('[name=serahterima_date]').allowBlank = rec[i].data.value == '1' ? false : true;
					}

					if (rec[i].data.parametername == 'COMPLAINT_CONTACT_NO') {
						me.getFormdata().down('[name=phone_no]').allowBlank = rec[i].data.value == '1' ? false : true;
					}

					if (rec[i].data.parametername == 'COMPLAINT_DATANG_DATE') {
						me.getFormdata().down('[name=datang_date]').allowBlank = rec[i].data.value == '1' ? false : true;
					}

					if (rec[i].data.parametername == 'COMPLAINT_GARANSI_SIPIL') {
						me.getFormdata().down('[name=guaranteetype_sipil_id]').allowBlank = rec[i].data.value == '1' ? false : true;
						me.getFormdata().down('[name=garansi_sipil_date]').allowBlank = rec[i].data.value == '1' ? false : true;
					}

					if (rec[i].data.parametername == 'COMPLAINT_GARANSI_BOCOR') {
						me.getFormdata().down('[name=guaranteetype_bocor_id]').allowBlank = rec[i].data.value == '1' ? false : true;
						me.getFormdata().down('[name=garansi_bocor_date]').allowBlank = rec[i].data.value == '1' ? false : true;
					}
				}
			}
		});

		me.citrarayaset = me.subholding_config_complaint;
		if (me.citrarayaset > 0) {
			var form = me.getFormdata();
			form.down('[name=bast_no]').setReadOnly(true);
		}

		if (me.counter_bast > 0) {
			var form = me.getFormdata();
			form.down('[name=bast_no]').setReadOnly(true);
		}

		if (state == 'create') {
			// el.down('#active').setValue(1);
			//me.getFormdata().down('#btnSave').setDisabled(false);
		} else {
			me.countLoadProcess = 0;
			me.getFormdata().up('window').body.mask('Loading data, please wait ...');

			var grid   = me.getGrid();
			var store  = grid.getStore();
			var form   = me.getFormdata();
			var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

			form.down('[name=is_blokir]').setVisible(record.get('is_blokir')); // added by rico 28112022
			
			el.loadRecord(record);
			me.recordmastergrid = record;
			var serahterimadate = record.data.serahterima_date
			if (Ext.Date.format(new Date(serahterimadate), 'Y') > 1970 || Ext.Date.format(new Date(record.data.pinjampakai_date), 'Y') > 1970) {
				form.down('[action=sync]').show();
			}

			if (apps.subholdingId == 1) {
				if (record.data.total_remaining_denda > 0) {
					var dendaText = 'Denda : ' + me.fmb(record.data.total_remaining_denda) + ' (Jangan diberitahu ke Customer)';
					form.down('[name=text_nilaidenda]').setText(dendaText);
				}
			}

			Ext.Ajax.request({
				url     : 'erems/complaint/read',
				params  : {aftersales_id: record.data.aftersales_id, read_type_mode: 'status_salesforce'},
				success : function (response) {
					var obj = JSON.parse(response.responseText)
					var data_arr = obj.data;

					form.down('[name=status_salesforce]').setValue(data_arr.progress_salesforce);
					form.down('[name=status_salesforce_sh2]').setValue(data_arr.progress_salesforce_sh2);
					form.down('[name=progress_salesforce]').setValue(data_arr.notes_salesforce);
					// if (apps.subholdingId == 1) {
					// 	form.down("#status_salesforce_sh2").hide();
					// }
				}
			});

			var countsurat   = 0;
			var countdokbast = 0;
			var sepihak      = 0;

			//display detail dokumen Grid on form data
			var complaintdokumenStore = me.getComplaintdokumenStore();
			complaintdokumenStore.removeAll();
			complaintdokumenStore.load({
				params   : {aftersales_id: record.data.aftersales_id, read_type_mode: 'grid_dokumen'},
				callback : function (rec) {
					for (var i = 0; i < rec.length; i++) {
						if (rec[i].data.jenis_file == 'BAST') {
							countdokbast += 1
						}
					}

					//display detail Surat Grid on form data
					var complaintsuratStore = me.getComplaintsuratStore();
					complaintsuratStore.removeAll();
					complaintsuratStore.load({
						params   : {aftersales_id: record.data.aftersales_id},
						callback : function (rec) {
							for (var i = 0; i < rec.length; i++) {
								if (rec[i].data.jenis_surat == 'SURAT') {
									if (rec[i].data.undangan == 'SEPIHAK') {
										sepihak += 1
									} else {
										countsurat += 1
									}

								}
							}

							if (apps.subholdingId == 2) {
								me.getDetailgrid().down('#btnNew').setDisabled(true);
								if (serahterimadate === '' || serahterimadate === null) {
									if (sepihak > 0) {
										form.down("[name=serahterima_date]").setReadOnly(false);
									} else if (countsurat > 0 && countdokbast > 0) {
										form.down("[name=serahterima_date]").setReadOnly(false);
									} else {
										form.down("[name=serahterima_date]").setReadOnly(true);
									}
								}
							}
						}
					});
				}
			});

			Ext.Ajax.request({
				url    : 'erems/complaint/read',
				params : {
					read_type_mode    : 'history',
					purchaseletter_id : record.data.purchaseletter_id
				},
				success : function (response) {
					var obj     = JSON.parse(response.responseText).data;
					var grid    = me.getDetailgridhistory();
					var store   = grid.getStore();
					var records = {};

					store.removeAll();

					for (var i = 0; i < obj.length; i++) {
						records = {
							modul                        : obj[i].modul,
							rencana_serahterima_date_old : obj[i].rencana_serahterima_date_old,
							rencana_serahterima_date_new : obj[i].rencana_serahterima_date_new,
							user_email                   : obj[i].user_email,
							modion                       : obj[i].modion
						}

						store.add(records);
					}
				}
			});

			//display detail Utility Grid on form data
			var utilitydetailStore = me.getUtilitydetailStore();
			utilitydetailStore.removeAll();
			utilitydetailStore.load({params: {is_detail: 'yes', unit_id: record.data.unit_id}});

			//display detail Complaint Grid on form data
			var complaintdetailStore = me.getComplaintdetailStore();
			complaintdetailStore.removeAll();
			complaintdetailStore.load({params: {aftersales_id: record.data.aftersales_id}});

			if (state == 'update') {
				// me.getDetailgridsurat().down('#btnNew').setDisabled(true);
			} else if (state == 'read') {
				form.getForm().getFields().each(function (field) {
					field.setReadOnly(true);
				});
				me.getDetailgridsurat().down('#btnNew').setDisabled(true);
				me.getDetailgridsurat().getView().getHeaderCt().child('#actioncolumn').hide();
				me.getDetailgrid().down('#btnNew').setDisabled(true);
				me.getDetailgrid().getView().getHeaderCt().child('#actioncolumn').hide();
				form.down('#btnSave').setDisabled(true);
			}
		}

		me.validationhandoverdate();

		if(me.subholding_config == 1){
			form.down("[name=serahterima_date]").setReadOnly(false);			
			form.down('[name=customer_address]').setReadOnly(false);
			form.down('[name=customer_ktp_address]').setReadOnly(false); //add by dika 20/19/2022
			form.down('[name=customer_homephone]').setReadOnly(false);
			form.down('[name=customer_mobilephone]').setReadOnly(false);
			form.down('[name=customer_officephone]').setReadOnly(false);
			form.down('[name=customer_email]').setReadOnly(false);
		}

		if(me.subholding_config_pinjampakai > 0){
			form.down("[name=pinjampakai_config]").setValue(me.subholding_config_pinjampakai);
		}

		Ext.Ajax.request({
			url    : 'erems/complaint/read',
			params : {
				read_type_mode    : 'pengalihan_hak',
				purchaseletter_id : record.data.purchaseletter_id
			},
			success : function (response) {
				var obj      = JSON.parse(response.responseText)
				var data_arr = obj.data;

				var i, pengalihan_hak = 0;
				for (i = 0; i < data_arr.length; i++) {
					if (data_arr[i]['deleted'] == 0) {
						pengalihan_hak += 1
					}
				}
				if (pengalihan_hak > 0) {
					form.down("[name=pengalihan_hak]").setValue(1);
				}
			}
		});

		if(me.subholding == 2){
			// form.down('[name=guaranteetype_sipil_id]').setReadOnly(true);
			// form.down('[name=guaranteetype_bocor_id]').setReadOnly(true);
			// form.down('[name=garansi_sipil_date]').setReadOnly(true);
			// form.down('[name=garansi_bocor_date]').setReadOnly(true);
		}

		if(record.get('is_blokir') == 1){
			form.down("[name=serahterima_date]").setReadOnly(true); // added by rico 29112022
		}

		/////////// delete action
		me.disabled_btnDeletesurat(1500);
	},
	//==== Form Data Detail Surat ================
	formDataDetailSuratAfterRender: function (el) {
		var me = this;
		var state = el.up('window').state;

		if (me.counter_nomer_surat > 0) {
			var form = me.getFormdatadetailsurat();
			form.down('[name=surat_no]').setReadOnly(true);
			form.down('[name=surat_no]').allowBlank = true;
		}
	},
	detailFormSurat : {
		that            : this,
		editingIndexRow : 0,
		save            : function () {
			var me = this;

			var form = me.getFormdatadetailsurat().getForm();
			var formVal = form.getValues();

			var msg = '';

			if (form.isValid()) {
				var dStore = null;
				var win = me.getFormdatadetailsurat().up('window');

				dStore = me.getDetailgridsurat().getStore();

				var val = {
					/* start added by ahmad riadi  11-01-2017 */
					/* end added by ahmad riadi  11-01-2017 */
					aftersales_surat_id : formVal.aftersales_surat_id,
					aftersales_id       : me.getFormdata().down('[name=aftersales_id]').getValue(),
					jenis_surat         : formVal.jenis_surat,
					undangan            : formVal.undangan,
					surat_no            : formVal.surat_no,
					send_date           : formVal.send_date,
					keterangan          : formVal.keterangan,
					undangan_date       : formVal.undangan_date,
					is_hadir            : formVal.is_hadir
				};

				if (win.state == 'create') {
					dStore.add(val);
					if (formVal.undangan == 'SEPIHAK') {
						me.getFormdata().down('#receive_status_2').setValue(true);
					}
				} 
				else {
					var rec = dStore.getAt(me.detailFormSurat.editingIndexRow);
					rec.beginEdit();
					rec.set(val);
					rec.endEdit();
					if (formVal.undangan == 'SEPIHAK') {
						me.getFormdata().down('#receive_status_2').setValue(true);
					}
				}

				/////////// delete action
				me.disabled_btnDeletesurat();

				win.close();
			} 
			else {
				Ext.Msg.show({
					title   : 'Failure',
					msg     : me.checkRequired(form) + ' is required.',
					icon    : Ext.Msg.ERROR,
					buttons : Ext.Msg.OK
				});
			}
		}
	},
	// added by rico 21062021
	checkRequired: function (form) {
		var me = this;
		var items = form.getFields().items;
		var label = [];
		for (var i = 0; i < items.length; i++) {
			if (!items[i].allowBlank && (items[i].activeError != '' && typeof items[i].activeError !== 'undefined') && items[i].xtype != 'hiddenfield') {
				label.push(items[i].fieldLabel);
			}
		}
		return label.join();
	},
	detailGridSurat : {
		that : this,
		gridDetailSuratSelectionChange : function () {
			var me = this;
			var grid = me.getDetailgridsurat(), row = grid.getSelectionModel().getSelection();
			grid.down('#btnPrint').setDisabled(row.length != 1);
		},
		actionColumnClick : function (view, cell, row, col, e) {
			var me     = this;
			var gr     = me.getDetailgridsurat();
			var record = gr.getStore().getAt(row);
			var m      = e.getTarget().className.match(/\bact-(\w+)\b/);

			if (m) {
				var btnDelPencairan = m.input.match(/x-item-disabled/gi);
			}

			if (m) {
				switch (m[1]) {
					case 'ComplaintsuratUpdate':
						me.detailTool.form().show('update', 500, 'Edit Surat');
						me.detailFormSurat.editingIndexRow = row;
						me.getFormdatadetailsurat().getForm().loadRecord(record);

						var tm = setTimeout(function() {
							var dStore   = me.getDetailgridsurat().getStore();
							var totStore = dStore.getCount();
							var form     = me.getFormdatadetailsurat();

							if(totStore > 0){
								for (var i = 0; i < totStore; i++) {
									dStore.each(function (record, idx) {
										if (i == idx) {
											if(form.down('[name=undangan]').getValue() == 'SEPIHAK' && record.data.undangan == 3){
												form.down('[name=undangan_date]').setMinValue(new Date(record.data.undangan_date));
											}
											else if(record.data.undangan == (form.down('[name=undangan]').getValue()-1)){
												form.down('[name=undangan_date]').setMinValue(new Date(record.data.undangan_date));
											}
										}
									});
								}
							}

							me.getFormdatadetailsurat().down('[name=undangan]').setReadOnly(true);

							clearTimeout(tm);
						}, 100);
						break;
					case 'ComplaintsuratDelete':
						if (!btnDelPencairan) {
							var msg = record.data.jenis_surat + ' ' + record.data.undangan;
							Ext.Msg.confirm('Delete Data', "Delete " + msg + "?", function (btn) {
								if (btn == 'yes') {
									record.set("deleted", true);
									gr.getStore().filterBy(function (recod) {
										return recod.data.deleted == false;
									});

									/////////// delete action
									me.disabled_btnDeletesurat();
								}
							});
						}
						break;
				}
			}
		}
	},
	disabled_btnDeletesurat : function(timeDelay=0){
		var me = this;
		var tm = setTimeout(function() {
			$('#'+me.getDetailgridsurat().id).find('.act-ComplaintsuratDelete').addClass('x-item-disabled');
			$('#'+me.getDetailgridsurat().id).find('.act-ComplaintsuratDelete').last().removeClass('x-item-disabled');
			clearTimeout(tm);
		}, timeDelay);
	},
	validateFormdataSurat : function(){
		var me = this;
		var tm = setTimeout(function() {
			var dStore   = me.getDetailgridsurat().getStore();
			var totStore = dStore.getCount();
			var form     = me.getFormdatadetailsurat();

			var valUndangan     = 1;
			var valSenddate     = new Date();
			var valUndangandate = new Date();
			if(totStore > 0){
				var paramNextdate = 0;
				if(totStore == 1){ paramNextdate = me.NextDayUndanganDate1; }
				else if(totStore == 2){ paramNextdate = me.NextDayUndanganDate2; }
				else if(totStore == 3){ paramNextdate = me.NextDayUndanganDate3; }

				for (var i = 0; i < totStore; i++) {
					dStore.each(function (record, idx) {
						if (i == idx && i == (totStore-1)) {
							// console.log(record.data);
							valUndangan = totStore + valUndangan;
							if(valUndangan == 4){
								valUndangan = 'SEPIHAK';
							}

							valUndangandate = me.addDays(record.data.undangan_date, paramNextdate);
							valSenddate = valUndangandate;

							form.down('[name=undangan_date]').setMinValue(new Date(record.data.undangan_date));
						}
					});
				}
			}

			form.down('[name=undangan]').setValue(valUndangan);
			form.down('[name=send_date]').setValue(valSenddate);
			form.down('[name=undangan_date]').setValue(valUndangandate);
			form.down('[name=undangan]').setReadOnly(true);

			clearTimeout(tm);
		}, 100);
	},
	//==== End Form Data Detail Surat =============

	//==== Form Data Detail ==========
	formDataDetailBeforeRender: function (el) {
		var me = this;
		setupObject(el, me.execAction, me);
	},
	formDataDetailAfterRender: function (el) {
		var me = this;
		me.loadComboBoxStore(el);
		var state = el.up('window').state;

		//employee_code = PENGAWAS
		el.down('#fd_employeecombobox').getStore().filter('position', 'PENGAWAS');
		/*var ftStore = null;
		 ftStore = el.down('#fd_employeecombobox').getStore();
		 ftStore.removeAll();
		 ftStore.load({params:{start:0,limit:0,jabatan_code:'PENGAWAS'}});*/


		if (state == 'create') {
			var complaintimagesStore = me.getComplaintimagesStore();
			complaintimagesStore.removeAll();

			me.getFormdatadetail().down('[name=temp_id_detail]').setValue(me.randomString(10));
		}

		me.detailTool4 = new Erems.library.DetailtoolAll();
		me.detailTool4.setConfig({
			viewPanel        : 'FormDataDetailImages',
			parentFDWindowId : me.getFormdatadetail().up('window').id,
			controllerName   : me.controllerName
		});

		me.detailTool5 = new Erems.library.DetailtoolAll();
		me.detailTool5.setConfig({
			viewPanel        : 'FormDataViewImages',
			parentFDWindowId : me.getFormdatadetail().up('window').id,
			controllerName   : me.controllerName
		});
	},
	formDataDetailResponAfterRender: function (el) {
		var me = this;
		me.loadComboBoxStore(el);
		var state = el.up('window').state;
		if (me.citrarayaset > 0) {
			var form = me.getFormdatadetailrespon();
			form.down('[name=respon_date]').setReadOnly(false);
		}
	},
	detailForm : {
		that            : this,
		editingIndexRow : 0,
		clickIndexRow   : [],
		saveRespon      : function () {
			var me      = this;
			var form    = me.getFormdatadetailrespon().getForm();
			var formVal = form.getValues();
			var msg     = '';

			if (form.isValid()) {

				var dStore = null;
				var win = me.getFormdatadetailrespon().up('window');

				dStore = me.getDetailgrid().getStore();

				var val = {
					aftersales_complaint_id : formVal.aftersales_complaint_id,
					aftersales_id           : me.getFormdata().down('[name=aftersales_id]').getValue(),
					unit_id                 : me.getFormdata().down('[name=unit_id]').getValue(),
					respon_date             : formVal.respon_date,
					respon_user             : formVal.respon_user,
					complaintstatus_id      : formVal.complaintstatus_id,
					complaintstatus         : me.getFormdatadetailrespon().down('[name=complaintstatus_id]').getRawValue(),
					respon_note             : formVal.respon_note
				};

				if (win.state == 'create') {
					dStore.add(val);
				} 
				else {
					var rec = dStore.getAt(me.detailForm.editingIndexRow);
					rec.beginEdit();
					rec.set(val);
					rec.endEdit();
				}

				win.close();
			} 
			else {
				Ext.Msg.show({
					title   : 'Failure',
					msg     : me.checkRequired(form) + ' is required.',
					icon    : Ext.Msg.ERROR,
					buttons : Ext.Msg.OK
				});
			}
		},
		save : function () {
			var me      = this;
			var form    = me.getFormdatadetail().getForm();
			var formVal = me.getFormdatadetail().getForm().getValues();
			var msg     = '';

			if (form.isValid()) {

				var dStore = null;
				var win = me.getFormdatadetail().up('window');

				dStore = me.getDetailgrid().getStore();

				//detail images store
				var complaintimagesStore = me.getComplaintimagesStore();
				complaintimagesStore.clearFilter(true);
				var data_images = [];
				for (var i = 0; i < complaintimagesStore.getCount(); i++) {
					complaintimagesStore.each(function (record, idx) {
						if (i == idx) {
							data_images[i] = record.data;
						}
					});
				}
				//end detail images store

				var val = {
					aftersales_complaint_id : formVal.aftersales_complaint_id,
					aftersales_id           : me.getFormdata().down('[name=aftersales_id]').getValue(),
					unit_id                 : me.getFormdata().down('[name=unit_id]').getValue(),
					complaint_no            : formVal.complaint_no,
					complainttype_id        : formVal.complainttype_id,
					complainttype           : me.getFormdatadetail().down('[name=complainttype_id]').getRawValue(),
					pengawas_id             : formVal.pengawas_id,
					pengawas_name           : me.getFormdatadetail().down('[name=pengawas_id]').getRawValue(),
					contractor_id           : formVal.contractor_id,
					contractorname          : me.getFormdatadetail().down('[name=contractor_id]').getRawValue(),
					complaint_date          : formVal.complaint_date,
					estimation              : formVal.estimation,
					start_date              : formVal.start_date,
					end_date                : formVal.end_date,
					detail_complaint        : formVal.detail_complaint,
					data_images             : data_images,
					temp_id_detail          : formVal.temp_id_detail
				};

				if (win.state == 'create') {
					dStore.add(val);
				} 
				else {
					var rec = dStore.getAt(me.detailForm.editingIndexRow);
					rec.beginEdit();
					rec.set(val);
					rec.endEdit();

					//untuk ngecek bahwa baris ini sudah diklik edit atau belum
					var editIdxRow = me.detailForm.editingIndexRow;
					var clickIdxRow = me.detailForm.clickIndexRow;
					// if isn't already in the array
					if (clickIdxRow.indexOf(editIdxRow) == -1){
						clickIdxRow.push(editIdxRow);
					}
				}

				win.close();
			} 
			else {
				Ext.Msg.show({
					title   : 'Failure',
					msg     : me.checkRequired(form) + ' is required.',
					icon    : Ext.Msg.ERROR,
					buttons : Ext.Msg.OK
				});
			}
		}
	},
	detailGrid : {
		that                : this,
		clickPrevNextImgIdx : 0,
		aftersalescomplid   : 0,
		actionColumnClick   : function (view, cell, row, col, e) {
			var me     = this;
			var gr     = me.getDetailgrid();
			var record = gr.getStore().getAt(row);
			var m      = e.getTarget().className.match(/\bact-(\w+)\b/);

			
			var res_date = new Date();
			if (me.citrarayaset > 0) {
				res_date = '';
			}

			if (m) {
				switch (m[1]) {
					case 'ComplaintdetailCreaterespon':
						me.detailTool3.form().show('edit', 500, 'Respon Complaint', 'FormDetailResponComplaint');
						me.detailForm.editingIndexRow = row;
						me.getFormdatadetailrespon().getForm().loadRecord(record);
						me.getFormdatadetailrespon().getForm().setValues({
							respon_date : res_date, //new Date(),
							respon_user : apps.loginname
						});
						break;
					case 'ComplaintdetailCreateimages':
						me.detailGrid.aftersalescomplid = record.data.aftersales_complaint_id;

						var imgStore = me.getComplaintimagesStore();
						imgStore.removeAll();
						imgStore.load({
							params   : {aftersales_complaint_id: record.data.aftersales_complaint_id},
							callback : function (rec) {
								var countData = imgStore.getCount();

								if (countData > 0) {
									me.detailTool6.form().show('view', 600, 'Images Gallery', 'FormViewImages2');
									me.detailForm.editingIndexRow = row;
									var form = me.getFormdataviewimages2();

									var currImageIndexRow = 0;
									me.detailGrid.clickPrevNextImgIdx = currImageIndexRow;
									if (currImageIndexRow <= 0) {
										form.down('#btnPrev').setDisabled(true);
									}
									if (currImageIndexRow + 1 >= countData) {
										form.down('#btnNext').setDisabled(true);
									}
									if (currImageIndexRow > 0 && currImageIndexRow + 1 < countData) {
										form.down('#btnNext').setDisabled(false);
										form.down('#btnPrev').setDisabled(false);
									}

									form.down('[name=image_filename]').setSrc('app/erems/uploads/complaint_images/' + rec[0].get('image_filename'));
									form.down('[name=description]').setFieldLabel(rec[0].get('image_filename'));
									form.down('[name=description]').setValue(rec[0].get('description'));

								} 
								else {
									Ext.Msg.show({
										title   : 'No Image Uploaded',
										msg     : 'No Image Uploaded',
										icon    : Ext.Msg.INFO,
										buttons : Ext.Msg.OK
									});
								}
							}
						});
						break;
					case 'ComplaintdetailUpdate':
						me.openedForm = null;
						me.detailTool2.form().show('update', 700, 'Edit Complaint', 'FormDetailComplaint');
						me.detailForm.editingIndexRow = row;
						me.getFormdatadetail().getForm().loadRecord(record);

						//jika baris ini sudah pernah diklik edit maka tidak load ke DB, bila belum maka load ke DB
						var editIdxRow  = me.detailForm.editingIndexRow;
						var clickIdxRow = me.detailForm.clickIndexRow;
						if (record.data.aftersales_complaint_id && clickIdxRow.indexOf(editIdxRow) == -1) {
							var complaintimagesStore = me.getComplaintimagesStore();
							complaintimagesStore.removeAll();
							complaintimagesStore.load({params: {aftersales_complaint_id: record.data.aftersales_complaint_id}});
						} else {
							var complaintimagesStore = me.getComplaintimagesStore();
							complaintimagesStore.loadData(record.data.data_images);
							complaintimagesStore.filterBy(function (recod) {
								return recod.data.deleted == false;
							});
						}
						break;
					case 'ComplaintdetailDelete':
						var msg = record.data.pengawas_name;

						//hapus data baris yg sudah pernah di edit dalam array 
						var editIdxRow = me.detailForm.editingIndexRow;
						var clickIdxRow = me.detailForm.clickIndexRow;
						var arrIdx = clickIdxRow.indexOf(editIdxRow);

						Ext.Msg.confirm('Delete Data', "Delete " + msg + "?", function (btn) {
							if (btn == 'yes') {

								if (arrIdx != -1) {
									clickIdxRow.splice(arrIdx, 1);
								}

								record.set("deleted", true);
								gr.getStore().filterBy(function (recod) {
									return recod.data.deleted == false;
								});
							}
						});
						break;
				}
			}
		},
		showPrevImgForm: function (view, cell, row, col, e) {
			var me = this;

			var currImageIndexRow = me.detailGrid.clickPrevNextImgIdx;
			var rowIndexPrev      = currImageIndexRow - 1;

			me.detailGrid.clickPrevNextImgIdx = rowIndexPrev;

			var form = me.getFormdataviewimages2();

			var afterSalesComplaintId = me.detailGrid.aftersalescomplid;
			var imgStore              = me.getComplaintimagesStore();
			imgStore.load({
				params   : {aftersales_complaint_id: afterSalesComplaintId},
				callback : function (rec) {
					form.down('[name=image_filename]').setSrc('app/erems/uploads/complaint_images/' + rec[rowIndexPrev].get('image_filename'));
					form.down('[name=description]').setFieldLabel(rec[rowIndexPrev].get('image_filename'));
					form.down('[name=description]').setValue(rec[rowIndexPrev].get('description'));
				}
			});

			var countData = imgStore.getCount();
			if (rowIndexPrev <= 0) {
				form.down('#btnPrev').setDisabled(true);
				form.down('#btnNext').setDisabled(false);
			}
			if (rowIndexPrev + 1 >= countData) {
				form.down('#btnNext').setDisabled(true);
				form.down('#btnPrev').setDisabled(false);
			}
			if (rowIndexPrev > 0 && rowIndexPrev + 1 < countData) {
				form.down('#btnNext').setDisabled(false);
				form.down('#btnPrev').setDisabled(false);
			}
		},
		showNextImgForm: function (view, cell, row, col, e) {
			var me = this;

			var currImageIndexRow = me.detailGrid.clickPrevNextImgIdx;
			var rowIndexNext = currImageIndexRow + 1;

			me.detailGrid.clickPrevNextImgIdx = rowIndexNext;

			var form = me.getFormdataviewimages2();

			var afterSalesComplaintId = me.detailGrid.aftersalescomplid;
			var imgStore = me.getComplaintimagesStore();
			imgStore.load({
				params   : {aftersales_complaint_id: afterSalesComplaintId},
				callback : function (rec) {
					form.down('[name=image_filename]').setSrc('app/erems/uploads/complaint_images/' + rec[rowIndexNext].get('image_filename'));
					form.down('[name=description]').setFieldLabel(rec[rowIndexNext].get('image_filename'));
					form.down('[name=description]').setValue(rec[rowIndexNext].get('description'));
				}
			});

			var countData = imgStore.getCount();
			if (rowIndexNext <= 0) {
				form.down('#btnPrev').setDisabled(true);
				form.down('#btnNext').setDisabled(false);
			}
			if (rowIndexNext + 1 >= countData) {
				form.down('#btnNext').setDisabled(true);
				form.down('#btnPrev').setDisabled(false);
			}
			if (rowIndexNext > 0 && rowIndexNext + 1 < countData) {
				form.down('#btnNext').setDisabled(false);
				form.down('#btnPrev').setDisabled(false);
			}
		}
	},
	//==== end Form Data Detail ======

	//==== Form Data Detail Images =======
	formDataDetailImagesAfterRender: function (el) {
		var me         = this;
		var state      = el.up('window').state;
		var firstItem  = me.getFormdatadetailimages().down('#image_place').items.first();
		var secondItem = firstItem.next();

		if (state == 'create') {
			me.getFormdatadetailimages().down('#image_place').remove(secondItem, true);
		} 
		else {
			me.getFormdatadetailimages().down('#image_place').remove(firstItem, true);
		}
	},
	detailFormImages : {
		that            : this,
		editingIndexRow : 0,
		save            : function () {
			var me      = this;
			var form    = me.getFormdatadetailimages().getForm();
			var formVal = form.getValues();
			var msg     = '';

			if (form.isValid()) {

				var dStore = null;
				var win    = me.getFormdatadetailimages().up('window');

				dStore = me.getDetailgridimages().getStore();

				if (win.state == 'create') {
					//===== upload images
					form.submit({
						url     : 'erems/' + me.controllerName + '/uploadimages',
						waitMsg : 'Uploading image...',
						success : function (f, a) {
							var aftersales_complaint_id = me.getFormdatadetail().down('[name=aftersales_complaint_id]').getValue();
							var temp_id_detail          = me.getFormdatadetail().down('[name=temp_id_detail]').getValue();

							var val = {
								aftersales_complaint_images_id : formVal.aftersales_complaint_images_id,
								aftersales_complaint_id        : aftersales_complaint_id,
								image_filename                 : a.result.imageName,
								description                    : formVal.description,
								temp_id_images                 : temp_id_detail
							};
							dStore.add(val);

							Ext.Msg.show({
								title   : 'Success',
								msg     : 'Image Uploaded',
								icon    : Ext.Msg.INFO,
								buttons : Ext.Msg.OK
							});
						},
						failure: function (f, a) {
							Ext.Msg.show({
								title   : 'Upload Failed',
								msg     : a.result.msg,
								icon    : Ext.Msg.INFO,
								buttons : Ext.Msg.OK
							});
						}
					});
				} 
				else {
					var aftersales_complaint_id = me.getFormdatadetail().down('[name=aftersales_complaint_id]').getValue();
					var temp_id_detail          = me.getFormdatadetail().down('[name=temp_id_detail]').getValue();

					var val = {
						aftersales_complaint_images_id : formVal.aftersales_complaint_images_id,
						aftersales_complaint_id        : aftersales_complaint_id,
						image_filename                 : formVal.image_filename,
						description                    : formVal.description,
						temp_id_images                 : temp_id_detail
					};

					var rec = dStore.getAt(me.detailFormImages.editingIndexRow);
					rec.beginEdit();
					rec.set(val);
					rec.endEdit();
				}

				win.close();
			} 
			else {
				Ext.Msg.show({
					title   : 'Failure',
					msg     : me.checkRequired(form) + ' is required.',
					icon    : Ext.Msg.ERROR,
					buttons : Ext.Msg.OK
				});
			}
		}
	},
	detailGridImages : {
		that              : this,
		imageIndexRow     : 0,
		actionColumnClick : function (view, cell, row, col, e) {
			var me     = this;
			var gr     = me.getDetailgridimages();
			var record = gr.getStore().getAt(row);
			var m      = e.getTarget().className.match(/\bact-(\w+)\b/);

			// gr.getSelectionModel().select(row);

			if (m) {
				switch (m[1]) {
					case 'ComplaintimagesUpdate':
						me.detailTool4.form().show('update', 500, 'Edit Detail Images', 'FormDetailImages');
						me.detailFormImages.editingIndexRow = row;
						me.getFormdatadetailimages().getForm().loadRecord(record);
						break;
					case 'ComplaintimagesDelete':
						var msg = record.data.image_filename;
						Ext.Msg.confirm('Delete Data', "Delete " + msg + "?", function (btn) {
							if (btn == 'yes') {
								record.set("deleted", true);
								gr.getStore().filterBy(function (recod) {
									return recod.data.deleted == false;
								});
							}
						});
						break;
				}
			}
		},
		selectionChange: function () {
			var me = this;
			var gr = me.getDetailgridimages(), row = gr.getSelectionModel().getSelection();
			gr.down('#btnViewImages').setDisabled(row.length != 1);
		},
		viewImage: function () {
			var me        = this;
			var grid      = me.getDetailgridimages();
			var store     = grid.getStore();
			var countData = store.getCount();
			var record    = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
			var rowIndex  = store.indexOf(record);

			me.detailGridImages.imageIndexRow = rowIndex;

			me.detailTool5.form().show('view', 600, 'Images Gallery', 'FormViewImages');

			var form = me.getFormdataviewimages();

			if (rowIndex <= 0) {
				form.down('#btnPrev').setDisabled(true);
			}
			if (rowIndex + 1 >= countData) {
				form.down('#btnNext').setDisabled(true);
			}
			if (rowIndex > 0 && rowIndex + 1 < countData) {
				form.down('#btnNext').setDisabled(false);
				form.down('#btnPrev').setDisabled(false);
			}

			form.down('[name=image_filename]').setSrc('app/erems/uploads/complaint_images/' + record.data.image_filename);
			form.down('[name=description]').setFieldLabel(record.data.image_filename);
			form.down('[name=description]').setValue(record.data.description);
		},
		prevImg: function () {
			var me                = this;
			var form              = me.getFormdataviewimages();
			var currImageIndexRow = me.detailGridImages.imageIndexRow;
			var rowIndexPrev      = currImageIndexRow - 1;
			var grid              = me.getDetailgridimages();
			var store             = grid.getStore();
			var countData         = store.getCount();
			var record            = store.getAt(rowIndexPrev);
			var rowIndex          = store.indexOf(record);

			me.detailGridImages.imageIndexRow = rowIndex;

			form.down('[name=image_filename]').setSrc('app/erems/uploads/complaint_images/' + record.data.image_filename);
			form.down('[name=description]').setFieldLabel(record.data.image_filename);
			form.down('[name=description]').setValue(record.data.description);

			if (rowIndex <= 0) {
				form.down('#btnPrev').setDisabled(true);
				form.down('#btnNext').setDisabled(false);
			}
			if (rowIndex + 1 >= countData) {
				form.down('#btnNext').setDisabled(true);
				form.down('#btnPrev').setDisabled(false);
			}
			if (rowIndex > 0 && rowIndex + 1 < countData) {
				form.down('#btnNext').setDisabled(false);
				form.down('#btnPrev').setDisabled(false);
			}
		},
		nextImg: function () {
			var me                = this;
			var form              = me.getFormdataviewimages();
			var currImageIndexRow = me.detailGridImages.imageIndexRow;

			var rowIndexNext = currImageIndexRow + 1;

			var grid      = me.getDetailgridimages();
			var store     = grid.getStore();
			var countData = store.getCount();

			var record   = store.getAt(rowIndexNext);
			var rowIndex = store.indexOf(record);

			me.detailGridImages.imageIndexRow = rowIndex;

			form.down('[name=image_filename]').setSrc('app/erems/uploads/complaint_images/' + record.data.image_filename);
			form.down('[name=description]').setFieldLabel(record.data.image_filename);
			form.down('[name=description]').setValue(record.data.description);

			if (rowIndex <= 0) {
				form.down('#btnPrev').setDisabled(true);
				form.down('#btnNext').setDisabled(false);
			}
			if (rowIndex + 1 >= countData) {
				form.down('#btnNext').setDisabled(true);
				form.down('#btnPrev').setDisabled(false);
			}
			if (rowIndex > 0 && rowIndex + 1 < countData) {
				form.down('#btnNext').setDisabled(false);
				form.down('#btnPrev').setDisabled(false);
			}
		}
	},
	//======== end form data detail images ==============

	dataSync: function () {
		var me = this;

		var form = me.getFormdata().getForm();

		if (form.isValid()) {
			Ext.Msg.confirm('Sync Data', 'Sync data EMS?', function (btn) {
				if (btn == 'yes') {
					me.dataSyncConfirm();
				}
			});
		}
	},
	dataSyncConfirm: function () {
		var me = this;
		var fields = me.getFormdata().getValues();

		var myObj = {
			unit_id          : fields.unit_id,
			serahterima_date : fields.serahterima_date,
			pinjampakai_date : fields.pinjampakai_date,
			sync             : true,
		}

		resetTimer();
		me.getFormdata().up('window').body.mask('Saving, please wait ...');
		Ext.Ajax.request({
			url     : 'erems/complaint/update',
			params  : { data : Ext.encode(myObj) },
			success : function (response) {
				me.getFormdata().up('window').body.unmask();
				if (Ext.decode(response.responseText).success == true) {
					Ext.Msg.show({
						title   : 'Success',
						msg     : 'Data sync successfully ',
						icon    : Ext.Msg.INFO,
						buttons : Ext.Msg.OK,
						fn      : function () {
							me.getFormdata().up('window').close();
							var gridDepan  = me.getGrid();
							var storeDepan = gridDepan.getStore();
							storeDepan.reload();
						}
					});
				} 
				else {
					Ext.Msg.show({
						title   : 'Failure',
						msg     : 'Error: Unable to sync.',
						icon    : Ext.Msg.ERROR,
						buttons : Ext.Msg.OK
					});
				}
			},
		});
	},
	dataSave: function (alasan = '') {
		var me   = this;
		var form = me.getFormdata().getForm();

		if (me.citrarayaset > 0) {
			var form2 = me.getFormdata();
			if (!form2.down("[name=tandatangan_date]").getValue()) {
				Ext.Msg.show({
					title   : 'WARNING',
					msg     : 'SPPJB Sign Date tidak boleh kosong',
					buttons : Ext.Msg.OK,
					icon    : Ext.Msg.WARNING
				});
			} 
			else {
				if (form.isValid()) {
					var store = me.getDetailgrid().getStore();
					if (store.getCount() == 0) {
						Ext.Msg.confirm('Update Data', 'Simpan Data tanpa Detail Complaint?', function (btn) {
							if (btn == 'yes') {
								me.dataSaveConfirm(store, alasan);
							}
						});
					} 
					else {
						Ext.Msg.confirm('Update Data', 'Update complaint data?', function (btn) {
							if (btn == 'yes') {
								me.dataSaveConfirm(store, alasan);
							}
						});
					}
				}
			}
		} 
		else {
			if (form.isValid()) {
				var store = me.getDetailgrid().getStore();
				if (store.getCount() == 0) {
					Ext.Msg.confirm('Update Data', 'Simpan Data tanpa Detail Complaint?', function (btn) {
						if (btn == 'yes') {
							me.dataSaveConfirm(store, alasan);
						}
					});
				} 
				else {
					Ext.Msg.confirm('Update Data', 'Update complaint data?', function (btn) {
						if (btn == 'yes') {
							me.dataSaveConfirm(store, alasan);
						}
					});
				}
			}
		}
	},
	dataSaveConfirm: function (store, alasan = '') {
		var me = this;

		store.clearFilter(true);
		var data = [];
		var detail_images = [];
		for (var i = 0; i < store.getCount(); i++) {
			store.each(function (record, idx) {
				if (i == idx) {
					data[i] = record.data;
					if (data[i].data_images.length > 0) {
						for (var u = 0; u < data[i].data_images.length; u++) {
							detail_images.push(data[i].data_images[u]);
						}
					}
				}
			});
		}

		//=== get remaining denda on schedule =====
		var suratStore = me.getDetailgridsurat().getStore();
		suratStore.clearFilter(true);
		var data_surat = [];
		for (var i = 0; i < suratStore.getCount(); i++) {
			suratStore.each(function (record, idx) {
				if (i == idx) {
					data_surat[i] = record.data;
				}
			});
		}
		//=== end ====

		var dokumenStore = me.getDetailgriddokumen().getStore();
		dokumenStore.clearFilter(true);
		var data_dokumen = [];
		for (var i = 0; i < dokumenStore.getCount(); i++) {
			dokumenStore.each(function (record, idx) {
				if (i == idx) {
					data_dokumen[i] = record.data;
				}
			});
		}

		var fields = me.getFormdata().getValues();

		var myObj = {
			aftersales_id            : fields.aftersales_id,
			unit_id                  : fields.unit_id,
			serahterima_date         : fields.serahterima_date,
			phone_no                 : fields.phone_no,
			receive_status           : fields.receive_status,
			hunian_status            : fields.hunian_status,
			datang_date              : fields.datang_date,
			pinjampakai_date         : fields.pinjampakai_date,
			pinjampakai_status       : fields.pinjampakai_status,
			guaranteetype_sipil_id   : fields.guaranteetype_sipil_id,
			guaranteetype_bocor_id   : fields.guaranteetype_bocor_id,
			garansi_sipil_date       : fields.garansi_sipil_date,
			garansi_bocor_date       : fields.garansi_bocor_date,
			note                     : fields.note,
			serahterima1_date        : fields.serahterima1_date,
			serahterima2_date        : fields.serahterima2_date,
			checklist1_date          : fields.checklist1_date,
			checklist2_date          : fields.checklist2_date,
			recheck1_date            : fields.recheck1_date,
			recheck2_date            : fields.recheck2_date,
			serahterima1_note        : fields.serahterima1_note,
			serahterima2_note        : fields.serahterima2_note,
			bast_no                  : fields.bast_no,
			data_detail              : data,
			data_surat               : data_surat,
			data_dokumen             : data_dokumen,
			detail_images            : detail_images,
			is_sent_ems              : fields.is_sent_ems,
			survey                   : false,
			nomor_identifikasi_rumah : fields.nomor_identifikasi_rumah,
			alasan                   : alasan,
			//add by dika 17012023
			customer_address 		 : fields.customer_address,
			customer_ktp_address	 : fields.customer_ktp_address,
			customer_homephone		 : fields.customer_homephone,
			customer_mobilephone	 : fields.customer_mobilephone,
			customer_officephone 	 : fields.customer_officephone,
			customer_email 			 : fields.customer_email
		}

		resetTimer();
		me.getFormdata().up('window').body.mask('Saving, please wait ...');
		Ext.Ajax.request({
			url     : 'erems/complaint/update',
			params  : { data : Ext.encode(myObj) },
			success : function (response) {
				me.getFormdata().up('window').body.unmask();
				if (Ext.decode(response.responseText).success == true) {
					Ext.Msg.show({
						title   : 'Success',
						msg     : 'Data saved successfully ' + Ext.decode(response.responseText).msgtoSF,
						icon    : Ext.Msg.INFO,
						buttons : Ext.Msg.OK,
						fn      : function () {
							me.getFormdata().up('window').close();
							if (alasan != '') {
								Ext.ComponentQuery.query('#percepatanSTWindow')[0].close();
							}
							var gridDepan = me.getGrid();
							var storeDepan = gridDepan.getStore();
							storeDepan.reload();
						}
					});
				} 
				else if (Ext.decode(response.responseText).success == 'email_failed') {
					Ext.Msg.show({
						title   : 'Information',
						msg     : 'Data saved successfully but sending email notifications failed, ' + Ext.decode(response.responseText).msgtoSF,
						icon    : Ext.Msg.INFO,
						buttons : Ext.Msg.OK,
						fn      : function () {
							me.getFormdata().up('window').close();
							if (alasan != '') {
								Ext.ComponentQuery.query('#percepatanSTWindow')[0].close();
							}
							var gridDepan = me.getGrid();
							var storeDepan = gridDepan.getStore();
							storeDepan.reload();
						}
					});
				} 
				else {
					Ext.Msg.show({
						title   : 'Failure',
						msg     : 'Error: Unable to save data.',
						icon    : Ext.Msg.ERROR,
						buttons : Ext.Msg.OK
					});
				}
			},
		});
	},
	//function - function =============================
	fmb: function (val) {
		return this.fm(val, 2, ',', '.');
	},
	fm: function (n, decPlaces, thouSeparator, decSeparator) {
		var decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
				decSeparator = decSeparator == undefined ? "." : decSeparator,
				thouSeparator = thouSeparator == undefined ? "." : thouSeparator,
				sign = n < 0 ? "-" : "",
				i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
				j = (j = i.length) > 3 ? j % 3 : 0;
		return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
	},
	randomNo: function myFunction() {
		return '99' + Math.floor(new Date().getTime() / 1);
	},
	randomString: function (string_length) {
		var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		var randomstring = '';
		var charCount = 0;
		var numCount = 0;

		for (var i = 0; i < string_length; i++) {
			// If random bit is 0, there are less than 3 digits already saved, and there are not already 5 characters saved, generate a numeric value. 
			if ((Math.floor(Math.random() * 2) == 0) && numCount < 3 || charCount >= 5) {
				var rnum = Math.floor(Math.random() * 10);
				randomstring += rnum;
				numCount += 1;
			} else {
				// If any of the above criteria fail, go ahead and generate an alpha character from the chars string
				var rnum = Math.floor(Math.random() * chars.length);
				randomstring += chars.substring(rnum, rnum + 1);
				charCount += 1;
			}
		}
		return randomstring;
	},
	/*start added by ahmad riadi 11-01-2017 */
	validationhandoverdate: function () {
		var me, rowdata, form, counter, date, state;
		me = this;
		form = me.getFormdata();
		date = form.down("[name=serahterima_date]").getRawValue();
		counter = date.length;
		state = form.up('window').state.toLowerCase();
		if (counter > 0) {
			form.down("[name=serahterima_date]").setReadOnly(true);
		}
	},
	validationcomplainbyandoverdate: function () {
		var me, rowdata, form, rawdate, counter, currentdate, startdate, enddate, blockeddata;
		me = this;
		form = me.getFormdata();
		currentdate = new Date();
		startdate = form.down("[name=serahterima_date]").getValue();
		rawdate = form.down("[name=serahterima_date]").getRawValue();
		counter = rawdate.length;
		if (counter > 0) {
			enddate = Ext.Date.add(startdate, Ext.Date.MONTH, me.parametercomplaint);
			if (currentdate > enddate) {
				return 1; //di blokir, karena sudah lewat 3 bulan dari serahterima_date
			} else {
				return 0; //di boleh di save
			}
		} else {
			return 0;
		}
	},
	/* start edited by ahmad riadi 01-02-2017 */
	/*
	 validationhandover: function () {
	 var me, rowdata, form, record, persentasebagunan, persentasepembayaran,
	 pricetype, rawdate, counter, status, msg;
	 me = this;
	 form = me.getFormdata();
	 record = me.recordmastergrid;
	 
	 var progressContruction = (record.data.progress_contruction ? record.data.progress_contruction : 0);
	 var progresPembayaran = (record.data.progress_pembayaran ? record.data.progress_pembayaran : 0);
	 
	 persentasebagunan = parseFloat(progressContruction);
	 persentasepembayaran = parseFloat(progresPembayaran);
	 pricetype = record.data.pricetype;
	 
	 if (pricetype !== 'KPR') {
	 var tmpmsg1= '';
	 var tmpmsg2= '';
	 
	 if (persentasebagunan >= 100 && persentasepembayaran >= 100) {
	 status = 1;
	 msg = 'Data is valid';
	 } else {
	 if (persentasebagunan < 100) {
	 tmpmsg1 = 'Persentase bangunan belum 100%';
	 }
	 if (persentasepembayaran < 100) {
	 tmpmsg2 = ', Persentase pembayaran belum 100%';
	 }
	 msg = tmpmsg1 + tmpmsg2;
	 status = 0;
	 }
	 return {"status": status, "message": msg};
	 
	 } else {
	 rawdate = form.down("[name=akad_realisasiondate]").getRawValue();
	 counter = rawdate.length;
	 var tmpmsg1= '';
	 var tmpmsg2= '';
	 var tmpmsg3= '';
	 if (persentasebagunan >= 100 && persentasepembayaran >= 100 && counter > 0) {
	 status = 1;
	 msg = 'Data is valid';
	 } else {
	 if (persentasebagunan < 100) {
	 tmpmsg1 = 'Persentase bangunan belum 100%';
	 }
	 if (persentasepembayaran < 100) {
	 tmpmsg2 = ', Persentase pembayaran belum 100%';
	 }
	 if (counter < 1) {
	 tmpmsg3 = ', Tanggal Akad belum ada / Kosong';
	 }                
	 msg = tmpmsg1 + tmpmsg2 + tmpmsg3;
	 status = 0;
	 
	 }
	 return {"status": status, "message": msg};
	 }
	 },
	 */
	/* end edited by ahmad riadi 01-02-2017 */

	/* start edited by ahmad riadi 31-03-2017 */
	validationhandover: function () {
		var me, rowdata, form, record, persentasebagunan, productcategory, persentasepembayaran,
				pricetype, rawdate, counter, status, msg, isLunas, pinjampakaiStatus, pinjampakaiConfig, serahterimaDate;
		me = this;
		form = me.getFormdata();
		record = me.recordmastergrid;
		persentasebagunan = parseFloat(record.data.progress_contruction);
		persentasepembayaran = parseFloat(record.data.progress_pembayaran);
		isLunas = record.data.is_lunas
		pricetype = record.data.pricetype;
		productcategory = record.data.productcategory;
		pinjampakaiStatus = form.down("[name=pinjampakai_status]").getRawValue();
		pinjampakaiConfig = form.down("[name=pinjampakai_config]").getRawValue();
		serahterimaDate = form.down("[name=serahterima_date]").getValue();
		// console.log('persentasepembayaran',persentasepembayaran);
		// console.log('productcategory',productcategory);
		var tmpmsg1 = '';
		var tmpmsg2 = '';
		var tmpmsg3 = '';
		var tmpmsg4 = '';

		if (productcategory !== 'KAVLING' && productcategory !== 'KAVELING') {
			if (pricetype !== 'KPR') {
				if (/**comment by RH 20211123 persentasebagunan >= 100 && */persentasepembayaran >= 100) {
					status = 1;
					msg = 'Data is valid';
				} else if (persentasepembayaran < 100 && isLunas) {
					status = 1;
					msg = 'Data is valid';
				} else if (persentasepembayaran >= pinjampakaiConfig && pinjampakaiStatus) {
					status = 1;
					msg = 'Data is valid';
				} else {
					/**comment by RH 20211123
					 if (persentasebagunan < 100) {
					 tmpmsg1 = 'Persentase bangunan belum 100%; ';
					 }
					 */
					if (!pinjampakaiStatus && persentasepembayaran < 100) {
						tmpmsg2 = 'Persentase pembayaran belum 100%; ';
					}
					if (pinjampakaiStatus && persentasepembayaran < pinjampakaiConfig) {
						tmpmsg3 = 'Minimal persentase pembayaran harus ' + pinjampakaiConfig + '%; ';
					}
					msg = tmpmsg1 + tmpmsg2 + tmpmsg3 + tmpmsg4;
					status = 0;
				}

				if (persentasebagunan < 100 && serahterimaDate != '' && serahterimaDate != null && (record.data.addbyst == null || record.data.addbyst == '')) {
					me.popupAlasanPercepatanST();
					status = 2;
				}
				return {"status": status, "message": msg};

			} else {
				rawdate = form.down("[name=akad_realisasiondate]").getRawValue();
				counter = rawdate.length;
				if (/**comment by RH 20211123 persentasebagunan >= 100 && */persentasepembayaran >= 100 && counter > 0) {
					status = 1;
					msg = 'Data is valid';
				} else if (persentasepembayaran < 100 && isLunas && counter > 0) {
					status = 1;
					msg = 'Data is valid';
				} else if (persentasepembayaran >= pinjampakaiConfig && pinjampakaiStatus && counter > 0) {
					status = 1;
					msg = 'Data is valid';
				} else {
					/**comment by RH 20211123 
					 if (persentasebagunan < 100) {
					 tmpmsg1 = 'Persentase bangunan belum 100%; ';
					 }
					 */
					if (!pinjampakaiStatus && persentasepembayaran < 100) {
						tmpmsg2 = 'Persentase pembayaran belum 100%; ';
					}
					if (counter < 1) {
						tmpmsg3 = 'Tanggal Akad belum ada / Kosong; ';
					}
					if (pinjampakaiStatus && persentasepembayaran < pinjampakaiConfig) {
						tmpmsg4 = 'Minimal persentase pembayaran harus ' + pinjampakaiConfig + '%; ';
					}
					msg = tmpmsg1 + tmpmsg2 + tmpmsg3 + tmpmsg4;
					status = 0;

				}

				if (persentasebagunan < 100 && serahterimaDate != '' && serahterimaDate != null && (record.data.addbyst == null || record.data.addbyst == '')) {
					me.popupAlasanPercepatanST();
					status = 2;
				}
				return {"status": status, "message": msg};
			}
		} else {
			if (pricetype !== 'KPR') {
				if (persentasepembayaran >= 100) {
					status = 1;
					msg = 'Data is valid';
				} else if (persentasepembayaran < 100 && isLunas) {
					status = 1;
					msg = 'Data is valid';
				} else if (persentasepembayaran >= pinjampakaiConfig && pinjampakaiStatus) {
					status = 1;
					msg = 'Data is valid';
				} else {
					if (!pinjampakaiStatus && persentasepembayaran < 100) {
						tmpmsg2 = 'Persentase pembayaran belum 100%; ';
					}
					if (pinjampakaiStatus && persentasepembayaran < pinjampakaiConfig) {
						tmpmsg3 = 'Minimal persentase pembayaran harus ' + pinjampakaiConfig + '%; ';
					}
					msg = tmpmsg1 + tmpmsg2 + tmpmsg3 + tmpmsg4;
					status = 0;
				}
				return {"status": status, "message": msg};
			} else {
				rawdate = form.down("[name=akad_realisasiondate]").getRawValue();
				counter = rawdate.length;
				if (persentasepembayaran >= 100 && counter > 0) {
					status = 1;
					msg = 'Data is valid';
				} else if (persentasepembayaran < 100 && isLunas && counter > 0) {
					status = 1;
					msg = 'Data is valid';
				} else if (persentasepembayaran >= pinjampakaiConfig && pinjampakaiStatus && counter > 0) {
					status = 1;
					msg = 'Data is valid';
				} else {
					if (!pinjampakaiStatus && persentasepembayaran < 100) {
						tmpmsg2 = 'Persentase pembayaran belum 100%; ';
					}
					if (counter < 1) {
						tmpmsg3 = 'Tanggal Akad belum ada / Kosong; ';
					}
					if (pinjampakaiStatus && persentasepembayaran < pinjampakaiConfig) {
						tmpmsg4 = 'Minimal persentase pembayaran harus ' + pinjampakaiConfig + '%; ';
					}
					msg = tmpmsg1 + tmpmsg2 + tmpmsg3 + tmpmsg4;
					status = 0;

				}
				return {"status": status, "message": msg};
			}
		}

	},
	/* end edited by ahmad riadi 31-03-2017 */

	popupAlasanPercepatanST: function () {
		var me = this;
		Ext.create('Ext.window.Window', {
			id: 'percepatanSTWindow',
			title: 'Alasan Percepatan ST',
			height: 150,
			width: 500,
			layout: 'hbox',
			padding: '10px 10px 10px 10px',
			modal: true,
			items: {
				xtype: 'textareafield',
				fieldLabel: 'Alasan Percepatan ST',
				anchor: '-5',
				name: 'alasan_serahterima_date',
				flex: 1,
				enforceMaxLength: true,
				maxLength: 500,
				maskRe: /[A-Za-z0-9\@\.\,\_\/\-\s]/,
			},
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'bottom',
					ui: 'footer',
					layout: {
						//padding: 6,
						type: 'hbox'
					},
					items: [
						{
							xtype: 'button',
							padding: 5,
							width: 75,
							iconCls: 'icon-save',
							text: 'Save',
							handler: function () {

								var alasan = this.up('window').items.items[0].value;
								if (!alasan) {
									Ext.Msg.show({
										title: 'Alert',
										msg: 'Alasan Percepatan ST is required',
										icon: Ext.Msg.WARNING,
										buttons: Ext.Msg.OK
									});
								} else {
//                                  this
									me.dataSave(alasan);
//                                  this.up('window').close();
								}
							}
						},
						{
							xtype: 'button',
							action: 'cancel',
							itemId: 'btnCancel',
							padding: 5,
							width: 75,
							iconCls: 'icon-cancel',
							text: 'Cancel',
							handler: function () {
								this.up('window').close();
							}
						}
					]
				}
			]
		}).show();
	},

	validationhandoverSH1B: function () {
		var me, rowdata, form, record, persentasebagunan, productcategory, persentasepembayaran,
				pricetype, rawdate, counter, status, msg, isLunas, rawdate_ttd, counter_ttd, pinjampakaiStatus, pinjampakaiConfig;
		me = this;
		form = me.getFormdata();
		record = me.recordmastergrid;
		persentasebagunan = parseFloat(record.data.progress_contruction);
		persentasepembayaran = parseFloat(record.data.progress_pembayaran);
		isLunas = record.data.is_lunas
		pricetype = record.data.pricetype;
		productcategory = record.data.productcategory;
		serahterima_date = form.down("[name=serahterima_date]").getRawValue();
		counter_serahterima_date = serahterima_date.length;
		rawdate = form.down("[name=akad_realisasiondate]").getRawValue();
		counter = rawdate.length;
		rawdate_ttd = form.down("[name=tandatangan_date]").getRawValue();
		counter_ttd = rawdate_ttd.length;
		pinjampakaiStatus = form.down("[name=pinjampakai_status]").getRawValue();
		pinjampakaiConfig = form.down("[name=pinjampakai_config]").getRawValue();

		var tmpmsg1 = '';
		var tmpmsg2 = '';
		var tmpmsg3 = '';

		if (counter_serahterima_date > 0) {
			if (pricetype !== 'KPR') {
				if (persentasepembayaran >= 100 && counter_ttd > 0) {
					status = 1;
					msg = 'Data is valid';
				} else if (persentasepembayaran < 100 && isLunas && counter_ttd > 0) {
					status = 1;
					msg = 'Data is valid';
				} else if (persentasepembayaran >= pinjampakaiConfig && pinjampakaiStatus && counter_ttd > 0) {
					status = 1;
					msg = 'Data is valid';
				} else {
					if (!pinjampakaiStatus && persentasepembayaran < 100) {
						tmpmsg1 = 'Persentase pembayaran belum 100%; ';
					}
					if (counter_ttd < 1) {
						tmpmsg2 = 'Tanggal Tanda Tangan SPPJB belum ada / Kosong; ';
					}
					if (pinjampakaiStatus && persentasepembayaran < pinjampakaiConfig) {
						tmpmsg3 = 'Minimal persentase pembayaran harus ' + pinjampakaiConfig + '%; ';
					}
					msg = tmpmsg1 + tmpmsg2 + tmpmsg3;
					status = 0;
				}
				return {"status": status, "message": msg};
			} else {
				if (counter > 0 && counter_ttd > 0) {
					status = 1;
					msg = 'Data is valid';
				} else if (counter > 0 && counter_ttd > 0) {
					status = 1;
					msg = 'Data is valid';
				} else if (persentasepembayaran >= pinjampakaiConfig && pinjampakaiStatus && counter_ttd > 0) {
					status = 1;
					msg = 'Data is valid';
				} else {
					if (counter < 1) {
						tmpmsg1 = 'Tanggal Akad belum ada / Kosong; ';
					}
					if (counter_ttd < 1) {
						tmpmsg2 = 'Tanggal Tanda Tangan SPPJB belum ada / Kosong; ';
					}
					if (pinjampakaiStatus && persentasepembayaran < pinjampakaiConfig) {
						tmpmsg3 = 'Minimal persentase pembayaran harus ' + pinjampakaiConfig + '%; ';
					}
					msg = tmpmsg1 + tmpmsg2 + tmpmsg3;
					status = 0;
				}
				return {"status": status, "message": msg};
			}
		} else {
			status = 1;
			msg = 'Data is valid';
			return {"status": status, "message": msg};
		}

	},

	validationhandoverPinjampakai: function () {
		var me, rowdata, form, record, persentasebagunan, productcategory, persentasepembayaran,
				pricetype, rawdate, counter, status, msg, isLunas, pinjampakaiStatus, pinjampakaiConfig;
		me = this;
		form = me.getFormdata();
		record = me.recordmastergrid;
		persentasebagunan = parseFloat(record.data.progress_contruction);
		persentasepembayaran = parseFloat(record.data.progress_pembayaran);
		isLunas = record.data.is_lunas
		pricetype = record.data.pricetype;
		productcategory = record.data.productcategory;
		pinjampakaiStatus = form.down("[name=pinjampakai_status]").getRawValue();
		pinjampakaiConfig = form.down("[name=pinjampakai_config]").getRawValue();
		// console.log(pinjampakaiStatus);

		if (pinjampakaiStatus && persentasepembayaran >= pinjampakaiConfig) {
			status = 1;
			msg = 'Data is valid';
		} else {
			if (pinjampakaiStatus && persentasepembayaran < pinjampakaiConfig) {
				msg = 'Minimal persentase pembayaran harus ' + pinjampakaiConfig + '%; ';
				status = 0;
			}
		}
		return {"status": status, "message": msg};

	},

	// select garansi or serah terima date
	onSelectGaransi: function (name) {
		var me = this,
			form             = me.getFormdata(),
			guaranteetype_id = form.down("[name=guaranteetype_" + name + "_id]").getValue(),
			store            = form.down("[name=guaranteetype_" + name + "_id]").getStore(),
			record           = store.findRecord('guaranteetype_id', guaranteetype_id),
			serahterima_date = form.down("[name=serahterima_date]").getValue();

		if (serahterima_date && record) {
			var formatAdd = Ext.Date.MONTH;
			if(record.get('period').toLowerCase() == 'hari'){ formatAdd = Ext.Date.DAY; }
			else if(record.get('period').toLowerCase() == 'tahun'){ formatAdd = Ext.Date.YEAR; }

			var guarantee = record.get('guarantee');
			var tgl       = Ext.Date.add(serahterima_date, formatAdd, (guarantee));

			form.down("[name=garansi_" + name + "_date]").setValue(tgl);
		}
	},

	//printout
	docPrint: function () {
		var me = this;

		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({params: {parametername: 'PRINTOUT_BAST_DOC'}});

		var grid   = me.getGrid();
		var store  = grid.getStore();
		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

		var id = record.data.unit_id;
		me.documentPrintout(id, 'erems/complaint/read');

		var combo = Ext.getCmp('cbPrintoutID');
		combo.bindStore(globalparameterStore);
	},

	// Printout Pinjam Pakai
	docPrintPinjam: function () {
		var me = this;

		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({params: {parametername: 'PRINTOUT_PINJAM_DOC'}});

		var grid   = me.getGrid();
		var store  = grid.getStore();
		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

		var id = record.data.unit_id;

		me.documentPrintout(id, 'erems/complaint/read');

		var combo = Ext.getCmp('cbPrintoutID');
		combo.bindStore(globalparameterStore);
	},
	docPrintUndangan: function () {
		var me = this;

		var grid   = me.getDetailgridsurat();
		var store  = grid.getStore();
		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

		var id = record.data.aftersales_surat_id,
			undangan = record.data.undangan,
			paramUndangan = 'AFTERSALES_UNDANGAN_' + undangan;

		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({params: {parametername: paramUndangan}});

		me.documentPrintout(id, 'erems/complaint/read');

		var combo = Ext.getCmp('cbPrintoutID');
		combo.bindStore(globalparameterStore);
	},
	//end printout

	detailFormDokumen: {
		that: this,
		editingIndexRow: 0,
		save: function () {
			var me = this;

			var form = me.getFormdatadetaildokumen().getForm();
			var formVal = form.getValues();

			var msg = '';

			if (form.isValid()) {

				var dStore = null;
				var win = me.getFormdatadetaildokumen().up('window');

				dStore = me.getDetailgriddokumen().getStore();

				if (win.state == 'create') {
					//===== upload images
					form.submit({
						url: 'erems/' + me.controllerName + '/uploaddokumen',
						waitMsg: 'Uploading dokumen...',
						success: function (f, a) {
							var aftersales_id = me.getFormdata().down('[name=aftersales_id]').getValue();

							var val = {
								aftersales_dokumenupload : formVal.aftersales_dokumenupload,
								aftersales_id            : aftersales_id,
								doc_filename             : a.result.dokName,
								description              : formVal.description,
								jenis_file               : formVal.jenis_file
							};

							dStore.add(val);

							Ext.Msg.show({
								title   : 'Success',
								msg     : 'Image Uploaded',
								icon    : Ext.Msg.INFO,
								buttons : Ext.Msg.OK
							});

						},
						failure: function (f, a) {
							Ext.Msg.show({
								title   : 'Upload Failed',
								msg     : a.result.msg,
								icon    : Ext.Msg.INFO,
								buttons : Ext.Msg.OK
							});
						}
					});
				} else {

					var aftersales_id = me.getFormdata().down('[name=aftersales_id]').getValue();

					var val = {
						aftersales_dokumenupload : formVal.aftersales_dokumenupload,
						aftersales_id            : aftersales_id,
						doc_filename             : a.result.dokName,
						description              : formVal.description,
						jenis_file               : formVal.jenis_file
					};

					var rec = dStore.getAt(me.detailFormImages.editingIndexRow);
					rec.beginEdit();
					rec.set(val);
					rec.endEdit();
				}

				win.close();


			}
		}
	},

	detailGridDokumen: {
		that: this,
		gridDetailDokumenSelectionChange: function () {
			var me = this;
			var grid = me.getDetailgriddokumen(), row = grid.getSelectionModel().getSelection();
			grid.down('#btnDelete').setDisabled(row.length < 1);
		},
		actionColumnDownload: function (view, rowIndex, colIndex, item, e, record, row) {
			var url = window.location.protocol + "//" + window.location.host + '/webapps/Ciputra/public/app/erems/uploads/complaint_dokumen/' + view[5].data.doc_filename; //local
//            var url = window.location.protocol+"//"+window.location.host+'/webapps-live/public/app/erems/uploads/complaint_dokumen/'+view[5].data.doc_filename; //ceslive
//            var url = window.location.protocol+"//"+window.location.host+'/public/app/erems/uploads/complaint_dokumen/'+view[5].data.doc_filename;  //cestest
			window.open(
					url,
					'_blank' // <- This is what makes it open in a new window.
					);
//        var imgWin = new Ext.Window({
//                width: 600,
//                height: 420,
//                id: 'theImgWin',
//                autoScroll: true,
//                title: 'Download Dokumen BAST',
//                resizable: false,
//                modal: true,
//                items: [
////                        {
////                                //  bodyPadding: 10,
////                                //padding: '10px 0 0 0',
////                                layout: 'hbox',
////                                bodyStyle: 'border:0px',
////                                itemId: 'image_place',
////                                items: [{
////                                                xtype: 'image',
////                                                shrinkWrap: true,
////                                                name: 'image_filename',
////                                                width: '100%',
////                                                height: 360,
////                                                src: url
////                                        }]
////                        },
//                        {
//                                xtype: 'label',
//                                html: '<a href="' + url + '" target="blank">Click Here For Download Document</a>',
//                                flex: 1,
//                                margin: '0 0 0 10px'
//                        },
//                ]
//        });
//        imgWin.show();
//        
//            
		},
		deleteAction: function () {
			var me   = this;
			var gr   = me.getDetailgriddokumen();
			var rows = me.getDetailgriddokumen().getSelectionModel().getSelection();
			
			for (var i = 0; i < rows.length; i++) {
				rows[i].set("deleted", true)
			}

			gr.getStore().filterBy(function (recod) {
				return recod.data.deleted == false;
			});
		}
	},
	mainPanelBeforeRender: function (el) {
		var me = this;
		me.detailTool8 = new Erems.library.DetailtoolAll();
		me.detailTool8.setConfig({
			viewPanel        : 'FormDataSurvey',
			parentFDWindowId : me.getGrid().up('window').id,
			controllerName   : me.controllerName
		});

		Ext.Ajax.request({
			url     : 'erems/complaint/read',
			params  : { read_type_mode : 'others_config' },
			success : function (response) {
				var obj = JSON.parse(response.responseText);
				var grid = me.getGrid(), button = grid.down('#use_sales_force'), button_send_sf_sh1 = grid.down('#send_sf_sh1');

				// grid.down('#btnSurvey').setDisabled(true);
				grid.down('#btnSurvey').setVisible(false);
				button.setVisible(false);
				button_send_sf_sh1.setVisible(false);

				if (obj['survey_config'] == 1) {
					grid.down('#btnSurvey').setVisible(true);
				}

				if (obj['canSetupParameter'] == 1) {
					button.setVisible(true);
					if (obj['subholding'] == 2) {
						button_send_sf_sh1.setVisible(true);
					}
				} else {
					button.setVisible(false);
					button_send_sf_sh1.setVisible(false);
				}

				me.getPurcheletterSendWaActive   = obj['sendwa']['getPurcheletterSendWa']['active'];
				me.getPurcheletterSendWaPhone    = obj['sendwa']['getPurcheletterSendWa']['phone'];
				me.getPurcheletterSendWaText     = obj['sendwa']['getPurcheletterSendWaText'];
				me.useSalesForce                 = obj['useSalesForce'];
				me.sendSalesForceSH1Server       = obj['sendSalesForceSH1Server'];
				me.subholding                    = obj['subholding'];
				me.bastwithoutST                 = obj['bastwithoutST'];
				me.NextDayUndanganDate1          = obj['NextDayUndanganDate1'];
				me.NextDayUndanganDate2          = obj['NextDayUndanganDate2'];
				me.NextDayUndanganDate3          = obj['NextDayUndanganDate3'];
				me.subholding_config             = obj['subholding_config'];
				me.subholding_config_pinjampakai = obj['subholding_config_pinjampakai'];
				me.subholding_config_complaint   = obj['subholding_config_complaint'];
				me.counter_bast                  = obj['counter_bast'];
				me.counter_nomer_surat           = obj['counter_nomer_surat'];

				if (obj['canSetupParameter'] == 1) {
					if (me.useSalesForce == 1) {
						button.setText('Use Sales Force : On');
						button.toggle(true);
						if (obj['subholding'] == 2) {
							button_send_sf_sh1.setVisible(true);
						}
					} else {
						button.setText('Use Sales Force : Off');
						button.toggle(false);
						button_send_sf_sh1.setVisible(false);
					}

					if (me.sendSalesForceSH1Server == 1) {
						button_send_sf_sh1.setText('Send Sales Force SH1 Server : On');
						button_send_sf_sh1.toggle(true);
					} else {
						button_send_sf_sh1.setText('Send Sales Force SH1 Server : Off');
						button_send_sf_sh1.toggle(false);
					}
				}

				if (obj['subholding'] == 1) {
					button_send_sf_sh1.setVisible(false);
				}
			}
		});
	},
	formDataSurveyAfterRender: function (el) {
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();

		var aftersales_id = row[0].data.aftersales_id;
		var unit_id = row[0].data.unit_id;
		var nilai_survey = row[0].data.nilai_survey;
		var nilai_survey_nps = row[0].data.nilai_survey_nps;
		var purchaseletter_id = row[0].data.purchaseletter_id;

		me.getFormdatasurvey().down("[name=aftersales_id]").setValue(aftersales_id);
		me.getFormdatasurvey().down("[name=unit_id]").setValue(unit_id);
		me.getFormdatasurvey().down("[name=nilai_survey]").setValue(nilai_survey);
		me.getFormdatasurvey().down("[name=nilai_survey_nps]").setValue(nilai_survey_nps);

		//added by anas 04082021
		me.getFormdatasurvey().down("[name=purchaseletter_id]").setValue(purchaseletter_id);

		//added by anas 04082021
		var complaintsurveyStore = me.getComplaintSurveyStore();
		complaintsurveyStore.removeAll();
		complaintsurveyStore.load({
			params: {purchaseletter_id: purchaseletter_id, read_type_mode: 'grid_survey'},
			callback: function (rec) {
			}
		});

	},

	detailFormSurvey: {
		that: this,
		editingIndexRow: 0,
		save: function () {
			var me = this;

			var form = me.getFormdatasurvey().getForm();
			// var formVal = form.getValues();

			var msg = '';

			if (form.isValid()) {

				var fields = me.getFormdatasurvey().getValues();
				var purchaseletterID = fields.purchaseletter_id;

				//added by anas 04082021
				if (purchaseletterID == null || purchaseletterID == '' || purchaseletterID == 0)
				{
					Ext.Msg.show({
						title: 'Failure',
						msg: 'Error: Check your purchaseletter.',
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});
				} else
				{
					var myObj = {
						aftersales_id: fields.aftersales_id,
						unit_id: fields.unit_id,
						survey: true,
						nilai_survey: fields.nilai_survey,
						nilai_survey_nps: fields.nilai_survey_nps,

						//added by anas 04082021
						periode: fields.periode,
						purchaseletter_id: purchaseletterID,
						survey_aftersales_id: fields.survey_aftersales_id
					}

					resetTimer();
					me.getFormdatasurvey().up('window').body.mask('Saving, please wait ...');
					Ext.Ajax.request({
						url: 'erems/complaint/update',
						params: {
							data: Ext.encode(myObj)
						},
						success: function (response) {
							// console.log(Ext.decode(response));

							me.getFormdatasurvey().up('window').body.unmask();
							if (Ext.decode(response.responseText).success == true) {
								Ext.Msg.show({
									title: 'Success',
									msg: 'Data saved successfully.',
									icon: Ext.Msg.INFO,
									buttons: Ext.Msg.OK,
									fn: function () {
										// me.getFormdatasurvey().up('window').close();
										// var gridDepan = me.getGrid();
										// var storeDepan = gridDepan.getStore();
										// storeDepan.reload();

										//updated by anas 04082021
										var gridsurvey = me.getDetailgridsurvey();
										var storesurvey = gridsurvey.getStore();
										storesurvey.reload();
										form.reset();
										me.getFormdatasurvey().down("[name=purchaseletter_id]").setValue(purchaseletterID);
										me.getFormdatasurvey().down("[name=periode]").setReadOnly(false);
									}
								});
							} else {
								Ext.Msg.show({
									title: 'Failure',
									msg: 'Error: Unable to save data.',
									icon: Ext.Msg.ERROR,
									buttons: Ext.Msg.OK
								});
							}
						},
					});
				}

			}
		},
		reset: function () {
			var me = this;
			var form = me.getFormdatasurvey().getForm();
			var fields = me.getFormdatasurvey().getValues();
			var purchaseletterID = fields.purchaseletter_id;

			var gridsurvey = me.getDetailgridsurvey();
			var storesurvey = gridsurvey.getStore();
			storesurvey.reload();
			form.reset();
			me.getFormdatasurvey().down("[name=purchaseletter_id]").setValue(purchaseletterID);
			me.getFormdatasurvey().down("[name=periode]").setReadOnly(false);
		}
	},

	//added by anas 04082021
	detailGridSurvey: {
		that: this,
		// gridDetailSurveySelectionChange: function () {
		//     var me = this;
		//     var gr = me.getDetailgridsurvey(), row = gr.getSelectionModel().getSelection();
		//     gr.down('#btnEdit').setDisabled(row.length != 1);
		// },
		update: function () {
			var me = this;
			var grid = me.getDetailgridsurvey();

			// var row = grid.getSelectionModel().getSelection();            
			var row = grid.getStore().data.items;
			if (row.length > 0)
			{
				me.getFormdatasurvey().down("[name=nilai_survey]").setValue(row[0].data.nilai_survey);
				me.getFormdatasurvey().down("[name=nilai_survey_nps]").setValue(row[0].data.nilai_survey_nps);
				me.getFormdatasurvey().down("[name=periode]").setValue(row[0].data.periode);
				me.getFormdatasurvey().down("[name=periode]").setReadOnly(true);
				me.getFormdatasurvey().down("[name=survey_aftersales_id]").setValue(row[0].data.survey_aftersales_id);
			}

		},
	},

	//added by anas 09092021
	documentPrintout: function (id, urlAdd) {
		var me = this;

		var combo = Ext.create('Ext.form.field.ComboBox', {
			id: 'cbPrintoutID',
			editable: false,
			queryMode: 'local',
			valueField: 'value',
			displayField: 'value',
			width: '100%'
		});

		Ext.create('Ext.window.Window', {
			id: 'myCbDocWindow',
			title: 'Select Printout Document',
			height: 100,
			width: 400,
			layout: 'hbox',
			padding: '10px 10px 10px 10px',
			modal: true,
			items: {// Let's put an empty grid in just to illustrate fit layout
				xtype: combo,
				name: 'printout_combobox'
			},
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'bottom',
					ui: 'footer',
					layout: {
						//padding: 6,
						type: 'hbox'
					},
					items: [
						{
							xtype: 'button',
							action: 'processprintout',
							padding: 5,
							width: 75,
							iconCls: 'icon-save',
							text: 'Process',
							handler: function () {
								var me2 = this;

								var printout_cb = this.up('window').items.items[0].value;
								if (!printout_cb) {
									Ext.Msg.show({
										title: 'Alert',
										msg: 'Please Select Printout Document First',
										icon: Ext.Msg.WARNING,
										buttons: Ext.Msg.OK
									});
									return false;
								}

								me2.up('window').body.mask('Creating Document, Please Wait...');

								Ext.Ajax.request({
									url: urlAdd,
									params: {
										id: id,
										document_name: printout_cb,
										read_type_mode: 'printout_document'
									},
									success: function (response) {
										try {
											var resp = response.responseText;

											if (resp) {
												var info = Ext.JSON.decode(resp);

												//added by anas 09092021
												var url = info.url;
												var plwa = '';
												if (me.getPurcheletterSendWaActive == 1) {
													plwa = '<br><br><br><a href="https://api.whatsapp.com/send?phone=' + me.getPurcheletterSendWaPhone + '&text=' + me.getPurcheletterSendWaText + ' ' + window.location.href + url + '" target="blank">Click Here For Send To WA</a>';
												}
												//end added by anas 09092021

												if (info.success == true) {
													me2.up('window').body.unmask();
													Ext.Msg.show({
														title: 'Info',
														//updated by anas 09092021
														msg: '<a href="' + info.url + '" target="blank">Click Here For Download Document</a>' + plwa,
														icon: Ext.Msg.INFO,
														//buttons: [], //jika ingin tidak ada buttons
														buttons: Ext.Msg.CANCEL,
														buttonText:
																{
																	cancel: 'Close',
																}
													});
												} else {
													me2.up('window').body.unmask();
													Ext.Msg.show({
														title: 'Failure',
														msg: 'Error: Create Document Failed.',
														icon: Ext.Msg.ERROR,
														buttons: Ext.Msg.OK
													});
												}
											}
										} catch (e) {
											//console.error(e);
											me2.up('window').body.unmask();
											Ext.Msg.show({
												title: 'Failure',
												msg: 'Error: Create Document Failed.',
												icon: Ext.Msg.ERROR,
												buttons: Ext.Msg.OK
											});
										}
									},
									failure: function (e) {
										//console.error(e);
										me2.up('window').body.unmask();
										Ext.Msg.show({
											title: 'Failure',
											msg: 'Error: Create Document Failed.',
											icon: Ext.Msg.ERROR,
											buttons: Ext.Msg.OK
										});
									}
								});
							}
						},
						{
							xtype: 'button',
							action: 'cancel',
							itemId: 'btnCancel',
							padding: 5,
							width: 75,
							iconCls: 'icon-cancel',
							text: 'Cancel',
							handler: function () {
								this.up('window').close();
							}
						}
					]
				}
			]
		}).show();
	},
	// added by rico 14102021
	downloadLog: function (type) {
		var me = this;
		var f = me.getFormdata();

		f.setLoading("Creating Log File, Please Wait...");

		Ext.Ajax.timeout = 60000 * 5;
		Ext.Ajax.request({
			url: 'erems/complaint/read/?action=schema',
			params: {
				unit_id: f.down("[name=unit_id]").getValue(),
				read_type_mode: 'logs',
				logs_type: type
			},
			success: function (response) {
				me.getFormdata().setLoading(false);

				try {
					var url = Ext.decode(response.responseText).URL;
					var text = Ext.decode(response.responseText).text;
					if (url) {
						Ext.Msg.show({
							title: 'Info',
							msg: '<a href="data:text/plain;charset=UTF-8,' + encodeURIComponent(text) + '" download="' + type + '.log" target="blank">Download file</a>',
							icon: Ext.Msg.INFO,
							buttons: Ext.Msg.OK
						});
					} else {
						Ext.Msg.show({
							title: 'Warning',
							msg: 'WARNING : Log ' + type + ' empty.',
							icon: Ext.Msg.WARNING,
							buttons: Ext.Msg.OK
						});
					}
				} catch (e) {
					Ext.Msg.show({
						title: 'Failure',
						msg: 'Error: Failed to create a logs.',
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});
				}
			},
			failure: function (e) {
				me.getFormdata().setLoading(false);
				Ext.Msg.show({
					title: 'Failure',
					msg: 'Error: Failed to create a logs.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		});
	}
});