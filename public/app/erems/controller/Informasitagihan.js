Ext.define('Erems.controller.Informasitagihan', {
	extend : 'Erems.library.template.controller.Controlleralt',
	alias  : 'controller.Informasitagihan',
	requires:[
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.XyReportJs'
	],
	views  : ['informasitagihan.Panel', 'informasitagihan.Grid', 'informasitagihan.GridDetail', 'informasitagihan.GridDetailSchedule', 'informasitagihan.FormSearch', 'informasitagihan.FormDataGeneratedate'],
	stores : ['', 'Informasitagihan', 'Informasitagihandetail', 'Informasitagihandetailschedule','Mastercluster'],
	models : ['Informasitagihan', 'Informasitagihandetail', 'Informasitagihandetailschedule','Mastercluster'],
	refs   : [
		{
			ref      : 'grid',
			selector : 'informasitagihangrid'
		},
		{
			ref      : 'griddetail',
			selector : 'informasitagihangriddetail'
		},
		{
			ref      : 'griddetailschedule',
			selector : 'informasitagihangriddetailschedule'
		},
		{
			ref      : 'formsearch',
			selector : 'informasitagihanformsearch'
		},
		{
			ref      : 'formdatageneratedate',
			selector : 'informasitagihanformdatageneratedate'
		},
	],
	controllerName : 'informasitagihan',
	fieldName      : 'unit_number',
	bindPrefixName : 'Informasitagihan',
	formWidth      : 1300,
	xyReport       : null,
	reportFileView : null,
	reportFileType : null,
	tanggalProses  : null,
	months         : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	init           : function (application) {
		var me = this;

		this.control({
			'informasitagihanpanel': {
				beforerender : me.mainPanelBeforeRender,
				afterrender  : me.panelAfterRender
			},
			'informasitagihangrid': {
				afterrender     : me.gridAfterRender,
				itemdblclick    : me.gridItemDblClick,
				itemcontextmenu : me.gridItemContextMenu,
				selectionchange : me.gridSelectionChange,
			},
			'informasitagihangriddetail': {
				selectionchange : me.griddetailSelectionChange
			},
            'informasitagihangriddetail button[action=printout]': {
                click : me.formDataPrintout
            },
            'informasitagihangrid button[action=generateprosesdate]': {
				click : me.genarateDate
            },
			'informasitagihanformsearch' : {
				afterrender : me.formSearchAfterRender
			},
			'informasitagihanformsearch button[action=search]' : {
				click : me.dataSearch
			},
			'informasitagihanformsearch button[action=reset]' : {
				click : me.dataReset
			},
			'informasitagihanformdatageneratedate [name=tanggal_proses]': {
				focus : function(el){
					var offset = $('input[name="tanggal_proses"]').last().offset();
					var height = $('input[name="tanggal_proses"]').outerHeight();

					me.getFormdatageneratedate().down('[name=tanggal]').getPicker().addClass('myPickerdate');
					
					// me.getFormdatageneratedate().down('[name=tanggal]').onTriggerClick();
					$('input[name="tanggal"]').trigger('click');
					$('.myPickerdate').css({ 'left' : offset.left, 'top' : (offset.top+height) });
				}
			},
			'informasitagihanformdatageneratedate [name=tanggal]': {
				change : function(el){
					if(! el.isValid()){
		                Ext.Msg.alert('Info', el.activeErrors[0]);
					}
					else{
				        var newTgl = new Date(el.value);
                        var yr     = newTgl.getFullYear();
                        var mt     = newTgl.getMonth();
						
						me.getFormdatageneratedate().down('[name=tanggal_proses]').setValue(me.months[mt] + ' ' + yr);
					}

					me.labelProsesdate();
				},
			},
			'informasitagihanformdatageneratedate [name=periode]': {
				change : function(el){
					me.labelProsesdate();
				}
			},
			'informasitagihanformdatageneratedate [action=proses_generate_date]': {
				click : function(el){
					me.prosesGeneratedate();
				}
			},
		});
	},
	panelAfterRender: function (configs) {
		var me         = this;
		var formGrid   = me.getGrid();
		var FormSearch = me.getFormsearch();

        var result =  Ext.JSON.decode(
        	Ext.Ajax.request({
	            url     : 'erems/informasitagihan/read',
	            method  : 'POST',
	            timeout : 45000000,
	            async   : false,
	            params  : { mode : 'asset' }
	        }).responseText
        );

		me.reportFileView = result.print_file ? result.print_file : null;
		me.reportFileType = result.print_type ? result.print_type : null;

		me.getGriddetail().getStore().removeAll();
		me.getGriddetailschedule().getStore().removeAll();

		me.getGriddetail().down('[action=printout]').setDisabled(true);
	},
	gridSelectionChange: function () {
		var me = this;

		me.getGriddetailschedule().getStore().removeAll();

		if(typeof me.getGrid().getSelectedRecord() != 'undefined'){
			var tagihan_id = me.getGrid().getSelectedRecord().get('tagihan_id');

			var gridDetail  = me.getGriddetail();
			var storeDetail = me.getGriddetail().getStore();

			gridDetail.down('[action=printout]').setDisabled(true);

			storeDetail.getProxy().setExtraParam('mode', 'gettagihanpurchaseletter');
			storeDetail.getProxy().setExtraParam('tagihan_id', tagihan_id);

			var fields = me.getFormsearch().getValues();
	        for (var x in fields){
	            storeDetail.getProxy().setExtraParam(x, fields[x]);
	        }
			me.loadPage(storeDetail);
			
		}

	},
	griddetailSelectionChange : function(){
		var me = this;

		if(typeof me.getGriddetail().getSelectedRecord() != 'undefined'){
			var tagihan_detail_id = me.getGriddetail().getSelectedRecord().get('tagihan_detail_id');

			me.getGriddetailschedule().getStore().getProxy().setExtraParam('mode', 'gettagihanschedule');
			me.getGriddetailschedule().getStore().getProxy().setExtraParam('tagihan_detail_id', tagihan_detail_id);
			me.getGriddetailschedule().getStore().reload({
				callback : function(){
					me.getGriddetail().down('[action=printout]').setDisabled(false);
				}
			});
		}
	},
	genarateDate : function(){
		var me    = this;
		var winId = 'win-' + me.bindPrefixName + 'formdatageneratedate';
		var win   = desktop.getWindow(winId);

		if (!win) {
			win = desktop.createWindow({
				id              : winId,
				title           : 'Proses Informasi Tagihan',
				iconCls         : 'icon-form-add',
				resizable       : false,
				minimizable     : false,
				maximizable     : false,
				width           : 600,
				renderTo        : Ext.getBody(),
				constrain       : true,
				constrainHeader : false,
				modal           : true,
				layout          : 'fit',
				shadow          : 'frame',
				shadowOffset    : 10,
				border          : false,
				state           : 'generate_date',
				listeners       : {
					boxready : function () {
						win.body.mask('Loading...');
						var tm = setTimeout(function () {
							win.add(Ext.create('Erems.view.' + me.controllerName + '.FormDataGeneratedate'));
							win.center();
							win.body.unmask();

							me.labelProsesdate();

							clearTimeout(tm);
						}, 1000);
					},
				}
			});
		}
		win.show();
	},
	labelProsesdate : function(){
		var me = this;

		var newDate = new Date(me.getFormdatageneratedate().down('[name=tanggal]').value);
		newDate.setMonth( newDate.getMonth() + 1 );

		var month   = newDate.getMonth();
		var year    = newDate.getFullYear(); 

		var label = ': 01 ' + me.months[month] + ' ' + year + ' s/d 15 ' + me.months[month] + ' ' + year;
		if(me.getFormdatageneratedate().down('[name=periode]').value == 2){
			var lDay  = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);
			label = ': 16 ' + me.months[month] + ' ' + year + ' s/d ' + lDay.getDate() + ' ' + me.months[month] + ' ' + year;
		}

		me.getFormdatageneratedate().down('[name=text_periode]').setText(label);
	},
	prosesGeneratedate : function(){
		var me = this;
		var formDatageneratedate = me.getFormdatageneratedate();

		var selector_tanggal = formDatageneratedate.down('[name=tanggal]');
		var selector_periode = formDatageneratedate.down('[name=periode]');

		if(! selector_tanggal.isValid()){
			Ext.Msg.alert('Info', selector_tanggal.activeErrors[0]);
        	return;
		}
		else if(selector_tanggal.value > selector_tanggal.maxValue){
			Ext.Msg.alert('Info', 'Tanggal (bulan) yang dipilih tidak boleh lebih besar dari bulan berjalan.');
        	return;
		}
		else{
			/// Cek tagihan tanggal yg dipilih dan periode ke db tagihan 
			var dataForm = formDatageneratedate.getValues();

			resetTimer();
			formDatageneratedate.up('window').body.mask('Cek tanggal (bulan) dan periode tagihan, please wait ...');

			var result =  Ext.JSON.decode(
	        	Ext.Ajax.request({
		            url     : 'erems/informasitagihan/read',
		            method  : 'POST',
		            timeout : 45000000,
		            async   : false,
		            params  : Object.assign(formDatageneratedate.getValues(), {mode : 'checkData'})
		        }).responseText
	        );

	        formDatageneratedate.up('window').body.unmask();

	        if(result.success == true){ // Invalid data
	        	var text_periode = selector_periode.value == 1 ? 'pertama' : 'kedua';
				Ext.Msg.show({
					title   : 'Failure',
					msg     : 'Error: Informasi tagihan untuk ' + selector_tanggal.rawValue + ' periode ' + text_periode + ' sudah diproses.',
					icon    : Ext.Msg.ERROR,
					buttons : Ext.Msg.OK
				});
	        }
	        else{
	        	var newDate = new Date(formDatageneratedate.down('[name=tanggal]').value);
				newDate.setMonth( newDate.getMonth() + 1 );

				var month   = newDate.getMonth();
				var year    = newDate.getFullYear(); 

				var startDate = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
				var endDate   = new Date(newDate.getFullYear(), newDate.getMonth(), 15);
				if(selector_periode.value == 2){
					startDate = new Date(newDate.getFullYear(), newDate.getMonth(), 16);
					endDate   = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);
				}

				startDate = moment(startDate).format('YYYY-MM-DD');
				endDate   = moment(endDate).format('YYYY-MM-DD');

	        	resetTimer();
				formDatageneratedate.up('window').body.mask('Saving, please wait ...');
				Ext.Ajax.request({
					url     : 'erems/informasitagihan/create',
					params  : { data : Ext.encode(Object.assign(formDatageneratedate.getValues(), {start_date : startDate, end_date : endDate})) },
					timeout : 45000000,
					success : function (response) {
						formDatageneratedate.up('window').body.unmask();
						if (Ext.decode(response.responseText).success == true){
							Ext.Msg.show({
								title   : 'Success',
								msg     : 'Data processed successfully.',
								icon    : Ext.Msg.INFO,
								buttons : Ext.Msg.OK,
								fn      : function () {
									formDatageneratedate.up('window').close();
									me.getGrid().getStore().reload();
								}
							});
						} else {
							Ext.Msg.show({
								title   : 'Failure',
								msg     : 'Error: Unable to process data.',
								icon    : Ext.Msg.ERROR,
								buttons : Ext.Msg.OK
							});
						}
					},
					failure : function(){
						formDatageneratedate.up('window').body.unmask();
						Ext.Msg.show({
							title   : 'Failure',
							msg     : 'Error: Unable to process data.',
							icon    : Ext.Msg.ERROR,
							buttons : Ext.Msg.OK
						});
					}
				});
	        }
		}
	},
	dataSearch: function() {
		var me    = this;
		var grid  = me.getGrid();
		var store = grid.getStore();

        var fields = me.getFormsearch().getValues();
        for (var x in fields){
            store.getProxy().setExtraParam(x, fields[x]);
        }

		store.load(function(records, operation, success){
			if(records.length > 0){
		  		grid.getSelectionModel().select(0, true); 
			}
		});
    },
 	dataReset: function() {
        var me = this;

        me.getFormsearch().getForm().reset();
        me.dataSearch();

        me.getGriddetail().getStore().removeAll();
		me.getGriddetailschedule().getStore().removeAll();
    },
	formDataPrintout : function(e){
		var me = this;
		if(me.reportFileType == 'mrt'){ /// MRT
			if (!me.xyReport) {
				me.xyReport = new Erems.library.XyReportJs(); //JS
				me.xyReport.init(me);
			}
			me.xyReport.processReport();
		}
		else{
			me.docxProcess();
		}
	},
	xyReportProcessParams: function (reportData) {
		var me = this;

		var rec  = me.getGriddetail().getSelectedRecord();

		reportData['file']                     = me.reportFileView;
		reportData.params["project_id"]        = apps.project.trim();
		reportData.params["pt_id"]             = apps.pt.trim();
		reportData.params["tagihan_detail_id"] = rec.get("tagihan_detail_id");

		return reportData;
	},
	docxProcess : function(){
		var me = this;

		var grid = me.getGriddetail();
		var rec  = grid.getSelectedRecord();

		grid.up('window').body.mask('Creating Document, Please Wait...');

		Ext.Ajax.request({
			url    : 'erems/' + me.controllerName + '/print',
			params : {
				tagihan_detail_id : rec.get("tagihan_detail_id"),
				doc_name          : me.reportFileView,
				doc_type          : me.reportFileType,
			},
			success: function(response) {
				try{
					var resp = response.responseText;
					
					if(resp) {
						var info = Ext.JSON.decode(resp);
						
						if(info.success == true){
							grid.up('window').body.unmask();
							Ext.Msg.show({
								title      : 'Info',
								msg        : '<a href="' + info.url + '" target="blank">Click Here For Download Document</a>',
								icon       : Ext.Msg.INFO,
								buttons    : Ext.Msg.CANCEL,
								buttonText : { cancel : 'Close' }
							});
						} else {
							grid.up('window').body.unmask();
							Ext.Msg.show({
								title   : 'Failure',
								msg     : 'Error: Create Document Failed.',
								icon    : Ext.Msg.ERROR,
								buttons : Ext.Msg.OK
							});
						}
					}
				}catch(e){
					grid.up('window').body.unmask();
					Ext.Msg.show({
						title   : 'Failure',
						msg     : 'Error: Create Document Failed.',
						icon    : Ext.Msg.ERROR,
						buttons : Ext.Msg.OK
					});
				}
			},
			failure: function(e){
				grid.up('window').body.unmask();
				Ext.Msg.show({
					title   : 'Failure',
					msg     : 'Error: Create Document Failed.',
					icon    : Ext.Msg.ERROR,
					buttons : Ext.Msg.OK
				});
			}
		});
	},
});