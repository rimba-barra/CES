Ext.define('Erems.view.masterfakturpajakcounter.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.masterfakturpajakcounterformdata',
    requires: [
		'Erems.library.template.component.Bankcombobox',
		'Erems.library.template.component.Plafoncombobox'
	],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
	//height: 600,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                //labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_id',
                    name: 'fakturpajak_counter_id'
                },
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					items: [{
							xtype: 'bankcombobox',
							itemId: 'fd_bank_id',
							width: '100%',
                            name: 'bank_id',
							fieldLabel: 'Bank',
							allowBlank: false,
						}]
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					hidden: true,
					items: [{
							xtype: 'globalfakturpajakcountercombobox',
							itemId: 'fd_globalfakturpajakcounter',
							width: '100%',
                            name: 'globalfakturpajak_counter_id',
							fieldLabel: 'Bank',
							//allowBlank: false,
						}]
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					width: '100%',
					margin: '5px 0 0 0',
					items: [{
							xtype: 'textfield',
							width: '100%',
                            name: 'name',
							fieldLabel: 'Description'
						}]
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					width: '100%',
					margin: '5px 0 0 0',
					items: [{
							xtype: 'plafoncombobox',
							fieldLabel: 'Tahap 1',
							anchor: '-5',
							name: 'tahap1_id',
							flex: 12,
							editable:false
							//allowBlank: false
						},
						{xtype: 'splitter', width: 10}, 
						{
							xtype: 'textfield',
							fieldLabel: '',
							anchor: '-5',
							name: 'tahap1_persen',
							flex: 6,
							//allowBlank: false,
							maskRe: /[0-9\.]/
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
					]
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					width: '100%',
					margin: '5px 0 0 0',
					items: [{
							xtype: 'plafoncombobox',
							fieldLabel: 'Tahap 2',
							anchor: '-5',
							name: 'tahap2_id',
							flex: 12,
							editable:false
							//allowBlank: false
						},
						{xtype: 'splitter', width: 10}, 
						{
							xtype: 'textfield',
							fieldLabel: '',
							anchor: '-5',
							name: 'tahap2_persen',
							flex: 6,
							//allowBlank: false,
							maskRe: /[0-9\.]/
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
					]
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					width: '100%',
					margin: '5px 0 0 0',
					items: [{
							xtype: 'plafoncombobox',
							fieldLabel: 'Tahap 3',
							anchor: '-5',
							name: 'tahap3_id',
							flex: 12,
							editable:false
							//allowBlank: false
						},
						{xtype: 'splitter', width: 10}, 
						{
							xtype: 'textfield',
							fieldLabel: '',
							anchor: '-5',
							name: 'tahap3_persen',
							flex: 6,
							//allowBlank: false,
							maskRe: /[0-9\.]/
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
					]
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					width: '100%',
					margin: '5px 0 0 0',
					items: [{
							xtype: 'plafoncombobox',
							fieldLabel: 'Tahap 4',
							anchor: '-5',
							name: 'tahap4_id',
							flex: 12,
							editable:false
							//allowBlank: false
						},
						{xtype: 'splitter', width: 10}, 
						{
							xtype: 'textfield',
							fieldLabel: '',
							anchor: '-5',
							name: 'tahap4_persen',
							flex: 6,
							//allowBlank: false,
							maskRe: /[0-9\.]/
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
					]
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					width: '100%',
					margin: '5px 0 0 0',
					items: [{
							xtype: 'plafoncombobox',
							fieldLabel: 'Tahap 5',
							anchor: '-5',
							name: 'tahap5_id',
							flex: 12,
							editable:false
							//allowBlank: false
						},
						{xtype: 'splitter', width: 10}, 
						{
							xtype: 'textfield',
							fieldLabel: '',
							anchor: '-5',
							name: 'tahap5_persen',
							flex: 6,
							//allowBlank: false,
							maskRe: /[0-9\.]/
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
					]
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					width: '100%',
					margin: '5px 0 0 0',
					items: [{
							xtype: 'plafoncombobox',
							fieldLabel: 'Tahap 6',
							anchor: '-5',
							name: 'tahap6_id',
							flex: 12,
							editable:false
							//allowBlank: false
						},
						{xtype: 'splitter', width: 10}, 
						{
							xtype: 'textfield',
							fieldLabel: '',
							anchor: '-5',
							name: 'tahap6_persen',
							flex: 6,
							//allowBlank: false,
							maskRe: /[0-9\.]/
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
					]
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					width: '100%',
					margin: '5px 0 0 0',
					items: [{
							xtype: 'plafoncombobox',
							fieldLabel: 'Tahap 7',
							anchor: '-5',
							name: 'tahap7_id',
							flex: 12,
							editable:false
							//allowBlank: false
						},
						{xtype: 'splitter', width: 10}, 
						{
							xtype: 'textfield',
							fieldLabel: '',
							anchor: '-5',
							name: 'tahap7_persen',
							flex: 6,
							//allowBlank: false,
							maskRe: /[0-9\.]/
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
					]
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					width: '100%',
					margin: '5px 0 0 0',
					items: [{
							xtype: 'plafoncombobox',
							fieldLabel: 'Tahap 8',
							anchor: '-5',
							name: 'tahap8_id',
							flex: 12,
							editable:false
							//allowBlank: false
						},
						{xtype: 'splitter', width: 10}, 
						{
							xtype: 'textfield',
							fieldLabel: '',
							anchor: '-5',
							name: 'tahap8_persen',
							flex: 6,
							//allowBlank: false,
							maskRe: /[0-9\.]/
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
					]
				},
			],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

