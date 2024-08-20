Ext.define('Erems.view.collagingescrowdatereport.FormData', {
    extend   : 'Erems.library.template.view.FormData',
    alias    : 'widget.collagingescrowdatereportformdata',
    requires : [
        'Erems.library.template.component.Buildingclasscombobox',
		'Erems.library.template.component.Projectptcombobox'
    ],
    frame         : true,
    autoScroll    : true,
    bodyBorder    : true,
    width         : 630,
    bodyStyle     : 'border-top:none;border-left:none;border-right:none;',
    initComponent : function () {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            items: [
                {
                    xtype    : 'container',
                    layout   : 'hbox',
                    margin   : '0 0 5px 0',
                    defaults : { margin : '0 20px 0 0' },
                    items: [
                        {
                            xtype      : 'radiogroup',
                            width      : 300,
                            fieldLabel : 'Report',
                            name       : 'radiogroup_laporantype',
                            items      : [
                                {
                                    xtype      : 'radiofield',
                                    boxLabel   : 'Detail',
                                    name       : 'radio_laporantype',
                                    inputValue : 'detail',
                                    itemId     : 'detail',
                                    checked    : true
                                },
                                        /*{
                                         xtype: 'radiofield',
                                         boxLabel: 'Rekap',
                                         name: 'radio_laporantype',
                                         inputValue: 'rekap',
                                         itemId: 'rekap'
                                         },*/
                            ]
                        }
                    ]
                },
                {
                    xtype    : 'container',
                    layout   : 'hbox',
                    margin   : '0 0 5px 0',
                    defaults : { margin : '0 20px 0 0' },
                    items    : [
                        {
                            xtype        : 'buildingclasscombobox',
                            name         : 'buildingclass',
                            fieldLabel   : 'Group Type',
                            reportParams : true
                        },
                        {
                            xtype          : 'checkboxfield',
                            fieldLabel     : '',
                            name           : 'cbf_buildingclass',
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
                    xtype    : 'container',
                    layout   : 'hbox',
                    margin   : '0 0 5px 0',
                    defaults : { margin : '0 20px 0 0' },
                    items    : [
                        {
                            xtype        : 'datefield',
                            itemId       : 'jatuhtempo_date',
                            name         : 'proses_date',
                            fieldLabel   : 'Periode jatuh Tempo',
                            labelWidth   : 120,
                            editable     : false,
                            format       : 'd-m-Y',
                            altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                            submitFormat : 'Y-m-d H:i:s.u',
                            value        : new Date()
                        }
                    ]
                },
                {
                    xtype    : 'container',
                    layout   : 'hbox',
                    margin   : '0 0 5px 0',
                    defaults : { margin : '0 20px 0 0' },
                    items: [
                        {
                            xtype          : 'datefield',
                            itemId         : 'periode_startdate',
                            name           : 'periode_startdate',
                            fieldLabel     : 'Akad Date',
                            labelWidth     : 120,
                            labelSeparator : '',
                            editable       : false,
                            format         : 'd-m-Y',
                            altFormats     : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                            submitFormat   : 'Y-m-d H:i:s.u',
                        },
                        {
                            xtype            : 'label',
                            styleHtmlContent : false,
                            width            : 5,
                            text             : 'to'
                        },
                        {
                            xtype          : 'datefield',
                            itemId         : 'periode_enddate',
                            name           : 'periode_enddate',
                            labelSeparator : '',
                            editable       : false,
                            format         : 'd-m-Y',
                            altFormats     : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                            submitFormat   : 'Y-m-d H:i:s.u',
                        },
                        {
                            xtype          : 'checkboxfield',
                            fieldLabel     : '',
                            name           : 'cbf_periode_id',
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
//				{
//                    xtype: 'container',
//                    layout: 'hbox',
//                    margin: '0 0 5px 0',
//                    defaults: {
//                        margin: '0 20px 0 0'
//                    },
//                    items: [
//                        {
//							xtype: 'combobox',
//							fieldLabel: 'Periode jatuh Tempo',
//							labelWidth: 120,
//							itemId:'fd_proses_date',
//							name: 'proses_date',
//							//allowBlank: false,
//							displayField: 'proses_date',
//							valueField: 'proses_date',
//							editable: false
//                        }
//                    ]
//                },
				{
                    xtype    : 'container',
                    layout   : 'hbox',
                    margin   : '0 0 5px 0',
                    defaults : { margin : '0 20px 0 0' },
                    items    : [
                        {
                            xtype      : 'radiogroup',
                            width      : 400,
                            fieldLabel : 'Report Type',
                            name       : 'radiogroup_grossnetto',
                            items      : [
                                {
                                    xtype      : 'radiofield',
                                    boxLabel   : 'Gross (Default)',
                                    name       : 'radio_grossnetto',
                                    inputValue : '0',
                                    itemId     : 'gross',
                                    checked    : true
                                    
                                },
                                {
                                    xtype      : 'radiofield',
                                    boxLabel   : 'Netto',
                                    name       : 'radio_grossnetto',
                                    inputValue : '1',
                                    itemId     : 'netto',
                                },
                            ]
                        }
                    ]
                }
            ]

        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var dockedItems = [
            {
                xtype  : 'toolbar',
                dock   : 'bottom',
                ui     : 'footer',
                layout : {
                    padding : 6,
                    type    : 'hbox'
                },
                items: [
                    {
                        xtype   : 'button',
                        action  : 'process',
                        itemId  : 'btnSearch',
                        padding : 5,
                        width   : 75,
                        iconCls : 'icon-search',
                        text    : 'Process'
                    },
                    {
                        xtype   : 'button',
                        action  : 'reset',
                        itemId  : 'btnReset',
                        padding : 5,
                        width   : 75,
                        iconCls : 'icon-reset',
                        text    : 'Reset'
                    }
                ]
            }
        ];
        return dockedItems;
    }
});

