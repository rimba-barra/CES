Ext.define('Erems.view.buktipemilik.HgbajbFormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.buktipemilikhgbajbformdata',
	requires: ['Erems.library.template.view.DateField'],
	frame: true,
	autoScroll: true,
	anchorSize: 100,
	height: 500,
	bodyBorder: true,
	bodyPadding: 10,
	bodyStyle: 'padding:5px 5px 0',
	defaults: {
		border: false,
		xtype: 'panel',
		flex: 1,
		layout: ''
	},
	initComponent: function () {
		var me = this;

		function dateOneYear() {
			var x = 12;
			var CurrentDate = new Date();
			CurrentDate.setMonth(CurrentDate.getMonth() + x);
			return CurrentDate;
		}

		Ext.applyIf(me, {
			items: [
				{
					xtype: 'hiddenfield',
					itemId: 'hgbajb_buktipemilik_id',
					name: 'hgbajb_buktipemilik_id'
				},
				{
					xtype: 'hiddenfield',
					itemId: 'hgbajb_id',
					name: 'hgbajb_id'
				},
				{
					xtype: 'hiddenfield',
					itemId: 'hgbinduk_id',
					name: 'hgbinduk_id'
				},
				{
					xtype: 'hiddenfield',
					itemId: 'is_hgbajb_detail',
					name: 'is_hgbajb_detail',
					value: 'yes'
				},
				{
					xtype: 'hiddenfield',
					itemId: 'temp_buktipemilik_id',
					name: 'temp_buktipemilik_id'
				},
				{
					xtype: 'hiddenfield',
					itemId: 'hgbajb_unit_id',
					name: 'hgbajb_unit_id'
				},
				{
					xtype: 'tabpanel',
					items: [
						{
							title: 'HGB / AJB',
							itemId: 'tab_hgbajb_information',
							items: [
								{
									xtype: 'panel',
									bodyPadding: 10,
									title: 'HGB INFORMATION',
									collapsible: true,
									items: [
										{
											layout: 'hbox',
											padding: '10px 0 0 0',
											bodyStyle: 'border:0px',
											width: '100%',
											items: [
												{
													xtype: 'panel',
													flex: 8,
													layout: {
														type: 'vbox',
														defaultMargins: {top: 0, right: 0, bottom: 10, left: 0}
													},
													bodyStyle: 'border:0px',
													items: [
														{
															layout: 'hbox',
															bodyStyle: 'border:0px',
															width: '100%',
															items: [
																{
																	xtype: 'combobox',
																	fieldLabel: 'HGB Induk Code',
																	anchor: '-5',
																	name: 'hgbinduk_code',
																	flex: 6,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
																	listeners: {
																		beforequery: function (record) {
																			record.query = new RegExp(record.query, 'i');
																			record.forceAll = true;
																		}
																	}
																},
																{
																	xtype: 'splitter', width: 5,
																},
																{
																	xtype: 'button',
																	text: 'Select HGB',
																	itemId: 'fd_browse_unit_btn',
																	padding: '2px 5px',
																	action: 'browse_hgbinduk',
																	iconCls: 'icon-search',
																	style: 'background-color:#FFC000;'
																},
																{xtype: 'label', text: '', flex: 2}
															]
														},
														{
															layout: 'hbox',
															bodyStyle: 'border:0px',
															width: '100%',
															items: [
																{
																	xtype: 'textfield',
																	fieldLabel: 'HGB Induk No.',
																	anchor: '-5',
																	name: 'hgbinduk_hgbinduk',
																	flex: 1,
																	maskRe: /[0-9\.\/\-]/,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																}
															]
														},
														{
															layout: 'hbox',
															bodyStyle: 'border:0px',
															width: '100%',
															items: [
																{
																	xtype: 'textfield',
																	fieldLabel: 'GS / SU Number',
																	anchor: '-5',
																	name: 'hgbinduk_gs',
																	flex: 1,
																	maskRe: /[0-9\.\/\-]/,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																}
															]
														},
														{
															layout: 'hbox',
															bodyStyle: 'border:0px',
															width: '100%',
															items: [
																{
																	xtype: 'textfield',
																	fieldLabel: 'Location',
																	anchor: '-5',
																	name: 'hgbinduk_desa',
																	flex: 1,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																}
															]
														}
													]
												},
												{xtype: 'splitter', width: 30},
												{
													xtype: 'panel',
													flex: 7,
													layout: {
														type: 'vbox',
														defaultMargins: {top: 0, right: 0, bottom: 10, left: 0}
													},
													bodyStyle: 'border:0px',
													items: [
														{
															layout: 'hbox',
															bodyStyle: 'border:0px',
															width: '100%',
															items: [
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'HGB Induk Date',
																	anchor: '-5',
																	name: 'hgbinduk_date',
																	flex: 1,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																}
															]
														},
														{
															layout: 'hbox',
															bodyStyle: 'border:0px',
															width: '100%',
															items: [
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'GS / SU Date',
																	anchor: '-5',
																	name: 'hgbinduk_gs_date',
																	flex: 1,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																}
															]
														},
														{
															layout: 'hbox',
															bodyStyle: 'border:0px',
															width: '100%',
															items: [
																{
																	xtype: 'textfield',
																	fieldLabel: 'Luas',
																	anchor: '-5',
																	name: 'hgbinduk_luas',
																	flex: 12,
																	maskRe: /[0-9\.\/\-]/,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																},
																{xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'}
															]
														}
													]
												}
											]
										}
									]
								},
								/* HGB ATAS NAMA CUSTOMER */
								{
									xtype: 'panel',
									bodyPadding: 10,
									title: 'HGB ATAS NAMA CUSTOMER',
									collapsible: true,
									width: '100%',
									items: [
										{
											xtype: 'panel',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [
												{
													xtype: 'panel',
													width: '100%',
													flex: 3,
													bodyStyle: 'border:0px',
													items: [
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'textfield',
																	fieldLabel: 'No. Registrasi Balik Nama / No Splitz', //HGB Number
																	anchor: '-5',
																	name: 'hgb_number',
																	flex: 1,
																	maskRe: /[A-Za-z0-9\s\.\/\-]/,
																	enforceMaxLength: true,
																	maxLength: 30
																},
																{
																	xtype: 'splitter', width: 20,
																},
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'Tgl. Registrasi Balik Nama', //HGB Date
																	anchor: '-5',
																	name: 'hgb_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																}
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'textfield',
																	fieldLabel: 'No. GS / SU',
																	anchor: '-5',
																	name: 'hgb_gsgu_no',
																	flex: 1,
																	maskRe: /[A-Za-z0-9\s\.\/\-]/,
																	enforceMaxLength: true,
																	maxLength: 30
																},
																{
																	xtype: 'splitter', width: 20,
																},
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'GS / SU Date',
																	anchor: '-5',
																	name: 'hgb_gsgu_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																}
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'textfield',
																	fieldLabel: 'Wide Area',
																	anchor: '-5',
																	name: 'hgb_gsgu_luas',
																	maskRe: /[0-9\.\/\-]/,
																},
																{xtype: 'splitter', width: 5},
																{xtype: 'label', text: 'm2'},
																{xtype: 'splitter', width: 100},
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'HGB Land Date',
																	anchor: '-5',
																	name: 'hgb_gsgu_land_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																}]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'Send to Construction',
																	anchor: '-5',
																	name: 'hgb_tocontractor_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																},
																{
																	xtype: 'splitter', width: 20,
																},
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'Send to Customer/Notaris', //Send to Customer
																	anchor: '-5',
																	name: 'hgb_tocustomer_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																}
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'Tgl. ST SHGB Perijinan - Legal',
																	anchor: '-5',
																	name: 'hgb_perijinan_tolegal_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																},
																{
																	xtype: 'splitter', width: 20,
																},
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'Tgl. ST SHGB Legal - Perijinan',
																	anchor: '-5',
																	name: 'hgb_legal_toperijinan_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																}
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'Tgl. ST SHM Perijinan - Legal',
																	anchor: '-5',
																	name: 'hgb_shm_perijinan_tolegal_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																},
																{
																	xtype: 'splitter', width: 20,
																},
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'Tgl. ST HGB/HM Notaris Ke Bank',
																	anchor: '-5',
																	name: 'hgb_notaris_tobank_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																}]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'Tgl. Target HGB',
																	anchor: '-5',
																	name: 'hgb_target_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																},
																{
																	xtype: 'splitter', width: 20,
																},
																{
																	xtype: 'textfield',
																	fieldLabel: 'HM Number',
																	anchor: '-5',
																	name: 'hgb_hm_no',
																	flex: 1,
																	maskRe: /[A-Za-z0-9\s\.\/\-]/,
																	enforceMaxLength: true,
																	maxLength: 30
																}
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'Tgl. Kirim HM ke Bank/Cust/Notaris',
																	anchor: '-5',
																	name: 'hgb_hm_tocustomer_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																},
																{
																	xtype: 'splitter', width: 20,
																},
																{
																	xtype: 'textfield',
																	fieldLabel: 'NOP',
																	anchor: '-5',
																	name: 'hgb_nop',
																	flex: 1,
																	maskRe: /[A-Za-z0-9\s\.\/\-]/,
																	enforceMaxLength: true,
																	maxLength: 30,
																}
															]
														}
													]
												},
											]
										}
									]
								},
								/* AJB INFORMATION */
								{
									xtype: 'panel',
									bodyPadding: 10,
									title: 'AJB INFORMATION',
									collapsible: true,
									width: '100%',
									items: [
										{
											xtype: 'panel',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [
												{
													xtype: 'panel',
													width: '100%',
													flex: 3,
													bodyStyle: 'border:0px',
													items: [
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'textfield',
																	fieldLabel: 'AJB/IJB Number',
																	anchor: '-5',
																	name: 'ajb_number',
																	flex: 1,
																	maskRe: /[A-Za-z0-9\s\.\/\-]/,
																	enforceMaxLength: true,
																	maxLength: 30,
																},
																{
																	xtype: 'splitter', width: 20,
																},
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'AJB/IJB Date',
																	anchor: '-5',
																	name: 'ajb_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																}
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'textfield',
																	fieldLabel: 'AJB/IJB Name',
																	anchor: '-5',
																	name: 'ajb_name',
																	flex: 1,
																	maskRe: /[A-Za-z0-9\s\.\/\-]/,
																	enforceMaxLength: true,
																	maxLength: 30,
																},
																{
																	xtype: 'splitter', width: 20,
																},
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'AJB/IJB Sign Date',
																	anchor: '-5',
																	name: 'ajb_sign_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																}
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'notariscombobox',
																	store: '',
																	fieldLabel: 'Notaris / PPAT',
																	anchor: '-5',
																	itemId: 'fd_hgbajb_notaris_id',
																	name: 'notaris_id',
																	flex: 1,
																	listeners: {
																		beforequery: function (record) {
																			record.query = new RegExp(record.query, 'i');
																			record.forceAll = true;
																		}
																	}
																},
																{
																	xtype: 'splitter', width: 20,
																},
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'Notaris Payment Date',
																	anchor: '-5',
																	name: 'ajb_notaris_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																}
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'checkboxfield',
																	fieldLabel: 'Lunas Notaris',
																	itemId: 'lunas_notaris',
																	name: 'lunas_notaris',
																	inputValue: '1',
																	uncheckedValue: '0',
																}
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'checkboxfield',
																	fieldLabel: 'Status Balik Nama',
																	itemId: 'ajb_is_status_balik_nama',
																	name: 'ajb_is_status_balik_nama',
																	inputValue: '1',
																	uncheckedValue: '0',
																},
																{
																	xtype: 'splitter', width: 20,
																},
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'Tgl. Balik Nama',
																	anchor: '-5',
																	name: 'ajb_balik_nama_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																}
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'S.K.M.H.T Date',
																	anchor: '-5',
																	name: 'ajb_skmht_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																},
																{
																	xtype: 'splitter', width: 20,
																},
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'A.P.H.T Date',
																	anchor: '-5',
																	name: 'ajb_apht_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																}
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'Send to Construction',
																	anchor: '-5',
																	name: 'ajb_tocontractor_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																},
																{
																	xtype: 'splitter', width: 20,
																},
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'Tgl. Kirim AJB/IJB ke Customer/Bank',
																	anchor: '-5',
																	name: 'ajb_tocustomer_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																}
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'Tgl. Serah Terima AJB/IJB Legal - Notaris',
																	labelWidth: 230,
																	anchor: '-5',
																	name: 'ajb_legal_tonotaris_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																}
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'Tgl. Terima AJB/IJB Notaris - Legal',
																	labelWidth: 230,
																	anchor: '-5',
																	name: 'ajb_notaris_tolegal_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																}
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'Tgl. ST AJB/IJB Legal - Perijinan',
																	labelWidth: 230,
																	anchor: '-5',
																	name: 'ajb_legal_toperijinan_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																}
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'Tgl. Kelengkapan Berkas AJB/IJB',
																	labelWidth: 230,
																	anchor: '-5',
																	name: 'kelengkapan_berkas_ajb_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																}
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'Tgl. Validasi PPh Selesai',
																	labelWidth: 230,
																	anchor: '-5',
																	name: 'ajb_validasipphselesai_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																}
															]
														},
														{
															xtype: 'fieldset',
															bodyPadding: 10,
															width: '100%',
															title: 'Additional Info SH-1',
															items: [
																{
																	padding: '5px 0 0 0',
																	layout: 'hbox',
																	bodyStyle: 'border:0px',
																	items: [
																		{
																			xtype: 'textfield',
																			fieldLabel: 'No Akta',
																			name: 'akta_no_sh1',
																			flex: 1,
																			maskRe: /[A-Za-z0-9\s\.\/\-]/,
																			enforceMaxLength: true,
																			maxLength: 30
																		}
																	]
																},
																{
																	padding: '5px 0 0 0',
																	layout: 'hbox',
																	bodyStyle: 'border:0px',
																	items: [
																		{
																			xtype: 'xdatefield',
																			fieldLabel: 'Tanggal Akta',
																			name: 'akta_date_sh1',
																			flex: 1,
																			listeners: {
																				blur: function (field) {
																					var today = new Date();
																					if (!field.isValid()) {
																						Ext.Msg.alert('Info', 'Date is invalid!');
																						field.setValue(today);
																					}
																				}
																			}
																		}
																	]
																},
																{
																	padding: '5px 0 0 0',
																	layout: 'hbox',
																	bodyStyle: 'border:0px',
																	items: [
																		{
																			xtype: 'notariscombobox',
																			store: '',
																			fieldLabel: 'Notaris',
																			anchor: '-5',
																			itemId: 'fd_hgbajb_notaris_id',
																			name: 'notaris_id_sh1',
																			flex: 1,
																			listeners: {
																				beforequery: function (record) {
																					record.query = new RegExp(record.query, 'i');
																					record.forceAll = true;
																				}
																			}
																		}
																	]
																}
															]
														}
													]
												},
											]
										}
									]
								},
								/* HPL INFORMATION */
								{
									xtype: 'panel',
									bodyPadding: 10,
									title: 'HPL INFORMATION',
									collapsible: true,
									width: '100%',
									items: [
										{
											xtype: 'panel',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [
												{
													xtype: 'panel',
													width: '100%',
													flex: 3,
													bodyStyle: 'border:0px',
													items: [
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'textfield',
																	fieldLabel: 'No. GS/NIB',
																	anchor: '-5',
																	name: 'hpl_no_gs',
																	flex: 1,
																	maskRe: /[A-Za-z0-9\s\.\/\-]/,
																	enforceMaxLength: true,
																	maxLength: 30,
																},
																{
																	xtype: 'splitter', width: 20,
																},
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'Tgl. Terbit HPL',
																	anchor: '-5',
																	name: 'hpl_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																}
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'textfield',
																	fieldLabel: 'Luas HPL',
																	anchor: '-5',
																	name: 'hpl_luas',
																	flex: 1,
																	maskRe: /[A-Za-z0-9\s\.\/\-]/,
																	enforceMaxLength: true,
																	maxLength: 30,
																},
																{
																	xtype: 'splitter', width: 20,
																},
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'Tgl Terima HPL',
																	anchor: '-5',
																	name: 'hpl_terima_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																}
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype            : 'textfield',
																	fieldLabel       : 'No SKPT HPL',
																	anchor           : '-5',
																	name             : 'hpl_skpt_no',
																	flex             : 1,
																	maskRe           : /[A-Za-z0-9\s\.\/\-]/,
																	enforceMaxLength : true,
																	maxLength        : 30,
																},
																{
																	xtype: 'splitter', width: 20,
																}, {
																	xtype      : 'xdatefield',
																	fieldLabel : 'Tgl. Keluar HPL',
																	anchor     : '-5',
																	name       : 'hpl_keluar_date',
																	flex       : 1,
																	listeners  : {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																}
															]
														},
														{
															padding   : '10px 0 0 0',
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															items     : [
																{
																	xtype      : 'xgeneralfieldEST',
																	fieldLabel : 'Kelurahan HPL',
																	anchor     : '-5',
																	name       : 'hpl_kelurahan',
																	flex       : 1,
																	maxLength  : 30
																},
																{
																	xtype: 'splitter', width: 20,
																},
																{
																	xtype      : 'xdatefield',
																	fieldLabel : 'Tgl. Akhir HPL',
																	anchor     : '-5',
																	name       : 'hpl_akhir_date',
																	flex       : 1,
																	listeners  : {
																		blur : function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																}
															]
														},
													]
												}
											]
										}
									]
								},
								/* HGB ATAS NAMA PT */
								{
									xtype: 'panel',
									bodyPadding: 10,
									title: 'HGB ATAS NAMA PT',
									collapsible: true,
									width: '100%',
									items: [
										{
											xtype: 'panel',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [
												{
													xtype: 'panel',
													width: '100%',
													flex: 3,
													bodyStyle: 'border:0px',
													items: [
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'projectptcombobox',
																	store: '',
																	fieldLabel: 'PT Name',
																	anchor: '-5',
																	itemId: 'fd_hgbajb_pt_id',
																	name: 'pt_id',
																	flex: 1,
																	listeners: {
																		beforequery: function (record) {
																			record.query = new RegExp(record.query, 'i');
																			record.forceAll = true;
																		}
																	}
																}
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'textfield',
																	fieldLabel: 'PT HGB Number',
																	anchor: '-5',
																	name: 'pt_hgb_no',
																	flex: 1,
																	maskRe: /[A-Za-z0-9\s\.\/\-]/,
																	enforceMaxLength: true,
																	maxLength: 30,
																},
																{
																	xtype: 'splitter', width: 20,
																},
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'PT HGB Date',
																	anchor: '-5',
																	name: 'pt_hgb_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																}
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'textfield',
																	fieldLabel: 'GS / SU Number',
																	anchor: '-5',
																	name: 'pt_gsgu_no',
																	flex: 1,
																	maskRe: /[A-Za-z0-9\s\.\/\-]/,
																	enforceMaxLength: true,
																	maxLength: 30,
																},
																{
																	xtype: 'splitter', width: 20,
																},
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'GS / SU Date',
																	anchor: '-5',
																	name: 'pt_gsgu_date',
																	flex: 1,
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																}
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'textfield',
																	fieldLabel: 'Wide Area',
																	anchor: '-5',
																	name: 'pt_luas',
																	maskRe: /[0-9\.]/,
																},
																{xtype: 'splitter', width: 5},
																{xtype: 'label', text: 'm2'}
															]
														},
														/* Add by RH 06/06/2020 */
														{
															xtype: 'splitter', height: 10,
														},
														{
															xtype: 'textfield',
															fieldLabel: 'NIB',
															anchor: '-5',
															name: 'pt_hgb_nib',
															maskRe: /[A-Za-z0-9\s\.\/\-]/,
															enforceMaxLength: true,
															maxLength: 30
														},
														/* END Add by RH 06/06/2020 */
														{
															xtype: 'splitter', height: 20,
														},
														{
															xtype      : 'xnotefieldEST',
															anchor     : '100%',
															fieldLabel : 'Note',
															labelAlign : 'top',
															name       : 'note',
															width      : '100%',
														},
														{
															xtype: 'fieldset',
															bodyPadding: 10,
															width: '100%',
															title: 'Additional Info Surabaya',
															items: [
																{
																	padding: '5px 0 0 0',
																	layout: 'hbox',
																	bodyStyle: 'border:0px',
																	items: [
																		{
																			xtype: 'xdatefield',
																			fieldLabel: 'Tanggal Terbit',
																			name: 'tgl_terbit_pt',
																			flex: 1,
																			hidden: true,
																			listeners: {
																				blur: function (field) {
																					var today = new Date();
																					if (!field.isValid()) {
																						Ext.Msg.alert('Info', 'Date is invalid!');
																						field.setValue(today);
																					}
																				}
																			}
																		}
																	]
																},
																{
																	padding: '5px 0 0 0',
																	layout: 'hbox',
																	bodyStyle: 'border:0px',
																	items: [
																		{
																			xtype: 'xdatefield',
																			fieldLabel: 'Tanggal Berakhir',
																			name: 'tgl_berakhir_pt',
																			flex: 1,
																			listeners: {
																				blur: function (field) {
																					var today = new Date();
																					if (!field.isValid()) {
																						Ext.Msg.alert('Info', 'Date is invalid!');
																						field.setValue(today);
																					}
																				}
																			}
																		}
																	]
																},
																{
																	padding: '5px 0 0 0',
																	layout: 'hbox',
																	bodyStyle: 'border:0px',
																	items: [
																		{
																			xtype: 'xdatefield',
																			fieldLabel: 'Tanggal Terima',
																			name: 'tgl_terima_pt',
																			flex: 1,
																			listeners: {
																				blur: function (field) {
																					var today = new Date();
																					if (!field.isValid()) {
																						Ext.Msg.alert('Info', 'Date is invalid!');
																						field.setValue(today);
																					}
																				}
																			}
																		}
																	]
																},
																{
																	padding: '5px 0 0 0',
																	layout: 'hbox',
																	bodyStyle: 'border:0px',
																	items: [
																		{
																			xtype: 'xdatefield',
																			fieldLabel: 'Tanggal Keluar',
																			name: 'tgl_keluar_pt',
																			flex: 1,
																			listeners: {
																				blur: function (field) {
																					var today = new Date();
																					if (!field.isValid()) {
																						Ext.Msg.alert('Info', 'Date is invalid!');
																						field.setValue(today);
																					}
																				}
																			}
																		}
																	]
																},
																{
																	padding   : '5px 0 0 0',
																	layout    : 'hbox',
																	bodyStyle : 'border:0px',
																	items     : [
																		{
																			xtype      : 'xgeneralfieldEST',
																			fieldLabel : 'Posisi',
																			name       : 'posisi_pt',
																			flex       : 1,
																			maxLength  : 30
																		}
																	]
																},
																{
																	padding   : '5px 0 0 0',
																	layout    : 'hbox',
																	bodyStyle : 'border:0px',
																	items     : [
																		{
																			xtype      : 'xgeneralfieldEST',
																			fieldLabel : 'Kelurahan',
																			name       : 'kelurahan_pt',
																			flex       : 1,
																			maxLength  : 30
																		}
																	]
																}
															]
														}
													]
												},
											]
										}
									]
								}
							]
						},
						{
							title: 'Additional Information',
							itemId: 'tab_additional_information',
							tabConfig: {itemId: 'AdditionalInformationTabButton', hidden: true},
							items: [
								{
									xtype: 'panel',
									bodyPadding: 10,
									title: 'GIRIK INDUK',
									collapsible: true,
									width: '100%',
									items: [
										{
											layout: 'hbox',
											padding: '10px 0 0 0',
											bodyStyle: 'border:0px',
											width: '100%',
											items: [
												{
													xtype: 'panel',
													flex: 8,
													layout: {
														type: 'vbox',
														defaultMargins: {top: 0, right: 0, bottom: 10, left: 0}
													},
													bodyStyle: 'border:0px',
													items: [
														{
															layout: 'hbox',
															bodyStyle: 'border:0px',
															width: '100%',
															items: [
																{
																	xtype: 'girikcombobox',
																	fieldLabel: 'Kode Girik Induk',
																	anchor: '-5',
																	itemId: 'fd_hgbajb_girik_id',
																	name: 'girik_id',
																	flex: 1,
																	enforceMaxLength: true,
																	enableKeyEvents: true,
																	rowdata: null,
																	emptyText: 'Search Code..',
																	tpl: Ext.create('Ext.XTemplate',
																			'<table class="x-grid-table" width="800px" >',
																			'<tr class="x-grid-row">',
																			'<th width="50px"><div class="x-column-header x-column-header-inner">Kode</div></th>',
																			'<th width="50px"><div class="x-column-header x-column-header-inner">No. Girik</div></th>',
																			'<th width="50px"><div class="x-column-header x-column-header-inner">Tgl. Girik</div></th>',
																			'<th width="50px"><div class="x-column-header x-column-header-inner">Luas</div></th>',
																			'<th width="60px"><div class="x-column-header x-column-header-inner">Pemilik Girik</div></th>',
																			'</tr>',
																			'<tpl for=".">',
																			'<tr class="x-boundlist-item">',
																			'<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
																			'<td ><div class="x-grid-cell x-grid-cell-inner">{girik_no}</div></td>',
																			'<td ><div class="x-grid-cell x-grid-cell-inner">{tgl_girik_format}</div></td>',
																			'<td ><div class="x-grid-cell x-grid-cell-inner">{luas}</div></td>',
																			'<td ><div class="x-grid-cell x-grid-cell-inner">{pemilik}</div></td>',
																			'</tr>',
																			'</tpl>',
																			'</table>'
																			),
																	listeners: {
																		beforequery: function (record) {
																			record.query = new RegExp(record.query, 'i');
																			record.forceAll = true;
																		},
																		change: function (combo, newValue, oldValue) {
																			var store = this.getStore();
																			var value_index = store.find('girik_id', newValue);
																			var record = store.getAt(value_index);
																			if (record) {
																				me.down('[name=girik_girik_no]').setValue(record.get('girik_no'));
																				me.down('[name=girik_luas]').setValue(record.get('luas'));
																				me.down('[name=girik_alamat]').setValue(record.get('alamat'));
																				me.down('[name=girik_girik_date]').setValue(record.get('girik_date'));
																				me.down('[name=girik_kelurahan]').setValue(record.get('kelurahan'));
																				me.down('[name=girik_kecamatan]').setValue(record.get('kecamatan'));
																				me.down('[name=girik_kota]').setValue(record.get('kota'));
																				me.down('[name=girik_pemilik]').setValue(record.get('pemilik'));
																			}
																		}
																	}
																}
															]
														},
														{
															layout: 'hbox',
															bodyStyle: 'border:0px',
															width: '100%',
															items: [
																{
																	xtype: 'textfield',
																	fieldLabel: 'No. Girik',
																	anchor: '-5',
																	name: 'girik_girik_no',
																	flex: 1,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																}
															]
														},
														{
															layout: 'hbox',
															bodyStyle: 'border:0px',
															width: '100%',
															items: [
																{
																	xtype: 'textfield',
																	fieldLabel: 'Luas',
																	anchor: '-5',
																	name: 'girik_luas',
																	flex: 12,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																},
																{xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'}
															]
														},
														{
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															width     : '100%',
															items     : [
																{
																	xtype      : 'xaddressfieldEST',
																	fieldLabel : 'Location',
																	anchor     : '-5',
																	name       : 'girik_alamat',
																	flex       : 1,
																	readOnly   : true,
																	fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
																}
															]
														}
													]
												},
												{xtype: 'splitter', width: 30},
												{
													xtype: 'panel',
													flex: 7,
													layout: {
														type: 'vbox',
														defaultMargins: {top: 0, right: 0, bottom: 10, left: 0}
													},
													bodyStyle: 'border:0px',
													items: [
														{
															layout: 'hbox',
															bodyStyle: 'border:0px',
															width: '100%',
															items: [
																{
																	xtype: 'xdatefield',
																	fieldLabel: 'Girik Date',
																	anchor: '-5',
																	name: 'girik_girik_date',
																	flex: 1,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
																	listeners: {
																		blur: function (field) {
																			var today = new Date();
																			if (!field.isValid()) {
																				Ext.Msg.alert('Info', 'Date is invalid!');
																				field.setValue(today);
																			}
																		}
																	}
																}
															]
														},
														{
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															width     : '100%',
															items     : [
																{
																	xtype      : 'xgeneralfieldEST',
																	fieldLabel : 'Kelurahan',
																	anchor     : '-5',
																	name       : 'girik_kelurahan',
																	flex       : 1,
																	readOnly   : true,
																	fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
																}
															]
														},
														{
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															width     : '100%',
															items     : [
																{
																	xtype      : 'xgeneralfieldEST',
																	fieldLabel : 'Kecamatan',
																	anchor     : '-5',
																	name       : 'girik_kecamatan',
																	flex       : 1,
																	readOnly   : true,
																	fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
																}
															]
														},
														{
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															width     : '100%',
															items     : [
																{
																	xtype      : 'xgeneralfieldEST',
																	fieldLabel : 'Kota',
																	anchor     : '-5',
																	name       : 'girik_kota',
																	flex       : 1,
																	readOnly   : true,
																	fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
																}
															]
														},
														{
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															width     : '100%',
															items     : [
																{
																	xtype      : 'xnamefieldEST',
																	fieldLabel : 'Nama Pemilik',
																	anchor     : '-5',
																	name       : 'girik_pemilik',
																	flex       : 1,
																	readOnly   : true,
																	fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
																}
															]
														}
													]
												}
											]
										}
									]
								}
							]
						}
					]
				},
			],
			dockedItems: me.generateDockedItem()
		});

		me.callParent(arguments);
	},
	generateDockedItem: function () {
		var x = [
			{
				xtype: 'toolbar',
				dock: 'bottom',
				ui: 'footer',
				layout: {
					padding: 6,
					type: 'hbox'
				},
				items: [
					{
						xtype: 'button',
						action: 'save',
						itemId: 'btnSave',
						padding: 5,
						width: 75,
						iconCls: 'icon-save',
						text: 'Save'
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
					},
					{
						xtype: 'button',
						action: 'print',
						itemId: 'btnPrint',
						padding: 5,
						width: 75,
						disabled: true,
						iconCls: 'icon-print',
						text: 'Print'
					},
				]
			}
		];
		return x;
	},

});