Ext.define('Erems.view.progressunit.FormSearch', {
	extend: 'Erems.library.template.view.FormSearch',
	alias: 'widget.progressunitformsearch',
	requires: [],
	initComponent: function () {
		var me = this;

		var cbf = new Erems.template.ComboBoxFields();

		Ext.applyIf(me, {
			defaults: {
				labelAlign: 'top',
				labelSeparator: ' ',
				labelClsExtra: 'small',
				fieldStyle: 'margin-bottom:3px;',
				anchor: '-2',

				storeUrl: 'progressunit'
			},
			items: [{
					xtype: 'textfield',
					name: 'unit_number',
					fieldLabel: 'Unit Number',
                    enableKeyEvents: true
				}, {
					xtype: 'combobox',
					name: 'cluster_id',
					displayField: cbf.cluster.d,
					// displayField: 'code',
					valueField: cbf.cluster.v,
					enableKeyEvents: true,
					queryMode: 'local',
					fieldLabel: 'Cluster',
					// listConfig: {
					// 	itemTpl: '{cluster}'
					// },
                    // forceSelection:true,
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
				},
				{
					xtype: 'combobox',
					name: 'block_id',
					// displayField: 'code',
					displayField: cbf.block.d,
					valueField: cbf.block.v,
					enableKeyEvents: true,
					queryMode: 'local',
					fieldLabel: 'Block',
					// listConfig: {
					// 	itemTpl: '{code} - {block}'
					// },
     //                forceSelection:true,
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
				},
				{
					xtype: 'combobox',
					name: 'spk_id',
					// displayField: 'spk_no',
					displayField: cbf.spk.d,
					valueField: cbf.spk.v,
					enableKeyEvents: true,
					queryMode: 'local',
					fieldLabel: 'SPK No',
                    // forceSelection:true,
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
//					listConfig: {
//						itemTpl: '{code} - {block}'
//					}
				}


			],
			dockedItems: me.generateDockedItems()
		});

		me.callParent(arguments);
	}
});