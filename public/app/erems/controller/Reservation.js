Ext.define('Erems.controller.Reservation', {
	extend: 'Erems.library.template.controller.Controller2',
	alias: 'controller.Reservation',
	requires: ['Erems.library.Browse', 'Erems.library.box.Config',
		'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields',
		'Erems.library.box.tools.EventSelector',
		'Erems.library.ModuleTools'],
	views: ['reservation.Panel', 'reservation.Grid', 'reservation.FormSearch', 'reservation.FormData'],
	// stores: ['Reservation', 'Unit', 'Mastercustomer'],
	//   models: ['Reservation','Reservationdetail', 'Unit', 'Mastercustomer'],
	refs: [
		{
			ref: 'grid',
			selector: 'reservationgrid'
		},
		{
			ref: 'formsearch',
			selector: 'reservationformsearch'
		},
		{
			ref: 'formdata',
			selector: 'reservationformdata'
		},
		{
			ref: 'unitgrid',
			selector: 'reservationunitgrid'
		},
		{
			ref: 'panel',
			selector: 'reservationpanel'
		},
		{
			ref: 'gridcustomer',
			selector: 'reservationcustomergrid'
		},
		{
			ref: 'formprintout',
			selector: 'reservationformprintout'
		},
	],
	//  comboBoxIdEl: ['reasonchgname_cb'],
	controllerName: 'reservation',
	fieldName: 'reservation_id',
	bindPrefixName: 'Reservation',
	validationItems: [{name: 'purchaseletter_id', msg: 'You must select purchase letter first'},
		{name: 'reasonchgname_id', msg: 'Reason change name is empty'},
		{name: 'reservation_note', msg: 'Notes change name is empty'},
		{name: 'admistration_fee', msg: 'Admistration Fee is zero', f: 'number'}
	],
	//admistration_fee
	formWidth: 800,
	localStore: {
		detail: null,
		selectedUnit: null,
		customer: null
	},
	browseHandler: null,
	cbf: null,
	mt: null,
	selectedParameterSPPJB: null,
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
		var states;

		this.control({
			//  test: me.eventMonthField,
			'reservationpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'reservationgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'reservationgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'reservationgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'reservationgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'reservationgrid toolbar button[action=printmsword]': {
				click: function () {
					this.printMsWord();
				}
			},
			'reservationgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'reservationgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'reservationformsearch' : {
				afterrender : this.formSearchAfterRender
			},
			'reservationformsearch button[action=search]': {
				click: this.dataSearch
			},
			'reservationformsearch button[action=reset]': {
				click: this.dataReset
			},
			'reservationformdata': {
				afterrender: this.formDataAfterRender
			},
			'reservationformdata button[action=save]': {
				click: function () {
					me.mainDataSave();
				}
			},
			'reservationformdata datefield[name=reservation_date]': {
				blur: function () {
					me.reservationDateUntilSet();
				}
			},
			'reservationformdata textfield[name=reservation_days]': {
				keyup: function () {
					me.reservationDaysOnKeyUp();
				}
			},
			'reservationformdata button[action=approve]': {
				click: function () {
					me.mainDataSave(1); // 1 = approve
				}
			},
			'reservationformdata button[action=reject]': {
				click: function () {
					me.mainDataSave(2); // 2 = reject
				}
			},
			'reservationformdata button[action=release]': {
				click: function () {
					me.mainDataSave(3); // 3 = Release
				}
			},
			'reservationformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'reservationformdata [name=reasonchgname_id]': {
				select: function (el, val) {
					me.seFi.cb('reasonchgname_code', el, 'code', val);
				}
			},
			'reservationformdata [name=reasonchgname_code]': {
				keyup: function (el) {

					me.seFi.tf('reasonchgname_id', el, {name: 'code', tipe: 'string'}, 'reasonchgname_id');
				}
			},
			'reservationformdata button[action=browse_unit]': {
				click: this.browseStockUnit
			},
			'reservationformdata toolbar button[action=print]': {
				click: this.printElem
			},
			'reservationunitgrid button[action=select]': {
				click: this.unitSelect
			},
			//

		});
	},
	panelAfterRender: function (configs) {
		this.callParent(arguments);
		var me = this;
		me.getGrid().getSelectionModel().setSelectionMode('SINGLE');

		me.tools.ajax({
			params: {},
			success: function (data, schmodel) {
				me.templatePrint = data['others'][0][0]['TEMPLATEPRINTOUT'];
			}
		}).read('init');
	},
	// added by rico 14022023
	formSearchAfterRender: function (){
		var me = this;
		var f  = me.getFormsearch();

		me.tools.ajax({
			params: {},
			success: function (data, schmodel) {
				var cData = data['others'][0][0];
				me.fillComboBox(cData, f);
			}
		}).read('comboboxes');
	},
	unitSelect: function () {
		var me = this;
		var unitId = me.getUnitgrid().getSelectedRecord().get("unit_id");
		//check unit available not in booking state
		me.tools.ajax({
			params: {unitId: unitId},
			success: function (data) {
				if (data.length !== undefined) {
					if (me.browseHandler) {
						me.browseHandler.selectItem(function () {
							var f = me.getFormdata();
							var unitId = f.down("[name=unit_id]").getValue();
							//ADD DAYS DATE_UNTIL
							me.reservationDateUntilSet();
						});
					}
				} else {
					var dt = data['others'][0][0];
					var customer_name = dt['customer_name'];
					var reservation_date = dt['reservation_date'];
					var reservation_date_until = dt['reservation_date_until'];
					var msg = "Sudah di-<i>Boooking</i> !";
					msg = msg + "<br>Penginput  : ";
					msg = msg + "<br>Nama Customer : " + customer_name;
					msg = msg + "<br>Tanggal <i>Boooking</i> : " + reservation_date;
					msg = msg + "<br>Sampai dengan : " + reservation_date_until;
					me.tools.alert.warning(msg);
					throw 'Error';
				}

			}
		}
		).read('checkAvailableUnit');

	},
	unitLoadRecord: function () {
		var me = this;
		var f = me.getFormdata();
		var unitId = f.down("[name=unit_id]").getValue();
		me.tools.ajax({
			params: {unit_id: unitId},
			success: function (data, schmodel) {
				obj = data[0];
				me.tools.loadrecfield(obj, f);
			}
		}
		).read('selectedunit');
	},
	reservationDateUntilSet: function () {
		var me = this;
		//FILL RESERVATION DAYS
		me.tools.ajax({
			params: {},
			success: function (data, schmodel) {
				if (data.length !== undefined) {
					var f = me.getFormdata();
					f.down("button[action=save]").hide();
					alert("globalVar: RESERVATION_DAYS not found");
				} else {
					var val = data['others'][0][0]['value'];
					var f = me.getFormdata();
					f.down("[name=reservation_days]").setValue(val);
					var reservation_date = new Date(f.down("[name=reservation_date]").getValue());
					var reservation_date_until = me.tools.GetFormattedDate(me.tools.addDays(reservation_date, val));
					f.down("[name=reservation_date_until]").setValue(reservation_date_until);
				}
			}
		}
		).read('checkReservationDays');
	},
	browseStockUnit: function (el) {

		var me = this;
		var browse = new Erems.library.Browse();
		browse.init({
			controller: me,
			view: 'UnitGrid',
			el: el,
			localStore: "selectedUnit",
			mode_read: "selectedunit"
		});
		browse.showWindow();
	},
	mainDataSave: function (mode) {
		var me = this;
		var m = typeof mode !== "undefined" ? mode : "";
		me.insSave({
			form: me.getFormdata(),
			grid: me.getGrid(),
			store: me.localStore.detail,
			finalData: function (data) {
				var f = me.getFormdata();
				data["reservation_date"] = f.down("[name=reservation_date]").getValue();
				data["customer_name"] = f.down("[name=customer_name]").getValue();
				if (m !== "") {
					data["approvemode"] = m;
				}
				return data;
			},
			sync: true,
			callback: {
				create: function (store, form, grid) {

				}
			}
		});
	},
	fdar: function () {

		var me = this;
		var f = me.getFormdata();

		me.mt = new Erems.library.ModuleTools();
		//
		var x = {
			init: function () {
				me.setActiveForm(f);

				me.localStore.detail = me.instantStore({
					id: me.controllerName + 'RRDetailStore',
					extraParams: {
						mode_read: 'maindetail'
					},
					idProperty: 'reservation_id'
				});

				//combos
				me.tools.ajax({
					params: {},
					success: function (data, schmodel) {
						var cData = data['others'][0][0];
						me.fillComboBox(cData, f);
					}
				}).read('comboboxes');
			},
			create: function () {
				f.down("button[action=approve]").hide();
				f.down("button[action=release]").hide();
				f.down("button[action=reject]").hide();
				f.editedRow = -1;
				me.tools.ajax({
					params: {
						// purchaseletter_id: plId
					},
					success: function (data, model) {
						me.fillFormComponents(data, f);

						me.localStore.detail.load({
							params: {
								reservation_id: 0
							},
							callback: function (rec, op) {
								me.attachModel(op, me.localStore.detail, false);

							}
						});

					}
				}).read('detail');

			},
			update: function () {
				f.down("button[action=save]").hide();
				f.down("button[action=reject]").hide();
				f.down("button[action=release]").hide();
				f.down("button[action=approve]").hide();
				var cnId = me.getGrid().getSelectedRecord().get("reservation_id");
				var approve = me.getGrid().getSelectedRecord().get("is_approve");
				//f.down("#btnSave").setDisabled(true);
				f.editedRow = me.getGrid().getSelectedRow();
				me.tools.ajax({
					params: {
						// purchaseletter_id: plId
					},
					success: function (data, model) {
						me.fillFormComponents(data, f);

						me.localStore.detail.load({
							params: {
								reservation_id: cnId
							},
							callback: function (rec, op) {
								me.attachModel(op, me.localStore.detail, false);
								var oneRec = me.localStore.detail.getAt(0);
								f.loadRecord(oneRec);
								me.unitLoadRecord();
								var hari = me.tools.intval(f.down("[name=reservation_days]").getValue());
								var reservation_date = new Date(f.down("[name=reservation_date]").getValue());
								var reservation_date_until = me.tools.GetFormattedDate(me.tools.addDays(reservation_date, hari));
								f.down("[name=reservation_date_until]").setValue(reservation_date_until);

								/*
								 f.down("[name=pricetype_id]").setValue(rec.get("pricetype_id"));
								 f.down("[name=mediapromotion_id]").setValue(rec.get("mediapromotion_id"));
								 f.down("[name=booking_fee]").setValue(rec.get("booking_fee"));
								 */
							}
						});


						if (!approve) {
							f.down("button[action=print]").show();
							f.down("button[action=print]").setDisabled(true);
						} else {
							f.down("button[action=print]").show();
							f.down("button[action=print]").setDisabled(false);
						}
						/// check approval
						if (typeof data.others != 'undefined' && data['others'][0][0]["value"]) {
							if (!approve) {
								f.down("button[action=approve]").show();
								f.down("button[action=reject]").show();
							} else {
								f.down("button[action=release]").show();
								f.down("button[action=print]").show();
							}
						}
					}
				}).read('detail');
			}
		};
		return x;
	},
	fillFormComponents: function (data, f) {
		var me = this;
	},
	fillComboBox: function (data, f) {
		var me = this;
		var cbR = me.tools.comboboxRender;

		if(f.xtype == 'reservationformsearch'){ // added by rico 14022023
			cbR(data.salesman, f.down("[name=salesman_id]"), ['employee_id', 'employee_name']); // added by rico 14022023
		}else{
			cbR(data.salesman, f.down("[name=salesman_id]"), ['employee_id', 'employee_name']); // added by rico 14022023

			cbR(data.pricetype, f.down("[name=pricetype_id]"), ['pricetype_id', 'pricetype']);
			cbR(data.mediapromotion, f.down("[name=mediapromotion_id]"), ['mediapromotion_id', 'mediapromotion']);
		}
	},
	printElem: function (elem) {
		var me = this;
		var p = me.getFormdata();
		var cnId = me.getGrid().getSelectedRecord().get("reservation_id");
		p.setLoading(true);
		me.tools.ajax({
			params: {reservation_id: cnId},
			success: function (data, schmodel) {

				p.setLoading(false);
				var url = data['others'][0][0]['URL'];
				if (url) {
					window.open(url);
				}
				/*
				 var htmlcontent = data['others'][0][0]["HTML"];
				 me.tools.browserPrint(htmlcontent);  
				 */
			}
		}
		).read('print');
	},
	reservationDaysOnKeyUp: function () {
		var me = this;
		//var val = data['others'][0][0]['value']; 
		var f = me.getFormdata();
		// f.down("[name=reservation_days]").setValue(val);
		var hari = me.tools.intval(f.down("[name=reservation_days]").getValue());
		var reservation_date = new Date(f.down("[name=reservation_date]").getValue());
		var reservation_date_until = me.tools.GetFormattedDate(me.tools.addDays(reservation_date, hari));
		f.down("[name=reservation_date_until]").setValue(reservation_date_until);


		//  var me = this;
		/*   var f = me.getFormdata();
		 var hari = me.tools.intval(f.down("[name=reservation_days]").getValue());
		 if (hari <= 0) {
		 f.down("[name=reservation_date_until]").setValue(null);
		 return;
		 }
		 var date = f.down("[name=reservation_date]").getValue();
		 var d = me.tools.intval(date.getDate());
		 var m = me.tools.intval(date.getMonth());
		 var y = date.getFullYear();
		 m = (m + hari) + 1;
		 d = (d + hari);
		 
		 var newDate = d;
		 var newYear = Math.floor(m / 12);
		 var newMonth = m % 12;
		 
		 date.setFullYear(y + newYear);
		 date.setMonth(newMonth - 1);
		 date.setDate(newDate - 1);
		 */


		//  f.down("[name=reservation_date_until]").setValue(date);
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
								msg: failmsg + ' <br/>The data may have been used.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					});
				}
			});
		}
	}
});