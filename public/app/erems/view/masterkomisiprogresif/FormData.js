Ext.define('Erems.view.masterkomisiprogresif.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.masterkomisiprogresifformdata',
	requires: ['Erems.library.template.view.MoneyField'],
	autoScroll: true,
	anchorSize: 100,
	//height: 600,
	bodyBorder: true,
	bodyPadding: 10,
	bodyStyle: 'border-top:none;border-left:none;border-right:none;',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			defaults: {
				//labelAlign: 'top',
				labelSeparator: ' ',
				labelClsExtra: 'small',
				fieldStyle: 'margin-bottom:3px;',
				anchor: '100%'
			},
			items: [
				{
					xtype: 'hiddenfield',
					itemId: 'fdms_id',
					name: 'komisi_progresif_id'
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Kode',
					labelWidth: '120px',
					name: 'code',
					allowBlank: false,
				},
				{
					xtype: 'numberfield',
					name: 'tahun',
					allowBlank: false,
					hideTrigger: true,
					decimalPrecision: 2,
					minValue: 1,
//					maxValue: 100,
					fieldLabel: 'Tahun',
					labelWidth: '120px'
				},
				{
					xtype: 'numberfield',
					name: 'persentase',
					allowBlank: false,
					hideTrigger: true,
					decimalPrecision: 2,
					minValue: 0.01,
					maxValue: 100,
					fieldLabel: 'Persentase',
					labelWidth: '120px'
				},
				{
					xtype: 'xmoneyfield',
					fieldStyle: 'background:none;background-color:#ffffff !important;text-align:right',
					maskRe: /[0-9\.]/,
					fieldLabel: 'Target Januari',
					labelWidth: '120px',
					name: 'target_1',
					hideTrigger: true,
					decimalPrecision: 2
				},
				{
					xtype: 'xmoneyfield',
					fieldStyle: 'background:none;background-color:#ffffff !important;text-align:right',
					maskRe: /[0-9\.]/,
					fieldLabel: 'Target Februari',
					labelWidth: '120px',
					name: 'target_2',
					hideTrigger: true,
					decimalPrecision: 2
				},
				{
					xtype: 'xmoneyfield',
					fieldStyle: 'background:none;background-color:#ffffff !important;text-align:right',
					maskRe: /[0-9\.]/,
					fieldLabel: 'Target Maret',
					labelWidth: '120px',
					name: 'target_3',
					hideTrigger: true,
					decimalPrecision: 2
				},
				{
					xtype: 'xmoneyfield',
					fieldStyle: 'background:none;background-color:#ffffff !important;text-align:right',
					maskRe: /[0-9\.]/,
					fieldLabel: 'Target April',
					labelWidth: '120px',
					name: 'target_4',
					hideTrigger: true,
					decimalPrecision: 2
				},
				{
					xtype: 'xmoneyfield',
					fieldStyle: 'background:none;background-color:#ffffff !important;text-align:right',
					maskRe: /[0-9\.]/,
					fieldLabel: 'Target Mei',
					labelWidth: '120px',
					name: 'target_5',
					hideTrigger: true,
					decimalPrecision: 2
				},
				{
					xtype: 'xmoneyfield',
					fieldStyle: 'background:none;background-color:#ffffff !important;text-align:right',
					maskRe: /[0-9\.]/,
					fieldLabel: 'Target Juni',
					labelWidth: '120px',
					name: 'target_6',
					hideTrigger: true,
					decimalPrecision: 2
				},
				{
					xtype: 'xmoneyfield',
					fieldStyle: 'background:none;background-color:#ffffff !important;text-align:right',
					maskRe: /[0-9\.]/,
					fieldLabel: 'Target Juli',
					labelWidth: '120px',
					name: 'target_7',
					hideTrigger: true,
					decimalPrecision: 2
				},
				{
					xtype: 'xmoneyfield',
					fieldStyle: 'background:none;background-color:#ffffff !important;text-align:right',
					maskRe: /[0-9\.]/,
					fieldLabel: 'Target Agustus',
					labelWidth: '120px',
					name: 'target_8',
					hideTrigger: true,
					decimalPrecision: 2
				},
				{
					xtype: 'xmoneyfield',
					fieldStyle: 'background:none;background-color:#ffffff !important;text-align:right',
					maskRe: /[0-9\.]/,
					fieldLabel: 'Target September',
					labelWidth: '120px',
					name: 'target_9',
					hideTrigger: true,
					decimalPrecision: 2
				},
				{
					xtype: 'xmoneyfield',
					fieldStyle: 'background:none;background-color:#ffffff !important;text-align:right',
					maskRe: /[0-9\.]/,
					fieldLabel: 'Target Oktober',
					labelWidth: '120px',
					name: 'target_10',
					hideTrigger: true,
					decimalPrecision: 2
				},
				{
					xtype: 'xmoneyfield',
					fieldStyle: 'background:none;background-color:#ffffff !important;text-align:right',
					maskRe: /[0-9\.]/,
					fieldLabel: 'Target November',
					labelWidth: '120px',
					name: 'target_11',
					hideTrigger: true,
					decimalPrecision: 2
				},
				{
					xtype: 'xmoneyfield',
					fieldStyle: 'background:none;background-color:#ffffff !important;text-align:right',
					maskRe: /[0-9\.]/,
					fieldLabel: 'Target Desember',
					labelWidth: '120px',
					name: 'target_12',
					hideTrigger: true,
					decimalPrecision: 2
				},
			],
			dockedItems: me.generateDockedItem()
		});

		me.callParent(arguments);
	}
});

