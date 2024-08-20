Ext.define('Erems.view.mastercluster.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.masterclusterformdata',
	requires: ['Erems.view.mastercluster.GalleryGrid', 'Erems.library.template.view.MoneyField'],
	frame: true,
	height: 500,
	autoScroll: true,
	anchorSize: 100,
	bodyBorder: true,
	bodyPadding: 10,
	bodyStyle: 'border-top:none;border-left:none;border-right:none;',
	editedRow: -1,
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
			items: [{
					xtype: 'fieldcontainer',
					fieldDefaults: {
						labelAlign: 'top',
						msgTarget: 'side'
					},
					defaults: {
						border: false,
						xtype: 'panel',
						bodyStyle: 'background:none',
						flex: 1,
						layout: 'anchor'
					},
					layout: 'hbox',
					items: [
						{width: 600,
							items: [{
									xtype: 'hiddenfield',
									itemId: 'cluster_id',
									name: 'cluster_id'
								},
								{
									xtype: 'hiddenfield',
									itemId: 'img_legendlayer',
									name: 'img_legendlayer'
								},
								{
									xtype: 'hiddenfield',
									itemId: 'siteplan_svg',
									name: 'siteplan_svg'
								}, {
									xtype: 'hiddenfield',
									itemId: 'img_siteplant',
									name: 'img_siteplant'
								},
								{
									xtype: 'hiddenfield',
									itemId: 'edit_image_flag',
									name: 'edit_image_flag'
								},
								{
									xtype: 'textfield',
									itemId: 'cluster_code',
									name: 'code',
									fieldLabel: 'Code',
									allowBlank: false,
									enforceMaxLength: true,
									maskRe: /[A-Za-z0-9.]/,
									maxLength: 5,
									anchor: '-5'
								},
								{
									xtype: 'textfield',
									itemId: 'cluster',
									name: 'cluster',
									fieldLabel: 'Cluster',
									allowBlank: false,
									enforceMaxLength: true,
									maskRe: /[A-Za-z0-9\s.]/,
									maxLength: 100,
									anchor: '-5'
								},
								{
									xtype: 'textfield',
									itemId: 'cluster_alias',
									name: 'cluster_alias',
									fieldLabel: 'Cluster Alias',
									enforceMaxLength: true,
									maskRe: /[A-Za-z0-9\s.]/,
									maxLength: 100,
									anchor: '-5'
								},
								{
									xtype      : 'xnotefieldEST',
									height     : 60,
									itemId     : 'description',
									name       : 'description',
									fieldLabel : 'Description',
									anchor     : '-5'
								},
								{
									xtype: 'textfield',
									name: 'luasan_efektif_lahan',
									fieldLabel: 'Luasan Efektif Lahan (m2)',
									enforceMaxLength: true,
									maskRe: /[0-9.]/,
									maxLength: 13,
									minLength: 2,
									listeners: {
										change: function (el, v, prev) {
											var commaPos = v.indexOf('.') + 1,
													strLen = v.length;
											if ((commaPos <= 0 && v.length > 10) || (commaPos > 0 && commaPos < strLen - 2)) {
												el.setValue(prev);
											}
										}
									}
								},
								{
									xtype: 'textfield',
									name: 'total_unit',
									fieldLabel: 'Total Perkiraan Unit',
									enforceMaxLength: true,
									maskRe: /[0-9.]/,
									maxLength: 13,
									minLength: 2,
									listeners: {
										change: function (el, v, prev) {
											var commaPos = v.indexOf('.') + 1,
													strLen = v.length;
											if ((commaPos <= 0 && v.length > 10) || (commaPos > 0 && commaPos < strLen - 2)) {
												el.setValue(prev);
											}
										}
									}
								},
								{
									xtype      : 'xnumericfieldEST',
									itemId     : 'kode_rekening_va',
									name       : 'kode_rekening_va',
									fieldLabel : 'Kode Rekening VA',
									maxLength  : 3,
									anchor     : '-5'
								},
								{
									xtype      : 'xnumericfieldEST',
									itemId     : 'kode_cluster_va',
									name       : 'kode_cluster_va',
									fieldLabel : 'Kode Cluster VA',
									maxLength  : 3,
									anchor     : '-5'
								},
								//added by anas 21062021
								{
									xtype: 'fieldcontainer',
									items: [
										{
											xtype: 'checkboxfield',
											fieldLabel: 'Lock Type Marketing Stock',
											labelWidth: 150,
											itemId: 'is_locktype',
											name: 'is_locktype',
											inputValue: '1',
											uncheckedValue: '0'
										}]
								},
								//end added
								{
									xtype: 'form',
									itemId: 'formku',
									bodyStyle: 'background:none;border:0',
									items: [{
											xtype: 'filefield',
											itemId: 'mastercluster_layermap',
											name: 'cluster_layermap',
											fieldLabel: 'Site plant img',
											emptyText: 'Select an image',
											buttonText: 'Browse'


										}]


								},
								{
									xtype: 'form',
									itemId: 'formku2',
									bodyStyle: 'background:none;border:0',
									layout: 'hbox',
									items: [{
											xtype: 'filefield',
											itemId: 'mastercluster_legend_layer',
											name: 'cluster_legend_layer',
											fieldLabel: 'Legend layer',
											emptyText: 'Select an image',
											buttonText: 'Browse'


										}, {
											xtype: 'panel',
											bodyStyle: 'background:none',
											itemId: 'mastercluster_legendlayerimage',
											height: 50,
											margin: '0 0 0 20',
											width: 50,
											html: '',
											anchor: '-5'
										}]


								},
								{
									xtype: 'form',
									itemId: 'formku3',
									bodyStyle: 'background:none;border:0',
									layout: 'hbox',
									items: [{
											xtype: 'filefield',
											itemId: 'mastercluster_siteplan_svg',
											name: 'cluster_siteplan_svg',
											fieldLabel: 'Siteplan SVG',
											emptyText: 'Select an file',
											buttonText: 'Browse'


										}, {
											xtype: 'panel',
											bodyStyle: 'background:none',
											itemId: 'mastercluster_siteplansvg',
											height: 50,
											margin: '0 0 0 20',
											width: 50,
											html: '',
											anchor: '-5'
										}]


								},
								{
									xtype: 'textfield',
									name: 'sector_code',
									fieldLabel: 'Sector Code',
									enforceMaxLength: true,
									maskRe: /[A-Za-z0-9\s.]/,
									maxLength: 10
								},
								{
									xtype: 'textfield',
									name: 'subsector_code',
									fieldLabel: 'Subsector Code',
									enforceMaxLength: true,
									maskRe: /[A-Za-z0-9\s.]/,
									maxLength: 50
								},
								{
									xtype: 'xmoneyfield',
									name: 'harga_taman',
									fieldLabel: 'Harga Taman',
									enforceMaxLength: true,
									maskRe: /[0-9.]/,
									maxLength: 13,
									minLength: 2,
									enableKeyEvents: true,
									listeners: {
										keyup: function (el) {
											var len = el.getValue().length;
											var commaPos = el.getValue().indexOf('.') + 1;
											var prev = Math.floor(el.getValue() / 10);
											if ((commaPos <= 0 && len > 10) || (commaPos > 0 && commaPos < len - 2)) {
												el.setValue(prev);
											}
										}
									}
								},
								{
									xtype: 'xmoneyfield',
									name: 'harga_hook',
									fieldLabel: 'Harga Hook',
									enforceMaxLength: true,
									maskRe: /[0-9.]/,
									maxLength: 13,
									minLength: 2,
									enableKeyEvents: true,
									listeners: {
										keyup: function (el) {
											var len = el.getValue().length;
											var commaPos = el.getValue().indexOf('.') + 1;
											var prev = Math.floor(el.getValue() / 10);
											if ((commaPos <= 0 && len > 10) || (commaPos > 0 && commaPos < len - 2)) {
												el.setValue(prev);
											}
										}
									}
								}
							]},
						{
							items: [
								{
									xtype: 'panel',
									bodyStyle: 'background:none',
									itemId: 'mastercluster_layermapimage',
									height: 200,
									html: '',
									anchor: '100%'
								},
								{
									xtype: 'panel',
									bodyStyle: 'background:none;',
									margin: '5px 0 0 0',
									itemId: 'mastercluster_legendimage',
									height: 50,
									html: '',
									width: 50
								},
								{
									xtype: 'container',
									html: '<div id="mastercluster_siteplansvg" style=""> </div>',
									margin: '5px 0 0 0',
									height: 200
								},
							]
						}
					]
				},
				{
					xtype: 'fieldset',
					height: 250,
					title: 'Detail Images',
					items: [
						{xtype: 'masterclustergallerygrid', itemId: 'galleryimagemastercluster_grid'}
					]
				}
			],
			dockedItems: me.generateDockedItem()
		});
		me.callParent(arguments);
	}
});

