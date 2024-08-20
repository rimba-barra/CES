Ext.define('Erems.view.aktappjb.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.aktappjbformsearch',
	initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
            	{
					xtype: 'textfield',
					fieldLabel: 'Unit Number',
					itemId: 'unit_number',
					name: 'unit_number',
					anchor:'-15'
				},
                {
                    xtype: 'clustercombobox',
                    itemId: 'fs_cluster_id',
                    name: 'cluster_id',
                    anchor:'-15',
                    forceSelection:true,
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }

                },
				{
                    xtype: 'blockcombobox',
                    itemId: 'fs_block_id',
                    name: 'block_id',
                    anchor:'-15',
                    forceSelection:true,
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }

                },
				{
                    xtype: 'unitcombobox',
                    itemId: 'fs_unit_id',
                    name: 'unit_id',
                    anchor:'-15',
					hidden: true,
                    forceSelection:true,
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }

                },
				
				//for load notaris to form data
				{
                    xtype: 'notariscombobox',
                    itemId: 'fd_notaris_id',
                    name: 'notaris_id',
                    anchor:'-15',
					hidden: true,
                    forceSelection:true,
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
				{
                    xtype: 'panel',
                    height: 48,
                    bodyStyle:'background:none;border:0;',
					anchor:'-15',
                    layout: {
                        type: 'column'
                    },
                    items: [
						{
							xtype: 'datefield',
							itemId: 'aktappjb_startdate',
							name: 'aktappjb_startdate',
							fieldLabel: 'Akta PPJB Date',
							labelSeparator:'',
							width: 100,
							labelAlign: 'top',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u'
						},
						{
							xtype: 'label',
							margin: '23px 5px 0 5px',
							styleHtmlContent: false,
							width: 10,
							text:'to'
						},
						{
							xtype: 'datefield',
							itemId: 'aktappjb_enddate',
							name: 'aktappjb_enddate',
							fieldLabel: '&nbsp;',
							labelSeparator:'',
							width: 100,
							labelAlign: 'top',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u'
						},
                    ]
                },
				{
                    xtype: 'panel',
                    height: 48,
                    bodyStyle:'background:none;border:0;',
					anchor:'-15',
                    layout: {
                        type: 'column'
                    },
                    items: [
						{
							xtype: 'datefield',
							itemId: 'handover_startdate',
							name: 'handover_startdate',
							fieldLabel: 'Hand Over Date',
							labelSeparator:'',
							width: 100,
							labelAlign: 'top',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u'
						},
						{
							xtype: 'label',
							margin: '23px 5px 0 5px',
							styleHtmlContent: false,
							width: 10,
							text:'to'
						},
						{
							xtype: 'datefield',
							itemId: 'handover_enddate',
							name: 'handover_enddate',
							fieldLabel: '&nbsp;',
							labelSeparator:'',
							width: 100,
							labelAlign: 'top',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u'
						},
                    ]
                },
				{
                    xtype: 'panel',
                    height: 48,
                    bodyStyle:'background:none;border:0;',
					anchor:'-15',
                    layout: {
                        type: 'column'
                    },
                    items: [
						{
							xtype: 'datefield',
							itemId: 'sign_startdate',
							name: 'sign_startdate',
							fieldLabel: 'Sign Date',
							labelSeparator:'',
							width: 100,
							labelAlign: 'top',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u'
						},
						{
							xtype: 'label',
							margin: '23px 5px 0 5px',
							styleHtmlContent: false,
							width: 10,
							text:'to'
						},
						{
							xtype: 'datefield',
							itemId: 'sign_enddate',
							name: 'sign_enddate',
							fieldLabel: '&nbsp;',
							labelSeparator:'',
							width: 100,
							labelAlign: 'top',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u'
						},
                    ]
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});