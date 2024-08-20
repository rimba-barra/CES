Ext.define('Erems.view.keuanganmodelb.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.keuanganmodelbformdata',
    requires: ['Erems.library.template.view.combobox.Cluster2', 'Erems.library.template.view.combobox.Type',
        'Erems.library.template.view.combobox.Productcategory',
        'Erems.library.template.component.Buildingclasscombobox',
		'Erems.library.template.component.Projectptcombobox',
        'Erems.template.ComboBoxFields'],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        var currentDate = new Date();
        var years = [];
        var temp = '';

        var yDate = currentDate.getFullYear();

        for (var i = (yDate - 7); i <= (yDate + 7); i++) {

            years.push({
                "number": i, "name": i
            });
        }
        ////
        var yearStore = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: years
        });

        var mDate = currentDate.getMonth() + 1;
        var months = [];
        var monthTeks = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'];

        for (var i = 1; i <= 12; i++) {

            months.push({
                "number": i, "name": monthTeks[i - 1]
            });
        }
        ////
        var monthStore = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: months
        });

        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
     

            items: [
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Period : ',
              
                    layout: 'hbox',
                    defaults: {
                        flex: 1,
                        hideLabel: true
                    },
                    items: [
                        {
                            xtype        : 'combobox',
                            name         : 'month',
                            displayField : 'name',
                            valueField   : 'number',
                            value        : mDate,
                            store        : monthStore,
                            width        : 80
                        },
                        {
                            xtype        : 'combobox',
                            name         : 'year',
                            displayField : 'name',
                            valueField   : 'number',
                            value        : yDate,
                            store        : yearStore,
                            width        : 80
                        },
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
                            xtype      : 'radiogroup',
                            width      : 350,
                            fieldLabel : 'Report Type',
                            name       : 'radiogroup_grossnetto',
                            items      : [
                                {
                                    xtype      : 'radiofield',
                                    boxLabel   : 'Gross (Default)',
                                    name       : 'status',
                                    inputValue : '1', 
                                    itemId     : 'gross',
                                    checked    : true
                                },
                                {
                                    xtype      : 'radiofield',
                                    boxLabel   : 'Netto',
                                    name       : 'status',
                                    inputValue : '2', 
                                    itemId     : 'netto'
                                },
                            ]
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
							xtype: 'projectptcombobox',
							name: 'pt_id',
							fieldLabel: 'Unit PT Name',
							valueField: 'pt_id',
							reportParams: true,
//							width: '80%'
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'cbf_pt_id',
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
    generateDockedItems: function () {
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
                    /*
                     {
                     xtype: 'button',
                     action: 'process',
                     itemId: 'btnSearch',
                     padding: 5,
                     width: 75,
                     iconCls: 'icon-search',
                     // disabled:true,
                     text: 'Process'
                     },
                     */
                    {
                        xtype: 'button',
                        action: 'processexcel',

                        padding: 5,
                        width: 150,
                        iconCls: 'icon-search',
                        // disabled:true,
                        text: 'Process to Excel'
                    },
                    /*
                     {
                     xtype: 'button',
                     action: 'reportjs',
                     
                     padding: 5,
                     width: 150,
                     iconCls: 'icon-search',
                     // disabled:true,
                     text: 'Report JS'
                     },
                     */
                    {
                        xtype: 'button',
                        action: 'reset',
                        itemId: 'btnReset',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-reset',
                        text: 'Reset'
                    },
                ]
            }
        ];
        return dockedItems;
    }
});

