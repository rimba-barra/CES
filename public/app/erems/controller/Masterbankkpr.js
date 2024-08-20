Ext.define('Erems.controller.Masterbankkpr', {
	extend: 'Erems.library.template.controller.Controlleralt',
	alias: 'controller.Masterbankkpr',
	views: ['masterbankkpr.Panel', 'masterbankkpr.Grid', 'masterbankkpr.FormSearch', 'masterbankkpr.FormData'],
	requires: [
		'Erems.library.template.component.Bankcombobox'
	],
	stores: ['Masterdata.store.Bank', 'Masterbankkpr', 'Masterplafon', 'Masterdata.store.Masterglobalbankkpr', 'Masterbankkprbybank'],
	models: ['Masterbankkpr', 'Masterplafon', 'Masterdata.model.Masterglobalbankkpr'],
	refs: [
		{
			ref: 'grid',
			selector: 'masterbankkprgrid'
		},
		{
			ref: 'formsearch',
			selector: 'masterbankkprformsearch'
		},
		{
			ref: 'formdata',
			selector: 'masterbankkprformdata'
		},
	],
	controllerName: 'masterbankkpr',
	fieldName: 'bank_name',
	bindPrefixName: 'Masterbankkpr',
	ftStore2: null,
	init: function (application) {
		var me = this;
		this.control({
			'masterbankkprpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'masterbankkprgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'masterbankkprgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'masterbankkprgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'masterbankkprgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'masterbankkprgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'masterbankkprgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'masterbankkprformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'masterbankkprformsearch button[action=search]': {
				click: this.dataSearch
			},
			'masterbankkprformsearch button[action=reset]': {
				click: this.dataReset
			},
			'masterbankkprformdata': {
				afterrender: this.formDataAfterRender
			},
			'masterbankkprformdata button[action=save]': {
				click: me.klikSave//this.dataSave
			},
			'masterbankkprformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'masterbankkprformdata [name=bank_id]': {
				select: me.fillDefaultData
			},

			/* BROWSE CONTROL */
			/*'masterbankkprbrowsepanel': {
			 beforerender: me.browsepanelBeforeRender
			 },
			 'masterbankkprbrowsepanel button[action=select]':{
			 click:me.browsegridSelection
			 },
			 'masterbankkprbrowsegrid':{
			 afterrender:me.browsegridAfterRender
			 },
			 'masterbankkprbrowseformsearch button[action=search]': {
			 click: me.browsedataSearch
			 },
			 'masterbankkprbrowseformsearch button[action=reset]': {
			 click: me.browsedataReset
			 }*/
			/* END BROWSE CONTROL */
		});
	},

	formSearchAfterRender: function (el) {
		var me = this;
		//me.loadComboBoxStore(el); 

		var ftStore = null;
		ftStore = el.down('#fs_bank_id').getStore();
		ftStore.load({params: {start: 0, limit: 0}});
	},

	formDataAfterRender: function (el) {
		var me = this;
		me.storeProcess = me.createSpProcessObj(me.storeProcess);
		me.fdar().init();

		me.loadComboBoxStore(el);

		var ftStore = null;
		ftStore = el.down('#fd_bank_id').getStore();
		ftStore.load({params: {start: 0, limit: 0}});

		//var ftStore2 = null;
		ftStore2 = el.down('#fd_globalbankkpr').getStore();
		ftStore2.load({params: {start: 0, limit: 0}});

		var state = el.up('window').state;

		if (state == 'create') {
			me.fdar().create();
		} else if (state == 'update') {
			me.fdar().update();
			me.getFormdata().down('[name=bank_id]').setReadOnly(true);
		}

		me.resetButton();
	},
	// added by rico 19042022
	resetButton: function(){
		var me = this;
		var reset = me.getFormdata().query('[action=reset]');
		
		$.each(reset, function(index, value){
			var plafon = me.getFormdata().down('[name="'+value.itemId+'_id"]');
			var persen = me.getFormdata().down('[name="'+value.itemId+'_persen"]');

			if(plafon.value > 0){
				me.getFormdata().down('#'+value.itemId).show();

				value.on('click', function(){
					plafon.setValue(0);
					plafon.setRawValue(0);
					persen.setValue(0);
					me.getFormdata().down('#'+value.itemId+'_label').flex = 4;
					me.resetButton();
				});
			}else{
				me.getFormdata().down('#'+value.itemId).hide();
				me.getFormdata().down('#'+value.itemId+'_label').flex = 4;
			}
		});
	},
	fillDefaultData: function () {
		var me = this;
		var bank_id = me.getFormdata().down('[name=bank_id]').getValue();

		var globalBankKPRStore = ftStore2;

		globalBankKPRStore.clearFilter(true);
		globalBankKPRStore.filterBy(function (recod) {
			return recod.data.bank_id == bank_id;
		});

		var countStore = globalBankKPRStore.getCount();
		if (countStore == 1) {
			globalBankKPRStore.each(function (record) {
				me.getFormdata().down('[name=tahap1_id]').setValue(record.get('tahap1_id'));
				me.getFormdata().down('[name=tahap2_id]').setValue(record.get('tahap2_id'));
				me.getFormdata().down('[name=tahap3_id]').setValue(record.get('tahap3_id'));
				me.getFormdata().down('[name=tahap4_id]').setValue(record.get('tahap4_id'));
				me.getFormdata().down('[name=tahap5_id]').setValue(record.get('tahap5_id'));
				me.getFormdata().down('[name=tahap6_id]').setValue(record.get('tahap6_id'));
				me.getFormdata().down('[name=tahap7_id]').setValue(record.get('tahap7_id'));
				me.getFormdata().down('[name=tahap8_id]').setValue(record.get('tahap8_id'));
				me.getFormdata().down('[name=tahap1_persen]').setValue(record.get('tahap1_persen'));
				me.getFormdata().down('[name=tahap2_persen]').setValue(record.get('tahap2_persen'));
				me.getFormdata().down('[name=tahap3_persen]').setValue(record.get('tahap3_persen'));
				me.getFormdata().down('[name=tahap4_persen]').setValue(record.get('tahap4_persen'));
				me.getFormdata().down('[name=tahap5_persen]').setValue(record.get('tahap5_persen'));
				me.getFormdata().down('[name=tahap6_persen]').setValue(record.get('tahap6_persen'));
				me.getFormdata().down('[name=tahap7_persen]').setValue(record.get('tahap7_persen'));
				me.getFormdata().down('[name=tahap8_persen]').setValue(record.get('tahap8_persen'));
			});
		} else {
			me.getFormdata().down('[name=tahap1_id]').setValue(0);
			me.getFormdata().down('[name=tahap2_id]').setValue(0);
			me.getFormdata().down('[name=tahap3_id]').setValue(0);
			me.getFormdata().down('[name=tahap4_id]').setValue(0);
			me.getFormdata().down('[name=tahap5_id]').setValue(0);
			me.getFormdata().down('[name=tahap6_id]').setValue(0);
			me.getFormdata().down('[name=tahap7_id]').setValue(0);
			me.getFormdata().down('[name=tahap8_id]').setValue(0);
			me.getFormdata().down('[name=tahap1_persen]').setValue('');
			me.getFormdata().down('[name=tahap2_persen]').setValue('');
			me.getFormdata().down('[name=tahap3_persen]').setValue('');
			me.getFormdata().down('[name=tahap4_persen]').setValue('');
			me.getFormdata().down('[name=tahap5_persen]').setValue('');
			me.getFormdata().down('[name=tahap6_persen]').setValue('');
			me.getFormdata().down('[name=tahap7_persen]').setValue('');
			me.getFormdata().down('[name=tahap8_persen]').setValue('');
		}
	},

	klikSave: function () {
		var me = this;

		var tahap1_id = me.getFormdata().down('[name=tahap1_id]').getValue();
		var tahap2_id = me.getFormdata().down('[name=tahap2_id]').getValue();
		var tahap3_id = me.getFormdata().down('[name=tahap3_id]').getValue();
		var tahap4_id = me.getFormdata().down('[name=tahap4_id]').getValue();
		var tahap5_id = me.getFormdata().down('[name=tahap5_id]').getValue();
		var tahap6_id = me.getFormdata().down('[name=tahap6_id]').getValue();
		var tahap7_id = me.getFormdata().down('[name=tahap7_id]').getValue();
		var tahap8_id = me.getFormdata().down('[name=tahap8_id]').getValue();

		var tahap1_persen = me.getFormdata().down('[name=tahap1_persen]').getValue();
		var tahap2_persen = me.getFormdata().down('[name=tahap2_persen]').getValue();
		var tahap3_persen = me.getFormdata().down('[name=tahap3_persen]').getValue();
		var tahap4_persen = me.getFormdata().down('[name=tahap4_persen]').getValue();
		var tahap5_persen = me.getFormdata().down('[name=tahap5_persen]').getValue();
		var tahap6_persen = me.getFormdata().down('[name=tahap6_persen]').getValue();
		var tahap7_persen = me.getFormdata().down('[name=tahap7_persen]').getValue();
		var tahap8_persen = me.getFormdata().down('[name=tahap8_persen]').getValue();

		var tahapPlafon = [
			me.getFormdata().down('[name=tahap1_id]').getValue(),
			me.getFormdata().down('[name=tahap2_id]').getValue(),
			me.getFormdata().down('[name=tahap3_id]').getValue(),
			me.getFormdata().down('[name=tahap4_id]').getValue(),
			me.getFormdata().down('[name=tahap5_id]').getValue(),
			me.getFormdata().down('[name=tahap6_id]').getValue(),
			me.getFormdata().down('[name=tahap7_id]').getValue(),
			me.getFormdata().down('[name=tahap8_id]').getValue()
		];

		var tahapProgress = [
			me.getFormdata().down('[name=tahap1_persen]').getValue(),
			me.getFormdata().down('[name=tahap2_persen]').getValue(),
			me.getFormdata().down('[name=tahap3_persen]').getValue(),
			me.getFormdata().down('[name=tahap4_persen]').getValue(),
			me.getFormdata().down('[name=tahap5_persen]').getValue(),
			me.getFormdata().down('[name=tahap6_persen]').getValue(),
			me.getFormdata().down('[name=tahap7_persen]').getValue(),
			me.getFormdata().down('[name=tahap8_persen]').getValue()
		];

		if (!me.getFormdata().down('[name=bank_id]').getValue()) {
			Ext.Msg.alert('Info', 'Bank Harus Dipilih');
			return;
		} else if (!tahap1_id && !tahap2_id && !tahap3_id && !tahap4_id && !tahap5_id && !tahap6_id && !tahap7_id && !tahap8_id) {
			Ext.Msg.alert('Info', 'Pilih Plafon Minimal 1');
			return;
		} else {
			if (tahapPlafon) {
				if (me.duplicateArrayValues(tahapPlafon)) {
					Ext.Msg.alert('Info', 'Tidak Bisa Pilih Plafon Yang Sama');
					return;
				} else {
					if (tahapProgress) {
						var total = 0;
						for (var i = 0; i < tahapProgress.length; i++) {
							if (tahapProgress[i]) {
								total += parseFloat(tahapProgress[i]);
							}
						}
						if (total > 100 || total < 100) {
							Ext.Msg.alert('Info', 'Total Progress Harus 100%');
							return;
						} else {
							var bankkpr_id = me.getFormdata().down('[name=bankkpr_id]').getValue();
							var bank_id = me.getFormdata().down('[name=bank_id]').getValue();

							if (!bankkpr_id) {
								var bankkprStore = me.getMasterbankkprbybankStore();
								bankkprStore.load({
									params: {bankkpr_id: 0, bank_id: bank_id, start: 0, limit: 0},
									callback: function (rec) {
										var countBankkpr = bankkprStore.getCount();
										if (countBankkpr > 0) {
											Ext.Msg.alert('Info', 'Bank Yang Anda Pilih Sudah Terdaftar');
											return;
										} else {
											me.dataSave();
										}
									}
								});
							} else {
								me.dataSave();
							}
						}
					}
				}
			}
		}
	},

	duplicateArrayValues: function (A){
		var i, j, n;
		n = A.length;

		for (i = 0; i < n; i++) {
			for (j = i + 1; j < n; j++) {
				if (A[i] || A[j]) {
					if (A[i] == A[j]) {
						return true;
					}
				}
			}
		}
		return false;
	}

});