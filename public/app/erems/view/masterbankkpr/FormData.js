Ext.define('Erems.view.masterbankkpr.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.masterbankkprformdata',
    requires: [
		'Erems.library.template.component.Bankcombobox',
		'Erems.library.template.component.Plafoncombobox',
		'Erems.library.template.component.Globalbankkprcombobox'
	],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
	//height: 600,
    bodyBorder: true,
    bodyPadding: 5,
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
                    name: 'bankkpr_id'
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
                    		forceSelection:true,	
                            listeners:{
                                beforequery: function(record){
                                    record.query = new RegExp(record.query, 'i');
                                    record.forceAll = true;
                                }
                            }
						}],
            		bodyStyle: 'background-color:#dfe9f6;border:0;',
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					hidden: true,
					items: [{
							xtype: 'globalbankkprcombobox',
							itemId: 'fd_globalbankkpr',
							width: '100%',
                            name: 'globalbankkpr_id',
							fieldLabel: 'Bank',
                    		forceSelection:true,
                            listeners:{
                                beforequery: function(record){
                                    record.query = new RegExp(record.query, 'i');
                                    record.forceAll = true;
                                }
                            }
							//allowBlank: false,
						}],
            		bodyStyle: 'background-color:#dfe9f6;border:0;',
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
						}],
            		bodyStyle: 'background-color:#dfe9f6;border:0;',
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					width: '100%',
					margin: '5px 0 0 0',
					items: [{
							xtype: 'textfield',
							width: '100%',
                            name: 'initial_bank',
							fieldLabel: 'Initial Bank'
						}],
            		bodyStyle: 'background-color:#dfe9f6;border:0;',
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					width: '100%',
					margin: '5px 0 0 0',
					items: [{
							xtype      : 'xaddressfieldEST',
							width      : '100%',
							name       : 'alamat_bank',
							fieldLabel : 'Alamat Bank'
						}],
            		bodyStyle: 'background-color:#dfe9f6;border:0;',
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					width: '100%',
					margin: '5px 0 0 0',
					items: [{
							xtype: 'textfield',
							width: '100%',
                            name: 'pic_bank',
							fieldLabel: 'PIC Bank'
						}],
            		bodyStyle: 'background-color:#dfe9f6;border:0;',
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					width: '100%',
					margin: '5px 0 0 0',
					items: [{
							xtype: 'textfield',
							width: '100%',
                            name: 'nama_pt_bank',
							fieldLabel: 'Nama PT Bank'
						}],
            		bodyStyle: 'background-color:#dfe9f6;border:0;',
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					width: '100%',
					margin: '5px 0 0 0',
					items: [{
							xtype: 'textfield',
							width: '100%',
                            name: 'jabatan',
							fieldLabel: 'Jabatan'
						}],
            		bodyStyle: 'background-color:#dfe9f6;border:0;',
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					width: '100%',
					margin: '5px 0 0 0',
					items: [{
							xtype: 'textfield',
							width: '100%',
                            name: 'atas_nama_bank_project',
							fieldLabel: 'Atas Nama Bank Project'
						}],
            		bodyStyle: 'background-color:#dfe9f6;border:0;',
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					width: '100%',
					margin: '5px 0 0 0',
					items: [{
							xtype: 'textfield',
							width: '100%',
                            name: 'nomor_rekening_project',
							fieldLabel: 'No. Rekening Project',
                			maskRe:/[0-9.]/   
						}],
            		bodyStyle: 'background-color:#dfe9f6;border:0;',
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					width: '100%',
					margin: '5px 0 0 0',
					items: [{
							xtype: 'xgeneralfieldEST',
							width: '100%',
                            name: 'pic_collection',
							fieldLabel: 'PIC Collection'
						}],
            		bodyStyle: 'background-color:#dfe9f6;border:0;',
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					width: '100%',
					margin: '5px 0 0 0',
					items: [{
							xtype: 'xphonenumberfieldEST',
							width: '100%',
                            name: 'pic_collection_phone',
                            flex : 1,
							fieldLabel: 'PIC Collection Phone'
						}],
            		bodyStyle: 'background-color:#dfe9f6;border:0;',
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					width: '100%',
					margin: '5px 0 0 0',
					items: [
						{xtype: 'label', text: 'Tahap 1', itemId:'tahap1_label', id:'tahap1_label', flex: 2, margin: '0 0 0 0'},
						{
							xtype: 'button', 
							text: '<div style="color: blue">Reset</div>',
							action: 'reset',
							id:'tahap1',
							itemId:'tahap1',
							flex: 2, 
							margin: '0 0 0 10px',
							style: "background: none!important;border: none;padding: 0!important;cursor: pointer;",
							enableKeyEvents: true
						},
						{xtype: 'splitter', width: 10}, 
						{
							xtype: 'plafoncombobox',
							fieldLabel: '',
							anchor: '-5',
							name: 'tahap1_id',
							flex: 9,
                    		forceSelection:true,
							listeners: {
                                beforequery: function(record){
                                    record.query = new RegExp(record.query, 'i');
                                    record.forceAll = true;
                                },
								change: function(el) {
									var store = this.store;
									store.clearFilter();

									me.resetButton(el, 'tahap1');
								}
							}
							//editable:false
							//allowBlank: false
						},
						{xtype: 'splitter', width: 10}, 
						{
							xtype: 'textfield',
							fieldLabel: '',
							anchor: '-5',
							name: 'tahap1_persen',
							id: 'tahap1_persen',
							flex: 6,
							//allowBlank: false,
							maskRe: /[0-9\.]/
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
					],
            		bodyStyle: 'background-color:#dfe9f6;border:0;',
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					width: '100%',
					margin: '5px 0 0 0',
					items: [
						{xtype: 'label', text: 'Tahap 2', itemId:'tahap2_label',id:'tahap2_label', flex: 2, margin: '0 0 0 0'},
						{
							xtype: 'button', 
							text: '<div style="color: blue">Reset</div>', 
							action: 'reset',
							id:'tahap2',
							itemId:'tahap2',
							flex: 2, 
							margin: '0 0 0 10px',
							style: "background: none!important;border: none;padding: 0!important;cursor: pointer;",
							enableKeyEvents: true
						},
						{xtype: 'splitter', width: 10}, 
						{
							xtype: 'plafoncombobox',
							fieldLabel: '',
							anchor: '-5',
							name: 'tahap2_id',
							flex: 9,
                    		forceSelection:true,
							listeners: {
                                beforequery: function(record){
                                    record.query = new RegExp(record.query, 'i');
                                    record.forceAll = true;
                                },
								change: function(el) {
									var store = this.store;
									store.clearFilter();

									me.resetButton(el, 'tahap2');
								}
							}
							//editable:false
							//allowBlank: false
						},
						{xtype: 'splitter', width: 10}, 
						{
							xtype: 'textfield',
							fieldLabel: '',
							anchor: '-5',
							id: 'tahap2_persen',
							name: 'tahap2_persen',
							flex: 6,
							//allowBlank: false,
							maskRe: /[0-9\.]/
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
					],
            		bodyStyle: 'background-color:#dfe9f6;border:0;',
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					width: '100%',
					margin: '5px 0 0 0',
					items: [
						{xtype: 'label', text: 'Tahap 3', itemId:'tahap3_label', id:'tahap3_label', flex: 2, margin: '0 0 0 0'},
						{
							xtype: 'button', 
							text: '<div style="color: blue">Reset</div>',
							action: 'reset',
							id:'tahap3',
							itemId:'tahap3',
							flex: 2, 
							margin: '0 0 0 10px',
							style: "background: none!important;border: none;padding: 0!important;cursor: pointer;",
							enableKeyEvents: true
						},
						{xtype: 'splitter', width: 10}, 
						{
							xtype: 'plafoncombobox',
							fieldLabel: '',
							anchor: '-5',
							name: 'tahap3_id',
							flex: 9,
                    		forceSelection:true,
							listeners: {
                                beforequery: function(record){
                                    record.query = new RegExp(record.query, 'i');
                                    record.forceAll = true;
                                },
								change: function(el) {
									var store = this.store;
									store.clearFilter();

									me.resetButton(el, 'tahap3');
								}
							}
							//editable:false
							//allowBlank: false
						},
						{xtype: 'splitter', width: 10}, 
						{
							xtype: 'textfield',
							fieldLabel: '',
							anchor: '-5',
							id: 'tahap3_persen',
							name: 'tahap3_persen',
							flex: 6,
							//allowBlank: false,
							maskRe: /[0-9\.]/
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
					],
            		bodyStyle: 'background-color:#dfe9f6;border:0;',
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					width: '100%',
					margin: '5px 0 0 0',
					items: [
						{xtype: 'label', text: 'Tahap 4', itemId:'tahap4_label', id:'tahap4_label', flex: 2, margin: '0 0 0 0'},
						{
							xtype: 'button', 
							text: '<div style="color: blue">Reset</div>',
							action: 'reset',
							id:'tahap4',
							itemId:'tahap4',
							flex: 2, 
							margin: '0 0 0 10px',
							style: "background: none!important;border: none;padding: 0!important;cursor: pointer;",
							enableKeyEvents: true
						},
						{xtype: 'splitter', width: 10}, 
						{
							xtype: 'plafoncombobox',
							fieldLabel: '',
							anchor: '-5',
							name: 'tahap4_id',
							flex: 9,
                    		forceSelection:true,
							listeners: {
                                beforequery: function(record){
                                    record.query = new RegExp(record.query, 'i');
                                    record.forceAll = true;
                                },
								change: function(el) {
									var store = this.store;
									store.clearFilter();

									me.resetButton(el, 'tahap4');
								}
							}
							//editable:false
							//allowBlank: false
						},
						{xtype: 'splitter', width: 10}, 
						{
							xtype: 'textfield',
							fieldLabel: '',
							anchor: '-5',
							id: 'tahap4_persen',
							name: 'tahap4_persen',
							flex: 6,
							//allowBlank: false,
							maskRe: /[0-9\.]/
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
					],
            		bodyStyle: 'background-color:#dfe9f6;border:0;',
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					width: '100%',
					margin: '5px 0 0 0',
					items: [
						{xtype: 'label', text: 'Tahap 5', itemId:'tahap5_label', id:'tahap5_label', flex: 2, margin: '0 0 0 0'},
						{
							xtype: 'button', 
							text: '<div style="color: blue">Reset</div>',
							action: 'reset',
							id:'tahap5',
							itemId:'tahap5',
							flex: 2, 
							margin: '0 0 0 10px',
							style: "background: none!important;border: none;padding: 0!important;cursor: pointer;",
							enableKeyEvents: true
						},
						{xtype: 'splitter', width: 10}, 
						{
							xtype: 'plafoncombobox',
							fieldLabel: '',
							anchor: '-5',
							name: 'tahap5_id',
							flex: 9,
                    		forceSelection:true,
							listeners: {
                                beforequery: function(record){
                                    record.query = new RegExp(record.query, 'i');
                                    record.forceAll = true;
                                },
								change: function(el) {
									var store = this.store;
									store.clearFilter();

									me.resetButton(el, 'tahap5');
								}
							}
							//editable:false
							//allowBlank: false
						},
						{xtype: 'splitter', width: 10}, 
						{
							xtype: 'textfield',
							fieldLabel: '',
							anchor: '-5',
							id: 'tahap5_persen',
							name: 'tahap5_persen',
							flex: 6,
							//allowBlank: false,
							maskRe: /[0-9\.]/
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
					],
            		bodyStyle: 'background-color:#dfe9f6;border:0;',
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					width: '100%',
					margin: '5px 0 0 0',
					items: [
						{xtype: 'label', text: 'Tahap 6', itemId:'tahap6_label', id:'tahap6_label', flex: 2, margin: '0 0 0 0'},
						{
							xtype: 'button', 
							text: '<div style="color: blue">Reset</div>',
							action: 'reset',
							id:'tahap6',
							itemId:'tahap6',
							flex: 2, 
							margin: '0 0 0 10px',
							style: "background: none!important;border: none;padding: 0!important;cursor: pointer;",
							enableKeyEvents: true
						},
						{xtype: 'splitter', width: 10}, 
						{
							xtype: 'plafoncombobox',
							fieldLabel: '',
							anchor: '-5',
							name: 'tahap6_id',
							flex: 9,
                    		forceSelection:true,
							listeners: {
                                beforequery: function(record){
                                    record.query = new RegExp(record.query, 'i');
                                    record.forceAll = true;
                                },
								change: function(el) {
									var store = this.store;
									store.clearFilter();

									me.resetButton(el, 'tahap6');
								}
							}
							//editable:false
							//allowBlank: false
						},
						{xtype: 'splitter', width: 10}, 
						{
							xtype: 'textfield',
							fieldLabel: '',
							anchor: '-5',
							id: 'tahap6_persen',
							name: 'tahap6_persen',
							flex: 6,
							//allowBlank: false,
							maskRe: /[0-9\.]/
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
					],
            		bodyStyle: 'background-color:#dfe9f6;border:0;',
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					width: '100%',
					margin: '5px 0 0 0',
					items: [
						{xtype: 'label', text: 'Tahap 7', itemId:'tahap7_label', id:'tahap7_label', flex: 2, margin: '0 0 0 0'},
						{
							xtype: 'button', 
							text: '<div style="color: blue">Reset</div>',
							action: 'reset',
							id:'tahap7',
							itemId:'tahap7',
							flex: 2, 
							margin: '0 0 0 10px',
							style: "background: none!important;border:none;padding:0!important;cursor:pointer;",
							enableKeyEvents: true
						},
						{xtype: 'splitter', width: 10}, 
						{
							xtype: 'plafoncombobox',
							fieldLabel: '',
							anchor: '-5',
							name: 'tahap7_id',
							flex: 9,
                    		forceSelection:true,
							listeners: {
                                beforequery: function(record){
                                    record.query = new RegExp(record.query, 'i');
                                    record.forceAll = true;
                                },
								change: function(el) {
									var store = this.store;
									store.clearFilter();

									me.resetButton(el, 'tahap7');
								}
							}
							//editable:false
							//allowBlank: false
						},
						{xtype: 'splitter', width: 10}, 
						{
							xtype: 'textfield',
							fieldLabel: '',
							anchor: '-5',
							id: 'tahap7_persen',
							name: 'tahap7_persen',
							flex: 6,
							//allowBlank: false,
							maskRe: /[0-9\.]/
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
					],
            		bodyStyle: 'background-color:#dfe9f6;border:0;',
				},
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					width: '100%',
					margin: '5px 0 0 0',
					items: [
						{xtype: 'label', text: 'Tahap 8', itemId:'tahap8_label', id:'tahap8_label', flex: 2, margin: '0 0 0 0'},
						{
							xtype: 'button', 
							text: '<div style="color: blue">Reset</div>',
							action: 'reset',
							id:'tahap8',
							itemId:'tahap8',
							flex: 2, 
							margin: '0 0 0 10px',
							style: "background: none!important;border: none;padding: 0!important;cursor: pointer;",
							enableKeyEvents: true
						},
						{xtype: 'splitter', width: 10}, 
						{
							xtype: 'plafoncombobox',
							fieldLabel: '',
							anchor: '-5',
							name: 'tahap8_id',
							flex: 9,
                    		forceSelection:true,
							listeners: {
                                beforequery: function(record){
                                    record.query = new RegExp(record.query, 'i');
                                    record.forceAll = true;
                                },
								change: function(el) {
									var store = this.store;
									store.clearFilter();

									me.resetButton(el, 'tahap8');
								}
							}
							//editable:false
							//allowBlank: false
						},
						{xtype: 'splitter', width: 10}, 
						{
							xtype: 'textfield',
							fieldLabel: '',
							anchor: '-5',
							id: 'tahap8_persen',
							name: 'tahap8_persen',
							flex: 6,
							//allowBlank: false,
							maskRe: /[0-9\.]/
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
					],
            		bodyStyle: 'background-color:#dfe9f6;border:0;',
				},
			],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    resetButton: function(el, itemID){
		var r = Ext.getCmp(itemID);

		if(el.value > 0){
			Ext.getCmp(itemID+'_label').flex = 2;
			r.show();
			r.on('click',function(){
				el.setValue(0);
				el.setRawValue(0);
				Ext.getCmp(itemID+'_persen').setValue(0);
				Ext.getCmp(itemID+'_label').flex = 4;
			});
		}else{
			r.hide();
			Ext.getCmp(itemID+'_label').flex = 4;
		}
    }
});

