Ext.define('Erems.view.bagihasilpilihdata.FormData', {
	extend   : 'Erems.library.template.view.FormData',
	alias    : 'widget.bagihasilpilihdataformdata',
	requires : [
		'Erems.library.template.component.Landrepaymentcombobox',
	],
	// width         : 600,
	frame         : true,
	autoScroll    : true,
	anchorSize    : 100,
	bodyBorder    : true,
	bodyPadding   : 10,
	bodyStyle     : 'border-top:none;border-left:none;border-right:none;',
	initComponent : function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
				labelSeparator : ' ',
				labelClsExtra  : 'small',
				fieldStyle     : 'margin-bottom:3px;',
				anchor         : '100%'
            },
            items: [
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_purchaseletter_id',
					name   : 'purchaseletter_id'
                },
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_unit_id',
					name   : 'unit_id'
                },
                /*{
                    xtype: 'textfield',
                    itemId: 'fdms_code',
                    name: 'code',
                    fieldLabel: 'Code',
                    allowBlank: false,
                    maskRe: /[^\`\"\']/,
                    anchor: '-5'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_keterangan',
                    name: 'keterangan',
                    fieldLabel: 'Keterangan',
                    allowBlank: false,
                    maskRe: /[^\`\"\']/,
                    anchor: '-5'
                },
				{
                    xtype: 'textfield',
                    itemId: 'fdms_management_fee',
                    name: 'management_fee',
                    fieldLabel: 'Management Fee',
                    allowBlank: false,
                  	maskRe: /[0-9\.]/,
                    anchor: '-5'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_royalty',
                    name: 'royalty',
                    fieldLabel: 'Royalty',
					allowBlank: false,
                    maskRe: /[0-9\.]/,
                    anchor: '-5'
                },*/
				{
					xtype: 'fieldset',
					bodyPadding: 10, 
					width: '100%',
					title: 'Pilihan',
					hidden:true,
					items: [
						{
							xtype: 'panel',
							//height: 30,
							bodyStyle:'background:none;border:0;',
							anchor:'100%',
							layout: {
								type: 'column'
							},
							items: [
								{
									xtype: 'radiofield',
									anchor: '100%',
									boxLabel: 'Diproses Bagi Hasil',
									itemId: 'pilihan_1',
									name: 'is_prosesbagihasil',
									labelWidth: 275,
									inputValue: 1,
									checked: true,
									handler: function(field, value) {
										if (value) {
											//me.down('[name=kelompok_edit]').setReadOnly(false);
										} else {
											//me.down('[name=kelompok_edit]').setReadOnly(true);  
										}            
									}
								},
								{
									xtype: 'splitter', width: 50,
								},
								{
									xtype: 'textfield',
									fieldLabel: 'Kelompok',
									labelWidth: 50,
									width: 100,
									name: 'kelompok_edit',
									itemId: 'kelompok_edit',
									maskRe: /[0-9]/,
								},
							]
						},
						{
							xtype: 'panel',
							height: 30,
							bodyStyle:'background:none;border:0;',
							anchor:'100%',
							layout: {
								type: 'column'
							},
							items: [
								{
									xtype: 'radiofield',
									anchor: '100%',
									boxLabel: 'Tidak Diproses Bagi Hasil',
									itemId: 'pilihan_2',
									name: 'is_prosesbagihasil',
									labelWidth: 275,
									inputValue: 0,
									handler: function(field, value) {
										if (value) {
											//me.down('[name=kelompok_edit]').setReadOnly(true);
											//me.down('[name=kelompok_edit]').setValue(1);
											//me.down('[name=landrepayment_id]').setValue(0);
											//me.down('[name=landrepayment_code]').setValue();
										} else {
											me.down('[name=kelompok_edit]').setReadOnly(false);  
										}            
									}
								}
							]
						}
					]
				},
				//// add by erwin.st 01112021
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:10px;background:none;',
					items     : [
						{
							xtype          : 'checkboxfield',
							fieldLabel     : 'Set to All',
							itemId         : 'is_set_toall',											
							name           : 'is_set_toall',
							inputValue     : '1',
							uncheckedValue : '0',
							listeners      : {
								change : function() {
									if(this.checked){
										me.down('[name=is_set_tocluster]').setValue(false);
										me.down('[name=is_set_toblock]').setValue(false);
									} 
								}
							}
						}, 
						{ xtype : 'splitter', width : 10 },
						{
							xtype   : 'label', 
							text    : '(Set ke seluruh Unit yang belum memiliki LRP)', 
							flex    : 2,
							padding : '7px 0 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:10px;background:none;',
					items     : [
						{
							xtype          : 'checkboxfield',
							fieldLabel     : 'Set to Cluster',
							itemId         : 'is_set_tocluster',											
							name           : 'is_set_tocluster',
							inputValue     : '1',
							uncheckedValue : '0',
							listeners      : {
								render : function(){
									me.down('[name=cluster_id]').setDisabled(true);
								},
								change : function() {
									var txt = me.down('[name=cluster_id]');
									if(this.checked){
										txt.allowBlank = false;
										txt.setDisabled(false);

										me.down('[name=is_set_toall]').setValue(false);
										me.down('[name=is_set_toblock]').setValue(false);
									} 
									else {
										txt.allowBlank = true;
										txt.setDisabled(true);
										txt.setValue();
									}
								}
							}
						}, 
						{ xtype : 'splitter', width : 10, }, 
						{
							xtype          : 'clustercombobox',
							fieldLabel     : '',
							anchor         : '-5',
							name           : 'cluster_id',
							disabled       : true,
							forceSelection : true,
							listeners      : {
		                        beforequery: function(record){
		                            record.query = new RegExp(record.query, 'i');
		                            record.forceAll = true;
		                        }
		                    }
						},
						{ xtype : 'splitter', width : 5 },
						{ 
							xtype : 'label', 
							text : '(Set ke semua unit yang belum memiliki LRP)', 
							flex : 2 
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:10px;background:none;',
					items     : [
						{
							xtype          : 'checkboxfield',
							fieldLabel     : 'Set to Block',
							itemId         : 'is_set_toblock',											
							name           : 'is_set_toblock',
							inputValue     : '1',
							uncheckedValue : '0',
							listeners      : {
								render   : function(){
									me.down('[name=block_id]').setDisabled(true);
								},
								change: function() {
									var txt = me.down('[name=block_id]');
									if(this.checked){
										txt.allowBlank = false;
										txt.setDisabled(false);

										me.down('[name=is_set_toall]').setValue(false);
										me.down('[name=is_set_tocluster]').setValue(false);
									} else {
										txt.allowBlank = true;
										txt.setDisabled(true);
										txt.setValue();
									}
								}
							}
						}, 
						{ xtype : 'splitter', width : 10, }, 
						{
							xtype          : 'blockcombobox',
							fieldLabel     : '',
							anchor         : '-5',
							name           : 'block_id',
							disabled       : true,
							forceSelection : true,
							listeners      : {
		                        beforequery: function(record){
		                            record.query = new RegExp(record.query, 'i');
		                            record.forceAll = true;
		                        }
		                    }
						},
						{xtype: 'splitter', width: 5},
						{xtype: 'label', text: '(Set ke unit dalam block yang belum memiliki LRP)', flex: 2}]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:10px;background:none;',
					width     : '100%',
					items     : [
						{
							xtype      : 'textfield',
							fieldLabel : 'Kode LRP',
							anchor     : '-5',
							name       : 'landrepayment_code',
							flex       : 5,
							readOnly   : true,
							allowBlank : false,
							fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
						}, 
						{ xtype: 'splitter', width: 5 },
						{
							xtype            : 'landrepaymentcombobox',
							fieldLabel       : '',
							anchor           : '-5',
							itemId           : 'fd_landrepayment_id',
							name             : 'landrepayment_id',
							flex             : 6,
							enforceMaxLength : true,
							enableKeyEvents  : true,
							rowdata          : null,
							forceSelection   :true,
							emptyText        : 'Search Keterangan..',
							tpl              : Ext.create('Ext.XTemplate',
								  '<table class="x-grid-table" width="300px" >',
									'<tr class="x-grid-row">',             
										'<th width="10px"><div class="x-column-header x-column-header-inner">Code</div></th>',
										'<th width="20px"><div class="x-column-header x-column-header-inner">Keterangan</div></th>',
									'</tr>',
									'<tpl for=".">',
										'<tr class="x-boundlist-item">',                   
											'<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
											'<td ><div class="x-grid-cell x-grid-cell-inner">{keterangan}</div></td>',
										'</tr>',
									'</tpl>',
								 '</table>'
							 ),  
								listeners : {
								beforequery : function(record){
									record.query    = new RegExp(record.query, 'i');
									record.forceAll = true;
		                        },
								change : function (combo, newValue, oldValue) {
									var store = this.getStore();
									var value_index = store.find('landrepayment_id', newValue);
									var record = store.getAt(value_index);
									if(record){
										me.down('[name=landrepayment_code]').setValue(record.get('code'));
									}
								}
							}
						}
					]
				},
				{
					layout: 'hbox',
					hidden:true,
					bodyStyle: 'border:10px;background:none;',
					width: '100%',
					items: [
						{
							xtype      : 'textfield',
							fieldLabel : 'Komisi Marketing',
							anchor     : '-5',
							name       : 'komisi_marketing',
							flex       : 1,
							width      : 50,
							readOnly   : true,
							fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
						},
						{
							xtype  : 'label', 
							text   : '%', 
							flex   : 1, 
							margin : '0 0 0 10px'
						}
					]
				},
				
			],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

