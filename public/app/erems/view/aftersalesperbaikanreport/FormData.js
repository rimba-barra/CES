Ext.define('Erems.view.aftersalesperbaikanreport.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.aftersalesperbaikanreportformdata',
    requires: [
        'Erems.library.template.component.Complaintstatuscombobox',
        'Erems.library.template.component.Clustercombobox'
   	],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
	width: 600,
	//height: 300,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
							xtype: 'radiogroup',
							//columns: 1,
							width: 300,
							fieldLabel: 'Laporan Type',
							name: 'radiogroup_laporantype',
							items: [
								{
									xtype: 'radiofield',
									boxLabel: 'Rekap',
									name: 'radio_laporantype',
									inputValue: 'rekap',
									itemId: 'rekap',
									checked: true
								},
								{
									xtype: 'radiofield',
									boxLabel: 'Detail',
									name: 'radio_laporantype',
									inputValue: 'detail', 
									itemId: 'detail'
								}
							]
						}
                    ]
                },
                {
                    xtype    : 'container',
                    layout   : 'hbox',
                    margin   : '0 0 5px 0',
                    defaults : {
                        margin : '0 20px 0 0'
                    },
                    items: [
                        {
                            xtype        : 'clustercombobox',
                            name         : 'cluster_id',
                            fieldLabel   : 'Cluster',
                            reportParams : true
                        },
                        {
                            xtype          : 'checkboxfield',
                            fieldLabel     : '',
                            name           : 'cbf_cluster_id',
                            checked        : true,
                            inputValue     : '1',
                            uncheckedValue : '0',
                            margin         : '0 5px 0 0',
                            width          : 20
                        },
                        {
                            xtype : 'label',
                            text  : 'ALL'
                        }
                    ]
                },
				{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            name: 'sort_by',
							fieldLabel:'Sort By',
							store:[['name','Type'],['complainttype','Jenis Complaint']],
                            disabled: true,
							value: 'name'
                        }
                    ]
                },
				{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
                            xtype: 'complaintstatuscombobox',
                            name: 'complaintstatus_id',
							fieldLabel:'Status Complaint',
                            reportParams:true
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'cbf_complaintstatus_id',
                            checked: true,
                            inputValue: '1',
                            uncheckedValue: '0',
                            margin: '0 5px 0 0',
                            width: 20
                        },
                        {
                            xtype: 'label',
                            text: 'ALL'
                        }
                    ]
                },
				{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
							xtype: 'datefield',
							itemId: 'periode_startdate',
							name: 'periode_startdate',
							fieldLabel: 'Periode Complaint',
							labelSeparator:'',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							disabled: true
						},
						{
							xtype: 'label',
							styleHtmlContent: false,
							width: 5,
							text:'to'
						},
						{
							xtype: 'datefield',
							itemId: 'periode_enddate',
							name: 'periode_enddate',
							labelSeparator:'',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							disabled: true
						},
						{
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'cbf_periode_date',
                            checked: true,
                            inputValue: '1',
                            uncheckedValue: '0',
                            margin: '0 5px 0 0',
                            width: 20
                        },
                        {
                            xtype: 'label',
                            text: 'ALL'
                        }
                    ]
				}
				
            ]

        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var dockedItems = [
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
                        action: 'process',
                        itemId: 'btnSearch',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-search',
                        text: 'Process'
                    },
                    {
                        xtype: 'button',
                        action: 'reset',
                        itemId: 'btnReset',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-reset',
                        text: 'Reset'
                    }
                ]
            }
        ];
        return dockedItems;
    }
});

