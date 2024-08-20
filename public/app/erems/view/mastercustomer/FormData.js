Ext.define('Erems.view.mastercustomer.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.mastercustomerformdata',
	requires: [
		'Erems.library.template.component.Purposecombobox',
		'Erems.library.template.component.Purposebuycombobox',
		'Erems.library.template.component.Maritalstatuscombobox',
		'Erems.library.template.component.Nationalitycombobox',
		'Erems.library.template.component.Citycombobox',
		'Erems.library.template.view.combobox.Religion',
		'Erems.library.template.view.combobox.Education',
		'Erems.library.template.view.combobox.City',
		'Erems.library.template.view.combobox.Purpose',
		'Erems.library.template.view.combobox.Purposebuy',
		/* start added by ahmad riadi */
		'Erems.library.template.view.combobox.Provinsi',
		'Erems.library.template.view.combobox.Documenttype',
		'Erems.library.template.view.combobox.Bentukusaha',
		'Erems.library.template.view.combobox.Instrumentpembayaran',
		'Erems.library.template.component.Kewarganegaraancombobox',
		'Erems.library.template.component.Gendercombobox',
		/* end added by ahmad riadi */
		'Erems.library.template.view.combobox.NPWP_KLU',
		'Erems.library.template.view.combobox.NPWP_Klasifikasiusaha',
		'Erems.library.template.component.Npwpstatuscombobox',
	],
	frame: true,
	autoScroll: true,
	anchorSize: 100,
	bodyBorder: true,
	bodyPadding: 10,
	height: 600,
	editedRow: -1,
	bodyStyle: 'border-top:none;border-left:none;border-right:none;',
	initComponent: function () {
		var me = this;
		Ext.applyIf(me, {
			defaults: {
				labelAlign: 'top',
				labelSeparator: ' ',
				labelClsExtra: 'small',
				fieldStyle: 'margin-bottom:3px;',
				anchor: '100%'
			},
			items: [
				{
					xtype: 'panel',
					hidden: true,
					width: '100%',
					height: 250,
					itemId: 'ktp_panel',
					items: [
						{
							xtype: 'panel',
							bodyStyle: 'background-color:#FFFFFF;border:0px',
							layout: 'hbox',
							defaults: {
								xtype: 'textfield',
								flex: 1
							},
							items: [
								{
									xtype: 'panel',
									width: 300,
									height: 250,
									bodyStyle: 'background:none',
									itemId: 'photo_ktp',
									html: ''
								}
							]
						},
					]
				},
				{
					itemId: 'main_id',
					items: [
						{
							xtype: 'panel',
							bodyPadding: 10,
							title: 'GENERAL INFORMATION',
							collapsible: true,
							itemId: 'general_panel',
							items: [
								{
									xtype: 'container',
									layout: 'hbox',
									defaults: {
										xtype: 'container',
										layout: 'vbox'
									},
									items: [
										{
											flex: 3,
											defaults: {
												padding: '5px 0 0 0',
												width: '100%',
											},
											margin: '0 20px 0 0',
											items: [
												{
													xtype: 'hiddenfield',
													itemId: 'fd_ktp_text',
													name: 'file_ktp_name'
												},
												{
													xtype: 'form',
													itemId: 'formku3',
													bodyStyle: 'background:none;border:0',
													layout: 'hbox',
													width: '100%',
													items: [
														{
															xtype: 'filefield',
															itemId: 'fd_ktp',
															name: 'ktp_browse',
															fieldLabel: 'KTP',
															emptyText: 'Select an file',
															buttonText: 'Browse'
														}
													]
												},
												{
													xtype: 'container',
													layout: 'hbox',
													margin: '5px 0 5px 0',
													items: [
														{
															xtype: 'hiddenfield',
															itemId: 'fd_id',
															name: 'customer_id'
														},
														{
															xtype: 'textfield',
															width: '100%',
															fieldLabel: 'Code',
															name: 'code',
															readOnly: true,
															flex: 1,
															margin: '0 200px 0 0'
														},
														{
															xtype: 'checkboxfield',
															fieldLabel: '',
															name: 'is_temporary',
															inputValue: '1',
															uncheckedValue: '0',
															width: 20
														},
														{
															xtype: 'label',
															text: 'Temporary Name',
															width: 100
														}
													]
												},
												{
													xtype: 'xnamefieldEST',
													fieldLabel: 'Customer Name',
													name: 'name',
													itemId: 'fd_name',
													enableKeyEvents: true,
													allowBlank: false,
													regexText: 'Only alphanumeric characters allowed'
												},
												{
													xtype: 'gendercombobox',
													fieldLabel: 'Jenis Kelamin',
													name: 'gender',
													width: 240,
													editable: false
												},
												{
													xtype: 'xaddressfieldEST', ///edited by Erwin.S 21042021
													fieldLabel: 'Address (Correspondence)',
													name: 'address',
													allowBlank: false,
												},
												{
													xtype: 'xgeneralfieldEST',
													width: '100%',
													fieldLabel: 'Pekerjaan<br>(Sesuai KTP)',
													name: 'general_pekerjaan',
													margin: '0 100px 0 0',
													flex: 1,
													maxLength: 50,
													minLength: 3
												},
												{
													xtype: 'xgeneralfieldEST',
													width: '100%',
													fieldLabel: 'Pekerjaan<br>(Terbaru)',
													name: 'general_pekerjaan_baru',
													margin: '0 100px 0 0',
													flex: 1,
													maxLength: 50,
													minLength: 3
												},
												{
													xtype: 'xgeneralfieldEST',
													width: '100%',
													fieldLabel: 'Bidang Usaha Pekerjaan',
													name: 'general_bidang_pekerjaan_baru',
													margin: '0 100px 0 0',
													flex: 1,
												},
												{
													xtype: 'container',
													layout: 'hbox',
													items: [
														{
															xtype: 'checkbox',
															boxLabel: 'change KTP Address?',
															margin: '0px 100px 0px 0px',
															fieldLabel: ' ',
															name: 'is_change_ktpaddress'
														},
														{
															xtype: 'button',
															text: 'Multi Address',
															action: 'multi_address'
														}
													]
												},
												{
													xtype: 'form',
													itemId: 'formPhoto',
													bodyStyle: 'background:none;border:0',
													layout: 'hbox',
													width: '100%',
													items: [
														{
															xtype: 'hiddenfield',
															itemId: 'fd_photo_text',
															name: 'photo'
														},
														{
															xtype: 'filefield',
															fieldLabel: 'Photo',
															itemId: 'fd_photo',
															name: 'photo_browse',
														}
													]
												},
											]
										},
										{
											flex: 1,
											items: [
												{
													xtype: 'panel',
													width: 140,
													height: 170,
													bodyStyle: 'background:none',
													itemId: 'photo_image',
													html: ''
												}
											]
										},
									]
								},
								{
									xtype: 'container',
									layout: 'hbox',
									defaults: {
										xtype: 'container',
										layout: 'vbox',
										flex: 1
									},
									items: [
										{
											margin: '0 20px 0 0 0',
											defaults: {
												padding: '5px 0 0 0',
												width: '100%'
											},
											items: [

												{
													xtype: 'xgeneralfieldEST',
													fieldLabel: 'Gelar',
													name: 'general_gelar',
													allowBlank: true,
													minLength: 2,
													maxLength: 50
												},
												{
													xtype: 'cbprovinsi',
													name: 'general_province_id',
													bindPrefixName: "Mastercustomer",
													storeUrl: 'mastercustomer',
													allowBlank: false,
												},
												{
													xtype: 'xgeneralfieldEST',
													fieldLabel: 'Kecamatan',
													name: 'general_kecamatan',
													minLength: 2,
													maxLength: 50
												},
												{
													xtype: 'xnumericfieldEST',
													fieldLabel: 'RT',
													name: 'general_rt',
													maxLength: 3
												},
												{
													xtype: 'xnumericfieldEST',
													fieldLabel: 'Zipcode',
													name: 'zipcode',
													maxLength: 15
												},
											]
										},
										{
											defaults: {
												padding: '5px 0 0 0',
												width: '100%'
											},
											items: [
												{
													xtype: 'xnumericfieldEST',
													fieldLabel: 'No. Virtual Account',
													allowBlank: true,
													name: 'general_virtualaccount_no',
												},
												{
													xtype: 'cbcity',
													fieldLabel: 'City',
													allowBlank: false,
													name: 'city_city_id'
												},
												{
													xtype: 'xgeneralfieldEST',
													fieldLabel: 'Kelurahan',
													name: 'general_kelurahan',
													minLength: 2,
													maxLength: 50
												},
												{
													xtype: 'xnumericfieldEST',
													fieldLabel: 'RW',
													name: 'general_rw',
													maxLength: 3
												},
											]
										}
									]
								},
								/* start container 1 for general */
								{
									xtype: 'container',
									layout: 'hbox',
									defaults: {
										xtype: 'container',
										layout: 'vbox',
										flex: 1
									},
									items: [
										{
											margin: '0 20px 0 0',
											defaults: {
												padding: '5px 0 0 0',
												width: '100%'
											},
											items: [
												{
													xtype: 'xphonenumberfieldEST',
													fieldLabel: 'Home Phone',
													name: 'home_phone',
												},
												{
													xtype: 'xphonenumberfieldEST',
													fieldLabel: 'Office Phone',
													name: 'office_phone',
												},
												{
													xtype: 'xgeneralfieldEST',
													fieldLabel: 'Place of birth',
													name: 'birthplace',
													minLength: 3,
													maxLength: 50,
												},
												{
													xtype: 'maritalstatuscombobox',
													fieldLabel: 'Marital Status<br>(Sesuai KTP)',
													name: 'marital_status',
													editable: false
												},
												{
													xtype: 'maritalstatuscombobox',
													fieldLabel: 'Marital Status<br>(Terbaru)',
													name: 'marital_status_baru',
													editable: false
												},
												{
													xtype: 'kewarganegaraancombobox',
													fieldLabel: 'Kewarganegaraan',
													name: 'general_kewarganegaraan',
													editable: false
												},
												{
													xtype: 'textfield',
													fieldLabel: 'Nationality',
													name: 'nationality',
													maskRe: /[A-Za-z0-9\s.]/,
													enforceMaxLength: true,
													minLength: 3,
													maxLength: 25
												},
												{
													/*note : wajib diisi jika status WNA */
													xtype: 'textfield',
													fieldLabel: 'WNA Code',
													allowBlank: true,
													name: 'general_kodewna',
													maskRe: /[A-Za-z0-9\s.]/,
													enforceMaxLength: true,
													maxLength: 15
												}
												,
												{
													xtype: 'cbpurpose',
													name: 'purpose_purpose_id',
													allowBlank: false,
													hidden: true,
													fieldLabel: 'Purpose'
												}
												,
												{
													xtype: 'cbpurposebuy',
													name: 'purposebuy_purposebuy_id',
													allowBlank: false,
													fieldLabel: 'Purpose Buy'
												}
											]
										},
										{
											defaults: {
												padding: '5px 0 0 0',
												width: '100%'
											},
											items: [
												{
													xtype: 'xphonenumberfieldEST',
													fieldLabel: 'Mobile Phone',
													name: 'mobile_phone',
													allowBlank: false,
												},
												{
													xtype: 'xphonenumberfieldEST',
													fieldLabel: 'FAX',
													name: 'fax',
												},
												{
													xtype: 'datefield',
													itemId: 'fd_birthdate',
													format: 'd-m-Y',
													submitFormat: 'Y-m-d H:i:s.u',
													allowBlank: false,
													fieldLabel: 'Birthdate',
													name: 'birthdate',
													editable: false,
													maxValue: new Date()
												},
												{
													xtype: 'container',
													layout: 'hbox',
													margin: '0 0 5px 0',
													items: [
														{
															xtype: 'xnumericfieldEST',
															width: '100%',
															fieldLabel: 'Children',
															name: 'children',
															flex: 1,
															margin: '0 20px 0 0',
															maxLength: 5
														},
														{
															xtype: 'label',
															text: 'person',
															width: 50
														}
													]
												},
												{
													xtype: 'cbreligion',
													fieldLabel: 'Religion',
													storeUrl: 'mastercustomer',
													name: 'religion_religion_id',
													bindPrefixName: "Mastercustomer"
												},
												{
													xtype: 'cbeducation',
													fieldLabel: 'Education',
													storeUrl: 'mastercustomer',
													anchor: '-5',
													name: 'education_education_id',
													bindPrefixName: "Mastercustomer",
												},
												{
													xtype: 'xnumericfieldEST',
													fieldLabel: 'No. Kartu Keluarga',
													allowBlank: true,
													name: 'KK_number',
													minLength: 2,
													maxLength: 50
												}
											]
										}
									]
								},
								/* end container 1 for general */
								/* start container 2 for general */
								{
									xtype: 'container',
									layout: 'vbox',
									defaults: {
										padding: '5px 0 0 0',
										width: '100%'
									},
									items: [
										{
											xtype: 'textfield',
											fieldLabel: 'Email',
											allowBlank: false,
											name: 'email',
											vtype: 'email',
											listeners: {
												'blur': function (thisField) {
													if (!thisField.isValid()) {
														this.setValue("");
													}
												}
											}
										}
									]
								},
							]
						},
						/* end tab fot general */

						/* start panel identitas */
						{
							xtype: 'panel',
							bodyPadding: 10,
							title: 'IDENTITY DOCUMENT INFORMATION',
							collapsible: true,
							width: '100%',
							items: [
								{
									xtype: 'container',
									layout: 'vbox',
									defaults: {
										xtype: 'textfield',
										padding: '5px 0 0 0',
										width: '100%'
									},
									items: [
										{
											xtype: 'fieldcontainer',
											layout: 'hbox',
											align: 'right',
											bodyBorder: false,
											defaults: {layout: 'fit'},
											items: [
												{
													xtype: 'cbdocumenttype',
													name: 'identitas_documenttype_id',
													bindPrefixName: "Mastercustomer",
													storeUrl: 'mastercustomer',
													width: 300,
												},
											]
										},
										{
											fieldLabel: 'Doc Number',
											allowBlank: false,
											name: 'KTP_number',
											maskRe: /[A-Za-z0-9\s.]/
										},
										{
											xtype: 'xnamefieldEST',
											fieldLabel: 'Doc Name',
											name: 'KTP_name',
											enforceMaxLength: true,
											minLength: 2,
											maxLength: 50
										},
										{
											xtype: 'xaddressfieldEST',
											fieldLabel: 'Doc Address',
											name: 'KTP_address',
											minLength: 3,
										},
										/*start container 1 */
										{
											xtype: 'container',
											layout: 'hbox',
											defaults: {
												xtype: 'container',
												layout: 'vbox',
												flex: 1
											},
											items: [
												{
													defaults: {
														padding: '5px 0 0 0', // top,right,bottom,left
														width: '100%'
													},
													items: [
														{
															xtype: 'cbprovinsi',
															name: 'identitas_province_id',
															bindPrefixName: "Mastercustomer",
															storeUrl: 'mastercustomer',
															allowBlank: false,
														},
														{
															xtype: 'xgeneralfieldEST',
															fieldLabel: 'Kecamatan',
															name: 'identitas_kecamatan',
															minLength: 2,
															maxLength: 50
														},
														{
															xtype: 'xnumericfieldEST',
															fieldLabel: 'RT',
															name: 'identitas_rt',
															maxLength: 3
														},
														{
															xtype: 'xnumericfieldEST',
															fieldLabel: 'Kode Pos',
															name: 'identitas_kodepos',
															minLength: 2,
															maxLength: 10
														},
													]
												},
												/*end left */
												/*start right */
												{
													defaults: {
														padding: '5px 0 0 20px', // top,right,bottom,left
														width: '100%'
													},
													items: [
														{
															xtype: 'cbcity',
															fieldLabel: 'City',
															name: 'identitas_city_id',
															allowBlank: false,
														},
														{
															xtype: 'xgeneralfieldEST',
															fieldLabel: 'Kelurahan',
															name: 'identitas_kelurahan',
															minLength: 2,
															maxLength: 50
														},
														{
															xtype: 'xnumericfieldEST',
															fieldLabel: 'RW',
															name: 'identitas_rw',
															maxLength: 3
														},
													]
												},
											]
										},
									]
								},
							]
						},
						/* end panel identitas */
						/* start panel npwp */
						{
							xtype: 'panel',
							bodyPadding: 10,
							title: 'NPWP DOCUMENT INFORMATION',
							collapsible: true,
							width: '100%',
							items: [
								{
									xtype: 'container',
									layout: 'hbox',
									defaults: {
										xtype: 'container',
										layout: 'vbox',
										flex: 1
									},
									items: [
										{
											defaults: {
												padding: '5px 0 0 0', // top,right,bottom,left
												width: '100%'
											},
											items: [
												{
													xtype: 'hiddenfield',
													itemId: 'fd_npwp_text',
													name: 'file_npwp_name'
												},
												{
													xtype: 'form',
													itemId: 'formku4',
													bodyStyle: 'background:none;border:0',
													layout: 'hbox',
													width: '100%',
													items: [
														{
															xtype: 'filefield',
															itemId: 'fd_npwp',
															name: 'npwp_browse',
															fieldLabel: 'NPWP',
															emptyText: 'Select an file',
															buttonText: 'Browse'
														}
													]
												},
											]
										}
									]
								},
								{
									xtype: 'container',
									layout: 'hbox',
									defaults: {
										xtype: 'container',
										layout: 'vbox',
										flex: 1
									},
									items: [
										{
											defaults: {
												padding: '5px 0 0 0', // top,right,bottom,left
												width: '100%'
											},
											items: [
												{
													xtype: 'maskfield',
													mask: '##.###.###.#-###.###',
													fieldLabel: 'NPWP Number',
													name: 'NPWP',
													maskRe: /[0-9-.]/,
													allowBlank: false, /* added by ahmad riadi 27-12-2016  */
												},
												{
													xtype: 'textfield',
													fieldLabel: 'NPWP Nama',
													name: 'NPWP_name',
													maskRe: /[A-Za-z0-9\s.]/,
													enforceMaxLength: true,
													minLength: 2,
													maxLength: 50
												},
												{
													xtype: 'xaddressfieldEST', ///edited by Erwin.S 21042021
													fieldLabel: 'NPWP Address',
													name: 'NPWP_address',
													allowBlank: false, /* added by ahmad riadi 27-12-2016  */
												},
												{
													xtype: 'cbnpwpklu',
													name: 'NPWP_klu_id',
													storeUrl: 'mastercustomer'
												},
												{
													xtype: 'cbnpwpklasifikasiusaha',
													name: 'NPWP_klasifikasiusaha_id',
													storeUrl: 'mastercustomer',
													fieldLabel: 'Klasifikasi Usaha'
												},
											]
										},
										//right
										{
											defaults: {
												xtype: 'textfield',
												padding: '5px 0 0 20px',
												width: '100%'
											},
											items: [
												{
													xtype: 'xnumericfieldEST',
													fieldLabel: 'NPPKP Number',
													name: 'NPPKP',
												},
												{
													xtype: 'npwpstatuscombobox',
													name: 'NPWP_status_id',
													width: 240,
													editable: false
												},
												{
													fieldLabel: 'Tarif PPH Final',
													name: 'NPWP_tarif',
													maskRe: /[0-9.]/
												},
												{
													fieldLabel: 'No Tarif PPH Final',
													name: 'NPWP_tarifno',
													maskRe: /[0-9.]/
												},
											]
										}
									]
								}
							]
						},
						/* end panel npwp */


						/* CUSTOMER INFORMATION */
						{
							xtype: 'panel',
							bodyPadding: 10,
							title: 'COMPANY INFORMATION',
							collapsible: true,
							width: '100%',
							items: [
								{
									xtype: 'container',
									layout: 'vbox',
									defaults: {
										xtype: 'textfield',
										padding: '5px 0 0 0',
										width: '100%'
									},
									items: [
										{
											xtype: 'checkboxfield',
											fieldLabel: 'Badan Hukum',
											name: 'ppatk_badanhukum',
											inputValue: '1',
											uncheckedValue: '0',
											width: 20
										},
										{
											fieldLabel: 'Company Name',
											name: 'company_name',
											maskRe: /[A-Za-z0-9\s.]/,
											minLength: 3,
											enforceMaxLength: true,
											maxLength: 50
										},
										{
											fieldLabel: 'Company PIC',
											name: 'company_pic',
											maskRe: /[A-Za-z0-9\s.]/,
											minLength: 3,
											enforceMaxLength: true,
											maxLength: 50
										},
										{
											xtype: 'xaddressfieldEST', ///edited by Erwin.S 21042021
											fieldLabel: 'Company Address',
											name: 'company_address',
											minLength: 3,
										},
										{
											xtype: 'container',
											layout: 'hbox',
											defaults: {
												xtype: 'container',
												layout: 'vbox',
												flex: 1
											},
											items: [
												{
													margin: '0 20px 0 110px',
													defaults: {
														xtype: 'textfield',
														padding: '5px 0 0 0',
														width: '100%'
													},
													items: [
														{
															xtype: 'cbcity',
															fieldLabel: 'City',
															name: 'company_city_id',
															allowBlank: false
														},
														{
															fieldLabel: 'Email',
															name: 'company_email',
															vtype: 'email',
															listeners: {
																'blur': function (thisField) {
																	if (!thisField.isValid()) {
																		this.setValue("");
																	}
																}
															}
														},
														{
															xtype: 'xphonenumberfieldEST',
															fieldLabel: 'Phone',
															name: 'company_phone',
														},
														{
															xtype: 'xphonenumberfieldEST',
															fieldLabel: 'Fax',
															name: 'company_fax',
														}
													]
												},
												{
													defaults: {
														padding: '5px 0 0 0',
														width: '100%'
													},
													items: [
														{
															xtype: 'xnumericfieldEST',
															fieldLabel: 'Zipcode',
															name: 'company_zipcode',
															minLength: 2,
															maxLength: 10
														},
														{
															xtype: 'xphonenumberfieldEST',
															fieldLabel: 'Ext',
															name: 'company_phoneext',
														}
													]
												}
											]
										},
										{
											xtype: 'xgeneralfieldEST',
											fieldLabel: 'Position',
											name: 'company_position',
											maxLength: 255
										},
										/*start container 1 */
										{
											xtype: 'container',
											layout: 'hbox',
											defaults: {
												xtype: 'container',
												layout: 'vbox',
												flex: 1
											},
											items: [
												{
													defaults: {
														xtype: 'textfield',
														padding: '5px 0 0 0', // top,right,bottom,left
														width: '100%'
													},
													items: [
														{
															fieldLabel: 'Akta Pendirian',
															name: 'company_aktapendirian',
															enforceMaxLength: true,
															maxLength: 255
														},
														{
															fieldLabel: 'Akta Perubahan',
															name: 'company_aktaperubahan',
															enforceMaxLength: true,
															maxLength: 255
														},
														{
															fieldLabel: 'Akta Susunan Pengurus',
															name: 'company_aktasusunanpengurus',
															enforceMaxLength: true,
															maxLength: 255
														},
													]
												},
												/*end left */
												/*start right */
												{
													defaults: {
														xtype: 'textfield',
														padding: '5px 0 0 20px', // top,right,bottom,left
														width: '100%'
													},
													items: [
														{
															xtype: 'datefield',
															itemId: 'fd_tanggalaktapendirian',
															format: 'd-m-Y',
															submitFormat: 'Y-m-d H:i:s.u',
															allowBlank: false,
															fieldLabel: 'Tanggal akta',
															name: 'company_tanggalaktapendirian',
															editable: false
														},
														{
															xtype: 'datefield',
															itemId: 'fd_tanggalaktaperubahan',
															format: 'd-m-Y',
															submitFormat: 'Y-m-d H:i:s.u',
															allowBlank: false,
															fieldLabel: 'Tanggal perubahan',
															name: 'company_tanggalaktaperubahan',
															editable: false
														},
														{
															xtype: 'datefield',
															itemId: 'fd_tanggalaktasusunanpengurus',
															format: 'd-m-Y',
															submitFormat: 'Y-m-d H:i:s.u',
															allowBlank: false,
															fieldLabel: 'Tanggal pengurus',
															name: 'company_tanggalaktasusunanpengurus',
															editable: false
														},
													]
												},
											]
										},
									]
								}
							]
						},
						/* start panel ppatk */
						{
							xtype: 'panel',
							bodyPadding: 10,
							title: 'PPATK INFORMATION',
							collapsible: true,
							width: '100%',
							items: [
								{
									xtype: 'container',
									layout: 'vbox',
									defaults: {
										xtype: 'textfield',
										padding: '5px 0 0 0', // top,right,bottom,left
										width: '100%'
									},
									items: [
										{
											xtype: 'fieldcontainer',
											layout: 'vbox',
											bodyBorder: false,
											defaults: {
												layout: 'fit',
												xtype: 'textfield',
												padding: '5px 50px 0 0', // top,right,bottom,left
												width: '100%'
											},
											items: [
												{
													xtype: 'cbbentukusaha',
													name: 'ppatk_bentukusaha_id',
													bindPrefixName: "Mastercustomer",
													storeUrl: 'mastercustomer',
													width: 300
												},
												{
													fieldLabel: 'Bidang usaha',
													name: 'ppatk_bidangusaha',
													enforceMaxLength: true,
													maxLength: 255
												},
												{
													fieldLabel: 'Bila lainnya sebutkan',
													name: 'ppatk_bilalain',
													enforceMaxLength: true,
													maxLength: 255
												},
												{
													xtype: 'cbinstrumentpembayaran',
													name: 'ppatk_instrumentpembayaran_id',
													bindPrefixName: "Mastercustomer",
													storeUrl: 'mastercustomer',
													width: 300
												},
												{
													fieldLabel: 'No Rek./Wakat yg digunakan',
													name: 'ppatk_rekeningwakat_no',
													maskRe: /[A-Za-z0-9\s.]/
												},
												{
													fieldLabel: 'Rincian Transaksi',
													name: 'ppatk_rinciantransaksi',
													enforceMaxLength: true,
													maxLength: 255
												},
												{
													fieldLabel: 'Sumber Dana',
													name: 'ppatk_sumberdana',
													enforceMaxLength: true,
													maxLength: 255
												},
												{
													xtype: 'xnumericfieldEST',
													fieldLabel: 'No.Rekening transaksi',
													name: 'ppatk_rekeningtrans_no',
												},
												{
													fieldLabel: 'Nama yang berwenang mewakili',
													name: 'ppatk_namawali',
												},
											]
										},
									]
								},
							]
						},
						/* end panel ppatk */
						{
							xtype: 'panel',
							bodyPadding: 10,
							title: 'EMERGENCY CALL',
							collapsible: true,
							width: '100%',
							items: [
								{
									xtype: 'container',
									layout: 'vbox',
									defaults: {
										padding: '5px 0 0 0',
										width: '100%'
									},
									items: [
										{
											xtype: 'xnamefieldEST',
											fieldLabel: 'Name',
											name: 'emergency_name',
											minLength: 3,
											maxLength: 50
										},
										{
											xtype: 'xaddressfieldEST',
											fieldLabel: 'Address',
											name: 'emergency_address',
										},
										{
											xtype: 'container',
											layout: 'hbox',
											defaults: {
												padding: '5px 0 0 0',
												width: '100%',
												flex: 1
											},
											items: [
												{
													xtype: 'xphonenumberfieldEST',
													fieldLabel: 'Home phone',
													name: 'emergency_phone',
													margin: '0 20px 0 110px',
												},
												{
													xtype: 'xphonenumberfieldEST',
													fieldLabel: 'Mobile Phone',
													name: 'emergency_mobilephone',
													padding: '0 0 0 0',
												}
											]
										},
										{
											xtype: 'xgeneralfieldEST',
											fieldLabel: 'Family Status',
											name: 'emergency_status',
											padding: '10px 0 0 0',
											minLength: 3,
											maxLength: 50,
										}
									]
								}
							]
						},
						{
							xtype: 'panel',
							bodyPadding: 10,
							title: 'LOGIN INFORMATION',
							collapsible: true,
							width: '100%',
							items: [
								{
									xtype: 'container',
									layout: 'vbox',
									items: [
										{
											xtype: 'label',
											text: 'Please make sure customer name have minimum 8 characters and Date of Birth is filled to get generated default username and password',
											width: '100%',
											style: {
												fontSize: '10px',
												color: "#9E9E9E",
												margin: '10px 0'
											}
										},
										{
											xtype: 'panel',
											layout: 'hbox',
											width: '100%',
											bodyStyle: 'border:1px solid red;padding:10px 20px;background-color:#FFFF99',
											defaults: {
												xtype: 'textfield',
												padding: '5px 0 0 0',
												width: '100%',
												flex: 1
											},
											items: [
												{
													margin: '0 20px 0 0',
													fieldLabel: 'Username',
													name: 'userid',
													itemId: 'fd_username',
													allowBlank: false
												},
												{
													padding: '0',
													fieldLabel: 'Password',
													name: 'password',
													allowBlank: false
												}
											]
										},
										{
											xtype: 'xnotefieldEST',
											fieldLabel: 'Description',
											name: 'description',
											padding: '10px 0 0 0',
											width: '100%',
										}
									]
								}
							]
						}
					]
				}
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
						action: 'documents',
						itemId: 'btnDocuments',
						padding: 5,
						width: 100,
						iconCls: 'icon-archive',
						text: 'Documents'
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
		];

		return x;
	}
});